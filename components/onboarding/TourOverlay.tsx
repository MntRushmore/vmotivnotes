'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowRight } from 'lucide-react'
import { TourTooltip } from '@/types'

interface TourOverlayProps {
  tooltips: TourTooltip[]
  onComplete: () => void
  onSkip: () => void
  isOpen: boolean
}

export function TourOverlay({ tooltips, onComplete, onSkip, isOpen }: TourOverlayProps) {
  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const targetRef = useRef<HTMLElement | null>(null)

  const currentTooltip = tooltips[currentTooltipIndex]
  const isLastTooltip = currentTooltipIndex === tooltips.length - 1

  useEffect(() => {
    if (!isOpen || !currentTooltip) return

    const updatePosition = () => {
      const target = document.querySelector(currentTooltip.target) as HTMLElement
      if (target) {
        targetRef.current = target
        const rect = target.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        let top = 0
        let left = 0

        switch (currentTooltip.position) {
          case 'top':
            top = rect.top + scrollTop - 120
            left = rect.left + scrollLeft + rect.width / 2 - 150
            break
          case 'bottom':
            top = rect.bottom + scrollTop + 20
            left = rect.left + scrollLeft + rect.width / 2 - 150
            break
          case 'left':
            top = rect.top + scrollTop + rect.height / 2 - 50
            left = rect.left + scrollLeft - 320
            break
          case 'right':
            top = rect.top + scrollTop + rect.height / 2 - 50
            left = rect.right + scrollLeft + 20
            break
        }

        // Keep tooltip within viewport
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        if (left < 20) left = 20
        if (left + 300 > viewportWidth - 20) left = viewportWidth - 320
        if (top < 20) top = 20
        if (top + 100 > viewportHeight - 20) top = viewportHeight - 120

        setPosition({ top, left })
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  }, [currentTooltip, isOpen])

  const handleNext = () => {
    if (isLastTooltip) {
      onComplete()
    } else {
      setCurrentTooltipIndex(prev => prev + 1)
    }
  }

  const handleSkip = () => {
    onSkip()
  }

  const handlePrevious = () => {
    if (currentTooltipIndex > 0) {
      setCurrentTooltipIndex(prev => prev - 1)
    }
  }

  if (!isOpen || !currentTooltip) return null

  const tooltipContent = (
    <div
      className="fixed z-50 bg-white rounded-2xl shadow-soft-xl border border-neutral-200 p-6 max-w-sm"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      {/* Tooltip Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-neutral-900 pr-2">
          {currentTooltip.title}
        </h3>
        <button
          onClick={handleSkip}
          className="p-1 hover:bg-neutral-100 rounded-lg transition-smooth"
        >
          <X className="w-4 h-4 text-neutral-500" />
        </button>
      </div>

      {/* Tooltip Content */}
      <p className="text-sm text-neutral-600 mb-4">
        {currentTooltip.content}
      </p>

      {/* Tooltip Actions */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-neutral-500">
          {currentTooltipIndex + 1} of {tooltips.length}
        </div>
        <div className="flex items-center gap-2">
          {currentTooltipIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="px-3 py-1 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-smooth"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-smooth"
          >
            {isLastTooltip ? 'Done' : 'Next'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )

  // Highlight overlay
  const highlightOverlay = targetRef.current ? (
    <div
      className="fixed inset-0 z-40 pointer-events-none"
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        className="absolute border-2 border-primary-500 rounded-lg shadow-soft-xl"
        style={{
          top: `${targetRef.current.getBoundingClientRect().top}px`,
          left: `${targetRef.current.getBoundingClientRect().left}px`,
          width: `${targetRef.current.getBoundingClientRect().width}px`,
          height: `${targetRef.current.getBoundingClientRect().height}px`,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)',
        }}
      />
    </div>
  ) : null

  return createPortal(
    <>
      {highlightOverlay}
      {tooltipContent}
    </>,
    document.body
  )
}