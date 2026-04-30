export function DashboardHeader() {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-medium text-ad-accent">Agency Delivery Dashboard</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ad-text md:text-5xl">
        Delivery Command Center
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-6 text-ad-text-muted">
        Track client delivery health, launch readiness, and open risks across active accounts.
      </p>
    </header>
  );
}
