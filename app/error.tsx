'use client'

import { useEffect } from 'react'
import ErrorState from '@/components/ErrorState'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Error in application:', error)
  }, [error])

  return (
    <ErrorState
      statusCode="500"
      title="Oops! Something went wrong"
      description="An unexpected error occurred. Our team has been notified. Please try again or contact support."
      primaryAction={{
        label: 'Try again',
        onClick: reset,
      }}
      secondaryAction={{
        label: 'Go to help',
        onClick: () => {
          window.location.href = '/help'
        },
      }}
      supportLink="/help"
    />
  )
}
