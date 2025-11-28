import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getPromptConfig } from '@/lib/claude-prompts'
import { createGenerationError } from '@/lib/generation-service'
import { SummaryResult } from '@/types/generation'

export const runtime = 'edge'
export const maxDuration = 300

interface SummarizeRequest {
  text: string
  mode: '9th-grade' | 'SAT'
  generationId?: string
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      
      if (attempt === maxAttempts) {
        throw error
      }

      const delay = baseDelay * Math.pow(2, attempt - 1)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

async function generateSummary(text: string, mode: '9th-grade' | 'SAT'): Promise<SummaryResult> {
  const config = getPromptConfig(mode)
  const startTime = Date.now()
  
  if (!process.env.ANTHROPIC_API_KEY) {
    throw createGenerationError(
      'MISSING_API_KEY',
      'Anthropic API key is not configured',
      'summarization',
      'Please set ANTHROPIC_API_KEY in your environment variables',
      false
    )
  }

  const response = await withRetry(async () => {
      const result = await anthropic.messages.create({
        model: config.model,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        system: config.systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Please summarize the following math notes:\n\n${text}`
          }
        ]
      })

      if (result.content[0].type !== 'text') {
        throw new Error('Unexpected response type from Claude')
      }

      return result.content[0].text
    }
  )

  const responseText = response as string
  
  return parseSummaryResponse(responseText, mode, Date.now() - startTime)
}

function parseSummaryResponse(response: string, mode: '9th-grade' | 'SAT', processingTime: number): Omit<SummaryResult, 'metadata'> & { metadata: SummaryResult['metadata'] } {
  const sections = response.split(/\*\*(.+?)\*\*/g).filter(s => s.trim())
  
  let summary = ''
  const keyPoints: string[] = []
  const interactiveNotes: string[] = []
  
  for (let i = 0; i < sections.length; i += 2) {
    const title = sections[i]?.trim()
    const content = sections[i + 1]?.trim() || ''
    
    if (title?.toLowerCase().includes('summary') || title?.toLowerCase().includes('technical summary')) {
      summary = content
    } else if (title?.toLowerCase().includes('key')) {
      const points = content.split('\n').filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim()))
      keyPoints.push(...points.map(p => p.replace(/^[•\-\d\.]\s*/, '').trim()))
    } else if (title?.toLowerCase().includes('interactive') || title?.toLowerCase().includes('strategy') || title?.toLowerCase().includes('practice')) {
      const notes = content.split('\n').filter(line => line.trim())
      interactiveNotes.push(...notes)
    }
  }
  
  return {
    summary: summary || response,
    keyPoints: keyPoints.length > 0 ? keyPoints : [response.substring(0, 200) + '...'],
    interactiveNotes: interactiveNotes.length > 0 ? interactiveNotes : ['Review the summary above and try to explain it in your own words.'],
    metadata: {
      mode,
      wordCount: response.split(/\s+/).length,
      processingTime
    }
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: SummarizeRequest | undefined
  
  try {
    body = await request.json() as SummarizeRequest
    const { text, mode } = body

    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Text is required and must be a string' }, { status: 400 })
    }

    if (!['9th-grade', 'SAT'].includes(mode)) {
      return NextResponse.json({ error: 'Mode must be either "9th-grade" or "SAT"' }, { status: 400 })
    }

    const result = await generateSummary(text, mode)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Summarization error:', error)
    
    let genError = createGenerationError(
      'API_ERROR',
      'Failed to generate summary',
      'summarization',
      error instanceof Error ? error.message : 'Unknown error',
      false
    )

    if (error instanceof Error) {
      if (error.message.includes('rate_limit')) {
        genError = createGenerationError(
          'RATE_LIMIT',
          'API rate limit exceeded',
          'summarization',
          error.message,
          true
        )
      } else if (error.message.includes('timed out')) {
        genError = createGenerationError(
          'TIMEOUT',
          'Request timed out',
          'summarization',
          error.message,
          true
        )
      } else if (error.message.includes('token')) {
        genError = createGenerationError(
          'TOKEN_LIMIT',
          'Text too long for processing',
          'summarization',
          'The provided text exceeds the maximum token limit',
          false
        )
      }
    }

    return NextResponse.json(
      { 
        error: genError.message,
        code: genError.code,
        step: genError.step,
        retryable: genError.retryable
      },
      { status: 500 }
    )
  }
}