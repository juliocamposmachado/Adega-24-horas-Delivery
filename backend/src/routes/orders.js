import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import uberDirectService from '../services/uberDirectService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Calcular frete
router.post('/calculate-shipping', async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Endereço é obrigatório' });
    }

    const quote = await uberDirectService.getDeliveryQuote(
      process.env.STORE_ADDRESS,
      address
    );

    res.json({
      deliveryFee: quote.fee,
      eta: quote.eta,
      duration: quote.duration,
      distance: quote.distance
    });
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    res.status(500).json({ error: 'Erro ao calcular frete' });
  }
});

// Validar cupom
router.post('/validate-coupon', async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ error: 'Cupom não encontrado' });
    }

    if (!coupon.isValid()) {
      return res.status(400).json({ error: 'Cupom inválido ou expirado' });
    }

    if (subtotal < coupon.minPurchase) {
      return res.status(400).json({ 
        error: `Compra mínima de R$ ${coupon.minPurchase.toFixed(2)} necessária` 
      });
    }

    const discount = coupon.calculateDiscount(subtotal);

    res.json({
      valid: true,
      discount,
      code: coupon.code
    });
  } catch (error) {
    console.error('Erro ao validar cupom:', error);
    res.status(500).json({ error: 'Erro ao validar cupom' });
  }
});

// Criar pedido
router.post('/', async (req, res) => {
  try {
    const { customer, items, couponCode } = req.body;

    // Validar produtos e calcular subtotal
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.active) {
        return res.status(400).json({ 
          error: `Produto ${item.productId} não está disponível` 
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Estoque insuficiente para ${product.name}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    // Aplicar cupom
    let discount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
      if (coupon && coupon.isValid()) {
        discount = coupon.calculateDiscount(subtotal);
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    // Calcular frete
    const quote = await uberDirectService.getDeliveryQuote(
      process.env.STORE_ADDRESS,
      customer.address.fullAddress
    );

    const deliveryFee = quote.fee;
    const total = subtotal + deliveryFee - discount;

    // Criar pedido
    const order = new Order({
      customer,
      items: orderItems,
      subtotal,
      deliveryFee,
      discount,
      total,
      couponCode,
      status: 'confirmed'
    });

    await order.save();

    // Criar entrega no Uber Direct
    const delivery = await uberDirectService.createDelivery(order);

    order.uberDelivery = {
      deliveryId: delivery.deliveryId,
      trackingUrl: delivery.trackingUrl,
      status: delivery.status,
      eta: quote.eta
    };
    order.status = 'preparing';

    await order.save();

    // Atualizar estoque
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// Buscar pedido por número
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Atualizar status da entrega
    if (order.uberDelivery?.deliveryId) {
      const status = await uberDirectService.getDeliveryStatus(order.uberDelivery.deliveryId);
      if (status) {
        order.uberDelivery.status = status.status;
        order.uberDelivery.courierName = status.courier?.name;
        order.uberDelivery.courierPhone = status.courier?.phone;
        order.uberDelivery.courierLocation = status.location;
        await order.save();
      }
    }

    res.json(order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

// Listar pedidos (admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('items.productId');

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
});

// Atualizar status do pedido (admin)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.json(order);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

// Webhook do Uber Direct
router.post('/webhook/uber', async (req, res) => {
  try {
    const { event_type, delivery_id, status } = req.body;

    const order = await Order.findOne({ 'uberDelivery.deliveryId': delivery_id });

    if (order) {
      order.uberDelivery.status = status;

      // Mapear status do Uber para status do pedido
      if (status === 'delivered') {
        order.status = 'delivered';
      } else if (status === 'en_route_to_dropoff') {
        order.status = 'in_transit';
      } else if (status === 'canceled') {
        order.status = 'cancelled';
      }

      await order.save();
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

export default router;
