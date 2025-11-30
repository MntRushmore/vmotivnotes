'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  FileText, 
  Sparkles, 
  Wand2, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Download,
  ArrowLeft 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { GenerationStatus } from '@/types'

export const dynamic = 'force-dynamic'

type Step = {
  id: GenerationStatus['status']
  label: string
  icon: typeof FileText
  description: string
}

const steps: Step[] = [
  {
    id: 'extracting',
    label: 'Extracting Text',
    icon: FileText,
    description: 'Reading and extracting text from your document'
  },
  {
    id: 'summarizing',
    label: 'Summarizing with AI',
    icon: Sparkles,
    description: 'Analyzing content and creating intelligent summaries'
  },
  {
    id: 'rendering',
    label: 'Rendering Handwriting',
    icon: Wand2,
    description: 'Converting to beautiful handwritten notes'
  },
  {
    id: 'ready',
    label: 'Ready',
    icon: CheckCircle2,
    description: 'Your PDF is ready for download'
  }
]

function GenerationStatusContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId') || searchParams.get('id') // Support both params

  const [status, setStatus] = useState<GenerationStatus>({
    id: jobId || 'unknown',
    status: 'extracting',
    progress: 0,
    estimatedTimeRemaining: 180,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jobId) {
      setError('No job ID provided')
      return
    }

    // Poll the status API
    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/status/${jobId}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError('Job not found. It may have expired.')
            return
          }
          throw new Error(`Failed to fetch status: ${response.statusText}`)
        }

        const data = await response.json()

        setStatus({
          id: data.jobId,
          status: data.status === 'complete' ? 'ready' : data.status,
          progress: data.progress || 0,
          pdfUrl: data.pdfUrl,
          errorMessage: data.errorMessage,
          estimatedTimeRemaining: data.estimatedTimeRemaining || 0,
        })

        // Stop polling if complete or failed
        if (data.status === 'complete' || data.status === 'failed') {
          clearInterval(interval)
        }

        // Handle errors
        if (data.status === 'failed') {
          setError(data.errorMessage || 'Generation failed')
        }
      } catch (err) {
        console.error('Failed to poll status:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch status')
      }
    }

    // Poll immediately, then every 2 seconds
    pollStatus()
    const interval = setInterval(pollStatus, 2000)

    return () => clearInterval(interval)
  }, [jobId])

  const currentStepIndex = steps.findIndex((step) => step.id === status.status)
  const isComplete = status.status === 'ready'
  const isError = status.status === 'failed' || status.status === 'error' || error !== null

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-50">
      <div className="max-w-2xl w-full">
        <Card className="shadow-soft-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              {isError ? (
                <XCircle className="w-7 h-7 text-destructive-600" />
              ) : isComplete ? (
                <CheckCircle2 className="w-7 h-7 text-success-600" />
              ) : (
                <Loader2 className="w-7 h-7 text-primary-600 animate-spin" />
              )}
              {isError ? 'Generation Failed' : isComplete ? 'Generation Complete' : 'Generating Your PDF'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error message */}
            {isError && (
              <div className="p-4 bg-destructive-50 border-2 border-destructive-200 rounded-xl">
                <p className="text-destructive-900 font-medium">
                  {error || status.errorMessage || 'An error occurred during generation'}
                </p>
              </div>
            )}

            {/* Progress bar */}
            {!isError && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-700">
                    {isComplete ? 'Complete!' : `${Math.round(status.progress)}% complete`}
                  </span>
                  {!isComplete && status.estimatedTimeRemaining !== undefined && (
                    <span className="text-neutral-500">
                      ~{formatTime(status.estimatedTimeRemaining)} remaining
                    </span>
                  )}
                </div>
                <Progress value={status.progress} className="h-3" />
              </div>
            )}

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const isActive = step.id === status.status
                const isCompleted = index < currentStepIndex || isComplete
                const StepIcon = step.icon

                return (
                  <div
                    key={step.id}
                    className={`
                      flex items-start gap-4 p-4 rounded-xl transition-all duration-300
                      ${isActive ? 'bg-primary-50 border-2 border-primary-200' : 'bg-neutral-50 border-2 border-transparent'}
                      ${isCompleted && !isActive ? 'opacity-60' : ''}
                    `}
                  >
                    <div
                      className={`
                        flex items-center justify-center w-12 h-12 rounded-full shrink-0
                        transition-all duration-300
                        ${isActive ? 'bg-primary-600 text-white animate-pulse-soft' : ''}
                        ${isCompleted && !isActive ? 'bg-success-600 text-white' : ''}
                        ${!isActive && !isCompleted ? 'bg-neutral-200 text-neutral-500' : ''}
                      `}
                    >
                      {isCompleted && !isActive ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isActive ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className={`text-lg font-semibold ${isActive ? 'text-primary-900' : 'text-neutral-900'}`}>
                        {step.label}
                      </h3>
                      <p className="text-sm text-neutral-600 mt-1">
                        {step.description}
                      </p>
                      {isActive && (
                        <div className="mt-2">
                          <span className="text-xs font-medium text-primary-700">
                            In progress...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Error state */}
            {isError && (
              <div className="p-4 bg-destructive-50 border border-destructive-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-destructive-900">
                      {status.error || 'An unexpected error occurred'}
                    </p>
                    <p className="text-sm text-destructive-700 mt-1">
                      Please try again or contact support if the problem persists.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Success actions */}
            {isComplete && (
              <div className="p-4 bg-success-50 border border-success-200 rounded-xl">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-success-900">
                      Your PDF has been generated successfully!
                    </p>
                    <p className="text-sm text-success-700 mt-1">
                      You can now download it or view it in the library.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (status.result?.url) {
                        window.open(status.result.url, '_blank')
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/library')}
                  >
                    Go to Library
                  </Button>
                </div>
              </div>
            )}

            {/* Actions for error or in-progress */}
            {(isError || !isComplete) && (
              <div className="flex gap-3 pt-4">
                {isError && (
                  <Button
                    className="flex-1"
                    onClick={() => router.push('/upload')}
                  >
                    Try Again
                  </Button>
                )}
                <Button
                  variant="outline"
                  className={isError ? '' : 'flex-1'}
                  onClick={() => router.push('/')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional info */}
        {!isComplete && !isError && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow-soft text-center">
            <p className="text-sm text-neutral-600">
              Please keep this page open while we generate your PDF.
              This usually takes 30-90 seconds.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GenerationStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    }>
      <GenerationStatusContent />
    </Suspense>
  )
}
