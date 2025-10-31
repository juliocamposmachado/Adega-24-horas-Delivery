# 🔗 Como Obter a Connection String do MongoDB Atlas

Você já tem as credenciais:
- **Username**: juliocamposmachado_db_user
- **Password**: fPQ9IOQ34tA6sJa6

Agora precisa da **connection string completa** do seu cluster.

## Passo a Passo:

### 1. Acesse o MongoDB Atlas
https://cloud.mongodb.com/

### 2. Faça Login
Use suas credenciais do Atlas (não confundir com as credenciais do banco)

### 3. Selecione seu Cluster
- No dashboard, você verá seu cluster (ex: Cluster0, Cluster1, etc.)
- Clique em **"Connect"**

### 4. Escolha "Connect your application"
- Selecione: **Drivers**
- Driver: **Node.js**
- Version: **5.5 or later**

### 5. Copie a Connection String
Você verá algo assim:
```
mongodb+srv://juliocamposmachado_db_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

A parte `xxxxx` é única para seu cluster!

### 6. Substitua <password>
```
mongodb+srv://juliocamposmachado_db_user:fPQ9IOQ34tA6sJa6@cluster0.xxxxx.mongodb.net/adega-radio-tatuape?retryWrites=true&w=majority
```

## 📝 Depois de Obter:

Cole a connection string aqui e eu configuro tudo automaticamente!

Ou edite manualmente:
```powershell
# Abra o arquivo .env
notepad C:\uber\backend\.env

# Substitua a linha MONGODB_URI= pela sua connection string completa
```

## ⚡ Alternativa Rápida: Criar Novo Cluster

Se você ainda não tem cluster:

1. **Acesse**: https://cloud.mongodb.com/
2. **Build a Database** (botão verde)
3. **FREE** (M0 Sandbox)
4. **Provider**: AWS
5. **Region**: São Paulo (ou mais próximo)
6. **Cluster Name**: Cluster0 (ou qualquer nome)
7. **Create**

Depois:
1. **Security** → **Database Access**
   - Username: juliocamposmachado_db_user
   - Password: fPQ9IOQ34tA6sJa6
   - Role: Atlas Admin

2. **Network Access**
   - **Add IP Address**
   - **Allow Access from Anywhere**: 0.0.0.0/0
   - **Confirm**

3. **Connect** → **Drivers** → Copie a string!

---

**Tempo total**: 3-5 minutos ⏱️
