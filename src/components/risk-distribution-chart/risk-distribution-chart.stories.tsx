import type { Meta, StoryObj } from "@storybook/nextjs";

import { dashboardData } from "@/app/api/dashboard/mock-data";

import { ChartPanel } from "../chart-panel/chart-panel";
import { RiskDistributionChart } from "./risk-distribution-chart";

const meta = {
  title: "Components/Risk Distribution Chart",
  component: RiskDistributionChart,
  parameters: {
    layout: "centered",
  },
  args: {
    risks: dashboardData.risks,
  },
  render: (args) => (
    <div className="w-[360px] bg-ad-bg p-6">
      <ChartPanel
        title="Risk Distribution"
        description="Open risks grouped by severity across active projects."
      >
        <RiskDistributionChart {...args} />
      </ChartPanel>
    </div>
  ),
} satisfies Meta<typeof RiskDistributionChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
