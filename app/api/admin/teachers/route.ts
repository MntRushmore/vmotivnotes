import { NextRequest, NextResponse } from 'next/server'
import { TeacherService } from '@/lib/teacher-service'
import { isAdminKeyConfigured, isAdminRequestAuthorized } from '@/lib/admin-auth'
import type { TeacherStatus } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_STATUSES: TeacherStatus[] = ['active', 'disabled', 'invited']

function isValidStatus(value: unknown): value is TeacherStatus {
  return typeof value === 'string' && VALID_STATUSES.includes(value as TeacherStatus)
}

async function ensureAdminAccess() {
  if (!isAdminKeyConfigured()) {
    return NextResponse.json(
      { error: 'Admin dashboard key is not configured' },
      { status: 503 }
    )
  }

  const isAuthorized = await isAdminRequestAuthorized()
  if (!isAuthorized) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return null
}

export async function GET() {
  const guardResponse = await ensureAdminAccess()
  if (guardResponse) {
    return guardResponse
  }

  try {
    const teachers = await TeacherService.getAll()
    return NextResponse.json({ success: true, data: teachers })
  } catch (error) {
    console.error('Teacher list error:', error)
    return NextResponse.json(
      { error: 'Failed to load teachers' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const guardResponse = await ensureAdminAccess()
  if (guardResponse) {
    return guardResponse
  }

  try {
    const body = await request.json().catch(() => null)
    const teacherId = typeof body?.teacherId === 'string' ? body.teacherId : ''
    const status = body?.status

    if (!teacherId) {
      return NextResponse.json(
        { error: 'Teacher ID is required' },
        { status: 400 }
      )
    }

    const updatedTeacher = isValidStatus(status)
      ? await TeacherService.updateStatus(teacherId, status)
      : await TeacherService.toggleStatus(teacherId)

    if (!updatedTeacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updatedTeacher })
  } catch (error) {
    console.error('Teacher update error:', error)
    return NextResponse.json(
      { error: 'Failed to update teacher access' },
      { status: 500 }
    )
  }
}
