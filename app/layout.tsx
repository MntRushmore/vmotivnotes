import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ClientToaster } from '@/components/ClientToaster'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'VMotiv Notes',
  description: 'A powerful note-taking application with AI-powered features',
  keywords: ['notes', 'ai', 'productivity', 'vmotiv'],
  authors: [{ name: 'VMotiv Team' }],
  creator: 'VMotiv Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vmotiviznotes.com',
    siteName: 'VMotiv Notes',
    title: 'VMotiv Notes',
    description: 'A powerful note-taking application with AI-powered features',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VMotiv Notes',
    description: 'A powerful note-taking application with AI-powered features',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#fafafa" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <ClientToaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
