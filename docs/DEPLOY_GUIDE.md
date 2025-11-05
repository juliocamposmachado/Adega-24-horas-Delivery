# 🚀 Guia de Deploy

## ✅ Pré-requisitos

- [x] Código publicado no GitHub: https://github.com/juliocamposmachado/Adega-24-horas-Delivery
- [x] Build do frontend testado e funcionando
- [ ] MongoDB Atlas configurado
- [ ] Contas Vercel e Render criadas

## 📦 Deploy do Frontend (Vercel)

### Opção 1: Deploy Automático via Dashboard

1. **Acesse**: https://vercel.com
2. **Login** com GitHub
3. **Import Project**:
   - Selecione: `juliocamposmachado/Adega-24-horas-Delivery`
   - Framework Preset: **Vite**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Variáveis de Ambiente**:
   ```
   VITE_API_URL=https://seu-backend.onrender.com
   VITE_WHATSAPP_NUMBER=5511999999999
   ```

5. **Deploy**!

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd C:\uber\frontend
vercel --prod

# Configurar variáveis
vercel env add VITE_API_URL
vercel env add VITE_WHATSAPP_NUMBER
```

## 🖥️ Deploy do Backend (Render)

### 1. Criar Web Service

1. **Acesse**: https://render.com
2. **New +** → **Web Service**
3. **Connect Repository**: `Adega-24-horas-Delivery`
4. **Configurações**:
   - Name: `adega-radio-tatuape-api`
   - Region: `Ohio (US East)`
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

### 2. Variáveis de Ambiente

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/adega-radio-tatuape
JWT_SECRET=sua_chave_secreta_super_segura_aqui

# Uber Direct
UBER_CLIENT_ID=yxJNLv8B0vOc7Vgw7z3U9EJ-lcPcAVFl
UBER_CLIENT_SECRET=Mj_n4RU8SkKJdgCG5vKhYDs8FukOEeLWMWg5mePL
UBER_ASYMMETRIC_KEY_ID=afa7d84c-1017-4cd7-a1e4-bd501d1569fc
UBER_SANDBOX=true

# Loja
STORE_ADDRESS=Rua Tatuapé, 1000, São Paulo - SP, 03311-000
STORE_LAT=-23.5505199
STORE_LNG=-46.6333094
STORE_PHONE=+5511999999999
```

### 3. Deploy

- Clique em **Create Web Service**
- Aguarde o build (3-5 minutos)
- Copie a URL: `https://adega-radio-tatuape-api.onrender.com`

### 4. Popular Banco de Dados

```bash
# Via Render Shell
# No dashboard do Render, clique em "Shell"
npm run seed
```

Ou localmente:

```bash
# Configure MONGODB_URI no .env local
cd C:\uber\backend
npm run seed
```

## 🔗 Conectar Frontend ao Backend

1. **Vercel Dashboard** → Seu projeto
2. **Settings** → **Environment Variables**
3. Atualize `VITE_API_URL`:
   ```
   VITE_API_URL=https://adega-radio-tatuape-api.onrender.com
   ```
4. **Redeploy** (Deployments → ... → Redeploy)

## ✅ Verificar Deploy

### Frontend (Vercel)
```
https://seu-projeto.vercel.app
```
- [x] Página inicial carrega
- [x] Menu funciona
- [x] Páginas Sobre e Catálogo acessíveis
- [x] Botão WhatsApp funciona
- [x] Design responsivo

### Backend (Render)
```
https://adega-radio-tatuape-api.onrender.com
```

Testes:
```bash
# Health check
curl https://adega-radio-tatuape-api.onrender.com/health

# Listar produtos
curl https://adega-radio-tatuape-api.onrender.com/api/products
```

## 🔧 Configurações Adicionais

### Custom Domain (Vercel)

1. **Settings** → **Domains**
2. Adicione seu domínio: `adegatatuape.com`
3. Configure DNS conforme instruções

### CORS (Backend)

O backend já está configurado para aceitar requisições de qualquer origem. Para produção, edite `backend/src/server.js`:

```javascript
app.use(cors({
  origin: 'https://seu-projeto.vercel.app'
}));
```

### MongoDB Atlas Whitelist

1. Acesse MongoDB Atlas
2. **Network Access**
3. Adicione IP do Render:
   - `0.0.0.0/0` (todos) ou
   - IP específico do Render

## 🐛 Troubleshooting

### Frontend não carrega produtos
- Verifique `VITE_API_URL` no Vercel
- Backend deve estar rodando
- Verifique CORS

### Backend não conecta ao MongoDB
- Verifique `MONGODB_URI`
- IP do Render liberado no Atlas
- Credenciais corretas

### Build falha no Vercel
- Verifique `package.json` do frontend
- Root Directory deve ser `frontend`
- Output Directory deve ser `dist`

### Render fica "Building"
- Verifique logs no dashboard
- Root Directory deve ser `backend`
- Build Command: `npm install`
- Start Command: `npm start`

## 📊 Monitoramento

### Vercel Analytics
- Habilitado automaticamente
- Dashboard → Analytics

### Render Logs
- Dashboard → Logs (tempo real)
- Monitorar erros e requisições

## 💰 Custos

### Vercel
- **Free Tier**: 100GB bandwidth/mês
- Domínio custom: Gratuito
- Suficiente para começar

### Render
- **Free Tier**: 
  - 750h/mês
  - Sleep após 15min inatividade
  - Acordar em ~30s
- **Starter ($7/mês)**:
  - Sempre ativo
  - Melhor performance

### MongoDB Atlas
- **Free Tier (M0)**: 
  - 512MB storage
  - Suficiente para ~10k produtos

## 🎉 Deploy Completo!

URLs:
- **Frontend**: https://seu-projeto.vercel.app
- **Backend**: https://adega-radio-tatuape-api.onrender.com
- **Admin**: https://seu-projeto.vercel.app/admin/login

Credenciais:
- Email: admin@adega.com
- Senha: admin123

⚠️ **IMPORTANTE**: Altere a senha do admin em produção!
