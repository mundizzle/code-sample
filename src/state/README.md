# State

This folder owns local dashboard UI state through a per-instance Zustand vanilla store. It handles selections, filters, date range, chart mode, and mobile detail panel state.

Use this directory for UI-only state. Server/data state belongs in TanStack Query, and domain calculations belong in `src/model`.

- `dashboard-store.ts` defines state, actions, defaults, and store creation.
- `dashboard-store-provider.tsx` exposes the store to React components.
- Components select only the state/actions they need.
- Keep the store per-instance so React tests and Storybook do not share module-level state.
- Store actions should copy caller-owned arrays and objects before saving them.
- Test state transitions without rendering the full dashboard when possible.

## Example

```ts
toggleClientFilter: (clientId) =>
  set((state) => {
    const clientIds = state.filters.clientIds.includes(clientId)
      ? state.filters.clientIds.filter((id) => id !== clientId)
      : [...state.filters.clientIds, clientId];

    return { filters: { ...state.filters, clientIds } };
  });
```
