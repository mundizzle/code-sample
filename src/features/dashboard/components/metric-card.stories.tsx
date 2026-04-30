import type { Meta, StoryObj } from "@storybook/nextjs";

import { MetricCard } from "./metric-card";

const meta = {
  title: "Dashboard/Components/Metric Card",
  component: MetricCard,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Delivery Health",
    value: "86%",
    delta: "+4%",
    tone: "text",
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    delta: { control: "text" },
    tone: { table: { disable: true } },
  },
  render: (args) => (
    <div className="w-64 bg-ad-bg p-6">
      <MetricCard {...args} />
    </div>
  ),
} satisfies Meta<typeof MetricCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  render: () => (
    <div className="grid w-[720px] grid-cols-3 gap-4 bg-ad-bg p-6">
      <MetricCard label="Active Projects" value="5" delta="+2" tone="text" />
      <MetricCard label="Delivery Health" value="86%" delta="+4%" tone="text" />
      <MetricCard label="Open Risks" value="8" delta="-2" tone="text" />
    </div>
  ),
};
