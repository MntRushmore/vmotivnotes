'use client'

import { useRouter } from 'next/navigation'
import { FileUp, PenTool, Sparkles, BookOpen, CheckCircle, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const router = useRouter()

  const exampleTopics = [
    'Pythagorean Theorem',
    'Photosynthesis',
    'American Revolution',
    'Chemical Bonds',
    "Shakespeare's Hamlet"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full">
            <span className="text-primary-700 font-medium text-sm">No signup required</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            VMotiv Notes
          </h1>

          <p className="text-xl md:text-2xl text-neutral-600 mb-3">
            Transform PDFs or topics into tutor-ready teaching notes
          </p>

          <p className="text-lg text-neutral-500">
            Instant generation • Beautiful handwritten style • Practice questions included
          </p>
        </div>

        {/* Two Main Option Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Upload PDF Card */}
          <button
            onClick={() => router.push('/generate?mode=pdf')}
            className="group relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-soft-xl transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className="absolute top-6 right-6 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <FileUp className="text-primary-600" size={24} />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                Upload File
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Upload any PDF document or image (JPG/PNG) and instantly generate structured teaching notes with key concepts, examples, and practice questions.
              </p>
            </div>

            <div className="flex items-center gap-2 text-primary-600 font-medium">
              <span>Choose file to upload</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>

          {/* Enter Topic Card */}
          <button
            onClick={() => router.push('/generate?mode=topic')}
            className="group relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-soft-xl transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className="absolute top-6 right-6 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <PenTool className="text-purple-600" size={24} />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                Enter Topic
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Simply type any topic and AI will research and create comprehensive tutor notes from scratch with all the teaching essentials.
              </p>
            </div>

            <div className="flex items-center gap-2 text-purple-600 font-medium">
              <span>Start typing a topic</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        </div>

        {/* Example Topics */}
        <div className="text-center mb-16">
          <p className="text-sm text-neutral-500 mb-4">Try an example topic:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {exampleTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => router.push(`/generate?mode=topic&example=${encodeURIComponent(topic)}`)}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full hover:border-primary-300 hover:bg-primary-50 transition-all text-sm text-neutral-700 hover:text-primary-700"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Structured Content</h3>
            <p className="text-sm text-neutral-600">
              Clear title, intro, 5-12 concise bullet points with examples and definitions organized for teaching.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-blue-600" size={20} />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Practice Questions</h3>
            <p className="text-sm text-neutral-600">
              3-5 Quick Check questions with answers, building from simple recall to critical thinking.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="text-amber-600" size={20} />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Two Formats</h3>
            <p className="text-sm text-neutral-600">
              View and edit as plain text, or see it rendered in beautiful realistic handwritten style.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-xl shadow-soft">
                1
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Choose Input</h4>
              <p className="text-sm text-neutral-600">Upload PDF or type a topic</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-xl shadow-soft">
                2
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">AI Generates</h4>
              <p className="text-sm text-neutral-600">Structured notes created instantly</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-xl shadow-soft">
                3
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Edit & Refine</h4>
              <p className="text-sm text-neutral-600">Make it shorter, longer, or simpler</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-xl shadow-soft">
                4
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Download</h4>
              <p className="text-sm text-neutral-600">Export as PDF or copy text</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-neutral-500">
            <Clock className="inline-block mr-1" size={14} />
            Your notes are stored in your browser for 24 hours. No account needed.
          </p>
        </div>
      </div>
    </div>
  )
}
