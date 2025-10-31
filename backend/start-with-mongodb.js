import { MongoMemoryServer } from 'mongodb-memory-server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);

console.log('🚀 Iniciando MongoDB em memória...');

const mongod = await MongoMemoryServer.create({
  instance: {
    port: 27017,
    dbName: 'adega-radio-tatuape'
  }
});

const uri = mongod.getUri();
console.log(`✅ MongoDB rodando em: ${uri}`);

// Atualizar .env
const envPath = '.env';
let envContent = fs.readFileSync(envPath, 'utf8');
envContent = envContent.replace(/MONGODB_URI=.*/, `MONGODB_URI=${uri}adega-radio-tatuape`);
fs.writeFileSync(envPath, envContent);

console.log('📝 Arquivo .env atualizado');
console.log('');
console.log('🌱 Populando banco de dados...');

try {
  const { stdout } = await execAsync('npm run seed');
  console.log(stdout);
  
  console.log('');
  console.log('✅ Banco de dados populado com sucesso!');
  console.log('');
  console.log('🚀 Iniciando servidor...');
  console.log('');
  console.log('📌 Ctrl+C para parar');
  console.log('');
  
  // Iniciar servidor
  const serverProcess = exec('npm start');
  
  serverProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  serverProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  
  serverProcess.on('exit', (code) => {
    console.log(`Servidor parou com código: ${code}`);
  });
  
} catch (error) {
  console.error('❌ Erro:', error.message);
  await mongod.stop();
  process.exit(1);
}

// Manter o processo rodando
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Parando MongoDB...');
  await mongod.stop();
  console.log('✅ MongoDB parado');
  process.exit(0);
});
