# Data

This folder owns the dashboard data boundary. The app reads fixture-backed data through TanStack Query, and Storybook gets matching data through MSW handlers.

Use this directory for data access patterns and mocks. The goal is to make the dashboard behave like it has an application boundary without adding real backend, auth, or persistence scope.

- `query/dashboard-query.ts` defines the fetcher, query keys, query options, and query client defaults.
- `getDashboardData()` reads deterministic fixture data directly during server rendering and fetches `/api/dashboard` in the browser. This keeps `useSuspenseQuery` compatible with production SSR while preserving the mock API boundary for client behavior.
- `mocks/mock-handlers.ts` serves dashboard data to Storybook.
- The app route in `src/app/api/dashboard` returns the same shape used by the query layer.
- Keep fixture data deterministic so tests, Storybook, and screenshots have a stable baseline.
- Keep dashboard UI state in `../state`, not in this folder.

## Standards

- Prefer query option helpers and stable query keys over ad hoc query configuration scattered through components.
- Prefer Suspense-aware query usage through the dashboard boundary rather than local loading/error branches in the composed dashboard view.
- Prefer MSW handlers that return the same shape as the Next.js route.
- Prefer deterministic fixtures over randomized data, dates, or timers.
- Avoid adding real backend concerns here: auth, persistence, mutations, or environment-specific API clients.
