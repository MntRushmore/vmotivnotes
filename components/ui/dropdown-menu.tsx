'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative inline-block">{children}</div>
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, asChild = false, ...props }, ref) => {
  return (
    <button ref={ref} className={cn(className)} {...props}>
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: 'start' | 'end' }
>(({ className, align = 'start', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 min-w-[8rem] overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 shadow-soft-lg',
        'animate-in fade-in-0 zoom-in-95',
        align === 'end' ? 'right-0' : 'left-0',
        'mt-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none',
        'transition-colors hover:bg-neutral-100 focus:bg-neutral-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuItem.displayName = 'DropdownMenuItem'

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
