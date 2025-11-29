import fs from 'fs'
import path from 'path'
import { StorageService } from './storage-service'
import { ExportHistoryEntry } from '@/types'

const EXPORT_DIR = path.join(process.cwd(), 'public', 'exports')
const EXPORT_HISTORY_FILE = path.join(process.cwd(), 'data', 'export-history.json')

export class ExportService {
  private static ensureExportDir() {
    if (!fs.existsSync(EXPORT_DIR)) {
      fs.mkdirSync(EXPORT_DIR, { recursive: true })
    }
  }

  private static ensureHistoryFile() {
    const dir = path.dirname(EXPORT_HISTORY_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    if (!fs.existsSync(EXPORT_HISTORY_FILE)) {
      fs.writeFileSync(EXPORT_HISTORY_FILE, JSON.stringify([]))
    }
  }

  private static async getHistory(): Promise<ExportHistoryEntry[]> {
    this.ensureHistoryFile()
    const data = fs.readFileSync(EXPORT_HISTORY_FILE, 'utf-8')
    return JSON.parse(data) as ExportHistoryEntry[]
  }

  private static async saveHistory(history: ExportHistoryEntry[]): Promise<void> {
    this.ensureHistoryFile()
    fs.writeFileSync(EXPORT_HISTORY_FILE, JSON.stringify(history, null, 2))
  }

  static async exportData(): Promise<{ filePath: string; entry: ExportHistoryEntry }> {
    try {
      this.ensureExportDir()

      // Get all library items
      const items = await StorageService.getAll()

      // Create export data
      const exportData = {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        data: {
          libraryItems: items,
          itemCount: items.length,
        },
      }

      // Generate filename with timestamp
      const timestamp = Date.now()
      const fileName = `export-${timestamp}.json`
      const filePath = path.join(EXPORT_DIR, fileName)

      // Write to file
      const jsonString = JSON.stringify(exportData, null, 2)
      fs.writeFileSync(filePath, jsonString)

      // Create history entry
      const fileSize = fs.statSync(filePath).size
      const entry: ExportHistoryEntry = {
        id: `export-${timestamp}`,
        timestamp,
        fileName,
        fileSize,
        status: 'success',
      }

      // Update history
      const history = await this.getHistory()
      history.push(entry)
      await this.saveHistory(history)

      return {
        filePath: `/exports/${fileName}`,
        entry,
      }
    } catch (error) {
      const timestamp = Date.now()
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      // Create failed history entry
      const entry: ExportHistoryEntry = {
        id: `export-${timestamp}`,
        timestamp,
        fileName: `export-${timestamp}.json`,
        fileSize: 0,
        status: 'failed',
        error: errorMessage,
      }

      // Update history
      const history = await this.getHistory()
      history.push(entry)
      await this.saveHistory(history)

      throw error
    }
  }

  static async getExportHistory(): Promise<ExportHistoryEntry[]> {
    try {
      const history = await this.getHistory()
      // Sort by timestamp descending (most recent first)
      return history.sort((a, b) => b.timestamp - a.timestamp)
    } catch (error) {
      console.error('Failed to get export history:', error)
      return []
    }
  }

  static async deleteExportFile(fileName: string): Promise<boolean> {
    try {
      const filePath = path.join(EXPORT_DIR, fileName)

      // Security check: ensure file is in export directory
      if (!filePath.startsWith(EXPORT_DIR)) {
        throw new Error('Invalid file path')
      }

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)

        // Update history
        const history = await this.getHistory()
        const updated = history.filter(entry => entry.fileName !== fileName)
        await this.saveHistory(updated)

        return true
      }

      return false
    } catch (error) {
      console.error('Failed to delete export file:', error)
      return false
    }
  }
}
