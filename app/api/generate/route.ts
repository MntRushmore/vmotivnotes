import { NextRequest, NextResponse } from 'next/server'
import { createGenerationError } from '@/lib/generation-service'
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
  const generationId = 'gen_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  let generationResult: Partial<GenerationResult> = {
    id: generationId,
    status: {
      id: generationId,
      status: 'extracting',
      progress: 0,
      currentStep: 'Starting generation...',
      createdAt: new Date(),
      updatedAt: new Date()
    }
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

    // Update status to extracting
    generationResult.status = {
      ...generationResult.status!,
      status: 'extracting',
      progress: 10,
      currentStep: 'Extracting text from file...',
      updatedAt: new Date()
    }

    let text: string
    
    if (extractedText) {
      text = extractedText
      generationResult.status = {
        ...generationResult.status!,
        progress: 20,
        currentStep: 'Using provided extracted text...',
        updatedAt: new Date()
      }
    } else {
      text = await extractTextFromFile(fileId, fileName)

      generationResult.extractedText = text

      generationResult.status = {
        ...generationResult.status!,
        progress: 20,
        currentStep: 'Text extraction completed...',
        updatedAt: new Date()
      }
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

    const summaryResult = await summarizeText(text, summaryMode, generationId)
    
    generationResult.summary = summaryResult
    
    generationResult.status = {
      ...generationResult.status!,
      progress: 60,
      currentStep: 'Creating handwritten version...',
      updatedAt: new Date()
    }

    const textForHandwriting = `
Summary:
${summaryResult.summary}

Key Points:
${summaryResult.keyPoints.map((point: string, index: number) => `${index + 1}. ${point}`).join('\n')}

Interactive Notes:
${summaryResult.interactiveNotes.map((note: string) => `• ${note}`).join('\n')}
    `.trim()

    const handwritingResult = await generateHandwriting(textForHandwriting, generationId)
    
    generationResult.handwriting = handwritingResult

    generationResult.status = {
      ...generationResult.status!,
      status: 'complete',
      progress: 100,
      currentStep: 'Generation completed successfully!',
      updatedAt: new Date()
    }

    const finalResult: GenerationResult = {
      ...generationResult as GenerationResult
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

    generationResult.status = {
      id: generationId,
      status: 'error',
      progress: generationResult.status?.progress || 0,
      currentStep: generationResult.status?.currentStep || 'Error occurred',
      error: genError,
      createdAt: generationResult.status?.createdAt || new Date(),
      updatedAt: new Date()
    }

    return NextResponse.json(
      {
        generationId,
        error: genError.message,
        code: genError.code,
        step: genError.step,
        retryable: genError.retryable,
        status: generationResult.status
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

  // In a real implementation, this would fetch from a database
  // For now, return a not found error
  return NextResponse.json(
    { error: 'Generation not found' },
    { status: 404 }
  )
}