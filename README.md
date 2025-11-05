# 🍷 Adega Rádio Tatuapé FM Express

Sistema completo de e-commerce para loja de bebidas com integração Mercado Pago e Uber Direct para entregas.

## 👨‍💻 Desenvolvedor

**Julio Campos Machado**
- 📱 WhatsApp: (11) 99294-6628 / (11) 97060-3441
- 📧 Email: juliocamposmachado@gmail.com
- 🏢 Empresa: Like Look Solutions
- 🌐 Website: https://likelook.wixsite.com/solutions

## 🏗️ Arquitetura

- **Frontend**: React + TypeScript + TailwindCSS + Vite
- **Backend**: Node.js + Express + MongoDB
- **Autenticação**: JWT
- **Pagamentos**: Mercado Pago SDK
- **Entregas**: Uber Direct SDK oficial
- **Hospedagem**: Vercel (fullstack)

## 📋 Pré-requisitos

- Node.js 18+
- MongoDB Atlas
- Conta Uber Direct (sandbox)
- Conta Mercado Pago (produção)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd uber
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend`:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/adega-radio-tatuape?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta_super_segura_aqui

# Uber Direct Credentials
UBER_CLIENT_ID=seu_client_id
UBER_CLIENT_SECRET=seu_client_secret
UBER_ASYMMETRIC_KEY_ID=seu_key_id
UBER_SANDBOX=true

# Endereço da loja
STORE_ADDRESS=Rua Dante Pellacani, 92 - Tatuapé - São Paulo/SP - CEP 03334-070
STORE_LAT=-23.5505199
STORE_LNG=-46.6333094
STORE_PHONE=+5511970603441

# WhatsApp
WHATSAPP_NUMBER=5511970603441

# Mercado Pago Credentials
MERCADO_PAGO_PUBLIC_KEY=sua_public_key
MERCADO_PAGO_ACCESS_TOKEN=seu_access_token
MERCADO_PAGO_CLIENT_ID=seu_client_id
MERCADO_PAGO_CLIENT_SECRET=seu_client_secret

# URLs
FRONTEND_URL=https://adega-24-horas-delivery.vercel.app
BACKEND_URL=https://adega-backend-eta.vercel.app
```

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
```

Crie o arquivo `.env` na pasta `frontend`:

```env
VITE_API_URL=https://adega-backend-eta.vercel.app
VITE_WHATSAPP_NUMBER=5511970603441
VITE_MERCADO_PAGO_PUBLIC_KEY=sua_public_key
```

## 🎯 Executar em Desenvolvimento

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Acesse: http://localhost:5173

## 👤 Credenciais Admin Padrão

- **Email**: admin@adega.com
- **Senha**: admin123

**⚠️ IMPORTANTE**: Altere essas credenciais em produção!

## 📦 Deploy

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

Configure as variáveis de ambiente no painel Vercel.

### Backend (Render/Heroku)

**Render:**
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático

**Heroku:**
```bash
cd backend
heroku create adega-radio-tatuape-api
git push heroku main
```

## 🛠️ Funcionalidades

✅ Catálogo completo de produtos (vinhos, cervejas, destilados, energéticos, etc.)
✅ Carrinho de compras com persistência
✅ Checkout com múltiplas formas de pagamento
✅ Integração Mercado Pago (PIX + Cartão)
✅ Cálculo de frete via Uber Direct
✅ Rastreamento em tempo real
✅ Painel administrativo completo
✅ CRUD de produtos
✅ Sistema de cupons de desconto
✅ Integração WhatsApp para suporte
✅ Chat AI para recomendações
✅ Responsivo (mobile + desktop)
✅ SEO otimizado

## 💳 Integrações

### Mercado Pago
- Pagamento via PIX
- Pagamento com cartão de crédito/débito
- Webhook para confirmação automática
- Interface customizada com SDK React

### Uber Direct
- Cálculo de frete em tempo real
- Criação automática de entregas
- Rastreamento via webhook
- Status: "Criado", "Em rota", "Entregue"

## 🎨 Design

- Tema escuro elegante
- Paleta vinho e dourado
- Animações com Framer Motion
- Ícones Lucide React

## 📄 Licença

MIT

## 🔐 Segurança

- ✅ Variáveis de ambiente protegidas
- ✅ Autenticação JWT
- ✅ Validação de dados
- ✅ CORS configurado
- ✅ Rate limiting

## 📞 Suporte

**Loja**: Adega Rádio Tatuapé FM Express
- 📱 WhatsApp: (11) 97060-3441
- 📍 Endereço: Rua Dante Pellacani, 92 - Tatuapé - São Paulo/SP

**Desenvolvedor**: Julio Campos Machado
- 📱 WhatsApp: (11) 99294-6628 / (11) 97060-3441
- 📧 Email: juliocamposmachado@gmail.com
- 🏢 Like Look Solutions: https://likelook.wixsite.com/solutions
