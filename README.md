# Agency Delivery Dashboard Code Sample

A focused Next.js code sample for a senior front-end role. The current foundation keeps the default scaffold page in place while setting up the design-token workflow, build scripts, and project guidance for the dashboard implementation.

Figma reference: https://www.figma.com/design/tIvu2Q2HhCLDTNmpnVr5FC/Code-Sample?node-id=16-3

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS v4
- Figma-exported design tokens
- OS-driven light and dark appearance

## Token Flow

Figma Variables are the intended design source of truth. The repo includes Figma-style token files that mirror those variable names and generate the app theme directly.

```bash
design-tokens/light.tokens.json
design-tokens/dark.tokens.json
```

Generate the Tailwind theme bridge with:

```bash
npm run generate-tailwind-theme
```

That writes:

```bash
src/app/theme.css
```

The token strategy is intentionally semantic and namespaced:

- Figma variable: `ad/color/bg`
- Runtime CSS custom property: `--ad-color-bg`
- Tailwind utility: `bg-ad-bg`

Appearance follows the operating system through `prefers-color-scheme`; there is no in-app theme switcher.

See [docs/design-to-dev-workflow.md](docs/design-to-dev-workflow.md) for the full design-to-dev workflow.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Current Shape

This foundation intentionally keeps the default Next.js starter page. The dashboard layout will be implemented in the next commit cycle.

- `src/app/globals.css` imports Tailwind and the generated theme bridge.
- `src/app/theme.css` is generated from the token files.
- `scripts/generate-tailwind-theme.mjs` creates the Tailwind CSS bridge.
- `AGENTS.md` is the active phase guide for future work.

## Validation

```bash
npm run lint
npm run build
```

## Deploy

This project is intended to deploy through a public GitHub repository connected to Vercel with default Next.js settings.

Production URL: https://code-sample-three.vercel.app
GitHub repo: https://github.com/mundizzle/code-sample
