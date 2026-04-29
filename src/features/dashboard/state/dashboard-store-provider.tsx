"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useStore } from "zustand";

import {
  createDashboardStore,
  type DashboardStore,
  type DashboardUiState,
} from "./dashboard-store";

export type DashboardStoreApi = ReturnType<typeof createDashboardStore>;

const DashboardStoreContext = createContext<DashboardStoreApi | null>(null);

export type DashboardStoreProviderProps = {
  children: ReactNode;
  initialState?: DashboardUiState;
};

export function DashboardStoreProvider({
  children,
  initialState,
}: DashboardStoreProviderProps) {
  const [store] = useState(() => createDashboardStore(initialState));

  return (
    <DashboardStoreContext.Provider value={store}>
      {children}
    </DashboardStoreContext.Provider>
  );
}

export function useDashboardStore<T>(
  selector: (state: DashboardStore) => T,
): T {
  const store = useContext(DashboardStoreContext);

  if (store === null) {
    throw new Error("useDashboardStore must be used within DashboardStoreProvider");
  }

  return useStore(store, selector);
}
