export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const categories = [
  'Teste',
  'Vinhos',
  'Refrigerantes',
  'Energéticos',
  'Águas',
  'Destilados',
  'Sucos',
  'Cachaça',
  'Gin',
  'Cervejas',
  'Vodkas',
  'Whiskies'
] as const;

const productImageUrl = 'https://media.giphy.com/media/gU25raLP4pUu4/giphy.gif';

export const products: Product[] = [
  // Produto de Teste para Mercado Pago
  { id: 'test1', name: '🧪 TESTE - Produto de Checkout', description: 'Produto de teste para validar integração com Mercado Pago. Valor mínimo aceito.', price: 0.30, category: 'Teste', imageUrl: productImageUrl },
  // Vinhos
  { id: 'v1', name: 'Frisante Italiano Tinto Lambrusco Villa Giada Amabile', description: 'Vinho frisante italiano de sabor suave e adocicado. 750ml', price: 72.00, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v2', name: 'Santa Carolina Cabernet Sauvignon Merlot', description: 'Vinho tinto chileno encorpado com notas de frutas vermelhas. 750ml', price: 60.00, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v3', name: 'Vinho Chileno Branco Reservado Chardonnay Santa Carolina', description: 'Branco elegante com aroma de frutas tropicais. 750ml', price: 60.00, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v4', name: 'Vinho Chileno Tinto Reservado Malbec Santa Carolina', description: 'Tinto intenso com taninos macios e final prolongado. 750ml', price: 76.50, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v5', name: 'Vinho Pata Negra Oro Tempranillo', description: 'Vinho espanhol premium com notas de carvalho. 750ml', price: 84.90, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v6', name: 'Vinho Reservado Cabernet Sauvignon Santa Carolina', description: 'Clássico chileno com estrutura firme e elegante. 750ml', price: 60.00, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v7', name: 'Vinho Reservado Shiraz Santa Carolina', description: 'Tinto robusto com aromas de especiarias. 750ml', price: 76.50, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v8', name: 'Vinho Sul-Africano Rosé Nederburg', description: 'Rosé refrescante com notas florais e frutadas. 750ml', price: 123.50, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v9', name: 'Vinho Tinto Chileno Reservado Merlot Santa Carolina', description: 'Merlot macio e aveludado, ideal para o dia a dia. 750ml', price: 76.50, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v10', name: 'Vinho Tinto Suave Olaria', description: 'Tinto nacional suave e equilibrado. 750ml', price: 74.00, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v11', name: 'Vinho Sul-Africano Tinto 1791 Pinotage Nederburg', description: 'Variedade exclusiva da África do Sul, rico e complexo. 750ml', price: 115.50, category: 'Vinhos', imageUrl: productImageUrl },
  { id: 'v12', name: 'Vinho Chileno Branco Reservado Sauvignon Blanc Santa Carolina', description: 'Branco fresco e aromático com acidez vibrante. 750ml', price: 60.00, category: 'Vinhos', imageUrl: productImageUrl },

  // Refrigerantes
  { id: 'r1', name: 'Coca-Cola Original', description: 'O clássico refrigerante de cola. 200ml', price: 3.00, category: 'Refrigerantes', imageUrl: productImageUrl },
  { id: 'r2', name: 'Fanta Laranja', description: 'Refrigerante de laranja refrescante. 2L', price: 17.00, category: 'Refrigerantes', imageUrl: productImageUrl },
  { id: 'r3', name: 'Fanta Uva', description: 'Sabor intenso de uva para toda família. 2L', price: 18.50, category: 'Refrigerantes', imageUrl: productImageUrl },
  { id: 'r4', name: 'Coca-Cola PET', description: 'A original em embalagem econômica. 2L', price: 16.00, category: 'Refrigerantes', imageUrl: productImageUrl },
  { id: 'r5', name: 'Guaraná Antarctica', description: 'Guaraná genuinamente brasileiro. 2L', price: 18.50, category: 'Refrigerantes', imageUrl: productImageUrl },

  // Energéticos
  { id: 'e1', name: 'Baly', description: 'Energia e sabor em lata. 473ml', price: 11.00, category: 'Energéticos', imageUrl: productImageUrl },
  { id: 'e2', name: 'Furioso', description: 'Energia rápida e intensa. 250ml', price: 4.00, category: 'Energéticos', imageUrl: productImageUrl },
  { id: 'e3', name: 'Red Bull', description: 'O energético número 1 do mundo. 250ml', price: 17.00, category: 'Energéticos', imageUrl: productImageUrl },
  { id: 'e4', name: 'Baly Tradicional', description: 'Versão família do energético. 2L', price: 25.00, category: 'Energéticos', imageUrl: productImageUrl },
  { id: 'e5', name: 'Baly Melancia', description: 'Sabor refrescante de melancia. 2L', price: 21.00, category: 'Energéticos', imageUrl: productImageUrl },

  // Cervejas
  { id: 'c1', name: 'Heineken', description: 'Cerveja holandesa mundialmente famosa. 269ml', price: 9.00, category: 'Cervejas', imageUrl: productImageUrl },
  { id: 'c2', name: 'Stella Artois', description: 'Cerveja belga premium refinada. 269ml', price: 7.00, category: 'Cervejas', imageUrl: productImageUrl },
  { id: 'c3', name: 'Budweiser', description: 'Cerveja americana lager clássica. 269ml', price: 8.00, category: 'Cervejas', imageUrl: productImageUrl },
  { id: 'c4', name: 'Skol', description: 'A cerveja mais popular do Brasil. 269ml', price: 5.30, category: 'Cervejas', imageUrl: productImageUrl },
  { id: 'c5', name: 'Brahma Duplo Malte', description: 'Encorpada com 2x mais malte. 269ml', price: 5.50, category: 'Cervejas', imageUrl: productImageUrl },
  { id: 'c6', name: 'Antarctica', description: 'Cerveja pilsen brasileira tradicional. 350ml', price: 6.50, category: 'Cervejas', imageUrl: productImageUrl },
  { id: 'c7', name: 'Spaten', description: 'Cerveja alemã puro malte premium. 350ml', price: 9.00, category: 'Cervejas', imageUrl: productImageUrl },

  // Whiskies
  { id: 'w1', name: 'Ballantine\'s Finest', description: 'Blended scotch premium e refinado. 750ml', price: 164.50, category: 'Whiskies', imageUrl: productImageUrl },
  { id: 'w2', name: 'White Horse', description: 'Scotch whisky de caráter marcante. 1L', price: 146.00, category: 'Whiskies', imageUrl: productImageUrl },
  { id: 'w3', name: 'Passport Scotch', description: 'Whisky escocês autêntico. 1L', price: 116.50, category: 'Whiskies', imageUrl: productImageUrl },
  { id: 'w4', name: 'Bell\'s', description: 'Blended scotch whisky de tradição. 700ml', price: 104.00, category: 'Whiskies', imageUrl: productImageUrl },

  // Vodkas
  { id: 'vo1', name: 'Smirnoff', description: 'Vodka premium internacional. 998ml', price: 82.50, category: 'Vodkas', imageUrl: productImageUrl },
  { id: 'vo2', name: 'Orloff', description: 'Vodka nacional de alta qualidade. 1,75L', price: 114.00, category: 'Vodkas', imageUrl: productImageUrl },

  // Gin
  { id: 'g1', name: 'Gin Rocks', description: 'Gin intenso com caráter único. 1L', price: 100.50, category: 'Gin', imageUrl: productImageUrl },
  { id: 'g2', name: 'Gin Seagers', description: 'Gin importado de qualidade comprovada. 980ml', price: 93.50, category: 'Gin', imageUrl: productImageUrl },
  { id: 'g3', name: 'Gin Apogee', description: 'Gin nacional premium com botânicos selecionados. 1L', price: 87.50, category: 'Gin', imageUrl: productImageUrl },

  // Águas
  { id: 'a1', name: 'Voss', description: 'Água premium norueguesa em garrafa icônica. 375ml', price: 48.00, category: 'Águas', imageUrl: productImageUrl },
  { id: 'a2', name: 'São Lourenço', description: 'Água mineral natural pura. 1,26L', price: 10.90, category: 'Águas', imageUrl: productImageUrl },
  { id: 'a3', name: 'Crystal com gás', description: 'Água mineral gaseificada. 500ml', price: 5.00, category: 'Águas', imageUrl: productImageUrl },
];
