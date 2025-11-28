import { GenerationRequest, GenerationStatus, GenerationResult, GenerationError, RetryConfig } from '@/types'
import { v4 as uuidv4 } from 'uuid'

interface GenerationState {
  [key: string]: GenerationStatus
}

class GenerationService {
  private state: GenerationState = {}
  private readonly retryConfig: RetryConfig = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2
  }

  /**
   * Start a new generation process
   */
  async startGeneration(request: GenerationRequest): Promise<string> {
    const id = uuidv4()
    
    // Initialize state
    this.state[id] = {
      id,
      status: 'extracting',
      progress: 0,
      currentStep: 'Extracting text from PDF...',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Start the generation process in the background
    this.runGeneration(id, request).catch(error => {
      console.error(`Generation ${id} failed:`, error)
      this.updateStatus(id, {
        status: 'error',
        error: {
          code: 'GENERATION_FAILED',
          message: error.message || 'Unknown error occurred',
          step: 'orchestration',
          retryable: true
        }
      })
    })

    return id
  }

  /**
   * Get the current status of a generation
   */
  getStatus(id: string): GenerationStatus | null {
    return this.state[id] || null
  }

  /**
   * Get the full result of a completed generation
   */
  async getResult(id: string): Promise<GenerationResult | null> {
    const status = this.getStatus(id)
    if (!status) return null

    // In a real implementation, this would fetch from a database
    // For now, we'll return the status as the result
    return {
      id,
      status,
      // These would be populated by the generation process
      summary: undefined,
      handwriting: undefined,
      extractedText: undefined
    }
  }

  /**
   * Run the complete generation pipeline
   */
  private async runGeneration(id: string, request: GenerationRequest): Promise<void> {
    try {
      // Step 1: Extract text
      this.updateStatus(id, {
        status: 'extracting',
        progress: 10,
        currentStep: 'Extracting text from PDF...'
      })

      let extractedText = request.extractedText
      if (!extractedText) {
        const extracted = await this.extractText(request.fileId)
        if (!extracted) {
          throw new Error('Failed to extract text from PDF')
        }
        extractedText = extracted
      }

      // Step 2: Summarize
      this.updateStatus(id, {
        status: 'summarizing',
        progress: 40,
        currentStep: 'Generating summary with Claude...'
      })

      const summary = await this.summarizeText(extractedText, request.summaryMode)

      // Step 3: Render handwriting
      this.updateStatus(id, {
        status: 'rendering',
        progress: 70,
        currentStep: 'Rendering handwritten PDF...'
      })

      const handwriting = await this.renderHandwriting(summary.summary)

      // Complete
      this.updateStatus(id, {
        status: 'complete',
        progress: 100,
        currentStep: 'Complete!'
      })

    } catch (error) {
      this.updateStatus(id, {
        status: 'error',
        error: {
          code: error.code || 'GENERATION_ERROR',
          message: error.message || 'Generation failed',
          step: error.step || 'orchestration',
          details: error.details,
          retryable: error.retryable !== false
        }
      })
    }
  }

  /**
   * Extract text from PDF
   */
  private async extractText(fileId: string): Promise<string | null> {
    return this.withRetry(async () => {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileId })
      })

      if (!response.ok) {
        throw new Error(`Extraction failed: ${response.statusText}`)
      }

      const result = await response.json()
      return result.text || null
    }, 'extraction')
  }

  /**
   * Summarize text using Claude
   */
  private async summarizeText(text: string, mode: '9th-grade' | 'SAT'): Promise<any> {
    return this.withRetry(async () => {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, mode })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || `Summarization failed: ${response.statusText}`)
      }

      return response.json()
    }, 'summarization')
  }

  /**
   * Render handwritten PDF
   */
  private async renderHandwriting(text: string): Promise<any> {
    return this.withRetry(async () => {
      const response = await fetch('/api/handwriting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || `Handwriting rendering failed: ${response.statusText}`)
      }

      return response.json()
    }, 'handwriting')
  }

  /**
   * Execute a function with retry logic
   */
  private async withRetry<T>(
    fn: () => Promise<T>,
    step: 'extraction' | 'summarization' | 'handwriting'
  ): Promise<T> {
    let lastError: Error

    for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error
        
        if (attempt === this.retryConfig.maxAttempts) {
          throw {
            ...error,
            step,
            retryable: false
          }
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffFactor, attempt - 1),
          this.retryConfig.maxDelay
        )

        console.warn(`Attempt ${attempt} failed for ${step}, retrying in ${delay}ms:`, error)
        await this.sleep(delay)
      }
    }

    throw lastError!
  }

  /**
   * Update the status of a generation
   */
  private updateStatus(id: string, updates: Partial<GenerationStatus>): void {
    if (!this.state[id]) return

    this.state[id] = {
      ...this.state[id],
      ...updates,
      updatedAt: new Date()
    }

    // In a real implementation, this would persist to a database
    // For now, we just keep it in memory
  }

  /**
   * Sleep for a given number of milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Clean up old generations (memory management)
   */
  cleanup(): void {
    const now = new Date()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours

    Object.keys(this.state).forEach(id => {
      const generation = this.state[id]
      if (now.getTime() - generation.updatedAt.getTime() > maxAge) {
        delete this.state[id]
      }
    })
  }
}

// Export utility functions
export function createGenerationError(
  code: string,
  message: string,
  step: GenerationError['step'],
  details?: string,
  retryable: boolean = true
): GenerationError {
  return {
    code,
    message,
    step,
    details,
    retryable
  }
}

// Singleton instance
export const generationService = new GenerationService()
export { GenerationService }

// Clean up old generations every hour
if (typeof window !== 'undefined') {
  setInterval(() => {
    generationService.cleanup()
  }, 60 * 60 * 1000)
}