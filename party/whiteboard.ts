import type * as Party from "partykit/server"
import { onConnect } from "y-partykit"

/**
 * VMotiv8 Whiteboard Collaboration Server
 *
 * This PartyKit server enables real-time collaboration on the whiteboard.
 * Each room ID corresponds to a unique collaborative session.
 *
 * Uses Yjs CRDT for conflict-free real-time synchronization.
 */

export default class WhiteboardServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`[VMotiv8] User ${conn.id} connected to room: ${this.room.id}`)

    // Use y-partykit to handle Yjs CRDT synchronization
    return onConnect(conn, this.room, {
      // Persist whiteboard data to PartyKit storage
      persist: {
        mode: "snapshot",
      },

      // Load persisted data when room starts
      load: async () => {
        const data = await this.room.storage.get("whiteboard-data")
        return data as Uint8Array | undefined
      },

      // Save data periodically
      callback: {
        handler: async (data: Uint8Array) => {
          await this.room.storage.put("whiteboard-data", data)
        },
        // Save every 5 seconds of changes
        debounceWait: 5000,
      },
    })
  }

  onMessage(message: string | ArrayBuffer, sender: Party.Connection) {
    // y-partykit handles all Yjs sync messages automatically
  }

  onClose(connection: Party.Connection) {
    console.log(`[VMotiv8] User ${connection.id} disconnected from room: ${this.room.id}`)
  }

  onError(connection: Party.Connection, error: Error) {
    console.error(`[VMotiv8] Error in room ${this.room.id}:`, error)
  }
}

WhiteboardServer satisfies Party.Worker
