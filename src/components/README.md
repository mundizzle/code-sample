# Components

## What this is

These are the visible dashboard building blocks: header, filters, metrics, charts, project list, and selected project detail. The folder is organized by what each component represents, not by a generic catch-all bucket.

## Why it exists

- Component ownership is easier to follow when the folder names match the UI.
- Stories sit beside reusable components so Storybook stays close to the implementation.
- Chart components own their option builders and tests, while ECharts itself stays in `src/lib`.
- The composed dashboard can stay focused on data flow and layout rather than component internals.

## How it works

- `chart-panel/` provides the reusable shell used around visible charts.
- `health-trend-chart/` and `risk-distribution-chart/` own their chart components, option builders, tests, and stories.
- `filters/`, `projects/`, and `selected-project/` handle interactive dashboard controls and detail views.
- Components use semantic `ad-*` Tailwind utilities generated from design tokens.
- Reusable components have component-level Storybook stories under `Components/...`.

## Example

```tsx
<section className="min-w-0 rounded-ad-md border border-ad-border bg-ad-surface p-5">
  <h2 className="text-lg font-semibold text-ad-text">{title}</h2>
  <p className="mt-2 text-sm leading-5 text-ad-text-muted">{description}</p>
  <div className="mt-3">{children}</div>
</section>
```

## Related

- [`../lib/README.md`](../lib/README.md)
- [`../model/README.md`](../model/README.md)
- [`../../.storybook/README.md`](../../.storybook/README.md)
