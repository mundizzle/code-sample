import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { dashboardData } from "../data/fixtures";
import { ProjectList } from "./project-list";

const projectOptions = dashboardData.projects.map((project) => project.id);
const projectOptionLabels = Object.fromEntries(
  dashboardData.projects.map((project) => [project.id, project.name]),
);

const meta = {
  title: "Dashboard/Components/Project List",
  component: ProjectList,
  parameters: {
    layout: "centered",
  },
  args: {
    clients: dashboardData.clients,
    projects: dashboardData.projects.slice(0, 3),
    selectedProjectId: "project-resident-services-hub",
    totalProjectCount: dashboardData.projects.length,
    onSelectProject: fn(),
  },
  argTypes: {
    clients: { table: { disable: true } },
    projects: { table: { disable: true } },
    totalProjectCount: { control: "number" },
    selectedProjectId: {
      control: "select",
      options: projectOptions,
      labels: projectOptionLabels,
    },
    onSelectProject: { action: "select project" },
  },
  render: (args) => (
    <div className="w-[760px] bg-ad-bg p-6">
      <ProjectList {...args} />
    </div>
  ),
} satisfies Meta<typeof ProjectList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    projects: [],
    selectedProjectId: undefined,
  },
};
