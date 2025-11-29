'use client'

import { Check, Mail, Monitor, BookOpen, GraduationCap, User } from 'lucide-react'
import { OnboardingData } from '@/types'

interface ConfirmationStepProps {
  data: OnboardingData
  onComplete: () => void
  onPrev: () => void
  isCompleting?: boolean
}

export function ConfirmationStep({ data, onComplete, onPrev, isCompleting = false }: ConfirmationStepProps) {
  const getSummaryModeLabel = (mode: '9th-grade' | 'sat') => {
    return mode === '9th-grade' ? '9th Grade Level' : 'SAT Prep Level'
  }

  const enabledNotifications = Object.entries(data.notifications)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => {
      switch (key) {
        case 'emailOnCompletion':
          return { label: 'Email on Completion', icon: Mail }
        case 'emailOnError':
          return { label: 'Email on Errors', icon: Mail }
        case 'desktopNotifications':
          return { label: 'Desktop Notifications', icon: Monitor }
        default:
          return null
      }
    })
    .filter(Boolean)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-neutral-900">
          You&apos;re All Set!
        </h2>
        <p className="text-neutral-600">
          Review your settings and start using VMotiv Notes.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border-2 border-neutral-200 rounded-3xl p-6 space-y-6">
        {/* Profile Info */}
        <div className="space-y-4">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <Check className="w-5 h-5 text-success-600" />
            Profile Information
          </h3>
          <div className="space-y-2 pl-7">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-neutral-500" />
              <span className="text-neutral-600">Name:</span>
              <span className="font-medium text-neutral-900">{data.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="w-4 h-4 text-neutral-500" />
              <span className="text-neutral-600">School:</span>
              <span className="font-medium text-neutral-900">{data.school}</span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h3 className="font-medium text-neutral-900 flex items-center gap-2">
            <Check className="w-5 h-5 text-success-600" />
            Preferences
          </h3>
          <div className="space-y-2 pl-7">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-neutral-500" />
              <span className="text-neutral-600">Summary Mode:</span>
              <span className="font-medium text-neutral-900">
                {getSummaryModeLabel(data.preferredSummaryMode)}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {enabledNotifications.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium text-neutral-900 flex items-center gap-2">
              <Check className="w-5 h-5 text-success-600" />
              Notifications Enabled
            </h3>
            <div className="space-y-2 pl-7">
              {enabledNotifications.map((notification, index) => {
                if (!notification) return null
                const Icon = notification.icon
                return (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Icon className="w-4 h-4 text-neutral-500" />
                    <span className="font-medium text-neutral-900">{notification.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Success Message */}
      <div className="text-center p-4 bg-success-50 rounded-2xl">
        <p className="text-sm text-success-800">
          🎉 Your profile is ready! You can always change these settings later in the Settings page.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          className="px-6 py-2 border border-neutral-200 text-neutral-700 rounded-2xl hover:bg-neutral-50 transition-smooth"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          disabled={isCompleting}
          className={`px-6 py-2 rounded-2xl transition-smooth ${
            isCompleting
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-soft-md'
          }`}
        >
          {isCompleting ? 'Setting up your profile...' : 'Start Using VMotiv Notes'}
        </button>
      </div>
    </div>
  )
}