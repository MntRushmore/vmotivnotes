'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FileText, Download, RefreshCw, Trash2, ExternalLink, MoreVertical } from 'lucide-react'
import { PDFLibraryItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PDFCardProps {
  item: PDFLibraryItem
  onDelete?: (id: string) => void
  onRegenerate?: (id: string) => void
}

export function PDFCard({ item, onDelete, onRegenerate }: PDFCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getStatusColor = (status: PDFLibraryItem['status']) => {
    switch (status) {
      case 'ready':
        return 'bg-success-100 text-success-700 border-success-200'
      case 'processing':
        return 'bg-primary-100 text-primary-700 border-primary-200'
      case 'error':
        return 'bg-destructive-100 text-destructive-700 border-destructive-200'
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200'
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(item.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${item.title}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  return (
    <div
      className={`
        group relative bg-white rounded-2xl border-2 border-neutral-200
        transition-all duration-300 overflow-hidden
        ${isHovered ? 'shadow-soft-lg -translate-y-1 border-primary-300' : 'shadow-soft'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
        {item.thumbnailUrl && !imageError ? (
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-16 h-16 text-neutral-400" />
          </div>
        )}
        
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <Badge className={`${getStatusColor(item.status)} border`}>
            {item.status}
          </Badge>
        </div>

        {/* Category badge */}
        {item.category && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {item.category}
            </Badge>
          </div>
        )}

        {/* Hover overlay with actions */}
        <div
          className={`
            absolute inset-0 bg-black/60 backdrop-blur-sm
            flex items-center justify-center gap-2
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <Button
            size="sm"
            variant="secondary"
            className="bg-white hover:bg-neutral-100"
            onClick={() => window.open(item.url, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Open
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white hover:bg-neutral-100"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
          {item.title}
        </h3>

        {item.summarySnippet && (
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
            {item.summarySnippet}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
          <span>{formatDate(item.createdAt)}</span>
          <span>{formatSize(item.fileSize)}</span>
        </div>

        {/* Metadata */}
        {item.metadata && (
          <div className="flex gap-2 mb-3">
            {item.metadata.pageCount && (
              <Badge variant="outline" className="text-xs">
                {item.metadata.pageCount} pages
              </Badge>
            )}
            {item.metadata.extractionConfidence && (
              <Badge variant="outline" className="text-xs">
                {Math.round(item.metadata.extractionConfidence * 100)}% confidence
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => window.open(item.url, '_blank')}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <MoreVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownMenuItem>
              {onRegenerate && (
                <DropdownMenuItem onClick={() => onRegenerate(item.id)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(item.id)}
                  className="text-destructive-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
