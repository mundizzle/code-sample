import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { createDashboardQueryClient } from "../data/dashboard-query";
import { DashboardStoreProvider } from "../state/dashboard-store-provider";
import { DashboardView } from "./dashboard-view";

function renderDashboard() {
  return render(
    <QueryClientProvider client={createDashboardQueryClient()}>
      <DashboardStoreProvider>
        <DashboardView />
      </DashboardStoreProvider>
    </QueryClientProvider>,
  );
}

describe("DashboardView", () => {
  it("renders the Figma-aligned dashboard content", async () => {
    renderDashboard();

    expect(
      await screen.findByRole("heading", { name: "Delivery Command Center" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Dashboard filters" })).toBeInTheDocument();
    expect(screen.getByText("Active Projects")).toBeInTheDocument();
    expect(screen.getByText("Delivery Health")).toBeInTheDocument();
    expect(screen.getByText("Open Risks")).toBeInTheDocument();
    expect(screen.getByText("Launches This Month")).toBeInTheDocument();
    expect(screen.getByText("Health Trend")).toBeInTheDocument();
    expect(screen.getByText("Risk Distribution")).toBeInTheDocument();
    expect(screen.getByText("Budget vs Timeline")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Weekly delivery health scores" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Open risk distribution by severity" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Project budget used compared with timeline used",
      }),
    ).toBeInTheDocument();
    expect(await screen.findAllByText("Resident Services Hub")).toHaveLength(2);
    expect(screen.getByText("Selected Project")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Project list" })).toBeInTheDocument();
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
  });

  it("filters projects by search", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findAllByText("Resident Services Hub");
    await user.type(screen.getByRole("searchbox", { name: /Search projects/i }), "loyalty");

    const projectList = screen.getByRole("region", { name: "Projects" });
    expect(within(projectList).getByText("Loyalty Insights")).toBeInTheDocument();
    expect(within(projectList).queryByText("Resident Services Hub")).not.toBeInTheDocument();
  });

  it("updates selected project details from the project list", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findAllByText("Resident Services Hub");
    await user.click(screen.getByRole("button", { name: /Care Pathways/i }));

    const detail = screen.getByRole("region", { name: "Selected Project" });
    expect(within(detail).getByText("Care Pathways")).toBeInTheDocument();
    expect(within(detail).getByText("Owner: Jordan Lee")).toBeInTheDocument();
  });

  it("marks the project detail panel as the container-query example", async () => {
    renderDashboard();

    const detail = await screen.findByRole("region", { name: "Selected Project" });
    expect(detail).toHaveClass("@container/project-detail");
  });
});
