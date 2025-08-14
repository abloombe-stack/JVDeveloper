export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Last updated: December 2024</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using JVDeveloper's services, you accept and agree to be bound by the terms 
              and provision of this agreement. These Terms of Service govern your use of our platform and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              JVDeveloper provides a platform connecting property owners with development opportunities 
              and investors. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Property evaluation and underwriting services</li>
              <li>Joint venture partnership facilitation</li>
              <li>Development project management</li>
              <li>Investor relations and capital raising</li>
              <li>Construction oversight and sales management</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">3. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users of our platform agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in fraudulent or misleading activities</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">4. Investment Risks</h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
              <p className="text-amber-800 font-semibold mb-2">Important Risk Disclosure:</p>
              <p className="text-amber-800">
                Real estate development investments carry inherent risks. Past performance does not guarantee 
                future results. Timelines, approvals, and returns are not guaranteed. Market conditions, 
                permit delays, construction costs, and other factors can significantly affect project outcomes.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              JVDeveloper shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages, including without limitation, loss of profits, data, use, goodwill, or 
              other intangible losses, resulting from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">6. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting to our website. Your continued use of our services constitutes acceptance of 
              any modifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">7. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 text-gray-700">
              <p>Email: legal@jvdeveloper.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Business Ave, Suite 100, Austin, TX 78701</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}