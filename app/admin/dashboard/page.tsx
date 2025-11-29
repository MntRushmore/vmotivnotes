'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
  Loader2,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import type { AdminMetrics, JobStatus, SystemHealthStatus, Teacher, TeacherStatus } from '@/types'
import { ADMIN_ACCESS_EVENT, ADMIN_ACCESS_FLAG } from '@/lib/constants'

export const dynamic = 'force-dynamic'

const compactNumber = (value: number | undefined) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value || 0)

const integerNumber = (value: number | undefined) =>
  new Intl.NumberFormat('en-US').format(value || 0)

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})
const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })

const systemStatusVariant: Record<SystemHealthStatus['status'], BadgeProps['variant']> = {
  healthy: 'success',
  warning: 'warning',
  critical: 'destructive',
}

const jobStatusVariant: Partial<Record<JobStatus, BadgeProps['variant']>> = {
  queued: 'outline',
  extracting: 'info',
  summarizing: 'info',
  rendering: 'secondary',
  complete: 'success',
  failed: 'destructive',
}

const teacherStatusVariant: Record<TeacherStatus, BadgeProps['variant']> = {
  active: 'success',
  disabled: 'destructive',
  invited: 'warning',
}

const PageSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-64 rounded-2xl" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full rounded-3xl" />
      ))}
    </div>
    <Skeleton className="h-60 w-full rounded-3xl" />
    <Skeleton className="h-64 w-full rounded-3xl" />
  </div>
)

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null)
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [updatingTeacherId, setUpdatingTeacherId] = useState<string | null>(null)
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null)

  const fetchAdminData = useCallback(async () => {
    setIsLoading(true)
    let unauthorized = false

    try {
      const [metricsRes, teachersRes] = await Promise.all([
        fetch('/api/admin/dashboard', {
          cache: 'no-store',
          credentials: 'include',
        }),
        fetch('/api/admin/teachers', {
          cache: 'no-store',
          credentials: 'include',
        }),
      ])

      if (metricsRes.status === 401 || teachersRes.status === 401) {
        unauthorized = true
        setIsAuthenticated(false)
        setMetrics(null)
        setTeachers([])
        setLastRefreshedAt(null)
        return
      }

      const metricsPayload = await metricsRes.json()
      const teachersPayload = await teachersRes.json()

      if (!metricsRes.ok) {
        throw new Error(metricsPayload?.error ?? 'Failed to load metrics')
      }

      if (!teachersRes.ok) {
        throw new Error(teachersPayload?.error ?? 'Failed to load teachers')
      }

      setMetrics(metricsPayload.data)
      setTeachers(teachersPayload.data)
      setIsAuthenticated(true)
      setLastRefreshedAt(new Date().toISOString())

      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_ACCESS_FLAG, 'true')
        window.dispatchEvent(new Event(ADMIN_ACCESS_EVENT))
      }
    } catch (error) {
      console.error('Admin dashboard load error:', error)
      if (!unauthorized) {
        const message = error instanceof Error ? error.message : 'Unexpected error occurred'
        toast({
          title: 'Unable to load dashboard',
          description: message,
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
      setIsInitializing(false)
    }
  }, [toast])

  useEffect(() => {
    fetchAdminData()
  }, [fetchAdminData])

  const handleVerify = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!adminKey.trim()) {
      toast({
        title: 'Access key required',
        description: 'Enter the operator key to continue.',
      })
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ key: adminKey.trim() }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Invalid admin key')
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_ACCESS_FLAG, 'true')
        window.dispatchEvent(new Event(ADMIN_ACCESS_EVENT))
      }

      toast({
        title: 'Admin access granted',
        description: 'Secure session established.',
      })

      setAdminKey('')
      setIsAuthenticated(true)
      await fetchAdminData()
    } catch (error) {
      console.error('Admin verify failed:', error)
      toast({
        title: 'Access denied',
        description: error instanceof Error ? error.message : 'Could not verify admin key.',
        variant: 'destructive',
      })
    } finally {
      setIsVerifying(false)
    }
  }, [adminKey, fetchAdminData, toast])

  const handleToggleTeacher = useCallback(async (teacher: Teacher) => {
    const previousStatus = teacher.status
    const nextStatus: TeacherStatus = teacher.status === 'active' ? 'disabled' : 'active'

    setUpdatingTeacherId(teacher.id)
    setTeachers(prev =>
      prev.map(existing =>
        existing.id === teacher.id
          ? { ...existing, status: nextStatus }
          : existing
      )
    )

    try {
      const response = await fetch('/api/admin/teachers', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ teacherId: teacher.id, status: nextStatus }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Unable to update teacher')
      }

      const updatedTeacher = payload?.data as Teacher

      setTeachers(prev =>
        prev.map(existing =>
          existing.id === teacher.id ? updatedTeacher : existing
        )
      )

      setMetrics(prev => {
        if (!prev) return prev
        const summary = { ...prev.summary }

        if (previousStatus !== nextStatus) {
          if (nextStatus === 'active') {
            summary.activeTeachers += 1
            summary.disabledTeachers = Math.max(0, summary.disabledTeachers - 1)
          } else {
            summary.disabledTeachers += 1
            summary.activeTeachers = Math.max(0, summary.activeTeachers - 1)
          }
        }

        return {
          ...prev,
          summary,
        }
      })

      toast({
        title: nextStatus === 'active' ? 'Teacher enabled' : 'Teacher disabled',
        description: `${updatedTeacher.name} is now ${nextStatus}.`,
      })
    } catch (error) {
      console.error('Teacher toggle failed:', error)
      setTeachers(prev =>
        prev.map(existing =>
          existing.id === teacher.id ? { ...existing, status: previousStatus } : existing
        )
      )

      toast({
        title: 'Unable to update teacher',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setUpdatingTeacherId(null)
    }
  }, [toast])

  const usageTrend = metrics?.usage.trend ?? []
  const usagePeak = useMemo(() => {
    if (!usageTrend.length) {
      return 1
    }
    const maxUploads = Math.max(...usageTrend.map(point => point.uploads))
    return maxUploads > 0 ? maxUploads : 1
  }, [usageTrend])

  const billingProgress = metrics
    ? Math.min(100, Math.round((metrics.billing.used / metrics.billing.limit) * 100))
    : 0

  const renderAuthGate = () => (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Secure Admin Dashboard</CardTitle>
        <CardDescription>
          Enter the operator key from your deployment secrets to unlock usage metrics
          and system controls.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">
              Admin Access Key
            </label>
            <Input
              type="password"
              value={adminKey}
              onChange={event => setAdminKey(event.target.value)}
              placeholder="••••••••••"
              className="h-12 rounded-2xl"
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isVerifying}>
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying
              </>
            ) : (
              'Unlock Dashboard'
            )}
          </Button>
          <p className="text-xs text-neutral-500">
            Tip: This key lives in <code className="rounded bg-neutral-100 px-1">ADMIN_DASHBOARD_KEY</code>.
          </p>
        </form>
      </CardContent>
    </Card>
  )

  const renderMetrics = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Library Items</p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900">
                {integerNumber(metrics?.summary.totalLibraryItems)}
              </p>
              <p className="text-xs text-success-600">
                +{metrics?.summary.recentLibraryItems ?? 0} last 7 days
              </p>
            </div>
            <div className="rounded-2xl bg-primary-50 p-3 text-primary-600">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Active Jobs</p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900">
                {metrics?.summary.activeJobs ?? 0}
              </p>
              <p className="text-xs text-neutral-500">
                {metrics?.summary.failedJobs ?? 0} failed today
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-50 p-3 text-secondary-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Queued Jobs</p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900">
                {metrics?.summary.queuedJobs ?? 0}
              </p>
              <p className="text-xs text-neutral-500">
                {compactNumber(metrics?.usage.totals.aiRequests)} lifetime requests
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-100 p-3 text-neutral-600">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Active Teachers</p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900">
                {metrics?.summary.activeTeachers ?? 0}
              </p>
              <p className="text-xs text-neutral-500">
                {metrics?.summary.totalTeachers ?? 0} total faculty
              </p>
            </div>
            <div className="rounded-2xl bg-success-50 p-3 text-success-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Usage & Traffic</CardTitle>
              <CardDescription>Uploads vs AI requests over the last week</CardDescription>
            </div>
            <Badge variant="outline">Live</Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 text-sm text-neutral-600 sm:grid-cols-3">
              <div>
                <p className="text-neutral-500">Uploads</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {integerNumber(metrics?.usage.totals.uploads)}
                </p>
                <p className="text-xs text-neutral-400">All-time generated PDFs</p>
              </div>
              <div>
                <p className="text-neutral-500">AI Requests</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {integerNumber(metrics?.usage.totals.aiRequests)}
                </p>
                <p className="text-xs text-neutral-400">Claude / Nano calls</p>
              </div>
              <div>
                <p className="text-neutral-500">Storage</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {metrics ? `${metrics.summary.storageUsageMb.toFixed(1)} MB` : '0 MB'}
                </p>
                <p className="text-xs text-neutral-400">Generated assets footprint</p>
              </div>
            </div>

            <div className="flex items-end gap-2">
              {usageTrend.length === 0 && (
                <p className="text-sm text-neutral-500">No usage recorded yet.</p>
              )}
              {usageTrend.map(point => {
                const barHeight = Math.max(8, (point.uploads / usagePeak) * 100)
                return (
                  <div key={point.date} className="flex-1">
                    <div
                      className="rounded-2xl bg-gradient-to-b from-primary-400 to-primary-200"
                      style={{ height: `${barHeight}%` }}
                    />
                    <p className="mt-2 text-center text-xs text-neutral-400">
                      {weekdayFormatter.format(new Date(point.date))}
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Billing & Usage</CardTitle>
              <CardDescription>Plan consumption and renewal</CardDescription>
            </div>
            <ShieldCheck className="h-5 w-5 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 text-sm text-neutral-600">
              <div className="flex items-center justify-between">
                <span>Plan</span>
                <span className="font-semibold text-neutral-900">{metrics?.billing.plan}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Usage</span>
                <span className="font-semibold text-neutral-900">
                  {metrics?.billing.used ?? 0}/{metrics?.billing.limit ?? 0} jobs
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Renews</span>
                <span className="font-semibold text-neutral-900">
                  {metrics ? dateFormatter.format(new Date(metrics.billing.renewsOn)) : '--'}
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Progress value={billingProgress} />
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>{billingProgress}% of allocation</span>
                <span>{metrics?.billing.limit ?? 0} job limit</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Teacher Access</CardTitle>
              <CardDescription>Enable or pause campus accounts</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchAdminData}
              disabled={isLoading}
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Sync
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {teachers.length === 0 ? (
              <p className="text-sm text-neutral-500">No teacher records yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Generations</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Access</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map(teacher => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="font-medium text-neutral-900">{teacher.name}</div>
                        <div className="text-xs text-neutral-500">{teacher.email}</div>
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">{teacher.subject}</TableCell>
                      <TableCell className="text-center text-sm font-semibold text-neutral-900">
                        {integerNumber(teacher.totalGenerations)}
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">
                        {dateTimeFormatter.format(new Date(teacher.lastActiveAt))}
                      </TableCell>
                      <TableCell>
                        <Badge variant={teacherStatusVariant[teacher.status]}>{teacher.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          type="button"
                          aria-label="Toggle access"
                          aria-pressed={teacher.status === 'active'}
                          onClick={() => handleToggleTeacher(teacher)}
                          disabled={updatingTeacherId === teacher.id}
                          className={`inline-flex h-6 w-11 items-center rounded-full transition-colors ${teacher.status === 'active' ? 'bg-primary-500' : 'bg-neutral-300'} ${updatingTeacherId === teacher.id ? 'opacity-70' : ''}`}
                        >
                          <span
                            className={`h-5 w-5 transform rounded-full bg-white transition-transform ${teacher.status === 'active' ? 'translate-x-5' : 'translate-x-1'}`}
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generation Logs</CardTitle>
              <CardDescription>Most recent job events</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchAdminData}
              disabled={isLoading}
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {(!metrics || metrics.jobs.recent.length === 0) && (
              <p className="text-sm text-neutral-500">No jobs have been processed yet.</p>
            )}
            {metrics?.jobs.recent.map(job => (
              <div key={job.id} className="rounded-2xl border border-neutral-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{job.fileName}</p>
                    <p className="text-xs text-neutral-500">
                      {dateTimeFormatter.format(new Date(job.updatedAt))}
                    </p>
                  </div>
                  <Badge variant={jobStatusVariant[job.status] ?? 'outline'}>{job.status}</Badge>
                </div>
                <div className="mt-3 space-y-2">
                  <Progress value={job.progress} />
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{job.progress}% complete</span>
                    <span>
                      {job.fileSize ? `${(job.fileSize / (1024 * 1024)).toFixed(1)} MB` : '—'}
                    </span>
                  </div>
                  {job.errorMessage && (
                    <p className="text-xs text-destructive-600">{job.errorMessage}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Environment readiness for core integrations</CardDescription>
          </div>
          <Zap className="h-5 w-5 text-warning-500" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics?.systemHealth.map(health => (
              <div
                key={health.id}
                className="rounded-2xl border border-neutral-200 p-4 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{health.service}</p>
                    <p className="text-xs text-neutral-500">{health.message}</p>
                  </div>
                  <Badge variant={systemStatusVariant[health.status]}>{health.status}</Badge>
                </div>
                <p className="mt-3 text-xs text-neutral-500">
                  Requires {health.envVars.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )

  return (
    <div className="px-4 py-10 md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-neutral-500">Operations Control Center</p>
            <h1 className="text-3xl font-semibold text-neutral-900">Admin Dashboard</h1>
          </div>
          {isAuthenticated && (
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <span>
                {lastRefreshedAt
                  ? `Updated ${dateTimeFormatter.format(new Date(lastRefreshedAt))}`
                  : 'Awaiting latest sync'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchAdminData}
                disabled={isLoading}
              >
                <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          )}
        </div>

        {isInitializing ? (
          <PageSkeleton />
        ) : !isAuthenticated ? (
          renderAuthGate()
        ) : metrics ? (
          renderMetrics()
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Dashboard unavailable</CardTitle>
              <CardDescription>
                We couldn&apos;t load the latest metrics. Try refreshing or check the server logs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={fetchAdminData} disabled={isLoading}>
                <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Retry
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
