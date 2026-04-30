"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import {
  buildHealthTrendOption,
  buildRiskDistributionOption,
} from "../charts/chart-options";
import { useChartPalette } from "../charts/use-chart-palette";
import { dashboardDataQueryOptions } from "../data/dashboard-query";
import { useDashboardStore } from "../state/dashboard-store-provider";
import type { DashboardData } from "../types";
import {
  aggregateDashboardMetrics,
  filterProjects,
  sortProjects,
} from "../utils/dashboard-utils";
import { ChartPanel } from "./chart-panel";
import { DashboardHeader } from "./dashboard-header";
import { EChart } from "./e-chart";
import { FilterPanel } from "./filter-panel";
import { MetricCard } from "./metric-card";
import { ProjectDetailPanel } from "./project-detail-panel";
import { ProjectList } from "./project-list";

const currentMonth = "2026-05-01";

export function DashboardView() {
  const { data = emptyDashboardData } = useQuery(dashboardDataQueryOptions());
  const selectedProjectId = useDashboardStore((state) => state.selectedProjectId);
  const filters = useDashboardStore((state) => state.filters);
  const toggleClientFilter = useDashboardStore((state) => state.toggleClientFilter);
  const selectProject = useDashboardStore((state) => state.selectProject);
  const chartPalette = useChartPalette();

  const metrics = aggregateDashboardMetrics(data, currentMonth);
  const visibleProjects = sortProjects(filterProjects(data.projects, filters), "launchDate");
  const selectedProject =
    data.projects.find((project) => project.id === selectedProjectId) ??
    data.projects[0];
  const healthTrendOption = useMemo(
    () => buildHealthTrendOption(data.weeklyMetrics, chartPalette),
    [chartPalette, data.weeklyMetrics],
  );
  const riskDistributionOption = useMemo(
    () => buildRiskDistributionOption(data.risks, chartPalette),
    [chartPalette, data.risks],
  );

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
                delta="+2"
                deltaTone="positive"
              />
              <MetricCard
                label="Delivery Health"
                value={`${metrics.deliveryHealthPercent}%`}
                delta="+4%"
                deltaTone="positive"
              />
              <MetricCard
                label="Open Risks"
                value={metrics.openRisks.toString()}
                delta="-2"
                deltaTone="positive"
              />
              <MetricCard
                label="Launches"
                value={metrics.launchesThisMonth.toString()}
                delta="+1"
                deltaTone="positive"
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
                <EChart
                  ariaLabel="Weekly delivery health scores"
                  option={healthTrendOption}
                />
              </ChartPanel>

              <ChartPanel
                title="Risk Distribution"
                description="Open risks grouped by severity across active projects."
              >
                <EChart
                  ariaLabel="Open risk distribution by severity"
                  className="h-72 w-full sm:h-56"
                  option={riskDistributionOption}
                />
              </ChartPanel>
            </section>

            <ProjectList
              clients={data.clients}
              projects={visibleProjects.slice(0, 3)}
              selectedProjectId={selectedProject?.id}
              totalProjectCount={visibleProjects.length}
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
  clients: [],
  projects: [],
  milestones: [],
  risks: [],
  weeklyMetrics: [],
  teamAllocations: [],
};
