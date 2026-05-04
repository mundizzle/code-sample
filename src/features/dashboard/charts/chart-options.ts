import type { EChartsOption } from "echarts";

import type { Risk, WeeklyMetric } from "../types";
import { riskLevels } from "../types";
import {
  buildHealthTrendSeries,
  buildRiskSummary,
} from "../utils/dashboard-utils";

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

const riskLevelLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
} as const;

export function buildHealthTrendOption(
  metrics: WeeklyMetric[],
  palette: ChartPalette,
): EChartsOption {
  const trend = buildHealthTrendSeries(metrics);

  return {
    color: palette.series,
    grid: { left: 4, right: 8, top: 16, bottom: 24, containLabel: true },
    tooltip: { trigger: "axis", valueFormatter: formatPercent },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: trend.labels,
      axisLine: { lineStyle: { color: palette.border } },
      axisLabel: { color: palette.textMuted },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 60,
      max: 100,
      axisLabel: { color: palette.textMuted, formatter: "{value}%" },
      splitLine: { lineStyle: { color: palette.surfaceElevated } },
    },
    series: trend.series.map((series) => ({
      name: series.name,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 7,
      lineStyle: { width: 3 },
      areaStyle: { opacity: 0.1 },
      data: series.data,
    })),
  };
}

export function buildRiskDistributionOption(
  risks: Risk[],
  palette: ChartPalette,
): EChartsOption {
  const summary = buildRiskSummary(risks);

  return {
    color: palette.series,
    tooltip: { trigger: "item" },
    legend: {
      bottom: 0,
      icon: "circle",
      textStyle: { color: palette.textMuted },
    },
    series: [
      {
        name: "Open risks",
        type: "pie",
        radius: ["56%", "78%"],
        center: ["50%", "42%"],
        avoidLabelOverlap: true,
        label: { color: palette.text, formatter: "{b}: {c}" },
        data: riskLevels.map((level) => ({
          name: riskLevelLabels[level],
          value: summary.byLevel[level],
        })),
      },
    ],
  };
}

function formatPercent(value: unknown): string {
  const displayValue = Array.isArray(value) ? value[0] : value;

  return `${displayValue ?? 0}%`;
}
