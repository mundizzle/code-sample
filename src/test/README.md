# Test

This folder contains shared test setup for Vitest and React Testing Library. It keeps the individual tests focused on behavior instead of repeating environment wiring.

Use this directory for test environment setup and shared test utilities. Individual tests should stay close to the code they cover.

- `setup.ts` is loaded by Vitest before tests run.
- React Testing Library tests use the jsdom environment.
- Pure model and store tests should run without rendering the full app.
- Dashboard tests should verify visible behavior and guard against implementation commentary leaking into product UI.
- Prefer behavior assertions over snapshots unless a snapshot adds clear review value.

## Standards

- Prefer tests that read like user or domain behavior, not implementation wiring.
- Prefer direct model/store tests for pure logic and React Testing Library for rendered interactions.
- Prefer accessibility queries such as roles, labels, and visible text for UI tests.
- Avoid brittle snapshots, CSS-class assertions, or tests that depend on Storybook-only setup.
