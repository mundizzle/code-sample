"use client";

import dynamic from "next/dynamic";
import { useSuspenseQuery } from "@tanstack/react-query";

import { dashboardDataQueryOptions } from "./data/query/dashboard-query";
import { useDashboardStore } from "./state/dashboard-store-provider";
import {
  aggregateDashboardMetrics,
  buildDashboardDataSlice,
  buildMetricDelta,
  filterProjects,
  sortProjects,
} from "./model/dashboard-utils";
import { ChartPanel } from "./components/chart-panel/chart-panel";
import { DashboardHeader } from "./components/dashboard-header/dashboard-header";
import { FilterPanel } from "./components/filter-panel/filter-panel";
import { MetricCard } from "./components/metric-card/metric-card";
import { ProjectDetailPanel } from "./components/project-detail-panel/project-detail-panel";
import { ProjectList } from "./components/project-list/project-list";

const HealthTrendChart = dynamic(
  () =>
    import("./components/health-trend-chart/health-trend-chart").then(
      (module) => module.HealthTrendChart,
    ),
  {
    loading: () => <ChartLoading label="Loading health trend chart..." />,
  },
);

const RiskDistributionChart = dynamic(
  () =>
    import("./components/risk-distribution-chart/risk-distribution-chart").then(
      (module) => module.RiskDistributionChart,
    ),
  {
    loading: () => <ChartLoading label="Loading risk distribution chart..." />,
  },
);

export function Dashboard() {
  const { data } = useSuspenseQuery(dashboardDataQueryOptions());
  const selectedProjectId = useDashboardStore((state) => state.selectedProjectId);
  const filters = useDashboardStore((state) => state.filters);
  const toggleClientFilter = useDashboardStore((state) => state.toggleClientFilter);
  const selectProject = useDashboardStore((state) => state.selectProject);

  const visibleProjects = sortProjects(filterProjects(data.projects, filters), "launchDate");
  const filteredData = buildDashboardDataSlice(data, visibleProjects);
  const metrics = aggregateDashboardMetrics(filteredData, data.reporting.currentMonth);
  const comparison =
    filters.clientIds.length === 0
      ? data.reporting.comparison
      : metrics;
  const activeProjectsDelta = buildMetricDelta(
    metrics.activeProjects,
    comparison.activeProjects,
  );
  const deliveryHealthDelta = buildMetricDelta(
    metrics.deliveryHealthPercent,
    comparison.deliveryHealthPercent,
    { suffix: "%" },
  );
  const openRisksDelta = buildMetricDelta(metrics.openRisks, comparison.openRisks, {
    lowerIsBetter: true,
  });
  const launchesDelta = buildMetricDelta(
    metrics.launchesThisMonth,
    comparison.launchesThisMonth,
  );
  const selectedProject =
    visibleProjects.find((project) => project.id === selectedProjectId) ??
    visibleProjects[0];

  return (
    <main className="min-h-screen bg-ad-bg text-ad-text">
      <div className="mx-auto box-border flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />

        <div className="grid min-w-0 gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_316px]">
          <FilterPanel
            clients={data.clients}
            selectedClientIds={filters.clientIds}
            onToggleClient={toggleClientFilter}
          />

          <div className="grid min-w-0 gap-6">
            <section
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
              aria-label="Delivery metrics"
            >
              <MetricCard
                label="Active Projects"
                value={metrics.activeProjects.toString()}
                delta={activeProjectsDelta.label}
                deltaTone={activeProjectsDelta.tone}
              />
              <MetricCard
                label="Delivery Health"
                value={`${metrics.deliveryHealthPercent}%`}
                delta={deliveryHealthDelta.label}
                deltaTone={deliveryHealthDelta.tone}
              />
              <MetricCard
                label="Open Risks"
                value={metrics.openRisks.toString()}
                delta={openRisksDelta.label}
                deltaTone={openRisksDelta.tone}
              />
              <MetricCard
                label="Launches"
                value={metrics.launchesThisMonth.toString()}
                delta={launchesDelta.label}
                deltaTone={launchesDelta.tone}
              />
            </section>

            <section
              className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]"
              aria-label="Dashboard charts"
            >
              <ChartPanel
                title="Health Trend"
                description="Average project health over the last four reporting weeks."
              >
                <HealthTrendChart metrics={filteredData.weeklyMetrics} />
              </ChartPanel>

              <ChartPanel
                title="Risk Distribution"
                description="Open risks grouped by severity across active projects."
              >
                <RiskDistributionChart risks={filteredData.risks} />
              </ChartPanel>
            </section>

            <ProjectList
              clients={data.clients}
              projects={visibleProjects}
              selectedProjectId={selectedProject?.id}
              totalProjectCount={data.projects.length}
              onSelectProject={selectProject}
            />
          </div>

          <ProjectDetailPanel project={selectedProject} />
        </div>
      </div>
    </main>
  );
}

function ChartLoading({ label }: { label: string }) {
  return (
    <div
      role="status"
      className="grid h-56 w-full place-items-center rounded-ad-sm border border-dashed border-ad-border bg-ad-bg text-sm text-ad-text-muted"
    >
      {label}
    </div>
  );
}
