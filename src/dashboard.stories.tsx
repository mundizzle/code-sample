import type { Meta, StoryObj } from "@storybook/nextjs";

import { AppProviders } from "@/app/providers";

import { Dashboard } from "./dashboard";

const meta = {
  title: "Dashboard",
  component: Dashboard,
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
} satisfies Meta<typeof Dashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
