'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export function OwnerApplicationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{
    status: 'approved' | 'review' | 'declined'
    score: number
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      address: formData.get('address') as string,
      hasLiens: formData.get('hasLiens') === 'yes',
      mortgageBalance: parseInt(formData.get('mortgageBalance') as string),
      lotSizeSqft: parseInt(formData.get('lotSizeSqft') as string),
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      riskConsent: formData.get('riskConsent') === 'on',
      exitConsent: formData.get('exitConsent') === 'on',
    }

    try {
      const response = await fetch('/api/owner/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (response.ok) {
        setResult({
          status: result.status,
          score: result.score,
          message: getResultMessage(result.status, result.score)
        })
      } else {
        throw new Error(result.error || 'Application failed')
      }
    } catch (error) {
      console.error('Application error:', error)
      setResult({
        status: 'declined',
        score: 0,
        message: 'There was an error processing your application. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getResultMessage = (status: string, score: number) => {
    switch (status) {
      case 'approved':
        return `🎉 Congratulations! Your property qualifies for our JV development program with a score of ${score}/100. Our team will contact you within 24 hours with your JV agreement and next steps.`
      case 'review':
        return `📋 Thank you for your submission! Your property scored ${score}/100 and requires additional review. Our underwriting team will contact you within 48 hours to discuss your options.`
      case 'declined':
        return `Thank you for your interest in JVDeveloper. Your property scored ${score}/100. Based on our initial assessment, your property may not meet our current development criteria, but our team will still contact you to discuss alternative options.`
      default:
        return 'Application processed successfully.'
    }
  }

  if (result) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {result.status === 'approved' ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-600" />
            )}
            <span>Application {result.status === 'approved' ? 'Approved' : 'Received'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className={result.status === 'approved' ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}>
            <AlertDescription className="text-sm leading-relaxed">
              {result.message}
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Button onClick={() => router.push('/')} variant="outline">
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-blue-900">Are You a Candidate?</CardTitle>
        <p className="text-center text-gray-600">
          Submit your property details for instant evaluation and qualification assessment.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Property Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Enter your complete property address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="hasLiens" className="block text-sm font-medium text-gray-700 mb-2">
              Do you have any liens on the property? *
            </label>
            <select
              id="hasLiens"
              name="hasLiens"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div>
            <label htmlFor="mortgageBalance" className="block text-sm font-medium text-gray-700 mb-2">
              Current Mortgage Balance *
            </label>
            <input
              type="number"
              id="mortgageBalance"
              name="mortgageBalance"
              required
              min="0"
              placeholder="Enter amount (e.g., 250000)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="lotSizeSqft" className="block text-sm font-medium text-gray-700 mb-2">
              Lot Size (square feet) *
            </label>
            <input
              type="number"
              id="lotSizeSqft"
              name="lotSizeSqft"
              required
              min="1000"
              placeholder="Enter lot size in square feet"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="(555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="riskConsent"
                name="riskConsent"
                required
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="riskConsent" className="text-sm text-gray-700">
                I understand investments carry risk; timelines/approvals/returns are not guaranteed. *
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="exitConsent"
                name="exitConsent"
                required
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="exitConsent" className="text-sm text-gray-700">
                Exit strategy is sale upon completion; JVDeveloper controls listing agent, price, and sale timing to recoup investor costs before profit distribution. *
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-md transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Application...
              </>
            ) : (
              'Submit for Fast Evaluation'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}