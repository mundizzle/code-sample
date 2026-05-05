# Components

These are the visible dashboard building blocks: header, filters, metrics, charts, project list, and selected project detail. The folder is organized by what each component represents, not by a generic catch-all bucket.

Use this directory for UI components that render dashboard experience. Keep data fetching in the app/data layer, domain logic in `src/model`, and chart runtime wiring in `src/lib`.

- `chart-panel/` provides the reusable shell used around visible charts.
- `health-trend-chart/` and `risk-distribution-chart/` own their chart components, option builders, tests, and stories.
- `filters/`, `projects/`, and `selected-project/` handle interactive dashboard controls and detail views.
- Use semantic `ad-*` Tailwind utilities generated from design tokens instead of raw color, radius, or spacing values.
- Keep component-level Storybook stories beside reusable components under `Components/...`.
- Keep chart option builders pure and covered by tests in the chart component folder.

## Example

```tsx
<section className="min-w-0 rounded-ad-md border border-ad-border bg-ad-surface p-5">
  <h2 className="text-lg font-semibold text-ad-text">{title}</h2>
  <p className="mt-2 text-sm leading-5 text-ad-text-muted">{description}</p>
  <div className="mt-3">{children}</div>
</section>
```
