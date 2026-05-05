# Components

These are the visible dashboard building blocks: header, filters, metrics, charts, project list, and selected project detail. The folder is organized by what each component represents, not by a generic catch-all bucket.

Use this directory for UI components that render dashboard experience. Keep data fetching in `../data`, domain logic in `../model`, and chart runtime wiring in `src/lib`.

- `chart-panel/` provides the reusable shell used around visible charts.
- `health-trend-chart/` and `risk-distribution-chart/` own their chart components, option builders, tests, and stories.
- `filters/`, `project-list/`, `project-detail-panel/`, and `status-badge/` handle interactive dashboard controls and detail views.
- Use semantic `ad-*` Tailwind utilities generated from design tokens instead of raw color, radius, or spacing values.
- Keep component-level Storybook stories beside reusable components under `Components/...`.
- Keep chart option builders pure and covered by tests in the chart component folder.

## Standards

- Prefer folders that match the exported component name: `project-list/project-list.tsx`, not a broad `projects/` bucket for unrelated pieces.
- Prefer accessible structure that names sections with visible headings or clear labels.
- Prefer components that receive display-ready data and callbacks; filtering, aggregation, and formatting rules should come from `../model`.
- Prefer semantic token utilities such as `bg-ad-surface`, `text-ad-text`, and `rounded-ad-md`.
- Avoid raw hex values, one-off arbitrary radii, hidden implementation notes in product UI, and components that fetch their own dashboard data.
