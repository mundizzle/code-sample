import { describe, expect, it } from "vitest";

import { GET } from "./route";

describe("GET /api/dashboard", () => {
  it("returns the dashboard mock API payload", async () => {
    const response = GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      reporting: {
        currentMonth: "2026-05-01",
      },
      clients: expect.any(Array),
      projects: expect.any(Array),
      risks: expect.any(Array),
    });
    expect(data.projects).toHaveLength(5);
  });
});
