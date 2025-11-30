'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FileUp, PenTool, Sparkles, Download, Copy, Eye, Edit3, Plus, Trash2, Loader2, CreditCard, ClipboardList } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { NoteSessionManager } from '@/lib/note-session'
import type { TutorNote, GradeLevel, RefineInstruction } from '@/types'

function GeneratePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'pdf'
  const exampleTopic = searchParams.get('example')

  const [session, setSession] = useState(() => NoteSessionManager.getSession())
  const [activeNote, setActiveNote] = useState<TutorNote | null>(null)
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')

  // Generation form state
  const [inputMode, setInputMode] = useState<'pdf' | 'topic'>(mode as 'pdf' | 'topic')
  const [topic, setTopic] = useState(exampleTopic || '')
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('middle')
  const [subject, setSubject] = useState('')
  const [length, setLength] = useState<'concise' | 'standard' | 'detailed'>('standard')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // UI state
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRefining, setIsRefining] = useState(false)
  const [isRenderingHandwriting, setIsRenderingHandwriting] = useState(false)
  const [handwritingImageUrl, setHandwritingImageUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showRefinement, setShowRefinement] = useState(false)
  const [customInstruction, setCustomInstruction] = useState('')
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [flashcards, setFlashcards] = useState<Array<{front: string, back: string, hint?: string}>>([])
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quiz, setQuiz] = useState<Array<any>>([])
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false)

  // Load active note on mount
  useEffect(() => {
    const active = NoteSessionManager.getActiveNote()
    if (active) {
      setActiveNote(active)
      renderHandwriting(active.rawMarkdown)
    }
  }, [])

  // Render handwriting preview
  const renderHandwriting = async (markdown: string) => {
    setIsRenderingHandwriting(true)
    try {
      const response = await fetch('/api/tutor-notes/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown })
      })

      if (!response.ok) throw new Error('Failed to render handwriting')

      const data = await response.json()
      setHandwritingImageUrl(data.imageUrl)
    } catch (error) {
      console.error('Handwriting render error:', error)
    } finally {
      setIsRenderingHandwriting(false)
    }
  }

  // Generate new note
  const handleGenerate = async () => {
    setErrorMessage(null)
    setIsGenerating(true)

    try {
      let response

      if (inputMode === 'pdf') {
        if (!selectedFile) {
          setErrorMessage('Please select a PDF file')
          return
        }

        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('gradeLevel', gradeLevel)
        formData.append('subject', subject)
        formData.append('length', length)

        response = await fetch('/api/tutor-notes/generate', {
          method: 'POST',
          body: formData
        })
      } else {
        if (!topic.trim()) {
          setErrorMessage('Please enter a topic')
          return
        }

        response = await fetch('/api/tutor-notes/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: topic.trim(),
            gradeLevel,
            subject,
            length
          })
        })
      }

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Generation failed')
      }

      const newNote: TutorNote = await response.json()

      // Add to session
      const updatedSession = NoteSessionManager.addNote(newNote)
      setSession(updatedSession)
      setActiveNote(newNote)

      // Render handwriting
      await renderHandwriting(newNote.rawMarkdown)

      // Reset form
      setTopic('')
      setSelectedFile(null)
    } catch (error) {
      console.error('Generation error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate note')
    } finally {
      setIsGenerating(false)
    }
  }

  // Refine current note
  const handleRefine = async (instruction: RefineInstruction) => {
    if (!activeNote) return

    setIsRefining(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/tutor-notes/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteId: activeNote.id,
          currentMarkdown: activeNote.rawMarkdown,
          instruction,
          customInstruction: instruction === 'custom' ? customInstruction : undefined,
          gradeLevel
        })
      })

      if (!response.ok) throw new Error('Refinement failed')

      const updates = await response.json()

      // Update note in session
      const updatedSession = NoteSessionManager.updateNote(activeNote.id, updates)
      setSession(updatedSession)

      const updatedNote = updatedSession.notes.find(n => n.id === activeNote.id)
      if (updatedNote) {
        setActiveNote(updatedNote)
        await renderHandwriting(updatedNote.rawMarkdown)
      }

      setShowRefinement(false)
      setCustomInstruction('')
    } catch (error) {
      console.error('Refinement error:', error)
      setErrorMessage('Failed to refine note')
    } finally {
      setIsRefining(false)
    }
  }

  // Manual markdown edit
  const handleMarkdownEdit = (newMarkdown: string) => {
    if (!activeNote) return

    const updatedSession = NoteSessionManager.updateNote(activeNote.id, { rawMarkdown: newMarkdown })
    setSession(updatedSession)

    const updatedNote = updatedSession.notes.find(n => n.id === activeNote.id)
    if (updatedNote) {
      setActiveNote(updatedNote)
    }
  }

  // Delete note
  const handleDeleteNote = (noteId: string) => {
    const updatedSession = NoteSessionManager.deleteNote(noteId)
    setSession(updatedSession)

    if (activeNote?.id === noteId) {
      const newActive = updatedSession.notes[0] || null
      setActiveNote(newActive)
      if (newActive) renderHandwriting(newActive.rawMarkdown)
      else setHandwritingImageUrl(null)
    }
  }

  // Switch active note
  const handleSwitchNote = (note: TutorNote) => {
    NoteSessionManager.setActiveNote(note.id)
    setActiveNote(note)
    renderHandwriting(note.rawMarkdown)
  }

  // Download as text
  const handleDownloadText = () => {
    if (!activeNote) return

    const blob = new Blob([activeNote.rawMarkdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeNote.title.replace(/[^a-z0-9]/gi, '_')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Copy to clipboard
  const handleCopyText = async () => {
    if (!activeNote) return

    try {
      await navigator.clipboard.writeText(activeNote.rawMarkdown)
      alert('Copied to clipboard!')
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  // Generate flashcards
  const handleGenerateFlashcards = async () => {
    if (!activeNote) return

    setIsGeneratingFlashcards(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/tutor-notes/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteMarkdown: activeNote.rawMarkdown, count: 8 })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || 'Failed to generate flashcards')
      }

      const data = await response.json()
      setFlashcards(data.flashcards)
      setShowFlashcards(true)
    } catch (error) {
      console.error('Flashcard generation error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate flashcards')
    } finally {
      setIsGeneratingFlashcards(false)
    }
  }

  // Generate quiz
  const handleGenerateQuiz = async () => {
    if (!activeNote) return

    setIsGeneratingQuiz(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/tutor-notes/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteMarkdown: activeNote.rawMarkdown, count: 5, difficulty: 'medium' })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || 'Failed to generate quiz')
      }

      const data = await response.json()
      setQuiz(data.questions)
      setShowQuiz(true)
    } catch (error) {
      console.error('Quiz generation error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate quiz')
    } finally {
      setIsGeneratingQuiz(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar - Note List */}
      <div className="w-64 bg-white border-r border-neutral-200 p-4 flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">Your Notes</h2>
          <button
            onClick={() => {
              setActiveNote(null)
              setHandwritingImageUrl(null)
            }}
            className="w-full flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            New Note
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {session.notes.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-8">No notes yet</p>
          ) : (
            session.notes.map(note => (
              <div
                key={note.id}
                className={`
                  p-3 rounded-lg cursor-pointer transition-all group
                  ${activeNote?.id === note.id ? 'bg-primary-100 border border-primary-300' : 'bg-neutral-50 hover:bg-neutral-100'}
                `}
                onClick={() => handleSwitchNote(note)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium text-neutral-900 line-clamp-2">{note.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteNote(note.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={14} className="text-red-600" />
                  </button>
                </div>
                <p className="text-xs text-neutral-500">
                  {note.gradeLevel} • {note.subject || 'General'}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              ← Back to Home
            </button>

            {activeNote && (
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex bg-neutral-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('edit')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'edit' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('preview')
                      if (activeNote) renderHandwriting(activeNote.rawMarkdown)
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'preview' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                </div>

                {/* Actions */}
                <button
                  onClick={handleDownloadText}
                  className="flex items-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors"
                >
                  <Copy size={16} />
                  Copy
                </button>
                <button
                  onClick={handleGenerateFlashcards}
                  disabled={isGeneratingFlashcards}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isGeneratingFlashcards ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CreditCard size={16} />
                  )}
                  Flashcards
                </button>
                <button
                  onClick={handleGenerateQuiz}
                  disabled={isGeneratingQuiz}
                  className="flex items-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isGeneratingQuiz ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ClipboardList size={16} />
                  )}
                  Quiz
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!activeNote ? (
            /* Generation Form */
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-neutral-900 mb-8">Generate New Note</h1>

              {/* Input Mode Toggle */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setInputMode('pdf')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    inputMode === 'pdf' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FileUp size={20} />
                  Upload PDF
                </button>
                <button
                  onClick={() => setInputMode('topic')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    inputMode === 'topic' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <PenTool size={20} />
                  Enter Topic
                </button>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl p-6 shadow-soft space-y-4">
                {inputMode === 'pdf' ? (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Upload File (PDF, JPG, PNG)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {selectedFile && (
                      <p className="text-sm text-neutral-600 mt-2">Selected: {selectedFile.name}</p>
                    )}
                    <p className="text-xs text-neutral-500 mt-1">
                      Supported formats: PDF documents, JPG/PNG images
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Topic
                    </label>
                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Pythagorean Theorem, Photosynthesis, American Revolution..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      rows={3}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Grade Level
                    </label>
                    <select
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="elementary">Elementary</option>
                      <option value="middle">Middle School</option>
                      <option value="high">High School</option>
                      <option value="college">College</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Detail Level
                    </label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value as 'concise' | 'standard' | 'detailed')}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="concise">Concise (5-7 points)</option>
                      <option value="standard">Standard (8-10 points)</option>
                      <option value="detailed">Detailed (10-12 points)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Math, Science, History..."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Note
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Note Display */
            <div className="max-w-4xl mx-auto">
              {viewMode === 'edit' ? (
                <div>
                  {/* Refinement Controls */}
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-neutral-900">{activeNote.title}</h2>
                    <button
                      onClick={() => setShowRefinement(!showRefinement)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Refine Note
                    </button>
                  </div>

                  {showRefinement && (
                    <div className="mb-4 p-4 bg-white rounded-lg shadow-soft">
                      <h3 className="font-medium text-neutral-900 mb-3">Refinement Options</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                        <button
                          onClick={() => handleRefine('shorter')}
                          disabled={isRefining}
                          className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm transition-colors disabled:opacity-50"
                        >
                          Make Shorter
                        </button>
                        <button
                          onClick={() => handleRefine('longer')}
                          disabled={isRefining}
                          className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm transition-colors disabled:opacity-50"
                        >
                          Add More Detail
                        </button>
                        <button
                          onClick={() => handleRefine('simpler')}
                          disabled={isRefining}
                          className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm transition-colors disabled:opacity-50"
                        >
                          Simplify Language
                        </button>
                        <button
                          onClick={() => handleRefine('more-examples')}
                          disabled={isRefining}
                          className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm transition-colors disabled:opacity-50"
                        >
                          More Examples
                        </button>
                        <button
                          onClick={() => handleRefine('more-questions')}
                          disabled={isRefining}
                          className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm transition-colors disabled:opacity-50"
                        >
                          More Questions
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customInstruction}
                          onChange={(e) => setCustomInstruction(e.target.value)}
                          placeholder="Or type custom instruction..."
                          className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                        <button
                          onClick={() => handleRefine('custom')}
                          disabled={isRefining || !customInstruction.trim()}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 text-sm font-medium"
                        >
                          Apply
                        </button>
                      </div>
                      {isRefining && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
                          <Loader2 size={16} className="animate-spin" />
                          Refining note...
                        </div>
                      )}
                    </div>
                  )}

                  {/* Markdown Editor - Split View */}
                  <div className="grid grid-cols-2 gap-4 h-[700px]">
                    {/* Raw Markdown */}
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-neutral-600 mb-2">Markdown Source</h3>
                      <textarea
                        value={activeNote.rawMarkdown}
                        onChange={(e) => handleMarkdownEdit(e.target.value)}
                        className="flex-1 p-4 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm resize-none"
                      />
                    </div>

                    {/* Styled Preview */}
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium text-neutral-600 mb-2">Formatted Preview</h3>
                      <div className="flex-1 p-6 bg-white border border-neutral-200 rounded-lg overflow-y-auto prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {activeNote.rawMarkdown}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Handwriting Preview */
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Handwritten Preview</h2>
                  {isRenderingHandwriting ? (
                    <div className="flex items-center justify-center h-[600px] bg-white rounded-lg">
                      <div className="text-center">
                        <Loader2 size={32} className="animate-spin text-primary-600 mx-auto mb-2" />
                        <p className="text-neutral-600">Rendering handwriting...</p>
                      </div>
                    </div>
                  ) : handwritingImageUrl ? (
                    <div className="bg-white rounded-lg p-4 shadow-soft">
                      <img src={handwritingImageUrl} alt="Handwritten note" className="w-full" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[600px] bg-white rounded-lg">
                      <p className="text-neutral-500">No preview available</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Flashcards Modal */}
      {showFlashcards && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Flashcards ({flashcards.length})</h2>
              <button
                onClick={() => setShowFlashcards(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {flashcards.map((card, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-blue-600 uppercase">Front</span>
                    <p className="text-lg font-medium text-neutral-900 mt-1">{card.front}</p>
                  </div>
                  <div className="border-t border-neutral-200 pt-3">
                    <span className="text-xs font-semibold text-green-600 uppercase">Back</span>
                    <p className="text-neutral-700 mt-1">{card.back}</p>
                  </div>
                  {card.hint && (
                    <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-2">
                      <span className="text-xs font-semibold text-yellow-700">💡 Hint:</span>
                      <p className="text-sm text-yellow-800 mt-1">{card.hint}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  const text = flashcards.map((card, i) =>
                    `Card ${i + 1}\nQ: ${card.front}\nA: ${card.back}${card.hint ? `\nHint: ${card.hint}` : ''}\n`
                  ).join('\n')
                  navigator.clipboard.writeText(text)
                  alert('Flashcards copied to clipboard!')
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Copy All
              </button>
              <button
                onClick={() => setShowFlashcards(false)}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Quiz ({quiz.length} Questions)</h2>
              <button
                onClick={() => setShowQuiz(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {quiz.map((q, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full text-neutral-600 font-medium">
                          {q.type.toUpperCase()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-neutral-900">{q.question}</p>
                    </div>
                  </div>

                  {q.options && q.options.length > 0 && (
                    <div className="ml-11 space-y-2 mb-3">
                      {q.options.map((opt: string, optIndex: number) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg border ${
                            q.correctAnswer === optIndex
                              ? 'bg-green-50 border-green-300'
                              : 'bg-neutral-50 border-neutral-200'
                          }`}
                        >
                          <span className="font-medium text-neutral-700">
                            {String.fromCharCode(65 + optIndex)}.
                          </span> {opt}
                          {q.correctAnswer === optIndex && (
                            <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'short' && (
                    <div className="ml-11 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3">
                      <span className="text-sm font-semibold text-blue-700">Expected Answer:</span>
                      <p className="text-sm text-blue-900 mt-1">{q.correctAnswer}</p>
                    </div>
                  )}

                  <div className="ml-11 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <span className="text-sm font-semibold text-neutral-700">Explanation:</span>
                    <p className="text-sm text-neutral-600 mt-1">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  const text = quiz.map((q, i) =>
                    `Question ${i + 1} [${q.type.toUpperCase()}] [${q.difficulty}]\n${q.question}\n${
                      q.options ? q.options.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}. ${opt}`).join('\n') + '\n' : ''
                    }Answer: ${q.type === 'short' ? q.correctAnswer : q.options[q.correctAnswer]}\nExplanation: ${q.explanation}\n`
                  ).join('\n')
                  navigator.clipboard.writeText(text)
                  alert('Quiz copied to clipboard!')
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Copy All
              </button>
              <button
                onClick={() => setShowQuiz(false)}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary-600" />
      </div>
    }>
      <GeneratePageContent />
    </Suspense>
  )
}
