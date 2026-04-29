export type EntityId = string;
export type IsoDate = `${number}-${number}-${number}`;

export const projectStatuses = [
  "discovery",
  "in-progress",
  "at-risk",
  "blocked",
  "launching",
  "complete",
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export const healthStatuses = ["on-track", "watch", "at-risk", "blocked"] as const;

export type HealthStatus = (typeof healthStatuses)[number];

export const riskLevels = ["low", "medium", "high", "critical"] as const;

export type RiskLevel = (typeof riskLevels)[number];

export const riskCategories = [
  "accessibility",
  "content",
  "data",
  "dependency",
  "scope",
  "staffing",
] as const;

export type RiskCategory = (typeof riskCategories)[number];

export const milestoneStatuses = ["upcoming", "in-progress", "done", "missed"] as const;

export type MilestoneStatus = (typeof milestoneStatuses)[number];

export type WorkModel = "remote" | "hybrid" | "onsite";

export type Client = {
  id: EntityId;
  name: string;
  industry: string;
  accountLead: string;
  workModel: WorkModel;
};

export type ProjectHealth = {
  status: HealthStatus;
  score: number;
  budgetVariancePercent: number;
  scheduleVarianceDays: number;
  openRiskCount: number;
};

export type Project = {
  id: EntityId;
  clientId: EntityId;
  name: string;
  status: ProjectStatus;
  owner: string;
  summary: string;
  startDate: IsoDate;
  targetLaunchDate: IsoDate;
  budgetUsd: number;
  spentUsd: number;
  progressPercent: number;
  teamSize: number;
  health: ProjectHealth;
};

export type Milestone = {
  id: EntityId;
  projectId: EntityId;
  title: string;
  owner: string;
  dueDate: IsoDate;
  status: MilestoneStatus;
};

export type Risk = {
  id: EntityId;
  projectId: EntityId;
  title: string;
  level: RiskLevel;
  category: RiskCategory;
  owner: string;
  openedAt: IsoDate;
  mitigation: string;
  isOpen: boolean;
};

export type WeeklyMetric = {
  projectId: EntityId;
  weekStart: IsoDate;
  healthScore: number;
  budgetUsedPercent: number;
  timelineUsedPercent: number;
  completedMilestones: number;
  openedRisks: number;
};

export type TeamAllocation = {
  projectId: EntityId;
  discipline: "strategy" | "design" | "engineering" | "qa" | "delivery";
  allocatedHours: number;
  capacityHours: number;
};

export type DashboardData = {
  clients: Client[];
  projects: Project[];
  milestones: Milestone[];
  risks: Risk[];
  weeklyMetrics: WeeklyMetric[];
  teamAllocations: TeamAllocation[];
};
