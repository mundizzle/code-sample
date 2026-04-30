import type { Meta, StoryObj } from "@storybook/nextjs";

import { AppProviders } from "@/app/providers";

import { DashboardView } from "./dashboard-view";

const meta = {
  title: "Dashboard/Dashboard View",
  component: DashboardView,
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Responsive agency delivery dashboard using fixture-backed server state, UI-only Zustand state, ECharts, and semantic Tailwind tokens.",
      },
    },
  },
} satisfies Meta<typeof DashboardView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {};
