# 🗄️ Configuração do MongoDB

## Opção 1: MongoDB Local (Windows)

### Instalar MongoDB Community Edition

1. **Download**:
   - Acesse: https://www.mongodb.com/try/download/community
   - Escolha: Windows x64
   - Baixe o instalador MSI

2. **Instalar**:
   - Execute o instalador
   - Escolha "Complete"
   - Marque "Install MongoDB as a Service"
   - Marque "Install MongoDB Compass" (opcional)

3. **Iniciar o serviço**:
```powershell
# Verificar se está rodando
Get-Service MongoDB

# Iniciar manualmente se necessário
Start-Service MongoDB

# Ou via net
net start MongoDB
```

4. **Testar conexão**:
```powershell
# Abrir MongoDB Shell
mongosh
```

## Opção 2: MongoDB Atlas (Cloud - RECOMENDADO)

### Configuração Rápida (5 minutos)

1. **Criar conta gratuita**:
   - Acesse: https://www.mongodb.com/cloud/atlas/register
   - Crie uma conta gratuita

2. **Criar cluster**:
   - Clique em "Build a Database"
   - Selecione "FREE" (M0)
   - Escolha região mais próxima (São Paulo)
   - Clique "Create"

3. **Configurar acesso**:
   - **Username/Password**: Crie credenciais (anote!)
   - **IP Whitelist**: Adicione `0.0.0.0/0` (permitir de qualquer lugar)
   - Clique "Finish and Close"

4. **Obter connection string**:
   - Clique em "Connect"
   - Escolha "Connect your application"
   - Copie a connection string
   - Formato: `mongodb+srv://username:password@cluster.mongodb.net/adega-radio-tatuape`

5. **Atualizar .env**:
```env
# Substituir em backend/.env
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/adega-radio-tatuape
```

## Após Configurar

```powershell
# Popular banco de dados
cd C:\uber\backend
npm run seed
```

Você deve ver:
```
✅ Conectado ao MongoDB
🗑️  Produtos anteriores removidos
✅ 88 produtos inseridos com sucesso
✅ Admin criado (email: admin@adega.com, senha: admin123)
✅ Cupons criados (BEMVINDO, FRETEGRATIS)
🎉 Seed concluído com sucesso!
```

## Troubleshooting

### Erro: ECONNREFUSED
- MongoDB não está rodando
- Inicie o serviço: `Start-Service MongoDB`

### Erro: Authentication failed
- Credenciais incorretas no Atlas
- Verifique username/password na connection string

### Erro: IP not whitelisted
- Adicione seu IP no Atlas
- Ou use `0.0.0.0/0` para permitir todos

## Ferramentas Úteis

- **MongoDB Compass**: GUI para visualizar dados
  - Download: https://www.mongodb.com/try/download/compass
  - Connect com sua URI

- **Mongosh**: CLI do MongoDB
  - Já vem com a instalação local
  - Para Atlas, use a connection string

## Próximos Passos

Após o MongoDB estar configurado:

1. Execute: `npm run seed` no backend
2. Inicie o backend: `npm run dev`
3. Teste a API: http://localhost:5000/api/products
