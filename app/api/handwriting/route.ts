import { NextRequest, NextResponse } from 'next/server'
import { GenerationService, createGenerationError } from '@/lib/generation-service'
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

  const response = await GenerationService.withRetry(
    async () => {
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
    },
    { maxAttempts: 3 },
    'Nano Banana API call'
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
      
      if (!GenerationService.validatePDFBuffer(buffer)) {
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
    
    if (!GenerationService.validatePDFBuffer(buffer)) {
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
    const { text, config: userConfig, generationId } = body

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

    if (generationId) {
      GenerationService.updateGenerationStatus(generationId, {
        status: 'rendering',
        progress: 75,
        currentStep: 'Generating handwritten PDF...'
      })
    }

    const result = await GenerationService.withTimeout(
      () => generateHandwritingPDF(text, config),
      240000,
      'Handwriting PDF generation'
    )

    if (generationId) {
      GenerationService.updateGenerationStatus(generationId, {
        status: 'complete',
        progress: 100,
        currentStep: 'Handwritten PDF generated successfully'
      })
    }

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

    if (body?.generationId) {
      GenerationService.setError(body.generationId, genError)
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