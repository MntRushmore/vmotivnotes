import { NextRequest, NextResponse } from 'next/server'
import { createJob } from '@/lib/job-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

// Declare global to store file data for job processing
declare global {
  var jobFiles: Map<string, { fileBuffer: Buffer; options: any }>
}

if (!global.jobFiles) {
  global.jobFiles = new Map()
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let file: File | null = null
    let fileBuffer: Buffer | null = null
    let summaryLength: string | undefined
    let style: string | undefined

    // Handle both FormData (from file upload) and JSON (direct API calls)
    if (contentType.includes('multipart/form-data')) {
      // FormData from file upload
      const formData = await request.formData()
      file = formData.get('file') as File

      if (!file) {
        return NextResponse.json(
          { error: 'File is required when using FormData' },
          { status: 400 }
        )
      }

      summaryLength = formData.get('summaryLength') as string
      style = formData.get('style') as string

      // Convert file to buffer for processing
      const arrayBuffer = await file.arrayBuffer()
      fileBuffer = Buffer.from(arrayBuffer)
    } else {
      return NextResponse.json(
        { error: 'FormData with file is required' },
        { status: 400 }
      )
    }

    if (!file || !fileBuffer) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    // Create a job for processing
    const job = createJob(file.name, file.size, file.type)

    // Store file data for job processor
    global.jobFiles.set(job.id, {
      fileBuffer,
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
      message: 'File uploaded successfully. Processing started.'
    })
  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json(
      { error: 'Failed to start generation' },
      { status: 500 }
    )
  }
}
