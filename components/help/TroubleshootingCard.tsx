'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  Upload, 
  AlertCircle, 
  Library, 
  Settings, 
  Download, 
  HelpCircle,
  ChevronRight 
} from 'lucide-react'
import { TroubleshootingGuide } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TroubleshootingCardProps {
  guide: TroubleshootingGuide
}

const iconMap = {
  Upload,
  AlertCircle,
  Library,
  Settings,
  Download,
  HelpCircle,
}

export default function TroubleshootingCard({ guide }: TroubleshootingCardProps) {
  const router = useRouter()
  const IconComponent = iconMap[guide.icon as keyof typeof iconMap] || HelpCircle

  const handleAction = () => {
    if (guide.link) {
      router.push(guide.link)
    }
  }

  return (
    <Card className="hover:shadow-soft-lg transition-smooth h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <IconComponent size={24} className="text-primary-600" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">{guide.title}</CardTitle>
            <CardDescription className="mt-1">{guide.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {guide.steps && guide.steps.length > 0 && (
          <ol className="space-y-2 mb-4 flex-1">
            {guide.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-sm text-neutral-700 flex-1">{step}</span>
              </li>
            ))}
          </ol>
        )}
        {guide.link && (
          <Button
            variant="outline"
            className="w-full mt-auto"
            onClick={handleAction}
          >
            Go to {guide.title.replace(' Issues', '').replace(' Problems', '')}
            <ChevronRight size={16} className="ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
