# Agency Delivery Dashboard Code Sample

## Project Goal

Build a clean Senior FED code sample that demonstrates a realistic agency delivery dashboard using Next.js, React, Tailwind, Figma-exported design tokens, responsive layout, complex state boundaries, charts, Storybook, and focused tests.

This repo should stay tidy and easy to explain. Prefer stock Next.js/Vercel conventions unless there is a clear reason to deviate.

## Current Phase

- [ ] Phase 0: Foundation + deploy preparation (current)
- [ ] Phase 1: Data model, fixtures, and pure utilities
- [ ] Phase 2: Providers, Zustand UI state, and TanStack Query data boundary
- [ ] Phase 3: Responsive dashboard layout and components
- [ ] Phase 4: ECharts integration
- [ ] Phase 5: Tests, Storybook, README polish, and final deploy

Update this checklist as phases are completed so future sessions can reorient quickly after context resets.

## Stack Guardrails

- Next.js App Router with `src/app`.
- React 19 and TypeScript.
- Tailwind v4 with CSS-first `@theme`.
- Figma Variables are the design source; exported token files live in `design-tokens/`.
- Generate Tailwind variables with `npm run generate-tailwind-theme`.
- Appearance follows `prefers-color-scheme`; do not add an in-app theme switcher.
- White labeling is a future brand axis, separate from light/dark appearance.
- Keep Server Components as the default; push `"use client"` as low as possible.
- Keep the default scaffold shape unless the sample needs a specific change.

## Required Agent Guidance

Before writing application code, use the relevant installed skills/guidance:

- `vercel:nextjs` for App Router, Next.js 16, Server/Client Component, and deployment conventions.
- `vercel:react-best-practices` after editing multiple TSX components.
- `vercel:vercel-cli` before Vercel linking, deployment, logs, or project settings work.
- If any skill is unavailable in a future session, use `find-skills` or inspect official docs before proceeding.

Also keep this Next.js warning active:

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run generate-tailwind-theme
npm run lint
npm run build
```

Future scripts to add when those phases land:

```bash
npm run test
npm run test:watch
npm run build-storybook
```

## Build Plan

### Phase 1: Data + Utilities

- Define typed fixtures for clients, projects, milestones, risks, weekly metrics, and team allocation.
- Add pure utilities first: filtering, sorting, health calculation, metric aggregation, risk summary, and chart-series builders.
- Prioritize unit tests for pure utilities.

### Phase 2: App Boundaries

- Add an app provider for TanStack Query and future client providers.
- Add Zustand for UI-only state: selected client, selected project, filters, date range, chart mode, and mobile panel state.
- Do not persist dashboard state unless there is a product reason.

### Phase 3: Responsive UI

- Build reusable UI primitives first: button, status badge, metric card, segmented control, empty state.
- Build dashboard components: header, filter rail, project list/table, project detail panel, risk summary, delivery chart.
- Implement mobile, tablet, and desktop layouts.
- Include one component-level container query example for `ProjectDetailPanel`.

### Phase 4: Charts

- Add ECharts through a client-only wrapper.
- Keep ECharts option builders pure and unit-tested.
- Include health trend, risk distribution, and budget-vs-timeline comparison.

### Phase 5: Documentation + Release

- Add Storybook stories for core components with light/dark appearance decorators.
- Add focused tests for utilities, Zustand actions, chart options, filters, selected project behavior, empty states, and OS-driven dark-mode styling.
- Polish README with stack choices, token workflow, responsive notes, test commands, Storybook commands, Vercel deploy notes, and next steps.
- Deploy through GitHub + Vercel and record the production URL only after it exists.

## Deployment Notes

- Public GitHub repo target: `code-sample`.
- Vercel deployment should be GitHub-backed, not CLI-only.
- Use default Vercel Next.js settings unless a concrete issue requires otherwise.
- Validate before deployment with `npm run lint` and `npm run build`.
