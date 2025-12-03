'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Users, Copy, Check } from 'lucide-react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

/**
 * Shared Whiteboard Page
 *
 * This component provides a collaborative whiteboard for tutors and students.
 * Features:
 * - Real-time collaboration via tldraw
 * - Shareable room codes
 * - Easy join/create room interface
 */

export default function WhiteboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomIdParam = searchParams.get('room')

  const [roomId, setRoomId] = useState(roomIdParam || '')
  const [isInRoom, setIsInRoom] = useState(!!roomIdParam)
  const [copied, setCopied] = useState(false)

  // Generate random room ID
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const createRoom = () => {
    const newRoomId = generateRoomId()
    setRoomId(newRoomId)
    setIsInRoom(true)
    router.push(`/whiteboard?room=${newRoomId}`)
  }

  const joinRoom = () => {
    if (roomId.trim()) {
      setIsInRoom(true)
      router.push(`/whiteboard?room=${roomId.trim().toUpperCase()}`)
    }
  }

  const copyRoomLink = () => {
    const link = `${window.location.origin}/whiteboard?room=${roomId}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const leaveRoom = () => {
    setIsInRoom(false)
    setRoomId('')
    router.push('/whiteboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50">
      {!isInRoom ? (
        /* Room Selection Screen */
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="mb-8">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
            <h1 className="text-4xl font-bold text-primary-800 mb-3">Shared Whiteboard</h1>
            <p className="text-neutral-600">
              Collaborate in real-time with your tutor or students on a shared whiteboard
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
            {/* Create New Room */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                Create New Room
              </h2>
              <p className="text-sm text-neutral-600 mb-4">
                Start a new whiteboard session and invite others
              </p>
              <button
                onClick={createRoom}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Users size={20} />
                Create Room
              </button>
            </div>

            {/* Join Existing Room */}
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Join Existing Room
              </h2>
              <p className="text-sm text-neutral-600 mb-4">
                Enter a room code to join an active session
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  placeholder="Enter room code (e.g., ABC123)"
                  className="flex-1 px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase"
                  maxLength={6}
                />
                <button
                  onClick={joinRoom}
                  disabled={!roomId.trim()}
                  className="px-6 py-3 bg-gold-500 text-white rounded-xl hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-neutral-200">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Real-time Collaboration</h3>
              <p className="text-sm text-neutral-600">See changes instantly as others draw</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-neutral-200">
              <div className="text-3xl mb-2">✏️</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Full Drawing Tools</h3>
              <p className="text-sm text-neutral-600">Pen, shapes, text, and more</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-neutral-200">
              <div className="text-3xl mb-2">💾</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Auto-Save</h3>
              <p className="text-sm text-neutral-600">Never lose your work</p>
            </div>
          </div>
        </div>
      ) : (
        /* Whiteboard Screen */
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={leaveRoom}
                className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 font-medium transition-colors"
              >
                <ArrowLeft size={20} />
                Leave Room
              </button>
              <div className="h-6 w-px bg-neutral-300" />
              <div>
                <div className="text-xs text-neutral-500 font-medium">Room Code</div>
                <div className="text-lg font-bold text-primary-800 font-mono">{roomId}</div>
              </div>
            </div>
            <button
              onClick={copyRoomLink}
              className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-lg hover:bg-primary-200 transition-colors font-medium"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Share Link
                </>
              )}
            </button>
          </div>

          {/* Warning Banner */}
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-lg">⚠️</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900">
                  Local Mode: Drawings are saved to your browser only
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Real-time collaboration is not enabled yet. Each user sees their own drawings. See MULTIPLAYER_SETUP.md to enable sync.
                </p>
              </div>
            </div>
          </div>

          {/* Whiteboard Area */}
          <div className="flex-1 relative bg-white">
            <Tldraw
              autoFocus
              persistenceKey={`vmotiv8-whiteboard-${roomId}`}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-primary-800 py-4 border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-300 text-xs">
            © {new Date().getFullYear()} <a href="https://vmotiv8.com/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-200 font-semibold">VMotiv8</a> • Created with ❤️ by the VMotiv8 Intern Team
          </p>
        </div>
      </footer>
    </div>
  )
}
