import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { TutorNoteGenerator } from '@/lib/tutor-note-generator'
import type { TutorNote, GradeLevel } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Generate tutor notes from topic
 * POST /api/tutor-notes/generate
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const topic = body.topic
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    const gradeLevel: GradeLevel = body.gradeLevel || 'middle'
    const subject: string | undefined = body.subject
    const length: 'concise' | 'standard' | 'detailed' = body.length || 'standard'

    console.log(`[tutor-notes/generate] Generating notes from topic: ${topic}`)

    // Initialize generator
    const generator = new TutorNoteGenerator()

    // Generate structured notes from topic
    const structured = await generator.generateFromTopic(topic, {
      source: 'topic',
      topic,
      gradeLevel,
      subject,
      length
    })

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
      source: 'topic',
      sourceDetails: topic,
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
