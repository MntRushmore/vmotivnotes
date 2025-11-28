import { NextRequest, NextResponse } from 'next/server'
import { GenerationService, createGenerationError } from '@/lib/generation-service'
import { GenerationRequest, GenerationResult } from '@/types/generation'

export const runtime = 'nodejs'
export const maxDuration = 600

async function extractTextFromFile(fileId: string, fileName: string): Promise<string> {
  const isImage = fileName.toLowerCase().match(/\.(jpg|jpeg|png|tiff|bmp)$/i)
  const isPDF = fileName.toLowerCase().endsWith('.pdf')
  
  const endpoint = isImage ? '/ocr' : isPDF ? '/extract' : null
  
  if (!endpoint) {
    throw createGenerationError(
      'UNSUPPORTED_FILE_TYPE',
      `File type not supported: ${fileName}`,
      'extraction',
      'Supported formats: PDF, JPG, JPEG, PNG, TIFF, BMP',
      false
    )
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileId })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Extraction failed: ${errorData.error || response.statusText}`)
  }

  const data = await response.json()
  
  if (data.error) {
    throw new Error(data.error)
  }

  return data.text || data.result?.text || ''
}

async function summarizeText(text: string, mode: '9th-grade' | 'SAT', generationId: string): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/summarize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, mode, generationId })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Summarization failed: ${errorData.error || response.statusText}`)
  }

  return response.json()
}

async function generateHandwriting(text: string, generationId: string): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/handwriting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, generationId })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Handwriting generation failed: ${errorData.error || response.statusText}`)
  }

  return response.json()
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const generationId = GenerationService.generateId()
  let generationResult: Partial<GenerationResult> = {
    id: generationId,
    status: GenerationService.createGenerationStatus(generationId)
  }

  try {
    const body: GenerationRequest = await request.json()
    const { fileId, fileName, summaryMode, extractedText } = body

    if (!fileId || !fileName) {
      return NextResponse.json(
        { error: 'fileId and fileName are required' },
        { status: 400 }
      )
    }

    if (!['9th-grade', 'SAT'].includes(summaryMode)) {
      return NextResponse.json(
        { error: 'summaryMode must be either "9th-grade" or "SAT"' },
        { status: 400 }
      )
    }

    GenerationService.updateGenerationStatus(generationId, {
      status: 'extracting',
      progress: 10,
      currentStep: 'Extracting text from file...'
    })

    let text: string
    
    if (extractedText) {
      text = extractedText
      GenerationService.updateGenerationStatus(generationId, {
        progress: 20,
        currentStep: 'Using provided extracted text...'
      })
    } else {
      text = await GenerationService.withTimeout(
        () => extractTextFromFile(fileId, fileName),
        120000,
        'Text extraction'
      )
      
      generationResult.extractedText = text
      
      GenerationService.updateGenerationStatus(generationId, {
        progress: 20,
        currentStep: 'Text extraction completed...'
      })
    }

    if (!text || text.trim().length < 50) {
      throw createGenerationError(
        'INSUFFICIENT_TEXT',
        'Extracted text is too short or empty',
        'extraction',
        'The file must contain at least 50 characters of readable text',
        false
      )
    }

    const summaryResult = await GenerationService.withTimeout(
      () => summarizeText(text, summaryMode, generationId),
      300000,
      'Text summarization'
    )
    
    generationResult.summary = summaryResult
    
    GenerationService.updateGenerationStatus(generationId, {
      progress: 60,
      currentStep: 'Creating handwritten version...'
    })

    const textForHandwriting = `
Summary:
${summaryResult.summary}

Key Points:
${summaryResult.keyPoints.map((point: string, index: number) => `${index + 1}. ${point}`).join('\n')}

Interactive Notes:
${summaryResult.interactiveNotes.map((note: string) => `• ${note}`).join('\n')}
    `.trim()

    const handwritingResult = await GenerationService.withTimeout(
      () => generateHandwriting(textForHandwriting, generationId),
      300000,
      'Handwriting generation'
    )
    
    generationResult.handwriting = handwritingResult

    GenerationService.updateGenerationStatus(generationId, {
      status: 'complete',
      progress: 100,
      currentStep: 'Generation completed successfully!'
    })

    const finalResult: GenerationResult = {
      ...generationResult as GenerationResult,
      status: GenerationService.getGenerationStatus(generationId)!
    }

    return NextResponse.json(finalResult)
  } catch (error) {
    console.error('Generation orchestration error:', error)
    
    let genError = createGenerationError(
      'ORCHESTRATION_ERROR',
      'Failed to complete generation pipeline',
      'orchestration',
      error instanceof Error ? error.message : 'Unknown error',
      false
    )

    if (error instanceof Error) {
      if (error.message.includes('Extraction failed')) {
        genError = createGenerationError(
          'EXTRACTION_ERROR',
          'Text extraction failed',
          'extraction',
          error.message,
          true
        )
      } else if (error.message.includes('Summarization failed')) {
        genError = createGenerationError(
          'SUMMARIZATION_ERROR',
          'Text summarization failed',
          'summarization',
          error.message,
          true
        )
      } else if (error.message.includes('Handwriting generation failed')) {
        genError = createGenerationError(
          'HANDWRITING_ERROR',
          'Handwriting generation failed',
          'handwriting',
          error.message,
          true
        )
      } else if (error.message.includes('timed out')) {
        genError = createGenerationError(
          'TIMEOUT',
          'Generation process timed out',
          'orchestration',
          error.message,
          false
        )
      }
    }

    GenerationService.setError(generationId, genError)

    return NextResponse.json(
      {
        generationId,
        error: genError.message,
        code: genError.code,
        step: genError.step,
        retryable: genError.retryable,
        status: GenerationService.getGenerationStatus(generationId)
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const generationId = searchParams.get('id')

  if (!generationId) {
    return NextResponse.json(
      { error: 'generationId query parameter is required' },
      { status: 400 }
    )
  }

  const status = GenerationService.getGenerationStatus(generationId)

  if (!status) {
    return NextResponse.json(
      { error: 'Generation not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({ status })
}