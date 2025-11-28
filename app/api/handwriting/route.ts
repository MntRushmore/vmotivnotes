import { NextRequest, NextResponse } from 'next/server'
import { createGenerationError } from '@/lib/generation-service'
import { HandwritingResult, HandwritingConfig } from '@/types/generation'

export const runtime = 'nodejs'
export const maxDuration = 300

interface HandwritingRequest {
  text: string
  config?: Partial<HandwritingConfig>
  generationId?: string
}

const DEFAULT_HANDWRITING_CONFIG: HandwritingConfig = {
  model: 'handwriting-neat-v2',
  parameters: {
    fontSize: 14,
    lineHeight: 1.5,
    pageMargin: 40,
    handwritingStyle: 'mixed'
  }
}

async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      
      if (attempt === maxAttempts) {
        throw error
      }

      const delay = baseDelay * Math.pow(2, attempt - 1)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

async function generateHandwritingPDF(
  text: string,
  config: HandwritingConfig
): Promise<HandwritingResult> {
  if (!process.env.NANO_BANANA_API_KEY) {
    throw createGenerationError(
      'MISSING_API_KEY',
      'Nano Banana API key is not configured',
      'handwriting',
      'Please set NANO_BANANA_API_KEY in your environment variables',
      false
    )
  }

  const response = await withRetry(async () => {
      const formData = new FormData()
      formData.append('text', text)
      formData.append('model', config.model)
      formData.append('format', 'pdf')
      formData.append('parameters', JSON.stringify(config.parameters))

      const apiResponse = await fetch('https://api.nanobanana.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NANO_BANANA_API_KEY}`,
        },
        body: formData
      })

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}))
        throw new Error(`Nano Banana API error: ${apiResponse.status} - ${errorData.message || apiResponse.statusText}`)
      }

      return apiResponse
    }
  )

  const contentType = response.headers.get('content-type')
  const startTime = Date.now()

  if (contentType?.includes('application/json')) {
    const data = await response.json()
    
    if (data.url) {
      const pdfResponse = await fetch(data.url)
      if (!pdfResponse.ok) {
        throw new Error('Failed to fetch generated PDF from URL')
      }
      
      const buffer = Buffer.from(await pdfResponse.arrayBuffer())
      
      // Simple PDF validation - check for %PDF header
      if (!buffer.toString('ascii', 0, 4).includes('%PDF')) {
        throw new Error('Invalid PDF format received')
      }

      return {
        pdfUrl: data.url,
        pdfBuffer: buffer,
        metadata: {
          pageCount: Math.ceil(text.length / 2000),
          renderingTime: Date.now() - startTime,
          model: config.model
        }
      }
    } else {
      throw new Error('No PDF URL in response')
    }
  } else if (contentType?.includes('application/pdf')) {
    const buffer = Buffer.from(await response.arrayBuffer())
    
    // Simple PDF validation - check for %PDF header
    if (!buffer.toString('ascii', 0, 4).includes('%PDF')) {
      throw new Error('Invalid PDF format received')
    }

    return {
      pdfUrl: `/api/handwriting/download/${Date.now()}`,
      pdfBuffer: buffer,
      metadata: {
        pageCount: Math.ceil(text.length / 2000),
        renderingTime: Date.now() - startTime,
        model: config.model
      }
    }
  } else {
    throw new Error(`Unexpected content type: ${contentType}`)
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: HandwritingRequest | undefined
  
  try {
    body = await request.json() as HandwritingRequest
    const { text, config: userConfig } = body

    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Text is required and must be a string' }, { status: 400 })
    }

    const config: HandwritingConfig = {
      ...DEFAULT_HANDWRITING_CONFIG,
      ...userConfig,
      parameters: {
        ...DEFAULT_HANDWRITING_CONFIG.parameters,
        ...userConfig?.parameters
      }
    }

    const result = await generateHandwritingPDF(text, config)

    return NextResponse.json({
      pdfUrl: result.pdfUrl,
      metadata: result.metadata
    })
  } catch (error) {
    console.error('Handwriting generation error:', error)
    
    let genError = createGenerationError(
      'API_ERROR',
      'Failed to generate handwritten PDF',
      'handwriting',
      error instanceof Error ? error.message : 'Unknown error',
      false
    )

    if (error instanceof Error) {
      if (error.message.includes('rate_limit')) {
        genError = createGenerationError(
          'RATE_LIMIT',
          'API rate limit exceeded',
          'handwriting',
          error.message,
          true
        )
      } else if (error.message.includes('timed out')) {
        genError = createGenerationError(
          'TIMEOUT',
          'Request timed out',
          'handwriting',
          error.message,
          true
        )
      } else if (error.message.includes('Invalid PDF')) {
        genError = createGenerationError(
          'INVALID_PDF',
          'Received invalid PDF format',
          'handwriting',
          error.message,
          false
        )
      }
    }

    return NextResponse.json(
      { 
        error: genError.message,
        code: genError.code,
        step: genError.step,
        retryable: genError.retryable
      },
      { status: 500 }
    )
  }
}