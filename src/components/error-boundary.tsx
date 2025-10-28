import type { ReactNode } from "react";
import React from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, message: undefined });
  };

  render() {
    const { hasError, message } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-red-300 bg-red-50 px-6 py-10 text-center text-red-700">
          <h2 className="text-lg font-semibold">Terjadi kesalahan</h2>
          <p className="text-sm">
            {message ?? "Terjadi kesalahan, coba lagi nanti."}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-md border border-red-400 px-4 py-2 text-sm font-medium text-red-700"
          >
            Muat ulang tampilan
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
