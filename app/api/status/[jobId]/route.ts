import { NextRequest, NextResponse } from 'next/server'
import { getJob } from '@/lib/job-store'
import type { StatusResponse } from '@/types'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function GET(
  _request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const jobId = params.jobId
    
    if (!jobId) {
      return NextResponse.json(
        {
          error: {
            code: 'NO_JOB_ID',
            message: 'No job ID provided',
          },
        },
        { status: 400 }
      )
    }

    const job = getJob(jobId)
    
    if (!job) {
      return NextResponse.json(
        {
          error: {
            code: 'JOB_NOT_FOUND',
            message: 'Job not found',
          },
        },
        { status: 404 }
      )
    }

    const response: StatusResponse = {
      jobId: job.id,
      status: job.status,
      progress: job.progress,
      pdfUrl: job.pdfUrl,
      errorMessage: job.errorMessage,
      estimatedTimeRemaining: job.estimatedTimeRemaining,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Status API error:', error)
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