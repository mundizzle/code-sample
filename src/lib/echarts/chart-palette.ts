export type ChartPalette = {
  text: string;
  textMuted: string;
  border: string;
  surfaceElevated: string;
  series: [string, string, string, string];
};

export const dashboardChartPalette: ChartPalette = {
  text: "#111827",
  textMuted: "#667085",
  border: "#D8DEE8",
  surfaceElevated: "#EEF2F7",
  series: ["#2563EB", "#14B8A6", "#F59E0B", "#EF4444"],
};

export const cssVariableNames = {
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
