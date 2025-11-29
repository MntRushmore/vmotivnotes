'use client'

import React, { useState } from 'react'
import { useUserSettings } from '@/hooks/useUserSettings'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Send, CheckCircle2 } from 'lucide-react'

export default function ContactSupportForm() {
  const { profile } = useUserSettings()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  React.useEffect(() => {
    if (profile.name && profile.email) {
      setFormData(prev => ({
        ...prev,
        name: profile.name,
        email: profile.email,
      }))
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    if (formData.message.length < 10) {
      toast({
        title: 'Message Too Short',
        description: 'Please provide more details (at least 10 characters)',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/help/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: 'Success!',
          description: data.message || 'Your support request has been submitted',
        })
        
        setFormData({
          name: profile.name,
          email: profile.email,
          subject: '',
          message: '',
        })

        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        toast({
          title: 'Error',
          description: data.details || data.error || 'Failed to submit support request',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Support form error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Support</CardTitle>
        <CardDescription>
          Still need help? Send us a message and we&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="mt-1"
                disabled={isSubmitting}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="mt-1"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your issue"
              className="mt-1"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please describe your issue in detail..."
              className="mt-1 min-h-[150px]"
              disabled={isSubmitting}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          {isSuccess ? (
            <div className="flex items-center gap-2 text-success-600">
              <CheckCircle2 size={20} />
              <span className="font-medium">Submitted successfully!</span>
            </div>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
