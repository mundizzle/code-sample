import { Dashboard } from "@/features/dashboard/dashboard";
import { DashboardBoundary } from "@/features/dashboard/dashboard-boundary";
import {
  defaultDashboardState,
  type DashboardUiState,
} from "@/features/dashboard/state/dashboard-store";
import { DashboardStoreProvider } from "@/features/dashboard/state/dashboard-store-provider";

type HomeProps = {
  searchParams: Promise<{
    client?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const clientIds = parseClientIds(params.client);
  const initialState: DashboardUiState = {
    ...defaultDashboardState,
    filters: {
      ...defaultDashboardState.filters,
      clientIds,
    },
  };

  return (
    <DashboardStoreProvider initialState={initialState}>
      <DashboardBoundary>
        <Dashboard />
      </DashboardBoundary>
    </DashboardStoreProvider>
  );
}

function parseClientIds(client: string | string[] | undefined): string[] {
  const values = Array.isArray(client) ? client : [client];

  return values.filter(
    (value): value is string => typeof value === "string" && value.length > 0,
  );
}
