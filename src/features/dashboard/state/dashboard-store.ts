import { createStore } from "zustand/vanilla";

import type {
  EntityId,
  HealthStatus,
  IsoDate,
  ProjectStatus,
} from "../types";

export type DashboardChartMode = "health" | "risk";

export type DashboardDateRange = {
  from: IsoDate;
  to: IsoDate;
};

export type DashboardUiFilters = {
  clientIds: EntityId[];
  statuses: ProjectStatus[];
  healthStatuses: HealthStatus[];
  search: string;
};

export type DashboardUiState = {
  selectedProjectId: EntityId;
  filters: DashboardUiFilters;
  dateRange: DashboardDateRange;
  chartMode: DashboardChartMode;
  isMobileDetailOpen: boolean;
};

export type DashboardUiActions = {
  selectProject: (projectId: EntityId) => void;
  toggleClientFilter: (clientId: EntityId) => void;
  setStatusFilters: (statuses: ProjectStatus[]) => void;
  setHealthFilters: (healthStatuses: HealthStatus[]) => void;
  setSearch: (search: string) => void;
  setDateRange: (dateRange: DashboardDateRange) => void;
  setChartMode: (chartMode: DashboardChartMode) => void;
  setMobileDetailOpen: (isOpen: boolean) => void;
  resetFilters: () => void;
};

export type DashboardStore = DashboardUiState & DashboardUiActions;

export const defaultDashboardState: DashboardUiState = {
  selectedProjectId: "project-resident-services-hub",
  filters: {
    clientIds: [],
    statuses: [],
    healthStatuses: [],
    search: "",
  },
  dateRange: {
    from: "2026-04-13",
    to: "2026-05-04",
  },
  chartMode: "health",
  isMobileDetailOpen: false,
};

export function createDashboardStore(
  initState: DashboardUiState = defaultDashboardState,
) {
  return createStore<DashboardStore>()((set) => ({
    ...cloneDashboardState(initState),
    selectProject: (projectId) =>
      set({
        selectedProjectId: projectId,
        isMobileDetailOpen: true,
      }),
    toggleClientFilter: (clientId) =>
      set((state) => {
        const clientIds = state.filters.clientIds.includes(clientId)
          ? state.filters.clientIds.filter((id) => id !== clientId)
          : [...state.filters.clientIds, clientId];

        return {
          filters: {
            ...state.filters,
            clientIds,
          },
        };
      }),
    setStatusFilters: (statuses) =>
      set((state) => ({
        filters: {
          ...state.filters,
          statuses: [...statuses],
        },
      })),
    setHealthFilters: (healthStatuses) =>
      set((state) => ({
        filters: {
          ...state.filters,
          healthStatuses: [...healthStatuses],
        },
      })),
    setSearch: (search) =>
      set((state) => ({
        filters: {
          ...state.filters,
          search,
        },
      })),
    setDateRange: (dateRange) => set({ dateRange: { ...dateRange } }),
    setChartMode: (chartMode) => set({ chartMode }),
    setMobileDetailOpen: (isMobileDetailOpen) => set({ isMobileDetailOpen }),
    resetFilters: () =>
      set({
        filters: cloneDashboardState(defaultDashboardState).filters,
      }),
  }));
}

function cloneDashboardState(state: DashboardUiState): DashboardUiState {
  return {
    ...state,
    filters: {
      clientIds: [...state.filters.clientIds],
      statuses: [...state.filters.statuses],
      healthStatuses: [...state.filters.healthStatuses],
      search: state.filters.search,
    },
    dateRange: {
      ...state.dateRange,
    },
  };
}
