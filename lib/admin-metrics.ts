import type { AdminMetrics, Job, JobStatus, SystemHealthStatus } from '@/types'
import { StorageService } from './storage-service'
import { getAllJobs } from './job-store'
import { TeacherService } from './teacher-service'

const JOB_STATUSES: JobStatus[] = ['queued', 'extracting', 'summarizing', 'rendering', 'complete', 'failed']

function bytesToMb(value: number): number {
  if (!value) {
    return 0
  }
  return Number((value / (1024 * 1024)).toFixed(2))
}

function buildUsageTrend(libraryItems: Awaited<ReturnType<typeof StorageService.getAll>>, jobs: Job[]) {
  const today = new Date()
  const trend = Array.from({ length: 7 }).map((_, index) => {
    const dayStart = new Date(today)
    dayStart.setHours(0, 0, 0, 0)
    dayStart.setDate(dayStart.getDate() - (6 - index))

    const dayEnd = new Date(dayStart)
    dayEnd.setHours(23, 59, 59, 999)

    const uploadsForDay = libraryItems.filter(item => {
      const createdAt = new Date(item.createdAt)
      return createdAt >= dayStart && createdAt <= dayEnd
    })

    const jobsForDay = jobs.filter(job => {
      const createdAt = new Date(job.createdAt)
      return createdAt >= dayStart && createdAt <= dayEnd
    })

    const storageBytes = uploadsForDay.reduce((sum, item) => sum + (item.fileSize || 0), 0)

    return {
      date: dayStart.toISOString(),
      uploads: uploadsForDay.length,
      aiRequests: jobsForDay.length,
      storageMb: bytesToMb(storageBytes),
    }
  })

  return trend
}

function buildSystemHealthStates(): SystemHealthStatus[] {
  const now = new Date().toISOString()
  const uploadSecret = Boolean(process.env.UPLOADTHING_SECRET)
  const uploadAppId = Boolean(process.env.UPLOADTHING_APP_ID)
  const anthro = Boolean(process.env.ANTHROPIC_API_KEY)
  const nano = Boolean(process.env.NANO_BANANA_API_KEY)
  const gemini = Boolean(process.env.GEMINI_API_KEY)
  const adminKey = Boolean(process.env.ADMIN_DASHBOARD_KEY)

  const statuses: SystemHealthStatus[] = [
    {
      id: 'anthropic',
      service: 'Claude (Anthropic)',
      status: anthro ? 'healthy' : 'critical',
      message: anthro ? 'API key configured' : 'Missing ANTHROPIC_API_KEY',
      envVars: ['ANTHROPIC_API_KEY'],
      lastChecked: now,
    },
    {
      id: 'nano-banana',
      service: 'Nano Banana',
      status: nano ? 'healthy' : 'warning',
      message: nano ? 'Ready for handwriting rendering' : 'NANO_BANANA_API_KEY not set',
      envVars: ['NANO_BANANA_API_KEY'],
      lastChecked: now,
    },
    {
      id: 'uploadthing',
      service: 'UploadThing',
      status: uploadSecret && uploadAppId ? 'healthy' : uploadSecret || uploadAppId ? 'warning' : 'critical',
      message: uploadSecret && uploadAppId ? 'Uploads enabled' : 'UploadThing credentials incomplete',
      envVars: ['UPLOADTHING_APP_ID', 'UPLOADTHING_SECRET'],
      lastChecked: now,
    },
    {
      id: 'gemini',
      service: 'Gemini OCR',
      status: gemini ? 'healthy' : 'warning',
      message: gemini ? 'Fallback OCR ready' : 'Optional GEMINI_API_KEY missing',
      envVars: ['GEMINI_API_KEY'],
      lastChecked: now,
    },
    {
      id: 'admin-key',
      service: 'Admin Dashboard Key',
      status: adminKey ? 'healthy' : 'critical',
      message: adminKey ? 'Secure access enforced' : 'ADMIN_DASHBOARD_KEY missing',
      envVars: ['ADMIN_DASHBOARD_KEY'],
      lastChecked: now,
    },
  ]

  return statuses
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
  try {
    console.log('[admin-metrics] Starting metrics collection...')

    const libraryItems = await StorageService.getAll().catch(err => {
      console.error('[admin-metrics] Error loading library items:', err)
      return []
    })

    console.log(`[admin-metrics] Loaded ${libraryItems.length} library items`)

    const jobs = getAllJobs()
    console.log(`[admin-metrics] Loaded ${jobs.length} jobs`)

    const jobTotals = JOB_STATUSES.reduce(
      (acc, status) => {
        acc[status] = 0
        return acc
      },
      {} as Record<JobStatus, number>
    )

    jobs.forEach(job => {
      jobTotals[job.status] = (jobTotals[job.status] || 0) + 1
    })

    const totalLibrarySize = libraryItems.reduce((sum, item) => sum + (item.fileSize || 0), 0)
    const storageUsageMb = bytesToMb(totalLibrarySize)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentLibraryItems = libraryItems.filter(item => new Date(item.createdAt) >= sevenDaysAgo).length

    const trend = buildUsageTrend(libraryItems, jobs)

    const metrics: AdminMetrics = {
      summary: {
        totalLibraryItems: libraryItems.length,
        recentLibraryItems,
        activeJobs: jobTotals.extracting + jobTotals.summarizing + jobTotals.rendering,
        queuedJobs: jobTotals.queued,
        failedJobs: jobTotals.failed,
        totalTeachers: 0,
        activeTeachers: 0,
        disabledTeachers: 0,
        storageUsageMb,
      },
      usage: {
        trend,
        totals: {
          uploads: libraryItems.length,
          aiRequests: jobs.length,
          storageMb: storageUsageMb,
        },
      },
      billing: {
        plan: libraryItems.length > 500 ? 'Scale' : 'Growth',
        limit: 1000,
        used: Math.min(1000, libraryItems.length + jobTotals.extracting + jobTotals.rendering),
        renewsOn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
      },
      jobs: {
        totals: jobTotals,
        recent: [...jobs]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 8)
          .map(job => ({
            id: job.id,
            fileName: job.fileName,
            fileSize: job.fileSize,
            status: job.status,
            progress: job.progress,
            createdAt: new Date(job.createdAt).toISOString(),
            updatedAt: new Date(job.updatedAt).toISOString(),
            estimatedTimeRemaining: job.estimatedTimeRemaining,
            errorMessage: job.errorMessage,
          })),
      },
      systemHealth: buildSystemHealthStates(),
    }

    console.log('[admin-metrics] Metrics collection complete')
    return metrics
  } catch (error) {
    console.error('[admin-metrics] Fatal error collecting metrics:', error)
    throw error
  }
}
