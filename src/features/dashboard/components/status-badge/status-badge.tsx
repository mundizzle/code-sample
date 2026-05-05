import { projectStatusLabels } from "../../model/labels";
import type { ProjectStatus } from "../../model/types";

export type StatusBadgeProps = {
  status: ProjectStatus;
};

const statusToneClasses: Record<ProjectStatus, string> = {
  discovery: "bg-ad-text-muted",
  "in-progress": "bg-ad-accent",
  "at-risk": "bg-ad-warning",
  blocked: "bg-ad-danger",
  launching: "bg-ad-success",
  complete: "bg-ad-text-muted",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-ad-sm border border-ad-border bg-ad-bg px-2.5 py-1 text-xs font-medium text-ad-text-muted">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${statusToneClasses[status]}`}
      />
      {projectStatusLabels[status]}
    </span>
  );
}
