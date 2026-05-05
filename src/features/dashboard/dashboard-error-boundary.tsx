"use client";

import { Component, type ReactNode } from "react";

import { DashboardError } from "./dashboard-error";

type DashboardErrorBoundaryProps = {
  children: ReactNode;
  onReset: () => void;
};

type DashboardErrorBoundaryState = {
  error: Error | null;
};

export class DashboardErrorBoundary extends Component<
  DashboardErrorBoundaryProps,
  DashboardErrorBoundaryState
> {
  state: DashboardErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): DashboardErrorBoundaryState {
    return { error };
  }

  reset = () => {
    this.props.onReset();
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return <DashboardError error={error} reset={this.reset} />;
    }

    return this.props.children;
  }
}
