import type { Meta, StoryObj } from "@storybook/nextjs";
import { delay, http, HttpResponse } from "msw";

import { AppProviders } from "@/app/providers";
import { DashboardBoundary } from "./dashboard-boundary";
import { DashboardStoreProvider } from "./state/dashboard-store-provider";

import { Dashboard } from "./dashboard";

const meta = {
  title: "Views/Dashboard",
  component: Dashboard,
  decorators: [
    (Story) => (
      <AppProviders>
        <DashboardStoreProvider>
          <DashboardBoundary>
            <Story />
          </DashboardBoundary>
        </DashboardStoreProvider>
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

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/dashboard", async () => {
          await delay("infinite");
          return HttpResponse.json({});
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/dashboard", () =>
          HttpResponse.json({ message: "Dashboard unavailable" }, { status: 500 }),
        ),
      ],
    },
  },
};
