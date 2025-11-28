'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Download, RefreshCw, AlertCircle, CheckCircle, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const dynamic = 'force-dynamic'

interface JobStatus {
  jobId: string
  status: 'queued' | 'extracting' | 'summarizing' | 'rendering' | 'complete' | 'failed'
  progress: number
  pdfUrl?: string
  errorMessage?: string
  estimatedTimeRemaining?: string
}

function GenerationStatusContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const jobId = searchParams.get('jobId')
  
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Poll job status every 3 seconds
  useEffect(() => {
    if (!jobId) {
      setError('No job ID provided')
      setLoading(false)
      return
    }

    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/status/${jobId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Job not found')
          } else {
            setError('Failed to fetch job status')
          }
          setLoading(false)
          return
        }

        const data: JobStatus = await response.json()
        setJobStatus(data)
        setLoading(false)

        // Stop polling if job is complete or failed
        if (data.status === 'complete' || data.status === 'failed') {
          return
        }
      } catch (err) {
        console.error('Error fetching job status:', err)
        setError('Failed to fetch job status')
        setLoading(false)
      }
    }

    // Initial fetch
    fetchStatus()

    // Set up polling
    const interval = setInterval(fetchStatus, 3000)

    return () => clearInterval(interval)
  }, [jobId])

  const getStatusIcon = () => {
    if (!jobStatus) return <Loader2 className="w-6 h-6 animate-spin" />
    
    switch (jobStatus.status) {
      case 'queued':
        return <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
      case 'extracting':
      case 'summarizing':
      case 'rendering':
        return <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
      case 'complete':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'failed':
        return <AlertCircle className="w-6 h-6 text-red-600" />
      default:
        return <Loader2 className="w-6 h-6 animate-spin" />
    }
  }

  const getStatusTitle = () => {
    if (!jobStatus) return 'Loading Status'
    
    switch (jobStatus.status) {
      case 'queued':
        return 'Queued for Processing'
      case 'extracting':
        return 'Extracting Text'
      case 'summarizing':
        return 'Generating Summary'
      case 'rendering':
        return 'Creating Handwritten Notes'
      case 'complete':
        return 'Generation Complete!'
      case 'failed':
        return 'Generation Failed'
      default:
        return 'Processing'
    }
  }

  const getStatusDescription = () => {
    if (!jobStatus) return 'Checking job status...'
    
    switch (jobStatus.status) {
      case 'queued':
        return 'Your document is in the queue and will be processed shortly.'
      case 'extracting':
        return 'Extracting text from your document...'
      case 'summarizing':
        return 'Creating AI-powered summary of your content...'
      case 'rendering':
        return 'Generating beautiful handwritten notes...'
      case 'complete':
        return 'Your handwritten notes are ready for download!'
      case 'failed':
        return jobStatus.errorMessage || 'An error occurred during generation.'
      default:
        return 'Processing your request...'
    }
  }

  const handleRetry = () => {
    router.push('/')
  }

  const handleDownload = () => {
    if (jobStatus?.pdfUrl) {
      window.open(jobStatus.pdfUrl, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary-600" />
          <p className="text-lg text-neutral-600">Loading job status...</p>
        </div>
      </div>
    )
  }

  if (error || !jobStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || 'Job not found'}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push('/')} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-neutral-900 mb-4">
            Generation Status
          </h1>
          <p className="text-xl text-neutral-600">
            Job ID: {jobStatus.jobId}
          </p>
        </div>

        <Card className="shadow-soft-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon()}
              {getStatusTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Progress</span>
                <span>{jobStatus.progress}%</span>
              </div>
              <Progress value={jobStatus.progress} className="w-full" />
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-sm text-neutral-700">
                {getStatusDescription()}
              </p>
              {jobStatus.estimatedTimeRemaining && (
                <p className="text-xs text-neutral-500 mt-2">
                  Estimated time remaining: {jobStatus.estimatedTimeRemaining}
                </p>
              )}
            </div>

            {jobStatus.status === 'complete' && jobStatus.pdfUrl && (
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  className="w-full"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Handwritten Notes
                </Button>
                
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Another Document
                </Button>
              </div>
            )}

            {jobStatus.status === 'failed' && (
              <div className="space-y-3">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {jobStatus.errorMessage}
                  </AlertDescription>
                </Alert>
                
                <Button
                  onClick={handleRetry}
                  className="w-full"
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}

            {(jobStatus.status === 'queued' || 
              jobStatus.status === 'extracting' || 
              jobStatus.status === 'summarizing' || 
              jobStatus.status === 'rendering') && (
              <div className="text-center">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Status
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function GenerationStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary-600" />
          <p className="text-lg text-neutral-600">Loading...</p>
        </div>
      </div>
    }>
      <GenerationStatusContent />
    </Suspense>
  )
}