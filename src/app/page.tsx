import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PropertyCard } from '@/components/property-card'
import { createServerClient } from '@/lib/supabase'
import { Trophy, DollarSign, Zap, Shield } from 'lucide-react'

export default async function HomePage() {
  const supabase = createServerClient()
  
  // Fetch featured properties
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .in('status', ['open', 'construction', 'sale'])
    .limit(3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Become a JV Developer — We Handle Everything. You Collect the Profit.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
            From first-time homeowners to seasoned investors — if you own the property, 
            we can turn it into a profitable development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/become-a-jv-developer">
              <Button variant="cta" size="xl">
                Become a JV Developer
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="cta-secondary" size="xl">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Current Investment Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            Current Investment Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/properties" className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">You Bring the Property</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit your property details. Our system instantly evaluates development potential and profitability.
              </p>
              <div className="hidden md:block absolute top-8 -right-4 text-3xl text-blue-600 font-bold">
                →
              </div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">We Raise the Money & Build</h3>
              <p className="text-gray-600 leading-relaxed">
                We secure all funding, handle permits, and manage construction. You remain the owner throughout.
              </p>
              <div className="hidden md:block absolute top-8 -right-4 text-3xl text-blue-600 font-bold">
                →
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">We Sell & Share Profits</h3>
              <p className="text-gray-600 leading-relaxed">
                Upon completion, we sell the development and share profits with you as the JV partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Audience Explainers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-green-500 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-700">New to Development?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  <strong>No experience needed.</strong> We walk you through every step from initial assessment to final profit distribution.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Simple property qualification process
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    We handle all complex paperwork and permits
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Regular updates in plain English
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Risk-free assessment of your property
                  </li>
                </ul>
                <p className="italic text-green-700">
                  We hold your hand from start to finish.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-700">Experienced Owner?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  <strong>Full-service JV management</strong> — underwriting, permitting, construction, and sales under one roof.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    Professional capital stack management
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    Institutional-grade construction oversight
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    Investor-level reporting and transparency
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    Proven exit strategy execution
                  </li>
                </ul>
                <p className="italic text-purple-700">
                  Capital stack, construction management, and sales strategy handled by seasoned professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">
            Trusted Process, Proven Results
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Trusted by both first-time homeowners and experienced property investors.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">50+ Completed Projects</h3>
              <p className="text-gray-600">Successful developments from coast to coast</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">$25M+ in Profits</h3>
              <p className="text-gray-600">Distributed to property owner partners</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Underwriting</h3>
              <p className="text-gray-600">Instant property assessment and qualification</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Full Transparency</h3>
              <p className="text-gray-600">Real-time project tracking and reporting</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}