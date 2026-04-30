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
import type {
  Client,
  DashboardData,
  HealthStatus,
  Project,
  ProjectStatus,
} from "../types";
import {
  aggregateDashboardMetrics,
  filterProjects,
  sortProjects,
} from "../utils/dashboard-utils";
import { EChart } from "./e-chart";

const currentMonth = "2026-05-01";

const statusLabels: Record<ProjectStatus, string> = {
  discovery: "Discovery",
  "in-progress": "In progress",
  "at-risk": "At risk",
  blocked: "Blocked",
  launching: "Launching",
  complete: "Complete",
};

const healthLabels: Record<HealthStatus, string> = {
  "on-track": "On track",
  watch: "Watch",
  "at-risk": "At risk",
  blocked: "Blocked",
};

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
                tone="text"
              />
              <MetricCard
                label="Delivery Health"
                value={`${metrics.deliveryHealthPercent}%`}
                delta="+4%"
                tone="text"
              />
              <MetricCard
                label="Open Risks"
                value={metrics.openRisks.toString()}
                delta="-2"
                tone="text"
              />
              <MetricCard
                label="Launches"
                value={metrics.launchesThisMonth.toString()}
                delta="+1"
                tone="text"
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
              onSelectProject={selectProject}
            />
          </div>

          <ProjectDetailPanel project={selectedProject} />
        </div>
      </div>
    </main>
  );
}

function DashboardHeader() {
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

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  tone: "text";
};

function MetricCard({ label, value, delta }: MetricCardProps) {
  return (
    <article className="min-h-28 w-full min-w-0 rounded-ad-md border border-ad-border bg-ad-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-3xl font-semibold text-ad-text">{value}</p>
        <p className="text-sm font-semibold text-ad-success">{delta}</p>
      </div>
      <p className="mt-3 text-sm text-ad-text-muted">{label}</p>
    </article>
  );
}

type FilterPanelProps = {
  clients: Client[];
  selectedClientIds: string[];
  onToggleClient: (clientId: string) => void;
};

