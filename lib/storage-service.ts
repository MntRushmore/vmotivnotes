import { PDFLibraryItem } from '@/types'

export class StorageService {
  private static readonly STORAGE_KEY = 'vmotiv8_pdf_library'
  private static readonly MAX_ITEMS = 1000

  /**
   * Get all items from storage
   */
  static async getAll(): Promise<PDFLibraryItem[]> {
    if (typeof window === 'undefined') {
      // Server-side: return empty array
      return []
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []
      
      const items = JSON.parse(stored)
      // Convert date strings back to Date objects
      return items.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }))
    } catch (error) {
      console.error('Failed to get items from storage:', error)
      return []
    }
  }

  /**
   * Save an item to storage
   */
  static async save(item: Omit<PDFLibraryItem, 'id' | 'createdAt'>): Promise<PDFLibraryItem> {
    const items = await this.getAll()
    
    // Create new item with ID and timestamp
    const newItem: PDFLibraryItem = {
      ...item,
      id: this.generateId(),
      createdAt: new Date()
    }

    // Add to beginning of array (most recent first)
    items.unshift(newItem)

    // Limit storage size
    if (items.length > this.MAX_ITEMS) {
      items.splice(this.MAX_ITEMS)
    }

    // Save to storage
    this.saveToStorage(items)

    return newItem
  }

  /**
   * Update an existing item
   */
  static async update(id: string, updates: Partial<PDFLibraryItem>): Promise<PDFLibraryItem | null> {
    const items = await this.getAll()
    const index = items.findIndex(item => item.id === id)
    
    if (index === -1) return null

    items[index] = {
      ...items[index],
      ...updates
    }

    this.saveToStorage(items)
    return items[index]
  }

  /**
   * Delete an item by ID
   */
  static async delete(id: string): Promise<boolean> {
    const items = await this.getAll()
    const filtered = items.filter(item => item.id !== id)
    
    if (filtered.length === items.length) return false

    this.saveToStorage(filtered)
    return true
  }

  /**
   * Search items by query
   */
  static async search(query: string): Promise<PDFLibraryItem[]> {
    const items = await this.getAll()
    const lowercaseQuery = query.toLowerCase()
    
    return items.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.topic.toLowerCase().includes(lowercaseQuery) ||
      (item.category && item.category.toLowerCase().includes(lowercaseQuery)) ||
      (item.summarySnippet && item.summarySnippet.toLowerCase().includes(lowercaseQuery))
    )
  }

  /**
   * Filter items by criteria
   */
  static async filter(criteria: {
    category?: string
    status?: PDFLibraryItem['status']
  }): Promise<PDFLibraryItem[]> {
    let items = await this.getAll()

    if (criteria.category) {
      items = items.filter(item => item.category === criteria.category)
    }

    if (criteria.status) {
      items = items.filter(item => item.status === criteria.status)
    }

    return items
  }

  /**
   * Sort items
   */
  static async sort(
    items: PDFLibraryItem[], 
    sortBy: 'recent' | 'alphabetical' | 'popular'
  ): Promise<PDFLibraryItem[]> {
    const sorted = [...items]

    switch (sortBy) {
      case 'recent':
        sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case 'alphabetical':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'popular':
        // For demo purposes, sort by file size (larger = more popular)
        sorted.sort((a, b) => b.fileSize - a.fileSize)
        break
    }

    return sorted
  }

  /**
   * Paginate items
   */
  static async paginate(
    items: PDFLibraryItem[], 
    page: number, 
    limit: number
  ): Promise<{
    items: PDFLibraryItem[]
    total: number
    page: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }> {
    const total = items.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedItems = items.slice(startIndex, endIndex)

    return {
      items: paginatedItems,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  }

  /**
   * Get statistics about the library
   */
  static async getStats(): Promise<{
    total: number
    byStatus: Record<PDFLibraryItem['status'], number>
    byCategory: Record<string, number>
    totalSize: number
  }> {
    const items = await this.getAll()
    
    const stats = {
      total: items.length,
      byStatus: {
        ready: 0,
        processing: 0,
        error: 0
      } as Record<PDFLibraryItem['status'], number>,
      byCategory: {} as Record<string, number>,
      totalSize: 0
    }

    items.forEach(item => {
      // Count by status
      stats.byStatus[item.status]++
      
      // Count by category
      if (item.category) {
        stats.byCategory[item.category] = (stats.byCategory[item.category] || 0) + 1
      }
      
      // Sum file sizes
      stats.totalSize += item.fileSize
    })

    return stats
  }

  /**
   * Clear all items from storage
   */
  static async clear(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }

  /**
   * Export library data as JSON
   */
  static async export(): Promise<string> {
    const items = await this.getAll()
    return JSON.stringify(items, null, 2)
  }

  /**
   * Import library data from JSON
   */
  static async import(jsonData: string): Promise<number> {
    try {
      const items = JSON.parse(jsonData)
      if (!Array.isArray(items)) throw new Error('Invalid data format')
      
      // Validate and clean up imported items
      const validItems = items.filter(item => 
        item.id && 
        item.title && 
        item.url && 
        item.createdAt
      ).map(item => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }))

      this.saveToStorage(validItems)
      return validItems.length
    } catch (error) {
      console.error('Failed to import data:', error)
      throw new Error('Invalid import data')
    }
  }

  /**
   * Save items to localStorage
   */
  private static saveToStorage(items: PDFLibraryItem[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items))
    }
  }

  /**
   * Generate a unique ID
   */
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}