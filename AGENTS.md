# Agency Delivery Dashboard Code Sample

## Project Goal

Build a clean Senior FED code sample that demonstrates a realistic agency delivery dashboard using Next.js, React, Tailwind, Figma-exported design tokens, responsive layout, complex state boundaries, charts, Storybook, and focused tests.

This repo should stay tidy and easy to explain. Prefer stock Next.js/Vercel conventions unless there is a clear reason to deviate.

## Current Phase

- [x] Phase 0: Foundation + deploy preparation
- [ ] Phase 1: Data model, fixtures, and pure utilities (current)
- [ ] Phase 2: Providers, Zustand UI state, and TanStack Query data boundary
- [ ] Phase 3: Responsive dashboard layout and components
- [ ] Phase 4: ECharts integration
- [ ] Phase 5: Tests, Storybook, README polish, and final deploy

Update this checklist as phases are completed so future sessions can reorient quickly after context resets.

## Current Session Handoff

Last confirmed state:

- GitHub repo is public and pushed: https://github.com/mundizzle/code-sample
- Vercel production deployment is live: https://code-sample-three.vercel.app
- Vercel is connected to the GitHub repo; pushes to `main` trigger production deployments.
- The app intentionally still shows the default Next.js scaffold page.
- `PLAN.md` has been removed; `AGENTS.md` is the active operating guide.
- `CLAUDE.md` is only a compatibility pointer to `AGENTS.md`.
- `docs/design-to-dev-workflow.md` explains the Figma Variables to Tailwind token flow.

Next commit cycle:

- Phase 1A is complete: Vitest is installed, `npm run test` / `npm run test:watch` exist, and `src/features/dashboard/types.ts` defines the initial dashboard domain model.
- The first test is a domain contract test for client/project/dashboard data shape.
- Next: move into Phase 1B fixtures and utility TDD.

Phase 1B:

- TDD the pure utilities one behavior at a time: write a failing test, implement the smallest useful function, then refactor if needed.
- Start with `filterProjects`, then `sortProjects`, `calculateProjectHealth`, `aggregateDashboardMetrics`, `buildRiskSummary`, and `buildHealthTrendSeries`.
- Do not start the dashboard UI until the typed fixtures and utility tests are in place.

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

## TDD Guardrails

- Follow TDD through every phase, not only Phase 1 utilities.
- For each behavior, write or update the failing test first, implement the smallest useful change, then refactor while keeping tests green.
- Prefer behavior tests over snapshot-heavy coverage. Use type/domain contract tests where runtime behavior is not yet meaningful.
- For UI phases, add focused component or interaction tests before implementing the component behavior; Storybook stories complement tests but do not replace them.
- For charts and data boundaries, keep option builders, selectors, and state transitions testable as pure functions wherever possible.
- Every phase checkpoint should run `npm run test`, `npm run lint`, and `npm run build` before being considered complete.

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

Add these during Phase 1A:

```bash
npm run test
npm run test:watch
```

Future script to add when Storybook lands:

```bash
npm run build-storybook
```

## Build Plan

### Phase 1: Data + Utilities

- Phase 1A: install/configure Vitest, add test scripts, define dashboard domain types.
- Phase 1B: add fixtures and TDD pure utilities before UI.
- Define typed fixtures for clients, projects, milestones, risks, weekly metrics, and team allocation.
- Add pure utilities first: filtering, sorting, health calculation, metric aggregation, risk summary, and chart-series builders.
- Prioritize unit tests for pure utilities.

### Phase 2: App Boundaries

- Add an app provider for TanStack Query and future client providers.
- Add Zustand for UI-only state: selected client, selected project, filters, date range, chart mode, and mobile panel state.
- Do not persist dashboard state unless there is a product reason.
- TDD provider wiring and store actions before using them in the dashboard UI.

### Phase 3: Responsive UI

- Build reusable UI primitives first: button, status badge, metric card, segmented control, empty state.
- Build dashboard components: header, filter rail, project list/table, project detail panel, risk summary, delivery chart.
- Implement mobile, tablet, and desktop layouts.
- Include one component-level container query example for `ProjectDetailPanel`.
- TDD key component states and interactions before styling refinements.

### Phase 4: Charts

- Add ECharts through a client-only wrapper.
- Keep ECharts option builders pure and unit-tested.
- Include health trend, risk distribution, and budget-vs-timeline comparison.
- TDD chart option builders before wiring ECharts rendering.

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
- GitHub repo: https://github.com/mundizzle/code-sample
- Production URL: https://code-sample-three.vercel.app