function FilterPanel({
  clients,
  selectedClientIds,
  onToggleClient,
}: FilterPanelProps) {
  return (
    <aside
      aria-label="Dashboard filters"
      className="w-full min-w-0 rounded-ad-md border border-ad-border bg-ad-surface p-5 lg:min-h-[710px] xl:sticky xl:top-8 xl:self-start"
    >
      <fieldset>
        <legend className="text-base font-semibold text-ad-text">Clients</legend>
        <div className="mt-5 flex flex-col gap-3">
          {clients.map((client, index) => {
            const isSelected =
              selectedClientIds.includes(client.id) ||
              (selectedClientIds.length === 0 && index === 0);

            return (
              <button
                key={client.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggleClient(client.id)}
                className={`min-h-11 w-full rounded-ad-sm border px-4 py-2 text-left text-sm font-medium transition ${
                  isSelected
                    ? "border-ad-accent bg-ad-accent text-white"
                    : "border-ad-border bg-ad-surface text-ad-text-muted hover:border-ad-accent hover:text-ad-text"
                }`}
              >
                {client.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-8 w-full text-sm leading-5 text-ad-text-muted">
        Focus the portfolio by client to review delivery health and launch readiness.
      </p>
    </aside>
  );
}

type ChartPanelProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function ChartPanel({ title, description, children }: ChartPanelProps) {
  const headingId = `${title.toLowerCase().replaceAll(" ", "-")}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 rounded-ad-md border border-ad-border bg-ad-surface p-5"
    >
      <h2 id={headingId} className="text-lg font-semibold text-ad-text">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-5 text-ad-text-muted">{description}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

type ProjectListProps = {
  clients: Client[];
  projects: Project[];
  selectedProjectId?: string;
  onSelectProject: (projectId: string) => void;
};

function ProjectList({
  clients,
  projects,
  selectedProjectId,
  onSelectProject,
}: ProjectListProps) {
  return (
    <section
      aria-label="Projects"
      className="rounded-ad-md border border-ad-border bg-ad-surface"
    >
      <div className="flex items-center justify-between border-b border-ad-border p-4">
        <h2 className="text-base font-semibold text-ad-text">Projects</h2>
        <span className="text-sm text-ad-text-muted">{projects.length} shown</span>
      </div>

      <ul aria-label="Project list" className="divide-y divide-ad-border">
        {projects.length === 0 ? (
          <li className="p-4 text-sm text-ad-text-muted">No projects match these filters.</li>
        ) : (
          projects.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                aria-current={selectedProjectId === project.id ? "true" : undefined}
                onClick={() => onSelectProject(project.id)}
                className={`grid w-full gap-3 p-4 text-left transition hover:bg-ad-surface-elevated md:grid-cols-[minmax(0,1fr)_120px_96px] md:items-center ${
                  selectedProjectId === project.id ? "bg-ad-surface-elevated" : ""
                }`}
              >
                <span>
                  <span className="block font-medium text-ad-text">{project.name}</span>
                  <span className="mt-1 block text-sm text-ad-text-muted">
                    {getClientName(clients, project.clientId)} · {project.owner}
                  </span>
                </span>
                <StatusBadge status={project.status} />
                <span className="text-sm font-medium text-ad-text">
                  {project.health.score}% health
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex w-fit rounded-ad-sm border border-ad-border bg-ad-bg px-2.5 py-1 text-xs font-medium text-ad-text-muted">
      {statusLabels[status]}
    </span>
  );
}

function ProjectDetailPanel({ project }: { project?: Project }) {
  if (!project) {
    return (
      <section
        aria-label="Selected Project"
        className="@container/project-detail rounded-ad-md border border-ad-border bg-ad-surface p-4"
      >
        <h2 className="text-base font-semibold text-ad-text">Selected Project</h2>
        <p className="mt-3 text-sm text-ad-text-muted">Select a project to review details.</p>
      </section>
    );
  }

  return (
    <section
      aria-label="Selected Project"
      className="@container/project-detail rounded-ad-md border border-ad-border bg-ad-surface p-4 lg:col-start-2 lg:row-start-2 lg:self-start xl:col-start-auto xl:row-start-auto xl:sticky xl:top-6"
    >
      <p className="text-sm font-medium text-ad-accent">Selected Project</p>
      <h2 className="mt-2 text-xl font-semibold text-ad-text">{project.name}</h2>
      <p className="mt-3 text-sm leading-6 text-ad-text-muted">{project.summary}</p>

      <div className="mt-5 grid gap-3 @md/project-detail:grid-cols-2 @xl/project-detail:grid-cols-3">
        <DetailBlock label="Metadata">
          <p>Owner: {project.owner}</p>
          <p>Launch: {formatMonthYear(project.targetLaunchDate)}</p>
          <p>Status: {statusLabels[project.status]}</p>
        </DetailBlock>
        <DetailBlock label="Progress">
          <p>{project.progressPercent}% complete</p>
          <p>{project.teamSize} team members</p>
          <p>${formatCompactNumber(project.spentUsd)} spent</p>
        </DetailBlock>
        <DetailBlock label="Risk">
          <p>{healthLabels[project.health.status]}</p>
          <p>{project.health.openRiskCount} open risks</p>
          <p>{project.health.scheduleVarianceDays} schedule variance days</p>
        </DetailBlock>
      </div>
    </section>
  );
}

type DetailBlockProps = {
  label: string;
  children: React.ReactNode;
};

function DetailBlock({ label, children }: DetailBlockProps) {
  return (
    <div className="rounded-ad-sm border border-ad-border bg-ad-bg p-3 text-sm">
      <h3 className="font-medium text-ad-text">{label}</h3>
      <div className="mt-2 grid gap-1 text-ad-text-muted">{children}</div>
    </div>
  );
}

function getClientName(clients: Client[], clientId: string): string {
  return clients.find((client) => client.id === clientId)?.name ?? "Unknown client";
}

function formatMonthYear(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

const emptyDashboardData: DashboardData = {
  clients: [],
  projects: [],
  milestones: [],
  risks: [],
  weeklyMetrics: [],
  teamAllocations: [],
};
