import type {
  DashboardData,
  HealthStatus,
  IsoDate,
  Project,
  ProjectHealth,
  ProjectStatus,
  Risk,
  RiskCategory,
  RiskLevel,
  WeeklyMetric,
} from "../types";
import { riskCategories, riskLevels } from "../types";

export type ProjectFilters = {
  clientIds?: string[];
  statuses?: ProjectStatus[];
  healthStatuses?: HealthStatus[];
  search?: string;
};

export type ProjectSort = "launchDate" | "health";

export type HealthInputs = Pick<
  ProjectHealth,
  "budgetVariancePercent" | "scheduleVarianceDays" | "openRiskCount"
>;

export type DashboardMetrics = {
  activeProjects: number;
  deliveryHealthPercent: number;
  openRisks: number;
  launchesThisMonth: number;
};

export type RiskSummary = {
  totalOpen: number;
  byLevel: Record<RiskLevel, number>;
  byCategory: Record<RiskCategory, number>;
};

export type LineSeries = {
  name: string;
  data: number[];
};

export type HealthTrendSeries = {
  labels: string[];
  series: LineSeries[];
};

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  const search = filters.search?.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesClient =
      !filters.clientIds?.length || filters.clientIds.includes(project.clientId);
    const matchesStatus =
      !filters.statuses?.length || filters.statuses.includes(project.status);
    const matchesHealth =
      !filters.healthStatuses?.length ||
      filters.healthStatuses.includes(project.health.status);
    const matchesSearch =
      !search ||
      [project.name, project.owner, project.summary].some((value) =>
        value.toLowerCase().includes(search),
      );

    return matchesClient && matchesStatus && matchesHealth && matchesSearch;
  });
}

export function sortProjects(projects: Project[], sort: ProjectSort): Project[] {
  return [...projects].sort((left, right) => {
    if (sort === "launchDate") {
      return left.targetLaunchDate.localeCompare(right.targetLaunchDate);
    }

    return left.health.score - right.health.score;
  });
}

export function calculateProjectHealth(inputs: HealthInputs): ProjectHealth {
  const score = clamp(
    100 -
      inputs.budgetVariancePercent * 2 -
      inputs.scheduleVarianceDays * 2 -
      inputs.openRiskCount * 5,
    0,
    100,
  );

  return {
    ...inputs,
    score,
    status: getHealthStatus(score),
  };
}

export function aggregateDashboardMetrics(
  data: DashboardData,
  currentMonth: IsoDate,
): DashboardMetrics {
  const monthPrefix = currentMonth.slice(0, 7);
  const activeProjects = data.projects.filter(
    (project) => project.status !== "complete",
  );
  const totalHealth = activeProjects.reduce(
    (sum, project) => sum + project.health.score,
    0,
  );
  const deliveryHealthPercent =
    activeProjects.length === 0 ? 0 : Math.round(totalHealth / activeProjects.length);

  return {
    activeProjects: activeProjects.length,
    deliveryHealthPercent,
    openRisks: data.risks.filter((risk) => risk.isOpen).length,
    launchesThisMonth: activeProjects.filter((project) =>
      project.targetLaunchDate.startsWith(monthPrefix),
    ).length,
  };
}

export function buildRiskSummary(risks: Risk[]): RiskSummary {
  const openRisks = risks.filter((risk) => risk.isOpen);

  return {
    totalOpen: openRisks.length,
    byLevel: countBy(openRisks, riskLevels, (risk) => risk.level),
    byCategory: countBy(openRisks, riskCategories, (risk) => risk.category),
  };
}

export function buildHealthTrendSeries(metrics: WeeklyMetric[]): HealthTrendSeries {
  const groupedByWeek = new Map<IsoDate, WeeklyMetric[]>();

  for (const metric of metrics) {
    groupedByWeek.set(metric.weekStart, [
      ...(groupedByWeek.get(metric.weekStart) ?? []),
      metric,
    ]);
  }

  const weeks = [...groupedByWeek.keys()].sort();

  return {
    labels: weeks.map(formatWeekLabel),
    series: [
      {
        name: "Delivery Health",
        data: weeks.map((week) => {
          const weekMetrics = groupedByWeek.get(week) ?? [];
          const total = weekMetrics.reduce(
            (sum, metric) => sum + metric.healthScore,
            0,
          );

          return Math.round(total / weekMetrics.length);
        }),
      },
    ],
  };
}

function getHealthStatus(score: number): HealthStatus {
  if (score >= 88) {
    return "on-track";
  }

  if (score >= 74) {
    return "watch";
  }

  if (score >= 55) {
    return "at-risk";
  }

  return "blocked";
}

function countBy<TItem, TKey extends string>(
  items: TItem[],
  keys: readonly TKey[],
  getKey: (item: TItem) => TKey,
): Record<TKey, number> {
  const counts = Object.fromEntries(keys.map((key) => [key, 0])) as Record<
    TKey,
    number
  >;

  for (const item of items) {
    counts[getKey(item)] += 1;
  }

  return counts;
}

function formatWeekLabel(weekStart: IsoDate): string {
  const date = new Date(`${weekStart}T00:00:00Z`);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
