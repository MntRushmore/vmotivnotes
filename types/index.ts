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
  status: 'extracting' | 'summarizing' | 'rendering' | 'ready' | 'error' | 'failed'
  progress: number
  estimatedTimeRemaining?: number
  currentStep?: string
  error?: string
  errorMessage?: string
  pdfUrl?: string
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

export interface OnboardingData {
  name: string
  school: string
  preferredSummaryMode: '9th-grade' | 'sat'
  notifications: {
    emailOnCompletion: boolean
    emailOnError: boolean
    desktopNotifications: boolean
  }
}

export type OnboardingStep = 'welcome' | 'profile' | 'preferences' | 'confirmation'

export interface TourTooltip {
  id: string
  title: string
  content: string
  target: string
  position: 'top' | 'bottom' | 'left' | 'right'
  skipable?: boolean
}

export interface FAQEntry {
  id: string
  question: string
  answer: string
  category: 'general' | 'upload' | 'library' | 'generation' | 'troubleshooting'
}

export interface TroubleshootingGuide {
  id: string
  title: string
  description: string
  icon: string
  link?: string
  steps?: string[]
}

export type SupportTicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed'

export interface SupportTicket {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: SupportTicketStatus
  createdAt: string
  updatedAt: string
}

// ============================================
// TUTOR NOTE SYSTEM TYPES
// ============================================

export type GradeLevel = 'elementary' | 'middle' | 'high' | 'college' | 'general'

export interface QuickCheckQuestion {
  question: string
  answer?: string // Optional answer key for tutors
}

export interface TutorNote {
  id: string
  title: string
  intro: string
  gradeLevel: GradeLevel
  subject?: string
  bullets: string[]
  quickCheck: QuickCheckQuestion[]
  source: 'pdf' | 'topic'
  sourceDetails: string // filename or topic text
  createdAt: Date
  updatedAt: Date
  rawMarkdown: string // full note in markdown
}

export interface NoteSession {
  sessionId: string
  notes: TutorNote[]
  activeNoteId: string | null
  createdAt: Date
}

export interface GenerateNoteOptions {
  source: 'pdf' | 'topic'
  pdfFile?: File
  topic?: string
  gradeLevel?: GradeLevel
  subject?: string
  length?: 'concise' | 'standard' | 'detailed'
}

export type RefineInstruction = 'shorter' | 'longer' | 'simpler' | 'more-examples' | 'more-questions' | 'custom'

export interface Flashcard {
  front: string
  back: string
  hint?: string
}

export type QuizQuestionType = 'mcq' | 'tf' | 'short'
export type QuizDifficulty = 'easy' | 'medium' | 'hard'

export interface QuizQuestion {
  question: string
  type: QuizQuestionType
  difficulty: QuizDifficulty
  options?: string[] // For MCQ and True/False
  correctAnswer: number | string // Index for MCQ, 'true'/'false' for TF, string for short answer
  explanation: string
}

export interface RefineRequest {
  noteId: string
  instruction: RefineInstruction
  customInstruction?: string
  gradeLevel?: GradeLevel
}

export interface RealWorldApplication {
  category: 'career' | 'daily-life' | 'history' | 'current-events'
  description: string
}

export interface PracticeProblem {
  problem: string
  difficulty: 'easy' | 'medium' | 'hard'
  solution: string
  steps?: string[]
}

export interface StructuredNoteResponse {
  title: string
  intro: string
  gradeLevel: GradeLevel
  subject: string
  bullets: string[]
  quickCheck: QuickCheckQuestion[]
  realWorldApplications?: RealWorldApplication[]
  practiceProblems?: PracticeProblem[]
  diagrams?: string[] // Descriptions of diagrams/graphs to include
}
