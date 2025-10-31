import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, Phone, Mail, CreditCard, Tag, Loader2 } from 'lucide-react';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    complement: '',
    coupon: '',
  });

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee - discount;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Carrinho Vazio</h1>
        <p className="text-gray-400 mb-8">Adicione produtos para continuar</p>
        <button
          onClick={() => navigate('/catalogo')}
          className="btn-primary"
        >
          Ver Catálogo
        </button>
      </div>
    );
  }

  const handleApplyCoupon = async () => {
    if (!formData.coupon) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/validate-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formData.coupon,
          subtotal
        })
      });

      if (response.ok) {
        const data = await response.json();
        setDiscount(data.discount);
        alert(`Cupom aplicado! Desconto: R$ ${data.discount.toFixed(2)}`);
      } else {
        alert('Cupom inválido ou expirado');
      }
    } catch (error) {
      console.error('Erro ao validar cupom:', error);
    }
  };

  const handleCalculateShipping = async () => {
    if (!formData.address) {
      alert('Preencha o endereço para calcular o frete');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/calculate-shipping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: formData.address })
      });

      if (response.ok) {
        const data = await response.json();
        setDeliveryFee(data.deliveryFee);
        alert(`Frete calculado: R$ ${data.deliveryFee.toFixed(2)}\nTempo estimado: ${Math.round(data.duration / 60)} minutos`);
      }
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      // Fallback: frete fixo
      setDeliveryFee(15.00);
      alert('Usando frete padrão: R$ 15,00');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    // Pegar forma de pagamento selecionada
    const paymentMethod = (document.querySelector('input[name="payment"]:checked') as HTMLInputElement)?.value || 'cash';

    setLoading(true);

    try {
      // 1. Criar o pedido
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: {
            fullAddress: formData.address,
            complement: formData.complement
          }
        },
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        couponCode: formData.coupon,
        paymentMethod: paymentMethod
      };

      const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.json();
        alert(`Erro ao criar pedido: ${error.error}`);
        return;
      }

      const order = await orderResponse.json();

      // 2. Se não for pagamento em dinheiro, criar preferência do Mercado Pago
      if (paymentMethod !== 'cash') {
        const paymentData = {
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          payer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || 'cliente@adega.com',
            address: formData.address
          },
          orderId: order._id
        };

        const paymentResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-preference`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        });

        if (paymentResponse.ok) {
          const paymentData = await paymentResponse.json();
          // Redirecionar para checkout do Mercado Pago
          window.location.href = paymentData.initPoint;
        } else {
          alert('Erro ao processar pagamento. Tente novamente.');
        }
      } else {
        // Pagamento em dinheiro - confirmar pedido diretamente
        clearCart();
        alert(`Pedido #${order.orderNumber} realizado com sucesso!\n\nPagamento na entrega.`);
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao processar pedido. Tente novamente ou entre em contato via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Finalizar Pedido</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-gold-500" />
                Dados Pessoais
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="João Silva"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        className="input pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        className="input pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="joao@email.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-gold-500" />
                Endereço de Entrega
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Endereço Completo *</label>
                  <textarea
                    className="input min-h-[100px]"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Rua, número, bairro, cidade, CEP"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Complemento</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    placeholder="Apto 123, Bloco A"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleCalculateShipping}
                  disabled={loading || !formData.address}
                  className="btn-secondary w-full"
                >
                  {loading ? 'Calculando...' : 'Calcular Frete'}
                </button>
              </div>
            </div>

            {/* Cupom */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Tag className="w-6 h-6 text-gold-500" />
                Cupom de Desconto
              </h2>

              <div className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  value={formData.coupon}
                  onChange={(e) => setFormData({ ...formData, coupon: e.target.value.toUpperCase() })}
                  placeholder="BEMVINDO"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-gray-800 hover:bg-gray-700 px-6 rounded-lg transition"
                >
                  Aplicar
                </button>
              </div>
            </div>

            {/* Pagamento */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-gold-500" />
                Forma de Pagamento
              </h2>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gold-500 transition">
                  <input type="radio" name="payment" value="cash" defaultChecked />
                  <span>💵 Dinheiro</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gold-500 transition">
                  <input type="radio" name="payment" value="credit" />
                  <span>💳 Cartão de Crédito</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gold-500 transition">
                  <input type="radio" name="payment" value="debit" />
                  <span>💳 Cartão de Débito</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gold-500 transition">
                  <input type="radio" name="payment" value="pix" />
                  <span>📱 PIX</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              ) : (
                `Finalizar Pedido - R$ ${total.toFixed(2)}`
              )}
            </button>
          </form>
        </div>

        {/* Resumo */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-800">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm line-clamp-1">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.quantity}x R$ {item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Taxa de Entrega:</span>
                <span className={deliveryFee > 0 ? '' : 'text-gray-500'}>
                  {deliveryFee > 0 ? `R$ ${deliveryFee.toFixed(2)}` : 'A calcular'}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Desconto:</span>
                  <span>- R$ {discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-800 mt-4 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-gold-500">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
