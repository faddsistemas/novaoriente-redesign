# Nova Oriente — proposta comercial (redesign estático)

## Escopo de páginas (espelho do site atual)

- Home, busca/listagem de venda, busca por código, página do imóvel, anunciar, contato, sobre, documentos, LGPD/cookies, 404, WhatsApp flutuante, redes Facebook/Instagram.

## Proibido criar

Aluguel como estoque, login/favoritos, blog, simulador, agendar visita, mapa na listagem, equipe, chat próprio, depoimentos ou números inventados.

## Identidade

- Logo **sempre nas cores originais** (azul `#04518C` + laranja `#ff6601`; rodapé `#003760`). Sobre fundo escuro: badge claro com o PNG colorido — nunca wordmark branco.
- Conteúdo, fotos e contatos reais (CRECI PJ 3587, telefones, endereço, CNPJ).
- Usabilidade inspirada **somente em conceitos** do QuintoAndar (busca em destaque, chips, cards grandes, listagem filtrável, detalhe com galeria e CTA fixo). Sem copiar layout, textos, ícones ou código.

## Formulários

Site estático: envio abre WhatsApp `(37) 99999-1100` com mensagem pré-preenchida.

## Contadores

Apenas números derivados de `properties.json` (total, por tipo).

## Cookies

Barra fina discreta; não cobrir conteúdo nem colidir com o WhatsApp. Contraste AA.

## Fotos

CDN Imoview → WebP em `public/imoveis/<codigo>/` via `npm run download-photos`. Sem foto: placeholder com marca (`placeholder: true` no manifest).

## Deploy

GitHub Pages em `/novaoriente-redesign/` (Next `output: 'export'`, `basePath`, `assetPrefix`, `trailingSlash`, `images.unoptimized`, `.nojekyll`).