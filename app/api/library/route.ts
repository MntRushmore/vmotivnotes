import { NextRequest, NextResponse } from 'next/server'
import { StorageService } from '@/lib/storage-service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const category = searchParams.get('category')
    const status = searchParams.get('status') as 'ready' | 'processing' | 'error' | null
    const sortBy = searchParams.get('sortBy') as 'recent' | 'alphabetical' | 'popular' | null
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    let items = await StorageService.getAll()

    if (query) {
      items = await StorageService.search(query)
    }

    if (category || status) {
      items = await StorageService.filter({
        category: category || undefined,
        status: status || undefined
      })
    }

    if (sortBy) {
      items = await StorageService.sort(items, sortBy)
    } else {
      items = await StorageService.sort(items, 'recent')
    }

    const result = await StorageService.paginate(items, page, limit)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Library API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch library items' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const success = await StorageService.delete(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}
