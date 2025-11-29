import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE_MAX_AGE, ADMIN_SESSION_COOKIE } from '@/lib/constants'
import { getAdminSessionSignature, isAdminKeyConfigured } from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    if (!isAdminKeyConfigured()) {
      return NextResponse.json(
        { error: 'Admin dashboard key is not configured' },
        { status: 503 }
      )
    }

    const body = await request.json().catch(() => null)
    const submittedKey = typeof body?.key === 'string' ? body.key.trim() : ''

    if (!submittedKey) {
      return NextResponse.json(
        { error: 'Access key is required' },
        { status: 400 }
      )
    }

    if (submittedKey !== process.env.ADMIN_DASHBOARD_KEY) {
      return NextResponse.json(
        { error: 'Invalid access key' },
        { status: 401 }
      )
    }

    const signature = getAdminSessionSignature()
    if (!signature) {
      return NextResponse.json(
        { error: 'Unable to create admin session' },
        { status: 500 }
      )
    }

    const response = NextResponse.json({
      success: true,
      message: 'Admin access granted',
    })

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: signature,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ADMIN_COOKIE_MAX_AGE,
    })

    return response
  } catch (error) {
    console.error('Admin verify error:', error)
    return NextResponse.json(
      { error: 'Failed to verify admin access' },
      { status: 500 }
    )
  }
}
