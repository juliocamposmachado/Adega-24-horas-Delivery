# ✅ Checklist de Deploy - Adega Rádio Tatuapé FM

## 🔧 Configurações Necessárias no Vercel

### Backend (https://vercel.com/seu-usuario/adega-backend)

Adicione as seguintes variáveis de ambiente:

```env
# MongoDB (OBRIGATÓRIO)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adega?retryWrites=true&w=majority

# Mercado Pago (OBRIGATÓRIO)
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-2659796196204628-103100-139afaccddfdbd53d140dd87fc7fa7aa-29008060

# URLs (OBRIGATÓRIO)
FRONTEND_URL=https://adega-24-horas-delivery.vercel.app
BACKEND_URL=https://seu-backend.vercel.app

# Server
PORT=5000
NODE_ENV=production

# JWT (Gere uma chave aleatória)
JWT_SECRET=sua_chave_secreta_aqui

# Loja
STORE_ADDRESS=Rua Dante Pellacani, 92 - Tatuapé - São Paulo/SP - CEP 03334-070
STORE_PHONE=+5511970603441
STORE_LAT=-23.5505199
STORE_LNG=-46.6333094

# WhatsApp
WHATSAPP_NUMBER=5511970603441

# Uber Direct (OPCIONAL - pode deixar em branco por enquanto)
UBER_DIRECT_CLIENT_ID=
UBER_DIRECT_CLIENT_SECRET=
UBER_ASYMMETRIC_KEY_ID=
UBER_SANDBOX=true
```

### Frontend (Já configurado ✅)

```env
VITE_API_URL=https://adega-24-horas-delivery.vercel.app
VITE_WHATSAPP_NUMBER=5511970603441
VITE_MERCADO_PAGO_PUBLIC_KEY=APP_USR-f3a01baf-5329-48cc-8941-d9eb8f2aa898
```

---

## 🐛 Problemas Identificados e Soluções

### ❌ Erro: "Failed to fetch"

**Causa**: Backend não está acessível ou CORS não configurado

**Soluções aplicadas:**
1. ✅ CORS configurado para aceitar frontend em produção
2. ✅ Rota `/api/orders` simplificada (não depende de produtos cadastrados)
3. ✅ Uber Direct tornou-se opcional (não bloqueia pedido)
4. ✅ Frete fixo de R$ 15.00 enquanto Uber não está configurado

**O que falta:**
- [ ] Configurar MongoDB URI no Vercel
- [ ] Verificar se backend está fazendo deploy sem erros
- [ ] Testar endpoint manualmente: `https://seu-backend.vercel.app/health`

---

## 📝 Passos para Resolver

### 1️⃣ Configurar MongoDB

Se ainda não tem MongoDB:

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Crie um usuário e senha
4. Adicione seu IP (ou 0.0.0.0/0 para permitir qualquer IP)
5. Copie a connection string
6. Cole no Vercel como `MONGODB_URI`

### 2️⃣ Adicionar Variáveis no Vercel

1. Acesse seu projeto backend no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione **TODAS** as variáveis listadas acima
4. Clique em **Save**
5. Faça **Redeploy** do backend

### 3️⃣ Testar Backend

```bash
# Testar health check
curl https://seu-backend.vercel.app/health

# Deve retornar:
{"status":"ok","timestamp":"2024-..."}

# Testar criação de preferência
curl -X POST https://seu-backend.vercel.app/api/payment/create-preference \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"name":"Vinho","price":50,"quantity":1}],
    "payer": {"name":"Teste","phone":"11999999999","email":"teste@teste.com","address":"Rua Teste, 123"}
  }'
```

### 4️⃣ Atualizar Frontend

Se a URL do backend mudou, atualize no Vercel:

1. Projeto frontend → **Settings** → **Environment Variables**
2. Editar `VITE_API_URL` para a URL correta do backend
3. **Redeploy** do frontend

---

## 🎯 Status Atual

### ✅ Funcionando
- [x] Frontend buildando sem erros
- [x] CORS configurado
- [x] Mercado Pago SDK React instalado
- [x] Chat AI Gemini implementado
- [x] Rota de checkout configurada
- [x] Componente Wallet do Mercado Pago

### ⚠️ Pendente
- [ ] MongoDB configurado no backend
- [ ] Backend acessível em produção
- [ ] Teste de criação de pedido end-to-end
- [ ] Webhook do Mercado Pago configurado

### 🔜 Opcional (para depois)
- [ ] Uber Direct configurado
- [ ] Frete dinâmico via Uber
- [ ] Cadastro de produtos no banco
- [ ] Painel admin funcional

---

## 🚨 Debug

Se continuar com erro "Failed to fetch":

1. **Abra o DevTools** (F12) no navegador
2. Vá na aba **Network**
3. Tente fazer um pedido
4. Veja qual requisição falhou
5. Copie a URL e o erro
6. Verifique:
   - A URL está correta?
   - O backend responde nessa URL?
   - Há erro CORS?
   - O status é 500 (erro do servidor) ou 404 (rota não encontrada)?

---

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs do Vercel (backend e frontend)
2. Teste as URLs manualmente com curl
3. Confirme que todas as variáveis de ambiente estão configuradas
