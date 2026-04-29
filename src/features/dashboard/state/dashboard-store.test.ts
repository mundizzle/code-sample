import { describe, expect, it } from "vitest";

import { createDashboardStore, defaultDashboardState } from "./dashboard-store";

describe("dashboard store", () => {
  it("starts with the Resident Services Hub selected and no filters applied", () => {
    const store = createDashboardStore();

    expect(store.getState()).toMatchObject({
      ...defaultDashboardState,
      selectedProjectId: "project-resident-services-hub",
      filters: {
        clientIds: [],
        statuses: [],
        healthStatuses: [],
        search: "",
      },
    });
  });

  it("updates selected project and mobile detail panel state", () => {
    const store = createDashboardStore();

    store.getState().selectProject("project-care-pathways");
    store.getState().setMobileDetailOpen(true);

    expect(store.getState().selectedProjectId).toBe("project-care-pathways");
    expect(store.getState().isMobileDetailOpen).toBe(true);
  });

  it("toggles client filters without duplicating ids", () => {
    const store = createDashboardStore();

    store.getState().toggleClientFilter("client-civicworks");
    store.getState().toggleClientFilter("client-civicworks");
    store.getState().toggleClientFilter("client-market-lane");

    expect(store.getState().filters.clientIds).toEqual(["client-market-lane"]);
  });

  it("sets compound filters and resets them without clearing selected project", () => {
    const store = createDashboardStore({
      ...defaultDashboardState,
      selectedProjectId: "project-care-pathways",
    });

    store.getState().setStatusFilters(["launching", "at-risk"]);
    store.getState().setHealthFilters(["watch"]);
    store.getState().setSearch(" content ");
    store.getState().resetFilters();

    expect(store.getState().selectedProjectId).toBe("project-care-pathways");
    expect(store.getState().filters).toEqual(defaultDashboardState.filters);
  });

  it("updates date range and chart mode independently of filters", () => {
    const store = createDashboardStore();

    store.getState().setDateRange({
      from: "2026-05-01",
      to: "2026-05-31",
    });
    store.getState().setChartMode("risk");

    expect(store.getState().dateRange).toEqual({
      from: "2026-05-01",
      to: "2026-05-31",
    });
    expect(store.getState().chartMode).toBe("risk");
    expect(store.getState().filters).toEqual(defaultDashboardState.filters);
  });
});
