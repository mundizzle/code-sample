import { describe, expect, it } from "vitest";

import { dashboardData } from "@/features/dashboard/data/mock-data";
import { dashboardChartPalette } from "@/lib/echarts/chart-palette";

import {
  buildHealthTrendAccessibleDescription,
  buildHealthTrendOption,
} from "./health-trend-options";

describe("health trend chart options", () => {
  it("builds a named health trend line series", () => {
    const option = buildHealthTrendOption(
      dashboardData.weeklyMetrics,
      dashboardChartPalette,
    );

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

  it("builds a screen-reader summary of the chart values", () => {
    expect(buildHealthTrendAccessibleDescription(dashboardData.weeklyMetrics)).toBe(
      "Delivery health trend: Apr 13 82%, Apr 20 84%, Apr 27 85%, May 04 86%.",
    );
  });
});
