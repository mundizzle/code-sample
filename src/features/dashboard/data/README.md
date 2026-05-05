# Data

This folder owns the dashboard data boundary. The app fetches fixture-backed data through TanStack Query, and Storybook gets matching data through MSW handlers.

Use this directory for client-side data access patterns and mocks. The goal is to make the dashboard behave like it has an application boundary without adding real backend, auth, or persistence scope.

- `query/dashboard-query.ts` defines the fetcher, query keys, query options, and query client defaults.
- `mocks/mock-handlers.ts` serves dashboard data to Storybook.
- The app route in `src/app/api/dashboard` returns the same shape used by the query layer.
- Keep fixture data deterministic so tests, Storybook, and screenshots have a stable baseline.
- Keep dashboard UI state in `../state`, not in this folder.

## Standards

- Prefer query option helpers and stable query keys over ad hoc `useQuery` configuration scattered through components.
- Prefer MSW handlers that return the same shape as the Next.js route.
- Prefer deterministic fixtures over randomized data, dates, or timers.
- Avoid adding real backend concerns here: auth, persistence, mutations, or environment-specific API clients.
