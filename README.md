# Nova Oriente — redesign (proposta comercial)

Site estático em **Next.js 15** (App Router, `output: export`) para a [Nova Oriente Corretora de Imóveis](https://www.novaoriente.com.br), publicado em:

**https://faddsistemas.github.io/novaoriente-redesign/**

## Desenvolvimento

```bash
npm install
npm run download-photos   # WebP a partir do CDN Imoview (reproduzível)
npm run dev
npm run build             # gera ./out
npm run test:smoke        # Playwright 1280 + 390
```

## Stack

Next.js, TypeScript, Tailwind v4, shadcn/ui, Framer Motion (animações + componentes estilo React Bits). Deploy: GitHub Actions → GitHub Pages (`basePath` `/novaoriente-redesign`).

Regras de produto: `PRODUCT.md` e `.cursor/rules/novaoriente-product.mdc`.