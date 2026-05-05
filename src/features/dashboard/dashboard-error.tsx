"use client";

import { DashboardHeader } from "./components/dashboard-header/dashboard-header";

export type DashboardErrorProps = {
  error: Error;
  reset: () => void;
};

export function DashboardError({ reset }: DashboardErrorProps) {
  return (
    <main className="min-h-screen bg-ad-bg text-ad-text">
      <div className="mx-auto box-border flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />
        <section
          aria-label="Dashboard error"
          className="rounded-ad-md border border-ad-border bg-ad-surface p-5 text-sm text-ad-danger"
        >
          <p>Unable to load dashboard data.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 min-h-10 rounded-ad-sm border border-ad-border bg-ad-surface px-4 py-2 text-sm font-semibold text-ad-text transition hover:border-ad-accent hover:text-ad-accent"
          >
            Try again
          </button>
        </section>
      </div>
    </main>
  );
}
