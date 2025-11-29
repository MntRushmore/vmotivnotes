'use client'

import { Progress } from '@/components/ui/progress'
import { OnboardingStep, OnboardingData } from '@/types'
import { WelcomeHero } from './WelcomeHero'
import { ProfileStep } from './ProfileStep'
import { PreferenceStep } from './PreferenceStep'
import { ConfirmationStep } from './ConfirmationStep'

interface SetupWizardProps {
  currentStep: OnboardingStep
  data: OnboardingData
  onChange: (data: OnboardingData) => void
  onNext: () => void
  onPrev: () => void
  onComplete: () => void
  isCompleting?: boolean
}

const STEP_TITLES = {
  welcome: 'Welcome',
  profile: 'Profile',
  preferences: 'Preferences',
  confirmation: 'Confirmation',
} as const

const STEPS: OnboardingStep[] = ['welcome', 'profile', 'preferences', 'confirmation']

export function SetupWizard({
  currentStep,
  data,
  onChange,
  onNext,
  onPrev,
  onComplete,
  isCompleting = false,
}: SetupWizardProps) {
  const currentStepIndex = STEPS.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeHero onNext={onNext} />
      case 'profile':
        return (
          <ProfileStep
            data={data}
            onChange={onChange}
            onNext={onNext}
            onPrev={onPrev}
          />
        )
      case 'preferences':
        return (
          <PreferenceStep
            data={data}
            onChange={onChange}
            onNext={onNext}
            onPrev={onPrev}
          />
        )
      case 'confirmation':
        return (
          <ConfirmationStep
            data={data}
            onComplete={onComplete}
            onPrev={onPrev}
            isCompleting={isCompleting}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => {
              const isActive = step === currentStep
              const isCompleted = index < currentStepIndex
              
              return (
                <div key={step} className="flex items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-smooth
                      ${isActive ? 'bg-primary-600 text-white' : ''}
                      ${isCompleted ? 'bg-success-600 text-white' : ''}
                      ${!isActive && !isCompleted ? 'bg-neutral-200 text-neutral-500' : ''}
                    `}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`
                        w-full h-0.5 mx-2 transition-smooth
                        ${isCompleted ? 'bg-success-600' : 'bg-neutral-200'}
                      `}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Step {currentStepIndex + 1} of {STEPS.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step Title */}
          <div className="mt-4 text-center">
            <h1 className="text-lg font-medium text-neutral-900">
              {STEP_TITLES[currentStep]}
            </h1>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-soft-xl p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}