import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/middleware'

async function handleGet() {
  try {
    // Get the email settings (only one record with id='default')
    const settings = await prisma.emailSettings.findUnique({
      where: { id: 'default' },
    })

    if (!settings) {
      // Return default from env if no settings in DB
      return NextResponse.json({
        smtpHost: process.env.SMTP_HOST || '',
        smtpPort: parseInt(process.env.SMTP_PORT || '587'),
        smtpSecure: process.env.SMTP_SECURE === 'true',
        smtpUser: process.env.SMTP_USER || '',
        smtpPassword: '', // Don't return password
        adminEmail: process.env.ADMIN_EMAIL || '',
      })
    }

    return NextResponse.json({
      smtpHost: settings.smtpHost,
      smtpPort: settings.smtpPort,
      smtpSecure: settings.smtpSecure,
      smtpUser: settings.smtpUser,
      smtpPassword: '', // Don't return password, frontend should handle this
      adminEmail: settings.adminEmail,
    })
  } catch (error) {
    console.error('Error fetching email settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch email settings' },
      { status: 500 }
    )
  }
}

async function handlePost(req: NextRequest) {
  try {
    const body = await req.json()
    const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPassword, adminEmail } = body

    if (!smtpHost || !smtpPort || !smtpUser || !adminEmail) {
      return NextResponse.json(
        { error: 'Required fields: smtpHost, smtpPort, smtpUser, adminEmail' },
        { status: 400 }
      )
    }

    // Get existing settings to preserve password if not provided
    const existing = await prisma.emailSettings.findUnique({
      where: { id: 'default' },
    })

    // If password is not provided and we have existing settings, keep the old password
    const finalPassword = smtpPassword || existing?.smtpPassword || ''

    // Update or create settings
    const settings = await prisma.emailSettings.upsert({
      where: { id: 'default' },
      update: {
        smtpHost,
        smtpPort: parseInt(smtpPort),
        smtpSecure: smtpSecure === true || smtpSecure === 'true',
        smtpUser,
        smtpPassword: finalPassword,
        adminEmail,
      },
      create: {
        id: 'default',
        smtpHost,
        smtpPort: parseInt(smtpPort),
        smtpSecure: smtpSecure === true || smtpSecure === 'true',
        smtpUser,
        smtpPassword: finalPassword,
        adminEmail,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Email settings updated successfully',
      settings: {
        smtpHost: settings.smtpHost,
        smtpPort: settings.smtpPort,
        smtpSecure: settings.smtpSecure,
        smtpUser: settings.smtpUser,
        adminEmail: settings.adminEmail,
      },
    })
  } catch (error) {
    console.error('Error updating email settings:', error)
    return NextResponse.json(
      { error: 'Failed to update email settings' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(handleGet)
export const POST = withAuth(handlePost)