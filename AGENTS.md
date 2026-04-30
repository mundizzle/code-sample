# Agency Delivery Dashboard Code Sample

## Purpose

This repository is a Senior FED code sample for a realistic agency delivery dashboard. It is meant to demonstrate a complete design-to-dev workflow, not a production SaaS product:

- Figma Variables exported into token JSON.
- Generated Tailwind v4 theme variables.
- A responsive Next.js App Router dashboard.
- Clear React component boundaries.
- Zustand for UI-only state.
- TanStack Query for the dashboard data boundary.
- ECharts with pure, tested option builders.
- Storybook for component and token documentation.
- Focused Vitest and React Testing Library coverage.
- GitHub-backed Vercel deployment.

Keep the repo concise, conventional, and easy to explain in an interview.

## Live Surfaces

- GitHub: https://github.com/mundizzle/code-sample
- App: https://code-sample-three.vercel.app
- Storybook: https://code-sample-three.vercel.app/storybook
- Figma reference: https://www.figma.com/design/tIvu2Q2HhCLDTNmpnVr5FC/Code-Sample?node-id=16-3

Pushes to `main` trigger Vercel production deployments.

## Repo Map

- `src/app/` - Next.js App Router shell, providers, global CSS, generated theme import.
- `design-tokens/` - Figma-style token exports for light and dark appearance.
- `scripts/generate-tailwind-theme.mjs` - Converts token JSON into `src/app/theme.css`.
- `scripts/build-storybook-public.mjs` - Builds static Storybook into `public/storybook` for Vercel.
- `src/features/dashboard/types.ts` - Dashboard domain model.
- `src/features/dashboard/data/` - Fixture-backed data boundary and TanStack Query options.
- `src/features/dashboard/state/` - Per-instance Zustand vanilla store and provider.
- `src/features/dashboard/utils/` - Pure dashboard calculations and filtering utilities.
- `src/features/dashboard/charts/` - ECharts palette hooks and pure option builders.
- `src/features/dashboard/components/` - Self-contained React components and stories.
- `src/features/dashboard/foundations/` - Storybook token documentation.
- `README.md` - Public-facing project explanation and workflow narrative.

## Architecture Conventions

- Keep Server Components as the default in `src/app`; push `"use client"` down to the smallest interactive boundary.
- Keep `DashboardView` as the composition layer. It may query data, read/write dashboard UI state, build chart options, and compose sections, but presentational UI belongs in focused component files.
- Prefer named exports from component modules.
- Keep component prop types colocated with the component. Export prop types only when Storybook or another component needs them.
- Avoid barrel files for this small feature; direct imports keep the code easy to trace.
- Keep data fixtures deterministic. This repo is a demo, so no live API or persistence should be added without an explicit reason.
- Keep TanStack Query responsible for server/data state and Zustand responsible for UI-only state.
- Store actions should copy caller-owned arrays and objects before saving them.
- Keep chart option builders pure and unit-tested. `EChart` owns browser-only chart lifecycle.

## Design And Styling Conventions

- Figma Variables are the design source; token JSON files are the handoff artifact used by the app.
- Run `npm run generate-tailwind-theme` after token changes.
- Prefer semantic Tailwind utilities backed by `ad-*` theme tokens, such as `bg-ad-bg`, `bg-ad-surface`, `text-ad-text`, `border-ad-border`, `rounded-ad-md`, and chart token colors.
- Use raw Tailwind values only for structural layout, responsive behavior, one-off grid tracks, or values not represented in the token set.
- Appearance follows `prefers-color-scheme`; do not add an in-app theme switcher.
- Brand or white-label theming is a future token axis, separate from light/dark appearance.
- Keep product UI free of meta commentary. The app should not explain that it uses Figma, ECharts, Zustand, Storybook, tokens, or that it is a code sample.
- Use semantic HTML and accessible controls first: real buttons, headings, landmarks, labels, `aria-pressed` for toggle chips, and useful chart `aria-label` values.
- Build mobile-first. Verify phone, tablet, and desktop widths before considering layout work complete.
- Preserve the container-query example in `ProjectDetailPanel`.

## Component And Storybook Conventions

- Every reusable dashboard component should have its own Storybook story under `Dashboard/Components/...`.
- Keep `Dashboard View` as the composed reference story, not the only documentation surface.
- Expose Storybook controls where props are meaningful: labels, values, deltas, statuses, selected project, empty states, and option-like component states.
- Token stories should use the installed token documentation addon rather than custom token boards.
- `npm run build` builds static Storybook into `public/storybook` so Vercel serves `/storybook`. Do not commit generated `public/storybook`.

## Testing Conventions

- Use TDD for behavior changes when practical: failing test first, smallest implementation, then refactor.
- Prefer behavior tests over snapshots.
- Keep pure utility, store, query, and chart option coverage focused and readable.
- UI tests should cover important user-visible behavior: filtering, selected project updates, accessible labels, empty states, and responsive class expectations where relevant.
- Storybook complements tests; it does not replace them.

## Commands

```bash
npm run generate-tailwind-theme
npm run test
npm run lint
npm run build
```

Storybook:

```bash
npm run storybook
npm run build-storybook
npm run build-storybook:public
```

Final validation before pushing or deploying:

```bash
npm run test
npm run lint
npm run build
```

## Deployment

- Vercel deployment is GitHub-backed.
- Use default Vercel Next.js settings unless a concrete issue requires otherwise.
- `npm run build` runs `prebuild`, which regenerates theme CSS and builds Storybook into `public/storybook` before `next build`.
- `public/storybook`, `.tmp-storybook-public`, `storybook-static`, `.next`, and local tool folders must remain uncommitted.
- After pushing `main`, verify both:
  - https://code-sample-three.vercel.app
  - https://code-sample-three.vercel.app/storybook

## Agent Guidance

Use relevant installed skills before code changes:

- `vercel:nextjs` for App Router, Server/Client Component, and Vercel deployment conventions.
- `vercel:react-best-practices` after editing multiple TSX components.
- `vercel:vercel-cli` before Vercel linking, deployment, logs, or project settings work.
- `responsive-design` before responsive layout work.
- `tailwind-design-system` before token or Tailwind system work.
- `tanstack-query-best-practices` before query/data-boundary changes.

If a skill is unavailable, use `find-skills` or inspect official docs before proceeding.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Extension Checklist

Before changing the repo, ask whether the change strengthens the demonstration. Prefer small, explainable improvements over speculative production polish.

When extending the dashboard:

- Add or update tests for behavior.
- Keep components self-contained.
- Keep tokens flowing through `design-tokens/` and generated `theme.css`.
- Keep visible UI aligned with the Figma reference or update the Figma reference intentionally.
- Keep Storybook stories aligned with real app components.
- Run `npm run test`, `npm run lint`, and `npm run build`.

## Known Non-Goals

- No real backend.
- No authentication.
- No user persistence.
- No in-app theme switcher.
- No separate job-search tracker or operational workflow inside this repo.
- No generated build artifacts committed to Git.
