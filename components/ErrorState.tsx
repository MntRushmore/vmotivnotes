'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  statusCode: number | string
  title: string
  description: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  supportLink?: string
}

const ErrorIllustration = ({ statusCode }: { statusCode: number | string }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full opacity-30 blur-3xl"></div>
        <div className="relative flex items-center justify-center">
          <div className="text-6xl font-bold text-primary-600 opacity-20">
            {statusCode}
          </div>
          <div className="absolute w-20 h-20 bg-primary-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute w-16 h-16 bg-primary-400 rounded-full opacity-20 animate-float"></div>
        </div>
      </div>
    </div>
  )
}

export default function ErrorState({
  statusCode,
  title,
  description,
  primaryAction,
  secondaryAction,
  supportLink,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-soft-xl p-8 md:p-12 text-center">
        <ErrorIllustration statusCode={statusCode} />
        
        <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-3">
          {title}
        </h1>
        
        <p className="text-lg text-neutral-600 mb-8">
          {description}
        </p>

        <div className="flex flex-col gap-3">
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="w-full h-12"
              size="lg"
            >
              {primaryAction.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              className="w-full h-12"
              size="lg"
            >
              {secondaryAction.label}
            </Button>
          )}

          {supportLink && (
            <a
              href={supportLink}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 transition-smooth"
            >
              Need help? Contact support
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
