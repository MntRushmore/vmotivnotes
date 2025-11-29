'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import ErrorState from './ErrorState'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          statusCode="500"
          title="Something went wrong"
          description="An unexpected error occurred. Please try again or contact support if the problem persists."
          primaryAction={{
            label: 'Try again',
            onClick: this.handleReset,
          }}
          secondaryAction={{
            label: 'Go to help',
            onClick: () => {
              window.location.href = '/help'
            },
          }}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
