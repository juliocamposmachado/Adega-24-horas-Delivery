# Script de Instalação Adega Rádio Tatuapé FM Express
Write-Host "🍷 Instalando Adega Rádio Tatuapé FM Express..." -ForegroundColor Yellow

# Backend
Write-Host "`n📦 Instalando dependências do backend..." -ForegroundColor Cyan
Set-Location backend
npm install

# Criar arquivo .env se não existir
if (!(Test-Path .env)) {
    Write-Host "📝 Criando arquivo .env do backend..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "⚠️  IMPORTANTE: Configure as variáveis no arquivo backend/.env" -ForegroundColor Red
}

Set-Location ..

# Frontend
Write-Host "`n📦 Instalando dependências do frontend..." -ForegroundColor Cyan
Set-Location frontend
npm install

# Criar arquivo .env se não existir
if (!(Test-Path .env)) {
    Write-Host "📝 Criando arquivo .env do frontend..." -ForegroundColor Cyan
    Copy-Item .env.example .env
}

Set-Location ..

Write-Host "`n✅ Instalação concluída!" -ForegroundColor Green
Write-Host "`n📋 Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Configure o MongoDB em backend/.env"
Write-Host "2. Execute 'cd backend && npm run seed' para popular o banco"
Write-Host "3. Em um terminal: 'cd backend && npm run dev'"
Write-Host "4. Em outro terminal: 'cd frontend && npm run dev'"
Write-Host "5. Acesse http://localhost:5173"
Write-Host "`n👤 Admin padrão: admin@adega.com / admin123" -ForegroundColor Cyan
