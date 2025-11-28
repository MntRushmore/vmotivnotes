'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Upload, 
  Play, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Loader2,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { SATTopic } from '@/types'

export const dynamic = 'force-dynamic'

type GenerationState = 'idle' | 'authenticating' | 'running' | 'complete' | 'error'

export default function SATDeckAdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [apiKey, setApiKey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [topicsJson, setTopicsJson] = useState('')
  const [topics, setTopics] = useState<SATTopic[]>([])
  const [state, setState] = useState<GenerationState>('idle')
  const [progress, setProgress] = useState(0)
  const [currentTopic, setCurrentTopic] = useState('')
  const [processedCount, setProcessedCount] = useState(0)
  const [successCount, setSuccessCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [errors, setErrors] = useState<string[]>([])

  const handleAuthenticate = () => {
    if (apiKey === 'admin-secret-key-2024') {
      setIsAuthenticated(true)
      toast({
        title: 'Authenticated',
        description: 'You now have access to the SAT Deck Generator',
      })
    } else {
      toast({
        title: 'Authentication Failed',
        description: 'Invalid API key',
        variant: 'destructive',
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string
        const parsed = JSON.parse(json) as SATTopic[]
        setTopics(parsed)
        setTopicsJson(JSON.stringify(parsed, null, 2))
        toast({
          title: 'Topics Loaded',
          description: `${parsed.length} topics loaded from file`,
        })
      } catch (error) {
        toast({
          title: 'Invalid JSON',
          description: 'Failed to parse JSON file',
          variant: 'destructive',
        })
      }
    }
    reader.readAsText(file)
  }

  const handleJsonChange = (value: string) => {
    setTopicsJson(value)
    try {
      const parsed = JSON.parse(value) as SATTopic[]
      setTopics(parsed)
    } catch {
      // Invalid JSON, don't update topics
    }
  }

  const simulateGeneration = async () => {
    if (topics.length === 0) {
      toast({
        title: 'No Topics',
        description: 'Please load or paste topics JSON',
        variant: 'destructive',
      })
      return
    }

    setState('running')
    setProcessedCount(0)
    setSuccessCount(0)
    setErrorCount(0)
    setErrors([])
    setProgress(0)

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i]
      setCurrentTopic(topic.topic)

      await new Promise((resolve) => setTimeout(resolve, 500))

      const success = Math.random() > 0.1
      setProcessedCount(i + 1)
      
      if (success) {
        setSuccessCount((prev) => prev + 1)
      } else {
        setErrorCount((prev) => prev + 1)
        setErrors((prev) => [...prev, `Failed to generate: ${topic.topic}`])
      }

      setProgress(((i + 1) / topics.length) * 100)
    }

    setState('complete')
    toast({
      title: 'Generation Complete',
      description: `${successCount} PDFs generated successfully`,
    })
  }

  const handleDownloadAll = () => {
    toast({
      title: 'Download Started',
      description: 'Preparing ZIP file with all PDFs...',
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-50">
        <Card className="max-w-md w-full shadow-soft-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary-600" />
              Admin Access Required
            </CardTitle>
            <CardDescription>
              Enter your API key to access the SAT Deck Generator
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter admin API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
              />
            </div>

            <Button onClick={handleAuthenticate} className="w-full">
              Authenticate
            </Button>

            <div className="pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 text-center">
                For demo purposes, use: <code className="bg-neutral-100 px-2 py-1 rounded">admin-secret-key-2024</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-neutral-900 mb-4">
            SAT Master Deck Generator
          </h1>
          <p className="text-xl text-neutral-600">
            Batch generate PDFs for SAT preparation topics
          </p>
        </div>

        {/* Topics Input */}
        <Card className="shadow-soft-xl mb-6">
          <CardHeader>
            <CardTitle>Topics Configuration</CardTitle>
            <CardDescription>
              Upload a JSON file or paste topics directly (300-500 topics supported)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={state === 'running'}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload JSON File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => {
                  fetch('/data/sat-topics.json')
                    .then((res) => res.json())
                    .then((data) => {
                      setTopics(data)
                      setTopicsJson(JSON.stringify(data, null, 2))
                      toast({
                        title: 'Sample Topics Loaded',
                        description: `${data.length} sample topics loaded`,
                      })
                    })
                }}
                disabled={state === 'running'}
              >
                Load Sample Topics
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topicsJson">Topics JSON</Label>
              <Textarea
                id="topicsJson"
                placeholder='[{"topic": "Quadratic Equations", "category": "Algebra"}, ...]'
                value={topicsJson}
                onChange={(e) => handleJsonChange(e.target.value)}
                disabled={state === 'running'}
                rows={10}
                className="font-mono text-xs"
              />
            </div>

            {topics.length > 0 && (
              <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-sm text-primary-900">
                  ✓ {topics.length} topics loaded and ready to generate
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generation Control */}
        <Card className="shadow-soft-xl mb-6">
          <CardHeader>
            <CardTitle>Generation Control</CardTitle>
            <CardDescription>
              Start the batch generation process. This will take approximately {Math.ceil(topics.length * 0.5 / 60)} minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state === 'idle' && (
              <Button
                onClick={simulateGeneration}
                disabled={topics.length === 0}
                size="lg"
                className="w-full"
              >
                <Play className="w-5 h-5 mr-2" />
                Generate Master Deck ({topics.length} topics)
              </Button>
            )}

            {state === 'running' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      Generating: {currentTopic}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {processedCount} / {topics.length} topics processed
                    </p>
                  </div>
                </div>

                <Progress value={progress} className="h-3" />

                <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{processedCount}</p>
                    <p className="text-xs text-neutral-600">Processed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success-600">{successCount}</p>
                    <p className="text-xs text-neutral-600">Success</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-destructive-600">{errorCount}</p>
                    <p className="text-xs text-neutral-600">Errors</p>
                  </div>
                </div>
              </div>
            )}

            {state === 'complete' && (
              <div className="space-y-4">
                <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-success-900">
                        Master Deck Generated Successfully
                      </p>
                      <p className="text-sm text-success-700 mt-1">
                        {successCount} PDFs generated, {errorCount} errors
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{processedCount}</p>
                    <p className="text-xs text-neutral-600">Total Processed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success-600">{successCount}</p>
                    <p className="text-xs text-neutral-600">Success</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-destructive-600">{errorCount}</p>
                    <p className="text-xs text-neutral-600">Errors</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleDownloadAll} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download All PDFs (ZIP)
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/library')}>
                    View in Library
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setState('idle')
                    setProgress(0)
                    setProcessedCount(0)
                    setSuccessCount(0)
                    setErrorCount(0)
                    setErrors([])
                  }}
                  className="w-full"
                >
                  Generate Another Batch
                </Button>
              </div>
            )}

            {errors.length > 0 && (
              <div className="p-4 bg-destructive-50 border border-destructive-200 rounded-lg max-h-40 overflow-y-auto">
                <div className="flex items-start gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-destructive-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-destructive-900">
                    Errors ({errorCount})
                  </p>
                </div>
                <ul className="space-y-1 pl-8">
                  {errors.map((error, i) => (
                    <li key={i} className="text-xs text-destructive-700">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => router.push('/')}>
            Back to Home
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setIsAuthenticated(false)
              setApiKey('')
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
