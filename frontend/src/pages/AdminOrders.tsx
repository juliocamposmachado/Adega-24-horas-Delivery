import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { Search, Eye, CheckCircle, XCircle, LogOut } from 'lucide-react';

interface Order {
  orderId: string;
  customer: { name: string; phone: string; email: string; address: string };
  items: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export default function AdminOrders() {
  const { user, logout, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadOrders();
  }, [isAuthenticated, navigate]);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
    setOrders(savedOrders);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.phone.includes(search);
    
    const matchesFilter = 
      filter === 'all' ||
      order.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gold-500">Painel Administrativo</h1>
            <p className="text-sm text-gray-400">Bem-vindo, {user?.username}</p>
          </div>
          <button onClick={() => { logout(); navigate('/admin/login'); }} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <LogOut className="w-5 h-5" />Sair
          </button>
        </div>
      </header>

      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-3">
            <Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition pb-2">Dashboard</Link>
            <Link to="/admin/orders" className="text-gold-500 border-b-2 border-gold-500 pb-2">Pedidos</Link>
            <Link to="/admin/deliveries" className="text-gray-400 hover:text-white transition pb-2">Entregas</Link>
            <Link to="/admin/history" className="text-gray-400 hover:text-white transition pb-2">Histórico</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Buscar por ID, nome ou telefone..." value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10 w-full" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input">
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="completed">Concluídos</option>
            </select>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Todos os Pedidos ({filteredOrders.length})</h2>
          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-400 py-8">Nenhum pedido encontrado</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-800">
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Pagamento</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Data</th>
                    <th className="pb-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.orderId} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 text-sm font-mono text-gold-500">{order.orderId.slice(0, 15)}...</td>
                      <td className="py-3">
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-xs text-gray-400">{order.customer.phone}</p>
                      </td>
                      <td className="py-3 font-semibold text-green-500">R$ {order.total.toFixed(2)}</td>
                      <td className="py-3 text-sm capitalize">{order.paymentMethod}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-900/20 text-yellow-500' : 'bg-green-900/20 text-green-500'}`}>
                          {order.status === 'pending' ? 'Pendente' : 'Concluído'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-400">{new Date(order.createdAt).toLocaleString('pt-BR')}</td>
                      <td className="py-3">
                        <button onClick={() => setSelectedOrder(order)} className="text-blue-500 hover:text-blue-400">
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Detalhes do Pedido</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">ID do Pedido</p>
                <p className="font-mono text-gold-500">{selectedOrder.orderId}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Cliente</p>
                  <p className="font-semibold">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-gray-400">{selectedOrder.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Endereço</p>
                  <p className="text-sm">{selectedOrder.customer.address}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Itens do Pedido</p>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm bg-gray-800 p-2 rounded">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="text-green-500">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Subtotal:</span>
                  <span>R$ {selectedOrder.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Frete:</span>
                  <span>R$ {selectedOrder.deliveryFee?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-500">R$ {selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                {selectedOrder.status === 'pending' && (
                  <button onClick={() => updateOrderStatus(selectedOrder.orderId, 'completed')} className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />Marcar como Concluído
                  </button>
                )}
                <button onClick={() => setSelectedOrder(null)} className="btn-secondary flex-1">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

