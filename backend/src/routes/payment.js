import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const router = express.Router();

// Simular armazenamento temporário de pedidos (em memória)
const orders = new Map();

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: (process.env.MERCADO_PAGO_ACCESS_TOKEN || '').trim(),
  options: { timeout: 5000, idempotencyKey: 'abc' }
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

    const preferenceBody = {
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
        success: `${(process.env.FRONTEND_URL || 'http://localhost:5173').trim()}/checkout?paid=1&orderId=${encodeURIComponent(orderId || 'temp-' + Date.now())}`,
        failure: `${(process.env.FRONTEND_URL || 'http://localhost:5173').trim()}/checkout?error=payment`,
        pending: `${(process.env.FRONTEND_URL || 'http://localhost:5173').trim()}?pending=true`
      },
      auto_return: 'approved',
      external_reference: orderId || 'temp-' + Date.now(),
      notification_url: `${(process.env.BACKEND_URL || 'http://localhost:5000').trim()}/api/payment/webhook`,
      statement_descriptor: 'ADEGA RADIO TATUAPE'
    };

    console.log('Criando preferência no Mercado Pago...');
    const preference = new Preference(client);
    const response = await preference.create({
      body: preferenceBody
    });
    
    console.log('Resposta completa:', JSON.stringify(response, null, 2));
    
    // A resposta pode vir em response ou response.body dependendo da versão
    const result = response.body || response;
    
    console.log('Preferência criada com sucesso:', result.id);
    console.log('Init Point:', result.init_point);

    res.json({
      preferenceId: result.id,
      initPoint: result.init_point,
      sandboxInitPoint: result.sandbox_init_point
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
    console.log('Webhook recebido:', req.body);
    
    // Apenas logar e responder OK
    // O Mercado Pago enviará notificações aqui quando houver pagamentos
    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Erro ao processar notificação' });
  }
});

// Buscar status de pagamento
router.get('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = orders.get(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Erro ao buscar status do pedido:', error);
    res.status(500).json({ error: 'Erro ao buscar status' });
  }
});

// Salvar pedido temporariamente
router.post('/save-order', async (req, res) => {
  try {
    const orderData = req.body;
    const orderId = orderData.orderId || 'order-' + Date.now();
    
    orders.set(orderId, {
      ...orderData,
      orderId,
      createdAt: new Date(),
      status: 'pending'
    });
    
    console.log(`Pedido ${orderId} salvo:`, orderData);
    res.json({ orderId, message: 'Pedido salvo com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
    res.status(500).json({ error: 'Erro ao salvar pedido' });
  }
});

export default router;
