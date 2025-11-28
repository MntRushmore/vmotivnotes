'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Image as ImageIcon, Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadthing'

export const dynamic = 'force-dynamic'

type UploadState = 'idle' | 'uploading' | 'processing' | 'success' | 'error'

export default function UploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [dragActive, setDragActive] = useState(false)

  const { startUpload: startPdfUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: (res) => {
      console.log('PDF upload complete:', res)
      processGeneration(res[0], 'pdf')
    },
    onUploadError: (error) => {
      console.error('Upload error:', error)
      setUploadState('error')
      setErrorMessage(error.message || 'Upload failed. Please try again.')
      toast({
        title: 'Upload failed',
        description: error.message || 'An error occurred during upload',
        variant: 'destructive',
      })
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    },
  })

  const { startUpload: startImageUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      console.log('Image upload complete:', res)
      processGeneration(res[0], 'image')
    },
    onUploadError: (error) => {
      console.error('Upload error:', error)
      setUploadState('error')
      setErrorMessage(error.message || 'Upload failed. Please try again.')
      toast({
        title: 'Upload failed',
        description: error.message || 'An error occurred during upload',
        variant: 'destructive',
      })
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    },
  })

  const processGeneration = async (uploadedFile: any, _fileType: 'pdf' | 'image') => {
    setUploadState('processing')
    setUploadProgress(50)

    try {
      const response = await fetch(uploadedFile.url)
      const blob = await response.blob()
      const file = new File([blob], uploadedFile.name, { type: blob.type })

      const formData = new FormData()
      formData.append('file', file)
      formData.append('summaryLength', 'medium')
      formData.append('style', 'notes')

      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      const result = await generateResponse.json()

      if (!generateResponse.ok) {
        throw new Error(result.error?.message || 'Generation failed')
      }

      setUploadState('success')
      setUploadProgress(100)

      toast({
        title: 'Generation Started!',
        description: 'Your document is being processed. You will be redirected to the status page.',
      })

      // Redirect to status page with jobId
      setTimeout(() => {
        router.push(`/generation-status?jobId=${result.jobId}`)
      }, 2000)
    } catch (error) {
      console.error('Generation error:', error)
      setUploadState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to start generation'
      )
      toast({
        title: 'Generation failed',
        description: error instanceof Error ? error.message : 'An error occurred during generation',
        variant: 'destructive',
      })
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleFileSelect = useCallback((selectedFile: File) => {
    const maxSize = 50 * 1024 * 1024
    
    if (selectedFile.size > maxSize) {
      setErrorMessage('File size must be less than 50MB')
      toast({
        title: 'File too large',
        description: 'Maximum file size is 50MB',
        variant: 'destructive',
      })
      return
    }

    const isPdf = selectedFile.type === 'application/pdf'
    const isImage = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(selectedFile.type)

    if (!isPdf && !isImage) {
      setErrorMessage('Please select a PDF or image file (PNG, JPG, JPEG, WebP)')
      toast({
        title: 'Invalid file type',
        description: 'Only PDF and image files are supported',
        variant: 'destructive',
      })
      return
    }

    setFile(selectedFile)
    setErrorMessage('')
    setUploadState('idle')
  }, [toast])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [handleFileSelect])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploadState('uploading')
    setUploadProgress(0)
    setErrorMessage('')

    const isPdf = file.type === 'application/pdf'
    
    try {
      if (isPdf) {
        await startPdfUpload([file])
      } else {
        await startImageUpload([file])
      }
    } catch (error) {
      console.error('Upload initiation error:', error)
      setUploadState('error')
      setErrorMessage('Failed to start upload. Please try again.')
    }
  }

  const resetUpload = () => {
    setFile(null)
    setUploadState('idle')
    setUploadProgress(0)
    setErrorMessage('')
  }

  const getFileIcon = () => {
    if (!file) return <Upload className="w-12 h-12 text-neutral-400" />
    if (file.type === 'application/pdf') {
      return <FileText className="w-12 h-12 text-primary-600" />
    }
    return <ImageIcon className="w-12 h-12 text-primary-600" />
  }

  const getStateIcon = () => {
    switch (uploadState) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-success-600" />
      case 'error':
        return <XCircle className="w-6 h-6 text-destructive-600" />
      default:
        return null
    }
  }

  const getStateMessage = () => {
    switch (uploadState) {
      case 'uploading':
        return 'Uploading file...'
      case 'processing':
        return 'Starting generation...'
      case 'success':
        return 'Generation started! Redirecting to status page...'
      case 'error':
        return errorMessage || 'An error occurred'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-neutral-900 mb-4">
            Generate Handwritten Notes
          </h1>
          <p className="text-xl text-neutral-600">
            Upload a PDF or image to generate AI-powered handwritten notes
          </p>
        </div>

        <Card className="shadow-soft-xl">
          <CardHeader>
            <CardTitle>Select File</CardTitle>
            <CardDescription>
              Drag and drop or click to upload. Maximum file size: 50MB
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-2xl p-12
                transition-all duration-200 cursor-pointer
                ${dragActive 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-neutral-300 bg-neutral-50 hover:border-neutral-400'
                }
                ${uploadState === 'uploading' || uploadState === 'processing' 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
                }
              `}
            >
              <input
                type="file"
                accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileInputChange}
                disabled={uploadState === 'uploading' || uploadState === 'processing'}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              
              <div className="flex flex-col items-center justify-center space-y-4">
                {getFileIcon()}
                
                {file ? (
                  <div className="text-center">
                    <p className="text-lg font-medium text-neutral-900">{file.name}</p>
                    <p className="text-sm text-neutral-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-lg font-medium text-neutral-900">
                      Drop your file here
                    </p>
                    <p className="text-sm text-neutral-600">
                      or click to browse
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">
                      Supports PDF, PNG, JPG, JPEG, WebP
                    </p>
                  </div>
                )}
              </div>
            </div>

            {uploadState !== 'idle' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStateIcon()}
                    <span className="text-sm font-medium text-neutral-700">
                      {getStateMessage()}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-600">
                    {uploadProgress}%
                  </span>
                </div>
                
                <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      uploadState === 'error'
                        ? 'bg-destructive-600'
                        : uploadState === 'success'
                        ? 'bg-success-600'
                        : 'bg-primary-600'
                    }`}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {errorMessage && uploadState === 'error' && (
              <div className="flex items-start gap-3 p-4 bg-destructive-50 border border-destructive-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-destructive-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive-900">
                    Upload Failed
                  </p>
                  <p className="text-sm text-destructive-700 mt-1">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            {uploadState === 'success' && (
              <div className="flex items-start gap-3 p-4 bg-success-50 border border-success-200 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-success-900">
                    Generation Started
                  </p>
                  <p className="text-sm text-success-700 mt-1">
                    Your document is being processed in the background.
                    You'll be redirected to the status page to track progress.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {uploadState === 'idle' || uploadState === 'error' ? (
                <>
                  <Button
                                       onClick={handleUpload}
                                       disabled={!file}
                                       className="flex-1"
                                       size="lg"
                                     >
                                       <Upload className="w-4 h-4 mr-2" />
                                       Generate Notes
                                     </Button>
                  {file && (
                    <Button
                      onClick={resetUpload}
                      variant="outline"
                      size="lg"
                    >
                      Clear
                    </Button>
                  )}
                </>
              ) : uploadState === 'success' ? (
                <Button
                  onClick={() => router.push('/generation-status')}
                  className="flex-1"
                  size="lg"
                >
                  View Generation Status
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
