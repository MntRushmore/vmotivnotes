import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

interface FlashcardResponse {
  front: string
  back: string
  hint?: string
}

/**
 * Generate flashcards from tutor notes
 * POST /api/tutor-notes/flashcards
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { noteMarkdown, count = 8 } = body

    if (!noteMarkdown) {
      return NextResponse.json(
        { error: 'Note markdown is required' },
        { status: 400 }
      )
    }

    console.log('[tutor-notes/flashcards] Generating flashcards...')

    // Create prompt for flashcard generation
    const prompt = `Based on the following study notes, generate ${count} flashcards for student review.

NOTES:
${noteMarkdown}

INSTRUCTIONS:
- Create flashcards that test key concepts, definitions, and understanding
- Front: A clear question or term
- Back: A concise answer or definition (2-3 sentences max)
- Hint: Optional hint to guide thinking (1 sentence)
- Start with easier recall questions, progress to harder application questions
- Make flashcards specific and testable

Return ONLY valid JSON in this exact format:
{
  "flashcards": [
    {
      "front": "What is the key concept?",
      "back": "The concept is defined as...",
      "hint": "Think about the main definition"
    }
  ]
}`

    const apiKey = process.env.GEMINI_API_KEY || process.env.NANO_BANANA_API_KEY
    if (!apiKey) {
      throw new Error('API key not configured')
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    // Parse JSON response
    const cleanedResponse = textResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    const result = JSON.parse(cleanedResponse)
    const flashcards: FlashcardResponse[] = result.flashcards || []

    console.log(`[tutor-notes/flashcards] Generated ${flashcards.length} flashcards`)

    return NextResponse.json({ flashcards })

  } catch (error) {
    console.error('[tutor-notes/flashcards] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate flashcards',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
