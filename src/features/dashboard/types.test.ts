import { describe, expect, it } from "vitest";

import type { Client, DashboardData, Project } from "./types";

describe("dashboard domain model", () => {
  it("represents an agency delivery project with client, health, and operating metrics", () => {
    const client = {
      id: "client-acme",
      name: "Acme Financial",
      industry: "Financial services",
      accountLead: "Jordan Lee",
      workModel: "hybrid",
    } satisfies Client;

    const project = {
      id: "project-portal-redesign",
      clientId: client.id,
      name: "Client portal redesign",
      status: "in-progress",
      owner: "Mundi Morgado",
      summary: "Portal workstream with accessibility and launch readiness checkpoints.",
      startDate: "2026-01-12",
      targetLaunchDate: "2026-05-08",
      budgetUsd: 240000,
      spentUsd: 132000,
      progressPercent: 58,
      teamSize: 8,
      health: {
        status: "watch",
        score: 76,
        budgetVariancePercent: 4,
        scheduleVarianceDays: 3,
        openRiskCount: 2,
      },
    } satisfies Project;

    const dashboardData = {
      clients: [client],
      projects: [project],
      milestones: [],
      risks: [],
      weeklyMetrics: [],
      teamAllocations: [],
    } satisfies DashboardData;

    expect(dashboardData.projects[0].health.status).toBe("watch");
    expect(dashboardData.clients[0].workModel).toBe("hybrid");
  });
});
