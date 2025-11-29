'use client'

import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-soft-xl p-8 md:p-12 text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive-100 to-destructive-50 rounded-full opacity-30 blur-3xl"></div>
                <div className="relative flex items-center justify-center">
                  <div className="text-6xl font-bold text-destructive-600 opacity-20">
                    500
                  </div>
                  <div className="absolute w-20 h-20 bg-destructive-500 rounded-full opacity-10 animate-pulse"></div>
                  <div className="absolute w-16 h-16 bg-destructive-400 rounded-full opacity-20 animate-float"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-3">
              Critical Error
            </h1>
            
            <p className="text-lg text-neutral-600 mb-8">
              A critical error has occurred. Please try refreshing the page or contact support.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium bg-primary-600 text-white shadow-soft hover:bg-primary-700 active:bg-primary-800 transition-colors h-12 px-4 py-2"
              >
                Try again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium border border-neutral-200 bg-white text-neutral-950 shadow-soft hover:bg-neutral-50 active:bg-neutral-100 transition-colors h-12 px-4 py-2"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
