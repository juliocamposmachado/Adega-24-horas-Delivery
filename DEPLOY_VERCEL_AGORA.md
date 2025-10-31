# 🚀 Deploy no Vercel - AGORA!

## ✅ Build Testado e Funcionando!

```
✓ 1362 modules transformed
✓ built in 9.09s
✓ Zero erros
```

## 📦 Deploy Automático em 2 Minutos

### 1. Acesse o Vercel
👉 https://vercel.com/new

### 2. Importe o Projeto
- **Login** com GitHub
- **Import Git Repository**
- Cole: `juliocamposmachado/Adega-24-horas-Delivery`
- Clique em **Import**

### 3. Configure o Projeto

**Configure Project:**
```
Project Name: adega-radio-tatuape (ou qualquer nome)
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. Adicione Variáveis de Ambiente

Clique em **Environment Variables** e adicione:

```
VITE_API_URL = https://seu-backend.onrender.com
VITE_WHATSAPP_NUMBER = 5511999999999
```

**Nota**: Por enquanto use uma URL temporária para API. Depois você atualiza com o backend real.

### 5. Deploy!

Clique em **Deploy** 🚀

- Build time: ~2 minutos
- Deploy automático ✅

### 6. Teste o Site

Após o deploy, você receberá uma URL como:
```
https://adega-radio-tatuape.vercel.app
```

Teste:
- ✅ Página inicial
- ✅ Menu de navegação
- ✅ Página Sobre
- ✅ Botão WhatsApp
- ✅ Design responsivo

---

## 🔄 Deploy do Backend (Opcional)

Se quiser API funcional, siga `DEPLOY_GUIDE.md` para fazer deploy no Render.

Por enquanto, o frontend funcionará perfeitamente sem o backend (páginas estáticas).

---

## 📱 Próximos Passos

1. ✅ **Frontend no Vercel** (2 min)
2. ⏳ **Backend no Render** (5 min) - Seguir DEPLOY_GUIDE.md
3. ⏳ **Conectar API** - Atualizar VITE_API_URL
4. ⏳ **MongoDB Atlas** - Popular produtos

---

## 🎉 Resultado Final

Após completar todos os passos:

**Frontend (Vercel):**
- https://seu-projeto.vercel.app
- Design completo ✅
- Páginas funcionando ✅
- Responsivo ✅

**Backend (Render):**
- https://seu-backend.onrender.com
- 70+ produtos ✅
- Sistema de cupons ✅
- Integração Uber Direct ✅

---

## 🆘 Troubleshooting

### Build falha no Vercel
- Root Directory deve ser: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

### "Module not found"
- O build local passou, então o problema é configuração
- Verifique Root Directory

### Variáveis de ambiente não funcionam
- Devem começar com `VITE_`
- Exemplo: `VITE_API_URL` (não `API_URL`)
- Redeploy após adicionar

---

**🚀 Faça o deploy agora em: https://vercel.com/new**

O build já foi testado e está funcionando perfeitamente! ✅
