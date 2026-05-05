import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EChart } from "./e-chart";

describe("EChart", () => {
  it("connects visual charts to a screen-reader data summary", () => {
    render(
      <EChart
        accessibleDescription="Delivery health trend: Apr 13 82%, Apr 20 84%."
        ariaLabel="Weekly delivery health scores"
        option={{}}
      />,
    );

    const chart = screen.getByRole("img", {
      name: "Weekly delivery health scores",
    });
    const description = screen.getByText(
      "Delivery health trend: Apr 13 82%, Apr 20 84%.",
    );

    expect(chart).toHaveAccessibleDescription(
      "Delivery health trend: Apr 13 82%, Apr 20 84%.",
    );
    expect(description).toHaveClass("sr-only");
  });
});
