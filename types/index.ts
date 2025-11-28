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
