const express = require('express');
const mercadopago = require('mercadopago');

const router = express.Router();

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''
});

// Criar preferência de pagamento
router.post('/create-preference', async (req, res) => {
  try {
    const { items, payer, orderId } = req.body;

    const preference = {
      items: items.map((item: any) => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: 'BRL'
      })),
      payer: {
        name: payer.name,
        email: payer.email || 'cliente@adega.com',
        phone: {
          area_code: payer.phone.substring(0, 2),
          number: payer.phone.substring(2)
        },
        address: {
          street_name: payer.address,
          zip_code: ''
        }
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pedido-confirmado?order=${orderId}`,
        failure: `${process.env.FRONTEND_URL}/checkout?error=payment`,
        pending: `${process.env.FRONTEND_URL}/pedido-pendente?order=${orderId}`
      },
      auto_return: 'approved',
      external_reference: orderId,
      notification_url: `${process.env.BACKEND_URL}/api/payment/webhook`,
      statement_descriptor: 'ADEGA RADIO TATUAPE'
    };

    const response = await mercadopago.preferences.create(preference);
    
    res.json({
      preferenceId: response.body.id,
      initPoint: response.body.init_point,
      sandboxInitPoint: response.body.sandbox_init_point
    });
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error);
    res.status(500).json({ error: 'Erro ao processar pagamento' });
  }
});

// Webhook para notificações do Mercado Pago
router.post('/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;
      
      // Buscar informações do pagamento
      const payment = await mercadopago.payment.get(paymentId);
      
      const orderId = payment.body.external_reference;
      const status = payment.body.status;
      
      // Atualizar status do pedido no banco de dados
      const Order = require('../models/Order').default;
      
      let orderStatus = 'pending';
      if (status === 'approved') {
        orderStatus = 'confirmed';
      } else if (status === 'rejected' || status === 'cancelled') {
        orderStatus = 'cancelled';
      }
      
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: status,
        status: orderStatus,
        paymentId: paymentId
      });
      
      console.log(`Pedido ${orderId} atualizado: ${orderStatus}`);
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Erro ao processar notificação' });
  }
});

// Buscar status de pagamento
router.get('/status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await mercadopago.payment.get(parseInt(paymentId));
    
    res.json({
      status: payment.body.status,
      statusDetail: payment.body.status_detail,
      amount: payment.body.transaction_amount
    });
  } catch (error) {
    console.error('Erro ao buscar status do pagamento:', error);
    res.status(500).json({ error: 'Erro ao buscar status' });
  }
});

module.exports = router;
