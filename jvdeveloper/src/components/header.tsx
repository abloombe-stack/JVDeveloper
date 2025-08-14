'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Building2 className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">JVDeveloper</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/properties" className="hover:text-blue-200 transition-colors">
              Properties
            </Link>
            <Link href="/become-a-jv-developer" className="hover:text-blue-200 transition-colors">
              Become a JV Developer
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href={session.user.role === 'admin' ? '/admin' : `/dashboard/${session.user.role}`}
                  className="hover:text-blue-200 transition-colors"
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login?role=investor">
                  <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                    Investor Login
                  </Button>
                </Link>
                <Link href="/login?role=owner">
                  <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                    Owner Login
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}