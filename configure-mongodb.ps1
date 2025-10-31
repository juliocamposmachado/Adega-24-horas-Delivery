# Script de Configuração Automática do MongoDB
# Cole sua connection string quando solicitado

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   Configuracao MongoDB Atlas - Adega Tatuape" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Solicitar connection string
$connectionString = Read-Host "Cole sua MongoDB connection string aqui"

if ([string]::IsNullOrWhiteSpace($connectionString)) {
    Write-Host "Erro: Connection string vazia!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "1. Atualizando arquivo .env..." -ForegroundColor Green

# Atualizar .env
$envPath = ".\backend\.env"
$envContent = Get-Content $envPath -Raw

# Substituir apenas a linha do MONGODB_URI
$envContent = $envContent -replace 'MONGODB_URI=.*', "MONGODB_URI=$connectionString"

$envContent | Set-Content $envPath -NoNewline

Write-Host "   [OK] .env atualizado" -ForegroundColor Green
Write-Host ""

Write-Host "2. Testando conexao..." -ForegroundColor Green
Set-Location backend

# Tentar seed
Write-Host "   Populando banco de dados..." -ForegroundColor Cyan
$seedResult = npm run seed 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "   [OK] Banco de dados populado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "   CONFIGURACAO CONCLUIDA!" -ForegroundColor Yellow
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Produtos inseridos: 88" -ForegroundColor Green
    Write-Host "Admin criado: admin@adega.com / admin123" -ForegroundColor Green
    Write-Host "Cupons criados: BEMVINDO, FRETEGRATIS" -ForegroundColor Green
    Write-Host ""
    Write-Host "Deseja iniciar o backend agora? (S/N): " -ForegroundColor Yellow -NoNewline
    $resposta = Read-Host
    
    if ($resposta -eq 'S' -or $resposta -eq 's') {
        Write-Host ""
        Write-Host "Iniciando backend..." -ForegroundColor Cyan
        npm run dev
    } else {
        Write-Host ""
        Write-Host "Para iniciar manualmente:" -ForegroundColor Cyan
        Write-Host "  cd backend" -ForegroundColor White
        Write-Host "  npm run dev" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "   [ERRO] Falha ao conectar ao MongoDB" -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifique:" -ForegroundColor Yellow
    Write-Host "1. Connection string esta correta" -ForegroundColor White
    Write-Host "2. IP esta liberado no MongoDB Atlas (Network Access)" -ForegroundColor White
    Write-Host "3. Usuario e senha estao corretos" -ForegroundColor White
    Write-Host ""
    Write-Host "Erro detalhado:" -ForegroundColor Red
    Write-Host $seedResult
}

Set-Location ..
