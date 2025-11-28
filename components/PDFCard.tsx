'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Download, 
  Eye, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle,
  Loader2
} from 'lucide-react'
import { PDFLibraryItem } from '@/types'

interface PDFCardProps {
  item: PDFLibraryItem
  onDelete?: (id: string) => void
  onDownload?: (url: string, filename: string) => void
  onView?: (url: string) => void
  showActions?: boolean
}

export function PDFCard({ 
  item, 
  onDelete, 
  onDownload, 
  onView,
  showActions = true 
}: PDFCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const getStatusIcon = () => {
    switch (item.status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'processing':
        return <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-neutral-400" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this PDF?')) return
    
    setIsDeleting(true)
    try {
      await onDelete?.(item.id)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDownload = async () => {
    if (!item.url) return
    
    setIsDownloading(true)
    try {
      await onDownload?.(item.url, `${item.title}.pdf`)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleView = () => {
    item.url && onView?.(item.url)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Thumbnail/Preview */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden">
        {item.thumbnailUrl ? (
          <Image 
            src={item.thumbnailUrl} 
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-neutral-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-neutral-500">PDF Preview</p>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <Badge 
            variant={item.status === 'ready' ? 'default' : 'secondary'}
            className="flex items-center gap-1 bg-white/90 backdrop-blur-sm"
          >
            {getStatusIcon()}
            <span className="text-xs">{item.status}</span>
          </Badge>
        </div>

        {/* Progress Bar for Processing */}
        {item.status === 'processing' && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
            <Progress value={75} className="h-1" />
          </div>
        )}
      </div>

      {/* Content */}
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium line-clamp-2 leading-tight">
          {item.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>{formatDate(item.createdAt)}</span>
          <span>•</span>
          <span>{formatFileSize(item.fileSize)}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Category */}
        {item.category && (
          <Badge variant="outline" className="text-xs mb-2">
            {item.category}
          </Badge>
        )}

        {/* Summary Snippet */}
        {item.summarySnippet && (
          <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
            {item.summarySnippet}
          </p>
        )}

        {/* Metadata */}
        {item.metadata && (
          <div className="text-xs text-neutral-500 mb-3 space-y-1">
            {item.metadata.pageCount && (
              <div>{item.metadata.pageCount} pages</div>
            )}
            {item.metadata.extractionConfidence && (
              <div>Extraction: {Math.round(item.metadata.extractionConfidence * 100)}%</div>
            )}
            {item.metadata.summaryQuality && (
              <div>Quality: {Math.round(item.metadata.summaryQuality * 100)}%</div>
            )}
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.status === 'ready' && item.url && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleView}
                  disabled={isDownloading}
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Download className="w-3 h-3" />
                  )}
                </Button>
              </>
            )}
            
            {onDelete && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                {isDeleting ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Trash2 className="w-3 h-3" />
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}