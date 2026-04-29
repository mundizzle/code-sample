import { QueryClient, queryOptions } from "@tanstack/react-query";

import type { DashboardData } from "../types";
import { dashboardData } from "./fixtures";

const dashboardStaleTime = 60_000;

export const dashboardKeys = {
  all: ["dashboard"] as const,
  data: () => [...dashboardKeys.all, "data"] as const,
};

export async function getDashboardData(): Promise<DashboardData> {
  return structuredClone(dashboardData);
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
      },
    },
  });
}
