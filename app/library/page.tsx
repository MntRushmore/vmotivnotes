'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, ArrowUpDown, BookOpen, AlertCircle } from 'lucide-react'
import { PDFCard } from '@/components/PDFCard'
import { PDFCardSkeleton } from '@/components/PDFCardSkeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { PDFLibraryItem } from '@/types'

export const dynamic = 'force-dynamic'

type SortOption = 'recent' | 'alphabetical' | 'popular'

export default function LibraryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [items, setItems] = useState<PDFLibraryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<PDFLibraryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchLibrary = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sortBy,
      })

      if (searchQuery) params.append('query', searchQuery)
      if (selectedCategory) params.append('category', selectedCategory)

      const response = await fetch(`/api/library?${params}`)
      if (!response.ok) throw new Error('Failed to fetch library')

      const data = await response.json()
      setItems(data.items)
      setFilteredItems(data.items)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Library fetch error:', error)
      toast({
        title: 'Error',
        description: 'Failed to load library',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [page, sortBy, searchQuery, selectedCategory, toast])

  useEffect(() => {
    fetchLibrary()
  }, [fetchLibrary])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/library?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'PDF deleted successfully',
      })

      fetchLibrary()
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete PDF',
        variant: 'destructive',
      })
    }
  }

  const handleRegenerate = async (_id: string) => {
    toast({
      title: 'Coming soon',
      description: 'Regeneration feature will be available soon',
    })
  }

  const categories = Array.from(new Set(items.map(item => item.category).filter(Boolean)))

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1)
  }

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
    setPage(1)
  }

  const handleSort = (option: SortOption) => {
    setSortBy(option)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-semibold text-neutral-900">
              PDF Library
            </h1>
          </div>
          <p className="text-xl text-neutral-600">
            Browse and manage your generated PDFs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search by title, topic, or category..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'recent' ? 'default' : 'outline'}
                onClick={() => handleSort('recent')}
                size="sm"
              >
                <ArrowUpDown className="w-4 h-4 mr-1" />
                Recent
              </Button>
              <Button
                variant={sortBy === 'alphabetical' ? 'default' : 'outline'}
                onClick={() => handleSort('alphabetical')}
                size="sm"
              >
                A-Z
              </Button>
              <Button
                variant={sortBy === 'popular' ? 'default' : 'outline'}
                onClick={() => handleSort('popular')}
                size="sm"
              >
                Popular
              </Button>
            </div>
          </div>

          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-200">
              <span className="text-sm text-neutral-600 flex items-center">
                <Filter className="w-4 h-4 mr-1" />
                Filter by:
              </span>
              <Badge
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleCategoryFilter(null)}
              >
                All
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleCategoryFilter(category as string)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <PDFCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <PDFCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onRegenerate={handleRegenerate}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={page === p ? 'default' : 'outline'}
                      onClick={() => setPage(p)}
                      size="sm"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="w-16 h-16 text-neutral-400" />
              <h3 className="text-2xl font-semibold text-neutral-900">
                No PDFs found
              </h3>
              <p className="text-neutral-600 max-w-md">
                {searchQuery || selectedCategory
                  ? 'Try adjusting your search or filters'
                  : "You haven't generated any PDFs yet. Upload a document to get started!"}
              </p>
              <div className="flex gap-3 mt-4">
                {(searchQuery || selectedCategory) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory(null)
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
                <Button onClick={() => router.push('/upload')}>
                  Upload Document
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
