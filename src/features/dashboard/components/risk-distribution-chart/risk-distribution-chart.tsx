"use client";

import type { Risk } from "../../model/types";

import { EChart } from "@/lib/echarts/e-chart";
import { useChartPalette } from "@/lib/echarts/use-chart-palette";

import {
  buildRiskDistributionAccessibleDescription,
  buildRiskDistributionOption,
} from "./risk-distribution-options";

export type RiskDistributionChartProps = {
  risks: Risk[];
};

export function RiskDistributionChart({ risks }: RiskDistributionChartProps) {
  const chartPalette = useChartPalette();

  return (
    <EChart
      accessibleDescription={buildRiskDistributionAccessibleDescription(risks)}
      ariaLabel="Open risk distribution by severity"
      className="h-72 w-full sm:h-56"
      option={buildRiskDistributionOption(risks, chartPalette)}
    />
  );
}
