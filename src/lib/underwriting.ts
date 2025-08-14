import { createServerClient } from './supabase'
import { sendEmail } from './email'

export interface UnderwritingInput {
  address: string
  hasLiens: boolean
  mortgageBalance: number
  lotSizeSqft: number
  email: string
  phone: string
  userId: string
  consentIp?: string
  consentUserAgent?: string
}

export interface UnderwritingResult {
  status: 'approved' | 'review' | 'declined'
  score: number
  reasons: string[]
}

export async function performUnderwriting(input: UnderwritingInput): Promise<UnderwritingResult> {
  const score = calculatePropertyScore(input)
  const reasons = generateReasons(input, score)
  
  let status: 'approved' | 'review' | 'declined'
  if (score >= 75) {
    status = 'approved'
  } else if (score >= 55) {
    status = 'review'
  } else {
    status = 'declined'
  }

  // Save application to database
  const supabase = createServerClient()
  const { data: application, error } = await supabase
    .from('owner_applications')
    .insert({
      owner_user_id: input.userId,
      address: input.address,
      has_liens: input.hasLiens,
      mortgage_balance: input.mortgageBalance,
      lot_size_sqft: input.lotSizeSqft,
      status,
      underwriting_score: score,
      notes: reasons.join('; '),
      consent_ip: input.consentIp,
      consent_user_agent: input.consentUserAgent,
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving application:', error)
    throw new Error('Failed to save application')
  }

  // Log audit trail
  await supabase.from('audit_logs').insert({
    actor_user_id: input.userId,
    action: 'underwriting_completed',
    target_table: 'owner_applications',
    target_id: application.id,
    meta_json: { score, status, reasons },
  })

  // Send appropriate email
  try {
    if (status === 'approved') {
      await sendEmail({
        to: input.email,
        template: 'owner-welcome',
        data: {
          firstName: input.email.split('@')[0],
          address: input.address,
          score,
        },
      })
    } else if (status === 'review') {
      await sendEmail({
        to: input.email,
        template: 'owner-review',
        data: {
          firstName: input.email.split('@')[0],
          address: input.address,
          score,
        },
      })
    } else {
      await sendEmail({
        to: input.email,
        template: 'owner-declined',
        data: {
          firstName: input.email.split('@')[0],
          address: input.address,
          score,
        },
      })
    }
  } catch (emailError) {
    console.error('Error sending email:', emailError)
    // Don't throw - application was saved successfully
  }

  return { status, score, reasons }
}

function calculatePropertyScore(input: UnderwritingInput): number {
  let score = 40 // Base score

  // Lot size assessment (major factor)
  if (input.lotSizeSqft >= 10000) score += 25
  else if (input.lotSizeSqft >= 7500) score += 20
  else if (input.lotSizeSqft >= 5000) score += 15
  else if (input.lotSizeSqft >= 3000) score += 10
  else if (input.lotSizeSqft >= 2000) score += 5

  // Mortgage balance assessment
  if (input.mortgageBalance === 0) score += 20
  else if (input.mortgageBalance < 150000) score += 15
  else if (input.mortgageBalance < 300000) score += 10
  else if (input.mortgageBalance < 500000) score += 5

  // Liens assessment (critical factor)
  if (!input.hasLiens) {
    score += 15
  } else {
    score -= 10 // Liens significantly impact qualification
  }

  // Location scoring based on address (simplified)
  const address = input.address.toLowerCase()
  if (address.includes('austin') || address.includes('denver') || 
      address.includes('nashville') || address.includes('miami')) {
    score += 10 // High-growth markets
  } else if (address.includes('tx') || address.includes('co') || 
             address.includes('tn') || address.includes('fl')) {
    score += 5 // Good state markets
  }

  // Add deterministic randomization based on address hash
  const addressHash = hashString(input.address)
  const marketVariation = ((addressHash % 30) - 15) // -15 to +15
  score += marketVariation

  return Math.max(10, Math.min(95, score))
}

function generateReasons(input: UnderwritingInput, score: number): string[] {
  const reasons: string[] = []

  if (input.lotSizeSqft >= 7500) {
    reasons.push('Excellent lot size for development')
  } else if (input.lotSizeSqft >= 3000) {
    reasons.push('Good lot size potential')
  } else {
    reasons.push('Limited lot size may restrict development options')
  }

  if (input.mortgageBalance === 0) {
    reasons.push('No existing mortgage provides maximum flexibility')
  } else if (input.mortgageBalance > 500000) {
    reasons.push('High mortgage balance may impact project economics')
  }

  if (input.hasLiens) {
    reasons.push('Existing liens require resolution before development')
  }

  const address = input.address.toLowerCase()
  if (address.includes('austin') || address.includes('denver') || 
      address.includes('nashville') || address.includes('miami')) {
    reasons.push('Located in high-growth market')
  }

  if (score >= 75) {
    reasons.push('Strong overall development potential')
  } else if (score >= 55) {
    reasons.push('Moderate development potential requiring review')
  } else {
    reasons.push('Limited development potential under current criteria')
  }

  return reasons
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}