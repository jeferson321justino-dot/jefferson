# 24h Montador de Móveis (GitHub Pages)

Site estático (HTML/CSS/JS). Deploy feito via **GitHub Pages**.

## Como rodar local
Como é um site estático, basta abrir o arquivo:

- `index.html`

no navegador.

> Observação: arquivos apontam para caminhos relativos (`css/`, `js/`, `images/`, `videos/`). Então mantenha a estrutura de pastas.

## Como ajustar o WhatsApp
O número do WhatsApp e a mensagem padrão ficam em:

- `js/script.js`

Procure por:

```js
const WHATSAPP_NUMBER = "69992131686";
```

- Formato: **apenas números**, com DDD (ex: `69992131686`).

## Publicar no GitHub Pages (melhor forma)
### Opção recomendada: publicar a pasta `24h-moveis/`
1. Crie um repositório no GitHub (ex: `jefferson-montador-site`).
2. Faça push do conteúdo desta pasta mantendo a estrutura:
   - `24h-moveis/index.html`
   - `24h-moveis/css/style.css`
   - `24h-moveis/js/script.js`
   - `24h-moveis/images/*`
   - `24h-moveis/videos/*`
3. No GitHub, vá em **Settings** → **Pages**.
4. Em **Build and deployment** / **Source** selecione:
   - **Branch**: `main` (ou a branch que você usar)
   - **Folder**: `/ (root)` *ou* selecione `/24h-moveis` dependendo da interface.

Como a estrutura está dentro de `24h-moveis/`, o objetivo é fazer o GitHub Pages servir a partir dela.

### Teste
Após habilitar, aguarde alguns minutos e abra a URL gerada pelo Pages.

## Dica
Se você criar outra versão do site, não altere os nomes de arquivos e pastas usados nos `src` e `href` do `index.html`.

