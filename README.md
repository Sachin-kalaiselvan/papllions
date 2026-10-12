# Papillons

Marketing site for Papillons, an interior design studio.

Built with TanStack Start (SSR) on React 19, TanStack Router, Tailwind CSS v4,
shadcn/ui and Framer Motion. Server bundling is handled by Nitro.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # outputs Vercel Build Output API format to .vercel/output
npm run preview   # serve the production build locally
npm run test      # vitest
```

To build a plain Node server instead of the Vercel target:

```bash
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs
```

## Deployment

Deployed on Vercel. The Nitro `vercel` preset writes `.vercel/output`, which
Vercel picks up directly — no build settings or output directory to configure.
Pushes to the default branch deploy automatically; pull requests get preview URLs.
