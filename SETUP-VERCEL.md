# ⚡ Setup Rápido - Vercel

## ✅ MongoDB está funcionando!

Conexão testada e validada:
```
mongodb+srv://julio:julio123456@cluster0.jrvuoet.mongodb.net/adega-radio-tatuape
```

Coleções disponíveis:
- ✅ admins
- ✅ cupons / coupons
- ✅ pedidos
- ✅ products / produtos

---

## 🚀 Configuração do Backend no Vercel

### 1️⃣ Variáveis de Ambiente (COPIE E COLE)

Acesse: **Vercel Dashboard** → **Seu Projeto Backend** → **Settings** → **Environment Variables**

Cole estas variáveis (todas de uma vez):

```env
MONGODB_URI=mongodb+srv://julio:julio123456@cluster0.jrvuoet.mongodb.net/adega-radio-tatuape?retryWrites=true&w=majority
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-2659796196204628-103100-139afaccddfdbd53d140dd87fc7fa7aa-29008060
JWT_SECRET=adega_radio_tatuape_jwt_secret_key_2024
PORT=5000
NODE_ENV=production
STORE_ADDRESS=Rua Dante Pellacani, 92 - Tatuapé - São Paulo/SP - CEP 03334-070
STORE_LAT=-23.5505199
STORE_LNG=-46.6333094
STORE_PHONE=+5511970603441
WHATSAPP_NUMBER=5511970603441
FRONTEND_URL=https://adega-24-horas-delivery.vercel.app
```

**Importante:** Substitua `BACKEND_URL` pela URL real do seu backend após o primeiro deploy!

### 2️⃣ Deploy

Depois de adicionar as variáveis:
1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**
4. Aguarde o deploy finalizar

### 3️⃣ Testar Backend

Após deploy, teste se está funcionando:

```bash
# Substitua pela sua URL do backend
curl https://seu-backend.vercel.app/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-..."
}
```

### 4️⃣ Atualizar Frontend

Após ter a URL do backend, atualize no frontend:

**Vercel Dashboard** → **Projeto Frontend** → **Settings** → **Environment Variables**

Edite `VITE_API_URL`:
```
VITE_API_URL=https://seu-backend.vercel.app
```

Depois **Redeploy** o frontend.

---

## 🎯 Checklist Final

- [x] MongoDB conectado e funcionando
- [x] String de conexão validada
- [x] Coleções criadas no banco
- [ ] Variáveis adicionadas no Vercel (backend)
- [ ] Backend deployado no Vercel
- [ ] Health check testado e funcionando
- [ ] URL do backend atualizada no frontend
- [ ] Frontend redeployado
- [ ] Teste end-to-end (criar pedido)

---

## 🔍 Debug se algo der errado

### Erro: "Cannot connect to MongoDB"
- Verifique se a variável `MONGODB_URI` está correta no Vercel
- No MongoDB Atlas, adicione IP `0.0.0.0/0` para permitir qualquer IP

### Erro: "Cannot find module"
- Verifique se o `vercel.json` está na raiz do backend
- Build deve ter sucesso no Vercel

### Erro: CORS
- Já está configurado para aceitar o frontend em produção
- Verifique se a URL do frontend está correta no CORS

---

## 📞 Teste Rápido Local

Antes de deployar, teste localmente:

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Acesse `http://localhost:5173` e tente fazer um pedido.

Se funcionar localmente, funcionará em produção! 🚀
