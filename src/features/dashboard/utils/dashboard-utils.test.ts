import { describe, expect, it } from "vitest";

import { dashboardData } from "../data/fixtures";
import {
  aggregateDashboardMetrics,
  buildHealthTrendSeries,
  buildRiskSummary,
  calculateProjectHealth,
  filterProjects,
  sortProjects,
} from "./dashboard-utils";

describe("dashboard fixtures", () => {
  it("matches the current Figma dashboard reference content", () => {
    expect(dashboardData.clients.map((client) => client.name)).toEqual([
      "CivicWorks",
      "Northstar Health",
      "Market Lane",
    ]);

    expect(dashboardData.projects).toHaveLength(5);
    expect(
      dashboardData.projects.find((project) => project.name === "Resident Services Hub"),
    ).toMatchObject({
      owner: "Mundi Morgado",
      clientId: "client-civicworks",
      targetLaunchDate: "2026-05-22",
    });
  });
});

describe("filterProjects", () => {
  it("filters by client, status, health, and search text", () => {
    const results = filterProjects(dashboardData.projects, {
      clientIds: ["client-civicworks"],
      statuses: ["launching"],
      healthStatuses: ["watch"],
      search: "resident",
    });

    expect(results.map((project) => project.name)).toEqual(["Resident Services Hub"]);
  });

  it("returns all projects when no filters are selected", () => {
    expect(filterProjects(dashboardData.projects, {})).toHaveLength(5);
  });
});

describe("sortProjects", () => {
  it("sorts by launch date ascending without mutating the original array", () => {
    const originalOrder = dashboardData.projects.map((project) => project.id);
    const sorted = sortProjects(dashboardData.projects, "launchDate");

    expect(sorted.map((project) => project.name).slice(0, 2)).toEqual([
      "Marketplace Refresh",
      "Resident Services Hub",
    ]);
    expect(dashboardData.projects.map((project) => project.id)).toEqual(originalOrder);
  });

  it("sorts by health score with the riskiest project first", () => {
    const sorted = sortProjects(dashboardData.projects, "health");

    expect(sorted[0].name).toBe("Grant Eligibility Portal");
    expect(sorted.at(-1)?.name).toBe("Care Pathways");
  });
});

describe("calculateProjectHealth", () => {
  it("maps operating signals to a status and score", () => {
    expect(
      calculateProjectHealth({
        budgetVariancePercent: 4,
        scheduleVarianceDays: 3,
        openRiskCount: 2,
      }),
    ).toEqual({
      status: "watch",
      score: 76,
      budgetVariancePercent: 4,
      scheduleVarianceDays: 3,
      openRiskCount: 2,
    });
  });
});

describe("aggregateDashboardMetrics", () => {
  it("builds the KPI values shown in the Figma reference", () => {
    expect(aggregateDashboardMetrics(dashboardData, "2026-05-01")).toEqual({
      activeProjects: 5,
      deliveryHealthPercent: 86,
      openRisks: 8,
      launchesThisMonth: 3,
    });
  });
});

describe("buildRiskSummary", () => {
  it("summarizes open risks by level and category", () => {
    expect(buildRiskSummary(dashboardData.risks)).toEqual({
      totalOpen: 8,
      byLevel: {
        low: 1,
        medium: 3,
        high: 3,
        critical: 1,
      },
      byCategory: {
        accessibility: 1,
        content: 2,
        data: 1,
        dependency: 2,
        scope: 1,
        staffing: 1,
      },
    });
  });
});

describe("buildHealthTrendSeries", () => {
  it("builds chart-ready average health values by week", () => {
    expect(buildHealthTrendSeries(dashboardData.weeklyMetrics)).toEqual({
      labels: ["Apr 13", "Apr 20", "Apr 27", "May 04"],
      series: [
        {
          name: "Delivery Health",
          data: [82, 84, 85, 86],
        },
      ],
    });
  });
});
