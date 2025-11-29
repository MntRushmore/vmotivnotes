'use client'

import { Sparkles, BookOpen, Users } from 'lucide-react'

interface WelcomeHeroProps {
  onNext: () => void
}

export function WelcomeHero({ onNext }: WelcomeHeroProps) {
  return (
    <div className="text-center space-y-8">
      {/* Hero Icon */}
      <div className="mx-auto w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 text-primary-600" />
      </div>

      {/* Welcome Content */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900">
          Welcome to VMotiv Notes
        </h1>
        <p className="text-lg text-neutral-600 max-w-md mx-auto">
          Transform your teaching materials into beautiful, handwritten-style notes that students love.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-12 h-12 bg-success-100 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-success-600" />
          </div>
          <h3 className="font-medium text-neutral-900">Smart Summaries</h3>
          <p className="text-sm text-neutral-600">AI-powered summaries tailored to your students</p>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-medium text-neutral-900">Handwritten Style</h3>
          <p className="text-sm text-neutral-600">Natural, authentic-looking notes</p>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-12 h-12 bg-warning-100 rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6 text-warning-600" />
          </div>
          <h3 className="font-medium text-neutral-900">Student-Focused</h3>
          <p className="text-sm text-neutral-600">Designed for better learning outcomes</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-primary-600 text-white rounded-2xl font-medium shadow-soft hover:shadow-soft-md hover:bg-primary-700 transition-smooth"
        >
          Let&apos;s Get Started
        </button>
      </div>
    </div>
  )
}