# 🚀 Deploy via Vercel CLI - Guia Passo a Passo

## ✅ Status
- Vercel CLI: Instalado (v48.2.9)
- Login: astridnielsen-lab ✅

---

## 📋 Deploy do Frontend

### Passo 1: Ir para a pasta do frontend
```bash
cd C:\uber\frontend
```

### Passo 2: Deploy (primeira vez)
```bash
vercel
```

Responda as perguntas:
- **Set up and deploy?** → Yes
- **Which scope?** → astridnielsen-lab
- **Link to existing project?** → No (se for primeira vez)
- **What's your project's name?** → adega-frontend
- **In which directory is your code located?** → ./
- **Want to override the settings?** → No

### Passo 3: Adicionar variáveis de ambiente
```bash
vercel env add VITE_API_URL
```
Cole: `https://seu-backend.vercel.app` (vai ter depois do deploy do backend)

```bash
vercel env add VITE_WHATSAPP_NUMBER
```
Cole: `5511970603441`

```bash
vercel env add VITE_MERCADO_PAGO_PUBLIC_KEY
```
Cole: `APP_USR-f3a01baf-5329-48cc-8941-d9eb8f2aa898`

### Passo 4: Deploy para produção
```bash
vercel --prod
```

Anote a URL do frontend que aparecer (ex: `https://adega-frontend.vercel.app`)

---

## 📋 Deploy do Backend

### Passo 1: Ir para a pasta do backend
```bash
cd C:\uber\backend
```

### Passo 2: Deploy (primeira vez)
```bash
vercel
```

Responda as perguntas:
- **Set up and deploy?** → Yes
- **Which scope?** → astridnielsen-lab
- **Link to existing project?** → No
- **What's your project's name?** → adega-backend
- **In which directory is your code located?** → ./
- **Want to override the settings?** → No

### Passo 3: Adicionar variáveis de ambiente

```bash
# MongoDB
vercel env add MONGODB_URI
```
Cole: `mongodb+srv://julio:julio123456@cluster0.jrvuoet.mongodb.net/adega-radio-tatuape?retryWrites=true&w=majority`

```bash
# Mercado Pago
vercel env add MERCADO_PAGO_ACCESS_TOKEN
```
Cole: `APP_USR-2659796196204628-103100-139afaccddfdbd53d140dd87fc7fa7aa-29008060`

```bash
# JWT
vercel env add JWT_SECRET
```
Cole: `adega_radio_tatuape_jwt_secret_key_2024`

```bash
# Node Env
vercel env add NODE_ENV
```
Cole: `production`

```bash
# URLs
vercel env add FRONTEND_URL
```
Cole a URL do frontend que você anotou: `https://adega-frontend.vercel.app`

```bash
vercel env add BACKEND_URL
```
Cole: `production` (vai ser preenchida depois)

```bash
# Loja
vercel env add STORE_ADDRESS
```
Cole: `Rua Dante Pellacani, 92 - Tatuapé - São Paulo/SP - CEP 03334-070`

```bash
vercel env add STORE_PHONE
```
Cole: `+5511970603441`

```bash
vercel env add WHATSAPP_NUMBER
```
Cole: `5511970603441`

### Passo 4: Deploy para produção
```bash
vercel --prod
```

Anote a URL do backend (ex: `https://adega-backend.vercel.app`)

---

## 🔄 Atualizar URLs

### Atualizar VITE_API_URL no Frontend

```bash
cd C:\uber\frontend
vercel env rm VITE_API_URL production
vercel env add VITE_API_URL production
```
Cole a URL do backend: `https://adega-backend.vercel.app`

```bash
vercel --prod
```

### Atualizar BACKEND_URL no Backend

```bash
cd C:\uber\backend
vercel env rm BACKEND_URL production
vercel env add BACKEND_URL production
```
Cole a URL do backend: `https://adega-backend.vercel.app`

```bash
vercel --prod
```

---

## ✅ Testar Deploys

### Testar Frontend
Abra no navegador:
```
https://adega-frontend.vercel.app
```

### Testar Backend
```bash
curl https://adega-backend.vercel.app/health
```

Deve retornar:
```json
{"status":"ok","timestamp":"2024-..."}
```

---

## 🎯 Comandos Úteis

```bash
# Ver variáveis de ambiente
vercel env ls

# Remover variável de ambiente
vercel env rm NOME_DA_VARIAVEL

# Ver logs em tempo real
vercel logs

# Ver lista de projetos
vercel ls

# Listar deploys de um projeto
vercel ls --scope astridnielsen-lab

# Cancelar um deploy
vercel rm [deployment-url]
```

---

## 🔄 Redeploy Rápido (após mudanças no código)

### Frontend:
```bash
cd C:\uber\frontend
git pull
vercel --prod
```

### Backend:
```bash
cd C:\uber\backend
git pull
vercel --prod
```

---

## 🐛 Troubleshooting

### Erro: "No token found"
```bash
vercel login
```

### Erro: "Failed to build"
Verifique os logs:
```bash
vercel logs
```

### Erro: CORS
As URLs já estão configuradas no código. Verifique se:
1. Backend tem `FRONTEND_URL` correto
2. Frontend tem `VITE_API_URL` correto

---

## 📝 Checklist Final

- [ ] Frontend deployado e acessível
- [ ] Backend deployado e `/health` funcionando
- [ ] Variáveis de ambiente configuradas
- [ ] URLs atualizadas (VITE_API_URL e BACKEND_URL)
- [ ] Testado criação de pedido
- [ ] Chat AI funcionando
- [ ] Mercado Pago abrindo

🎉 **Pronto! Sua aplicação está no ar!**
