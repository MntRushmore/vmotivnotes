import type { GenerateNoteOptions, StructuredNoteResponse, RefineRequest } from '@/types'

const SYSTEM_INSTRUCTION = `You are an expert tutor assistant that creates clear, comprehensive, structured teaching notes for educators. Your notes must be thorough, well-organized, actionable, and formatted consistently.

CRITICAL JSON FORMATTING RULES:
1. Always respond with ONLY valid JSON
2. ALL backslashes in strings MUST be double-escaped (use \\\\ for LaTeX backslashes)
3. For example: "The formula is $x = \\\\frac{a}{b}$" (note the double backslashes)
4. Never use single backslashes in JSON strings

Required JSON structure:

{
  "title": "Clear, engaging title",
  "intro": "2-3 sentence overview that sets context and explains importance",
  "gradeLevel": "elementary|middle|high|college",
  "subject": "subject area (e.g., math, science, history)",
  "bullets": [
    "Key concept 1 with clear explanation and example",
    "Definition: Term - precise meaning with context",
    "Step-by-step process: 1) First step 2) Second step 3) Third step with reasoning",
    "Example: Real-world scenario that illustrates the concept",
    "Visual analogy: Compare to something students know",
    "Common misconception: What students often get wrong and the correct understanding",
    "Connection: How this relates to other topics",
    "Historical context or background (if relevant)",
    "12-15 bullets total - each informative with concrete examples"
  ],
  "quickCheck": [
    {"question": "Simple recall question?", "answer": "Direct factual answer"},
    {"question": "Application question?", "answer": "Explanation of how to apply"},
    {"question": "Critical thinking question?", "answer": "Sample reasoning path"},
    "5-8 questions total - build from easy to challenging"
  ],
  "realWorldApplications": [
    {"category": "career", "description": "How professionals use this (engineers, doctors, etc.)"},
    {"category": "daily-life", "description": "Where students encounter this in everyday life"},
    {"category": "history", "description": "Famous historical uses or discoveries"},
    "Include 3-4 practical applications"
  ],
  "practiceProblems": [
    {
      "problem": "Clear problem statement with numbers/scenario",
      "difficulty": "easy|medium|hard",
      "solution": "Final answer with units/context",
      "steps": [
        "Step 1: What to do first with brief explanation",
        "Step 2: Next calculation with intermediate results",
        "Step 3: Continue solving",
        "Step 4: Final step to reach solution"
      ]
    },
    "Include 5-8 practice problems ONLY - focused and high-quality",
    "Mix difficulty: 2-3 easy, 2-3 medium, 1-2 hard",
    "Include variety: word problems, numerical, conceptual"
  ],
  "diagrams": [
    "Description of key diagram/graph with labels (e.g., 'Graph of y = x^2 showing vertex, axis of symmetry')",
    "Include 2-3 diagram descriptions for important visuals"
  ]
}

Guidelines for effective tutor notes:
- Use age-appropriate language for the specified grade level
- Include at least 2-3 concrete, relatable examples
- Keep each bullet point to 1-2 sentences maximum
- Questions should progressively build understanding
- Focus on what tutors need to effectively explain the concept
- Avoid jargon without explanation
- Include practical teaching tips where relevant

SPECIAL INSTRUCTIONS FOR MATH & SCIENCE:
- Use LaTeX notation for all math: $x^2$, $\\\\frac{a}{b}$, $\\\\sqrt{x}$, etc. (remember to double-escape!)
- Include formulas in bullets: "The quadratic formula is $x = \\\\frac{-b \\\\pm \\\\sqrt{b^2-4ac}}{2a}$"
- ALWAYS include practiceProblems with complete step-by-step solutions
- ALWAYS include diagram descriptions for key visuals
- Show actual calculations in solution steps with numbers
- For chemistry: use proper notation (H₂O, CO₂, etc.)
- For physics: include units in all calculations (m/s, kg, N, etc.)

REMEMBER: In JSON, backslashes must be escaped! Use \\\\ not \\ for LaTeX commands.`

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

    const prompt = `Analyze this document and create comprehensive tutor-friendly teaching notes.

Document content:
${extractedText.slice(0, 8000)} ${extractedText.length > 8000 ? '...(truncated for length)' : ''}

Target grade level: ${gradeLevel}

Requirements:
- Create 12-15 clear bullet points covering key concepts
- Use language appropriate for ${gradeLevel} level
- Include examples that ${gradeLevel} students can relate to
- Create 5-8 Quick Check questions at varying difficulty levels
- Include 5-8 practice problems with step-by-step solutions
- Include 2-3 diagram descriptions for important visuals
- Include 3-4 real-world applications

Extract key teaching points from this document and format them according to the system instructions.`

    return this.callGemini(prompt)
  }

  /**
   * Validate if a topic is too vague
   */
  private validateTopic(topic: string): void {
    const normalizedTopic = topic.toLowerCase().trim()

    // List of overly vague topics that should be more specific
    const vagueTopic = [
      'math', 'science', 'history', 'english', 'algebra', 'geometry',
      'biology', 'chemistry', 'physics', 'calculus', 'literature'
    ]

    // Check if topic is a single vague word
    if (vagueTopic.includes(normalizedTopic) && !normalizedTopic.includes(':') && normalizedTopic.split(' ').length === 1) {
      throw new Error(`"${topic}" is too broad. Please be more specific (e.g., "Quadratic Equations" instead of "Algebra", or "Photosynthesis" instead of "Biology").`)
    }

    // Check if topic is too short (less than 3 characters)
    if (normalizedTopic.length < 3) {
      throw new Error('Topic is too short. Please provide a more specific topic.')
    }
  }

  /**
   * Generate tutor notes from a topic
   */
  async generateFromTopic(
    topic: string,
    options: GenerateNoteOptions
  ): Promise<StructuredNoteResponse> {
    // Validate topic before processing
    this.validateTopic(topic)

    const gradeLevel = options.gradeLevel || 'middle'
    const subject = options.subject || 'general'

    const gradeContext = {
      elementary: 'Use simple language, concrete examples, and relatable analogies. Focus on foundational understanding with lots of detail and examples.',
      middle: 'Use clear explanations with real-world connections. Include complexity but keep it accessible with thorough explanations.',
      high: 'Use precise terminology with detailed explanations. Include abstract concepts and critical thinking with extensive examples.',
      college: 'Use academic language with rigorous explanations. Include theoretical frameworks and advanced applications with comprehensive detail.',
      general: 'Use clear, professional language suitable for adult learners or general audiences with extensive coverage.'
    }

    const prompt = `Create comprehensive tutor notes for teaching this topic: "${topic}"

Subject area: ${subject}
Target audience: ${gradeLevel} level

Teaching context:
${gradeContext[gradeLevel]}

Requirements:
- Create 12-15 clear bullet points covering key aspects of the topic
- Cover fundamental concepts, definitions, examples, and important connections
- Make it practical and actionable for tutors
- Include 5-8 Quick Check questions at varying difficulty levels
- Include 5-8 practice problems with step-by-step solutions
  - Mix difficulty: 2-3 easy, 2-3 medium, 1-2 hard
  - Include variety: word problems, numerical, conceptual
- Include 2-3 diagram descriptions for important visuals
- Include 3-4 real-world applications

Research this topic and create notes following the system instructions.`

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
            temperature: 0.4,
            maxOutputTokens: 6144,
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

    console.log('[tutor-note-generator] Response length:', textResponse.length)
    console.log('[tutor-note-generator] First 200 chars:', textResponse.substring(0, 200))

    // Parse JSON response with comprehensive error handling
    try {
      // Clean up response (remove markdown code blocks if present)
      let cleanedResponse = textResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()

      const structured: StructuredNoteResponse = JSON.parse(cleanedResponse)

      // Validate required fields
      if (!structured.title || !structured.bullets || !structured.quickCheck) {
        console.error('[tutor-note-generator] Missing required fields:', {
          hasTitle: !!structured.title,
          hasBullets: !!structured.bullets,
          hasQuickCheck: !!structured.quickCheck
        })
        throw new Error('Invalid response structure - missing required fields')
      }

      // Ensure arrays are properly formatted
      if (!Array.isArray(structured.bullets)) {
        console.error('[tutor-note-generator] bullets is not an array:', typeof structured.bullets)
        throw new Error('Invalid response structure - bullets must be an array')
      }

      if (!Array.isArray(structured.quickCheck)) {
        console.error('[tutor-note-generator] quickCheck is not an array:', typeof structured.quickCheck)
        throw new Error('Invalid response structure - quickCheck must be an array')
      }

      console.log(`[tutor-note-generator] Successfully generated notes: "${structured.title}"`)
      return structured
    } catch (error) {
      // ATTEMPT 2: Try with trailing comma removal
      console.error('[tutor-note-generator] First parse attempt failed')
      console.error('[tutor-note-generator] Error:', error instanceof Error ? error.message : 'Unknown error')

      try {
        let cleanedResponse = textResponse
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
          .trim()

        // Fix unescaped backslashes in JSON strings (common with LaTeX)
        // This regex finds string values and properly escapes single backslashes
        cleanedResponse = cleanedResponse.replace(
          /"([^"\\]*(\\.[^"\\]*)*)"/g,
          (match) => {
            // Skip if it's a key (followed by colon) or already properly escaped
            return match.replace(/\\(?!["\\/bfnrtu])/g, '\\\\')
          }
        )

        const structured: StructuredNoteResponse = JSON.parse(cleanedResponse)
        console.log(`[tutor-note-generator] Successfully parsed on second attempt: "${structured.title}"`)
        return structured
      } catch (secondError) {
        // ATTEMPT 3: Ask Gemini to try again with stricter JSON mode
        console.error('[tutor-note-generator] Second parse attempt failed')
        console.error('[tutor-note-generator] Second error:', secondError instanceof Error ? secondError.message : 'Unknown')

        // Log snippet around the error position if available
        if (secondError instanceof SyntaxError && secondError.message.includes('position')) {
          const posMatch = secondError.message.match(/position (\d+)/)
          if (posMatch) {
            const pos = parseInt(posMatch[1])
            const start = Math.max(0, pos - 50)
            const end = Math.min(textResponse.length, pos + 50)
            console.error('[tutor-note-generator] Context around error:', textResponse.substring(start, end))
          }
        }

        // FINAL FALLBACK: Give helpful error message
        console.error('[tutor-note-generator] All parse attempts failed')
        console.error('[tutor-note-generator] Response length:', textResponse.length)
        console.error('[tutor-note-generator] Full response (first 500 chars):', textResponse.substring(0, 500))
        console.error('[tutor-note-generator] Full response (last 500 chars):', textResponse.substring(Math.max(0, textResponse.length - 500)))

        throw new Error('Failed to parse AI response. The topic might be too broad or complex. Try being more specific (e.g., "Quadratic Equations" instead of "Algebra"). If this persists, please contact VMotiv8 at https://vmotiv8.com for assistance.')
      }
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

    // Diagrams (for STEM subjects)
    if (structured.diagrams && structured.diagrams.length > 0) {
      lines.push('## Key Diagrams & Visuals')
      lines.push('')
      structured.diagrams.forEach((diagram, i) => {
        lines.push(`${i + 1}. ${diagram}`)
        lines.push('')
      })
    }

    // Practice Problems (for STEM subjects)
    if (structured.practiceProblems && structured.practiceProblems.length > 0) {
      lines.push('## Practice Problems')
      lines.push('')
      structured.practiceProblems.forEach((problem, i) => {
        lines.push(`### Problem ${i + 1} [${problem.difficulty.toUpperCase()}]`)
        lines.push('')
        lines.push(problem.problem)
        lines.push('')
        if (problem.steps && problem.steps.length > 0) {
          lines.push('**Solution:**')
          lines.push('')
          problem.steps.forEach(step => {
            lines.push(`• ${step}`)
          })
          lines.push('')
        }
        lines.push(`**Answer:** ${problem.solution}`)
        lines.push('')
      })
    }

    // Real-World Applications
    if (structured.realWorldApplications && structured.realWorldApplications.length > 0) {
      lines.push('## Real-World Applications')
      lines.push('')
      structured.realWorldApplications.forEach(app => {
        const categoryLabel = app.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        lines.push(`• **${categoryLabel}**: ${app.description}`)
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
