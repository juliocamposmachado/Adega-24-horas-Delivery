import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Wine, ShoppingCart, Menu, X, MessageCircle, LayoutDashboard, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';
import { products, categories } from './data/products';
import { useCart } from './hooks/useCart';
import CartModal from './components/CartModal';
import Checkout from './pages/Checkout';
import AIChat from './components/AIChat';
import SplashScreen from './components/SplashScreen';
import { AdminProvider } from './contexts/AdminContext';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5511970603441';
  const { getTotalItems } = useCart();

  // Verificar se já mostrou splash nesta sessão
  useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown === 'true') {
      setShowSplash(false);
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <BrowserRouter>
      <AdminProvider>
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
                <Link to="/admin/dashboard" className="flex items-center gap-1 text-sm text-gray-400 hover:text-gold-500 transition">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button onClick={() => setCartOpen(true)} className="relative">
                  <ShoppingCart className="w-6 h-6 hover:text-gold-500 transition" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-wine-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
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
                <Link to="/admin/dashboard" className="flex items-center gap-2 py-2 text-gray-400 hover:text-gold-500 transition">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                {/* Add Cart button to mobile menu */}
                <button 
                  onClick={() => {
                    setCartOpen(true);
                    setMenuOpen(false); // Close mobile menu when cart is opened
                  }} 
                  className="relative block py-2 w-full text-left hover:text-gold-500 transition flex items-center gap-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Carrinho</span>
                  {getTotalItems() > 0 && (
                    <span className="ml-auto bg-wine-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
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
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
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
                  <li><Link to="/admin/dashboard" className="hover:text-gold-500">Dashboard Admin</Link></li>
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

        {/* Rádio Tatuapé FM - Live Button */}
        <a
          href="https://radiotatuapefm.radiostream321.com"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-3 rounded-full shadow-lg transition z-50 flex items-center gap-2 group"
          aria-label="Ouvir Rádio Tatuapé FM"
        >
          <Radio className="w-5 h-5 animate-pulse" />
          <span className="font-semibold">Ouvir Rádio</span>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold animate-pulse">AO VIVO</span>
        </a>

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

        {/* AI Chat Assistant */}
        <AIChat />
      </div>
      </AdminProvider>
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
              <button 
                onClick={() => {
                  useCart.getState().addItem(product);
                }}
                className="bg-wine-700 hover:bg-wine-600 text-white px-4 py-2 rounded-lg transition"
              >
                Adicionar
              </button>
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
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gold-500 to-wine-700 bg-clip-text text-transparent">
        Sobre Nós
      </h1>

      {/* Hero Section */}
      <div className="card mb-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gold-500/30">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gold-500 mb-4">
              Adega Rádio Tatuapé FM Express
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Entrega rápida de bebidas premium com a essência cultural da Rádio Tatuapé FM
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://radiotatuapefm.radiostream321.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Radio className="w-5 h-5" />
                Ouvir Rádio Ao Vivo
              </a>
            </div>
          </div>
          <div className="text-gray-400 space-y-2">
            <p>• 88 produtos selecionados</p>
            <p>• Entrega via Uber Direct</p>
            <p>• Aberto 24 horas</p>
            <p>• Rádio ao vivo 24/7</p>
          </div>
        </div>
      </div>

      {/* Nossa História */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 flex items-center gap-2">
          <Radio className="w-6 h-6" />
          Nossa História: Rádio Tatuapé FM
        </h2>
        <div className="space-y-4 text-gray-300 text-justify leading-relaxed">
          <p>
            A <strong className="text-gold-500">Rádio Tatuapé FM</strong> é uma emissora nascida nos vibrantes anos 1980, época em que o rock pulsava com autenticidade e a juventude paulistana vivia intensamente o som das guitarras elétricas, das vozes rasgadas e da energia que moldou gerações. Criada com alma e propósito, a Rádio Tatuapé FM carrega até hoje o espírito rebelde, cultural e apaixonado dos tempos em que a música significava mais do que entretenimento — significava identidade.
          </p>
          <p>
            Sob a direção e curadoria de <strong className="text-wine-500">Julio Campos Machado</strong>, estudante de Gestão Pública pela Universidade Anhembi Morumbi, a Rádio Tatuapé FM tornou-se uma plataforma de cultura popular, conectando música, cidadania e desenvolvimento local. Assim como uma adega 24 horas nunca fecha as portas para quem busca qualidade, a Rádio Tatuapé FM está sempre aberta — 24 horas por dia, sete dias por semana — transmitindo o melhor do Classic Rock, Hard Rock, Heavy Metal Tradicional, B-Sides, raridades e bandas contemporâneas que mantêm viva a chama dos anos 80.
          </p>
          <p>
            A Rádio Tatuapé FM é mais do que uma emissora; é uma <strong className="text-gold-500">adega 24 horas de música</strong>. Assim como o vinho precisa de tempo e maturação, a Rádio Tatuapé FM amadureceu ao longo das décadas, aperfeiçoando seu repertório, sua curadoria e seu compromisso com o público. A cada faixa tocada, há um cuidado artesanal, uma seleção que respeita o gosto refinado dos verdadeiros amantes da música autêntica.
          </p>
        </div>
      </div>

      {/* A Filosofia da Adega */}
      <div className="card mb-8 bg-gradient-to-r from-wine-900/20 to-gray-900">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 flex items-center gap-2">
          <Wine className="w-6 h-6" />
          A Filosofia da Adega 24 Horas
        </h2>
        <div className="space-y-4 text-gray-300 text-justify leading-relaxed">
          <p>
            A <strong className="text-gold-500">adega 24 horas Rádio Tatuapé FM</strong> representa esse conceito: um espaço onde a arte sonora é preservada, distribuída e compartilhada sem interrupções. Como uma adega que guarda vinhos raros, a Rádio Tatuapé FM guarda sons raros. Clássicos do Led Zeppelin, Deep Purple, Black Sabbath, Scorpions, Iron Maiden, Rush, Queen, Pink Floyd e Judas Priest convivem harmoniosamente com faixas menos conhecidas, B-Sides de álbuns históricos e novas bandas que resgatam a estética e a sonoridade dos anos 80.
          </p>
          <p>
            O Tatuapé, bairro símbolo da força cultural e da diversidade paulistana, é o berço da Rádio Tatuapé FM — um ponto de referência tanto para os apreciadores de música quanto para os que buscam uma adega 24 horas de ideias, sons e encontros. Ali, na <strong className="text-wine-500">Rua Dante Pellacani, 92</strong>, está a base dessa iniciativa que une paixão, tecnologia e identidade.
          </p>
          <p>
            A filosofia da Rádio Tatuapé FM é clara: manter viva a essência do rock e da boa música em uma era digital cada vez mais volátil. Assim como uma adega 24 horas mantém seu estoque sempre renovado e disponível para quem busca qualidade a qualquer momento, a Rádio Tatuapé FM mantém sua programação renovada, oferecendo diversidade, autenticidade e curadoria precisa.
          </p>
        </div>
      </div>

      {/* Nossa Missão */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gold-500 mb-6">Nossa Missão</h2>
        <div className="space-y-4 text-gray-300 text-justify leading-relaxed">
          <p>
            A <strong className="text-gold-500">adega 24 horas Rádio Tatuapé FM</strong> é um conceito de continuidade — a música não para, o som não dorme, o rock não morre. A cada madrugada, quando a cidade silencia, a Rádio Tatuapé FM continua viva, transmitindo notas que ecoam histórias. A cada amanhecer, quando os trabalhadores despertam e os sonhos recomeçam, a Rádio Tatuapé FM está lá, firme, como uma adega 24 horas de energia sonora e memória cultural.
          </p>
          <p>
            A programação da Rádio Tatuapé FM é planejada para que cada faixa tenha propósito. Há momentos para o rock progressivo, para o hard visceral, para o metal técnico, e até para as baladas que marcaram corações nos anos 80. Tudo é pensado, tudo é afinado. A Rádio Tatuapé FM não se limita a reproduzir hits; ela promove um diálogo entre o ontem e o hoje, entre o analógico e o digital, entre a guitarra distorcida e o streaming de alta definição.
          </p>
          <p>
            Em paralelo, a adega 24 horas Rádio Tatuapé FM inspira um estilo de vida: o da convivência, da amizade e da boa conversa ao som de uma trilha inesquecível. Assim como uma taça de vinho é melhor apreciada em boa companhia, o som da Rádio Tatuapé FM é melhor desfrutado com os amigos, com a família, com quem entende que música boa é sinônimo de vida bem vivida.
          </p>
        </div>
      </div>

      {/* Cultura e Política Pública */}
      <div className="card mb-8 bg-gradient-to-r from-gray-900 to-wine-900/20">
        <h2 className="text-2xl font-bold text-gold-500 mb-6">Cultura como Política Pública</h2>
        <div className="space-y-4 text-gray-300 text-justify leading-relaxed">
          <p>
            A Rádio Tatuapé FM acredita que <strong className="text-wine-500">cultura é também política pública</strong> — uma forma de educar, inspirar e transformar. Julio Campos Machado, em sua trajetória na Gestão Pública pela Anhembi Morumbi, reforça esse princípio: é preciso promover cultura de qualidade e acessível. Assim como uma adega 24 horas oferece acesso contínuo a produtos de qualidade, a Rádio Tatuapé FM garante acesso contínuo a conteúdo sonoro que eleva o espírito e educa o ouvido.
          </p>
          <p>
            A Rádio Tatuapé FM e sua filosofia de adega 24 horas representam <strong className="text-gold-500">resistência cultural</strong>. Enquanto muitas rádios migraram para o entretenimento superficial e descartável, a Rádio Tatuapé FM preservou o compromisso com o conteúdo. É uma adega que não se curva à pressa, que respeita o tempo da boa música, que entende que o rock não é apenas som — é atitude, é reflexão, é história.
          </p>
        </div>
      </div>

      {/* Nossos Produtos */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gold-500 mb-6 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Nossas Categorias de Produtos
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-bold text-wine-500 mb-3">Bebidas Premium</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Vinhos (13 opções)</li>
              <li>• Whiskies (9 opções)</li>
              <li>• Gin (7 opções)</li>
              <li>• Vodkas (4 opções)</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-bold text-wine-500 mb-3">Cervejas e Bebidas</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Cervejas (15 opções)</li>
              <li>• Energéticos (7 opções)</li>
              <li>• Refrigerantes (6 opções)</li>
              <li>• Águas (5 opções)</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-400 mt-6 text-center">
          🚚 <strong className="text-gold-500">Entrega rápida via Uber Direct</strong> com rastreamento em tempo real
        </p>
      </div>

      {/* Call to Action */}
      <div className="card bg-gradient-to-r from-gold-500/10 to-wine-700/10 border-gold-500/50">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gold-500">
            Experimente a Adega 24 Horas Rádio Tatuapé FM
          </h2>
          <p className="text-gray-300">
            Onde a música nunca dorme e a qualidade nunca descansa.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="https://radiotatuapefm.radiostream321.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Radio className="w-5 h-5" />
              Ouvir Rádio Ao Vivo
            </a>
            <Link to="/catalogo" className="btn-secondary inline-flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Ver Catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
