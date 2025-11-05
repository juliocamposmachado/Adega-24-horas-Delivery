# 🚀 Início Rápido - Adega Rádio Tatuapé FM Express

## ⚡ Instalação Rápida (Windows)

```powershell
# Execute o script de instalação
.\install.ps1
```

## 📝 Configuração Manual

### 1. Backend

```bash
cd backend
npm install

# Copiar e configurar .env
copy .env.example .env

# Popular banco de dados
npm run seed

# Iniciar servidor
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install

# Copiar e configurar .env
copy .env.example .env

# Iniciar aplicação
npm run dev
```

## 🔑 Credenciais Padrão

- **Admin**: admin@adega.com / admin123
- **Cupons**: BEMVINDO (10% off) | FRETEGRATIS (R$ 15 off)

## 🌐 Acessos

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Painel Admin**: http://localhost:5173/admin/login

## ✅ Checklist de Implementação

### Backend (✅ Completo)
- [x] Servidor Express
- [x] Models MongoDB (Product, Order, Admin, Coupon)
- [x] Rotas de API completas
- [x] Integração Uber Direct
- [x] Autenticação JWT
- [x] Webhooks Uber
- [x] Script de seed

### Frontend (⚠️ Implementar componentes)
- [x] Estrutura base (Vite + React + TypeScript)
- [x] Configuração TailwindCSS
- [x] Store Zustand
- [x] Serviços API
- [ ] Componentes (ver FRONTEND_GUIDE.md)
- [ ] Páginas (Home, Catálogo, Checkout)
- [ ] Painel Admin

## 📚 Documentação

- **README.md**: Documentação completa
- **FRONTEND_GUIDE.md**: Guia de implementação do frontend
- **Backend**: C:\uber\backend\
- **Frontend**: C:\uber\frontend\

## 🛠️ Próximos Passos

1. **Configure o MongoDB**: Edite `backend/.env` com sua connection string
2. **Execute o seed**: `cd backend && npm run seed`
3. **Implemente o frontend**: Siga o guia em FRONTEND_GUIDE.md
4. **Teste a aplicação**: Faça um pedido teste
5. **Deploy**: Vercel (frontend) + Render/Heroku (backend)

## 🐛 Troubleshooting

### MongoDB não conecta
- Certifique-se que o MongoDB está rodando
- Verifique a `MONGODB_URI` no `.env`

### Uber Direct retorna erro
- Modo sandbox está ativado (valores simulados)
- Verifique as credenciais no `.env`

### Frontend não carrega produtos
- Backend deve estar rodando na porta 5000
- Verifique `VITE_API_URL` no frontend/.env

## 📞 Suporte

- WhatsApp: Configurar em `.env`
- Email: Configure no painel admin

---

**Desenvolvido com ❤️ para Adega Rádio Tatuapé FM Express**
