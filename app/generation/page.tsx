'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default function GenerationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-neutral-900 mb-4">
            Generation Status
          </h1>
          <p className="text-xl text-neutral-600">
            Your document is ready for processing
          </p>
        </div>

        <Card className="shadow-soft-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-600" />
              Ready to Generate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-primary-50 border border-primary-200 rounded-xl">
              <p className="text-sm text-primary-900">
                Your document has been uploaded and text has been extracted successfully.
                You can now generate notes, summaries, or other content from the extracted text.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push('/')}
                className="w-full"
                size="lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Notes
              </Button>
              
              <Button
                onClick={() => router.push('/upload')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Upload Another Document
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
