import type { ReactNode } from "react";

import { formatCompactNumber, formatMonthYear } from "../formatters";
import { healthStatusLabels, projectStatusLabels } from "../labels";
import type { Project } from "../types";

export type ProjectDetailPanelProps = {
  project?: Project;
};

export function ProjectDetailPanel({ project }: ProjectDetailPanelProps) {
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
          <p>Status: {projectStatusLabels[project.status]}</p>
        </DetailBlock>
        <DetailBlock label="Progress">
          <p>{project.progressPercent}% complete</p>
          <p>{project.teamSize} team members</p>
          <p>${formatCompactNumber(project.spentUsd)} spent</p>
        </DetailBlock>
        <DetailBlock label="Risk">
          <p>{healthStatusLabels[project.health.status]}</p>
          <p>{project.health.openRiskCount} open risks</p>
          <p>{project.health.scheduleVarianceDays} schedule variance days</p>
        </DetailBlock>
      </div>
    </section>
  );
}

type DetailBlockProps = {
  label: string;
  children: ReactNode;
};

function DetailBlock({ label, children }: DetailBlockProps) {
  return (
    <div className="rounded-ad-sm border border-ad-border bg-ad-bg p-3 text-sm">
      <h3 className="font-medium text-ad-text">{label}</h3>
      <div className="mt-2 grid gap-1 text-ad-text-muted">{children}</div>
    </div>
  );
}
