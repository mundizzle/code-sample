import { QueryClient, queryOptions } from "@tanstack/react-query";

import type { DashboardData } from "../types";

const dashboardStaleTime = 60_000;
const dashboardEndpoint = "/api/dashboard";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  data: () => [...dashboardKeys.all, "data"] as const,
};

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch(dashboardEndpoint);

  if (!response.ok) {
    throw new Error(`Dashboard request failed with ${response.status}`);
  }

  return response.json() as Promise<DashboardData>;
}

export function dashboardDataQueryOptions() {
  return queryOptions({
    queryKey: dashboardKeys.data(),
    queryFn: getDashboardData,
    staleTime: dashboardStaleTime,
  });
}

export function createDashboardQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: dashboardStaleTime,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}
