import { Resend } from 'resend'
import { OwnerWelcomeEmail } from '@/emails/owner-welcome'
import { OwnerReviewEmail } from '@/emails/owner-review'
import { OwnerDeclinedEmail } from '@/emails/owner-declined'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  to: string
  template: 'owner-welcome' | 'owner-review' | 'owner-declined' | 'investor-welcome' | 'cancellation'
  data: Record<string, any>
}

export async function sendEmail({ to, template, data }: EmailData) {
  let subject: string
  let react: React.ReactElement

  switch (template) {
    case 'owner-welcome':
      subject = 'Welcome to JVDeveloper — Your Partner in Property Profits'
      react = OwnerWelcomeEmail(data)
      break
    case 'owner-review':
      subject = 'Thanks — we\'re reviewing your property'
      react = OwnerReviewEmail(data)
      break
    case 'owner-declined':
      subject = 'About your JVDeveloper application'
      react = OwnerDeclinedEmail(data)
      break
    default:
      throw new Error(`Unknown email template: ${template}`)
  }

  try {
    const { data: result, error } = await resend.emails.send({
      from: 'JVDeveloper <noreply@jvdeveloper.com>',
      to,
      subject,
      react,
    })

    if (error) {
      console.error('Email send error:', error)
      throw error
    }

    return result
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}