import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Rotas
import paymentRoutes from './routes/payment.js';
import shippingRoutes from './routes/shipping.js';

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://adega-24-horas-delivery.vercel.app',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL // Adicionar a URL da Vercel para o backend
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requisições sem origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    // Em produção, permitir qualquer origem do Vercel
    if (origin.includes('vercel.app') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/payment', paymentRoutes);
app.use('/api/shipping', shippingRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Adega Rádio Tatuapé FM Express',
    version: '2.0.0',
    description: 'API simplificada - Mercado Pago + Uber Direct',
    endpoints: {
      payment: '/api/payment',
      health: '/api/health'
    }
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor apenas fora da Vercel (serverless)
const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌐 API disponível em http://localhost:${PORT}`);
    console.log(`✅ Sistema simplificado - Sem banco de dados`);
  });
}

export default app;
