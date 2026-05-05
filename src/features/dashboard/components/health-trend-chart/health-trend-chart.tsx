"use client";

import { useMemo } from "react";

import type { WeeklyMetric } from "../../model/types";

import { EChart } from "@/lib/echarts/e-chart";
import { useChartPalette } from "@/lib/echarts/use-chart-palette";

import {
  buildHealthTrendAccessibleDescription,
  buildHealthTrendOption,
} from "./health-trend-options";

export type HealthTrendChartProps = {
  metrics: WeeklyMetric[];
};

export function HealthTrendChart({ metrics }: HealthTrendChartProps) {
  const chartPalette = useChartPalette();
  const accessibleDescription = useMemo(
    () => buildHealthTrendAccessibleDescription(metrics),
    [metrics],
  );
  const option = useMemo(
    () => buildHealthTrendOption(metrics, chartPalette),
    [chartPalette, metrics],
  );

  return (
    <EChart
      accessibleDescription={accessibleDescription}
      ariaLabel="Weekly delivery health scores"
      option={option}
    />
  );
}
