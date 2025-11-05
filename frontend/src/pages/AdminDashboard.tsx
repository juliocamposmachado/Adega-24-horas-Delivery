import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import {
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  BarChart3
} from 'lucide-react';

interface Order {
  orderId: string;
  customer: { name: string; phone: string };
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, logout, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    todayOrders: 0,
    todayRevenue: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Carregar pedidos do localStorage
    const savedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
    setOrders(savedOrders);

    // Calcular estatísticas
    const today = new Date().toDateString();
    const todayOrders = savedOrders.filter(
      (order: Order) => new Date(order.createdAt).toDateString() === today
    );

    setStats({
      totalOrders: savedOrders.length,
      totalRevenue: savedOrders.reduce((sum: number, order: Order) => sum + order.total, 0),
      pendingOrders: savedOrders.filter((order: Order) => order.status === 'pending').length,
      completedOrders: savedOrders.filter((order: Order) => order.status === 'completed').length,
      todayOrders: todayOrders.length,
      todayRevenue: todayOrders.reduce((sum: number, order: Order) => sum + order.total, 0)
    });
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gold-500">
              Painel Administrativo
            </h1>
            <p className="text-sm text-gray-400">
              Bem-vindo, {user?.username}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-3">
            <Link
              to="/admin/dashboard"
              className="text-gold-500 border-b-2 border-gold-500 pb-2"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className="text-gray-400 hover:text-white transition pb-2"
            >
              Pedidos
            </Link>
            <Link
              to="/admin/deliveries"
              className="text-gray-400 hover:text-white transition pb-2"
            >
              Entregas
            </Link>
            <Link
              to="/admin/history"
              className="text-gray-400 hover:text-white transition pb-2"
            >
              Histórico
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total de Pedidos */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total de Pedidos</p>
                <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
              </div>
              <div className="bg-blue-900/20 p-3 rounded-lg">
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Receita Total */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Receita Total</p>
                <p className="text-3xl font-bold text-green-500">
                  R$ {stats.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-900/20 p-3 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Pedidos Pendentes */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Pendentes</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.pendingOrders}</p>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Pedidos Hoje */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Pedidos Hoje</p>
                <p className="text-3xl font-bold text-white">{stats.todayOrders}</p>
              </div>
              <div className="bg-purple-900/20 p-3 rounded-lg">
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Receita Hoje */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Receita Hoje</p>
                <p className="text-3xl font-bold text-green-500">
                  R$ {stats.todayRevenue.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-900/20 p-3 rounded-lg">
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Concluídos */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Concluídos</p>
                <p className="text-3xl font-bold text-green-500">{stats.completedOrders}</p>
              </div>
              <div className="bg-green-900/20 p-3 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Pedidos Recentes */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Pedidos Recentes</h2>
            <Link to="/admin/orders" className="text-gold-500 hover:text-gold-400 text-sm">
              Ver todos →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              Nenhum pedido registrado ainda
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-800">
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Valor</th>
                    <th className="pb-3">Pagamento</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.orderId} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 text-sm font-mono text-gold-500">
                        {order.orderId.slice(0, 12)}...
                      </td>
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-xs text-gray-400">{order.customer.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-green-500">
                        R$ {order.total.toFixed(2)}
                      </td>
                      <td className="py-3 text-sm capitalize">
                        {order.paymentMethod}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'pending'
                              ? 'bg-yellow-900/20 text-yellow-500'
                              : order.status === 'completed'
                              ? 'bg-green-900/20 text-green-500'
                              : 'bg-red-900/20 text-red-500'
                          }`}
                        >
                          {order.status === 'pending' ? 'Pendente' : 'Concluído'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

