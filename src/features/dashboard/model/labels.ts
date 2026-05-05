import type { HealthStatus, ProjectStatus } from "./types";

export const projectStatusLabels: Record<ProjectStatus, string> = {
  discovery: "Discovery",
  "in-progress": "In progress",
  "at-risk": "At risk",
  blocked: "Blocked",
  launching: "Launching",
  complete: "Complete",
};

export const healthStatusLabels: Record<HealthStatus, string> = {
  "on-track": "On track",
  watch: "Watch",
  "at-risk": "At risk",
  blocked: "Blocked",
};
