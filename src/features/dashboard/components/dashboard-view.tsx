"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardDataQueryOptions } from "../data/dashboard-query";
import { useDashboardStore } from "../state/dashboard-store-provider";
import type {
  Client,
  DashboardData,
  HealthStatus,
  Project,
  ProjectStatus,
  RiskLevel,
} from "../types";
import {
  aggregateDashboardMetrics,
  buildHealthTrendSeries,
  buildRiskSummary,
  filterProjects,
  sortProjects,
} from "../utils/dashboard-utils";

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

const riskLevelLabels: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export function DashboardView() {
  const { data = emptyDashboardData } = useQuery(dashboardDataQueryOptions());
  const selectedProjectId = useDashboardStore((state) => state.selectedProjectId);
  const filters = useDashboardStore((state) => state.filters);
  const toggleClientFilter = useDashboardStore((state) => state.toggleClientFilter);
  const setSearch = useDashboardStore((state) => state.setSearch);
  const selectProject = useDashboardStore((state) => state.selectProject);

  const metrics = aggregateDashboardMetrics(data, currentMonth);
  const riskSummary = buildRiskSummary(data.risks);
  const healthTrend = buildHealthTrendSeries(data.weeklyMetrics);
  const visibleProjects = sortProjects(filterProjects(data.projects, filters), "launchDate");
  const selectedProject =
    data.projects.find((project) => project.id === selectedProjectId) ??
    data.projects[0];

  return (
    <main className="min-h-screen bg-ad-bg text-ad-text">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <DashboardHeader />

        <section
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Delivery metrics"
        >
          <MetricCard
            label="Active Projects"
            value={metrics.activeProjects.toString()}
            tone="accent"
          />
          <MetricCard
            label="Delivery Health"
            value={`${metrics.deliveryHealthPercent}%`}
            tone="success"
          />
          <MetricCard
            label="Open Risks"
            value={metrics.openRisks.toString()}
            tone="warning"
          />
          <MetricCard
            label="Launches This Month"
            value={metrics.launchesThisMonth.toString()}
            tone="accent"
          />
        </section>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[280px_minmax(0,1fr)_380px]">
          <FilterPanel
            clients={data.clients}
            selectedClientIds={filters.clientIds}
            search={filters.search}
            onToggleClient={toggleClientFilter}
            onSearch={setSearch}
          />

          <div className="grid min-w-0 gap-4">
            <section className="grid gap-4 md:grid-cols-2" aria-label="Dashboard charts">
              <ChartPanel title="Health Trend">
                <ol
                  className="flex h-full min-h-40 items-end gap-2"
                  aria-label="Weekly delivery health scores"
                >
                  {healthTrend.series[0]?.data.map((value, index) => (
                    <li
                      key={healthTrend.labels[index]}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <span
                        aria-hidden="true"
                        className="w-full rounded-t-ad-sm bg-ad-chart-series-1"
                        style={{ height: `${value}%` }}
                      />
                      <span className="text-xs text-ad-text-muted">{healthTrend.labels[index]}</span>
                      <span className="sr-only">{value}% delivery health</span>
                    </li>
                  ))}
                </ol>
              </ChartPanel>

              <ChartPanel title="Risk Distribution">
                <div className="grid gap-3">
                  {Object.entries(riskSummary.byLevel).map(([level, count]) => (
                    <RiskBar
                      key={level}
                      label={riskLevelLabels[level as RiskLevel]}
                      value={count}
                      total={riskSummary.totalOpen}
                    />
                  ))}
                </div>
              </ChartPanel>
            </section>

            <ProjectList
              clients={data.clients}
              projects={visibleProjects}
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
    <header className="flex flex-col gap-3 border-b border-ad-border pb-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-ad-accent">Agency Delivery Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ad-text md:text-4xl">
          Delivery Command Center
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ad-text-muted md:text-base">
          A responsive dashboard reference for tracking client delivery health, risks, and launch readiness.
        </p>
      </div>
      <div className="rounded-ad-md border border-ad-border bg-ad-surface px-4 py-3 text-sm text-ad-text-muted">
        May 2026 portfolio
      </div>
    </header>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  tone: "accent" | "success" | "warning";
};

function MetricCard({ label, value, tone }: MetricCardProps) {
  const toneClass = {
    accent: "text-ad-accent",
    success: "text-ad-success",
    warning: "text-ad-warning",
  }[tone];

  return (
    <article className="rounded-ad-md border border-ad-border bg-ad-surface p-4">
      <p className="text-sm text-ad-text-muted">{label}</p>
      <p className={`mt-3 text-3xl font-semibold ${toneClass}`}>{value}</p>
    </article>
  );
}

type FilterPanelProps = {
  clients: Client[];
  selectedClientIds: string[];
  search: string;
  onToggleClient: (clientId: string) => void;
  onSearch: (search: string) => void;
};

function FilterPanel({
  clients,
  selectedClientIds,
  search,
  onToggleClient,
  onSearch,
}: FilterPanelProps) {
  return (
    <aside
      aria-label="Dashboard filters"
      className="rounded-ad-md border border-ad-border bg-ad-surface p-4 xl:sticky xl:top-6 xl:self-start"
    >
      <div className="flex flex-col gap-4">
        <label className="grid gap-2 text-sm font-medium text-ad-text" htmlFor="project-search">
          Search projects
          <input
            id="project-search"
            type="search"
            value={search}
            onChange={(event) => onSearch(event.currentTarget.value)}
            className="h-10 rounded-ad-sm border border-ad-border bg-ad-bg px-3 text-sm text-ad-text outline-none focus:border-ad-accent"
            placeholder="Project, owner, or summary"
          />
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-ad-text">Clients</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {clients.map((client) => {
              const isSelected = selectedClientIds.includes(client.id);

              return (
                <button
                  key={client.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onToggleClient(client.id)}
                  className={`rounded-ad-sm border px-3 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "border-ad-accent bg-ad-accent text-white"
                      : "border-ad-border bg-ad-bg text-ad-text hover:border-ad-accent"
                  }`}
                >
                  {client.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>
    </aside>
  );
}

type ChartPanelProps = {
  title: string;
  children: React.ReactNode;
};

function ChartPanel({ title, children }: ChartPanelProps) {
  const headingId = `${title.toLowerCase().replaceAll(" ", "-")}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-ad-md border border-ad-border bg-ad-surface p-4"
    >
      <h2 id={headingId} className="text-base font-semibold text-ad-text">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type RiskBarProps = {
  label: string;
  value: number;
  total: number;
};

function RiskBar({ label, value, total }: RiskBarProps) {
  const width = total === 0 ? 0 : Math.max(8, Math.round((value / total) * 100));

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-ad-text">{label}</span>
        <span className="font-medium text-ad-text-muted">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-ad-surface-elevated">
        <div className="h-2 rounded-full bg-ad-chart-series-3" style={{ width: `${width}%` }} />
      </div>
    </div>
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
      className="@container/project-detail rounded-ad-md border border-ad-border bg-ad-surface p-4 lg:sticky lg:top-6 lg:self-start"
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
