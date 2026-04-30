# Agency Delivery Dashboard Code Sample

## Project Goal

Build a clean Senior FED code sample that demonstrates a realistic agency delivery dashboard using Next.js, React, Tailwind, Figma-exported design tokens, responsive layout, complex state boundaries, charts, Storybook, and focused tests.

This repo should stay tidy and easy to explain. Prefer stock Next.js/Vercel conventions unless there is a clear reason to deviate.

## Current Phase

- [x] Phase 0: Foundation + deploy preparation
- [x] Phase 1: Data model, fixtures, and pure utilities
- [x] Phase 2: Providers, Zustand UI state, and TanStack Query data boundary
- [x] Phase 3: Responsive dashboard layout and components
- [x] Phase 4: ECharts integration
- [ ] Phase 4B: Figma/app convergence, component by component (current)
- [ ] Phase 5: Tests, Storybook, README polish, and final deploy

Update this checklist as phases are completed so future sessions can reorient quickly after context resets.

## Current Session Handoff

Last confirmed state:

- GitHub repo is public and pushed: https://github.com/mundizzle/code-sample
- Vercel production deployment is live: https://code-sample-three.vercel.app
- Vercel is connected to the GitHub repo; pushes to `main` trigger production deployments.
- The app now renders the first responsive dashboard UI on the home route.
- `PLAN.md` has been removed; `AGENTS.md` is the active operating guide.
- `CLAUDE.md` is only a compatibility pointer to `AGENTS.md`.
- `docs/design-to-dev-workflow.md` explains the Figma Variables to Tailwind token flow.
- Current app implementation is allowed to inform the Figma reference. For this interview code sample, the goal is a coherent design-to-dev story, not preserving the first Figma mockup at all costs.
- Phase 4B should converge Figma and the app around the path of least resistance: use the browser implementation as the practical visual baseline when it is more realistic than the original Figma placeholder, then update Figma to match with token-driven layers.
- Product-facing UI copy has been cleaned up. Do not add visible copy that explains the implementation, tooling, design tokens, Figma, ECharts, Zustand, or that this is a code sample.
- The latest attempt to write app-converged Figma frames through the Codex Figma connector failed with `UNAVAILABLE / Connection failed`. Figma REST/PAT read and image-render workflows have worked; use those for inspection, and retry the connector or a temporary plugin only when canvas editing is required.

Completed Phase 1:

- Phase 1A is complete: Vitest is installed, `npm run test` / `npm run test:watch` exist, and `src/features/dashboard/types.ts` defines the initial dashboard domain model.
- The first test is a domain contract test for client/project/dashboard data shape.
- Phase 1B is complete: `src/features/dashboard/data/fixtures.ts` contains Figma-aligned dashboard fixtures, and `src/features/dashboard/utils/dashboard-utils.ts` contains tested pure utilities for filtering, sorting, health scoring, KPI aggregation, risk summary, and health-trend series.
- Phase 2 is complete: TanStack Query and Zustand are installed, `src/app/providers.tsx` wires client providers below the root layout, `src/features/dashboard/data/dashboard-query.ts` owns fixture-backed dashboard query options, and `src/features/dashboard/state/dashboard-store.ts` owns UI-only dashboard state through a per-instance Zustand vanilla store.
- Phase 3 is complete: `src/app/page.tsx` renders `DashboardView`, with responsive KPI cards, semantic filter controls, chart placeholders, a project list, selected-project detail, and a `ProjectDetailPanel` container query example. Component tests use React Testing Library, jsdom, and user-event.
- Phase 4 is complete: ECharts is installed, `src/features/dashboard/charts/chart-options.ts` contains tested pure option builders, `src/features/dashboard/components/e-chart.tsx` owns browser-only chart lifecycle, and the dashboard currently renders health trend and risk distribution charts with accessible chart labels. The budget-vs-timeline option builder remains tested but is not visible in the current product UI.

Next commit cycle:

- Phase 4B: converge the Figma reference and implemented dashboard around the running app.
- Continue TDD for app code changes, but prefer screenshot-based Figma updates for the design reference when no product behavior is changing.
- Immediate next step after compaction: create a Figma page named `App Viewports` that contains only three frames, left to right: `Mobile / 390`, `Tablet / 768`, and `Desktop / 1440`.
- Use current browser screenshots as the Figma source for those three frames. Do not recreate token boards, component inventory, implementation notes, or design-system meta panels in this Figma pass.

## Figma / App Visual Contract

Use Figma REST inspection before changing UI, but do not treat the old Figma layout as immutable. This project is a demonstration artifact. If the running app uses a more realistic or lower-effort implementation pattern, update Figma to match the app rather than over-customizing code to preserve a placeholder mockup.

Read-only Figma inspection command:

```bash
TOKEN=$(security find-generic-password -a "$USER" -s codex-figma-pat -w 2>/dev/null)
curl -sS -H "X-Figma-Token: $TOKEN" \
  "https://api.figma.com/v1/files/tIvu2Q2HhCLDTNmpnVr5FC/nodes?ids=16:3&depth=4"
```

