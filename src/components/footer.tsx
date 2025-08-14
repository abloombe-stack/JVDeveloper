import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JVDeveloper</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional joint venture development partnerships for property owners and investors.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Home
              </Link>
              <Link href="/become-a-jv-developer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Become a JV Developer
              </Link>
              <Link href="/properties" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Properties
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: info@jvdeveloper.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>123 Business Ave, Suite 100<br />Austin, TX 78701</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/legal/terms" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal/privacy" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/disclosures" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Investment Disclosures
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center text-sm text-gray-400">
            <p className="mb-4">
              <strong>Investment Risk Disclosure:</strong> Real estate investments carry risk. 
              Timelines, approvals, and returns are not guaranteed. Market conditions, permit delays, 
              construction costs, and other factors can affect project outcomes. All investment decisions 
              should be made after careful consideration of your financial situation.
            </p>
            <p>&copy; 2024 JVDeveloper. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}