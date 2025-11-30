import type { GenerateNoteOptions, StructuredNoteResponse, RefineRequest } from '@/types'

const SYSTEM_INSTRUCTION = `You are an expert tutor assistant that creates structured, teaching-focused notes for educators. Your notes must be clear, actionable, and formatted consistently.

CRITICAL: Always respond with ONLY valid JSON following this exact structure:

{
  "title": "Clear, engaging title",
  "intro": "1-2 sentence overview that sets context",
  "gradeLevel": "elementary|middle|high|college",
  "subject": "subject area (e.g., math, science, history)",
  "bullets": [
    "Key concept 1 with clear explanation",
    "Definition: Term - precise meaning with context",
    "Step-by-step process: 1) First step 2) Second step 3) Third step",
    "Example: [Real-world scenario that illustrates the concept]",
    "Visual analogy: Compare to something students know",
    "Common misconception: What students often get wrong and why",
    "Connection: How this relates to other topics",
    "5-12 bullets total - each must be informative and concise"
  ],
  "quickCheck": [
    {"question": "Simple recall question?", "answer": "Direct factual answer"},
    {"question": "Application question requiring reasoning?", "answer": "Explanation of how to apply"},
    {"question": "Critical thinking question?", "answer": "Sample reasoning path"},
    "3-5 questions total - build from easy to challenging"
  ],
  "realWorldApplications": [
    {"category": "career", "description": "How professionals use this concept (engineers, doctors, etc.)"},
    {"category": "daily-life", "description": "Where students encounter this in everyday situations"},
    {"category": "history", "description": "Famous historical uses or discoveries"},
    {"category": "current-events", "description": "Modern applications or current relevance"},
    "Include 3-4 applications to show practical value"
  ]
}

Guidelines for effective tutor notes:
- Use age-appropriate language for the specified grade level
- Include at least 2-3 concrete, relatable examples
- Keep each bullet point to 1-2 sentences maximum
- Questions should progressively build understanding
- Focus on what tutors need to effectively explain the concept
- Avoid jargon without explanation
- Include practical teaching tips where relevant`

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

