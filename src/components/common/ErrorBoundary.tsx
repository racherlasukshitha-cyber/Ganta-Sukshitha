import React, { Component, ErrorInfo, ReactNode } from 'react';
import { safeStorage } from '../../utils/safeStorage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AstroPoornima ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleResetCache = () => {
    safeStorage.clear();
    try {
      window.location.href = window.location.origin + window.location.pathname;
    } catch {
      window.location.reload();
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
            {/* Sacred Om Emblem */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-300 font-cinzel font-bold text-2xl">
                ॐ
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
                AstroPoornima Sanctuary
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                A temporary script anomaly occurred while preparing your Vedic planetary experience.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono text-left max-h-24 overflow-y-auto">
                {this.state.error.message || 'Unknown initialization issue'}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-md shadow-amber-500/20"
              >
                Reload Page
              </button>

              <button
                type="button"
                onClick={this.handleResetCache}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-500/30 font-semibold text-xs cursor-pointer transition-colors"
              >
                Reset Clean State
              </button>
            </div>

            <p className="text-[10px] text-slate-500 pt-2">
              Mata Sri Poornima • Jubilee Hills, Hyderabad • All Services Active
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
