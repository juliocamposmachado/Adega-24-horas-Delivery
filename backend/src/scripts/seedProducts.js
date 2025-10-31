import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Admin from '../models/Admin.js';
import Coupon from '../models/Coupon.js';

dotenv.config();

const parsePrice = (priceString) => {
  return parseFloat(priceString.replace('R$', '').replace(',', '.').trim());
};

const categories = [
  {
    title: 'Vinhos',
    items: [
      { name: 'Frisante Italiano Tinto Lambrusco Villa Giada Amabile', description: 'Vinho frisante italiano de sabor suave e adocicado. 750ml', price: 'R$ 72,00' },
      { name: 'Santa Carolina Cabernet Sauvignon Merlot', description: 'Vinho tinto chileno encorpado com notas de frutas vermelhas. 750ml', price: 'R$ 60,00' },
      { name: 'Vinho Chileno Branco Reservado Chardonnay Santa Carolina', description: 'Branco elegante com aroma de frutas tropicais. 750ml', price: 'R$ 60,00' },
      { name: 'Vinho Chileno Tinto Reservado Malbec Santa Carolina', description: 'Tinto intenso com taninos macios e final prolongado. 750ml', price: 'R$ 76,50' },
      { name: 'Vinho Pata Negra Oro Tempranillo', description: 'Vinho espanhol premium com notas de carvalho. 750ml', price: 'R$ 84,90' },
      { name: 'Vinho Reservado Cabernet Sauvignon Santa Carolina', description: 'Clássico chileno com estrutura firme e elegante. 750ml', price: 'R$ 60,00' },
      { name: 'Vinho Reservado Shiraz Santa Carolina', description: 'Tinto robusto com aromas de especiarias. 750ml', price: 'R$ 76,50' },
      { name: 'Vinho Sul-Africano Rosé Nederburg', description: 'Rosé refrescante com notas florais e frutadas. 750ml', price: 'R$ 123,50' },
      { name: 'Vinho Tinto Chileno Reservado Merlot Santa Carolina', description: 'Merlot macio e aveludado, ideal para o dia a dia. 750ml', price: 'R$ 76,50' },
      { name: 'Vinho Tinto Suave Olaria', description: 'Tinto nacional suave e equilibrado. 750ml', price: 'R$ 74,00' },
      { name: 'Vinho Tinto Suave Reservado Santa Carolina', description: 'Opção leve e agradável para iniciantes. 750ml', price: 'R$ 51,00' },
      { name: 'Vinho Sul-Africano Tinto 1791 Pinotage Nederburg', description: 'Variedade exclusiva da África do Sul, rico e complexo. 750ml', price: 'R$ 115,50' },
      { name: 'Vinho Chileno Branco Reservado Sauvignon Blanc Santa Carolina', description: 'Branco fresco e aromático com acidez vibrante. 750ml', price: 'R$ 60,00' },
    ]
  },
  {
    title: 'Refrigerantes',
    items: [
      { name: 'Coca-Cola Original', description: 'O clássico refrigerante de cola. 200ml', price: 'R$ 3,00' },
      { name: 'Drink Pronto Jack Daniel\'s com Coca-Cola', description: 'Combinação premium pronta para beber. 350ml', price: 'R$ 21,00' },
      { name: 'Fanta Laranja', description: 'Refrigerante de laranja refrescante. 2L', price: 'R$ 17,00' },
      { name: 'Fanta Uva', description: 'Sabor intenso de uva para toda família. 2L', price: 'R$ 18,50' },
      { name: 'Coca-Cola PET', description: 'A original em embalagem econômica. 2L', price: 'R$ 16,00' },
      { name: 'Guaraná Antarctica', description: 'Guaraná genuinamente brasileiro. 2L', price: 'R$ 18,50' },
    ]
  },
  {
    title: 'Energéticos',
    items: [
      { name: 'Baly', description: 'Energia e sabor em lata. 473ml', price: 'R$ 11,00' },
      { name: 'Furioso', description: 'Energia rápida e intensa. 250ml', price: 'R$ 4,00' },
      { name: 'Red Bull', description: 'O energético número 1 do mundo. 250ml', price: 'R$ 17,00' },
      { name: 'Baly Tradicional', description: 'Versão família do energético. 2L', price: 'R$ 25,00' },
      { name: 'Baly Melancia', description: 'Sabor refrescante de melancia. 2L', price: 'R$ 21,00' },
      { name: 'Drink Baly Frutas Tropicais', description: 'Mix exótico de frutas tropicais.', price: 'R$ 10,00' },
      { name: 'Baly Melancia 473ml', description: 'Lata individual sabor melancia. 473ml', price: 'R$ 10,00' },
    ]
  },
  {
    title: 'Águas',
    items: [
      { name: 'Crystal com gás', description: 'Água mineral gaseificada. 500ml', price: 'R$ 5,00' },
      { name: 'São Lourenço', description: 'Água mineral natural pura. 1,26L', price: 'R$ 10,90' },
      { name: 'Voss', description: 'Água premium norueguesa em garrafa icônica. 375ml', price: 'R$ 48,00' },
      { name: 'Água de Coco Quadrado', description: 'Água de coco 100% natural. 200ml', price: 'R$ 5,00' },
      { name: 'Kero Coco', description: 'Hidratação natural direto do coco. 200ml', price: 'R$ 5,00' },
    ]
  },
  {
    title: 'Destilados',
    items: [
      { name: 'Conhaque Dreher', description: 'Conhaque brasileiro tradicional. 900ml', price: 'R$ 42,50' },
      { name: 'Tequila Tequiloka Silver', description: 'Tequila mexicana prata para drinks. 1L', price: 'R$ 41,50' },
    ]
  },
  {
    title: 'Sucos',
    items: [
      { name: 'Suco de Uva Integral Flora', description: 'Suco 100% natural sem adição de açúcar. 300ml', price: 'R$ 15,00' },
    ]
  },
  {
    title: 'Cachaça',
    items: [
      { name: 'Velho Barreiro', description: 'Cachaça tradicional brasileira de qualidade. 910ml', price: 'R$ 28,00' },
    ]
  },
  {
    title: 'Gin',
    items: [
      { name: 'Gin Apogee', description: 'Gin nacional premium com botânicos selecionados. 1L', price: 'R$ 87,50' },
      { name: 'Gin Apogee Negroni', description: 'Versão especial para o clássico coquetel. 1L', price: 'R$ 87,50' },
      { name: 'Gin Eternity', description: 'Gin suave e aromático. 900ml', price: 'R$ 59,50' },
      { name: 'Gin Rocks', description: 'Gin intenso com caráter único. 1L', price: 'R$ 100,50' },
      { name: 'Gin Seagers', description: 'Gin importado de qualidade comprovada. 980ml', price: 'R$ 93,50' },
      { name: 'Combo Gin Eternity', description: 'Kit especial com gin e acompanhamentos.', price: 'R$ 72,00' },
      { name: 'Gin Intencion', description: 'Opção acessível para drinks do dia a dia. 900ml', price: 'R$ 27,00' },
    ]
  },
  {
    title: 'Cervejas',
    items: [
      { name: 'Becks', description: 'Cerveja alemã premium de sabor marcante. 350ml', price: 'R$ 13,50' },
      { name: 'Brahma Duplo Malte', description: 'Encorpada com 2x mais malte. 269ml', price: 'R$ 5,50' },
      { name: 'Budweiser', description: 'Cerveja americana lager clássica. 269ml', price: 'R$ 8,00' },
      { name: 'Estrella Galicia', description: 'Cerveja espanhola de tradição. 269ml', price: 'R$ 6,50' },
      { name: 'Heineken', description: 'Cerveja holandesa mundialmente famosa. 269ml', price: 'R$ 9,00' },
      { name: 'Império', description: 'Cerveja puro malte brasileira. 269ml', price: 'R$ 5,00' },
      { name: 'Red Stripe', description: 'Cerveja jamaicana leve e refrescante. 330ml', price: 'R$ 14,50' },
      { name: 'Amstel', description: 'Lager holandesa equilibrada. 269ml', price: 'R$ 5,50' },
      { name: 'Becks Long Neck', description: 'Versão long neck da cerveja alemã. 330ml', price: 'R$ 13,50' },
      { name: 'Skol', description: 'A cerveja mais popular do Brasil. 269ml', price: 'R$ 5,30' },
      { name: 'Spaten', description: 'Cerveja alemã puro malte premium. 350ml', price: 'R$ 9,00' },
      { name: 'Kit Paulaner Weissbier e Dunkel', description: 'Combo com cervejas de trigo e escura. 500ml', price: 'R$ 148,50' },
      { name: 'Antarctica', description: 'Cerveja pilsen brasileira tradicional. 350ml', price: 'R$ 6,50' },
      { name: 'Stella Artois', description: 'Cerveja belga premium refinada. 269ml', price: 'R$ 7,00' },
      { name: 'Spaten Long Neck', description: 'Versão long neck da alemã puro malte. 269ml', price: 'R$ 7,50' },
    ]
  },
  {
    title: 'Vodkas',
    items: [
      { name: 'Orloff', description: 'Vodka nacional de alta qualidade. 1,75L', price: 'R$ 114,00' },
      { name: 'Smirnoff', description: 'Vodka premium internacional. 998ml', price: 'R$ 82,50' },
      { name: 'Askov', description: 'Vodka brasileira tradicional. 900ml', price: 'R$ 24,90' },
      { name: 'Eternity', description: 'Vodka nacional pura e suave. 950ml', price: 'R$ 27,00' },
    ]
  },
  {
    title: 'Whiskies',
    items: [
      { name: 'Passport Honey', description: 'Whisky escocês com toque de mel. 670ml', price: 'R$ 127,50' },
      { name: 'Bell\'s', description: 'Blended scotch whisky de tradição. 700ml', price: 'R$ 104,00' },
      { name: 'Black & White', description: 'Scotch whisky equilibrado e macio. 700ml', price: 'R$ 137,90' },
      { name: 'Passport Scotch', description: 'Whisky escocês autêntico. 1L', price: 'R$ 116,50' },
      { name: 'Ballantine\'s Finest', description: 'Blended scotch premium e refinado. 750ml', price: 'R$ 164,50' },
      { name: 'White Horse', description: 'Scotch whisky de caráter marcante. 1L', price: 'R$ 146,00' },
      { name: 'White Horse 500ml', description: 'Versão menor do clássico escocês. 500ml', price: 'R$ 82,50' },
      { name: 'Natu Nobilis', description: 'Whisky brasileiro de qualidade. 1L', price: 'R$ 127,50' },
      { name: 'Old Eight', description: 'Whisky nacional encorpado. 900ml', price: 'R$ 58,90' },
    ]
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Limpar banco de dados
    await Product.deleteMany({});
    console.log('🗑️  Produtos anteriores removidos');

    // Inserir produtos
    let count = 0;
    for (const category of categories) {
      for (const item of category.items) {
        const product = new Product({
          name: item.name,
          description: item.description,
          price: parsePrice(item.price),
          category: category.title,
          stock: Math.floor(Math.random() * 50) + 20
        });
        await product.save();
        count++;
      }
    }

    console.log(`✅ ${count} produtos inseridos com sucesso`);

    // Criar admin padrão
    const adminExists = await Admin.findOne({ email: 'admin@adega.com' });
    if (!adminExists) {
      const admin = new Admin({
        email: 'admin@adega.com',
        password: 'admin123',
        name: 'Administrador',
        role: 'superadmin'
      });
      await admin.save();
      console.log('✅ Admin criado (email: admin@adega.com, senha: admin123)');
    } else {
      console.log('ℹ️  Admin já existe');
    }

    // Criar cupons de exemplo
    const couponExists = await Coupon.findOne({ code: 'BEMVINDO' });
    if (!couponExists) {
      const welcomeCoupon = new Coupon({
        code: 'BEMVINDO',
        discountType: 'percentage',
        discountValue: 10,
        minPurchase: 50,
        maxDiscount: 20,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        usageLimit: 100
      });
      await welcomeCoupon.save();

      const freightCoupon = new Coupon({
        code: 'FRETEGRATIS',
        discountType: 'fixed',
        discountValue: 15,
        minPurchase: 100,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        usageLimit: 50
      });
      await freightCoupon.save();

      console.log('✅ Cupons criados (BEMVINDO, FRETEGRATIS)');
    } else {
      console.log('ℹ️  Cupons já existem');
    }

    console.log('🎉 Seed concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
    process.exit(1);
  }
}

seed();
