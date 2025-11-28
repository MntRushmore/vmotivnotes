'use client'

import React from 'react'

export default function FloatingOrb() {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
      <div className="relative w-96 h-96 animate-float">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-full blur-3xl opacity-30 animate-pulse-glow" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-40 animate-pulse" />
        <div className="absolute inset-8 bg-gradient-to-br from-purple-300 via-purple-400 to-blue-400 rounded-full blur-xl opacity-50 animate-pulse-soft" />
      </div>
    </div>
  )
}