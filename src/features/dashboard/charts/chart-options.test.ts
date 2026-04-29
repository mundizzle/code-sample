import { describe, expect, it } from "vitest";

import { dashboardData } from "../data/fixtures";
import {
  buildBudgetTimelineOption,
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

  it("builds a budget versus timeline comparison with stable series names", () => {
    const option = buildBudgetTimelineOption(dashboardData.projects, dashboardChartPalette);

    expect(option.yAxis).toMatchObject({
      type: "category",
      data: [
        "Resident Services Hub",
        "Care Pathways",
        "Marketplace Refresh",
        "Grant Eligibility Portal",
        "Loyalty Insights",
      ],
    });
    expect(option.series).toMatchObject([
      {
        name: "Budget used",
        type: "bar",
        data: [78, 56, 83, 70, 55],
      },
      {
        name: "Timeline used",
        type: "bar",
        data: [81, 71, 84, 49, 61],
      },
    ]);
  });
});
