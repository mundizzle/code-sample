import type { Client, Project } from "../types";
import { StatusBadge } from "./status-badge";

export type ProjectListProps = {
  clients: Client[];
  projects: Project[];
  selectedProjectId?: string;
  onSelectProject: (projectId: string) => void;
};

export function ProjectList({
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

function getClientName(clients: Client[], clientId: string): string {
  return clients.find((client) => client.id === clientId)?.name ?? "Unknown client";
}
