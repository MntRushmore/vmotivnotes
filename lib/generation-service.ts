import { GenerationStatus, RetryConfig, GenerationError } from '@/types/generation'

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2
}

const generationStore = new Map<string, GenerationStatus>()

export class GenerationService {
  static createGenerationStatus(id: string): GenerationStatus {
    const status: GenerationStatus = {
      id,
      status: 'extracting',
      progress: 0,
      currentStep: 'Starting extraction...',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    generationStore.set(id, status)
    return status
  }

  static updateGenerationStatus(
    id: string,
    updates: Partial<Omit<GenerationStatus, 'id' | 'createdAt'>>
  ): GenerationStatus | null {
    const status = generationStore.get(id)
    if (!status) return null

    const updatedStatus: GenerationStatus = {
      ...status,
      ...updates,
      updatedAt: new Date()
    }
    generationStore.set(id, updatedStatus)
    return updatedStatus
  }

  static getGenerationStatus(id: string): GenerationStatus | null {
    return generationStore.get(id) || null
  }

  static setError(id: string, error: GenerationError): GenerationStatus {
    return this.updateGenerationStatus(id, {
      status: 'error',
      error,
      progress: 0
    })!
  }

  static async withRetry<T>(
    operation: () => Promise<T>,
    retryConfig: Partial<RetryConfig> = {},
    context: string
  ): Promise<T> {
    const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig }
    let lastError: Error

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error as Error
        console.error(`Attempt ${attempt} failed for ${context}:`, error)

        if (attempt === config.maxAttempts) {
          break
        }

        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffFactor, attempt - 1),
          config.maxDelay
        )
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError!
  }

  static async withTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number,
    context: string
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeoutMs}ms: ${context}`))
      }, timeoutMs)
    })

    return Promise.race([operation(), timeoutPromise])
  }

  static validatePDFBuffer(buffer: Buffer): boolean {
    if (!Buffer.isBuffer(buffer)) return false
    if (buffer.length < 100) return false

    const header = buffer.subarray(0, 4).toString()
    return header === '%PDF'
  }

  static cleanupOldGenerations(maxAge: number = 24 * 60 * 60 * 1000): void {
    const now = Date.now()
    for (const [id, status] of generationStore.entries()) {
      if (now - status.createdAt.getTime() > maxAge) {
        generationStore.delete(id)
      }
    }
  }

  static generateId(): string {
    return `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

export const createGenerationError = (
  code: string,
  message: string,
  step: GenerationError['step'],
  details?: string,
  retryable: boolean = false
): GenerationError => ({
  code,
  message,
  step,
  details,
  retryable
})