import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Vinhos', 'Refrigerantes', 'Energéticos', 'Águas', 'Destilados', 'Sucos', 'Cachaça', 'Gin', 'Cervejas', 'Vodkas', 'Whiskies']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x400/722f37/ffffff?text=Produto'
  },
  stock: {
    type: Number,
    default: 100,
    min: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índice para busca
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

export default mongoose.model('Product', productSchema);
