'use client'

import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import FloatingOrb from './FloatingOrb'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <FloatingOrb />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-0 relative z-10 min-h-screen">
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}