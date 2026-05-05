import { dashboardData } from "@/features/dashboard/data/mock-data";

export const dynamic = "force-static";

// Returns the fixed fixture payload that backs the dashboard demo.
export function GET() {
  return Response.json(dashboardData);
}
