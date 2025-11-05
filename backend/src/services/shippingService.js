import axios from 'axios';

class ShippingService {
  constructor() {
    // Coordenadas da adega
    this.storeLocation = {
      address: 'Rua Dante Pellacani, 92 - Tatuapé, São Paulo - SP, 03334-070',
      lat: -23.5505199,
      lng: -46.6333094
    };
    
    // Tabela de zonas de entrega
    this.zones = [
      { maxKm: 3, price: 10.00, name: 'Zona 1' },
      { maxKm: 6, price: 15.00, name: 'Zona 2' },
      { maxKm: 10, price: 22.50, name: 'Zona 3' },
      { maxKm: 15, price: 32.50, name: 'Zona 4' }
    ];
    
    // Fórmula alternativa: (km × 2.50) + R$ 5,00
    this.pricePerKm = 2.50;
    this.minimumFee = 5.00;
  }

  /**
   * Calcular distância entre dois pontos (Haversine)
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
  }

  toRad(deg) {
    return deg * (Math.PI / 180);
  }

  /**
   * Obter coordenadas de um endereço usando Google Maps Geocoding API
   * (Alternativa: usar OpenStreetMap Nominatim que é gratuito)
   */
  async getCoordinates(address) {
    try {
      // Usando Nominatim (OpenStreetMap) - gratuito
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address + ', São Paulo, Brasil',
          format: 'json',
          limit: 1
        },
        headers: {
          'User-Agent': 'Adega-Radio-Tatuape/1.0'
        }
      });

      if (response.data && response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon)
        };
      }
      
      throw new Error('Endereço não encontrado');
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error.message);
      throw new Error('Não foi possível calcular a distância. Verifique o endereço.');
    }
  }

  /**
   * Calcular frete por zona
   */
  calculateZoneFee(distanceKm) {
    for (const zone of this.zones) {
      if (distanceKm <= zone.maxKm) {
        return {
          fee: zone.price,
          zone: zone.name,
          distance: distanceKm,
          formula: 'Tabela de zonas'
        };
      }
    }
    
    // Se passar de 15km, não entrega ou cobra valor especial
    return {
      fee: null,
      zone: 'Fora da área de entrega',
      distance: distanceKm,
      formula: 'Zona não atendida'
    };
  }

  /**
   * Calcular frete pela fórmula: (km × 2.50) + R$ 5,00
   */
  calculateFormularFee(distanceKm) {
    const fee = (distanceKm * this.pricePerKm) + this.minimumFee;
    return {
      fee: Math.round(fee * 100) / 100, // Arredondar para 2 casas
      distance: distanceKm,
      formula: `(${distanceKm.toFixed(2)} km × R$ ${this.pricePerKm}) + R$ ${this.minimumFee}`
    };
  }

  /**
   * Calcular frete completo (com ambas as opções)
   */
  async calculateShipping(customerAddress, method = 'zone') {
    try {
      // Obter coordenadas do cliente
      const customerCoords = await this.getCoordinates(customerAddress);
      
      // Calcular distância
      const distance = this.calculateDistance(
        this.storeLocation.lat,
        this.storeLocation.lng,
        customerCoords.lat,
        customerCoords.lng
      );

      // Calcular tempo estimado (assumindo 30 km/h em cidade)
      const estimatedMinutes = Math.round((distance / 30) * 60) + 10; // +10min para preparação

      // Calcular frete
      let result;
      if (method === 'zone') {
        result = this.calculateZoneFee(distance);
      } else {
        result = this.calculateFormularFee(distance);
      }

      return {
        ...result,
        estimatedTime: estimatedMinutes,
        storeAddress: this.storeLocation.address,
        customerAddress: customerAddress,
        customerCoords: customerCoords
      };
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      throw error;
    }
  }

  /**
   * Verificar se endereço está na área de cobertura
   */
  async isInCoverageArea(address) {
    try {
      const coords = await this.getCoordinates(address);
      const distance = this.calculateDistance(
        this.storeLocation.lat,
        this.storeLocation.lng,
        coords.lat,
        coords.lng
      );
      
      return {
        inArea: distance <= 15, // Máximo 15km
        distance: distance
      };
    } catch (error) {
      return {
        inArea: false,
        distance: null,
        error: error.message
      };
    }
  }
}

export default new ShippingService();

