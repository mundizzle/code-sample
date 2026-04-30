import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { dashboardData } from "../data/fixtures";
import {
  ChartPanel,
  DashboardHeader,
  FilterPanel,
  ProjectDetailPanel,
  ProjectList,
} from "./dashboard-view";

const selectedProject = dashboardData.projects.find(
  (project) => project.id === "project-resident-services-hub",
);
const projectOptions = ["none", ...dashboardData.projects.map((project) => project.id)];
const projectOptionLabels = Object.fromEntries([
  ["none", "None"],
  ...dashboardData.projects.map((project) => [project.id, project.name]),
]);

const meta = {
  title: "Dashboard/Panels",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Header: Story = {
  render: () => (
    <div className="w-[720px] bg-ad-bg p-6">
      <DashboardHeader />
    </div>
  ),
};

export const Filters: Story = {
  args: {
    selectedClientIds: ["client-civicworks"],
    onToggleClient: fn(),
  },
  argTypes: {
    selectedClientIds: {
      control: "check",
      options: dashboardData.clients.map((client) => client.id),
      mapping: Object.fromEntries(dashboardData.clients.map((client) => [client.id, client.id])),
      labels: Object.fromEntries(dashboardData.clients.map((client) => [client.id, client.name])),
    },
    onToggleClient: { action: "toggle client" },
  },
  render: ({ selectedClientIds, onToggleClient }) => (
    <div className="w-[260px] bg-ad-bg p-6">
      <FilterPanel
        clients={dashboardData.clients}
        selectedClientIds={selectedClientIds as string[]}
        onToggleClient={onToggleClient as (clientId: string) => void}
      />
    </div>
  ),
};

export const ChartShell: Story = {
  args: {
    title: "Health Trend",
    description: "Average project health over the last four reporting weeks.",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
  render: ({ title, description }) => (
    <div className="w-[520px] bg-ad-bg p-6">
      <ChartPanel
        title={String(title)}
        description={String(description)}
      >
        <div className="grid h-48 place-items-center rounded-ad-sm border border-dashed border-ad-border bg-ad-bg text-sm text-ad-text-muted">
          Chart content
        </div>
      </ChartPanel>
    </div>
  ),
};

export const Projects: Story = {
  args: {
    selectedProjectId: "project-resident-services-hub",
    projectCount: 3,
    onSelectProject: fn(),
  },
  argTypes: {
    selectedProjectId: {
      control: "select",
      options: dashboardData.projects.map((project) => project.id),
      labels: projectOptionLabels,
    },
    projectCount: {
      control: { type: "range", min: 0, max: dashboardData.projects.length, step: 1 },
    },
    onSelectProject: { action: "select project" },
  },
  render: ({ selectedProjectId, projectCount, onSelectProject }) => (
    <div className="w-[760px] bg-ad-bg p-6">
      <ProjectList
        clients={dashboardData.clients}
        projects={dashboardData.projects.slice(0, Number(projectCount))}
        selectedProjectId={String(selectedProjectId)}
        onSelectProject={onSelectProject as (projectId: string) => void}
      />
    </div>
  ),
};

export const ProjectDetail: Story = {
  args: {
    projectId: "project-resident-services-hub",
  },
  argTypes: {
    projectId: {
      control: "select",
      options: projectOptions,
      labels: projectOptionLabels,
    },
  },
  render: ({ projectId }) => (
    <div className="w-[360px] bg-ad-bg p-6">
      <ProjectDetailPanel
        project={
          projectId === "none"
            ? undefined
            : dashboardData.projects.find((project) => project.id === projectId)
        }
      />
    </div>
  ),
};

export const ProjectDetailEmpty: Story = {
  render: () => (
    <div className="w-[360px] bg-ad-bg p-6">
      <ProjectDetailPanel />
    </div>
  ),
};

export const ProjectDetailContainerWidths: Story = {
  render: () => (
    <div className="grid gap-6 bg-ad-bg p-6">
      <div className="w-[300px]">
        <ProjectDetailPanel project={selectedProject} />
      </div>
      <div className="w-[620px]">
        <ProjectDetailPanel project={selectedProject} />
      </div>
      <div className="w-[920px]">
        <ProjectDetailPanel project={selectedProject} />
      </div>
    </div>
  ),
};
