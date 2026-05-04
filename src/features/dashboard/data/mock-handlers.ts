import { http, HttpResponse } from "msw";

import { dashboardData } from "./fixtures";

export const dashboardMockHandlers = [
  http.get("/api/dashboard", () => HttpResponse.json(dashboardData)),
];
