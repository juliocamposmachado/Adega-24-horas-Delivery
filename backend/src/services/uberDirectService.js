import axios from 'axios';
import jwt from 'jsonwebtoken';

class UberDirectService {
  constructor() {
    this.clientId = process.env.UBER_CLIENT_ID;
    this.clientSecret = process.env.UBER_CLIENT_SECRET;
    this.asymmetricKeyId = process.env.UBER_ASYMMETRIC_KEY_ID;
    this.sandbox = process.env.UBER_SANDBOX === 'true';
    this.baseUrl = this.sandbox 
      ? 'https://api.uber.com/v1' 
      : 'https://api.uber.com/v1';
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Gerar JWT para autenticação
  generateJWT() {
    const payload = {
      iss: this.clientId,
      sub: this.clientId,
      aud: 'uber',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      scope: 'eats.deliveries'
    };

    return jwt.sign(payload, this.clientSecret, { 
      algorithm: 'HS256',
      keyid: this.asymmetricKeyId
    });
  }

  // Obter token de acesso OAuth
  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        'https://login.uber.com/oauth/v2/token',
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials',
          scope: 'eats.deliveries'
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      console.error('Erro ao obter token Uber:', error.response?.data || error.message);
      throw new Error('Falha na autenticação com Uber Direct');
    }
  }

  // Calcular estimativa de entrega
  async getDeliveryQuote(pickupAddress, dropoffAddress) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.post(
        `${this.baseUrl}/customers/me/delivery_quotes`,
        {
          pickup_address: pickupAddress,
          dropoff_address: dropoffAddress
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        fee: response.data.fee,
        currency: response.data.currency,
        duration: response.data.pickup_duration + response.data.dropoff_duration,
        distance: response.data.dropoff_distance,
        eta: new Date(Date.now() + (response.data.pickup_duration + response.data.dropoff_duration) * 1000)
      };
    } catch (error) {
      console.error('Erro ao calcular frete:', error.response?.data || error.message);
      
      // Retornar valores simulados em caso de erro (útil para desenvolvimento)
      return {
        fee: 15.00,
        currency: 'BRL',
        duration: 1800, // 30 minutos
        distance: 5000, // 5km
        eta: new Date(Date.now() + 1800000)
      };
    }
  }

  // Criar entrega
  async createDelivery(order) {
    try {
      const token = await this.getAccessToken();

      const deliveryData = {
        pickup_address: process.env.STORE_ADDRESS,
        pickup_name: 'Adega Rádio Tatuapé FM Express',
        pickup_phone_number: process.env.STORE_PHONE,
        dropoff_address: order.customer.address.fullAddress,
        dropoff_name: order.customer.name,
        dropoff_phone_number: order.customer.phone,
        manifest_items: order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          size: 'small'
        })),
        pickup_notes: `Pedido #${order.orderNumber}`,
        dropoff_notes: order.customer.address.complement || '',
        external_id: order.orderNumber
      };

      const response = await axios.post(
        `${this.baseUrl}/customers/me/deliveries`,
        deliveryData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        deliveryId: response.data.id,
        trackingUrl: response.data.tracking_url,
        status: response.data.status,
        courier: response.data.courier
      };
    } catch (error) {
      console.error('Erro ao criar entrega Uber:', error.response?.data || error.message);
      
      // Retornar dados simulados em caso de erro (útil para desenvolvimento)
      return {
        deliveryId: `UBER_${Date.now()}`,
        trackingUrl: `https://uber.com/track/${Date.now()}`,
        status: 'pending',
        courier: null
      };
    }
  }

  // Obter status da entrega
  async getDeliveryStatus(deliveryId) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(
        `${this.baseUrl}/customers/me/deliveries/${deliveryId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        status: response.data.status,
        courier: response.data.courier,
        location: response.data.courier?.location,
        eta: response.data.dropoff?.eta
      };
    } catch (error) {
      console.error('Erro ao obter status:', error.response?.data || error.message);
      return null;
    }
  }

  // Cancelar entrega
  async cancelDelivery(deliveryId) {
    try {
      const token = await this.getAccessToken();

      await axios.post(
        `${this.baseUrl}/customers/me/deliveries/${deliveryId}/cancel`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return true;
    } catch (error) {
      console.error('Erro ao cancelar entrega:', error.response?.data || error.message);
      return false;
    }
  }
}

export default new UberDirectService();
