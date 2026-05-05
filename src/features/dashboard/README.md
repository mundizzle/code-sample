# Dashboard Feature

This folder owns the dashboard experience: the composed view, dashboard-specific components, data access, UI state, domain model, stories, and tests.

Use this feature boundary for code that is specific to the agency delivery dashboard. Keep `src/app` focused on Next.js route files and provider wiring, and keep generic adapters such as ECharts runtime setup in `src/lib`.

- `dashboard.tsx` composes the dashboard view.
- `dashboard-boundary.tsx`, `dashboard-error-boundary.tsx`, `dashboard-loading.tsx`, and `dashboard-error.tsx` own the explicit Suspense and retry surface for TanStack Query.
- `components/` contains dashboard UI building blocks and their stories.
- `data/` contains fixture-backed query helpers, mock data, and Storybook MSW handlers.
- `model/` contains the shared dashboard types, labels, formatters, and pure domain utilities.
- `state/` contains UI-only Zustand state for dashboard interactions.

## Standards

- Prefer importing feature internals through `@/features/dashboard/...` from outside this folder.
- Prefer relative imports inside the feature when files are close together.
- Prefer explicit dashboard boundaries over relying on route-level `loading.tsx` or `error.tsx`; the dashboard must render consistently in the app, Storybook, and tests.
- Prefer keeping the Next.js API route thin: route handlers should expose feature data or behavior, not own dashboard domain logic.
- Avoid moving reusable infrastructure into the feature unless it is truly dashboard-specific.
