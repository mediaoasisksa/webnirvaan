import { prisma } from './prisma'

export interface EmailConfig {
  smtpHost: string
  smtpPort: number
  smtpSecure: boolean
  smtpUser: string
  smtpPassword: string
  adminEmail: string
}

export const getEmailConfig = async (): Promise<EmailConfig | null> => {
  try {
    const settings = await prisma.emailSettings.findUnique({
      where: { id: 'default' },
    })

    if (settings) {
      return {
        smtpHost: settings.smtpHost,
        smtpPort: settings.smtpPort,
        smtpSecure: settings.smtpSecure,
        smtpUser: settings.smtpUser,
        smtpPassword: settings.smtpPassword,
        adminEmail: settings.adminEmail,
      }
    }

    // Fallback to environment variables
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.ADMIN_EMAIL
    ) {
      return {
        smtpHost: process.env.SMTP_HOST,
        smtpPort: parseInt(process.env.SMTP_PORT || '587'),
        smtpSecure: process.env.SMTP_SECURE === 'true',
        smtpUser: process.env.SMTP_USER,
        smtpPassword: process.env.SMTP_PASSWORD,
        adminEmail: process.env.ADMIN_EMAIL,
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching email config:', error)
    return null
  }
}
