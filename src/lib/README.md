# Lib

## What this is

This folder is for internal implementation adapters that support the app but are not visible product components. Right now that means the ECharts bridge.

## Why it exists

- Browser-only libraries should not leak through the component tree.
- ECharts setup, resize behavior, and token palette reading are infrastructure concerns.
- Chart option builders stay pure and testable in component folders.
- Keeping the adapter small makes the charting decision easy to inspect.

## How it works

- `echarts/e-chart.tsx` registers only the ECharts modules the dashboard uses.
- `echarts/use-chart-palette.ts` reads CSS custom properties from the active theme.
- `echarts/chart-palette.ts` provides the shared palette type and fallback values.
- Visible chart components pass pure options into the adapter.

## Example

```ts
const cssVariableNames = {
  text: "--ad-color-text",
  textMuted: "--ad-color-text-muted",
  border: "--ad-color-border",
  surfaceElevated: "--ad-color-surface-elevated",
  series: [
    "--ad-chart-series-1",
    "--ad-chart-series-2",
    "--ad-chart-series-3",
    "--ad-chart-series-4",
  ],
} as const;
```

## Related

- [`../components/README.md`](../components/README.md)
- [`../design-system/README.md`](../design-system/README.md)
- [`../../design-tokens/README.md`](../../design-tokens/README.md)
