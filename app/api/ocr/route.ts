import { NextRequest, NextResponse } from 'next/server'
import { createWorker } from 'tesseract.js'
import { GoogleGenerativeAI } from '@google/generative-ai'
import type { ExtractionResult } from '@/types'
import { createFileMetadata, retryWithBackoff, validateImageFile } from '@/lib/extraction-utils'

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

    const validation = validateImageFile(file.size, file.type)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let extractionResult: ExtractionResult

    try {
      const worker = await createWorker('eng')
      const { data } = await retryWithBackoff(() => worker.recognize(buffer), 2, 500)
      await worker.terminate()

      if (!data.text || data.text.trim().length === 0) {
        throw new Error('No text extracted from image - attempting Gemini fallback')
      }

      extractionResult = {
        text: data.text.trim(),
        metadata: createFileMetadata(file.name, file.size, file.type, {
          extractionMethod: 'tesseract',
        }),
        confidence: data.confidence / 100,
      }

      console.log(`Successfully extracted text via Tesseract: ${file.name} (confidence: ${data.confidence}%)`)
    } catch (tesseractError) {
      console.log('Tesseract failed, falling back to Gemini Vision API:', tesseractError)

      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(
          {
            error: {
              code: 'EXTRACTION_FAILED',
              message: 'OCR failed and no Gemini API key configured',
              details: 'Tesseract extraction failed and GEMINI_API_KEY is not set',
            },
          },
          { status: 500 }
        )
      }

      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const base64Data = buffer.toString('base64')
        const imagePart = {
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        }

        const prompt = 'Extract all text from this image. Return only the extracted text without any additional commentary or formatting. If there is no text, return "NO_TEXT_FOUND".'
        
        const result = await retryWithBackoff(
          async () => {
            const response = await model.generateContent([prompt, imagePart])
            return response.response.text()
          },
          2,
          1000
        )

        if (!result || result.trim() === 'NO_TEXT_FOUND' || result.trim().length === 0) {
          return NextResponse.json(
            {
              error: {
                code: 'NO_TEXT_FOUND',
                message: 'No text found in image',
                details: 'Both Tesseract and Gemini could not extract text from the image',
              },
            },
            { status: 422 }
          )
        }

        extractionResult = {
          text: result.trim(),
          metadata: createFileMetadata(file.name, file.size, file.type, {
            extractionMethod: 'gemini-vision',
          }),
          confidence: 0.9,
        }

        console.log(`Successfully extracted text via Gemini Vision: ${file.name}`)
      } catch (geminiError) {
        console.error('Gemini Vision API failed:', geminiError)
        return NextResponse.json(
          {
            error: {
              code: 'EXTRACTION_FAILED',
              message: 'Failed to extract text from image',
              details: geminiError instanceof Error ? geminiError.message : 'Unknown error',
            },
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(extractionResult)
  } catch (error) {
    console.error('OCR API error:', error)
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
