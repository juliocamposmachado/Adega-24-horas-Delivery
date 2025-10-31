# 🍷 Adega Rádio Tatuapé FM Express

Sistema completo de e-commerce para loja de bebidas com integração Uber Direct para entregas.

## 🏗️ Arquitetura

- **Frontend**: React + TypeScript + TailwindCSS + Vite
- **Backend**: Node.js + Express + MongoDB
- **Autenticação**: JWT
- **Entregas**: Uber Direct SDK oficial
- **Hospedagem**: Vercel (frontend) + Render/Heroku (backend)

## 📋 Pré-requisitos

- Node.js 18+
- MongoDB (local ou Atlas)
- Conta Uber Direct (sandbox)

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
MONGODB_URI=mongodb://localhost:27017/adega-radio-tatuape
JWT_SECRET=sua_chave_secreta_super_segura_aqui

# Uber Direct Credentials
UBER_CLIENT_ID=yxJNLv8B0vOc7Vgw7z3U9EJ-lcPcAVFl
UBER_CLIENT_SECRET=Mj_n4RU8SkKJdgCG5vKhYDs8FukOEeLWMWg5mePL
UBER_ASYMMETRIC_KEY_ID=afa7d84c-1017-4cd7-a1e4-bd501d1569fc
UBER_SANDBOX=true

# Endereço da loja
STORE_ADDRESS=Rua Tatuapé, São Paulo - SP
STORE_PHONE=+5511999999999
```

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
```

Crie o arquivo `.env` na pasta `frontend`:

```env
VITE_API_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=5511999999999
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

✅ Catálogo completo de produtos (vinhos, cervejas, destilados, etc.)
✅ Carrinho de compras
✅ Checkout com cálculo de frete via Uber Direct
✅ Rastreamento em tempo real
✅ Painel administrativo
✅ CRUD de produtos
✅ Sistema de cupons
✅ Integração WhatsApp
✅ Responsivo (mobile + desktop)

## 📱 Integração Uber Direct

O sistema usa o SDK oficial da Uber Direct para:
- Cálculo de frete em tempo real
- Criação de entregas
- Rastreamento via webhook
- Status: "Criado", "Em rota", "Entregue"

## 🎨 Design

- Tema escuro elegante
- Paleta vinho e dourado
- Animações com Framer Motion
- Ícones Lucide React

## 📄 Licença

MIT

## 📞 Suporte

WhatsApp: (11) 99999-9999
