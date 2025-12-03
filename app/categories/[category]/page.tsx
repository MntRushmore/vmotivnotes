'use client'

import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { getCategoryBySlug } from '@/data/curriculum'

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categorySlug = params.category as string

  const category = getCategoryBySlug(categorySlug)

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Category not found</h1>
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

  const handleSubjectClick = (subjectName: string) => {
    router.push(`/categories/${categorySlug}/${encodeURIComponent(subjectName)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to all categories
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">{category.emoji}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-800">{category.name}</h1>
              <p className="text-neutral-600 mt-1">{category.description}</p>
            </div>
          </div>

          <div className="bg-primary-50 border-l-4 border-primary-400 p-4 rounded-r-lg">
            <p className="text-sm text-primary-800 flex items-center gap-2">
              <BookOpen size={16} className="text-primary-600" />
              Select a subject to view all available topics
            </p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.subjects.map((subject, index) => (
            <button
              key={index}
              onClick={() => handleSubjectClick(subject.name)}
              className="group text-left p-6 bg-white rounded-2xl border-2 border-neutral-100 hover:border-gold-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 group-hover:bg-gold-100 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-lg font-bold text-primary-700 group-hover:text-gold-700">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-neutral-900 group-hover:text-primary-800 transition-colors mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {subject.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                <span className="text-sm font-medium text-neutral-500">
                  {subject.topics.length} topics
                </span>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-gold-600 font-semibold">View topics →</span>
                </div>
              </div>
            </button>
          ))}
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
