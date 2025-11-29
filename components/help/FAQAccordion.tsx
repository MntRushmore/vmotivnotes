'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQEntry } from '@/types'

interface FAQAccordionProps {
  faqs: FAQEntry[]
  defaultOpenIds?: string[]
}

export default function FAQAccordion({ faqs, defaultOpenIds = [] }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds))

  const toggleFAQ = (id: string) => {
    const newOpenIds = new Set(openIds)
    if (newOpenIds.has(id)) {
      newOpenIds.delete(id)
    } else {
      newOpenIds.add(id)
    }
    setOpenIds(newOpenIds)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openIds.has(faq.id)
        return (
          <div
            key={faq.id}
            className="bg-white border border-neutral-200 rounded-2xl shadow-soft overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-neutral-50 transition-smooth"
            >
              <span className="text-lg font-semibold text-neutral-900">
                {faq.question}
              </span>
              <ChevronDown
                size={20}
                className={`flex-shrink-0 text-neutral-500 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-5 pt-2">
                <p className="text-neutral-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
