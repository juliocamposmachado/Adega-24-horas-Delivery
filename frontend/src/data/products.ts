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
  'Tabacaria',
  'Vinhos',
  'Cervejas',
  'Refrigerantes',
  'Energéticos',
  'Águas',
  'Destilados',
  'Gin',
  'Whiskies'
] as const;

export const products: Product[] = [
  // Produto de Teste
  { 
    id: 'test1', 
    name: '🧪 TESTE - Produto de Checkout', 
    description: 'Produto de teste para validar integração com Mercado Pago. Valor mínimo aceito.', 
    price: 0.30, 
    category: 'Teste', 
    imageUrl: 'https://media.giphy.com/media/gU25raLP4pUu4/giphy.gif' 
  },

  // Tabacaria - Cigarros
  { id: 'marlboro', name: 'Marlboro', description: 'Produto para maiores de 18 anos. Maço', price: 15.00, category: 'Tabacaria', imageUrl: 'https://www.ciggiesworld.ch/wp-content/uploads/2017/07/Marlboro-Red-Premium-Class-Cigarette.jpg' },
  { id: 'lucky-strike', name: 'Lucky Strike', description: 'Produto para maiores de 18 anos. Maço', price: 14.00, category: 'Tabacaria', imageUrl: 'https://cigarretetabacaria.com/wp-content/uploads/2023/03/cigarro-lucky-strike-original-blue-box-248927.jpg' },
  { id: 'camel', name: 'Camel', description: 'Produto para maiores de 18 anos. Maço', price: 14.50, category: 'Tabacaria', imageUrl: 'https://www.lgatacado.com.br/wp-content/uploads/sites/3994/2023/08/Story-Neon-Moderno-Oferta-de-Produto-17-1.png' },
  { id: 'benson-hedges', name: 'Benson & Hedges', description: 'Produto para maiores de 18 anos. Maço', price: 16.00, category: 'Tabacaria', imageUrl: 'https://tpackss.globaltobaccocontrol.org/sites/default/files/styles/500x500/public/2023-11/MEX_MEC_L3_02_003_0_0_2_2.jpg?itok=vAX4otvL' },
  { id: 'hollywood', name: 'Hollywood', description: 'Produto para maiores de 18 anos. Maço', price: 13.00, category: 'Tabacaria', imageUrl: 'https://i.pinimg.com/originals/1f/e6/0a/1fe60aad0273e1af182beb2bdd076c10.jpg' },
  { id: 'gudang-garam', name: 'Gudang Garam', description: 'Produto para maiores de 18 anos. Maço', price: 18.00, category: 'Tabacaria', imageUrl: 'https://th.bing.com/th/id/R.f1b3cc4504576cf88ce891a35339e64b?rik=Fa5PlTc26rmuww&riu=http%3a%2f%2fmacbeese.com%2fwp-content%2fuploads%2f2014%2f05%2fgduang-garam-professional.jpg&ehk=Mmyr4adFHufT3neZs0cdLi50ig%2bpkDCbNe8Hix4P288%3d&risl=&pid=ImgRaw&r=0' },

  // Tabacaria - Essências de Narguile
  { id: 'essencia-ziggy-berry', name: 'Essência Ziggy Berry', description: 'Produto para maiores de 18 anos. Unidade', price: 18.00, category: 'Tabacaria', imageUrl: 'https://cdn.awsli.com.br/800x800/1798/1798617/produto/220393374/essencia-ziggy-h-wsiebce1y2.jpg' },
  { id: 'essencia-ziggy-menta', name: 'Essência Ziggy Menta', description: 'Produto para maiores de 18 anos. Unidade', price: 18.00, category: 'Tabacaria', imageUrl: 'https://cdn.awsli.com.br/800x800/1798/1798617/produto/221741077/essencia-ziggy-h-p4ktouwya8.png' },
  { id: 'essencia-ziggy-uva', name: 'Essência Ziggy Uva', description: 'Produto para maiores de 18 anos. Unidade', price: 18.00, category: 'Tabacaria', imageUrl: 'https://cdn.awsli.com.br/300x300/861/861234/produto/26351252099945f72cb.jpg' },
  { id: 'essencia-ziggy-tropical', name: 'Essência Ziggy Tropical', description: 'Produto para maiores de 18 anos. Unidade', price: 18.00, category: 'Tabacaria', imageUrl: 'https://images.tcdn.com.br/img/img_prod/693228/essencia_ziggy_50g_tropical_mix_de_frutas_tropicais_2915_1_9c3e3ec8012c450bdc68523b406f8229.jpg' },
  { id: 'essencia-ziggy-maca', name: 'Essência Ziggy Maçã', description: 'Produto para maiores de 18 anos. Unidade', price: 18.00, category: 'Tabacaria', imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.Zrp2_smwQ9S5anNoAUeHvQHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'essencia-ziggy-limao', name: 'Essência Ziggy Limão', description: 'Produto para maiores de 18 anos. Unidade', price: 18.00, category: 'Tabacaria', imageUrl: 'https://cdn.awsli.com.br/800x800/1798/1798617/produto/220599755/essencia-ziggy-f-y82qn6i0gw.jpg' },
  { id: 'rosh-clover', name: 'Rosh Clover', description: 'Produto para maiores de 18 anos. Unidade', price: 29.00, category: 'Tabacaria', imageUrl: 'https://cdn.awsli.com.br/2500x2500/1798/1798617/produto/229392460/mudan-tabacaria-ym45ybu6iz.JPG' },
  { id: 'folha-aluminio-asterisco', name: 'Folha de Alumínio para Narguile - Asterisco', description: 'Produto para maiores de 18 anos. Caixinha', price: 28.00, category: 'Tabacaria', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_978713-MLB82776496720_032025-O.webp' },
  { id: 'carvao-stork', name: 'Carvão Stork, fibra coco 1kg', description: 'Produto para maiores de 18 anos. 1kg', price: 50.00, category: 'Tabacaria', imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.UHVuM7uLPt0w5hbbO3DeZQHaEN?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },

  // Tabacaria - Acessórios
  { id: 'dichavador-beizze', name: 'Dichavadores Trituradores marca Beizze', description: 'Produto para maiores de 18 anos. Unidade', price: 10.00, category: 'Tabacaria', imageUrl: 'https://m.media-amazon.com/images/I/51gYzpmuOKL._AC_SL1200_.jpg' },
  { id: 'seda-zomo', name: 'Seda Zomo Seda Natural Brown King Size', description: 'Produto para maiores de 18 anos. Unidade', price: 10.00, category: 'Tabacaria', imageUrl: 'https://m.media-amazon.com/images/I/61uZ2x7Tq7L._AC_SL1148_.jpg' },
  { id: 'isqueiro-pedra', name: 'Isqueiro Pedra', description: 'Produto para maiores de 18 anos. Unidade', price: 8.00, category: 'Tabacaria', imageUrl: 'https://m.media-amazon.com/images/I/41Xlxx2SDUL._AC_SY300_SX300_QL70_ML2_.jpg' },

  // Vinhos
  { id: 'espumante-salton', name: 'Espumante Brut Rosé Salton 750ml', description: 'Produto para maiores de 18 anos', price: 82.25, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190415_ekrije4yizi.jpg' },
  { id: 'lambrusco-villa-giada', name: 'Frisante Italiano Tinto Lambrusco Villa Giada Amabile 750ml', description: 'Produto para maiores de 18 anos', price: 55.00, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211090841_88zse6ny4s9.jpg' },
  { id: 'santa-carolina-cab-merlot', name: 'Santa Carolina Cabernet Sauvignon Merlot 750ml', description: 'Produto para maiores de 18 anos', price: 55.00, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/29aa6191-cf23-4569-a8c3-d7bd66d877b5/202408062107_6631_i.jpg' },
  { id: 'santa-carolina-chardonnay', name: 'Santa Carolina Chardonnay Vinho Chileno Branco 750ml', description: 'Produto para maiores de 18 anos', price: 57.50, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211091148_uejd0bajwp9.jpg' },
  { id: 'santa-carolina-sauvignon-blanc', name: 'Santa Carolina Sauvignon Blanc Vinho Chileno Branco 750ml', description: 'Produto para maiores de 18 anos', price: 55.00, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/d29d1980-6795-4180-8f01-49cdb4a8df76/202106110318_nzh5x6hyze.jpeg' },
  { id: 'santa-carolina-carmenere', name: 'Santa Carolina Carmenère Vinho Chileno Tinto 750ml', description: 'Produto para maiores de 18 anos', price: 55.00, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202405251019_90wdwwb49g.png' },
  { id: 'santa-carolina-malbec', name: 'Santa Carolina Malbec Vinho Chileno Tinto 750ml', description: 'Produto para maiores de 18 anos', price: 57.50, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211091205_ravlvtyb2f.jpg' },
  { id: 'santa-carolina-cabernet', name: 'Santa Carolina Cabernet Sauvignon Vinho Chileno Tinto 750ml', description: 'Produto para maiores de 18 anos', price: 55.00, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/d29d1980-6795-4180-8f01-49cdb4a8df76/202106110318_bc2jcegna66.png' },
  { id: 'santa-carolina-merlot', name: 'Santa Carolina Merlot Vinho Chileno Tinto 750ml', description: 'Produto para maiores de 18 anos', price: 57.50, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/29aa6191-cf23-4569-a8c3-d7bd66d877b5/202403242035_5428_i.jpg' },
  { id: 'santa-carolina-suave', name: 'Santa Carolina Suave Vinho Chileno Tinto 750ml', description: 'Produto para maiores de 18 anos', price: 57.50, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202503201212_q00bw1864c9.jpeg' },
  { id: 'santa-carolina-suave-branco', name: 'Santa Carolina Suave Vinho Chileno Branco 750ml', description: 'Produto para maiores de 18 anos', price: 50.98, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211091147_f8i478xemco.jpg' },
  { id: 'olaria-tinto-suave', name: 'Vinho Tinto Suave Olaria 750ml', description: 'Produto para maiores de 18 anos', price: 87.50, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190347_5gsaylkqxm.jpg' },
  { id: 'nederburg-rose', name: 'Vinho Sul-Africano Rosé Nederburg 750ml', description: 'Produto para maiores de 18 anos', price: 129.50, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211080844_zg0utla96g.jpg' },
  { id: 'nederburg-pinotage', name: 'Vinho Sul-Africano 1791 Pinotage Nederburg 750ml', description: 'Produto para maiores de 18 anos', price: 119.99, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210180215_dsqy4ypv0a.jpg' },
  { id: 'lambrusco-villa-fabrizia', name: 'Vinho Branco Lambrusco Villa Fabrizia 750ml', description: 'Produto para maiores de 18 anos', price: 76.65, category: 'Vinhos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210180018_ohuzjwszq0m.jpg' },

  // Cervejas
  { id: 'weissbier-paulaner', name: 'Cerveja Alemã Weissbier Dunkel Paulaner 500ml', description: 'Produto para maiores de 18 anos', price: 37.50, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211100802_8xlsu22sp7k.jpg' },
  { id: 'bohemia', name: 'Cerveja Bohemia Puro Malte 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 6.78, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192221_7k8xef6p7te.jpg' },
  { id: 'brahma-duplo-malte', name: 'Cerveja Brahma Duplo Malte 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 5.79, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202307171949_k4wct05u4mf.jpg' },
  { id: 'budweiser', name: 'Cerveja Budweiser Lata 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 6.99, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190038_ysdaqcw3lck.jpg' },
  { id: 'estrella-galicia', name: 'Cerveja Estrella Galicia Lata 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 7.98, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202307060116_xwy09g197es.jpg' },
  { id: 'corona', name: 'Cerveja Extra Em Lata Corona 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 11.23, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202404081141_ple0gxqur7s.png' },
  { id: 'heineken-350', name: 'Cerveja Heineken 350ml', description: 'Produto para maiores de 18 anos. Lata 350ml', price: 10.58, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182346_tqud55dpmvg.jpg' },
  { id: 'heineken-269', name: 'Cerveja Heineken Lata 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 9.38, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202401300900_pre537n3v3j.png' },
  { id: 'red-stripe', name: 'Cerveja Lager Red Stripe 330ml', description: 'Produto para maiores de 18 anos. Lata 330ml', price: 14.84, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202301131353_4wln3jprwhh.jpg' },
  { id: 'amstel', name: 'Cerveja Lata Amstel 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 7.98, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202310090932_xb8ft6e2hg.jpg' },
  { id: 'becks-long', name: 'Cerveja Long Neck Becks Puro Malte 330ml', description: 'Produto para maiores de 18 anos. Lata 330ml', price: 15.98, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192233_twmwdvkwwi8.jpg' },
  { id: 'skol', name: 'Cerveja Pilsen Skol 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 5.76, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202303161512_4yo5ilpr8yp.jpg' },
  { id: 'stella-pure-gold', name: 'Cerveja Pure Gold Sem Glúten Long Neck Stella Artois 330ml', description: 'Produto para maiores de 18 anos. Lata 330ml', price: 13.32, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202307181409_43yb1eo953i.jpg' },
  { id: 'spaten', name: 'Cerveja Spaten Puro Malte 350ml Lata', description: 'Produto para maiores de 18 anos. Lata 350ml', price: 10.63, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202501091044_x9xys8n0yif.png' },
  { id: 'kit-paulaner', name: 'Kit Cerveja Weissbier E Dunkel Paulaner Munchen 500ml', description: 'Produto para maiores de 18 anos. Kit 500ml', price: 175.00, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202406200858_u6zfq9czspb.png' },
  { id: 'petra', name: 'Cerveja Petra Pilsen 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 5.99, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192137_drz235sz2bb.jpg' },
  { id: 'lemon-radler', name: 'Cerveja Alemã Lemon Radler Paulaner 500ml', description: 'Produto para maiores de 18 anos. Lata 500ml', price: 19.70, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202305251055_3dgznbgno98.jpg' },
  { id: 'skol-beats', name: 'Skol Beats Senses 269ml', description: 'Produto para maiores de 18 anos. Lata 269ml', price: 7.96, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190049_1skamfdgwez.jpg' },
  { id: 'becks-350', name: 'Cerveja Becks 350ml', description: 'Produto para maiores de 18 anos. Embalagem 350ml', price: 10.63, category: 'Cervejas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190248_sexk6xc1y9o.jpg' },

  // Refrigerantes
  { id: 'coca-2-5l', name: 'Coca-Cola Original 2,5l', description: 'Garrafa 2,5l', price: 27.48, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192201_6gu6msq5pt.jpg' },
  { id: 'jack-and-coke', name: "Drink Pronto Jack Daniel's Com Coca-Cola Jack And Coke 350ml", description: 'Lata 350ml', price: 24.98, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202407101505_dwwhshkx01v.png' },
  { id: 'fanta-uva', name: 'Fanta Uva 2l', description: 'Garrafa 2l', price: 16.98, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182322_001h617rxy10e.jpg' },
  { id: 'sukita', name: 'Refrigerante Laranja Sukita 2l', description: 'Garrafa 2l', price: 12.00, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202310240829_dd52xyzfea.jpg' },
  { id: 'h2oh-limao', name: 'Refrigerante Limão H2oh Limão 500ml', description: 'Garrafa 500ml', price: 10.22, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190033_3klbup9pcb7.jpg' },
  { id: 'coca-2l', name: 'Refrigerante Original Coca Cola 2l', description: 'Garrafa 2l', price: 23.00, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202411271113_a4gb5i2eei5.png' },
  { id: 'pepsi-2-5l', name: 'Refrigerante Pepsi Garrafa 2,5l', description: 'Garrafa 2,5l', price: 18.88, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202501281118_la36dmcgrpj.png' },
  { id: 'coca-310ml', name: 'Coca-Cola Original 310ml', description: 'Lata 310ml', price: 7.18, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202410021501_608nw0x48jk.jpeg' },
  { id: 'pepsi-zero', name: 'Refrigerante de Cola Zero Pepsi 350ml', description: 'Lata 350ml', price: 6.38, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210200247_gz6n8ey2rgs.jpg' },
  { id: 'fanta-laranja', name: 'Fanta Laranja 2l', description: 'Garrafa 2l', price: 18.58, category: 'Refrigerantes', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182323_lsf1hzj3mx.jpg' },

  // Energéticos
  { id: 'red-bull', name: 'Energético Red Bull Energy Drink 250ml', description: 'Lata 250ml', price: 18.98, category: 'Energéticos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202408281002_2paju92uril.png' },
  { id: 'baly-melancia', name: 'Energético Baly Melancia 2l', description: 'Garrafa 2l', price: 18.98, category: 'Energéticos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190012_hbace64jn2t.jpg' },
  { id: 'baly-tropical', name: 'Energético Frutas Tropicais Baly 2l', description: 'Garrafa 2l', price: 23.98, category: 'Energéticos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202410082019_t5mgyavn06q.jpeg' },
  { id: 'baly-tradicional', name: 'Energético Tradicional Baly 2l', description: 'Garrafa 2l', price: 18.98, category: 'Energéticos', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202305190948_0qdp4letz0b.jpg' },

  // Águas
  { id: 'agua-sao-lourenco-1260', name: 'Água Mineral Sem Gás São Lourenço 1260ml', description: 'Garrafa 1260ml', price: 11.80, category: 'Águas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182335_vdii0k0tel.jpg' },
  { id: 'agua-sao-lourenco-300', name: 'Água Mineral Sem Gás São Lourenço 300ml', description: 'Garrafa 300ml', price: 5.13, category: 'Águas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190105_676mevqbvj3.jpg' },
  { id: 'agua-coco', name: 'Água de Coco Esterilizada Coco Quadrado 200ml', description: 'Embalagem 200ml', price: 5.75, category: 'Águas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202302061238_ty8s5dss9q.jpg' },
  { id: 'voss', name: 'Água Mineral Voss 375ml', description: 'Garrafa 375ml', price: 56.98, category: 'Águas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190247_94p1cqrsl8g.jpg' },
  { id: 'agua-crystal', name: 'Água Mineral com Gás Crystal 500ml', description: 'Garrafa 500ml', price: 4.78, category: 'Águas', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202407101432_rvjidl6lan.png' },

  // Destilados
  { id: 'conhaque-domecq', name: 'Conhaque Domecq 1l', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 100.00, category: 'Destilados', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192201_rxehwivheqh.jpg' },
  { id: 'conhaque-dreher', name: 'Conhaque Dreher 900ml', description: 'Produto para maiores de 18 anos. Garrafa 900ml', price: 38.98, category: 'Destilados', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202310021842_53yodnomjyg.jpg' },

  // Gin
  { id: 'gin-apogee', name: 'Gin Apogee 1l', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 103.27, category: 'Gin', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202303081317_upta0dhjtjp.jpg' },
  { id: 'gin-apogee-negroni', name: 'Gin Brasileiro Apogee Negroni 1l', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 103.27, category: 'Gin', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211091212_rh55gss6rgr.jpg' },
  { id: 'gin-apogee-citrus', name: 'Gin London Dry de Citrus Apogee 1l', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 103.27, category: 'Gin', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202305272109_tntws91nbkp.jpg' },
  { id: 'gin-eternity', name: 'Gin Eternity 900ml', description: 'Produto para maiores de 18 anos. Garrafa 900ml', price: 49.80, category: 'Gin', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210181007_kh7ljq82ule.jpg' },
  { id: 'gin-seagers', name: 'Gin Seagers 980ml', description: 'Produto para maiores de 18 anos. Garrafa 980ml', price: 103.27, category: 'Gin', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210200052_zrpe8xchln.jpg' },
  { id: 'gin-rocks', name: 'Gin Rocks Garrafa 1l', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 71.80, category: 'Gin', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202301021547_8sxhwor8wkd.jpg' },

  // Whiskies
  { id: 'passport-honey', name: 'Licor de Whisky Escocês Passport Honey 670ml', description: 'Produto para maiores de 18 anos. Garrafa 670ml', price: 191.25, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182302_5lhqdht6z49.jpg' },
  { id: 'whisky-bells', name: "Whisky Bell's 700ml", description: 'Produto para maiores de 18 anos. Garrafa 700ml', price: 131.78, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202212050852_qzkp9gshnmf.jpg' },
  { id: 'black-white', name: 'Whisky Black & White 700ml', description: 'Produto para maiores de 18 anos. Garrafa 700ml', price: 162.25, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190304_1is55ds9af3.jpg' },
  { id: 'chanceler', name: 'Whisky Chanceler Garrafa 1l', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 75.00, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190158_74cjk1bb6jq.jpg' },
  { id: 'passport-scotch', name: 'Whisky Escocês Passport Scotch 1l', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 137.25, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202502141304_qs63aj60e9a.jpeg' },
  { id: 'ballantines', name: 'Whisky Finest Ballantines 750ml', description: 'Produto para maiores de 18 anos. Garrafa 750ml', price: 172.25, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210202242_hlj5qwgjoh9.jpg' },
  { id: 'johnnie-walker', name: 'Whisky Johnnie Walker Red Label Garrafa 1 Litro', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 249.75, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210180410_2hnui47v0mx.jpg' },
  { id: 'white-horse', name: 'Whisky White Horse 500ml', description: 'Produto para maiores de 18 anos. Garrafa 500ml', price: 97.25, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202301251147_bn3iotc9i9.jpg' },
  { id: 'grants', name: 'Whisky Grants Family Reserve Scotch Whiskey 8 Anos Garrafa 1l', description: 'Produto para maiores de 18 anos. Garrafa 1l', price: 131.78, category: 'Whiskies', imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182302_5lhqdht6z49.jpg' }
];
