# Data

## What this is

This folder owns the dashboard data boundary. The app fetches fixture-backed data through TanStack Query, and Storybook gets matching data through MSW handlers.

## Why it exists

- The UI behaves like it is calling an application boundary without adding real backend scope.
- TanStack Query owns server/data state, caching defaults, and request errors.
- MSW keeps Storybook stories realistic without coupling them to a running Next.js route.
- Fixtures stay deterministic so tests and screenshots have a stable baseline.

## How it works

- `query/dashboard-query.ts` defines the fetcher, query keys, query options, and query client defaults.
- `mocks/mock-handlers.ts` serves dashboard data to Storybook.
- The app route in `src/app/api/dashboard` returns the same shape used by the query layer.
- Dashboard UI state remains in `src/state`, not in this folder.

## Example

```ts
export function dashboardDataQueryOptions() {
  return queryOptions({
    queryKey: dashboardKeys.data(),
    queryFn: getDashboardData,
    staleTime: 60_000,
  });
}
```

## Related

- [`../app/README.md`](../app/README.md)
- [`../state/README.md`](../state/README.md)
- [`../model/README.md`](../model/README.md)
