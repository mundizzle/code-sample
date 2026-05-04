import { http, HttpResponse } from "msw";

import { dashboardData } from "@/app/api/dashboard/mock-data";

export const dashboardMockHandlers = [
  http.get("/api/dashboard", () => HttpResponse.json(dashboardData)),
];
