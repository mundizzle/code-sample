import { QueryClient } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createDashboardQueryClient,
  dashboardDataQueryOptions,
  dashboardKeys,
  getDashboardData,
} from "./dashboard-query";
import { dashboardData } from "@/features/dashboard/data/mock-data";

function mockDashboardFetch({
  ok = true,
  status = 200,
}: {
  ok?: boolean;
  status?: number;
} = {}) {
  const fetchMock = vi.fn(async () => {
    if (!ok) {
      return new Response("Failed", { status });
    }

    return Response.json(dashboardData);
  });

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("dashboard query boundary", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses stable query keys for dashboard data", () => {
    expect(dashboardKeys.all).toEqual(["dashboard"]);
    expect(dashboardKeys.data()).toEqual(["dashboard", "data"]);
  });

  it("fetches dashboard data over the mock API route", async () => {
    const fetchMock = mockDashboardFetch();

    await expect(getDashboardData()).resolves.toMatchObject({
      clients: expect.any(Array),
      projects: expect.any(Array),
    });
    expect(fetchMock).toHaveBeenCalledWith("/api/dashboard");
  });

  it("returns parsed dashboard data so callers cannot mutate fixtures", async () => {
    mockDashboardFetch();
    const first = await getDashboardData();
    const second = await getDashboardData();

    first.projects[0].name = "Changed";

    expect(second.projects[0].name).toBe("Resident Services Hub");
    expect(dashboardData.projects[0].name).toBe("Resident Services Hub");
  });

  it("throws when the dashboard route fails", async () => {
    mockDashboardFetch({ ok: false, status: 503 });

    await expect(getDashboardData()).rejects.toThrow(
      "Dashboard request failed with 503",
    );
  });

  it("builds query options around the AJAX dashboard fetcher", async () => {
    const options = dashboardDataQueryOptions();

    expect(options.queryKey).toEqual(["dashboard", "data"]);
    expect(options.staleTime).toBe(60_000);
  });

  it("creates a QueryClient with dashboard-friendly defaults", () => {
    const client = createDashboardQueryClient();

    expect(client).toBeInstanceOf(QueryClient);
    expect(client.getDefaultOptions().queries?.staleTime).toBe(60_000);
    expect(client.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(false);
    expect(client.getDefaultOptions().queries?.retry).toBe(false);
  });
});
