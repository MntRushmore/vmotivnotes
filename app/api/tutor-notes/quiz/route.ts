import { NextRequest, NextResponse } from 'next/server'
import type { QuizQuestion } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Generate quiz questions from tutor notes
 * POST /api/tutor-notes/quiz
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { noteMarkdown, count = 5, difficulty = 'medium' } = body

    if (!noteMarkdown) {
      return NextResponse.json(
        { error: 'Note markdown is required' },
        { status: 400 }
      )
    }

    console.log(`[tutor-notes/quiz] Generating ${count} ${difficulty} quiz questions...`)

    // Create prompt for quiz generation
    const prompt = `Based on the following study notes, generate ${count} quiz questions for student assessment.

NOTES:
${noteMarkdown}

INSTRUCTIONS:
- Create ${count} questions with difficulty level: ${difficulty}
- Mix of question types: Multiple Choice (MCQ), True/False (TF), and Short Answer
- For MCQ: Provide 4 options, mark correct answer by index (0-3)
- For True/False: Options should be ["True", "False"], correct answer is index 0 or 1
- For Short Answer: Provide expected answer as string
- Each question must have a clear explanation
- Start with easier questions, progress to harder ones
- Questions should test understanding, not just memorization

Difficulty guidelines:
- easy: Basic recall and definitions
- medium: Application and understanding
- hard: Analysis, synthesis, and critical thinking

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "question": "What is the main concept?",
      "type": "mcq",
      "difficulty": "easy",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "The correct answer is A because..."
    },
    {
      "question": "The Pythagorean theorem only works for right triangles.",
      "type": "tf",
      "difficulty": "easy",
      "options": ["True", "False"],
      "correctAnswer": 0,
      "explanation": "This is true because..."
    },
    {
      "question": "Explain how this concept is used in real life.",
      "type": "short",
      "difficulty": "medium",
      "correctAnswer": "Expected answer describing real-world application...",
      "explanation": "A complete answer would include..."
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
            temperature: 0.7,
            maxOutputTokens: 3072,
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
    const questions: QuizQuestion[] = result.questions || []

    console.log(`[tutor-notes/quiz] Generated ${questions.length} questions`)

    return NextResponse.json({ questions })

  } catch (error) {
    console.error('[tutor-notes/quiz] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate quiz',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
