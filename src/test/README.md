# Test

This folder contains shared test setup for Vitest and React Testing Library. It keeps the individual tests focused on behavior instead of repeating environment wiring.

Use this directory for test environment setup and shared test utilities. Individual tests should stay close to the code they cover.

- `setup.ts` is loaded by Vitest before tests run.
- React Testing Library tests use the jsdom environment.
- Pure model and store tests should run without rendering the full app.
- Dashboard tests should verify visible behavior and guard against implementation commentary leaking into product UI.
- Prefer behavior assertions over snapshots unless a snapshot adds clear review value.

## Example

```ts
import { describe, expect, it } from "vitest";

describe("filterProjects", () => {
  it("filters by client, status, health, and search text", () => {
    expect(results.map((project) => project.name)).toEqual([
      "Resident Services Hub",
    ]);
  });
});
```
