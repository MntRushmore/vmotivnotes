import { NextRequest, NextResponse } from 'next/server'
import { generationService } from '@/lib/generation-service'

export const runtime = 'nodejs'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    )
  }

  const result = await generationService.getResult(id)

  if (!result) {
    return NextResponse.json(
      { error: 'Generation not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(result)
}