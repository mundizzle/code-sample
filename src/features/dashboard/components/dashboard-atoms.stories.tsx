import type { Meta, StoryObj } from "@storybook/nextjs";

import type { ProjectStatus } from "../types";
import { MetricCard, StatusBadge } from "./dashboard-view";

const meta = {
  title: "Dashboard/Atoms",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const MetricCardExample: Story = {
  name: "Metric Card",
  args: {
    label: "Delivery Health",
    value: "86%",
    delta: "+4%",
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    delta: { control: "text" },
  },
  render: ({ label, value, delta }) => (
    <div className="w-64 bg-ad-bg p-6">
      <MetricCard
        label={String(label)}
        value={String(value)}
        delta={String(delta)}
        tone="text"
      />
    </div>
  ),
};

export const MetricCards: Story = {
  name: "Metric Card Group",
  render: () => (
    <div className="grid w-[720px] grid-cols-3 gap-4 bg-ad-bg p-6">
      <MetricCard label="Active Projects" value="5" delta="+2" tone="text" />
      <MetricCard label="Delivery Health" value="86%" delta="+4%" tone="text" />
      <MetricCard label="Open Risks" value="8" delta="-2" tone="text" />
    </div>
  ),
};

export const StatusBadgeExample: Story = {
  name: "Status Badge",
  args: {
    status: "launching" satisfies ProjectStatus,
  },
  argTypes: {
    status: {
      control: "select",
      options: ["discovery", "in-progress", "at-risk", "blocked", "launching", "complete"],
    },
  },
  render: ({ status }) => (
    <div className="bg-ad-bg p-6">
      <StatusBadge status={status as ProjectStatus} />
    </div>
  ),
};

export const StatusBadges: Story = {
  name: "Status Badge Group",
  render: () => (
    <div className="flex flex-wrap gap-3 bg-ad-bg p-6">
      <StatusBadge status="launching" />
      <StatusBadge status="in-progress" />
      <StatusBadge status="at-risk" />
      <StatusBadge status="blocked" />
      <StatusBadge status="complete" />
    </div>
  ),
};
