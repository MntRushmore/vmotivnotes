'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Search, Download, Eye, Trash2 } from 'lucide-react'

interface LibraryItem {
  id: string
  fileName: string
  summaryMode: '9th-grade' | 'SAT'
  status: 'complete' | 'error'
  createdAt: string
  summary?: {
    summary: string
    keyPoints: string[]
    metadata: {
      mode: '9th-grade' | 'SAT'
      wordCount: number
    }
  }
  handwriting?: {
    pdfUrl: string
    metadata: {
      pageCount: number
    }
  }
}

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<LibraryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [modeFilter, setModeFilter] = useState<'all' | '9th-grade' | 'SAT'>('all')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLibraryItems()
  }, [])

  const filterItems = useCallback(() => {
    let filtered = items

    // Filter by mode
    if (modeFilter !== 'all') {
      filtered = filtered.filter(item => item.summaryMode === modeFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary?.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary?.keyPoints.some(point => 
          point.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    setFilteredItems(filtered)
  }, [items, searchQuery, modeFilter])

  useEffect(() => {
    filterItems()
  }, [filterItems])

  const fetchLibraryItems = async () => {
    try {
      setLoading(true)
      // In a real app, this would fetch from an API
      // For now, we'll use mock data
      const mockItems: LibraryItem[] = [
        {
          id: '1',
          fileName: 'math-notes-chapter1.pdf',
          summaryMode: '9th-grade',
          status: 'complete',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          summary: {
            summary: 'Introduction to algebraic expressions and equations...',
            keyPoints: ['Variables and constants', 'Solving linear equations', 'Graph basics'],
            metadata: {
              mode: '9th-grade',
              wordCount: 250
            }
          },
          handwriting: {
            pdfUrl: '/generated/handwriting-1.pdf',
            metadata: {
              pageCount: 3
            }
          }
        },
        {
          id: '2',
          fileName: 'sat-prep-geometry.pdf',
          summaryMode: 'SAT',
          status: 'complete',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          summary: {
            summary: 'Advanced geometric concepts for SAT preparation...',
            keyPoints: ['Circle theorems', 'Triangle properties', 'Coordinate geometry'],
            metadata: {
              mode: 'SAT',
              wordCount: 400
            }
          },
          handwriting: {
            pdfUrl: '/generated/handwriting-2.pdf',
            metadata: {
              pageCount: 5
            }
          }
        }
      ]
      
      setItems(mockItems)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Failed to fetch library items')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (pdfUrl: string, fileName: string) => {
    try {
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName.replace('.pdf', '-handwritten.pdf')
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Download error:', err)
      setError('Failed to download PDF')
    }
  }

  const handleView = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      // In a real app, this would call a delete API
      setItems(items.filter(item => item.id !== id))
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete item')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Notes Library
          </h1>
          <p className="text-neutral-600">
            Your collection of generated handwritten notes
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    placeholder="Search by filename or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={modeFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setModeFilter('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={modeFilter === '9th-grade' ? 'default' : 'outline'}
                  onClick={() => setModeFilter('9th-grade')}
                  size="sm"
                >
                  9th Grade
                </Button>
                <Button
                  variant={modeFilter === 'SAT' ? 'default' : 'outline'}
                  onClick={() => setModeFilter('SAT')}
                  size="sm"
                >
                  SAT
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Library Grid */}
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-neutral-500">
                {searchQuery || modeFilter !== 'all'
                  ? 'No items match your filters'
                  : 'Your library is empty. Generate some notes!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium truncate">
                      {item.fileName}
                    </CardTitle>
                    <Badge variant={item.summaryMode === 'SAT' ? 'default' : 'secondary'}>
                      {item.summaryMode}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {formatDate(item.createdAt)}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  {item.summary && (
                    <div className="mb-3">
                      <p className="text-sm text-neutral-700 line-clamp-3">
                        {item.summary.summary}
                      </p>
                      <div className="text-xs text-neutral-500 mt-1">
                        {item.summary.keyPoints.length} key points • {item.summary.metadata.wordCount} words
                      </div>
                    </div>
                  )}
                  
                  {item.handwriting && (
                    <div className="text-xs text-neutral-500 mb-3">
                      {item.handwriting.metadata.pageCount} pages
                    </div>
                  )}

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.handwriting && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(item.handwriting!.pdfUrl)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(item.handwriting!.pdfUrl, item.fileName)}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}