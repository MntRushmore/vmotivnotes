'use client'

import { useEffect, useState } from 'react'
import { Tldraw } from 'tldraw'
import { useYjsStore } from '@tldraw/sync'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const PARTYKIT_HOST = process.env.NODE_ENV === 'development'
  ? 'ws://localhost:1999'
  : 'wss://vmotiv8-whiteboard.your-username.partykit.dev'

interface WhiteboardCanvasProps {
  roomId: string
}

export default function WhiteboardCanvas({ roomId }: WhiteboardCanvasProps) {
  const [store, setStore] = useState<any>(null)

  useEffect(() => {
    // Create a new Yjs document
    const yDoc = new Y.Doc()

    // Connect to PartyKit WebSocket server
    const wsProvider = new WebsocketProvider(
      PARTYKIT_HOST.replace('ws://', '').replace('wss://', ''),
      `room-${roomId}`,
      yDoc,
      {
        connect: true,
        // PartyKit WebSocket configuration
        params: { room: roomId }
      }
    )

    // Create tldraw store with Yjs synchronization
    const yStore = useYjsStore({
      doc: yDoc,
      roomId: `room-${roomId}`,
    })

    setStore(yStore)

    // Cleanup on unmount
    return () => {
      wsProvider.destroy()
      yDoc.destroy()
    }
  }, [roomId])

  if (!store) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Connecting to whiteboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 relative bg-white">
      <Tldraw store={store} autoFocus />
    </div>
  )
}
