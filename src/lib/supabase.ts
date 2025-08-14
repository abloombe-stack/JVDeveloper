import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

export const createBrowserClient = () => {
  return createClientComponentClient()
}

// Database types
export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  address_json?: Record<string, any>
  role: 'investor' | 'owner' | 'admin'
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  slug: string
  title: string
  city: string
  state: string
  summary?: string
  images: string[]
  status: 'open' | 'planning' | 'construction' | 'sale' | 'completed'
  target_raise: number
  amount_raised: number
  expected_completion?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface OwnerApplication {
  id: string
  owner_user_id: string
  address: string
  has_liens: boolean
  mortgage_balance: number
  lot_size_sqft: number
  status: 'submitted' | 'approved' | 'review' | 'declined'
  underwriting_score?: number
  notes?: string
  consent_timestamp: string
  consent_ip?: string
  consent_user_agent?: string
  created_at: string
  updated_at: string
}

export interface Investment {
  id: string
  investor_user_id: string
  property_id: string
  amount: number
  status: 'pledged' | 'funded' | 'returned'
  created_at: string
  updated_at: string
}

export interface Update {
  id: string
  property_id: string
  title: string
  body: string
  visible_to: 'investors' | 'owners' | 'public'
  created_at: string
}

export interface Document {
  id: string
  property_id: string
  title: string
  url: string
  visible_to: 'investors' | 'owners' | 'public'
  created_at: string
}

export interface AuditLog {
  id: string
  actor_user_id?: string
  action: string
  target_table: string
  target_id?: string
  meta_json: Record<string, any>
  created_at: string
}