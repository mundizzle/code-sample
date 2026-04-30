import type { Meta, StoryObj } from "@storybook/nextjs";

import { ChartPanel } from "./chart-panel";

type ChartPanelStoryArgs = {
  title: string;
  description: string;
};

const meta = {
  title: "Dashboard/Components/Chart Panel",
  parameters: {
    layout: "centered",
  },
  args: {
    title: "Health Trend",
    description: "Average project health over the last four reporting weeks.",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
  render: (args) => (
    <div className="w-[520px] bg-ad-bg p-6">
      <ChartPanel {...args}>
        <div className="grid h-48 place-items-center rounded-ad-sm border border-dashed border-ad-border bg-ad-bg text-sm text-ad-text-muted">
          Chart content
        </div>
      </ChartPanel>
    </div>
  ),
} satisfies Meta<ChartPanelStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
