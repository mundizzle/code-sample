# Model

This folder contains the dashboard domain model and pure logic: types, labels, formatters, filtering, sorting, aggregation, risk summaries, and health trend series.

Use this directory for code that should be understandable and testable without React. Components, charts, API handlers, and stories can call into this layer instead of reimplementing dashboard rules.

- `types.ts` defines the dashboard data contract.
- `dashboard-utils.ts` turns raw dashboard data into filtered views, KPI values, risk summaries, and chart-ready series.
- `labels.ts` and `formatters.ts` keep UI wording and display formatting centralized.
- Keep functions pure where practical and test them directly.
- Do not import React components, Zustand stores, or browser-only libraries here.

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
