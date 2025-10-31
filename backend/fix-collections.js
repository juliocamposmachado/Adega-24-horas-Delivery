import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function fixCollections() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    const db = mongoose.connection.db;
    
    // Listar coleções atuais
    const collections = await db.listCollections().toArray();
    console.log('\n📋 Coleções atuais:');
    collections.forEach(col => console.log(`  - ${col.name}`));

    // Renomear coleções se necessário
    const renames = [
      { from: 'orders', to: 'pedidos' },
      { from: 'admins', to: 'administradores' },
      { from: 'coupons', to: 'cupons' },
      { from: 'products', to: 'produtos' }
    ];

    console.log('\n🔄 Renomeando coleções...');
    
    for (const rename of renames) {
      const exists = collections.find(c => c.name === rename.from);
      if (exists) {
        try {
          await db.collection(rename.from).rename(rename.to);
          console.log(`  ✅ ${rename.from} → ${rename.to}`);
        } catch (error) {
          if (error.code === 48) {
            console.log(`  ⚠️  ${rename.to} já existe`);
          } else {
            console.log(`  ❌ Erro ao renomear ${rename.from}: ${error.message}`);
          }
        }
      } else {
        console.log(`  ⏭️  ${rename.from} não existe`);
      }
    }

    // Listar coleções finais
    const finalCollections = await db.listCollections().toArray();
    console.log('\n📋 Coleções após renomear:');
    finalCollections.forEach(col => console.log(`  - ${col.name}`));

    // Limpar coleção de produtos (já que é estática agora)
    console.log('\n🗑️  Removendo produtos do banco (agora estático no frontend)...');
    const produtosCol = finalCollections.find(c => c.name === 'produtos');
    if (produtosCol) {
      const count = await db.collection('produtos').countDocuments();
      await db.collection('produtos').deleteMany({});
      console.log(`  ✅ ${count} produtos removidos (catálogo agora é estático)`);
    }

    console.log('\n✅ Otimização concluída!');
    console.log('\nℹ️  Coleções ativas para MongoDB free tier:');
    console.log('  - pedidos (orders)');
    console.log('  - administradores (admins)');
    console.log('  - cupons (coupons)');
    console.log('\nℹ️  Produtos agora são estáticos no frontend');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Desconectado do MongoDB');
  }
}

fixCollections();
