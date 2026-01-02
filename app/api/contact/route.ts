import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactNotification, sendContactConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || null,
        message,
      },
    })

    // Send notification email to admin (non-blocking)
    sendContactNotification({
      name,
      email,
      phone: phone || undefined,
      service: service || undefined,
      message,
    }).catch((error) => {
      console.error('Failed to send notification email:', error)
      // Don't fail the request if email fails
    })

    // Send confirmation email to user (non-blocking)
    sendContactConfirmation(email, name).catch((error) => {
      console.error('Failed to send confirmation email:', error)
      // Don't fail the request if email fails
    })

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        id: contact.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form. Please try again later.' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve contacts (for admin panel)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = parseInt(searchParams.get('skip') || '0')

    const contacts = await prisma.contact.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await prisma.contact.count()

    return NextResponse.json({
      contacts,
      total,
      limit,
      skip,
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}
