import { NextRequest, NextResponse } from 'next/server'
import { StorageService } from '@/lib/storage-service'
import { PDFLibraryItem } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, category, description } = body

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    const mockPDFUrl = `/generated/${topic.toLowerCase().replace(/\s+/g, '-')}.pdf`
    
    const item: PDFLibraryItem = {
      id: `pdf-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      title: topic,
      url: mockPDFUrl,
      createdAt: new Date(),
      topic,
      category: category || 'General',
      summarySnippet: description || `Notes on ${topic}`,
      status: 'ready',
      fileSize: Math.floor(Math.random() * 500000) + 100000,
      metadata: {
        extractionConfidence: 0.95,
        summaryQuality: 0.9,
        pageCount: Math.floor(Math.random() * 5) + 1,
      },
    }

    await StorageService.save(item)

    return NextResponse.json({
      success: true,
      item,
    })
  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
