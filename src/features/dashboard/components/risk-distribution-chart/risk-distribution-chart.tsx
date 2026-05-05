"use client";

import { useMemo } from "react";

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
  const accessibleDescription = useMemo(
    () => buildRiskDistributionAccessibleDescription(risks),
    [risks],
  );
  const option = useMemo(
    () => buildRiskDistributionOption(risks, chartPalette),
    [chartPalette, risks],
  );

  return (
    <EChart
      accessibleDescription={accessibleDescription}
      ariaLabel="Open risk distribution by severity"
      className="h-72 w-full sm:h-56"
      option={option}
    />
  );
}
