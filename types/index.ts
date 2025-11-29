export interface ExtractionResult {
  text: string
  metadata: FileMetadata
  confidence?: number
  error?: ExtractionError
}

export interface FileMetadata {
  fileName: string
  fileSize: number
  mimeType: string
  pageCount?: number
  uploadedAt: Date
  extractionMethod?: 'pdf-parse' | 'tesseract' | 'gemini-vision'
}

export interface ExtractionError {
  code: string
  message: string
  details?: string
}

export interface UploadResult {
  url: string
  key: string
  name: string
  size: number
}

export interface Job {
  id: string
  status: JobStatus
  progress: number
  pdfUrl?: string
  errorMessage?: string
  fileName: string
  fileSize: number
  mimeType: string
  extractedText?: string
  summary?: string
  createdAt: Date
  updatedAt: Date
  estimatedTimeRemaining?: number
}

export type JobStatus = 'queued' | 'extracting' | 'summarizing' | 'rendering' | 'complete' | 'failed'

export interface PDFLibraryItem {
  id: string
  title: string
  url: string
  thumbnailUrl?: string
  createdAt: Date
  topic: string
  category?: string
  summarySnippet?: string
  status: 'ready' | 'processing' | 'error'
  fileSize: number
  metadata?: {
    extractionConfidence?: number
    summaryQuality?: number
    pageCount?: number
  }
}

export interface GenerationStatus {
  id: string
  status: 'extracting' | 'summarizing' | 'rendering' | 'ready' | 'error'
  progress: number
  estimatedTimeRemaining?: number
  currentStep?: string
  error?: string
  result?: PDFLibraryItem
}

export interface SATTopic {
  topic: string
  category: string
  description?: string
}

export interface StatusResponse {
  jobId: string
  status: JobStatus
  progress: number
  pdfUrl?: string
  errorMessage?: string
  estimatedTimeRemaining?: number
}

export interface GenerateRequest {
  file: File
  options?: {
    summaryLength?: 'short' | 'medium' | 'long'
    style?: 'notes' | 'outline' | 'summary'
  }
}

export interface GenerateResponse {
  jobId: string
  status: JobStatus
  estimatedTime: string
}

export interface UserProfile {
  name: string
  email: string
  school?: string
  avatar?: string
}

export interface ApiKeyConfig {
  uploadthing?: string
  anthropic?: string
  nanoBanana?: string
}

export interface NotificationPreferences {
  emailOnCompletion: boolean
  emailOnError: boolean
  desktopNotifications: boolean
}

export interface UserPreferences {
  defaultSummaryMode: '9th-grade' | 'sat'
  notifications: NotificationPreferences
}

export interface ExportHistoryEntry {
  id: string
  timestamp: number
  fileName: string
  fileSize: number
  status: 'success' | 'failed'
  error?: string
}

export type TeacherStatus = 'active' | 'disabled' | 'invited'

export interface Teacher {
  id: string
  name: string
  email: string
  subject: string
  location?: string
  status: TeacherStatus
  totalUploads: number
  totalGenerations: number
  lastActiveAt: string
  joinedAt: string
  updatedAt: string
}

export type HealthStatus = 'healthy' | 'warning' | 'critical'

export interface SystemHealthStatus {
  id: string
  service: string
  status: HealthStatus
  message: string
  envVars: string[]
  lastChecked: string
}

export interface UsageTrendPoint {
  date: string
  uploads: number
  aiRequests: number
  storageMb: number
}

export interface AdminJobLog {
  id: string
  fileName: string
  fileSize: number
  status: JobStatus
  progress: number
  createdAt: string
  updatedAt: string
  estimatedTimeRemaining?: number
  errorMessage?: string
}

export interface AdminMetrics {
  summary: {
    totalLibraryItems: number
    recentLibraryItems: number
    activeJobs: number
    queuedJobs: number
    failedJobs: number
    totalTeachers: number
    activeTeachers: number
    disabledTeachers: number
    storageUsageMb: number
  }
  usage: {
    trend: UsageTrendPoint[]
    totals: {
      uploads: number
      aiRequests: number
      storageMb: number
    }
  }
  billing: {
    plan: string
    limit: number
    used: number
    renewsOn: string
  }
  jobs: {
    totals: Record<JobStatus, number>
    recent: AdminJobLog[]
  }
  systemHealth: SystemHealthStatus[]
}
