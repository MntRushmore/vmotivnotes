import { NextRequest, NextResponse } from 'next/server'

/**
 * Simple WebSocket-based sync endpoint for whiteboard collaboration
 * This is a placeholder - for production, use a proper sync server like:
 * - PartyKit
 * - Ably
 * - Pusher
 * - Custom WebSocket server
 */

export async function GET(request: NextRequest) {
  return NextResponse.json({
    error: 'WebSocket sync not yet implemented',
    message: 'For now, whiteboard only supports local storage. To enable multiplayer, you need to deploy a sync server.',
    options: [
      'Deploy to Vercel with PartyKit integration',
      'Use tldraw cloud sync service',
      'Set up custom WebSocket server'
    ]
  }, { status: 501 })
}
