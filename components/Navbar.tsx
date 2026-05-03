'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/promoteurs', label: 'Promoteurs' },
  { href: '/#projets', label: 'Projets' },
  { href: '/#avancement', label: 'Suivi chantier' },
  { href: '/documents', label: 'Rapports' },
  { href: '/partenaire', label: 'Devenir partenaire' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="ImmoTrust Maroc" width={140} height={40} className="h-10 w-auto" priority />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href
                    ? 'text-primary-700 font-semibold'
                    : 'text-gray-600 hover:text-primary-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
              FR
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="w-px h-5 bg-gray-200" />
            <Link
              href="/documents"
              className="flex items-center gap-2 text-sm font-semibold text-primary-700 border border-primary-700 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Connexion
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 rounded-md hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-primary-700 font-medium py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/documents"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 text-primary-700 border border-primary-700 font-semibold py-2.5 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Connexion
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
