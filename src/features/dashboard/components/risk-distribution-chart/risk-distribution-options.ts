import type { EChartsOption } from "echarts";

import type { ChartPalette } from "@/lib/echarts/chart-palette";
import type { Risk } from "../../model/types";
import { riskLevels } from "../../model/types";
import { buildRiskSummary } from "../../model/dashboard-utils";

const riskLevelLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
} as const;

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

export function buildRiskDistributionAccessibleDescription(risks: Risk[]): string {
  const summary = buildRiskSummary(risks);
  const values = riskLevels.map((level) => {
    const label = riskLevelLabels[level];

    return `${label} ${summary.byLevel[level]}`;
  });

  return `Open risks by severity: ${values.join(", ")}. Total open risks: ${summary.totalOpen}.`;
}
