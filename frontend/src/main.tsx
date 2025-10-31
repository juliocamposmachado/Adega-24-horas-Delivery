import React from 'react'
import ReactDOM from 'react-dom/client'
import { initMercadoPago } from '@mercadopago/sdk-react'
import App from './App.tsx'
import './index.css'

// Inicializar Mercado Pago SDK
const publicKey = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY
if (publicKey) {
  initMercadoPago(publicKey)
  console.log('✅ Mercado Pago SDK inicializado')
} else {
  console.error('❌ VITE_MERCADO_PAGO_PUBLIC_KEY não encontrada')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
