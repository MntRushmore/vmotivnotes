import { nanoid } from 'nanoid'
import type { TutorNote, NoteSession } from '@/types'

const SESSION_KEY = 'vmotiv_note_session'
const SESSION_EXPIRY_HOURS = 24

interface SessionCache {
  session: NoteSession
  expiresAt: number
}

/**
 * Session management for tutor notes
 * Uses localStorage for client-side persistence (no auth required)
 */
export class NoteSessionManager {
  /**
   * Get current session or create new one
   */
  static getSession(): NoteSession {
    if (typeof window === 'undefined') {
      // Server-side: return empty session
      return {
        sessionId: nanoid(),
        notes: [],
        activeNoteId: null,
        createdAt: new Date(),
      }
    }

    try {
      const cached = localStorage.getItem(SESSION_KEY)
      if (cached) {
        const sessionCache: SessionCache = JSON.parse(cached)

        // Check if expired
        if (Date.now() < sessionCache.expiresAt) {
          // Restore dates
          sessionCache.session.createdAt = new Date(sessionCache.session.createdAt)
          sessionCache.session.notes = sessionCache.session.notes.map(note => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
          }))

          return sessionCache.session
        }
      }
    } catch (error) {
      console.error('Failed to load session:', error)
    }

    // Create new session
    const newSession: NoteSession = {
      sessionId: nanoid(),
      notes: [],
      activeNoteId: null,
      createdAt: new Date(),
    }

    this.saveSession(newSession)
    return newSession
  }

  /**
   * Save session to localStorage
   */
  static saveSession(session: NoteSession): void {
    if (typeof window === 'undefined') return

    try {
      const cache: SessionCache = {
        session,
        expiresAt: Date.now() + (SESSION_EXPIRY_HOURS * 60 * 60 * 1000),
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(cache))
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  }

  /**
   * Add a note to the session
   */
  static addNote(note: TutorNote): NoteSession {
    const session = this.getSession()
    session.notes.push(note)
    session.activeNoteId = note.id
    this.saveSession(session)
    return session
  }

  /**
   * Update a note in the session
   */
  static updateNote(noteId: string, updates: Partial<TutorNote>): NoteSession {
    const session = this.getSession()
    const index = session.notes.findIndex(n => n.id === noteId)

    if (index >= 0) {
      session.notes[index] = {
        ...session.notes[index],
        ...updates,
        updatedAt: new Date(),
      }
      this.saveSession(session)
    }

    return session
  }

  /**
   * Delete a note from the session
   */
  static deleteNote(noteId: string): NoteSession {
    const session = this.getSession()
    session.notes = session.notes.filter(n => n.id !== noteId)

    // If deleted note was active, set new active note
    if (session.activeNoteId === noteId) {
      session.activeNoteId = session.notes.length > 0 ? session.notes[0].id : null
    }

    this.saveSession(session)
    return session
  }

  /**
   * Set active note
   */
  static setActiveNote(noteId: string): NoteSession {
    const session = this.getSession()
    session.activeNoteId = noteId
    this.saveSession(session)
    return session
  }

  /**
   * Get active note
   */
  static getActiveNote(): TutorNote | null {
    const session = this.getSession()
    if (!session.activeNoteId) return null
    return session.notes.find(n => n.id === session.activeNoteId) || null
  }

  /**
   * Clear session (delete all notes)
   */
  static clearSession(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(SESSION_KEY)
  }

  /**
   * Export session as JSON (for backup/download)
   */
  static exportSession(): string {
    const session = this.getSession()
    return JSON.stringify(session, null, 2)
  }

  /**
   * Import session from JSON
   */
  static importSession(json: string): NoteSession {
    try {
      const imported = JSON.parse(json)
      const session: NoteSession = {
        ...imported,
        createdAt: new Date(imported.createdAt),
        notes: imported.notes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        })),
      }
      this.saveSession(session)
      return session
    } catch (error) {
      console.error('Failed to import session:', error)
      throw new Error('Invalid session data')
    }
  }
}
