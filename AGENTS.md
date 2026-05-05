Build a concise Senior Front-End Engineer code sample: a modern agency delivery dashboard that demonstrates design-to-dev continuity from Figma-style design tokens, to generated Tailwind theme variables, to a responsive live app, with Storybook as the component/design-system review surface.

The project should feel like a realistic consulting delivery dashboard, not a toy app or a marketing site. The first screen should be the actual dashboard experience.

Use:
- Next.js App Router
- React
- Tailwind CSS
- TypeScript
- Storybook
- TanStack Query for server/data state
- Zustand for UI-only state
- ECharts for charts
- Vitest and React Testing Library

Core requirements:
- Keep the implementation conventional, readable, and easy to explain in an interview.
- Include Figma-style token JSON for colors, radius, spacing, and chart colors.
- Generate the Tailwind-facing theme CSS from the token JSON.
- Use semantic token-backed utilities for color/radius styling.
- Include light/dark support through prefers-color-scheme, but do not add an in-app theme switcher.
- Build a responsive dashboard with KPI cards, filters, project list, selected project detail panel, and charts.
- Keep chart option builders pure and tested.
- Use a mock API route and fixture-backed data, but do not add a real backend, auth, persistence, or unrelated product scope.
- Add Storybook stories for reusable components and a composed dashboard story.
- Add design-token documentation in Storybook.
- Add tests for domain utilities, state behavior, dashboard behavior, data query/API behavior, chart option builders, and important accessibility/token contrast expectations.
- Do not put visible product UI copy in the app that explains the implementation, tooling, Figma, Storybook, Zustand, ECharts, or that this is a code sample.

Project skills:
- This repo locks project-local skills in `skills-lock.json`. The generated `.agents/skills` directory is intentionally ignored.
- Run `npm run skills:install` after installing dependencies to restore the local skill files.
- Restart Codex or start a fresh agent session after installing or restoring skills.
- Use these skills when reviewing or generating code:
  - `next-best-practices` for App Router structure, route handlers, server/client boundaries, data patterns, and build behavior.
  - `vercel-react-best-practices` for React performance, bundle size, waterfalls, render behavior, and heavy client boundaries.
  - `vercel-composition-patterns` for component APIs, naming, ownership, provider placement, and composition decisions.
  - `building-components` for accessible, composable UI components, ARIA behavior, keyboard support, and Storybook coverage.

Include:
- A human-facing README that explains the project purpose, key links, built-with list, and the design-to-dev workflow.
- A simplified Mermaid diagram showing: Figma -> Design tokens -> Tailwind theme -> Live app.
- An AGENTS.md guide focused on future-agent principles and guardrails.
- Validation scripts for test, lint, build, Storybook, and token generation.

Before finishing:
- Run tests, lint, and production build.
- Verify generated build artifacts are ignored.
- Run a local production accessibility smoke check or Lighthouse pass if practical.
