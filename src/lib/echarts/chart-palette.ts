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
