# Guia de Implementação do Frontend

## Estrutura de Arquivos

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Cart.tsx
│   │   └── Checkout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Catalog.tsx
│   │   ├── About.tsx
│   │   └── Admin/
│   │       ├── Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── Products.tsx
│   │       └── Orders.tsx
│   ├── store/
│   │   └── useStore.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

## 1. Tipos TypeScript (src/types/index.ts)

```typescript
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  active: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: {
      fullAddress: string;
      complement?: string;
    };
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: string;
  uberDelivery?: {
    deliveryId: string;
    trackingUrl: string;
    status: string;
    eta?: Date;
  };
  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}
```

## 2. API Service (src/services/api.ts)

```typescript
import axios from 'axios';
import type { Product, Order, Admin } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productApi = {
  getAll: (params?: any) => api.get<{products: Product[]}>('/products', { params }),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (data: Partial<Product>) => api.post<Product>('/products', data),
  update: (id: string, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const orderApi = {
  create: (data: any) => api.post<Order>('/orders', data),
  getAll: (params?: any) => api.get<{orders: Order[]}>('/orders', { params }),
  track: (orderNumber: string) => api.get<Order>(`/orders/track/${orderNumber}`),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
  calculateShipping: (address: string) => api.post('/orders/calculate-shipping', { address }),
  validateCoupon: (code: string, subtotal: number) => 
    api.post('/orders/validate-coupon', { code, subtotal }),
};

export const authApi = {
  login: (email: string, password: string) => 
    api.post<{token: string; admin: Admin}>('/auth/login', { email, password }),
};

export default api;
```

## 3. Store Zustand (src/store/useStore.ts)

```typescript
import { create } from 'zustand';
import type { Product, CartItem, Admin } from '../types';

interface Store {
  cart: CartItem[];
  admin: Admin | null;
  token: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setAdmin: (admin: Admin | null, token: string | null) => void;
  logout: () => void;
}

export const useStore = create<Store>((set) => ({
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  admin: null,
  token: localStorage.getItem('token'),
  
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item._id === product._id);
    let newCart;
    
    if (existing) {
      newCart = state.cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...state.cart, { ...product, quantity: 1 }];
    }
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    return { cart: newCart };
  }),
  
  removeFromCart: (productId) => set((state) => {
    const newCart = state.cart.filter(item => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    return { cart: newCart };
  }),
  
  updateQuantity: (productId, quantity) => set((state) => {
    const newCart = state.cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(newCart));
    return { cart: newCart };
  }),
  
  clearCart: () => set(() => {
    localStorage.removeItem('cart');
    return { cart: [] };
  }),
  
  setAdmin: (admin, token) => set(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    return { admin, token };
  }),
  
  logout: () => set(() => {
    localStorage.removeItem('token');
    return { admin: null, token: null };
  }),
}));
```

## 4. Componente App Principal (src/App.tsx)

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
```

## Componentes Faltantes

Você precisa criar os seguintes componentes na pasta `src/components/` e `src/pages/`:

### Header.tsx
- Logo da Adega
- Menu de navegação (Home, Catálogo, Sobre)
- Ícone do carrinho com contador
- Link para admin

### Footer.tsx
- Informações da loja
- Links rápidos
- Botão WhatsApp
- Redes sociais

### ProductCard.tsx
- Exibir produto com imagem, nome, preço
- Botão "Adicionar ao Carrinho"
- Animações com Framer Motion

### Cart.tsx
- Lista de produtos no carrinho
- Atualizar quantidade
- Remover item
- Calcular total
- Botão para checkout

### Checkout.tsx
- Formulário de dados do cliente
- Endereço de entrega
- Campo para cupom
- Cálculo de frete via Uber Direct
- Finalizar pedido

### Páginas Admin
- **Login**: Autenticação JWT
- **Dashboard**: Estatísticas de vendas
- **Products**: CRUD de produtos
- **Orders**: Lista e gerenciamento de pedidos

## Estilos e Tema

Use as classes TailwindCSS definidas em `index.css`:
- `.btn-primary` - Botões dourados
- `.btn-secondary` - Botões vinho
- `.card` - Cards com tema escuro
- `.input` - Inputs estilizados

Cores principais:
- `wine-700` para elementos de destaque vinho
- `gold-500` para botões e CTAs
- `gray-900`, `gray-800` para backgrounds

## Integração WhatsApp

```typescript
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá, gostaria de fazer um pedido`;
```

## Deploy

### Vercel (Frontend)
```bash
cd frontend
npm run build
vercel --prod
```

Configurar variáveis de ambiente no painel Vercel:
- `VITE_API_URL`
- `VITE_WHATSAPP_NUMBER`

---

**Nota**: Todos os componentes devem ser responsivos e usar Framer Motion para animações suaves. Siga o design escuro elegante com tons vinho e dourado conforme especificado.
