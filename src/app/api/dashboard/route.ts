import { dashboardData } from "@/features/dashboard/data/mock-data";

export const dynamic = "force-static";

export function GET() {
  return Response.json(dashboardData);
}
