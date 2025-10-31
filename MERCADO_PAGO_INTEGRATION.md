# Integração Mercado Pago

## Credenciais Configuradas

- **País**: Brasil
- **Public Key**: `APP_USR-838d26e2-5e01-4e4c-9c99-fe61c955a8e8`
- **Access Token**: `APP_USR-3559899696506999-103100-7d2044abfdedde06dd6a752c7a56976f-1646858384`

## Configuração Backend

### Variáveis de Ambiente (.env)

```env
MERCADO_PAGO_PUBLIC_KEY=APP_USR-838d26e2-5e01-4e4c-9c99-fe61c955a8e8
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-3559899696506999-103100-7d2044abfdedde06dd6a752c7a56976f-1646858384
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

### Rotas Disponíveis

#### 1. Criar Preferência de Pagamento
**POST** `/api/payment/create-preference`

```json
{
  "items": [
    {
      "name": "Produto X",
      "price": 10.50,
      "quantity": 2
    }
  ],
  "payer": {
    "name": "João Silva",
    "phone": "11999999999",
    "email": "joao@email.com",
    "address": "Rua Exemplo, 123"
  },
  "orderId": "64f1b2c3d4e5f6a7b8c9d0e1"
}
```

**Resposta:**
```json
{
  "preferenceId": "123456789-abcd-1234-efgh-567890123456",
  "initPoint": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=...",
  "sandboxInitPoint": "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=..."
}
```

#### 2. Webhook de Notificações
**POST** `/api/payment/webhook`

Recebe notificações automáticas do Mercado Pago sobre mudanças no status dos pagamentos.

#### 3. Consultar Status de Pagamento
**GET** `/api/payment/status/:paymentId`

**Resposta:**
```json
{
  "status": "approved",
  "statusDetail": "accredited",
  "amount": 50.00
}
```

## Fluxo de Pagamento

1. **Cliente finaliza checkout** → Frontend envia dados do pedido
2. **Backend cria pedido** → Salva no MongoDB com status "pending"
3. **Backend cria preferência** → Mercado Pago retorna link de pagamento
4. **Cliente é redirecionado** → Para tela de pagamento do Mercado Pago
5. **Cliente paga** → Mercado Pago processa pagamento
6. **Webhook atualiza pedido** → Status muda para "confirmed" se aprovado
7. **Cliente retorna** → Redirecionado para página de confirmação

## URLs de Retorno

- **Sucesso**: `/pedido-confirmado?order={orderId}`
- **Falha**: `/checkout?error=payment`
- **Pendente**: `/pedido-pendente?order={orderId}`

## Status de Pagamento

| Status MP | Status Pedido | Descrição |
|-----------|---------------|-----------|
| `approved` | `confirmed` | Pagamento aprovado |
| `pending` | `pending` | Aguardando pagamento |
| `rejected` | `cancelled` | Pagamento rejeitado |
| `cancelled` | `cancelled` | Pagamento cancelado |
| `refunded` | `cancelled` | Pagamento reembolsado |

## Formas de Pagamento Suportadas

- 💳 Cartão de Crédito
- 💳 Cartão de Débito
- 📱 PIX
- 💵 Dinheiro (na entrega - sem Mercado Pago)

## Modelo de Dados (Order)

Campos adicionados ao schema do pedido:

```javascript
paymentStatus: {
  type: String,
  enum: ['pending', 'approved', 'rejected', 'cancelled', 'refunded'],
  default: 'pending'
},
paymentId: String,
mercadoPagoPreferenceId: String
```

## Testes

Para testar em modo sandbox, use os cartões de teste disponíveis em:
https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards

### Exemplos de Cartões de Teste

| Cartão | Número | CVV | Validade |
|--------|--------|-----|----------|
| Mastercard Aprovado | 5031 4332 1540 6351 | 123 | 11/25 |
| Visa Aprovado | 4235 6477 2802 5682 | 123 | 11/25 |
| Recusado | 5031 7557 3453 0604 | 123 | 11/25 |

## Segurança

- Access Token **NUNCA** deve ser exposto no frontend
- Public Key pode ser usada no frontend para checkout transparente (futuro)
- Webhook deve validar assinatura das requisições (implementação futura)

## Produção

Para usar em produção:
1. Trocar credenciais de teste por credenciais de produção
2. Configurar `UBER_SANDBOX=false`
3. Atualizar URLs no `.env` para domínios reais
4. Configurar webhook URL no painel do Mercado Pago
