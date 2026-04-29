# Step-By-Step Build Guide

## 1. Scaffold The App
Create the project in `/Users/mundizzle/Projects/code_sample`.

```bash
npx create-next-app@latest . --yes --force --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
npm install zustand @tanstack/react-query echarts echarts-for-react
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm create storybook@latest
```

Choose Storybook’s **Next.js Vite** option if prompted.

## 2. Establish The Architecture
Create these main areas:

```txt
src/app/
src/components/ui/
src/features/dashboard/
src/features/dashboard/components/
src/features/dashboard/data/
src/features/dashboard/store/
src/features/dashboard/utils/
src/features/dashboard/charts/
src/lib/
```

Use this division:
- `app/`: page shell, metadata, providers.
- `components/ui/`: generic reusable components.
- `features/dashboard/`: app-specific dashboard logic.
- `data/`: typed fixtures and mock API adapter.
- `store/`: Zustand UI/theme state.
- `utils/`: pure transforms and risk scoring.
- `charts/`: ECharts option builders and wrapper.

## 3. Define The Product Model
Create typed fixture data for:
- Clients
- Projects
- Milestones
- Delivery risks
- Weekly metrics
- Team allocation

Minimum fields:
- Project: `id`, `clientId`, `name`, `status`, `health`, `budgetUsed`, `timelineProgress`, `launchDate`, `owner`
- Risk: `severity`, `category`, `summary`, `mitigation`
- Metrics: weekly throughput, defects, velocity, satisfaction, accessibility score

## 4. Build The Token System
Treat Figma Variables as the design source of truth, then export those semantic names into repo token files:

```bash
design-tokens/light.tokens.json
design-tokens/dark.tokens.json
```

Generate Tailwind theme primitives from those token files:

```bash
npm run generate-tailwind-theme
```

Use semantic variables for:
- Background, surface, elevated surface
- Text, muted text
- Border
- Accent
- Success, warning, danger
- Chart series colors

Support OS-driven appearance with `prefers-color-scheme`; do not add an in-app theme switcher.

Keep the implementation flow aligned with `docs/design-to-dev-workflow.md`.

## 5. Add Providers
Create an app provider component for:
- TanStack Query `QueryClientProvider`
- Any future app-level client providers

Keep server components as the default, then mark only interactive dashboard parts with `"use client"`.

## 6. Add Zustand State
Store:
- Selected client
- Selected project
- Status filters
- Health filters
- Date range
- Chart mode
- Mobile panel state

Include actions:
- `toggleStatus`
- `selectProject`
- `resetFilters`

Do not persist dashboard filter or selection state unless there is a product reason.

## 7. Add TanStack Query
Use it for the mock data boundary:
- `useDashboardData`
- loading state
- error state
- cached project/client data

Even if data is local, this demonstrates real async architecture.

## 8. Build Pure Utilities
Write these before heavy UI:
- `filterProjects`
- `sortProjects`
- `calculateProjectHealth`
- `aggregateMetrics`
- `buildRiskSummary`
- `buildChartSeries`

These become your easiest unit tests and strongest architecture talking point.

## 9. Build UI Components
Start generic:
- `Button`
- `StatusBadge`
- `MetricCard`
- `SegmentedControl`
- `EmptyState`

Then dashboard-specific:
- `DashboardHeader`
- `FilterRail`
- `ProjectList`
- `ProjectDetailPanel`
- `RiskSummary`
- `DeliveryChart`

## 10. Responsive Layout
Implement three layouts:
- Mobile: summary cards, sticky filters, project cards, tabbed chart/detail.
- Tablet: two-column project list plus chart/detail.
- Desktop: filter rail, main project table, chart area, right insight panel.

Document the breakpoint behavior in the README.

## 11. Add ECharts
Create a client-only chart wrapper.

Charts to include:
- Delivery health trend
- Risk distribution
- Budget vs timeline comparison

Keep chart options generated from pure functions so they are testable.

## 12. Add Storybook
Document only the core pieces:
- `MetricCard`
- `StatusBadge`
- `ProjectCard`
- `FilterRail`
- `EmptyState`
- `DeliveryChart`

Add decorators for light and dark appearance.

## 13. Add Tests
Prioritize:
- Utility tests
- Zustand action tests
- Chart option builder tests
- Component tests for filter behavior, selected project, empty state, and OS-driven dark-mode styling

Scripts:

```json
"test": "vitest",
"test:watch": "vitest --watch",
"build-storybook": "storybook build"
```

## 14. Write The README
Include:
- What the sample demonstrates
- Stack choices
- Why Zustand plus TanStack Query
- Token/theming model
- Responsive design notes
- Testing commands
- Storybook commands
- Vercel deploy notes
- What you would add next

## 15. Final Validation
Run:

```bash
npm run lint
npm run test
npm run build
npm run build-storybook
```

Then deploy to Vercel and send Courtney:
- Vercel URL
- GitHub repo URL
- Short note explaining this is a fresh representative sample
