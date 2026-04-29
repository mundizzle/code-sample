import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";

import {
  createDashboardQueryClient,
  dashboardDataQueryOptions,
  dashboardKeys,
  getDashboardData,
} from "./dashboard-query";
import { dashboardData } from "./fixtures";

describe("dashboard query boundary", () => {
  it("uses stable query keys for dashboard data", () => {
    expect(dashboardKeys.all).toEqual(["dashboard"]);
    expect(dashboardKeys.data()).toEqual(["dashboard", "data"]);
  });

  it("returns a fresh dashboard data copy so callers cannot mutate fixtures", async () => {
    const first = await getDashboardData();
    const second = await getDashboardData();

    first.projects[0].name = "Changed";

    expect(second.projects[0].name).toBe("Resident Services Hub");
    expect(dashboardData.projects[0].name).toBe("Resident Services Hub");
  });

  it("builds query options around the fixture-backed dashboard fetcher", async () => {
    const options = dashboardDataQueryOptions();

    expect(options.queryKey).toEqual(["dashboard", "data"]);
    expect(options.staleTime).toBe(60_000);
    await expect(options.queryFn()).resolves.toMatchObject({
      clients: expect.any(Array),
      projects: expect.any(Array),
    });
  });

  it("creates a QueryClient with dashboard-friendly defaults", () => {
    const client = createDashboardQueryClient();

    expect(client).toBeInstanceOf(QueryClient);
    expect(client.getDefaultOptions().queries?.staleTime).toBe(60_000);
    expect(client.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(false);
  });
});
