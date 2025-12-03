'use client'

import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { getCategoryBySlug } from '@/data/curriculum'

export default function SubjectPage() {
  const params = useParams()
  const router = useRouter()
  const categorySlug = params.category as string
  const subjectName = decodeURIComponent(params.subject as string)

  const category = getCategoryBySlug(categorySlug)
  const subject = category?.subjects.find(s => s.name === subjectName)

  if (!category || !subject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Subject not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-primary-600 hover:text-primary-700"
          >
            ← Back to home
          </button>
        </div>
      </div>
    )
  }

  const handleTopicClick = (topicName: string) => {
    router.push(`/generate?mode=topic&example=${encodeURIComponent(topicName)}&category=${categorySlug}&subject=${encodeURIComponent(subjectName)}&autoGenerate=true`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/categories/${categorySlug}`)}
            className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to {category.name}
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">{category.emoji}</span>
            </div>
            <div>
              <div className="text-sm text-primary-600 font-medium mb-1">{category.name}</div>
              <h1 className="text-4xl font-bold text-primary-800">{subject.name}</h1>
              <p className="text-neutral-600 mt-1">{subject.description}</p>
            </div>
          </div>

          <div className="bg-gold-50 border-l-4 border-gold-400 p-4 rounded-r-lg">
            <p className="text-sm text-primary-800 flex items-center gap-2">
              <Sparkles size={16} className="text-gold-600" />
              Click any topic below to instantly generate comprehensive tutor notes
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subject.topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicClick(topic.name)}
              className="text-left p-4 bg-white rounded-xl border-2 border-neutral-100 hover:border-gold-400 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 group-hover:bg-gold-100 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-sm font-bold text-primary-700 group-hover:text-gold-700">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-primary-800 transition-colors">
                    {topic.name}
                  </h3>
                  {topic.description && (
                    <p className="text-xs text-neutral-500 mt-1">{topic.description}</p>
                  )}
                </div>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-gold-600">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-white rounded-2xl px-6 py-3 shadow-soft border border-neutral-100">
            <span className="text-sm text-neutral-600">
              <span className="font-bold text-primary-800">{subject.topics.length}</span> topics available in {subject.name}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-800 py-4 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-300 text-xs">
            © {new Date().getFullYear()} <a href="https://vmotiv8.com/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-200 font-semibold">VMotiv8</a> • Created with ❤️ by the VMotiv8 Intern Team
          </p>
        </div>
      </footer>
    </div>
  )
}
