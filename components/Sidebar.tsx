'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Upload, Library, Settings, Menu, X } from 'lucide-react'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Upload, label: 'Upload', href: '/upload' },
    { icon: Library, label: 'Library', href: '/library' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-soft hover:shadow-soft-md transition-smooth"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${className}
      `}>
        <div className="flex flex-col h-full py-6">
          {/* Logo/Brand */}
          <div className="px-6 mb-8">
            <h1 className="text-2xl font-bold text-gradient">VMotiv</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <li key={index}>
                    <button
                      onClick={() => {
                        router.push(item.href)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl
                        transition-smooth text-left
                        ${isActive 
                          ? 'bg-primary-50 text-primary-600 shadow-soft' 
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                        }
                      `}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="px-6 py-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">User</p>
                <p className="text-xs text-neutral-500">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}