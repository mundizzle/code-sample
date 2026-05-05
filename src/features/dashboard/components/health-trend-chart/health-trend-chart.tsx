"use client";

import type { WeeklyMetric } from "../../model/types";

import { EChart } from "@/lib/echarts/e-chart";
import { useChartPalette } from "@/lib/echarts/use-chart-palette";

import { buildHealthTrendOption } from "./health-trend-options";

export type HealthTrendChartProps = {
  metrics: WeeklyMetric[];
};

export function HealthTrendChart({ metrics }: HealthTrendChartProps) {
  const chartPalette = useChartPalette();

  return (
    <EChart
      ariaLabel="Weekly delivery health scores"
      option={buildHealthTrendOption(metrics, chartPalette)}
    />
  );
}
