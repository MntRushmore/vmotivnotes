import type { FileMetadata, ExtractionError } from '@/types'

const MAX_FILE_SIZE = 50 * 1024 * 1024
const ALLOWED_PDF_TYPES = ['application/pdf']
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

export function validateFileSize(fileSize: number): { valid: boolean; error?: ExtractionError } {
  if (fileSize > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: 'File size exceeds 50MB limit',
        details: `File size: ${(fileSize / 1024 / 1024).toFixed(2)}MB`,
      },
    }
  }
  return { valid: true }
}

export function validateMimeType(mimeType: string, allowedTypes: string[]): { valid: boolean; error?: ExtractionError } {
  if (!allowedTypes.includes(mimeType)) {
    return {
      valid: false,
      error: {
        code: 'INVALID_FILE_TYPE',
        message: 'File type not supported',
        details: `Allowed types: ${allowedTypes.join(', ')}`,
      },
    }
  }
  return { valid: true }
}

export function validatePdfFile(fileSize: number, mimeType: string): { valid: boolean; error?: ExtractionError } {
  const sizeValidation = validateFileSize(fileSize)
  if (!sizeValidation.valid) return sizeValidation

  return validateMimeType(mimeType, ALLOWED_PDF_TYPES)
}

export function validateImageFile(fileSize: number, mimeType: string): { valid: boolean; error?: ExtractionError } {
  const sizeValidation = validateFileSize(fileSize)
  if (!sizeValidation.valid) return sizeValidation

  return validateMimeType(mimeType, ALLOWED_IMAGE_TYPES)
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError || new Error('Retry failed')
}

export function createFileMetadata(
  fileName: string,
  fileSize: number,
  mimeType: string,
  additionalData?: Partial<FileMetadata>
): FileMetadata {
  return {
    fileName,
    fileSize,
    mimeType,
    uploadedAt: new Date(),
    ...additionalData,
  }
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_')
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
}
