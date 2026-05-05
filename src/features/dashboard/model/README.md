# Model

This folder contains the dashboard domain model and pure logic: types, labels, formatters, filtering, sorting, aggregation, risk summaries, and health trend series.

Use this directory for code that should be understandable and testable without React. Components, charts, API handlers, and stories can call into this layer instead of reimplementing dashboard rules.

- `types.ts` defines the dashboard data contract.
- `dashboard-utils.ts` turns raw dashboard data into filtered views, KPI values, risk summaries, and chart-ready series.
- `labels.ts` and `formatters.ts` keep UI wording and display formatting centralized.
- Keep functions pure where practical and test them directly.
- Do not import React components, Zustand stores, or browser-only libraries here.

## Standards

- Prefer functions that take explicit inputs and return derived values without mutating the caller's data.
- Prefer centralized labels and formatters when the same wording or display shape appears in more than one component.
- Prefer tests that describe business behavior: filtered project sets, KPI calculations, risk summaries, and chart-ready series.
- Avoid reaching into Zustand, React Query, browser APIs, or fixture files from deep inside model helpers.
