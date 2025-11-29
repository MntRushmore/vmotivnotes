'use client'

import { useState, useCallback, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { UserProfile, ApiKeyConfig, UserPreferences } from '@/types'

const STORAGE_KEYS = {
  PROFILE: 'vmotiv-user-profile',
  API_KEYS: 'vmotiv-api-keys',
  PREFERENCES: 'vmotiv-user-preferences',
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'User',
  email: 'user@example.com',
}

const DEFAULT_PREFERENCES: UserPreferences = {
  defaultSummaryMode: 'sat',
  notifications: {
    emailOnCompletion: true,
    emailOnError: true,
    desktopNotifications: false,
  },
}

export function useUserSettings() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig>({})
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE)
      const savedApiKeys = localStorage.getItem(STORAGE_KEYS.API_KEYS)
      const savedPreferences = localStorage.getItem(STORAGE_KEYS.PREFERENCES)

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
      }
      if (savedApiKeys) {
        setApiKeys(JSON.parse(savedApiKeys))
      }
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    } catch (error) {
      console.error('Failed to load user settings from localStorage:', error)
      toast({
        title: 'Warning',
        description: 'Could not load your saved settings',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const saveProfile = useCallback(
    async (newProfile: UserProfile) => {
      try {
        setProfile(newProfile)
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile))
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        })
      } catch (error) {
        console.error('Failed to save profile:', error)
        toast({
          title: 'Error',
          description: 'Failed to save profile',
          variant: 'destructive',
        })
      }
    },
    [toast]
  )

  const saveApiKey = useCallback(
    async (provider: keyof ApiKeyConfig, key: string) => {
      try {
        const updated = { ...apiKeys, [provider]: key }
        setApiKeys(updated)
        localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(updated))
        toast({
          title: 'Success',
          description: `${provider} API key saved successfully`,
        })
      } catch (error) {
        console.error('Failed to save API key:', error)
        toast({
          title: 'Error',
          description: 'Failed to save API key',
          variant: 'destructive',
        })
      }
    },
    [apiKeys, toast]
  )

  const removeApiKey = useCallback(
    async (provider: keyof ApiKeyConfig) => {
      try {
        const updated = { ...apiKeys }
        delete updated[provider]
        setApiKeys(updated)
        localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(updated))
        toast({
          title: 'Success',
          description: `${provider} API key removed`,
        })
      } catch (error) {
        console.error('Failed to remove API key:', error)
        toast({
          title: 'Error',
          description: 'Failed to remove API key',
          variant: 'destructive',
        })
      }
    },
    [apiKeys, toast]
  )

  const savePreferences = useCallback(
    async (newPreferences: UserPreferences) => {
      try {
        setPreferences(newPreferences)
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(newPreferences))
        toast({
          title: 'Success',
          description: 'Preferences updated successfully',
        })
      } catch (error) {
        console.error('Failed to save preferences:', error)
        toast({
          title: 'Error',
          description: 'Failed to save preferences',
          variant: 'destructive',
        })
      }
    },
    [toast]
  )

  const reset = useCallback(async () => {
    try {
      setProfile(DEFAULT_PROFILE)
      setApiKeys({})
      setPreferences(DEFAULT_PREFERENCES)
      localStorage.removeItem(STORAGE_KEYS.PROFILE)
      localStorage.removeItem(STORAGE_KEYS.API_KEYS)
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES)
      toast({
        title: 'Success',
        description: 'Settings reset to defaults',
      })
    } catch (error) {
      console.error('Failed to reset settings:', error)
      toast({
        title: 'Error',
        description: 'Failed to reset settings',
        variant: 'destructive',
      })
    }
  }, [toast])

  return {
    profile,
    apiKeys,
    preferences,
    isLoading,
    saveProfile,
    saveApiKey,
    removeApiKey,
    savePreferences,
    reset,
  }
}
