import type { Meta, StoryObj } from "@storybook/nextjs";

import { projectStatuses } from "../types";
import { StatusBadge } from "./status-badge";

const meta = {
  title: "Dashboard/Components/Status Badge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
  },
  args: {
    status: "launching",
  },
  argTypes: {
    status: {
      control: "select",
      options: projectStatuses,
    },
  },
  render: (args) => (
    <div className="bg-ad-bg p-6">
      <StatusBadge {...args} />
    </div>
  ),
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
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
