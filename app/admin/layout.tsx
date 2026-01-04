'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      if (pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    }
    setLoading(false)
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0 flex items-center">
                <Link 
                  href="/admin" 
                  className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 bg-clip-text text-transparent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="hidden sm:inline">WebNirvaan Admin</span>
                  <span className="sm:hidden">Admin</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/admin"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    pathname === '/admin'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/contacts"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    pathname === '/admin/contacts'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Contacts
                </Link>
                <Link
                  href="/admin/email-settings"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    pathname === '/admin/email-settings'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Email Settings
                </Link>
                <Link
                  href="/admin/email-templates"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    pathname === '/admin/email-templates'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Email Templates
                </Link>
                <Link
                  href="/admin/email-tracking"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    pathname === '/admin/email-tracking'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Email Tracking
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden text-gray-500 hover:text-gray-700 p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === '/admin'
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/contacts"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === '/admin/contacts'
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Contacts
              </Link>
              <Link
                href="/admin/email-settings"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === '/admin/email-settings'
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Email Settings
              </Link>
              <Link
                href="/admin/email-templates"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === '/admin/email-templates'
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Email Templates
              </Link>
              <Link
                href="/admin/email-tracking"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === '/admin/email-tracking'
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Email Tracking
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-4 lg:px-8">
        {children}
      </main>
    </div>
  )
}
