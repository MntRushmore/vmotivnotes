import type * as Party from "partykit/server"
import { onConnect } from "y-partykit"

/**
 * VMotiv8 Whiteboard Collaboration Server
 *
 * This PartyKit server enables real-time collaboration on the whiteboard.
 * Each room ID corresponds to a unique collaborative session.
 */

export default class WhiteboardServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // Use y-partykit to handle Yjs CRDT synchronization
    return onConnect(conn, this.room, {
      // Persist whiteboard data to storage
      persist: true,

      // Callback when connection is established
      callback: {
        handler: async () => {
          console.log(`[VMotiv8 Whiteboard] User connected to room: ${this.room.id}`)
        },
      },
    })
  }

  onMessage(message: string | ArrayBuffer, sender: Party.Connection) {
    // y-partykit handles all messages automatically
    // This is here for custom logging if needed
  }

  onClose(connection: Party.Connection) {
    console.log(`[VMotiv8 Whiteboard] User disconnected from room: ${this.room.id}`)
  }

  onError(connection: Party.Connection, error: Error) {
    console.error(`[VMotiv8 Whiteboard] Error in room ${this.room.id}:`, error)
  }
}

WhiteboardServer satisfies Party.Worker
