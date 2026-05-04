import { dashboardData } from "@/features/dashboard/data/fixtures";

export function GET() {
  return Response.json(dashboardData);
}