export class TutorNoteGenerator {
  private apiKey: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || process.env.NANO_BANANA_API_KEY || ''
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY not configured')
    }
  }

  /**
   * Generate tutor notes from PDF text
   */
  async generateFromPDF(
    extractedText: string,
    options: GenerateNoteOptions
  ): Promise<StructuredNoteResponse> {
    const gradeLevel = options.gradeLevel || 'middle'
    const length = options.length || 'standard'

    const lengthInstructions = {
      concise: 'Keep it very concise - 5-7 bullet points focusing on the most critical concepts only.',
      standard: 'Provide moderate detail with 8-10 bullet points covering main concepts and key examples.',
      detailed: 'Be comprehensive with 10-12 bullet points, including detailed examples, multiple perspectives, and connections.'
    }

    const prompt = `Analyze this document and create tutor-friendly teaching notes.

Document content:
${extractedText.slice(0, 8000)} ${extractedText.length > 8000 ? '...(truncated for length)' : ''}

Target grade level: ${gradeLevel}
Detail level: ${length}

Requirements:
- ${lengthInstructions[length]}
- Use language appropriate for ${gradeLevel} level
- Include examples that ${gradeLevel} students can relate to
- Create ${length === 'concise' ? '3' : length === 'standard' ? '4' : '5'} practice questions

Extract the key teaching points from this document and format them according to the system instructions.`

    return this.callGemini(prompt)
  }

  /**
   * Generate tutor notes from a topic
   */
  async generateFromTopic(
    topic: string,
    options: GenerateNoteOptions
  ): Promise<StructuredNoteResponse> {
    const gradeLevel = options.gradeLevel || 'middle'
    const subject = options.subject || 'general'
    const length = options.length || 'standard'

    const lengthInstructions = {
      concise: 'Keep it very concise - 5-7 bullet points with core concepts only.',
      standard: 'Provide moderate detail with 8-10 bullet points covering essential concepts and examples.',
      detailed: 'Be comprehensive with 10-12 bullet points including theory, examples, and practical applications.'
    }

    const gradeContext = {
      elementary: 'Use simple language, concrete examples, and relatable analogies. Focus on foundational understanding.',
      middle: 'Use clear explanations with real-world connections. Include some complexity but keep it accessible.',
      high: 'Use precise terminology with detailed explanations. Include abstract concepts and critical thinking.',
      college: 'Use academic language with rigorous explanations. Include theoretical frameworks and advanced applications.',
      general: 'Use clear, professional language suitable for adult learners or general audiences.'
    }

    const prompt = `Create comprehensive tutor notes for teaching this topic: "${topic}"

Subject area: ${subject}
Target audience: ${gradeLevel} level
Detail level: ${length}

Teaching context:
${gradeContext[gradeLevel]}

Requirements:
- ${lengthInstructions[length]}
- Cover fundamental concepts, key definitions, and important examples
- Make it practical and actionable for tutors to teach from
- Include ${length === 'concise' ? '3' : length === 'standard' ? '4' : '5'} practice questions that test understanding

Research this topic thoroughly and create notes following the system instructions.`

    return this.callGemini(prompt)
  }

  /**
   * Refine existing notes based on instruction
   */
  async refineNotes(
    currentMarkdown: string,
    request: RefineRequest
  ): Promise<StructuredNoteResponse> {
    const instructionPrompts = {
      shorter: 'Make these notes more concise. Reduce to 5-7 key bullet points while keeping the most important information. Keep 3 quick check questions.',
      longer: 'Expand these notes with more detail. Add 3-5 more bullet points with additional examples, explanations, or practical applications. Add 2 more practice questions.',
      simpler: `Simplify the language and explanations for ${request.gradeLevel || 'a younger'} audience. Use more basic vocabulary and clearer, shorter sentences. Add more relatable examples.`,
      'more-examples': 'Add 2-3 more concrete, real-world examples throughout the bullet points. Make examples specific and relatable to students.',
      'more-questions': 'Add 3 more practice questions at varying difficulty levels. Include a mix of recall, application, and reasoning questions.',
      custom: request.customInstruction || 'Improve and refine these notes.'
    }

    const prompt = `Current tutor notes:
${currentMarkdown}

Refinement request: ${instructionPrompts[request.instruction]}

Update the notes according to this instruction while maintaining the same JSON structure and format.`

    return this.callGemini(prompt)
  }

  /**
   * Call Gemini API with structured output
   */
  private async callGemini(prompt: string): Promise<StructuredNoteResponse> {
    console.log('[tutor-note-generator] Calling Gemini API...')

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${prompt}` }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 3072,
            responseMimeType: 'application/json', // Request JSON output
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[tutor-note-generator] Gemini API error:', errorData)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data: GeminiResponse = await response.json()
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    if (!textResponse) {
      throw new Error('No response from Gemini')
    }

    // Parse JSON response
    try {
      // Clean up response (remove markdown code blocks if present)
      const cleanedResponse = textResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()

      const structured: StructuredNoteResponse = JSON.parse(cleanedResponse)

      // Validate required fields
      if (!structured.title || !structured.bullets || !structured.quickCheck) {
        throw new Error('Invalid response structure')
      }

      console.log(`[tutor-note-generator] Successfully generated notes: "${structured.title}"`)
      return structured
    } catch (error) {
      console.error('[tutor-note-generator] Failed to parse JSON:', textResponse)
      throw new Error('Failed to parse structured response from Gemini')
    }
  }

  /**
   * Convert structured response to markdown
   */
  static toMarkdown(structured: StructuredNoteResponse): string {
    const lines: string[] = []

    // Title
    lines.push(`# ${structured.title}`)
    lines.push('')

    // Metadata
    lines.push(`**Grade Level:** ${structured.gradeLevel}`)
    if (structured.subject) {
      lines.push(`**Subject:** ${structured.subject}`)
    }
    lines.push('')

    // Intro
    if (structured.intro) {
      lines.push(structured.intro)
      lines.push('')
    }

    // Bullets
    lines.push('## Key Points')
    lines.push('')
    structured.bullets.forEach(bullet => {
      lines.push(`• ${bullet}`)
      lines.push('')
    })

    // Real-World Applications
    if (structured.realWorldApplications && structured.realWorldApplications.length > 0) {
      lines.push('## Real-World Applications')
      lines.push('')
      structured.realWorldApplications.forEach(app => {
        const categoryEmoji = {
          'career': '💼',
          'daily-life': '🏠',
          'history': '📜',
          'current-events': '📰'
        }[app.category] || '•'
        lines.push(`${categoryEmoji} **${app.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}**: ${app.description}`)
        lines.push('')
      })
    }

    // Quick Check
    lines.push('## Quick Check')
    lines.push('')
    structured.quickCheck.forEach((q, i) => {
      lines.push(`${i + 1}. ${q.question}`)
      if (q.answer) {
        lines.push(`   *Answer: ${q.answer}*`)
      }
      lines.push('')
    })

    return lines.join('\n')
  }
}
