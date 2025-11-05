# 🔓 Desativar Vercel Protection

## ❌ Problema Atual

O backend está bloqueado com "Authentication Required". Isso é o **Vercel Protection** impedindo acessos.

```
Error: Authentication Required
```

## ✅ Solução

### Passo 1: Acessar Dashboard do Backend

1. Vá para: https://vercel.com/astridnielsen-labs-projects/adega-backend
2. Ou acesse: https://vercel.com e clique no projeto `adega-backend`

### Passo 2: Desativar Protection

1. Clique em **Settings** (no menu lateral)
2. Role até **Deployment Protection**
3. **Desative** ou configure para "Off"
4. Salve as alterações

**OU**

Se houver **Password Protection**:
1. Settings → **General**
2. Procure por **Protection**
3. Desative qualquer proteção

### Passo 3: Verificar

Após desativar, teste no navegador:
```
https://adega-backend.vercel.app/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-..."
}
```

---

## 🔄 URLs Atualizadas

Agora você tem URLs mais limpas:

**Frontend:** https://adega-frontend.vercel.app  
**Backend:** https://adega-backend.vercel.app

Depois de desativar a proteção, precisamos atualizar as variáveis de ambiente para usar essas URLs limpas.

---

## 📝 Próximos Passos (Após Desativar Protection)

Execute estes comandos:

```bash
# Atualizar VITE_API_URL no frontend
cd C:\uber\frontend
vercel env rm VITE_API_URL production
echo "https://adega-backend.vercel.app" | vercel env add VITE_API_URL production
vercel --prod

# Atualizar FRONTEND_URL no backend
cd C:\uber\backend
vercel env rm FRONTEND_URL production
echo "https://adega-frontend.vercel.app" | vercel env add FRONTEND_URL production
vercel --prod
```

---

## 🎯 Checklist

- [ ] Acessar dashboard do backend no Vercel
- [ ] Desativar Deployment Protection
- [ ] Testar https://adega-backend.vercel.app/health
- [ ] Atualizar variáveis de ambiente com URLs limpas
- [ ] Redeploy frontend e backend
- [ ] Testar checkout novamente

---

## 🚨 Se Não Conseguir Desativar

Alternativa: Podemos usar o domínio `adega-24-horas-delivery.vercel.app` que já existe (parece ser o frontend principal).

Me avise quando desativar a proteção!
