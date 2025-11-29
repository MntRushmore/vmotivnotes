import { NextResponse } from 'next/server'
import { getAdminMetrics } from '@/lib/admin-metrics'
import { isAdminKeyConfigured, isAdminRequestAuthorized } from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET() {
  try {
    if (!isAdminKeyConfigured()) {
      return NextResponse.json(
        { error: 'Admin dashboard key is not configured' },
        { status: 503 }
      )
    }

    if (!isAdminRequestAuthorized()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const metrics = await getAdminMetrics()

    return NextResponse.json({
      success: true,
      data: metrics,
    })
  } catch (error) {
    console.error('Admin dashboard metrics error:', error)
    return NextResponse.json(
      { error: 'Failed to load dashboard metrics' },
      { status: 500 }
    )
  }
}
