# Configuração de Variáveis de Ambiente no Vercel

## Backend (API)

Acesse o projeto do backend no Vercel e configure as seguintes variáveis:

### MongoDB
```
MONGODB_URI=mongodb+srv://julio:julio123456@cluster0.jrvuoet.mongodb.net/adega-radio-tatuape?retryWrites=true&w=majority
```

### JWT
```
JWT_SECRET=adega_radio_tatuape_jwt_secret_key_2024
```

### Uber Direct
```
UBER_CLIENT_ID=yxJNLv8B0vOc7Vgw7z3U9EJ-lcPcAVFl
UBER_CLIENT_SECRET=Mj_n4RU8SkKJdgCG5vKhYDs8FukOEeLWMWg5mePL
UBER_ASYMMETRIC_KEY_ID=afa7d84c-1017-4cd7-a1e4-bd501d1569fc
UBER_SANDBOX=true
```

### Loja
```
STORE_ADDRESS=Rua Tatuapé, 1000, São Paulo - SP, 03311-000
STORE_LAT=-23.5505199
STORE_LNG=-46.6333094
STORE_PHONE=+5511970603441
```

### Mercado Pago (Produção)
```
MERCADO_PAGO_PUBLIC_KEY=APP_USR-f3a01baf-5329-48cc-8941-d9eb8f2aa898
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-2659796196204628-103100-139afaccddfdbd53d140dd87fc7fa7aa-29008060
MERCADO_PAGO_CLIENT_ID=2659796196204628
MERCADO_PAGO_CLIENT_SECRET=pzonUdYKHi7r98HO82X85U59WHrQDNQc
```

### URLs (Atualizar com URLs reais após deploy)
```
FRONTEND_URL=https://seu-frontend.vercel.app
BACKEND_URL=https://seu-backend.vercel.app
```

---

## Frontend

Acesse o projeto do frontend no Vercel e configure:

```
VITE_API_URL=https://seu-backend.vercel.app
```

---

## Como configurar no Vercel:

### Via Dashboard:
1. Acesse seu projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione cada variável com seus respectivos valores
4. Selecione os ambientes: **Production**, **Preview**, **Development**
5. Clique em **Save**
6. Faça um novo deploy ou acesse **Deployments** e clique em **Redeploy**

### Via CLI:
```bash
# Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# Login
vercel login

# Configurar variáveis (no diretório do projeto)
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add UBER_CLIENT_ID production
# ... repetir para todas as variáveis

# Ou usar arquivo .env
vercel env pull .env.production
```

---

## Webhook do Mercado Pago

Após o deploy, configure a URL do webhook no painel do Mercado Pago:

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá em **Suas integrações** → **Webhooks**
3. Adicione a URL: `https://seu-backend.vercel.app/api/payment/webhook`
4. Selecione os eventos: **Payments**
5. Salve

---

## Verificação

Após configurar, teste os endpoints:

```bash
# Health check backend
curl https://seu-backend.vercel.app/health

# Health check frontend
curl https://seu-frontend.vercel.app
```

## Importante

- ⚠️ **NUNCA** commite arquivos `.env` no Git
- ✅ As credenciais configuradas são de **PRODUÇÃO**
- ✅ Webhook será chamado automaticamente pelo Mercado Pago
- ✅ URLs de retorno serão ajustadas automaticamente
