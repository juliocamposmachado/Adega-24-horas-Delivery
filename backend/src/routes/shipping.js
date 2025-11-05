import express from 'express';
import shippingService from '../services/shippingService.js';
import uberDirectService from '../services/uberDirectService.js';

const router = express.Router();

// Calcular frete por endereço
router.post('/calculate', async (req, res) => {
  try {
    const { address, method = 'zone' } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Endereço é obrigatório' });
    }

    const shipping = await shippingService.calculateShipping(address, method);

    if (!shipping.fee) {
      return res.status(400).json({
        error: 'Endereço fora da área de entrega',
        details: 'Atendemos apenas até 15km de distância',
        distance: shipping.distance
      });
    }

    res.json({
      success: true,
      deliveryFee: shipping.fee,
      zone: shipping.zone,
      distance: shipping.distance.toFixed(2),
      estimatedTime: shipping.estimatedTime,
      formula: shipping.formula,
      storeAddress: shipping.storeAddress
    });
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    res.status(500).json({
      error: 'Erro ao calcular frete',
      message: error.message
    });
  }
});

// Verificar área de cobertura
router.post('/check-coverage', async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Endereço é obrigatório' });
    }

    const coverage = await shippingService.isInCoverageArea(address);

    res.json({
      inCoverageArea: coverage.inArea,
      distance: coverage.distance ? coverage.distance.toFixed(2) : null,
      maxDistance: 15,
      message: coverage.inArea
        ? 'Endereço dentro da área de entrega'
        : 'Endereço fora da área de entrega'
    });
  } catch (error) {
    console.error('Erro ao verificar cobertura:', error);
    res.status(500).json({
      error: 'Erro ao verificar área de cobertura',
      message: error.message
    });
  }
});

// Cálculo de frete pela API Uber Direct
router.post('/uber-quote', async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: 'Endereço é obrigatório' });

    const quote = await uberDirectService.getDeliveryQuote(
      process.env.STORE_ADDRESS,
      address
    );

    res.json({
      success: true,
      deliveryFee: quote.fee,
      distance: Math.round((quote.distance / 1000) * 100) / 100, // m -> km
      duration: quote.duration,
      eta: quote.eta
    });
  } catch (error) {
    console.error('Erro no uber-quote:', error.message);
    res.status(500).json({ error: 'Erro ao obter cotação Uber' });
  }
});

// Criar entrega no Uber Direct após pagamento aprovado
router.post('/create-uber-delivery', async (req, res) => {
  try {
    const { orderId, customer, items, orderNumber } = req.body;

    if (!customer || !items || !orderNumber) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Criar objeto de pedido no formato esperado pelo Uber
    const orderData = {
      orderNumber,
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: {
          fullAddress: customer.address,
          complement: customer.complement || ''
        }
      },
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity
      }))
    };

    // Criar entrega no Uber Direct
    const delivery = await uberDirectService.createDelivery(orderData);

    res.json({
      success: true,
      delivery: {
        deliveryId: delivery.deliveryId,
        trackingUrl: delivery.trackingUrl,
        status: delivery.status,
        message: 'Entrega criada com sucesso no Uber Direct'
      }
    });
  } catch (error) {
    console.error('Erro ao criar entrega Uber:', error);
    res.status(500).json({
      error: 'Erro ao criar entrega',
      message: error.message
    });
  }
});

// Obter status da entrega Uber
router.get('/uber-status/:deliveryId', async (req, res) => {
  try {
    const { deliveryId } = req.params;

    const status = await uberDirectService.getDeliveryStatus(deliveryId);

    if (!status) {
      return res.status(404).json({ error: 'Entrega não encontrada' });
    }

    res.json({
      success: true,
      delivery: {
        deliveryId,
        status: status.status,
        courier: status.courier,
        location: status.location,
        eta: status.eta
      }
    });
  } catch (error) {
    console.error('Erro ao obter status Uber:', error);
    res.status(500).json({
      error: 'Erro ao obter status da entrega',
      message: error.message
    });
  }
});

// Tabela de zonas (para consulta)
router.get('/zones', (req, res) => {
  res.json({
    zones: [
      { name: 'Zona 1', maxKm: 3, price: 10.00, description: 'Até 3 km' },
      { name: 'Zona 2', maxKm: 6, price: 15.00, description: 'Até 6 km' },
      { name: 'Zona 3', maxKm: 10, price: 22.50, description: 'Até 10 km' },
      { name: 'Zona 4', maxKm: 15, price: 32.50, description: 'Até 15 km' }
    ],
    formula: {
      description: 'Fórmula alternativa',
      calculation: '(distância em km × R$ 2,50) + R$ 5,00',
      pricePerKm: 2.50,
      minimumFee: 5.00
    },
    storeLocation: {
      address: 'Rua Dante Pellacani, 92 - Tatuapé, São Paulo - SP, 03334-070',
      coordinates: {
        lat: -23.5505199,
        lng: -46.6333094
      }
    }
  });
});

export default router;

