import { dashboardData } from "@/features/dashboard/data/mock-data";

export function GET() {
  return Response.json(dashboardData);
}
