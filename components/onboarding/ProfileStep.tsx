'use client'

import { User, GraduationCap } from 'lucide-react'
import { OnboardingData } from '@/types'

interface ProfileStepProps {
  data: OnboardingData
  onChange: (data: OnboardingData) => void
  onNext: () => void
  onPrev: () => void
}

export function ProfileStep({ data, onChange, onNext, onPrev }: ProfileStepProps) {
  const handleChange = (field: keyof OnboardingData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const isValid = data.name.trim() !== '' && data.school.trim() !== ''

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Tell Us About Yourself
        </h2>
        <p className="text-neutral-600">
          Help us personalize your VMotiv Notes experience.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6 max-w-md mx-auto">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium text-neutral-700">
            <User className="w-4 h-4" />
            <span>Your Name</span>
          </label>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-2xl focus:outline-none focus:border-primary-300 transition-smooth placeholder-neutral-400"
          />
        </div>

        {/* School Field */}
        <div className="space-y-2">
          <label htmlFor="school" className="flex items-center space-x-2 text-sm font-medium text-neutral-700">
            <GraduationCap className="w-4 h-4" />
            <span>School Name</span>
          </label>
          <input
            id="school"
            type="text"
            value={data.school}
            onChange={(e) => handleChange('school', e.target.value)}
            placeholder="Enter your school name"
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-2xl focus:outline-none focus:border-primary-300 transition-smooth placeholder-neutral-400"
          />
        </div>

        {/* Info Card */}
        <div className="p-4 bg-neutral-50 rounded-2xl">
          <p className="text-sm text-neutral-600">
            <span className="font-medium">Why we ask:</span> Your name helps personalize the experience, and knowing your school helps us tailor content to your educational context.
          </p>
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
          disabled={!isValid}
          className={`px-6 py-2 rounded-2xl transition-smooth ${
            isValid
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}