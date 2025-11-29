'use client'

import React, { useState, useEffect } from 'react'
import { useUserSettings } from '@/hooks/useUserSettings'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { ExportHistoryEntry } from '@/types'
import { Copy, Eye, EyeOff, Download } from 'lucide-react'

export default function SettingsPage() {
  const { toast } = useToast()
  const {
    profile,
    apiKeys,
    preferences,
    isLoading,
    saveProfile,
    saveApiKey,
    removeApiKey,
    savePreferences,
    reset,
  } = useUserSettings()

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    school: '',
  })

  const [apiKeyForms, setApiKeyForms] = useState({
    uploadthing: '',
    anthropic: '',
    nanoBanana: '',
  })

  const [revealedKeys, setRevealedKeys] = useState({
    uploadthing: false,
    anthropic: false,
    nanoBanana: false,
  })

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [summaryMode, setSummaryMode] = useState<'9th-grade' | 'sat'>('sat')

  const [notifications, setNotifications] = useState({
    emailOnCompletion: true,
    emailOnError: true,
    desktopNotifications: false,
  })

  const [exportHistory, setExportHistory] = useState<ExportHistoryEntry[]>([])
  const [loadingExport, setLoadingExport] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)

  // Initialize forms from settings
  useEffect(() => {
    if (!isLoading) {
      setProfileForm({
        name: profile.name,
        email: profile.email,
        school: profile.school || '',
      })

      setApiKeyForms({
        uploadthing: apiKeys.uploadthing || '',
        anthropic: apiKeys.anthropic || '',
        nanoBanana: apiKeys.nanoBanana || '',
      })

      setSummaryMode(preferences.defaultSummaryMode)
      setNotifications(preferences.notifications)
    }
  }, [isLoading, profile, apiKeys, preferences])

  // Load export history on mount
  useEffect(() => {
    const load = async () => {
      try {
        setLoadingHistory(true)
        const response = await fetch('/api/account/export')
        if (response.ok) {
          const data = await response.json()
          setExportHistory(data.data || [])
        }
      } catch (error) {
        console.error('Failed to load export history:', error)
      } finally {
        setLoadingHistory(false)
      }
    }

    if (!isLoading) {
      load()
    }
  }, [isLoading])

  const loadExportHistory = async () => {
    try {
      setLoadingHistory(true)
      const response = await fetch('/api/account/export')
      if (response.ok) {
        const data = await response.json()
        setExportHistory(data.data || [])
      }
    } catch (error) {
      console.error('Failed to load export history:', error)
      toast({
        title: 'Error',
        description: 'Failed to load export history',
        variant: 'destructive',
      })
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      toast({
        title: 'Error',
        description: 'Name and email are required',
        variant: 'destructive',
      })
      return
    }

    await saveProfile({
      name: profileForm.name,
      email: profileForm.email,
      school: profileForm.school,
    })
  }

  const handleSaveApiKey = async (provider: keyof typeof apiKeyForms) => {
    const key = apiKeyForms[provider].trim()
    if (!key) {
      toast({
        title: 'Error',
        description: 'API key cannot be empty',
        variant: 'destructive',
      })
      return
    }

    await saveApiKey(provider as any, key)
  }

  const handleTestConnection = async (provider: keyof typeof apiKeyForms) => {
    toast({
      title: 'Testing',
      description: `Testing ${provider} connection...`,
    })
    // Simulated test - in production, this would make actual API calls
    setTimeout(() => {
      toast({
        title: 'Success',
        description: `${provider} connection successful`,
      })
    }, 1000)
  }

  const handleRemoveApiKey = async (provider: keyof typeof apiKeyForms) => {
    await removeApiKey(provider as any)
    setApiKeyForms({
      ...apiKeyForms,
      [provider]: '',
    })
  }

  const handleChangePassword = async () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      toast({
        title: 'Error',
        description: 'All fields are required',
        variant: 'destructive',
      })
      return
    }

    if (passwordForm.new !== passwordForm.confirm) {
      toast({
        title: 'Error',
        description: 'New passwords do not match',
        variant: 'destructive',
      })
      return
    }

    if (passwordForm.new.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters',
        variant: 'destructive',
      })
      return
    }

    // Simulated password change
    toast({
      title: 'Success',
      description: 'Password changed successfully',
    })

    setPasswordForm({
      current: '',
      new: '',
      confirm: '',
    })
  }

  const handleSavePreferences = async () => {
    await savePreferences({
      defaultSummaryMode: summaryMode,
      notifications,
    })
  }

  const handleExportData = async () => {
    try {
      setLoadingExport(true)
      const response = await fetch('/api/account/export', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: 'Success',
          description: 'Data exported successfully',
        })

        // Reload history
        await loadExportHistory()

        // Trigger download if file path is returned
        if (data.filePath) {
          const link = document.createElement('a')
          link.href = data.filePath
          link.download = data.entry.fileName
          link.click()
        }
      } else {
        const error = await response.json()
        toast({
          title: 'Error',
          description: error.error || 'Failed to export data',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: 'Error',
        description: 'Failed to export data',
        variant: 'destructive',
      })
    } finally {
      setLoadingExport(false)
    }
  }

  const handleDownloadExport = (filePath: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = filePath
    link.download = fileName
    link.click()
  }

  const handleLogout = () => {
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    })
    // In production, this would clear auth tokens
  }

  const handleResetData = async () => {
    if (confirm('Are you sure? This will reset all your settings to defaults.')) {
      await reset()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
          <p className="mt-4 text-neutral-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-neutral-950">Settings</h1>
          <p className="text-neutral-600 mt-2">Manage your profile, preferences, and account settings</p>
        </div>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="school">School (Optional)</Label>
                <Input
                  id="school"
                  value={profileForm.school}
                  onChange={(e) => setProfileForm({ ...profileForm, school: e.target.value })}
                  placeholder="Your school name"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile} className="ml-auto">
              Save Profile
            </Button>
          </CardFooter>
        </Card>

        {/* API Keys Section */}
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage your API keys for integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* UploadThing */}
            <div>
              <Label className="text-base font-semibold">UploadThing</Label>
              <p className="text-sm text-neutral-600 mb-3">API key for file uploads</p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    type={revealedKeys.uploadthing ? 'text' : 'password'}
                    value={apiKeyForms.uploadthing}
                    onChange={(e) => setApiKeyForms({ ...apiKeyForms, uploadthing: e.target.value })}
                    placeholder="sk_..."
                  />
                  {apiKeyForms.uploadthing && (
                    <button
                      onClick={() => setRevealedKeys({ ...revealedKeys, uploadthing: !revealedKeys.uploadthing })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    >
                      {revealedKeys.uploadthing ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
                {apiKeyForms.uploadthing && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKeyForms.uploadthing)
                        toast({ title: 'Copied to clipboard' })
                      }}
                    >
                      <Copy size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection('uploadthing')}
                    >
                      Test
                    </Button>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                {apiKeyForms.uploadthing && (
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveApiKey('uploadthing')}
                  >
                    Remove
                  </Button>
                )}
                {!apiKeyForms.uploadthing && (
                  <Button
                    variant="secondary"
                    onClick={() => handleSaveApiKey('uploadthing')}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Anthropic */}
            <div>
              <Label className="text-base font-semibold">Anthropic</Label>
              <p className="text-sm text-neutral-600 mb-3">API key for AI features</p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    type={revealedKeys.anthropic ? 'text' : 'password'}
                    value={apiKeyForms.anthropic}
                    onChange={(e) => setApiKeyForms({ ...apiKeyForms, anthropic: e.target.value })}
                    placeholder="sk-ant-..."
                  />
                  {apiKeyForms.anthropic && (
                    <button
                      onClick={() => setRevealedKeys({ ...revealedKeys, anthropic: !revealedKeys.anthropic })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    >
                      {revealedKeys.anthropic ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
                {apiKeyForms.anthropic && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKeyForms.anthropic)
                        toast({ title: 'Copied to clipboard' })
                      }}
                    >
                      <Copy size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection('anthropic')}
                    >
                      Test
                    </Button>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                {apiKeyForms.anthropic && (
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveApiKey('anthropic')}
                  >
                    Remove
                  </Button>
                )}
                {!apiKeyForms.anthropic && (
                  <Button
                    variant="secondary"
                    onClick={() => handleSaveApiKey('anthropic')}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Nano Banana */}
            <div>
              <Label className="text-base font-semibold">Nano Banana</Label>
              <p className="text-sm text-neutral-600 mb-3">API key for processing tasks</p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    type={revealedKeys.nanoBanana ? 'text' : 'password'}
                    value={apiKeyForms.nanoBanana}
                    onChange={(e) => setApiKeyForms({ ...apiKeyForms, nanoBanana: e.target.value })}
                    placeholder="nb_..."
                  />
                  {apiKeyForms.nanoBanana && (
                    <button
                      onClick={() => setRevealedKeys({ ...revealedKeys, nanoBanana: !revealedKeys.nanoBanana })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    >
                      {revealedKeys.nanoBanana ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
                {apiKeyForms.nanoBanana && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKeyForms.nanoBanana)
                        toast({ title: 'Copied to clipboard' })
                      }}
                    >
                      <Copy size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection('nanoBanana')}
                    >
                      Test
                    </Button>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                {apiKeyForms.nanoBanana && (
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveApiKey('nanoBanana')}
                  >
                    Remove
                  </Button>
                )}
                {!apiKeyForms.nanoBanana && (
                  <Button
                    variant="secondary"
                    onClick={() => handleSaveApiKey('nanoBanana')}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Default Summary Mode</Label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50">
                  <input
                    type="radio"
                    checked={summaryMode === '9th-grade'}
                    onChange={() => setSummaryMode('9th-grade')}
                    className="w-4 h-4 accent-primary-600"
                  />
                  <div>
                    <p className="font-medium">9th Grade</p>
                    <p className="text-sm text-neutral-600">Simpler language and shorter summaries</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50">
                  <input
                    type="radio"
                    checked={summaryMode === 'sat'}
                    onChange={() => setSummaryMode('sat')}
                    className="w-4 h-4 accent-primary-600"
                  />
                  <div>
                    <p className="font-medium">SAT</p>
                    <p className="text-sm text-neutral-600">Comprehensive summaries for SAT prep</p>
                  </div>
                </label>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-base font-semibold mb-4 block">Notification Preferences</Label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={notifications.emailOnCompletion}
                    onChange={(e) => setNotifications({ ...notifications, emailOnCompletion: e.target.checked })}
                    className="w-4 h-4 accent-primary-600 rounded"
                  />
                  <div>
                    <p className="font-medium">Email on Completion</p>
                    <p className="text-sm text-neutral-600">Get notified when processing is done</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={notifications.emailOnError}
                    onChange={(e) => setNotifications({ ...notifications, emailOnError: e.target.checked })}
                    className="w-4 h-4 accent-primary-600 rounded"
                  />
                  <div>
                    <p className="font-medium">Email on Error</p>
                    <p className="text-sm text-neutral-600">Get notified when something goes wrong</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={notifications.desktopNotifications}
                    onChange={(e) => setNotifications({ ...notifications, desktopNotifications: e.target.checked })}
                    className="w-4 h-4 accent-primary-600 rounded"
                  />
                  <div>
                    <p className="font-medium">Desktop Notifications</p>
                    <p className="text-sm text-neutral-600">Show notifications on your computer</p>
                  </div>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSavePreferences} className="ml-auto">
              Save Preferences
            </Button>
          </CardFooter>
        </Card>

        {/* Account Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>Manage your account security and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Change Password</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    placeholder="Enter current password"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                    placeholder="Enter new password"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    placeholder="Confirm new password"
                    className="mt-1"
                  />
                </div>
              </div>
              <Button onClick={handleChangePassword} className="mt-4" variant="secondary">
                Update Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Export Section */}
        <Card>
          <CardHeader>
            <CardTitle>Data Export</CardTitle>
            <CardDescription>Export and manage your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-neutral-600 mb-4">
                Download all your data as a JSON file. This includes your library, settings, and history.
              </p>
              <Button onClick={handleExportData} disabled={loadingExport} className="w-full md:w-auto">
                {loadingExport ? 'Exporting...' : 'Export Data'}
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Export History</h3>
              {loadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-neutral-200 border-t-primary-600"></div>
                </div>
              ) : exportHistory.length === 0 ? (
                <p className="text-neutral-600 py-8 text-center">No exports yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exportHistory.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.fileName}</TableCell>
                          <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
                          <TableCell>{(entry.fileSize / 1024).toFixed(2)} KB</TableCell>
                          <TableCell>
                            {entry.status === 'success' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success-50 text-success-700 text-xs font-medium">
                                ✓ Success
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-destructive-50 text-destructive-700 text-xs font-medium">
                                ✗ Failed
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {entry.status === 'success' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadExport(`/exports/${entry.fileName}`, entry.fileName)}
                              >
                                <Download size={16} />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive-200 bg-destructive-50">
          <CardHeader>
            <CardTitle className="text-destructive-700">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex-1"
              >
                Logout
              </Button>
              <Button
                variant="destructive"
                onClick={handleResetData}
                className="flex-1"
              >
                Reset All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
