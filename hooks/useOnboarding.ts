'use client'

import { useState, useCallback, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { OnboardingData, OnboardingStep } from '@/types'
import { useUserSettings } from './useUserSettings'

const ONBOARDING_STORAGE_KEY = 'vmotiv-onboarding-complete'
const ONBOARDING_DATA_KEY = 'vmotiv-onboarding-data'

const DEFAULT_ONBOARDING_DATA: OnboardingData = {
  name: '',
  school: '',
  preferredSummaryMode: 'sat',
  notifications: {
    emailOnCompletion: true,
    emailOnError: true,
    desktopNotifications: false,
  },
}

export function useOnboarding() {
  const { toast } = useToast()
  const { saveProfile, savePreferences } = useUserSettings()
  const [isComplete, setIsComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(DEFAULT_ONBOARDING_DATA)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedComplete = localStorage.getItem(ONBOARDING_STORAGE_KEY)
      const savedData = localStorage.getItem(ONBOARDING_DATA_KEY)

      if (savedComplete === 'true') {
        setIsComplete(true)
      }

      if (savedData) {
        setOnboardingData(JSON.parse(savedData))
      }
    } catch (error) {
      console.error('Failed to load onboarding data from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveOnboardingData = useCallback(
    async (data: OnboardingData) => {
      try {
        setOnboardingData(data)
        localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(data))
        
        // Sync with user settings store
        await saveProfile({
          name: data.name,
          email: `user@${data.school.toLowerCase().replace(/\s+/g, '')}.edu`,
          school: data.school,
        })

        await savePreferences({
          defaultSummaryMode: data.preferredSummaryMode,
          notifications: data.notifications,
        })

        return true
      } catch (error) {
        console.error('Failed to save onboarding data:', error)
        toast({
          title: 'Error',
          description: 'Failed to save your onboarding progress',
          variant: 'destructive',
        })
        return false
      }
    },
    [saveProfile, savePreferences, toast]
  )

  const updateStep = useCallback((step: OnboardingStep) => {
    setCurrentStep(step)
  }, [])

  const nextStep = useCallback(() => {
    const steps: OnboardingStep[] = ['welcome', 'profile', 'preferences', 'confirmation']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    const steps: OnboardingStep[] = ['welcome', 'profile', 'preferences', 'confirmation']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }, [currentStep])

  const completeOnboarding = useCallback(async () => {
    try {
      const success = await saveOnboardingData(onboardingData)
      if (success) {
        setIsComplete(true)
        localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
        toast({
          title: 'Welcome to VMotiv Notes!',
          description: 'Your profile has been set up successfully.',
        })
      }
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
    }
  }, [onboardingData, saveOnboardingData, toast])

  const resetOnboarding = useCallback(() => {
    try {
      setIsComplete(false)
      setCurrentStep('welcome')
      setOnboardingData(DEFAULT_ONBOARDING_DATA)
      localStorage.removeItem(ONBOARDING_STORAGE_KEY)
      localStorage.removeItem(ONBOARDING_DATA_KEY)
      toast({
        title: 'Onboarding Reset',
        description: 'You can start the onboarding flow again.',
      })
    } catch (error) {
      console.error('Failed to reset onboarding:', error)
    }
  }, [toast])

  const resumeOnboarding = useCallback(() => {
    setCurrentStep('welcome')
  }, [])

  return {
    isComplete,
    currentStep,
    onboardingData,
    isLoading,
    updateStep,
    nextStep,
    prevStep,
    completeOnboarding,
    resetOnboarding,
    resumeOnboarding,
    saveOnboardingData,
  }
}