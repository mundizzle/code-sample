"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense, type ReactNode } from "react";

import { DashboardErrorBoundary } from "./dashboard-error-boundary";
import { DashboardLoading } from "./dashboard-loading";

export type DashboardBoundaryProps = {
  children: ReactNode;
};

export function DashboardBoundary({ children }: DashboardBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <DashboardErrorBoundary onReset={reset}>
          <Suspense fallback={<DashboardLoading />}>{children}</Suspense>
        </DashboardErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
