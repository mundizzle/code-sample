import { describe, expect, it } from "vitest";

import { dashboardData } from "../data/fixtures";
import {
  buildHealthTrendOption,
  buildRiskDistributionOption,
  dashboardChartPalette,
} from "./chart-options";

describe("dashboard chart options", () => {
  it("builds a named health trend line series", () => {
    const option = buildHealthTrendOption(dashboardData.weeklyMetrics, dashboardChartPalette);

    expect(option.xAxis).toMatchObject({
      type: "category",
      data: ["Apr 13", "Apr 20", "Apr 27", "May 04"],
    });
    expect(option.series).toMatchObject([
      {
        name: "Delivery Health",
        type: "line",
        data: [82, 84, 85, 86],
      },
    ]);
  });

  it("builds an open-risk distribution donut from risk levels", () => {
    const option = buildRiskDistributionOption(dashboardData.risks, dashboardChartPalette);

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
});
