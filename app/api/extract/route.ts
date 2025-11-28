import { NextRequest, NextResponse } from 'next/server'
import { createWorker } from 'tesseract.js'
import type { ExtractionResult } from '@/types'
import { createFileMetadata, retryWithBackoff, validatePdfFile } from '@/lib/extraction-utils'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        {
          error: {
            code: 'NO_FILE',
            message: 'No file provided',
          },
        },
        { status: 400 }
      )
    }

    const validation = validatePdfFile(file.size, file.type)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let extractionResult: ExtractionResult

    try {
      const pdfParse = require('pdf-parse')
      const data = await retryWithBackoff(() => pdfParse(buffer), 2, 500) as any
      
      if (!data.text || data.text.trim().length === 0) {
        throw new Error('No text extracted from PDF - attempting OCR fallback')
      }

      extractionResult = {
        text: data.text.trim(),
        metadata: createFileMetadata(file.name, file.size, file.type, {
          pageCount: data.numpages,
          extractionMethod: 'pdf-parse',
        }),
        confidence: 1.0,
      }

      console.log(`Successfully extracted text from PDF: ${file.name} (${data.numpages} pages)`)
    } catch (pdfError) {
      console.log('PDF parse failed, falling back to Tesseract OCR:', pdfError)

      try {
        const worker = await createWorker('eng')
        const { data } = await worker.recognize(buffer)
        await worker.terminate()

        if (!data.text || data.text.trim().length === 0) {
          return NextResponse.json(
            {
              error: {
                code: 'EXTRACTION_FAILED',
                message: 'Could not extract text from PDF',
                details: 'Both pdf-parse and Tesseract failed to extract text',
              },
            },
            { status: 500 }
          )
        }

        extractionResult = {
          text: data.text.trim(),
          metadata: createFileMetadata(file.name, file.size, file.type, {
            extractionMethod: 'tesseract',
          }),
          confidence: data.confidence / 100,
        }

        console.log(`Successfully extracted text via Tesseract: ${file.name}`)
      } catch (ocrError) {
        console.error('Tesseract OCR failed:', ocrError)
        return NextResponse.json(
          {
            error: {
              code: 'EXTRACTION_FAILED',
              message: 'Failed to extract text from PDF',
              details: ocrError instanceof Error ? ocrError.message : 'Unknown error',
            },
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(extractionResult)
  } catch (error) {
    console.error('Extract API error:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
