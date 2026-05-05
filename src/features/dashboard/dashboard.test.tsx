import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DashboardBoundary } from "./dashboard-boundary";
import { createDashboardQueryClient } from "./data/query/dashboard-query";
import { dashboardData } from "@/features/dashboard/data/mock-data";
import {
  defaultDashboardState,
  type DashboardUiState,
} from "./state/dashboard-store";
import { DashboardStoreProvider } from "./state/dashboard-store-provider";
import { Dashboard } from "./dashboard";

function renderDashboard(initialState?: DashboardUiState) {
  return render(
    <QueryClientProvider client={createDashboardQueryClient()}>
      <DashboardStoreProvider initialState={initialState}>
        <DashboardBoundary>
          <Dashboard />
        </DashboardBoundary>
      </DashboardStoreProvider>
    </QueryClientProvider>,
  );
}

describe("Dashboard", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json(dashboardData)));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the product dashboard content", async () => {
    renderDashboard();

    expect(
      await screen.findByRole("heading", { name: "Delivery Command Center" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Track client delivery health, launch readiness, and open risks across active accounts.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      await screen.findByRole("complementary", { name: "Dashboard filters" }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Active Projects")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Delivery Health")).toBeInTheDocument();
    expect(screen.getByText("Open Risks")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Launches")).toBeInTheDocument();
    expect(screen.getByText("Health Trend")).toBeInTheDocument();
    expect(screen.getByText("Risk Distribution")).toBeInTheDocument();
    expect(screen.getByText("Loading health trend chart...")).toBeInTheDocument();
    expect(screen.getByText("Loading risk distribution chart...")).toBeInTheDocument();
    expect(screen.queryByText("Budget vs Timeline")).not.toBeInTheDocument();
    expect(await screen.findAllByText("Resident Services Hub")).toHaveLength(2);
    expect(screen.getByText("Selected Project")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Project list" })).toBeInTheDocument();
    expect(screen.getByText("5 of 5 shown")).toBeInTheDocument();
    expect(screen.getByText("Care Pathways")).toBeInTheDocument();
    expect(screen.getByText("Marketplace Refresh")).toBeInTheDocument();
    expect(screen.getByText("Grant Eligibility Portal")).toBeInTheDocument();
    expect(screen.getByText("Loyalty Insights")).toBeInTheDocument();
  });

  it("keeps implementation commentary out of the product UI", async () => {
    renderDashboard();

    await screen.findAllByText("Resident Services Hub");
    expect(screen.queryByText(/ECharts-ready/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Zustand/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/design token/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/code sample/i)).not.toBeInTheDocument();
  });

  it("filters projects by client chip", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findAllByText("Resident Services Hub");
    await user.click(screen.getByRole("button", { name: "CivicWorks", pressed: false }));

    const projectList = screen.getByRole("region", { name: "Projects" });
    expect(within(projectList).getByText("Resident Services Hub")).toBeInTheDocument();
    expect(within(projectList).getByText("Grant Eligibility Portal")).toBeInTheDocument();
    expect(within(projectList).queryByText("Care Pathways")).not.toBeInTheDocument();
    expect(within(projectList).getByText("2 of 5 shown")).toBeInTheDocument();
    expect(screen.getByText("74%")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("allows all client filters to be unselected", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findAllByText("Resident Services Hub");

    const civicWorksButton = screen.getByRole("button", {
      name: "CivicWorks",
      pressed: false,
    });
    expect(civicWorksButton).toBeInTheDocument();

    await user.click(civicWorksButton);
    expect(
      screen.getByRole("button", { name: "CivicWorks", pressed: true }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "CivicWorks", pressed: true }));
    expect(
      screen.getByRole("button", { name: "CivicWorks", pressed: false }),
    ).toBeInTheDocument();
    expect(screen.getByText("5 of 5 shown")).toBeInTheDocument();
  });

  it("shows filtered project count against the full project total", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findAllByText("Resident Services Hub");
    await user.click(screen.getByRole("button", { name: "Northstar Health" }));

    const projectList = screen.getByRole("region", { name: "Projects" });
    expect(within(projectList).getByText("Care Pathways")).toBeInTheDocument();
    expect(within(projectList).getByText("1 of 5 shown")).toBeInTheDocument();
    const detail = screen.getByRole("region", { name: "Selected Project" });
    expect(within(detail).getByText("Care Pathways")).toBeInTheDocument();
    expect(within(detail).getByText("Owner: Jordan Lee")).toBeInTheDocument();
    expect(screen.getByText("96%")).toBeInTheDocument();
  });

  it("keeps the selected project coherent with initial and changed client filters", async () => {
    const user = userEvent.setup();
    renderDashboard({
      ...defaultDashboardState,
      filters: {
        ...defaultDashboardState.filters,
        clientIds: ["client-market-lane"],
      },
    });

    await screen.findAllByText("Marketplace Refresh");
    expect(
      screen.getByRole("button", { name: "Market Lane", pressed: true }),
    ).toBeInTheDocument();

    let detail = screen.getByRole("region", { name: "Selected Project" });
    expect(within(detail).getByText("Marketplace Refresh")).toBeInTheDocument();
    expect(within(detail).getByText("Owner: Priya Shah")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Market Lane", pressed: true }));
    await user.click(screen.getByRole("button", { name: "Northstar Health" }));

    const projectList = screen.getByRole("region", { name: "Projects" });
    expect(within(projectList).getByText("Care Pathways")).toBeInTheDocument();
    expect(within(projectList).queryByText("Resident Services Hub")).not.toBeInTheDocument();

    detail = screen.getByRole("region", { name: "Selected Project" });
    expect(within(detail).getByText("Care Pathways")).toBeInTheDocument();
    expect(within(detail).getByText("Owner: Jordan Lee")).toBeInTheDocument();
  });

  it("stacks client controls in narrow containers and lets them wrap in wide containers", async () => {
    renderDashboard();

    const civicWorksButton = await screen.findByRole("button", { name: "CivicWorks" });
    const chipStack = civicWorksButton.parentElement;
    const filterPanel = screen.getByRole("complementary", { name: "Dashboard filters" });

    expect(filterPanel).toHaveClass("@container/filter-panel");
    expect(chipStack).toHaveClass("flex-col");
    expect(chipStack).toHaveClass("@sm/filter-panel:flex-row");
    expect(chipStack).toHaveClass("@sm/filter-panel:flex-wrap");
    expect(civicWorksButton).toHaveClass("w-full");
    expect(civicWorksButton).toHaveClass("@sm/filter-panel:w-auto");
    expect(civicWorksButton).toHaveAttribute("aria-pressed", "false");

    const supportingCopy = screen.getByText(
      "Focus the portfolio by client to review delivery health and launch readiness.",
    );
    expect(supportingCopy).toHaveClass("w-full");
    expect(supportingCopy).not.toHaveClass("max-w-40");
  });

  it("updates selected project details from the project list", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findAllByText("Resident Services Hub");
    await user.click(screen.getByRole("button", { name: /Marketplace Refresh/i }));

    const detail = screen.getByRole("region", { name: "Selected Project" });
    expect(within(detail).getByText("Marketplace Refresh")).toBeInTheDocument();
    expect(within(detail).getByText("Owner: Priya Shah")).toBeInTheDocument();
  });

  it("marks the project detail panel as the container-query example", async () => {
    renderDashboard();

    const detail = await screen.findByRole("region", { name: "Selected Project" });
    expect(detail).toHaveClass("@container/project-detail");
  });
});
