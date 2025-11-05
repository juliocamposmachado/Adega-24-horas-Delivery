# 📂 Estrutura do Projeto

```
uber/
├── 📁 backend/              # API Node.js + Express
│   ├── 📁 src/
│   │   ├── 📁 middleware/   # Auth, CORS, etc
│   │   ├── 📁 models/       # MongoDB Models
│   │   ├── 📁 routes/       # API Routes
│   │   ├── 📁 services/     # Business Logic
│   │   │   ├── uberDirectService.js
│   │   │   └── shippingService.js
│   │   └── server.js        # Entry Point
│   ├── .env.example         # Exemplo de configuração
│   ├── package.json
│   └── vercel.json          # Config Vercel
│
├── 📁 frontend/             # React + TypeScript
│   ├── 📁 public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── 📁 src/
│   │   ├── 📁 components/   # Componentes React
│   │   │   ├── AIChat.tsx
│   │   │   └── CartModal.tsx
│   │   ├── 📁 data/         # Dados estáticos
│   │   │   └── products.ts
│   │   ├── 📁 hooks/        # Custom Hooks
│   │   │   └── useCart.ts
│   │   ├── 📁 pages/        # Páginas principais
│   │   │   └── Checkout.tsx
│   │   ├── 📁 services/     # API Services
│   │   │   └── geminiService.ts
│   │   ├── App.tsx          # App Root
│   │   ├── main.tsx         # Entry Point
│   │   └── index.css        # Tailwind CSS
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── vercel.json
│
├── 📁 docs/                 # Documentação
│   ├── BUILD_VALIDATED.md
│   ├── DEPLOY_GUIDE.md
│   ├── INTEGRACOES.md
│   ├── MERCADO_PAGO_INTEGRATION.md
│   ├── MONGODB_SETUP.md
│   ├── QUICKSTART.md
│   └── PROJECT_STRUCTURE.md (este arquivo)
│
├── .gitignore               # Arquivos ignorados
├── README.md                # Documentação principal
├── configure-mongodb.ps1    # Script setup MongoDB
└── install.ps1              # Script instalação

```

## 🎯 Arquivos Principais

### Backend
- **server.js**: Servidor Express com MongoDB
- **routes/payment.js**: Mercado Pago integration
- **routes/shipping.js**: Cálculo de frete (zonas + Uber)
- **services/uberDirectService.js**: Integração Uber Direct API
- **services/shippingService.js**: Lógica de cálculo de frete

### Frontend
- **pages/Checkout.tsx**: 
  - Formulário de checkout
  - Integração Mercado Pago
  - Tela de sucesso com botões WhatsApp + Uber
- **hooks/useCart.ts**: Gerenciamento do carrinho (Zustand)
- **components/AIChat.tsx**: Chat AI com Gemini

## 🚀 Tecnologias

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Mercado Pago SDK
- Uber Direct SDK
- JWT Authentication
- CORS

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Zustand (state)
- React Router
- Framer Motion
- Lucide Icons

## 🔒 Arquivos Sensíveis (não versionados)

```
backend/.env
backend/.env.production
frontend/.env
frontend/.env.production
node_modules/
dist/
.vercel/
```

## 📦 Build & Deploy

### Local
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

### Produção
```bash
# Build frontend
cd frontend && npm run build

# Deploy (automático via GitHub)
git push origin main
```

## 🌐 URLs

- **Frontend**: https://adega-24-horas-delivery.vercel.app
- **Backend**: https://adega-backend-eta.vercel.app
- **GitHub**: https://github.com/juliocamposmachado/Adega-24-horas-Delivery

