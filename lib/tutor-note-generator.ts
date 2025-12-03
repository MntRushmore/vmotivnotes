import type { GenerateNoteOptions, StructuredNoteResponse, RefineRequest } from '@/types'

const SYSTEM_INSTRUCTION = `You are an expert tutor assistant that creates EXTREMELY DETAILED, comprehensive, structured teaching notes for educators. Your notes must be thorough, clear, actionable, and formatted consistently.

CRITICAL: Always respond with ONLY valid JSON following this exact structure:

{
  "title": "Clear, engaging title",
  "intro": "2-3 sentence detailed overview that sets context and explains importance",
  "gradeLevel": "elementary|middle|high|college",
  "subject": "subject area (e.g., math, science, history)",
  "bullets": [
    "Key concept 1 with clear, thorough explanation",
    "Definition: Term - precise meaning with extensive context and etymology if relevant",
    "Step-by-step process: 1) First step with detailed explanation 2) Second step with reasoning 3) Third step with examples 4) Fourth step and beyond",
    "Example: [Multiple detailed real-world scenarios that illustrate the concept from different angles]",
    "Visual analogy: Compare to something students know with detailed comparison",
    "Common misconception: What students often get wrong, why it's wrong, and the correct understanding",
    "Connection: How this relates to other topics with specific examples",
    "Historical context: Background and development of this concept",
    "Advanced insight: Deeper understanding or edge cases",
    "15-25 bullets total - each must be highly informative and detailed with concrete examples"
  ],
  "quickCheck": [
    {"question": "Simple recall question?", "answer": "Direct factual answer with context"},
    {"question": "Application question requiring reasoning?", "answer": "Detailed explanation of how to apply"},
    {"question": "Critical thinking question?", "answer": "Sample reasoning path with multiple steps"},
    {"question": "Synthesis question connecting multiple concepts?", "answer": "Comprehensive explanation"},
    "8-12 questions total - build from easy to very challenging with diverse question types"
  ],
  "realWorldApplications": [
    {"category": "career", "description": "Detailed explanation of how professionals use this concept (engineers, doctors, scientists, etc.) with specific examples"},
    {"category": "daily-life", "description": "Multiple specific scenarios where students encounter this in everyday situations"},
    {"category": "history", "description": "Famous historical uses, discoveries, and the people behind them"},
    {"category": "current-events", "description": "Modern applications, cutting-edge research, or current relevance"},
    {"category": "technology", "description": "How this concept is used in modern technology and innovation"},
    "Include 5-8 detailed applications to show extensive practical value"
  ],
  "practiceProblems": [
    {
      "problem": "Detailed worked example problem with numbers/scenario and context",
      "difficulty": "easy|medium|hard|very-hard",
      "solution": "Final answer or result with units/context",
      "steps": [
        "Step 1: What to do first with detailed explanation of why",
        "Step 2: Next calculation or reasoning with intermediate results",
        "Step 3: Continue solving with detailed work shown",
        "Step 4: Further steps with explanations",
        "Step 5+: Additional steps as needed to reach solution"
      ]
    },
    "For MATH/SCIENCE subjects: Include 20-30 practice problems with COMPLETE step-by-step solutions",
    "Mix difficulty levels: 8-10 easy, 10-12 medium, 5-7 hard, 2-3 very hard",
    "Include variety: word problems, numerical problems, conceptual problems, multi-step problems",
    "For NON-STEM subjects: Include 15-20 practice questions/essay prompts with detailed guidance"
  ],
  "diagrams": [
    "Detailed description of key diagram/graph #1 with all labels and features (e.g., 'Graph showing y = x^2 parabola with vertex at origin, axis of symmetry at x=0, opening upward, showing points (-2,4), (-1,1), (0,0), (1,1), (2,4)')",
    "Comprehensive description of visual #2 with annotations (e.g., 'Molecular structure of H2O showing 104.5° bond angle, two O-H bonds, lone pairs, polarity arrows')",
    "For MATH/SCIENCE: Include 5-8 detailed diagram descriptions with complete annotations",
    "For NON-STEM: Include 3-5 visual organizers, timelines, or concept maps"
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
- Use LaTeX notation for all math: $x^2$, $\\frac{a}{b}$, $\\sqrt{x}$, etc.
- Include formulas in bullets: "The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$"
- ALWAYS include practiceProblems with complete step-by-step solutions
- ALWAYS include diagram descriptions for key visuals
- Show actual calculations in solution steps with numbers
- For chemistry: use proper notation (H₂O, CO₂, etc.)
- For physics: include units in all calculations (m/s, kg, N, etc.)`

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

    const prompt = `Analyze this document and create EXTREMELY DETAILED tutor-friendly teaching notes.

Document content:
${extractedText.slice(0, 8000)} ${extractedText.length > 8000 ? '...(truncated for length)' : ''}

Target grade level: ${gradeLevel}

Requirements:
- Be VERY comprehensive with 15-25 detailed bullet points covering ALL concepts thoroughly
- Use language appropriate for ${gradeLevel} level
- Include multiple examples that ${gradeLevel} students can relate to
- Create 8-12 Quick Check questions at varying difficulty levels
- For MATH/SCIENCE: Include 20-30 practice problems with complete solutions at mixed difficulty
- For NON-STEM: Include 15-20 practice questions/essay prompts with detailed guidance
- Include 5-8 detailed diagram descriptions
- Include 5-8 real-world applications

Extract ALL key teaching points from this document and format them according to the system instructions with MAXIMUM detail.`

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

    const prompt = `Create EXTREMELY DETAILED and COMPREHENSIVE tutor notes for teaching this topic: "${topic}"

Subject area: ${subject}
Target audience: ${gradeLevel} level

Teaching context:
${gradeContext[gradeLevel]}

Requirements:
- Be VERY comprehensive with 15-25 detailed bullet points covering ALL aspects of the topic
- Cover fundamental concepts, key definitions, important examples, historical context, and advanced insights
- Make it practical and actionable for tutors to teach from with extensive detail
- Include 8-12 Quick Check questions that test understanding at varying difficulty levels
- For MATH/SCIENCE topics: Include 20-30 practice problems with COMPLETE step-by-step solutions
  - Mix difficulty: 8-10 easy, 10-12 medium, 5-7 hard, 2-3 very hard
  - Include variety: word problems, numerical, conceptual, multi-step problems
- For NON-STEM topics: Include 15-20 practice questions/essay prompts with detailed guidance
- Include 5-8 detailed diagram descriptions with complete annotations
- Include 5-8 real-world applications across different categories

Research this topic THOROUGHLY and create notes following the system instructions with MAXIMUM detail and comprehensiveness.`

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
            maxOutputTokens: 8192,
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
        throw new Error('Invalid response structure')
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
