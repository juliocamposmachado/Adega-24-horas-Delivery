import express from 'express';
import mercadopago from 'mercadopago';

const router = express.Router();

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''
});

// Criar preferência de pagamento
router.post('/create-preference', async (req, res) => {
  try {
    console.log('Recebendo requisição de preferência:', req.body);
    const { items, payer, orderId } = req.body;

    if (!items || !payer) {
      return res.status(400).json({ error: 'Dados incompletos: items e payer são obrigatórios' });
    }

    // Limpar telefone (remover caracteres especiais)
    const phoneClean = payer.phone.replace(/\D/g, '');
    const areaCode = phoneClean.substring(0, 2);
    const phoneNumber = phoneClean.substring(2);

    console.log('Telefone processado:', { original: payer.phone, areaCode, phoneNumber });

    const preference = {
      items: items.map((item) => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
        currency_id: 'BRL'
      })),
      payer: {
        name: payer.name,
        email: payer.email || `${phoneClean}@adega.com`,
        phone: {
          area_code: areaCode,
          number: phoneNumber
        },
        address: {
          street_name: payer.address,
          zip_code: ''
        }
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
        failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout?error=payment`,
        pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}?pending=true`
      },
      auto_return: 'approved',
      external_reference: orderId || 'temp-' + Date.now(),
      notification_url: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payment/webhook`,
      statement_descriptor: 'ADEGA RADIO TATUAPE'
    };

    console.log('Criando preferência no Mercado Pago...');
    const response = await mercadopago.preferences.create(preference);
    
    console.log('Preferência criada com sucesso:', response.body.id);
    console.log('Init Point:', response.body.init_point);

    res.json({
      preferenceId: response.body.id,
      initPoint: response.body.init_point,
      sandboxInitPoint: response.body.sandbox_init_point
    });
  } catch (error) {
    console.error('Erro detalhado ao criar preferência:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: 'Erro ao processar pagamento',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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
      const { default: Order } = await import('../models/Order.js');
      
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

export default router;
