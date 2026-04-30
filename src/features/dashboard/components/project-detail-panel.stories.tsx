import type { Meta, StoryObj } from "@storybook/nextjs";

import { dashboardData } from "../data/fixtures";
import { ProjectDetailPanel } from "./project-detail-panel";

const selectedProject = dashboardData.projects.find(
  (project) => project.id === "project-resident-services-hub",
);
const projectOptions = ["none", ...dashboardData.projects.map((project) => project.id)];
const projectOptionLabels = Object.fromEntries([
  ["none", "None"],
  ...dashboardData.projects.map((project) => [project.id, project.name]),
]);
const projectOptionMapping = Object.fromEntries([
  ["none", undefined],
  ...dashboardData.projects.map((project) => [project.id, project]),
]);

const meta = {
  title: "Dashboard/Components/Project Detail Panel",
  component: ProjectDetailPanel,
  parameters: {
    layout: "centered",
  },
  args: {
    project: selectedProject,
  },
  argTypes: {
    project: {
      control: "select",
      options: projectOptions,
      mapping: projectOptionMapping,
      labels: projectOptionLabels,
    },
  },
  render: (args) => (
    <div className="w-[360px] bg-ad-bg p-6">
      <ProjectDetailPanel {...args} />
    </div>
  ),
} satisfies Meta<typeof ProjectDetailPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    project: undefined,
  },
};

export const ContainerWidths: Story = {
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
