export default function DisclosuresPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Investment Disclosures</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Last updated: December 2024</p>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-red-900 mb-2">⚠️ Important Risk Warning</h2>
            <p className="text-red-800 font-medium">
              Real estate development investments are speculative and carry significant risk of loss. 
              You should not invest money that you cannot afford to lose entirely.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">1. Investment Risks</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Real estate development investments involve substantial risks, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Market Risk:</strong> Property values may decline due to market conditions</li>
              <li><strong>Construction Risk:</strong> Cost overruns, delays, and quality issues</li>
              <li><strong>Regulatory Risk:</strong> Permit delays, zoning changes, and regulatory compliance</li>
              <li><strong>Liquidity Risk:</strong> Difficulty selling properties in adverse market conditions</li>
              <li><strong>Interest Rate Risk:</strong> Rising interest rates may affect project financing</li>
              <li><strong>Economic Risk:</strong> Economic downturns may impact demand and pricing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">2. No Guarantees</h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
              <p className="text-amber-800 mb-4">
                <strong>JVDeveloper makes no guarantees regarding:</strong>
              </p>
              <ul className="list-disc pl-6 text-amber-800 space-y-2">
                <li>Investment returns or profitability</li>
                <li>Project completion timelines</li>
                <li>Permit approval or regulatory compliance</li>
                <li>Market conditions or property values</li>
                <li>Ability to sell completed developments</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">3. Exit Strategy and Control</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-blue-800 mb-4">
                <strong>Important Control Provisions:</strong>
              </p>
              <ul className="list-disc pl-6 text-blue-800 space-y-2">
                <li>All projects are sold immediately upon completion</li>
                <li>JVDeveloper controls the listing agent, sale price, and timing</li>
                <li>This control ensures investor capital recovery before profit distribution</li>
                <li>Property owners cannot unilaterally decide to retain completed developments</li>
                <li>Sale proceeds first repay investor capital, then distribute profits per JV agreement</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">4. Financial Considerations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before investing, carefully consider:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Your overall financial situation and investment objectives</li>
              <li>Your ability to withstand potential losses</li>
              <li>The illiquid nature of real estate investments</li>
              <li>Tax implications of real estate investments</li>
              <li>The speculative nature of development projects</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">5. Due Diligence</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Investors and property owners should:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Conduct independent research and analysis</li>
              <li>Consult with financial, legal, and tax advisors</li>
              <li>Review all project documents and agreements</li>
              <li>Understand local market conditions and regulations</li>
              <li>Assess the experience and track record of the development team</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibent mb-4 text-blue-900">6. Regulatory Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              This platform and its offerings may be subject to federal and state securities laws. 
              JVDeveloper strives to comply with all applicable regulations. However, regulatory 
              requirements may change, and compliance does not eliminate investment risks.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">7. Contact for Questions</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these disclosures or need clarification about any risks, 
              please contact us before making any investment decisions:
            </p>
            <div className="mt-4 text-gray-700">
              <p>Email: compliance@jvdeveloper.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Business Ave, Suite 100, Austin, TX 78701</p>
            </div>
          </section>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mt-8">
            <p className="text-sm text-gray-600 italic">
              <strong>Disclaimer:</strong> This disclosure document is for informational purposes only 
              and does not constitute investment, legal, or tax advice. Past performance is not indicative 
              of future results. All investments involve risk of loss, including the potential loss of 
              principal invested.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}