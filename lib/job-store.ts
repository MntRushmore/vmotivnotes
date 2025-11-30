import { nanoid } from 'nanoid'
import type { Job, JobStatus } from '@/types'

interface JobStore {
  jobs: Map<string, Job>
}

// Use global to share job store across Next.js server instances in dev mode
declare global {
  var jobStore: JobStore | undefined
}

// Simple in-memory store for MVP
// In production, this should be replaced with Redis or a database
const jobStore: JobStore = global.jobStore || {
  jobs: new Map(),
}

if (!global.jobStore) {
  global.jobStore = jobStore
  console.log('[job-store] Initialized global job store')
}

// Cleanup old jobs (older than 24 hours)
function cleanupOldJobs() {
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  
  for (const [jobId, job] of jobStore.jobs.entries()) {
    if (job.createdAt < twentyFourHoursAgo) {
      jobStore.jobs.delete(jobId)
      console.log(`Cleaned up old job: ${jobId}`)
    }
  }
}

// Run cleanup every hour
setInterval(cleanupOldJobs, 60 * 60 * 1000)

export function createJob(fileName: string, fileSize: number, mimeType: string): Job {
  const jobId = nanoid()
  const now = new Date()

  const job: Job = {
    id: jobId,
    status: 'queued',
    progress: 0,
    fileName,
    fileSize,
    mimeType,
    createdAt: now,
    updatedAt: now,
    estimatedTimeRemaining: 180, // three minutes to load in max
  }

  jobStore.jobs.set(jobId, job)
  console.log(`[job-store] Created job: ${jobId} for file: ${fileName} (total jobs: ${jobStore.jobs.size})`)

  return job
}

export function getJob(jobId: string): Job | undefined {
  const job = jobStore.jobs.get(jobId)
  console.log(`[job-store] Getting job: ${jobId}, found: ${!!job}, total jobs: ${jobStore.jobs.size}`)
  if (!job && jobStore.jobs.size > 0) {
    console.log(`[job-store] Available jobs:`, Array.from(jobStore.jobs.keys()))
  }
  return job
}

export function updateJob(jobId: string, updates: Partial<Job>): Job | null {
  const job = jobStore.jobs.get(jobId)
  if (!job) {
    return null
  }
  
  const updatedJob = {
    ...job,
    ...updates,
    updatedAt: new Date(),
  }
  
  jobStore.jobs.set(jobId, updatedJob)
  console.log(`Updated job: ${jobId}, status: ${updatedJob.status}, progress: ${updatedJob.progress}`)
  
  return updatedJob
}

export function updateJobProgress(jobId: string, status: JobStatus, progress: number, estimatedTimeRemaining?: number): Job | null {
  return updateJob(jobId, {
    status,
    progress,
    estimatedTimeRemaining,
  })
}

export function updateJobError(jobId: string, errorMessage: string): Job | null {
  return updateJob(jobId, {
    status: 'failed',
    errorMessage,
    progress: 0,
  })
}

export function updateJobComplete(jobId: string, pdfUrl: string): Job | null {
  return updateJob(jobId, {
    status: 'complete',
    progress: 100,
    pdfUrl,
    estimatedTimeRemaining: 0,
  })
}

export function getAllJobs(): Job[] {
  return Array.from(jobStore.jobs.values())
}

export function getQueuedJobs(): Job[] {
  return Array.from(jobStore.jobs.values()).filter(job => job.status === 'queued')
}