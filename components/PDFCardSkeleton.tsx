import { Skeleton } from '@/components/ui/skeleton'

export function PDFCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border-2 border-neutral-200 shadow-soft overflow-hidden">
      <Skeleton className="w-full aspect-[3/4]" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-10" />
        </div>
      </div>
    </div>
  )
}
