'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useOnboarding } from '@/hooks/useOnboarding'
import { SetupWizard } from '@/components/onboarding/SetupWizard'

export default function OnboardingPage() {
  const router = useRouter()
  const {
    isComplete,
    currentStep,
    onboardingData,
    isLoading,
    nextStep,
    prevStep,
    completeOnboarding,
    saveOnboardingData,
  } = useOnboarding()

  // Redirect if onboarding is already complete
  useEffect(() => {
    if (!isLoading && isComplete) {
      router.push('/upload')
    }
  }, [isComplete, isLoading, router])

  const handleComplete = async () => {
    await completeOnboarding()
    // Redirect will happen via the useEffect above
  }

  const handleDataChange = async (data: typeof onboardingData) => {
    await saveOnboardingData(data)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Don't render if already complete (redirect will happen)
  if (isComplete) {
    return null
  }

  return (
    <SetupWizard
      currentStep={currentStep}
      data={onboardingData}
      onChange={handleDataChange}
      onNext={nextStep}
      onPrev={prevStep}
      onComplete={handleComplete}
      isCompleting={false}
    />
  )
}