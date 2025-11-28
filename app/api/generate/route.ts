import { NextRequest, NextResponse } from 'next/server'
import { createJob } from '@/lib/job-store'
import '@/lib/job-service' // Import to start the job processor
import type { GenerateResponse } from '@/types'

export const runtime = 'nodejs'
export const maxDuration = 60 // Vercel hobby plan limit

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        {
          error: {
            code: 'NO_FILE',
            message: 'No file provided',
          },
        },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_FILE_TYPE',
            message: 'Invalid file type. Please upload a PDF or image file.',
          },
        },
        { status: 400 }
      )
    }

    // Validate file size (32MB limit from UploadThing)
    if (file.size > 32 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: {
            code: 'FILE_TOO_LARGE',
            message: 'File too large. Maximum size is 32MB.',
          },
        },
        { status: 400 }
      )
    }

    // Get options from form data
    const summaryLength = (formData.get('summaryLength') as 'short' | 'medium' | 'long') || 'medium'
    const style = (formData.get('style') as 'notes' | 'outline' | 'summary') || 'notes'

    // Create job in the store
    const job = createJob(file.name, file.size, file.type)
    
    // Store the file data temporarily for processing
    // In a real implementation, you might want to store this in a more durable way
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    
    // Store file data in the job (for MVP - in production, use proper storage)
    const jobData = {
      fileBuffer,
      options: {
        summaryLength,
        style,
      },
    }
    
    // Update job with file data (this is a simple approach for MVP)
    // In production, you'd want to store the file in a proper storage system
    if (typeof global !== 'undefined') {
      if (!global.jobFiles) {
        global.jobFiles = new Map()
      }
      global.jobFiles.set(job.id, jobData)
    }

    console.log(`Created generation job: ${job.id} for file: ${file.name}`)

    const response: GenerateResponse = {
      jobId: job.id,
      status: job.status,
      estimatedTime: '3-5 minutes',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}