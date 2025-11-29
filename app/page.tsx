'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Sparkles } from 'lucide-react'
import { TooltipCoachMarks } from '@/components/onboarding/TooltipCoachMarks'
import { useOnboarding } from '@/hooks/useOnboarding'

export const dynamic = 'force-dynamic'

export default function Home() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { isComplete } = useOnboarding()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className={`
        max-w-3xl w-full bg-white rounded-3xl shadow-soft-xl p-8 md:p-12
        animate-fade-in transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* Greeting */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-4">
            {getCurrentTimeGreeting()}, User.
          </h1>
          <p className="text-xl text-neutral-600">
            What&apos;s on your mind?
          </p>
        </div>

        {/* Main Input */}
        <div className="relative">
          <div className="relative group">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Upload a document to generate handwritten notes, or ask AI to explain something."
              className={`
                w-full px-6 py-4 pr-12 text-lg
                bg-neutral-50 border-2 border-neutral-200 rounded-2xl
                placeholder-neutral-400 text-neutral-900
                resize-none transition-smooth
                focus:outline-none focus:border-primary-300 focus:bg-white
                hover:border-neutral-300
                min-h-[120px]
              `}
              rows={4}
            />
            
            {/* Submit button */}
            <button
              className={`
                absolute right-4 bottom-4 p-2
                bg-primary-600 text-white rounded-xl
                shadow-soft hover:shadow-soft-md hover:bg-primary-700
                transition-smooth
                ${inputValue.trim() ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}
              `}
              disabled={!inputValue.trim()}
            >
              <Sparkles size={20} />
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button 
              onClick={() => router.push('/upload')}
              data-tour="upload"
              className="flex items-center gap-2 px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-xl transition-smooth"
            >
              <Upload size={18} />
              <span className="text-sm font-medium">Generate Handwritten Notes</span>
            </button>
            <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-smooth">
              <span className="text-sm text-neutral-700">Explain a concept</span>
            </button>
            <button 
              onClick={() => router.push('/library')}
              data-tour="library"
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-smooth"
            >
              <span className="text-sm text-neutral-700">View Library</span>
            </button>
            <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-smooth">
              <span className="text-sm text-neutral-700">Summarize text</span>
            </button>
            <button 
              onClick={() => router.push('/generation-status')}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-smooth"
            >
              <span className="text-sm text-neutral-700">Check Status</span>
            </button>
          </div>
        </div>

        {/* Recent conversations (placeholder) */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <h2 className="text-sm font-medium text-neutral-500 mb-4">Recent conversations</h2>
          <div className="space-y-3">
            <div className="p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-smooth cursor-pointer">
              <p className="text-sm text-neutral-700">Understanding quantum computing basics</p>
              <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-smooth cursor-pointer">
              <p className="text-sm text-neutral-700">Summary of climate change report</p>
              <p className="text-xs text-neutral-500 mt-1">Yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Overlay */}
      <TooltipCoachMarks
        isEnabled={!isComplete}
        onComplete={() => {
          // Tour completed - can add additional logic here if needed
        }}
      />
    </div>
  )
}
