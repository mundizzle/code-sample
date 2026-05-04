import { dashboardData } from "@/app/api/dashboard/mock-data";

export function GET() {
  return Response.json(dashboardData);
}
