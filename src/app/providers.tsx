"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { createDashboardQueryClient } from "@/features/dashboard/data/dashboard-query";
import { DashboardStoreProvider } from "@/features/dashboard/state/dashboard-store-provider";

export type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createDashboardQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardStoreProvider>{children}</DashboardStoreProvider>
    </QueryClientProvider>
  );
}
