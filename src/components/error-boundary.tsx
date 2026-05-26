'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('Error Boundary', {
        props: {
          message: error.message,
          stack: error.stack?.slice(0, 200),
          componentStack: errorInfo.componentStack?.slice(0, 200),
        },
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
            <div className="max-w-md text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
              <p className="text-neutral-400 text-sm mb-6">
                We&apos;ve logged this error and will look into it. Try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-sm font-medium transition"
              >
                Refresh page
              </button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <pre className="mt-6 p-4 bg-neutral-900 rounded-lg text-left text-xs text-red-400 overflow-auto border border-red-500/20">
                  {this.state.error.stack}
                </pre>
              )}
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
