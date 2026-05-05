# Model

## What this is

This folder contains the dashboard domain model and pure logic: types, labels, formatters, filtering, sorting, aggregation, risk summaries, and health trend series.

## Why it exists

- Business logic is easier to trust when it is not buried inside React components.
- Pure functions are cheap to test and safe to reuse across the app, charts, and stories.
- Types make the fixture-backed API contract explicit.
- Labels and formatters keep display language consistent.

## How it works

- `types.ts` defines the dashboard data contract.
- `dashboard-utils.ts` turns raw dashboard data into filtered views, KPI values, risk summaries, and chart-ready series.
- `labels.ts` and `formatters.ts` keep UI wording and display formatting centralized.
- Tests cover the pure behavior without rendering the app.

## Example

```ts
const results = filterProjects(dashboardData.projects, {
  clientIds: ["client-civicworks"],
  statuses: ["launching"],
  healthStatuses: ["watch"],
  search: "resident",
});

expect(results.map((project) => project.name)).toEqual([
  "Resident Services Hub",
]);
```

## Related

- [`../data/README.md`](../data/README.md)
- [`../components/README.md`](../components/README.md)
- [`../state/README.md`](../state/README.md)
