import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Wine, ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { products, categories } from './data/products';
import { useCart } from './hooks/useCart';
import CartModal from './components/CartModal';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5511970603441';
  const { getTotalItems } = useCart();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <Wine className="w-8 h-8 text-gold-500" />
                <div>
                  <h1 className="text-xl font-bold text-gold-500">Adega Rádio Tatuapé</h1>
                  <p className="text-xs text-gray-400">FM Express</p>
                </div>
              </Link>

              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="hover:text-gold-500 transition">Home</Link>
                <Link to="/catalogo" className="hover:text-gold-500 transition">Catálogo</Link>
                <Link to="/sobre" className="hover:text-gold-500 transition">Sobre</Link>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <nav className="md:hidden pt-4 pb-2 space-y-2">
                <Link to="/" className="block py-2 hover:text-gold-500 transition">Home</Link>
                <Link to="/catalogo" className="block py-2 hover:text-gold-500 transition">Catálogo</Link>
                <Link to="/sobre" className="block py-2 hover:text-gold-500 transition">Sobre</Link>
                <Link to="/admin/login" className="block py-2 text-gray-400 hover:text-gold-500 transition">Admin</Link>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-gold-500 font-bold mb-4">Adega Rádio Tatuapé FM Express</h3>
                <p className="text-gray-400 text-sm">
                  Entrega rápida de bebidas via Uber Direct
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Links Rápidos</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/catalogo" className="hover:text-gold-500">Catálogo</Link></li>
                  <li><Link to="/sobre" className="hover:text-gold-500">Sobre</Link></li>
                  <li><Link to="/admin/login" className="hover:text-gold-500">Painel Admin</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contato</h4>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Olá, gostaria de fazer um pedido`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
              © 2024 Adega Rádio Tatuapé FM Express. Todos os direitos reservados.
            </div>
          </div>
        </footer>

        {/* Cart Modal */}
        <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Olá, gostaria de fazer um pedido`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition z-50"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </BrowserRouter>
  );
}

// Home Page
function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gold-500 to-wine-700 bg-clip-text text-transparent">
          Adega Rádio Tatuapé FM Express
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Entrega rápida de bebidas premium via Uber Direct
        </p>
        <Link to="/catalogo" className="btn-primary inline-block">
          Ver Catálogo
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="card text-center">
          <Wine className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">88 Produtos</h3>
          <p className="text-gray-400">Vinhos, cervejas, destilados e muito mais</p>
        </div>
        <div className="card text-center">
          <ShoppingCart className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
          <p className="text-gray-400">Via Uber Direct em tempo real</p>
        </div>
        <div className="card text-center">
          <MessageCircle className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Atendimento 24h</h3>
          <p className="text-gray-400">WhatsApp sempre disponível</p>
        </div>
      </div>
    </div>
  );
}

// Catálogo Page
function CatalogoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Catálogo de Produtos</h1>
      
      {/* Filtros */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="w-full input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('Todos')}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === 'Todos'
                ? 'bg-gold-500 text-gray-900'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Todos ({products.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat} ({products.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="card hover:border-gold-500 transition cursor-pointer">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-gold-500 font-bold text-xl">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <p>Nenhum produto encontrado.</p>
        </div>
      )}
    </div>
  );
}

// Sobre Page
function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nós</h1>
      <div className="card space-y-4 text-gray-300">
        <p>
          A <strong className="text-gold-500">Adega Rádio Tatuapé FM Express</strong> é sua adega de confiança 
          para entrega rápida de bebidas premium.
        </p>
        <p>
          Com mais de 88 produtos selecionados, incluindo vinhos, cervejas, destilados, gin, vodka e whisky, 
          oferecemos qualidade e variedade para todos os gostos.
        </p>
        <p>
          Utilizamos a tecnologia <strong>Uber Direct</strong> para garantir entregas rápidas e rastreamento 
          em tempo real do seu pedido.
        </p>
        <h3 className="text-xl font-bold text-gold-500 mt-8 mb-4">Nossas Categorias:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Vinhos (13 opções)</li>
          <li>Cervejas (15 opções)</li>
          <li>Whiskies (9 opções)</li>
          <li>Gin (7 opções)</li>
          <li>Energéticos (7 opções)</li>
          <li>Refrigerantes (6 opções)</li>
          <li>Águas (5 opções)</li>
          <li>Vodkas (4 opções)</li>
          <li>E muito mais!</li>
        </ul>
      </div>
    </div>
  );
}

// Admin Login Page
function AdminLoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6 text-center text-gold-500">Painel Admin</h1>
        <p className="text-center text-gray-400 mb-6">Sistema de autenticação</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="input" placeholder="admin@adega.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Senha</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <button className="btn-primary w-full">
            Entrar
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center mt-6">
          Configure o backend para ativar a autenticação
        </p>
      </div>
    </div>
  );
}

export default App;
