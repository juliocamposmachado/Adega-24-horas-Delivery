# Integrações - Adega Rádio Tatuapé FM Express

## 🤖 Gemini 2.0 Flash AI

### Configuração
- **API Key**: `AIzaSyBYeJ6dq9Ve9H6o39VnJX1EgXprkk2uL3Y`
- **Modelo**: `gemini-2.0-flash`
- **Projeto**: `projects/77543723797`

### Funcionalidades Implementadas

#### 1. Chat Inteligente (AIChat.tsx)
- Assistente virtual 24/7
- Responde dúvidas sobre produtos, horários, delivery
- Interface flutuante no canto inferior direito
- Botão roxo com ícone de estrela ✨

#### 2. Recomendações de Produtos
```typescript
import { getProductRecommendations } from './services/geminiService';

const recomendacoes = await getProductRecommendations(
  "Gosto de vinhos tintos encorpados",
  products
);
```

#### 3. Geração de Descrições
```typescript
import { generateProductDescription } from './services/geminiService';

const descricao = await generateProductDescription(
  "Vinho Concha y Toro Reservado",
  "Vinhos",
  45.90
);
```

#### 4. Análise de Feedback
```typescript
import { analyzeFeedback } from './services/geminiService';

const insights = await analyzeFeedback([
  "Entrega rápida e produtos de qualidade!",
  "Preços um pouco altos",
  "Adorei o atendimento via WhatsApp"
]);
```

### Como Usar

1. **O Chat AI já está ativo** no frontend
2. Clique no botão roxo flutuante no canto inferior direito
3. Digite suas perguntas e receba respostas inteligentes
4. A IA conhece o contexto da adega automaticamente

### Custos
- Gemini 2.0 Flash é **gratuito** até 15 requisições por minuto
- Sem limite de uso mensal no tier gratuito
- Ideal para produção

---

## 💳 Mercado Pago MCP Server

### Configuração
```json
{
  "mcpServers": {
    "mercadopago-mcp-server-prod": {
      "url": "https://mcp.mercadopago.com/mcp",
      "headers": {
        "Authorization": "Bearer APP_USR-2659796196204628-103100-139afaccddfdbd53d140dd87fc7fa7aa-29008060"
      }
    }
  }
}
```

### Credenciais
- **Public Key**: `APP_USR-f3a01baf-5329-48cc-8941-d9eb8f2aa898`
- **Access Token**: `APP_USR-2659796196204628-103100-139afaccddfdbd53d140dd87fc7fa7aa-29008060`

### Status
✅ SDK React (`@mercadopago/sdk-react`) instalado e configurado
✅ Componente `<Wallet>` implementado no Checkout
✅ Criação de preferências via backend
✅ CORS configurado para produção

---

## 🚀 Deploy

### Variáveis de Ambiente

**Frontend (.env)**
```env
VITE_API_URL=https://adega-24-horas-delivery.vercel.app
VITE_WHATSAPP_NUMBER=5511970603441
VITE_MERCADO_PAGO_PUBLIC_KEY=APP_USR-f3a01baf-5329-48cc-8941-d9eb8f2aa898
```

**Backend (.env)**
```env
MONGODB_URI=<sua-mongodb-uri>
PORT=5000
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-2659796196204628-103100-139afaccddfdbd53d140dd87fc7fa7aa-29008060
UBER_DIRECT_CLIENT_ID=<seu-uber-client-id>
UBER_DIRECT_CLIENT_SECRET=<seu-uber-client-secret>
```

### Próximos Passos

1. **Testar Chat AI** - Abrir aplicação e testar conversas
2. **Validar Pagamentos** - Fazer pedido de teste no checkout
3. **Monitorar Logs** - Verificar console para erros
4. **Otimizar Prompts** - Ajustar prompts do Gemini conforme feedback

---

## 📊 Uso da API Gemini

### Teste Manual
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AIzaSyBYeJ6dq9Ve9H6o39VnJX1EgXprkk2uL3Y' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Recomende 3 vinhos para iniciantes"
          }
        ]
      }
    ]
  }'
```

### Limites
- **Rate Limit**: 15 requisições por minuto
- **Timeout**: 30 segundos por requisição
- **Contexto**: Até 32k tokens

---

## 🛠️ Troubleshooting

### Chat AI não abre
- Verificar se o botão roxo está visível
- Checar console do navegador
- API Key pode ter expirado

### Erro CORS
- Backend já configurado para permitir frontend
- Verificar URL da API no `.env`

### Pagamento não funciona
- Validar credenciais do Mercado Pago
- Testar com valores pequenos primeiro
- Verificar webhook configurado

---

## 📝 Notas

- Chat AI usa Gemini 2.0 Flash (mais rápido e eficiente)
- Todas as credenciais estão nos arquivos .env
- MCP Server configurado em `mcp-config.json`
- Componentes prontos para uso em produção
