import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { TutorNoteGenerator } from '@/lib/tutor-note-generator'
import type { TutorNote, GradeLevel } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Generate tutor notes from PDF or topic
 * POST /api/tutor-notes/generate
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''

    let source: 'pdf' | 'topic' = 'topic'
    let fileBuffer: Buffer | null = null
    let topic: string | null = null
    let gradeLevel: GradeLevel = 'middle'
    let subject: string | undefined
    let length: 'concise' | 'standard' | 'detailed' = 'standard'
    let fileName = 'Untitled'

    // Handle FormData (PDF upload) or JSON (topic input)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File

      if (!file) {
        return NextResponse.json(
          { error: 'File is required for PDF generation' },
          { status: 400 }
        )
      }

      source = 'pdf'
      fileName = file.name
      const arrayBuffer = await file.arrayBuffer()
      fileBuffer = Buffer.from(arrayBuffer)

      gradeLevel = (formData.get('gradeLevel') as GradeLevel) || 'middle'
      subject = formData.get('subject') as string | undefined
      length = (formData.get('length') as 'concise' | 'standard' | 'detailed') || 'standard'

    } else if (contentType.includes('application/json')) {
      const body = await request.json()

      topic = body.topic
      if (!topic) {
        return NextResponse.json(
          { error: 'Topic is required' },
          { status: 400 }
        )
      }

      source = 'topic'
      fileName = topic.slice(0, 50) // Use topic as fileName
      gradeLevel = body.gradeLevel || 'middle'
      subject = body.subject
      length = body.length || 'standard'

    } else {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      )
    }

    console.log(`[tutor-notes/generate] Generating notes from ${source}: ${fileName}`)

    // Initialize generator
    const generator = new TutorNoteGenerator()

    // Generate structured notes
    let structured
    if (source === 'pdf' && fileBuffer) {
      // Detect file type
      const mimeType = fileName.toLowerCase()
      let extractedText = ''

      if (mimeType.endsWith('.pdf')) {
        // Extract text from PDF
        const pdfParse = require('pdf-parse')
        const data = await pdfParse(fileBuffer)

        if (!data.text || data.text.trim().length === 0) {
          return NextResponse.json(
            { error: 'No text could be extracted from PDF' },
            { status: 400 }
          )
        }

        extractedText = data.text
      } else if (mimeType.endsWith('.jpg') || mimeType.endsWith('.jpeg') || mimeType.endsWith('.png')) {
        // Use Gemini Vision API for images
        const base64Image = fileBuffer.toString('base64')
        const imageType = mimeType.endsWith('.png') ? 'image/png' : 'image/jpeg'

        console.log(`[tutor-notes/generate] Using Gemini Vision API for image`)

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: 'Extract all text content from this image. Provide a complete transcription of everything visible in the image, including any text, equations, diagrams descriptions, and annotations.' },
                  {
                    inline_data: {
                      mime_type: imageType,
                      data: base64Image
                    }
                  }
                ]
              }],
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 2048,
              }
            })
          }
        )

        if (!response.ok) {
          throw new Error(`Gemini Vision API error: ${response.status}`)
        }

        const visionData = await response.json()
        extractedText = visionData.candidates?.[0]?.content?.parts?.[0]?.text || ''

        if (!extractedText || extractedText.trim().length === 0) {
          return NextResponse.json(
            { error: 'No text could be extracted from image' },
            { status: 400 }
          )
        }

        console.log(`[tutor-notes/generate] Extracted ${extractedText.length} characters from image`)
      } else {
        return NextResponse.json(
          { error: 'Unsupported file type. Please upload PDF, JPG, or PNG files.' },
          { status: 400 }
        )
      }

      structured = await generator.generateFromPDF(extractedText, {
        source: 'pdf',
        gradeLevel,
        subject,
        length
      })
    } else if (source === 'topic' && topic) {
      structured = await generator.generateFromTopic(topic, {
        source: 'topic',
        topic,
        gradeLevel,
        subject,
        length
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid generation parameters' },
        { status: 400 }
      )
    }

    // Convert to markdown
    const markdown = TutorNoteGenerator.toMarkdown(structured)

    // Create TutorNote object
    const note: TutorNote = {
      id: nanoid(),
      title: structured.title,
      intro: structured.intro,
      gradeLevel: structured.gradeLevel,
      subject: structured.subject,
      bullets: structured.bullets,
      quickCheck: structured.quickCheck,
      source,
      sourceDetails: source === 'pdf' ? fileName : topic!,
      createdAt: new Date(),
      updatedAt: new Date(),
      rawMarkdown: markdown
    }

    console.log(`[tutor-notes/generate] Successfully generated: "${note.title}"`)

    return NextResponse.json(note)

  } catch (error) {
    console.error('[tutor-notes/generate] Error:', error)

    // Extract user-friendly error message
    let errorMessage = 'Failed to generate notes'
    let userMessage = ''

    if (error instanceof Error) {
      errorMessage = error.message

      // Check if it's a parsing error with helpful guidance
      if (errorMessage.includes('Failed to parse AI response')) {
        userMessage = errorMessage // Already has helpful message
      } else if (errorMessage.includes('too broad') || errorMessage.includes('too vague')) {
        userMessage = 'This topic is too broad. Please be more specific (e.g., "Pythagorean Theorem" instead of "Geometry").'
      } else if (errorMessage.includes('Gemini API error')) {
        userMessage = 'AI service temporarily unavailable. Please try again in a moment.'
      } else {
        userMessage = 'Unable to generate notes for this topic. Please try a more specific topic or contact VMotiv8 for assistance at https://vmotiv8.com'
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        userMessage: userMessage || errorMessage,
        support: 'If this issue persists, please contact VMotiv8 at https://vmotiv8.com'
      },
      { status: 500 }
    )
  }
}
