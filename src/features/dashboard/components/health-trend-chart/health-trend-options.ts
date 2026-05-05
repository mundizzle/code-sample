import type { EChartsOption } from "echarts";

import type { ChartPalette } from "@/lib/echarts/chart-palette";
import type { WeeklyMetric } from "../../model/types";
import { buildHealthTrendSeries } from "../../model/dashboard-utils";

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

export function buildHealthTrendAccessibleDescription(
  metrics: WeeklyMetric[],
): string {
  const trend = buildHealthTrendSeries(metrics);
  const values = trend.labels.map((label, index) => {
    const value = trend.series[0]?.data[index] ?? 0;

    return `${label} ${value}%`;
  });

  return `Delivery health trend: ${values.join(", ")}.`;
}

function formatPercent(value: unknown): string {
  const displayValue = Array.isArray(value) ? value[0] : value;

  return `${displayValue ?? 0}%`;
}
