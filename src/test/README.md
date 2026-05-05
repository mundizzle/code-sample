# Test

## What this is

This folder contains shared test setup for Vitest and React Testing Library. It keeps the individual tests focused on behavior instead of repeating environment wiring.

## Why it exists

- The app has pure logic, store behavior, route behavior, and rendered UI behavior; they should all be testable without extra ceremony.
- Shared setup keeps matchers and DOM expectations consistent.
- The tests are intentionally behavior-focused rather than snapshot-heavy.

## How it works

- `setup.ts` is loaded by Vitest before tests run.
- React Testing Library tests use the jsdom environment.
- Pure model and store tests run without rendering the full app.
- Dashboard tests verify visible behavior and guard against implementation commentary leaking into product UI.

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

## Related

- [`../model/README.md`](../model/README.md)
- [`../state/README.md`](../state/README.md)
- `npm run test`
