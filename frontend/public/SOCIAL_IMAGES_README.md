# 📸 Imagens para Redes Sociais

## Imagens Necessárias

### 1. Open Graph Image (og-image.png)
**Dimensões**: 1200x630px
**Local**: `/public/og-image.png`
**Uso**: Facebook, LinkedIn, WhatsApp

**Conteúdo sugerido**:
```
Fundo: Gradiente escuro (cinza-950 → vinho-900)
Logo: Ícone de taça de vinho (dourado)
Título: "ADEGA 24 HORAS"
Subtítulo: "RÁDIO TATUAPÉ FM"
Texto: "🚀 Delivery Express"
Destaque: "Vinhos | Cervejas | Destilados"
Call-to-action: "Peça Agora pelo WhatsApp"
Cores: Dourado (#D4AF37) + Vinho (#7F1D1D)
```

### 2. Favicon
**Dimensões**: 32x32px, 16x16px
**Local**: `/public/favicon.ico`
**Formato**: ICO (multi-size)

**Design**:
- Ícone de taça de vinho estilizado
- Cor dourada (#D4AF37)
- Fundo transparente ou escuro

### 3. Apple Touch Icon
**Dimensões**: 180x180px
**Local**: `/public/apple-touch-icon.png`
**Uso**: iOS quando adicionado à tela inicial

**Design**:
- Mesmo design do favicon
- Bordas arredondadas (iOS aplica automaticamente)
- Fundo sólido escuro

## Ferramentas para Criar

### Online (Gratuitas):
1. **Canva** - https://canva.com
   - Templates prontos para Open Graph
   - Fácil de usar
   
2. **Figma** - https://figma.com
   - Design profissional
   - Colaborativo

3. **Favicon Generator** - https://favicon.io
   - Gera todos os tamanhos de favicon
   - A partir de texto, emoji ou imagem

## Template Rápido com HTML/CSS

Você pode criar a imagem og-image.png usando o seguinte código HTML e screenshot:

```html
<!DOCTYPE html>
<html>
<head>
<style>
body {
  margin: 0;
  width: 1200px;
  height: 630px;
  background: linear-gradient(135deg, #0a0a0a 0%, #3f0d12 50%, #0a0a0a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}
.container {
  text-align: center;
  color: white;
}
.icon {
  font-size: 120px;
  margin-bottom: 20px;
}
h1 {
  font-size: 80px;
  font-weight: bold;
  background: linear-gradient(to right, #D4AF37, #F4C430, #D4AF37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}
h2 {
  font-size: 48px;
  color: #B91C1C;
  margin: 10px 0;
}
.subtitle {
  font-size: 32px;
  color: #9CA3AF;
  margin: 20px 0;
}
.categories {
  font-size: 28px;
  color: #D4AF37;
  margin: 20px 0;
}
</style>
</head>
<body>
<div class="container">
  <div class="icon">🍷</div>
  <h1>ADEGA 24 HORAS</h1>
  <h2>RÁDIO TATUAPÉ FM</h2>
  <div class="subtitle">🚀 Express Delivery</div>
  <div class="categories">Vinhos • Cervejas • Destilados</div>
</div>
</body>
</html>
```

## Como Usar

1. Abra o HTML acima em um navegador
2. Tire um screenshot de 1200x630px
3. Salve como `og-image.png`
4. Coloque em `/public/og-image.png`

## Teste as Imagens

### Facebook Debugger
https://developers.facebook.com/tools/debug/

### Twitter Card Validator
https://cards-dev.twitter.com/validator

### LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

