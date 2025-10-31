import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testando conexão com MongoDB...');
console.log('📍 URI:', process.env.MONGODB_URI.replace(/\/\/.*:.*@/, '//****:****@'));

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB conectado com sucesso!');
    
    // Listar coleções
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📂 Coleções disponíveis:');
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    
    // Testar criação de documento
    const testSchema = new mongoose.Schema({
      message: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.model('Test', testSchema);
    
    const testDoc = new Test({
      message: 'Teste de conexão bem-sucedido!'
    });
    
    await testDoc.save();
    console.log('\n✅ Documento de teste criado com sucesso!');
    
    await Test.deleteMany({});
    console.log('✅ Limpeza realizada');
    
    await mongoose.connection.close();
    console.log('\n✅ Todos os testes passaram!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro ao conectar:', error.message);
    process.exit(1);
  }
}

testConnection();
