# Lib

This folder is for internal implementation adapters that support the app but are not visible product components. Right now that means the ECharts bridge.

Use this directory for small infrastructure adapters that keep browser-only or third-party library details away from product components.

- `echarts/e-chart.tsx` registers only the ECharts modules the dashboard uses.
- `echarts/use-chart-palette.ts` reads CSS custom properties from the active theme.
- `echarts/chart-palette.ts` provides the shared palette type and fallback values.
- Visible chart components should pass pure options into the adapter.
- Keep chart option builders in component folders so they stay easy to test without rendering ECharts.
- Avoid putting domain rules or dashboard copy in this folder.

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
