import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { noteMarkdown, topic, count = 10, difficulty = 'mixed' } = body

    if (!noteMarkdown || !topic) {
      return NextResponse.json(
        { error: 'Note markdown and topic are required' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const prompt = `Based on these study notes about "${topic}", generate ${count} practice problems.

Study Notes:
${noteMarkdown}

Generate a variety of practice problems with these requirements:
- Difficulty levels: ${difficulty === 'mixed' ? 'mix of easy, medium, hard, and very-hard' : difficulty}
- Include different problem types (calculations, conceptual questions, word problems, etc.)
- Provide detailed step-by-step solutions
- Make problems progressively challenging

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "problems": [
    {
      "problem": "Clear problem statement with any necessary context",
      "solution": "Detailed step-by-step solution with explanations",
      "difficulty": "easy" | "medium" | "hard" | "very-hard"
    }
  ]
}

Important:
- Return pure JSON only, no markdown formatting
- Ensure all strings are properly escaped
- Make problems relevant to the notes content
- Solutions should teach, not just give answers`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Clean the response
    let cleanedText = text.trim()
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '')
    }

    const data = JSON.parse(cleanedText)

    if (!data.problems || !Array.isArray(data.problems)) {
      throw new Error('Invalid response format from AI')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Problems generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate practice problems',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
