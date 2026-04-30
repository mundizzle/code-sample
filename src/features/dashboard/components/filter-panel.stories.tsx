import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { dashboardData } from "../data/fixtures";
import { FilterPanel } from "./filter-panel";

const clientOptions = dashboardData.clients.map((client) => client.id);
const clientOptionLabels = Object.fromEntries(
  dashboardData.clients.map((client) => [client.id, client.name]),
);

const meta = {
  title: "Dashboard/Components/Filter Panel",
  component: FilterPanel,
  parameters: {
    layout: "centered",
  },
  args: {
    clients: dashboardData.clients,
    selectedClientIds: ["client-civicworks"],
    onToggleClient: fn(),
  },
  argTypes: {
    clients: { table: { disable: true } },
    selectedClientIds: {
      control: "check",
      options: clientOptions,
      labels: clientOptionLabels,
    },
    onToggleClient: { action: "toggle client" },
  },
  render: (args) => (
    <div className="w-[260px] bg-ad-bg p-6">
      <FilterPanel {...args} />
    </div>
  ),
} satisfies Meta<typeof FilterPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Wide: Story = {
  render: (args) => (
    <div className="w-[720px] bg-ad-bg p-6">
      <FilterPanel {...args} />
    </div>
  ),
};
