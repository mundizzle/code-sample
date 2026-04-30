import type { Meta, StoryObj } from "@storybook/nextjs";

import { DashboardHeader } from "./dashboard-header";

const meta = {
  title: "Dashboard/Components/Dashboard Header",
  component: DashboardHeader,
  parameters: {
    layout: "centered",
  },
  render: () => (
    <div className="w-[720px] bg-ad-bg p-6">
      <DashboardHeader />
    </div>
  ),
} satisfies Meta<typeof DashboardHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
