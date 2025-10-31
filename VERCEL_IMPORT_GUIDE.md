# Guia de Importação de Variáveis de Ambiente no Vercel

## Arquivos Criados

✅ `backend/.env.production` - Variáveis do backend
✅ `frontend/.env.production` - Variáveis do frontend

## Como Importar no Vercel Dashboard

### Método 1: Upload via Interface (Recomendado)

#### Backend:
1. Acesse seu projeto backend no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Clique em **Add New** (botão no topo)
4. Clique em **Import .env File**
5. Faça upload do arquivo `backend/.env.production`
6. Selecione os ambientes: **Production**, **Preview**, **Development**
7. Clique em **Import**

#### Frontend:
1. Acesse seu projeto frontend no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Clique em **Add New** (botão no topo)
4. Clique em **Import .env File**
5. Faça upload do arquivo `frontend/.env.production`
6. Selecione os ambientes: **Production**, **Preview**, **Development**
7. Clique em **Import**

### Método 2: Copiar e Colar Manual

Se a importação automática não funcionar:

#### Backend:
1. Abra o arquivo `backend/.env.production` em um editor de texto
2. Copie todo o conteúdo
3. No Vercel → **Settings** → **Environment Variables**
4. Clique em **Plaintext** (no canto superior direito)
5. Cole o conteúdo copiado
6. Selecione os ambientes: **Production**, **Preview**, **Development**
7. Clique em **Add**

#### Frontend:
1. Abra o arquivo `frontend/.env.production` em um editor de texto
2. Copie o conteúdo
3. No Vercel → **Settings** → **Environment Variables**
4. Clique em **Plaintext**
5. Cole o conteúdo
6. Selecione os ambientes: **Production**, **Preview**, **Development**
7. Clique em **Add**

## ⚠️ IMPORTANTE - Atualizar URLs Após Deploy

Depois do primeiro deploy, você precisa atualizar as URLs:

### 1. Anote as URLs do Vercel:
```
Backend: https://seu-backend-xxx.vercel.app
Frontend: https://seu-frontend-xxx.vercel.app
```

### 2. Atualizar variáveis no Backend:
- `FRONTEND_URL` → Sua URL do frontend
- `BACKEND_URL` → Sua URL do backend

### 3. Atualizar variáveis no Frontend:
- `VITE_API_URL` → Sua URL do backend

### 4. Fazer Redeploy:
Após atualizar as URLs, vá em **Deployments** e clique em **Redeploy** nos dois projetos.

## Configurar Webhook do Mercado Pago

Depois do deploy do backend:

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Faça login com sua conta Mercado Pago
3. Vá em **Suas integrações** → **Webhooks**
4. Clique em **Configurar notificações**
5. Adicione a URL: `https://seu-backend-xxx.vercel.app/api/payment/webhook`
6. Selecione o evento: **Payments**
7. Clique em **Salvar**

## Verificar se Funcionou

Após deploy e configuração:

```bash
# Testar backend
curl https://seu-backend-xxx.vercel.app/health

# Deve retornar:
{"status":"ok","timestamp":"..."}

# Testar frontend
curl https://seu-frontend-xxx.vercel.app

# Deve retornar HTML da página
```

## Variáveis Configuradas

### Backend (15 variáveis):
- ✅ PORT
- ✅ MONGODB_URI
- ✅ JWT_SECRET
- ✅ UBER_CLIENT_ID
- ✅ UBER_CLIENT_SECRET
- ✅ UBER_ASYMMETRIC_KEY_ID
- ✅ UBER_SANDBOX
- ✅ STORE_ADDRESS
- ✅ STORE_LAT
- ✅ STORE_LNG
- ✅ STORE_PHONE
- ✅ MERCADO_PAGO_PUBLIC_KEY
- ✅ MERCADO_PAGO_ACCESS_TOKEN
- ✅ MERCADO_PAGO_CLIENT_ID
- ✅ MERCADO_PAGO_CLIENT_SECRET
- ⚠️ FRONTEND_URL (atualizar após deploy)
- ⚠️ BACKEND_URL (atualizar após deploy)

### Frontend (1 variável):
- ⚠️ VITE_API_URL (atualizar após deploy)

## Troubleshooting

### Problema: Variáveis não aparecem no build
**Solução**: Faça um redeploy após adicionar as variáveis

### Problema: Erro ao conectar MongoDB
**Solução**: Verifique se a string de conexão está correta e se o IP do Vercel está na whitelist do MongoDB Atlas

### Problema: Pagamentos não funcionam
**Solução**: 
1. Verifique se as credenciais do Mercado Pago estão corretas
2. Confirme que o webhook foi configurado
3. Teste com cartões de teste primeiro

### Problema: Frontend não consegue chamar API
**Solução**: Verifique se `VITE_API_URL` aponta para a URL correta do backend

## Segurança

⚠️ **ATENÇÃO**:
- Os arquivos `.env.production` foram adicionados ao Git APENAS para facilitar a importação
- As credenciais são de **PRODUÇÃO** - proteja-as!
- Após importar no Vercel, você pode deletar os arquivos `.env.production` do repositório se preferir
- NUNCA compartilhe essas credenciais publicamente

## Próximos Passos

Após configurar tudo:
1. ✅ Importar variáveis no Vercel (backend e frontend)
2. ✅ Fazer primeiro deploy
3. ⚠️ Atualizar URLs nas variáveis de ambiente
4. ✅ Configurar webhook do Mercado Pago
5. ✅ Testar pedido completo (use cartão de teste!)
6. ✅ Verificar se webhook está recebendo notificações
