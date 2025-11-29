'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, BookOpen, ExternalLink } from 'lucide-react'
import { faqs, troubleshootingGuides } from '@/data/faqs'
import FAQAccordion from '@/components/help/FAQAccordion'
import TroubleshootingCard from '@/components/help/TroubleshootingCard'
import ContactSupportForm from '@/components/help/ContactSupportForm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type CategoryFilter = 'all' | 'general' | 'upload' | 'library' | 'generation' | 'troubleshooting'

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'general', label: 'General' },
    { value: 'upload', label: 'Upload' },
    { value: 'library', label: 'Library' },
    { value: 'generation', label: 'Generation' },
    { value: 'troubleshooting', label: 'Troubleshooting' },
  ]

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gradient">Help Center</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Find answers to common questions, troubleshooting guides, and get support
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/onboarding')}
            className="gap-2"
          >
            <BookOpen size={18} />
            Getting Started
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/settings')}
            className="gap-2"
          >
            <ExternalLink size={18} />
            Settings
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const contactSection = document.getElementById('contact-support')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="gap-2"
          >
            <ExternalLink size={18} />
            Contact Support
          </Button>
        </div>

        {/* FAQ Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-neutral-950 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600">
              Browse through our most common questions and answers
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" 
              />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.value}
                  variant={categoryFilter === cat.value ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setCategoryFilter(cat.value)}
                >
                  {cat.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          {filteredFAQs.length > 0 ? (
            <FAQAccordion faqs={filteredFAQs} />
          ) : (
            <div className="text-center py-12 bg-neutral-50 rounded-2xl">
              <p className="text-neutral-600">
                No FAQs found matching your search. Try a different query or{' '}
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setCategoryFilter('all')
                  }}
                  className="text-primary-600 hover:underline font-medium"
                >
                  reset filters
                </button>
              </p>
            </div>
          )}
        </section>

        {/* Troubleshooting Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-neutral-950 mb-2">
              Troubleshooting Guides
            </h2>
            <p className="text-neutral-600">
              Step-by-step solutions for common issues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {troubleshootingGuides.map((guide) => (
              <TroubleshootingCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>

        {/* Contact Support Section */}
        <section id="contact-support" className="space-y-6 scroll-mt-8">
          <div>
            <h2 className="text-3xl font-bold text-neutral-950 mb-2">
              Still Stuck?
            </h2>
            <p className="text-neutral-600">
              Can&apos;t find what you&apos;re looking for? Get in touch with our support team
            </p>
          </div>

          <ContactSupportForm />
        </section>

        {/* Additional Resources */}
        <section className="bg-primary-50 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-neutral-950">
            Need More Help?
          </h3>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            If you&apos;re new to VMotiv, we recommend completing the onboarding wizard 
            to get familiar with all features. You can also explore the documentation 
            or watch tutorial videos.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              onClick={() => router.push('/onboarding')}
            >
              Start Onboarding
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
