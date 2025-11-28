'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, XCircle, Download, Eye } from 'lucide-react'
import { GenerationStatus, GenerationResult } from '@/types/generation'

export default function GenerationStatusPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const generationId = searchParams.get('id')
  
  const [status, setStatus] = useState<GenerationStatus | null>(null)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [polling, setPolling] = useState(true)

  useEffect(() => {
    if (!generationId) {
      setError('No generation ID provided')
      return
    }

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/generate/status?id=${generationId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch status')
        }

        const data: GenerationResult = await response.json()
        setResult(data)
        setStatus(data.status)

        if (data.status.status === 'complete' || data.status.status === 'error') {
          setPolling(false)
        }
      } catch (err) {
        console.error('Polling error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch status')
        setPolling(false)
      }
    }

    // Initial poll
    pollStatus()

    // Set up polling interval
    let interval: NodeJS.Timeout
    if (polling) {
      interval = setInterval(pollStatus, 2000) // Poll every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [generationId, polling])

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-primary-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Loader2 className="w-5 h-5 animate-spin" />
    }
  }

  const handleDownload = async () => {
    if (!result?.handwriting?.pdfUrl) return

    try {
      const response = await fetch(result.handwriting.pdfUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `handwriting-${generationId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Download error:', err)
      setError('Failed to download PDF')
    }
  }

  const handleViewPDF = () => {
    if (!result?.handwriting?.pdfUrl) return
    window.open(result.handwriting.pdfUrl, '_blank')
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
        <div className="max-w-2xl mx-auto mt-20">
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button 
            onClick={() => router.push('/')} 
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  if (!status) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Generating Your Notes
          </h1>
          <p className="text-neutral-600">
            ID: {generationId}
          </p>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(status.status)}
              <span className="capitalize">{status.status}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span className={getProgressColor(status.status)}>
                  {status.progress}%
                </span>
              </div>
              <Progress 
                value={status.progress} 
                className="h-2"
              />
            </div>
            
            {status.currentStep && (
              <div className="text-sm text-neutral-600">
                Current step: {status.currentStep}
              </div>
            )}

            {status.error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Error: {status.error.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Result Display */}
        {result && status.status === 'complete' && (
          <>
            {/* Summary Card */}
            {result.summary && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Summary</h4>
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                      {result.summary.summary}
                    </p>
                  </div>
                  
                  {result.summary.keyPoints.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Key Points</h4>
                      <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1">
                        {result.summary.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-xs text-neutral-500">
                    Mode: {result.summary.metadata.mode} | 
                    Words: {result.summary.metadata.wordCount} | 
                    Processing time: {result.summary.metadata.processingTime}ms
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Handwriting Card */}
            {result.handwriting && (
              <Card>
                <CardHeader>
                  <CardTitle>Handwritten PDF</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleViewPDF}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View PDF
                    </Button>
                    <Button 
                      onClick={handleDownload}
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="text-xs text-neutral-500">
                    Pages: {result.handwriting.metadata.pageCount} | 
                    Rendering time: {result.handwriting.metadata.renderingTime}ms | 
                    Model: {result.handwriting.metadata.model}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
          
          {status.status === 'complete' && (
            <Button onClick={() => router.push('/upload')}>
              Generate Another
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}