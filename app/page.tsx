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
    "Shakespeare's Hamlet",
    'Newton\'s Laws of Motion',
    'Cellular Respiration',
    'World War II',
    'Quadratic Formula',
    'DNA Replication',
    'The Great Depression',
    'Verb Conjugations in Spanish',
    'Trigonometric Identities',
    'Electric Circuits',
    'Civil Rights Movement',
    'Object-Oriented Programming',
    'Supply and Demand',
    'Rhetorical Analysis'
  ]

  const categories = [
    {
      name: 'Mathematics',
      emoji: '📐',
      description: 'Pure and applied mathematics from fundamentals to advanced topics',
      slug: 'mathematics',
      subjectCount: 12
    },
    {
      name: 'Science',
      emoji: '🔬',
      description: 'Natural sciences exploring the physical and living world',
      slug: 'science',
      subjectCount: 12
    },
    {
      name: 'Computer Science',
      emoji: '💻',
      description: 'Programming, algorithms, and computational thinking',
      slug: 'computer-science',
      subjectCount: 8
    },
    {
      name: 'English & Literature',
      emoji: '📚',
      description: 'Reading, writing, and literary analysis',
      slug: 'english',
      subjectCount: 5
    },
    {
      name: 'Social Studies',
      emoji: '🌍',
      description: 'History, geography, economics, and government',
      slug: 'social-studies',
      subjectCount: 8
    },
    {
      name: 'World Languages',
      emoji: '🗣️',
      description: 'Foreign language instruction and cultural studies',
      slug: 'languages',
      subjectCount: 7
    },
    {
      name: 'Test Preparation',
      emoji: '📝',
      description: 'Standardized test prep and strategies',
      slug: 'test-prep',
      subjectCount: 7
    },
    {
      name: 'Arts & Music',
      emoji: '🎨',
      description: 'Visual arts, music theory, and performance',
      slug: 'arts',
      subjectCount: 3
    },
    {
      name: 'Business & Career',
      emoji: '💼',
      description: 'Business fundamentals and professional skills',
      slug: 'business',
      subjectCount: 3
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gold-100 rounded-full border border-gold-300">
            <span className="text-primary-800 font-medium text-sm">No signup required • 100% Free</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
            VMotiv8 Notes
          </h1>

          <p className="text-xl md:text-2xl text-neutral-700 mb-3">
            Transform PDFs or topics into tutor-ready teaching notes
          </p>

          <p className="text-lg text-neutral-600">
            Instant generation • Beautiful handwritten style • Practice questions included
          </p>
        </div>

        {/* Three Main Option Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Upload PDF Card */}
          <button
            onClick={() => router.push('/generate?mode=pdf')}
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl border-2 border-gold-200 hover:border-gold-400 transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className="absolute top-6 right-6 w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center group-hover:bg-gold-200 transition-colors">
              <FileUp className="text-primary-800" size={24} />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary-800 mb-3">
                Upload File
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Upload any PDF document or image (JPG/PNG) and instantly generate structured teaching notes with key concepts, examples, and practice questions.
              </p>
            </div>

            <div className="flex items-center gap-2 text-primary-700 font-medium">
              <span>Choose file to upload</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>

          {/* Enter Topic Card */}
          <button
            onClick={() => router.push('/generate?mode=topic')}
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl border-2 border-primary-200 hover:border-primary-400 transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className="absolute top-6 right-6 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-800 group-hover:text-white transition-colors">
              <PenTool className="text-primary-800 group-hover:text-white" size={24} />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                Enter Topic
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Simply type any topic and AI will research and create comprehensive tutor notes from scratch.
              </p>
            </div>

            <div className="flex items-center gap-2 text-purple-600 font-medium">
              <span>Start typing a topic</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>

          {/* Whiteboard Card */}
          <button
            onClick={() => router.push('/whiteboard')}
            className="group relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-lg hover:shadow-2xl border-2 border-transparent transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-sm">
              <span className="text-3xl">🎨</span>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">
                Shared Whiteboard
              </h2>
              <p className="text-white/90 leading-relaxed">
                Collaborate in real-time with your tutor or students on a shared digital whiteboard.
              </p>
            </div>

            <div className="flex items-center gap-2 text-white font-medium">
              <span>Start collaborating</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        </div>

        {/* Browse by Category Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary-800 mb-3">Browse by Category</h2>
            <p className="text-neutral-600">Explore hundreds of subjects organized by academic field</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => router.push(`/categories/${category.slug}`)}
                className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-neutral-100 hover:border-gold-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-800 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-2xl">{category.emoji}</span>
                  </div>
                  <h3 className="font-bold text-xl text-primary-800">{category.name}</h3>
                </div>

                <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500">
                    {category.subjectCount} subjects
                  </span>
                  <span className="text-gold-600 group-hover:translate-x-1 transition-transform font-semibold">
                    Explore →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Example Topics */}
        <div className="text-center mb-16">
          <p className="text-sm text-neutral-500 mb-4">Or try a quick example:</p>
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

      {/* Copyright Footer */}
      <footer className="bg-primary-800 py-6 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gold-300 text-sm">
            © {new Date().getFullYear()} <a href="https://vmotiv8.com/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-200 font-semibold">VMotiv8</a>
          </p>
          <p className="text-gold-400 text-xs mt-1">
            Created with ❤️ by the VMotiv8 Intern Team
          </p>
        </div>
      </footer>
    </div>
  )
}
