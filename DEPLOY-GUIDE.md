# 🚀 Guia de Deploy - Projetos Separados

## 📁 Estrutura do Repositório

```
uber/
├── frontend/          # Projeto React/Vite
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Projeto Node.js/Express
│   ├── src/
│   ├── package.json
│   └── vercel.json
└── vercel.json        # Configuração do FRONTEND (raiz)
```

---

## 🎯 Deploy no Vercel - 2 Projetos

Você precisa criar **DOIS projetos separados** no Vercel:

### 1️⃣ Projeto Frontend

**Configuração no Vercel:**
- **Root Directory:** `frontend`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

**Variáveis de Ambiente:**
```env
VITE_API_URL=https://seu-backend.vercel.app
VITE_WHATSAPP_NUMBER=5511970603441
VITE_MERCADO_PAGO_PUBLIC_KEY=APP_USR-f3a01baf-5329-48cc-8941-d9eb8f2aa898
```

**OU** use o `vercel.json` na raiz (já está configurado):
- Detecta automaticamente como projeto frontend
- Instala dependências da pasta `frontend/`
- Builda corretamente

---

### 2️⃣ Projeto Backend

**Configuração no Vercel:**
- **Root Directory:** `backend`
- **Framework Preset:** Other
- **Build Command:** (deixar vazio)
- **Output Directory:** (deixar vazio)

O arquivo `backend/vercel.json` já está configurado.

**Variáveis de Ambiente:**
```env
MONGODB_URI=mongodb+srv://julio:julio123456@cluster0.jrvuoet.mongodb.net/adega-radio-tatuape?retryWrites=true&w=majority
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-2659796196204628-103100-139afaccddfdbd53d140dd87fc7fa7aa-29008060
JWT_SECRET=adega_radio_tatuape_jwt_secret_key_2024
NODE_ENV=production
FRONTEND_URL=https://adega-24-horas-delivery.vercel.app
BACKEND_URL=https://seu-backend.vercel.app
STORE_ADDRESS=Rua Dante Pellacani, 92 - Tatuapé - São Paulo/SP - CEP 03334-070
STORE_PHONE=+5511970603441
WHATSAPP_NUMBER=5511970603441
```

---

## ✅ Passo a Passo - Deploy Correto

### Opção A: Via Vercel Dashboard (Recomendado)

#### Frontend:
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Selecione seu repositório GitHub
3. **Configure Project:**
   - Project Name: `adega-frontend`
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
4. Adicione as variáveis de ambiente
5. Clique em **Deploy**

#### Backend:
1. Acesse [vercel.com/new](https://vercel.com/new) novamente
2. Selecione o **MESMO repositório**
3. **Configure Project:**
   - Project Name: `adega-backend`
   - Framework Preset: **Other**
   - Root Directory: **backend**
4. Adicione as variáveis de ambiente
5. Clique em **Deploy**

### Opção B: Via Vercel CLI

```bash
# Deploy Frontend
cd frontend
vercel --prod

# Deploy Backend
cd ../backend
vercel --prod
```

---

## 🔧 Se Já Existe um Projeto e Está Dando Erro

### Para o Frontend:
1. Vá em **Settings** → **General**
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm install`
6. Salve e faça **Redeploy**

### Para o Backend:
1. Vá em **Settings** → **General**
2. **Root Directory:** `backend`
3. **Build Command:** (deixar vazio)
4. **Output Directory:** (deixar vazio)
5. Salve e faça **Redeploy**

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'frontend'"
- **Causa:** Root Directory não está configurado
- **Solução:** Configure Root Directory como `frontend` ou `backend`

### Erro: "Build failed"
- **Causa:** Tentando buildar o projeto errado
- **Solução:** Verifique Root Directory e Build Command

### Erro: "Module not found" no runtime
- **Causa:** Dependências não instaladas
- **Solução:** Verifique se `package.json` está na pasta correta

---

## ✅ Checklist Final

Frontend:
- [ ] Projeto criado no Vercel
- [ ] Root Directory = `frontend`
- [ ] Framework = Vite
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy bem-sucedido
- [ ] Site acessível

Backend:
- [ ] Projeto criado no Vercel (separado)
- [ ] Root Directory = `backend`
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy bem-sucedido
- [ ] `/health` endpoint funcionando
- [ ] Frontend consegue se comunicar com backend

---

## 📝 URLs Finais

Depois do deploy, você terá:

- **Frontend:** `https://adega-24-horas-delivery.vercel.app`
- **Backend:** `https://seu-backend.vercel.app`

Não esqueça de atualizar:
1. `VITE_API_URL` no frontend com URL do backend
2. `BACKEND_URL` no backend com sua própria URL
3. `FRONTEND_URL` no backend com URL do frontend

---

## 🎉 Sucesso!

Se tudo estiver correto:
- ✅ Frontend carrega
- ✅ Chat AI funciona
- ✅ Produtos aparecem
- ✅ Checkout funciona
- ✅ Mercado Pago abre
- ✅ Pedidos são salvos no MongoDB