Do not print the token. If network is blocked, request escalation for the read-only Figma API call.

Earlier desktop frame values from the 2026-04-29 Figma REST check:

- Frame: `Desktop / 1440`, `1440 x 1020`.
- Page padding: `28px`.
- Header: eyebrow `x=28 y=28`, title `x=28 y=52`, copy `x=28 y=104 w=620 h=36`.
- Main content starts at `y=174`.
- Client filter rail: `x=28 y=174 w=220 h=710`.
- KPI cards: four cards at `y=174`, each `250 x 116`, with `22px` horizontal gaps.
- KPI card x positions: `280`, `552`, `824`, `1096`.
- Health chart: `x=280 y=326 w=520 h=280`.
- Risk chart: `x=824 y=326 w=250 h=280`.
- Selected project panel: `x=1096 y=326 w=316 h=560`.
- Project table rows: three rows at `x=280`, width `794`, height `64`, y positions `642`, `718`, `794`.

Tablet frame values:

- Frame: `Tablet / 768`, `768 x 1120`.
- Page padding: `28px`.
- KPI cards: four cards at `y=174`, each `164 x 116`.
- Filter chips at `y=322`.
- Health chart: `x=25 y=374 w=448 h=270`.
- Risk chart: `x=504 y=374 w=236 h=270`.
- Project cards: `344 x 146`.
- Detail panel: `340 x 310`.

Mobile frame values:

- Frame: `Mobile / 390`, `390 x 1500`.
- Page padding: `28px`.
- KPI cards stack, each `334 x 116`.
- Filter chips at `y=698`.
- Health chart: `334 x 230`.
- Risk chart: `334 x 230`.
- Project card: `334 x 146`.

## Phase 4B Figma/App Convergence Workflow

The Figma deliverable for this phase is intentionally simple: one page named `App Viewports` with the app represented at three viewport widths. This is a hiring-code-sample reference, not a full design-system file.

Figma target:

- `Mobile / 390` on the left.
- `Tablet / 768` to the right of mobile.
- `Desktop / 1440` to the right of tablet.
- Each frame should show the current app as rendered in the browser at that viewport width.
- Keep labels/frame names minimal. Do not include token boards, component inventories, implementation notes, or meta explanations.

Workflow:

1. Capture current app screenshots at exact viewport widths: `390`, `768`, and `1440`.
2. Prefer screenshots of the running app over hand-drawn Figma reconstruction so Figma and implementation cannot drift.
3. Use a temporary Figma plugin/import route only for canvas editing, then delete the temporary plugin files after the import succeeds.
4. Render or visually inspect the resulting Figma page and compare it against the browser screenshots.
5. Pause for user review before marking Phase 4B complete.

If app code changes during this phase:

- Continue TDD for behavior changes.
- Keep mobile-first responsive, semantic HTML, accessible interactions, and semantic `ad-*` Tailwind token usage.
- Re-capture affected viewport screenshots before updating Figma.

Final Phase 4B verification:

- Run `npm run test`, `npm run lint`, and `npm run build`.
- Check that no temporary Figma/plugin files remain in the repo.
- Confirm Figma shows only the three agreed app viewport frames.
- Only then mark Phase 4B complete and proceed to Storybook/README work.

## Drift Prevention Rules

- Do not take a whole-page implementation pass when visual parity is the goal.
- Do not add product features just because the data/model supports them.
- Do not let the Figma mockup force expensive custom code when a library-native implementation is good enough for the code sample.
- Do not rely on code inspection alone for visual parity. Use browser screenshots and Figma render screenshots as the check.
- Do not call a phase complete until browser output has been compared to the current Figma frame after deciding which side should move.
- If Figma and app disagree, stop and report the difference before continuing, then choose the path of least resistance.
- If Figma REST is unavailable, say so and ask whether to use the latest screenshot as a temporary source.
- Prioritize a concise, explainable code sample over speculative production polish.

## Stack Guardrails

- Next.js App Router with `src/app`.
- React 19 and TypeScript.
- Tailwind v4 with CSS-first `@theme`.
- Figma Variables are the design source; exported token files live in `design-tokens/`.
- Generate Tailwind variables with `npm run generate-tailwind-theme`.
- Prefer Tailwind utilities backed by semantic `ad-*` tokens for colors, radii, and spacing wherever those tokens exist.
- Use raw Tailwind values only for structural layout, responsive breakpoints, one-off grid tracks, or values not yet represented in the token set.
- Appearance follows `prefers-color-scheme`; do not add an in-app theme switcher.
- White labeling is a future brand axis, separate from light/dark appearance.
- Keep Server Components as the default; push `"use client"` as low as possible.
- Keep the default scaffold shape unless the sample needs a specific change.
- Use mobile-first responsive classes and semantic, accessible HTML by default; this is part of the code sample's front-end fundamentals story.
- Before each data or UI phase, inspect the current Figma file so implementation follows the live design rather than stale notes.

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
- `responsive-design` before responsive layout work.
- `tailwind-design-system` before Tailwind component styling or token work.
- `tanstack-query-best-practices` before query/data-boundary changes.
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

Available after Phase 1A:

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
