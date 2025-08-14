import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OwnerApplicationForm } from './owner-application-form'

export default function BecomeJVDeveloperPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-900">
          Become a JV Developer
        </h1>
        
        {/* Dual Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-green-500 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-700">No Experience Needed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We walk you through every step of the development process. From initial property assessment 
                to final profit distribution, our team handles all the complexity while keeping you informed 
                and in control.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-700">Full-Service JV Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Underwriting, permitting, construction, and sales under one roof. Our experienced team 
                provides institutional-grade execution with transparent reporting throughout the entire 
                development cycle.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <OwnerApplicationForm />

        {/* Process Breakdown */}
        <div className="bg-gray-50 rounded-2xl p-8 mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
            Our Complete Process
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Submit Your Property Info</h4>
                <p className="text-gray-600">Complete our simple form with basic property details. Takes less than 3 minutes.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Fast Underwriting + Human Review</h4>
                <p className="text-gray-600">Our system instantly evaluates your property for development potential. Our team reviews all qualifying properties within 48 hours.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">JV Agreement Sent if Approved</h4>
                <p className="text-gray-600">Approved properties receive a detailed JV agreement outlining the partnership terms, profit sharing, and timeline.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">We Raise Capital, Build, and Sell</h4>
                <p className="text-gray-600">We handle all aspects: investor capital raising, permitting, construction management, and final sales process.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                5
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">You Receive Your Share of Profits</h4>
                <p className="text-gray-600">Upon successful sale, investor capital is recouped first, then profits are distributed according to the JV agreement.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclosure Boxes */}
        <div className="space-y-6 mt-12">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
              🏗️ Project Control & Exit Strategy
            </h4>
            <p className="text-blue-800">
              All projects are sold immediately upon completion. JVDeveloper controls the listing agent, 
              sale price, and timing to protect investor capital recovery before profit distribution. 
              This ensures professional execution and maximum returns for all parties.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-amber-900 mb-2 flex items-center">
              ⚠️ Investment Risk Disclosure
            </h4>
            <p className="text-amber-800">
              Real estate development investments carry inherent risks. Timelines, approvals, and returns 
              are not guaranteed. Market conditions, permit delays, construction costs, and other factors 
              can affect project outcomes. All investment decisions should be made after careful consideration 
              of your financial situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}