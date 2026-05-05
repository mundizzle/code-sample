import { DashboardHeader } from "./components/dashboard-header/dashboard-header";

export function DashboardLoading() {
  return (
    <main className="min-h-screen bg-ad-bg text-ad-text">
      <div className="mx-auto box-border flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />
        <section
          aria-label="Dashboard loading"
          className="rounded-ad-md border border-ad-border bg-ad-surface p-5 text-sm text-ad-text-muted"
        >
          Loading dashboard...
        </section>
      </div>
    </main>
  );
}
