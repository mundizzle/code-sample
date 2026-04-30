import { projectStatusLabels } from "../labels";
import type { ProjectStatus } from "../types";

export type StatusBadgeProps = {
  status: ProjectStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex w-fit rounded-ad-sm border border-ad-border bg-ad-bg px-2.5 py-1 text-xs font-medium text-ad-text-muted">
      {projectStatusLabels[status]}
    </span>
  );
}
