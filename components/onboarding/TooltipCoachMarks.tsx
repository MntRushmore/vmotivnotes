'use client'

import { useState, useEffect } from 'react'
import { TourOverlay } from './TourOverlay'
import { TourTooltip } from '@/types'

interface TooltipCoachMarksProps {
  isEnabled: boolean
  onComplete: () => void
}

const DEFAULT_TOOLTIPS: TourTooltip[] = [
  {
    id: 'upload',
    title: 'Upload Documents',
    content: 'Start by uploading PDFs to generate beautiful handwritten notes for your students.',
    target: '[data-tour="upload"]',
    position: 'bottom',
    skipable: true,
  },
  {
    id: 'library',
    title: 'Your Library',
    content: 'View and manage all your generated notes in one place.',
    target: '[data-tour="library"]',
    position: 'bottom',
    skipable: true,
  },
  {
    id: 'help',
    title: 'Get Help',
    content: 'Need assistance? Access help resources and documentation here.',
    target: '[data-tour="help"]',
    position: 'left',
    skipable: true,
  },
]

export function TooltipCoachMarks({ isEnabled, onComplete }: TooltipCoachMarksProps) {
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [hasSeenTour, setHasSeenTour] = useState(false)

  useEffect(() => {
    // Check if user has seen the tour before
    const seenTour = localStorage.getItem('vmotiv-tour-seen')
    setHasSeenTour(seenTour === 'true')

    // Auto-start tour if enabled and not seen before
    if (isEnabled && !seenTour) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsTourOpen(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isEnabled])

  const handleTourComplete = () => {
    setIsTourOpen(false)
    setHasSeenTour(true)
    localStorage.setItem('vmotiv-tour-seen', 'true')
    onComplete()
  }

  const handleTourSkip = () => {
    setIsTourOpen(false)
    setHasSeenTour(true)
    localStorage.setItem('vmotiv-tour-seen', 'true')
    onComplete()
  }

  const startTour = () => {
    setIsTourOpen(true)
  }

  // Don't render if tour is disabled or already completed
  if (!isEnabled || hasSeenTour) {
    return null
  }

  return (
    <>
      <TourOverlay
        tooltips={DEFAULT_TOOLTIPS}
        isOpen={isTourOpen}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />
      {/* Optional: Add a button to restart tour */}
      {hasSeenTour && (
        <button
          onClick={startTour}
          className="fixed bottom-4 right-4 z-30 px-4 py-2 bg-primary-600 text-white rounded-full shadow-soft-lg hover:bg-primary-700 transition-smooth text-sm"
        >
          Show Tour
        </button>
      )}
    </>
  )
}