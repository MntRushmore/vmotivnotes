'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Users, Copy, Check, Home } from 'lucide-react'
import { Tldraw, createTLStore, defaultShapeUtils } from 'tldraw'
import { useYjsStore } from '@tldraw/sync'
import * as Y from 'yjs'
import { PartyKitProvider } from 'y-partykit/provider'
import 'tldraw/tldraw.css'

/**
 * VMotiv8 Shared Whiteboard
 *
 * Real-time collaborative whiteboard powered by PartyKit and Yjs.
 * Features:
 * - Live multiplayer collaboration
 * - Shareable room codes
 * - Persistent cloud storage
 */

// PartyKit host - use localhost for development
const PARTYKIT_HOST = process.env.NODE_ENV === 'development'
  ? 'localhost:1999'
  : 'vmotiv8-whiteboard.your-username.partykit.dev'

function WhiteboardCanvas({ roomId }: { roomId: string }) {
  const store = useMemo(() => {
    // Create a new Yjs document
    const doc = new Y.Doc()

    // Connect to PartyKit server
    const provider = new PartyKitProvider(PARTYKIT_HOST, roomId, doc, {
      connect: true,
    })

    // Create tldraw store with Yjs synchronization
    const yStore = useYjsStore({
      doc,
      shapeUtils: defaultShapeUtils,
    })

    return yStore
  }, [roomId])

  return (
    <div className="flex-1 relative bg-white">
      <Tldraw store={store} autoFocus />
    </div>
  )
}

export default function WhiteboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomIdParam = searchParams.get('room')

  const [roomId, setRoomId] = useState(roomIdParam || '')
  const [isInRoom, setIsInRoom] = useState(!!roomIdParam)
  const [copied, setCopied] = useState(false)
  const [activeUsers, setActiveUsers] = useState(1)

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

  const goHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50">
      {!isInRoom ? (
        /* Room Selection Screen */
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* VMotiv8 Branding Header */}
          <div className="mb-8">
            <button
              onClick={goHome}
              className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium mb-6 transition-colors group"
            >
              <Home size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to VMotiv8 Notes
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎨</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
                  Shared Whiteboard
                </h1>
                <p className="text-sm text-gold-600 font-medium">Powered by VMotiv8</p>
              </div>
            </div>

            <p className="text-neutral-600 text-lg">
              Collaborate in real-time with tutors and students on a shared whiteboard
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gold-200">
            {/* Create New Room */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Create New Room
              </h2>
              <p className="text-sm text-neutral-600 mb-4">
                Start a new whiteboard session with real-time collaboration
              </p>
              <button
                onClick={createRoom}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Users size={20} />
                Create Collaborative Room
              </button>
            </div>

            {/* Join Existing Room */}
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Join Existing Room
              </h2>
              <p className="text-sm text-neutral-600 mb-4">
                Enter a room code to join an active whiteboard session
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  placeholder="ROOM CODE"
                  className="flex-1 px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase font-mono text-lg"
                  maxLength={6}
                  onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
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
            <div className="bg-white p-5 rounded-xl border-2 border-green-200 shadow-sm">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Real-time Sync</h3>
              <p className="text-sm text-neutral-600">See changes instantly as others draw</p>
            </div>
            <div className="bg-white p-5 rounded-xl border-2 border-blue-200 shadow-sm">
              <div className="text-3xl mb-2">✏️</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Full Drawing Tools</h3>
              <p className="text-sm text-neutral-600">Pen, shapes, text, sticky notes</p>
            </div>
            <div className="bg-white p-5 rounded-xl border-2 border-purple-200 shadow-sm">
              <div className="text-3xl mb-2">💾</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Cloud Storage</h3>
              <p className="text-sm text-neutral-600">Auto-saved, never lose work</p>
            </div>
          </div>
        </div>
      ) : (
        /* Whiteboard Screen */
        <div className="flex flex-col h-screen">
          {/* VMotiv8 Branded Header */}
          <div className="bg-gradient-to-r from-primary-800 to-primary-700 border-b border-primary-900 px-6 py-3 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={leaveRoom}
                className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Leave Room
              </button>
              <div className="h-6 w-px bg-white/30" />
              <button
                onClick={goHome}
                className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors group"
              >
                <Home size={18} className="group-hover:scale-110 transition-transform" />
                VMotiv8 Notes
              </button>
              <div className="h-6 w-px bg-white/30" />
              <div>
                <div className="text-xs text-gold-300 font-medium">Room Code</div>
                <div className="text-lg font-bold text-white font-mono">{roomId}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-white font-medium">Live</span>
              </div>
              <button
                onClick={copyRoomLink}
                className="flex items-center gap-2 px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors font-medium shadow-md"
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
          </div>

          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 px-6 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-900">
                  Real-time Collaboration Enabled
                </p>
                <p className="text-xs text-green-700">
                  All changes sync instantly with everyone in the room. Powered by PartyKit.
                </p>
              </div>
            </div>
          </div>

          {/* Whiteboard Canvas with PartyKit Sync */}
          <WhiteboardCanvas roomId={roomId} />
        </div>
      )}

      {/* VMotiv8 Footer */}
      {!isInRoom && (
        <footer className="bg-primary-800 py-6 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gold-300 text-sm mb-2">
              © {new Date().getFullYear()} <a href="https://vmotiv8.com/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-200 font-semibold">VMotiv8</a>
            </p>
            <p className="text-gold-400 text-xs">
              Created with ❤️ by the VMotiv8 Intern Team
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}
