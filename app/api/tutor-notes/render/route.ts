import { NextRequest, NextResponse } from 'next/server'
import { HandwritingRenderer } from '@/lib/handwriting-renderer-enhanced'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

/**
 * Render notes in handwriting style
 * POST /api/tutor-notes/render
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const markdown = body.markdown
    const style = body.style || 'notes'

    if (!markdown) {
      return NextResponse.json(
        { error: 'Markdown content is required' },
        { status: 400 }
      )
    }

    console.log('[tutor-notes/render] Rendering handwritten notes...')

    const result = await HandwritingRenderer.render({
      markdown,
      style
    })

    console.log('[tutor-notes/render] Successfully rendered handwriting')

    return NextResponse.json({
      success: true,
      imageData: result.imageData,
      imageUrl: `data:image/png;base64,${result.imageData}`
    })

  } catch (error) {
    console.error('[tutor-notes/render] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to render handwriting',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
