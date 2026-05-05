"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardDataQueryOptions } from "./data/query/dashboard-query";
import { useDashboardStore } from "./state/dashboard-store-provider";
import type { DashboardData } from "./model/types";
import {
  aggregateDashboardMetrics,
  buildDashboardDataSlice,
  buildMetricDelta,
  filterProjects,
  sortProjects,
} from "./model/dashboard-utils";
import { ChartPanel } from "./components/chart-panel/chart-panel";
import { DashboardHeader } from "./components/header/header";
import { FilterPanel } from "./components/filters/filter-panel";
import { HealthTrendChart } from "./components/health-trend-chart/health-trend-chart";
import { MetricCard } from "./components/metrics/metric-card";
import { ProjectDetailPanel } from "./components/project-detail-panel/project-detail-panel";
import { ProjectList } from "./components/project-list/project-list";
import { RiskDistributionChart } from "./components/risk-distribution-chart/risk-distribution-chart";

export function Dashboard() {
  const {
    data = emptyDashboardData,
    isError,
    isLoading,
  } = useQuery(dashboardDataQueryOptions());
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
    data.projects.find((project) => project.id === selectedProjectId) ??
    data.projects[0];

  if (isLoading) {
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

  if (isError) {
    return (
      <main className="min-h-screen bg-ad-bg text-ad-text">
        <div className="mx-auto box-border flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
          <DashboardHeader />
          <section
            aria-label="Dashboard error"
            className="rounded-ad-md border border-ad-border bg-ad-surface p-5 text-sm text-ad-danger"
          >
            Unable to load dashboard data.
          </section>
        </div>
      </main>
    );
  }

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

const emptyDashboardData: DashboardData = {
  reporting: {
    currentMonth: "2026-05-01",
    comparison: {
      activeProjects: 0,
      deliveryHealthPercent: 0,
      openRisks: 0,
      launchesThisMonth: 0,
    },
  },
  clients: [],
  projects: [],
  milestones: [],
  risks: [],
  weeklyMetrics: [],
  teamAllocations: [],
};
