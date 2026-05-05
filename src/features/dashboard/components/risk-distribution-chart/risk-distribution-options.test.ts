import { describe, expect, it } from "vitest";

import { dashboardData } from "@/features/dashboard/data/mock-data";
import { dashboardChartPalette } from "@/lib/echarts/chart-palette";

import {
  buildRiskDistributionAccessibleDescription,
  buildRiskDistributionOption,
} from "./risk-distribution-options";

describe("risk distribution chart options", () => {
  it("builds an open-risk distribution donut from risk levels", () => {
    const option = buildRiskDistributionOption(
      dashboardData.risks,
      dashboardChartPalette,
    );

    expect(option.series).toMatchObject([
      {
        name: "Open risks",
        type: "pie",
        data: [
          { name: "Low", value: 1 },
          { name: "Medium", value: 3 },
          { name: "High", value: 3 },
          { name: "Critical", value: 1 },
        ],
      },
    ]);
  });

  it("builds a screen-reader summary of the chart values", () => {
    expect(buildRiskDistributionAccessibleDescription(dashboardData.risks)).toBe(
      "Open risks by severity: Low 1, Medium 3, High 3, Critical 1. Total open risks: 8.",
    );
  });
});
