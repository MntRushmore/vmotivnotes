import { NextRequest, NextResponse } from 'next/server'
import { SupportService } from '@/lib/support-service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: 'Name, email, subject, and message are all required'
        },
        { status: 400 }
      )
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid name', details: 'Name must be a non-empty string' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email', details: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    if (typeof subject !== 'string' || subject.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid subject', details: 'Subject must be a non-empty string' },
        { status: 400 }
      )
    }

    if (typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Invalid message', details: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    const ticket = await SupportService.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    })

    console.log(`New support ticket created: ${ticket.id} from ${ticket.email}`)

    return NextResponse.json(
      {
        success: true,
        ticket: {
          id: ticket.id,
          status: ticket.status,
          createdAt: ticket.createdAt,
        },
        message: 'Support ticket submitted successfully. We will get back to you soon!'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Support API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to submit support ticket',
        details: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    )
  }
}
