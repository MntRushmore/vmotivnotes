export interface GenerationRequest {
  fileId: string
  fileName: string
  summaryMode: '9th-grade' | 'SAT'
  extractedText?: string
}

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
  status: 'extracting' | 'summarizing' | 'rendering' | 'complete' | 'error'
  progress: number
  currentStep: string
  error?: GenerationError
  createdAt: Date
  updatedAt: Date
}

export interface SummaryResult {
  summary: string
  keyPoints: string[]
  interactiveNotes: string[]
  metadata: {
    mode: '9th-grade' | 'SAT'
    wordCount: number
    processingTime: number
  }
}

export interface HandwritingResult {
  pdfUrl: string
  pdfBuffer?: Buffer
  metadata: {
    pageCount: number
    renderingTime: number
    model: string
  }
}

export interface GenerationResult {
  id: string
  status: GenerationStatus
  summary?: SummaryResult
  handwriting?: HandwritingResult
  extractedText?: string
}

export interface GenerationError {
  code: string
  message: string
  step: 'extraction' | 'summarization' | 'handwriting' | 'orchestration'
  details?: string
  retryable: boolean
}

export interface RetryConfig {
  maxAttempts: number
  baseDelay: number
  maxDelay: number
  backoffFactor: number
}

export interface ClaudePromptConfig {
  model: string
  maxTokens: number
  temperature: number
  systemPrompt: string
}

export interface HandwritingConfig {
  model: string
  parameters: {
    fontSize?: number
    lineHeight?: number
    pageMargin?: number
    handwritingStyle?: 'cursive' | 'print' | 'mixed'
  }
}