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
    expect(screen.getByRole("complementary", { name: "Dashboard filters" })).toBeInTheDocument();
    expect(await screen.findByText("Active Projects")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Delivery Health")).toBeInTheDocument();
    expect(screen.getByText("Open Risks")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Launches")).toBeInTheDocument();
    expect(screen.getByText("Health Trend")).toBeInTheDocument();
    expect(screen.getByText("Risk Distribution")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Weekly delivery health scores" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Open risk distribution by severity" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Budget vs Timeline")).not.toBeInTheDocument();
    expect(await screen.findAllByText("Resident Services Hub")).toHaveLength(2);
    expect(screen.getByText("Selected Project")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Project list" })).toBeInTheDocument();
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
    await user.click(screen.getByRole("button", { name: "CivicWorks", pressed: true }));

    const projectList = screen.getByRole("region", { name: "Projects" });
    expect(within(projectList).getByText("Resident Services Hub")).toBeInTheDocument();
    expect(within(projectList).getByText("Grant Eligibility Portal")).toBeInTheDocument();
    expect(within(projectList).queryByText("Care Pathways")).not.toBeInTheDocument();
  });

  it("stacks client controls on phones and lets them wrap horizontally on tablets", async () => {
    renderDashboard();

    const civicWorksButton = await screen.findByRole("button", { name: "CivicWorks" });
    const chipStack = civicWorksButton.parentElement;

    expect(chipStack).toHaveClass("flex-col");
    expect(chipStack).toHaveClass("sm:flex-row");
    expect(chipStack).toHaveClass("sm:flex-wrap");
    expect(civicWorksButton).toHaveClass("w-full");
    expect(civicWorksButton).toHaveClass("sm:w-auto");

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
