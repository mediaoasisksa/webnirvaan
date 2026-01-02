import nodemailer from 'nodemailer'
import { getEmailConfig } from './email-config'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Create reusable transporter
const createTransporter = async () => {
  const config = await getEmailConfig()
  
  if (!config) {
    throw new Error('Email configuration not found')
  }

  // Use database configuration or environment variables
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure, // true for 465, false for other ports
    auth: {
      user: config.smtpUser,
      pass: config.smtpPassword,
    },
  })
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const config = await getEmailConfig()
  
  // If email is not configured, log to console in development
  if (!config) {
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email not configured. Email would be sent:')
      console.log('To:', options.to)
      console.log('Subject:', options.subject)
      console.log('Body:', options.text || options.html)
    }
    return
  }

  try {
    const transporter = await createTransporter()
    
    await transporter.sendMail({
      from: `"WebNirvaan" <${config.smtpUser}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export const sendContactNotification = async (contactData: {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}) => {
  const config = await getEmailConfig()
  const adminEmail = config?.adminEmail || 'admin@webnirvaan.com'
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #7c3aed; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${contactData.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${contactData.email}</div>
          </div>
          ${contactData.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${contactData.phone}</div>
          </div>
          ` : ''}
          ${contactData.service ? `
          <div class="field">
            <div class="label">Service Interested In:</div>
            <div class="value">${contactData.service}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${contactData.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the WebNirvaan contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}\n` : ''}
${contactData.service ? `Service: ${contactData.service}\n` : ''}
Message:
${contactData.message}
  `.trim()

  await sendEmail({
    to: adminEmail,
    subject: `New Contact Form Submission from ${contactData.name}`,
    html,
    text,
  })
}

export const sendContactConfirmation = async (email: string, name: string) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Thank You for Contacting Us!</h2>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to WebNirvaan. We have received your message and will get back to you as soon as possible.</p>
          <p>Our team typically responds within 24-48 hours.</p>
          <p>Best regards,<br>The WebNirvaan Team</p>
        </div>
        <div class="footer">
          <p>This is an automated confirmation email.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Thank You for Contacting Us!

Dear ${name},

Thank you for reaching out to WebNirvaan. We have received your message and will get back to you as soon as possible.

Our team typically responds within 24-48 hours.

Best regards,
The WebNirvaan Team
  `.trim()

  await sendEmail({
    to: email,
    subject: 'Thank You for Contacting WebNirvaan',
    html,
    text,
  })
}
