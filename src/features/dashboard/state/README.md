# State

This folder owns local dashboard UI state through a per-instance Zustand vanilla store. It handles selections, filters, date range, chart mode, and mobile detail panel state.

Use this directory for UI-only state. Server/data state belongs in TanStack Query, and domain calculations belong in `../model`.

- `dashboard-store.ts` defines state, actions, defaults, and store creation.
- `dashboard-store-provider.tsx` exposes the store to React components.
- `src/app/page.tsx` mounts the provider for the dashboard route and passes initial state derived from `?client=` search params.
- Components select only the state/actions they need.
- Keep the store per-instance so React tests and Storybook do not share module-level state.
- Store actions should copy caller-owned arrays and objects before saving them.
- Test state transitions without rendering the full dashboard when possible.

## Standards

- Prefer small actions that describe user intent, such as toggling a filter or selecting a project.
- Prefer copying arrays and objects before storing them so callers cannot mutate state after the fact.
- Prefer selectors that read only the state a component needs.
- Prefer route-local provider mounting when UI state needs request-derived initial values.
- Avoid storing fetched dashboard data, derived KPI values, or business calculations here.
