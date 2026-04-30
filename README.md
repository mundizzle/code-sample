# Agency Delivery Dashboard Code Sample

A focused Next.js code sample for a senior front-end role. The app presents a responsive agency delivery dashboard with fixture-backed data, client-side UI state, ECharts visualizations, semantic Tailwind tokens, and a Figma-to-code token workflow.

Figma reference: https://www.figma.com/design/tIvu2Q2HhCLDTNmpnVr5FC/Code-Sample?node-id=16-3

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS v4
- Figma-exported design tokens
- Zustand for UI-only dashboard state
- TanStack Query for the dashboard data boundary
- ECharts for browser-rendered charts
- Vitest and React Testing Library
- Storybook for component documentation
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

- `src/app/globals.css` imports Tailwind and the generated theme bridge.
- `src/app/theme.css` is generated from the token files.
- `scripts/generate-tailwind-theme.mjs` creates the Tailwind CSS bridge.
- `src/features/dashboard/` contains the domain model, fixtures, utilities, store, query boundary, chart option builders, dashboard UI, tests, and Storybook story.
- `AGENTS.md` is the active phase guide for future work.

## Validation

```bash
npm run test
npm run lint
npm run build
npm run build-storybook
```

Run Storybook locally with:

```bash
npm run storybook
```

## Deploy

This project is intended to deploy through a public GitHub repository connected to Vercel with default Next.js settings.

Production URL: https://code-sample-three.vercel.app
GitHub repo: https://github.com/mundizzle/code-sample
