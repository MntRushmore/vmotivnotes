import { NextRequest, NextResponse } from 'next/server'
import { TutorNoteGenerator } from '@/lib/tutor-note-generator'
import type { RefineRequest, TutorNote } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Refine existing tutor notes
 * POST /api/tutor-notes/refine
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const noteId = body.noteId
    const currentMarkdown = body.currentMarkdown
    const instruction = body.instruction
    const customInstruction = body.customInstruction
    const gradeLevel = body.gradeLevel

    if (!noteId || !currentMarkdown || !instruction) {
      return NextResponse.json(
        { error: 'Missing required fields: noteId, currentMarkdown, instruction' },
        { status: 400 }
      )
    }

    console.log(`[tutor-notes/refine] Refining note ${noteId} with instruction: ${instruction}`)

    const generator = new TutorNoteGenerator()

    const refineRequest: RefineRequest = {
      noteId,
      instruction,
      customInstruction,
      gradeLevel
    }

    // Refine the notes
    const structured = await generator.refineNotes(currentMarkdown, refineRequest)

    // Convert back to markdown
    const markdown = TutorNoteGenerator.toMarkdown(structured)

    // Create updated note object (partial - client will merge)
    const updates: Partial<TutorNote> = {
      title: structured.title,
      intro: structured.intro,
      gradeLevel: structured.gradeLevel,
      subject: structured.subject,
      bullets: structured.bullets,
      quickCheck: structured.quickCheck,
      rawMarkdown: markdown,
      updatedAt: new Date()
    }

    console.log(`[tutor-notes/refine] Successfully refined note: "${structured.title}"`)

    return NextResponse.json({
      success: true,
      updates
    })

  } catch (error) {
    console.error('[tutor-notes/refine] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to refine notes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
