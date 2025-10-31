# 🔐 Configurar Usuário MongoDB Atlas

## ❌ Problema Atual

```
bad auth : Authentication failed
```

O usuário ou senha está incorreto no MongoDB Atlas.

## ✅ Solução (2 minutos)

### 1. Acesse o MongoDB Atlas
https://cloud.mongodb.com/

### 2. Vá para Database Access
- No menu lateral: **Security** → **Database Access**

### 3. Verifique se o usuário existe

Procure por:
- `julio` OU
- `juliocamposmachado_db_user`

### 4. Se NÃO existir, crie:

**Add New Database User:**
- **Authentication Method**: Password
- **Username**: `julio`
- **Password**: `fPQ9IOQ34tA6sJa6`
- **Database User Privileges**: **Atlas Admin**
- **Add User**

### 5. Se JÁ existir, resete a senha:

- Clique em **Edit** no usuário
- **Edit Password**
- Digite: `fPQ9IOQ34tA6sJa6`
- **Update User**

### 6. Verifique Network Access

**Security** → **Network Access**:
- Deve ter: `0.0.0.0/0` (Allow access from anywhere)
- Se não tiver, clique **Add IP Address** → **Allow Access from Anywhere**

---

## 🔄 Depois de Configurar

Volte aqui e execute:

```powershell
cd C:\uber\backend
npm run seed
```

Você deve ver:
```
✅ Conectado ao MongoDB
✅ 70 produtos inseridos com sucesso
✅ Admin criado
✅ Cupons criados
🎉 Seed concluído com sucesso!
```

---

## 🆘 Ainda não funciona?

### Opção 1: Obter a connection string completa

No MongoDB Atlas:
1. Clique em **Connect** no seu cluster
2. **Drivers**
3. Copie a connection string completa
4. **Cole aqui no chat!**

### Opção 2: Usar MongoDB local

```powershell
cd C:\uber\backend
npm run start:local
```

Isso usa MongoDB em memória (já configurado e funcionando).

---

## 📝 Connection String Atual

```
mongodb+srv://juliocamposmachado_db_user:fPQ9IOQ34tA6sJa6@cluster0.jrvuoet.mongodb.net/adega-radio-tatuape?retryWrites=true&w=majority
```

**Certifique-se que:**
- ✅ Username existe no Atlas
- ✅ Senha está correta
- ✅ IP liberado (0.0.0.0/0)
- ✅ Cluster está ativo

---

**Após configurar, volte e execute: `npm run seed`** 🚀
