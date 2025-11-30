import { NextRequest, NextResponse } from 'next/server'
import { createJob } from '@/lib/job-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

// Declare global to store file data for job processing
declare global {
  var jobFiles: Map<string, { fileBuffer: Buffer | null; textInput: string | null; options: any }>
}

if (!global.jobFiles) {
  global.jobFiles = new Map()
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let file: File | null = null
    let fileBuffer: Buffer | null = null
    let textInput: string | null = null
    let summaryLength: string | undefined
    let style: string | undefined

    // Handle both FormData (from file upload), JSON (text input), and direct API calls
    if (contentType.includes('multipart/form-data')) {
      // FormData from file upload
      const formData = await request.formData()
      file = formData.get('file') as File
      textInput = formData.get('textInput') as string

      // Either file or text input is required
      if (!file && !textInput) {
        return NextResponse.json(
          { error: 'Either file or text input is required' },
          { status: 400 }
        )
      }

      summaryLength = formData.get('summaryLength') as string
      style = formData.get('style') as string

      // Convert file to buffer for processing if file exists
      if (file) {
        const arrayBuffer = await file.arrayBuffer()
        fileBuffer = Buffer.from(arrayBuffer)
      }
    } else if (contentType.includes('application/json')) {
      // JSON for text input
      const body = await request.json()
      textInput = body.textInput || body.topic
      summaryLength = body.summaryLength
      style = body.style

      if (!textInput) {
        return NextResponse.json(
          { error: 'Text input or topic is required' },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid content type. Use multipart/form-data or application/json' },
        { status: 400 }
      )
    }

    // Validate that we have either file or text input
    if (!file && !textInput) {
      return NextResponse.json(
        { error: 'Either file or text input is required' },
        { status: 400 }
      )
    }

    // Create a job for processing
    const job = createJob(
      textInput ? 'Text Input' : file!.name,
      textInput ? textInput.length : file!.size,
      textInput ? 'text/plain' : file!.type
    )

    // Store file data or text input for job processor
    global.jobFiles.set(job.id, {
      fileBuffer: fileBuffer || null,
      textInput: textInput || null,
      options: {
        summaryLength: summaryLength || 'medium',
        style: style || 'notes'
      }
    })

    // Trigger job processing in background
    // The job-service.ts module auto-processes jobs every 5 seconds
    import('@/lib/job-service').then(() => {
      // Job service is already running in background
      console.log(`Job ${job.id} queued for processing`)
    })

    return NextResponse.json({
      success: true,
      jobId: job.id,
      status: job.status,
      message: textInput
        ? 'Topic received. Processing started.'
        : 'File uploaded successfully. Processing started.'
    })
  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json(
      { error: 'Failed to start generation' },
      { status: 500 }
    )
  }
}
