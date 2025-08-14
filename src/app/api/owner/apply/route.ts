import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase'
import { performUnderwriting } from '@/lib/underwriting'

const applicationSchema = z.object({
  address: z.string().min(10, 'Address must be at least 10 characters'),
  hasLiens: z.boolean(),
  mortgageBalance: z.number().min(0, 'Mortgage balance must be non-negative'),
  lotSizeSqft: z.number().min(1000, 'Lot size must be at least 1,000 sq ft'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  riskConsent: z.boolean().refine(val => val === true, 'Risk consent is required'),
  exitConsent: z.boolean().refine(val => val === true, 'Exit strategy consent is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = applicationSchema.parse(body)

    // Get client IP and user agent for consent tracking
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const supabase = createServerClient()

    // Check if user exists, create if not
    let { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', validatedData.email)
      .single()

    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: validatedData.email,
          phone: validatedData.phone,
          role: 'owner',
        })
        .select('id')
        .single()

      if (userError) {
        console.error('Error creating user:', userError)
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        )
      }

      user = newUser
    }

    // Perform underwriting
    const result = await performUnderwriting({
      address: validatedData.address,
      hasLiens: validatedData.hasLiens,
      mortgageBalance: validatedData.mortgageBalance,
      lotSizeSqft: validatedData.lotSizeSqft,
      email: validatedData.email,
      phone: validatedData.phone,
      userId: user.id,
      consentIp: clientIp,
      consentUserAgent: userAgent,
    })

    return NextResponse.json({
      status: result.status,
      score: result.score,
      message: 'Application processed successfully',
    })

  } catch (error) {
    console.error('Application processing error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}