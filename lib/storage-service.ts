import fs from 'fs'
import path from 'path'
import { PDFLibraryItem } from '@/types'

const STORAGE_FILE = path.join(process.cwd(), 'data', 'pdf-library.json')
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'generated')

export class StorageService {
  private static ensureStorageFile() {
    const dir = path.dirname(STORAGE_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    if (!fs.existsSync(STORAGE_FILE)) {
      fs.writeFileSync(STORAGE_FILE, JSON.stringify([]))
    }
  }

  private static ensurePublicDir() {
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true })
    }
  }

  static async getAll(): Promise<PDFLibraryItem[]> {
    this.ensureStorageFile()
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8')
    const items = JSON.parse(data) as PDFLibraryItem[]
    return items.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt)
    }))
  }

  static async getById(id: string): Promise<PDFLibraryItem | null> {
    const items = await this.getAll()
    return items.find(item => item.id === id) || null
  }

  static async save(item: PDFLibraryItem): Promise<void> {
    this.ensureStorageFile()
    const items = await this.getAll()
    const existingIndex = items.findIndex(i => i.id === item.id)
    
    if (existingIndex >= 0) {
      items[existingIndex] = item
    } else {
      items.push(item)
    }
    
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(items, null, 2))
  }

  static async delete(id: string): Promise<boolean> {
    this.ensureStorageFile()
    const items = await this.getAll()
    const filteredItems = items.filter(item => item.id !== id)
    
    if (filteredItems.length === items.length) {
      return false
    }
    
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(filteredItems, null, 2))
    return true
  }

  static async search(query: string): Promise<PDFLibraryItem[]> {
    const items = await this.getAll()
    const lowerQuery = query.toLowerCase()
    
    return items.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.topic.toLowerCase().includes(lowerQuery) ||
      item.category?.toLowerCase().includes(lowerQuery) ||
      item.summarySnippet?.toLowerCase().includes(lowerQuery)
    )
  }

  static async filter(options: {
    category?: string
    status?: PDFLibraryItem['status']
    startDate?: Date
    endDate?: Date
  }): Promise<PDFLibraryItem[]> {
    let items = await this.getAll()

    if (options.category) {
      items = items.filter(item => item.category === options.category)
    }

    if (options.status) {
      items = items.filter(item => item.status === options.status)
    }

    if (options.startDate) {
      items = items.filter(item => new Date(item.createdAt) >= options.startDate!)
    }

    if (options.endDate) {
      items = items.filter(item => new Date(item.createdAt) <= options.endDate!)
    }

    return items
  }

  static async sort(
    items: PDFLibraryItem[],
    sortBy: 'recent' | 'alphabetical' | 'popular'
  ): Promise<PDFLibraryItem[]> {
    const sorted = [...items]

    switch (sortBy) {
      case 'recent':
        return sorted.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'popular':
        return sorted.sort((a, b) => 
          (b.metadata?.summaryQuality || 0) - (a.metadata?.summaryQuality || 0)
        )
      default:
        return sorted
    }
  }

  static async paginate(
    items: PDFLibraryItem[],
    page: number = 1,
    limit: number = 12
  ): Promise<{ items: PDFLibraryItem[]; total: number; page: number; totalPages: number }> {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedItems = items.slice(startIndex, endIndex)

    return {
      items: paginatedItems,
      total: items.length,
      page,
      totalPages: Math.ceil(items.length / limit)
    }
  }

  static generateThumbnail(pdfUrl: string): string {
    return `/api/thumbnail?url=${encodeURIComponent(pdfUrl)}`
  }

  static savePDFToPublic(pdfBuffer: Buffer, filename: string): string {
    this.ensurePublicDir()
    const filePath = path.join(PUBLIC_DIR, filename)
    fs.writeFileSync(filePath, pdfBuffer)
    return `/generated/${filename}`
  }

  static async cleanup(olderThanDays: number = 30): Promise<number> {
    const items = await this.getAll()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

    let deletedCount = 0
    for (const item of items) {
      if (new Date(item.createdAt) < cutoffDate) {
        await this.delete(item.id)
        deletedCount++
      }
    }

    return deletedCount
  }
}
