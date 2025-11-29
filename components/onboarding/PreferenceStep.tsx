'use client'

import { Mail, Monitor } from 'lucide-react'
import { OnboardingData } from '@/types'

interface PreferenceStepProps {
  data: OnboardingData
  onChange: (data: OnboardingData) => void
  onNext: () => void
  onPrev: () => void
}

export function PreferenceStep({ data, onChange, onNext, onPrev }: PreferenceStepProps) {
  const handleNotificationChange = (key: keyof OnboardingData['notifications']) => {
    onChange({
      ...data,
      notifications: {
        ...data.notifications,
        [key]: !data.notifications[key],
      },
    })
  }

  const handleSummaryModeChange = (mode: '9th-grade' | 'sat') => {
    onChange({
      ...data,
      preferredSummaryMode: mode,
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Customize Your Experience
        </h2>
        <p className="text-neutral-600">
          Set your preferences for how VMotiv Notes should work for you.
        </p>
      </div>

      {/* Summary Mode Preference */}
      <div className="space-y-4">
        <h3 className="font-medium text-neutral-900">Default Summary Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleSummaryModeChange('9th-grade')}
            className={`p-4 rounded-2xl border-2 transition-smooth ${
              data.preferredSummaryMode === '9th-grade'
                ? 'border-primary-300 bg-primary-50'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="text-left">
              <h4 className="font-medium text-neutral-900 mb-1">9th Grade Level</h4>
              <p className="text-sm text-neutral-600">
                Simple, clear explanations perfect for high school freshmen
              </p>
            </div>
          </button>

          <button
            onClick={() => handleSummaryModeChange('sat')}
            className={`p-4 rounded-2xl border-2 transition-smooth ${
              data.preferredSummaryMode === 'sat'
                ? 'border-primary-300 bg-primary-50'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="text-left">
              <h4 className="font-medium text-neutral-900 mb-1">SAT Prep Level</h4>
              <p className="text-sm text-neutral-600">
                Advanced vocabulary and complex concepts for test preparation
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-4">
        <h3 className="font-medium text-neutral-900">Notification Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-white border-2 border-neutral-200 rounded-2xl hover:border-neutral-300 transition-smooth cursor-pointer">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-neutral-600" />
              <div>
                <h4 className="font-medium text-neutral-900">Email on Completion</h4>
                <p className="text-sm text-neutral-600">Get notified when notes are ready</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.notifications.emailOnCompletion}
              onChange={() => handleNotificationChange('emailOnCompletion')}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-white border-2 border-neutral-200 rounded-2xl hover:border-neutral-300 transition-smooth cursor-pointer">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-neutral-600" />
              <div>
                <h4 className="font-medium text-neutral-900">Email on Errors</h4>
                <p className="text-sm text-neutral-600">Alert me if something goes wrong</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.notifications.emailOnError}
              onChange={() => handleNotificationChange('emailOnError')}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-white border-2 border-neutral-200 rounded-2xl hover:border-neutral-300 transition-smooth cursor-pointer">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-neutral-600" />
              <div>
                <h4 className="font-medium text-neutral-900">Desktop Notifications</h4>
                <p className="text-sm text-neutral-600">Show browser notifications</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.notifications.desktopNotifications}
              onChange={() => handleNotificationChange('desktopNotifications')}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
          </label>
        </div>
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
          onClick={onNext}
          className="px-6 py-2 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-smooth"
        >
          Continue
        </button>
      </div>
    </div>
  )
}