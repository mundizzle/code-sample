import { http, HttpResponse } from "msw";

import { dashboardData } from "@/features/dashboard/data/mock-data";

export const dashboardMockHandlers = [
  http.get("/api/dashboard", () => HttpResponse.json(dashboardData)),
];
