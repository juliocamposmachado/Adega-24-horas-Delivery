import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, Phone, Mail, CreditCard, Tag, Loader2 } from 'lucide-react';
import { Wallet } from '@mercadopago/sdk-react';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidOrderId, setPaidOrderId] = useState<string | null>(null);
  
  // Carregar dados salvos do localStorage
  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem('customerData');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
    }
    return {
      name: '',
      phone: '',
      email: '',
      address: '',
      complement: '',
      coupon: '',
    };
  };

  const [formData, setFormData] = useState(loadSavedData());

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee - discount;

  // Salvar dados do cliente no localStorage quando mudar
  useEffect(() => {
    try {
      localStorage.setItem('customerData', JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        complement: formData.complement
      }));
    } catch (e) {
      console.error('Erro ao salvar dados:', e);
    }
  }, [formData.name, formData.phone, formData.email, formData.address, formData.complement]);

  // Verificar se voltou do pagamento
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paid = urlParams.get('paid');
    const orderId = urlParams.get('orderId');
    
    if (paid === '1' && orderId) {
      setPaymentSuccess(true);
      setPaidOrderId(orderId);
      // Limpar carrinho
      clearCart();
    }
  }, []);

  // Criar preferência automaticamente quando houver itens
  useEffect(() => {
    if (items.length > 0 && !paymentSuccess) {
      createPreference();
    }
  }, [items, paymentSuccess]);


  // Tela de sucesso do pagamento
  if (paymentSuccess && paidOrderId) {
    const savedOrder = JSON.parse(localStorage.getItem('myOrders') || '[]').find(
      (o: any) => o.orderId === paidOrderId
    );

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5511970603441';
    const message = `🍷 *NOVO PEDIDO - ADEGA RÁDIO TATUAPÉ*\n\n` +
      `🔢 *Pedido:* ${paidOrderId}\n` +
      `💳 *Pagamento:* Mercado Pago (APROVADO)\n\n` +
      `👤 *Cliente:* ${formData.name}\n` +
      `📞 *Telefone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email || 'N/A'}\n\n` +
      `📍 *Endereço de Entrega:*\n${formData.address}\n` +
      (formData.complement ? `Complemento: ${formData.complement}\n` : '') +
      `\n📦 *Itens do Pedido:*\n` +
      (savedOrder?.items || []).map((item: any, i: number) => 
        `${i + 1}. ${item.name} - ${item.quantity}x R$ ${item.price.toFixed(2)}`
      ).join('\n') +
      `\n\n💰 *Subtotal:* R$ ${(savedOrder?.subtotal || 0).toFixed(2)}\n` +
      `🚚 *Frete:* R$ ${(savedOrder?.deliveryFee || 0).toFixed(2)}\n` +
      `🎯 *Total:* R$ ${(savedOrder?.total || 0).toFixed(2)}\n\n` +
      `✅ *SEPARAR PEDIDO PARA ENTREGA*`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const adegaAddress = 'Rua Dante Pellacani, 92 - São Paulo - SP, 03334-070';
    const dropoffAddress = `${formData.address}${formData.complement ? ' - ' + formData.complement : ''}`;
    const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup[formatted_address]=${encodeURIComponent(adegaAddress)}&dropoff[formatted_address]=${encodeURIComponent(dropoffAddress)}`;

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto card text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-green-500">✅ Pagamento Aprovado!</h1>
            <p className="text-xl text-gray-300 mb-2">Pedido #{paidOrderId}</p>
            <p className="text-gray-400">Seu pagamento foi confirmado pelo Mercado Pago</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-bold mb-4">📦 Detalhes da Entrega</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Nome:</strong> {formData.name}</p>
              <p><strong>Telefone:</strong> {formData.phone}</p>
              <p><strong>Endereço:</strong> {formData.address}</p>
              {formData.complement && <p><strong>Complemento:</strong> {formData.complement}</p>}
              <p className="text-gold-500 font-bold mt-4">Total: R$ {(savedOrder?.total || 0).toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              📢 Enviar Pedido para a Adega Separar
            </a>

            <a
              href={uberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full py-4 text-lg flex items-center justify-center gap-3"
            >
              🚕 Chamar Uber com retirada na Adega
            </a>

            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full py-3"
            >
              🏠 Voltar para Início
            </button>

            <p className="text-xs text-gray-500 mt-4">
              ⚠️ Importante: Clique no botão acima para enviar os detalhes do pedido para a adega via WhatsApp.
              Isso garante que seu pedido seja separado e enviado rapidamente!
            </p>
          </div>
        </div>
      </div>
    );
  }

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

  // Função para criar preferência no Mercado Pago
  const createPreference = async () => {
    if (items.length === 0) return;
    
    try {
      console.log('Criando preferência no Mercado Pago...');
      
      const paymentData = {
        items: items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        payer: {
          name: 'Cliente',
          phone: '11999999999',
          email: 'cliente@adega.com',
          address: 'A preencher'
        },
        orderId: 'temp-' + Date.now()
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('URL da API:', apiUrl);
      console.log('Dados:', paymentData);

      const paymentResponse = await fetch(`${apiUrl}/api/payment/create-preference`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(paymentData)
      });

      console.log('Resposta:', paymentResponse.status);

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        console.error('Erro na resposta:', errorText);
        return;
      }

      const paymentResult = await paymentResponse.json();
      console.log('Preferência criada:', paymentResult);

      if (paymentResult.preferenceId) {
        setPreferenceId(paymentResult.preferenceId);
      }
    } catch (error) {
      console.error('Erro ao criar preferência:', error);
    }
  };

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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/shipping/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: formData.address, method: 'zone' })
      });

      if (response.ok) {
        const data = await response.json();
        setDeliveryFee(data.deliveryFee);
        alert(
          `Frete calculado com sucesso!\n\n` +
          `📍 Zona: ${data.zone}\n` +
          `📍 Distância: ${data.distance} km\n` +
          `💰 Valor: R$ ${data.deliveryFee.toFixed(2)}\n` +
          `⏱️ Tempo estimado: ${data.estimatedTime} minutos`
        );
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao calcular frete');
        // Fallback: frete fixo
        setDeliveryFee(15.00);
      }
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      // Fallback: frete fixo
      setDeliveryFee(15.00);
      alert('Erro ao calcular frete. Usando valor padrão: R$ 15,00');
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

    // Salvar no localStorage para pedido em dinheiro
    const orderId = 'CASH-' + Date.now();
    const orderData = {
      orderId,
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        complement: formData.complement
      },
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod: 'cash',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Salvar localmente
    try {
      const orders = JSON.parse(localStorage.getItem('myOrders') || '[]');
      orders.unshift(orderData);
      localStorage.setItem('myOrders', JSON.stringify(orders));
    } catch (e) {
      console.error('Erro ao salvar pedido:', e);
    }

    clearCart();
    alert(`Pedido ${orderId} realizado com sucesso!\n\nPagamento na entrega.\n\nSeu pedido foi salvo localmente.`);
    navigate('/');
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

                <div className="grid md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleCalculateShipping}
                    disabled={loading || !formData.address}
                    className="btn-secondary"
                  >
                    {loading ? '⏳ Calculando...' : '📍 Calcular Frete por Zona'}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!formData.address) {
                        alert('Preencha o endereço para calcular o frete');
                        return;
                      }
                      setLoading(true);
                      try {
                        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                        const response = await fetch(`${apiUrl}/api/shipping/uber-quote`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ address: formData.address })
                        });
                        if (response.ok) {
                          const data = await response.json();
                          setDeliveryFee(data.deliveryFee || 15.00);
                          alert(
                            `🚚 Frete Uber calculado!\n\n` +
                            `📍 Distância: ${data.distance} km\n` +
                            `💰 Valor: R$ ${data.deliveryFee ? data.deliveryFee.toFixed(2) : '15.00'}\n` +
                            `⏱️ Tempo: ${Math.round(data.duration / 60)} minutos`
                          );
                        } else {
                          setDeliveryFee(15.00);
                          alert('🚚 Uber indisponível. Usando frete padrão: R$ 15,00');
                        }
                      } catch (error) {
                        console.error('Erro Uber:', error);
                        setDeliveryFee(15.00);
                        alert('Erro ao calcular com Uber. Usando valor padrão: R$ 15,00');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading || !formData.address}
                    className="btn-secondary bg-black border-2 border-white hover:bg-gray-900"
                  >
                    {loading ? '⏳ Calculando...' : '🚚 Calcular com Uber'}
                  </button>
                </div>
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
                `Finalizar Pedido (Dinheiro) - R$ ${total.toFixed(2)}`
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
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total:</span>
                <span className="text-gold-500">R$ {total.toFixed(2)}</span>
              </div>

              {/* Botão do Mercado Pago */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3 text-center">
                  💳 Pagar Online
                </h3>
                {preferenceId ? (
                  <>
                    <button
                      onClick={() => {
                        // Salvar pedido antes de redirecionar
                        const orderId = 'MP-' + Date.now();
                        const orderData = {
                          orderId,
                          customer: {
                            name: formData.name,
                            phone: formData.phone,
                            email: formData.email,
                            address: formData.address,
                            complement: formData.complement
                          },
                          items: items.map(item => ({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity
                          })),
                          subtotal,
                          deliveryFee,
                          discount,
                          total,
                          paymentMethod: 'mercadopago',
                          preferenceId,
                          status: 'pending',
                          createdAt: new Date().toISOString()
                        };
                        
                        try {
                          const orders = JSON.parse(localStorage.getItem('myOrders') || '[]');
                          orders.unshift(orderData);
                          localStorage.setItem('myOrders', JSON.stringify(orders));
                        } catch (e) {
                          console.error('Erro ao salvar pedido:', e);
                        }
                        
                        // Abrir Mercado Pago
                        window.open(`https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`, '_blank');
                      }}
                      className="btn-primary w-full py-4 text-lg"
                    >
                      💳 Pagar com Mercado Pago - R$ {total.toFixed(2)}
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-3">
                      Pague com PIX ou Cartão de forma segura
                    </p>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-gold-500" />
                    <p className="text-sm text-gray-400 mt-2">Preparando pagamento...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
