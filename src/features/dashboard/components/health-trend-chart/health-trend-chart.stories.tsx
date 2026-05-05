import type { Meta, StoryObj } from "@storybook/nextjs";

import { dashboardData } from "@/features/dashboard/data/mock-data";

import { ChartPanel } from "../chart-panel/chart-panel";
import { HealthTrendChart } from "./health-trend-chart";

const meta = {
  title: "Components/Health Trend Chart",
  component: HealthTrendChart,
  parameters: {
    layout: "centered",
  },
  args: {
    metrics: dashboardData.weeklyMetrics,
  },
  render: (args) => (
    <div className="w-[520px] bg-ad-bg p-6">
      <ChartPanel
        title="Health Trend"
        description="Average project health over the last four reporting weeks."
      >
        <HealthTrendChart {...args} />
      </ChartPanel>
    </div>
  ),
} satisfies Meta<typeof HealthTrendChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
