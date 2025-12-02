import { createHash } from 'crypto'
import { cookies } from 'next/headers'
import { ADMIN_SESSION_COOKIE } from './constants'

export function isAdminKeyConfigured(): boolean {
  return Boolean(process.env.ADMIN_DASHBOARD_KEY)
}

export function getAdminSessionSignature(): string | null {
  if (!process.env.ADMIN_DASHBOARD_KEY) {
    return null
  }

  return createHash('sha256')
    .update(process.env.ADMIN_DASHBOARD_KEY)
    .digest('hex')
}

export async function isAdminRequestAuthorized(): Promise<boolean> {
  const expectedSignature = getAdminSessionSignature()
  if (!expectedSignature) {
    return false
  }

  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)
    return sessionCookie?.value === expectedSignature
  } catch (error) {
    console.error('Error checking admin authorization:', error)
    return false
  }
}
