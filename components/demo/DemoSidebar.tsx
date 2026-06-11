'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { DEMO_SESSION_KEY, demoPromoter } from '@/lib/demo/demoData'
import { useDemoStore } from '@/lib/demo/demoStore'

const promoterLinks = [
  { href: '/demo/promoteur/dashboard', label: 'Tableau de bord', icon: 'grid' },
  { href: '/demo/promoteur/simulation', label: 'Simulateur de score', icon: 'chart' },
  { href: '/demo/promoteur/chantier', label: 'Fil chantier', icon: 'build' },
  { href: '/demo/promoteur/informations', label: 'Mes informations', icon: 'info' },
]

function Icon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': true } as const
  switch (name) {
    case 'grid':
      return <svg {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
    case 'chart':
      return <svg {...common}><path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" /></svg>
    case 'build':
      return <svg {...common}><path d="M2 20h20M4 20V8l8-5 8 5v12M9 20v-6h6v6" /></svg>
    case 'info':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
    case 'shield':
      return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
    default:
      return null
  }
}

export default function DemoSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pending } = useDemoStore()

  function logout() {
    if (typeof window !== 'undefined') sessionStorage.removeItem(DEMO_SESSION_KEY)
    router.push('/demo/promoteur')
  }

  function navLink(l: { href: string; label: string; icon: string }, opts?: { badge?: number }) {
    const active = pathname === l.href
    return (
      <Link
        key={l.href}
        href={l.href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          active ? 'bg-white text-primary-800' : 'text-primary-100 hover:bg-primary-800/50'
        }`}
      >
        <Icon name={l.icon} />
        <span className="flex-1">{l.label}</span>
        {opts?.badge ? (
          <span className="shrink-0 min-w-5 h-5 px-1.5 inline-flex items-center justify-center rounded-full bg-[#cc2200] text-white text-[11px] font-bold">
            {opts.badge}
          </span>
        ) : null}
      </Link>
    )
  }

  const nav = (
    <>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-primary-800/40">
        <Image src="/logo-ImmoTrust-Maroc-for-dark-background.png" alt="ImmoTrust Maroc" width={113} height={34} className="h-8 w-auto" style={{ width: 'auto' }} />
      </div>

      <div className="px-4 py-4 border-b border-primary-800/40">
        <div className="text-[11px] uppercase tracking-wider text-primary-300">Espace promoteur</div>
        <div className="font-semibold text-white mt-0.5">{demoPromoter.name}</div>
        <div className="text-xs text-primary-200/70">{demoPromoter.city}</div>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {promoterLinks.map((l) => navLink(l))}

        {/* Section ADMIN IMMOTRUST — distincte, marquée DÉMO */}
        <div className="pt-4 mt-2 border-t border-primary-800/40">
          <div className="flex items-center gap-2 px-3 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff8a73]">Admin ImmoTrust</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-primary-300 bg-primary-800/60 px-1.5 py-0.5 rounded">Démo</span>
          </div>
          {navLink(
            { href: '/demo/promoteur/validation', label: 'Validations', icon: 'shield' },
            { badge: pending.length },
          )}
        </div>
      </nav>

      <div className="px-2 py-3 border-t border-primary-800/40">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-100 hover:bg-primary-800/50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Déconnexion
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Barre mobile */}
      <div className="md:hidden flex items-center justify-between bg-primary-900 text-white px-4 py-3">
        <Image src="/logo-ImmoTrust-Maroc-for-dark-background.png" alt="ImmoTrust Maroc" width={100} height={30} className="h-7 w-auto" style={{ width: 'auto' }} />
        <button onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu" className="p-1.5 rounded-md hover:bg-primary-800 relative">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          {pending.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 inline-flex items-center justify-center rounded-full bg-[#cc2200] text-white text-[10px] font-bold">
              {pending.length}
            </span>
          )}
        </button>
      </div>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 max-w-[80%] bg-primary-900 flex flex-col">
            <button onClick={() => setMobileOpen(false)} aria-label="Fermer" className="absolute top-4 right-3 text-white/80 hover:text-white z-10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            {nav}
          </div>
        </div>
      )}

      {/* Sidebar desktop fixe */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-primary-900 min-h-full">
        {nav}
      </aside>
    </>
  )
}
