'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DemoBanner from '@/components/demo/DemoBanner'
import DemoSidebar from '@/components/demo/DemoSidebar'
import { DEMO_SESSION_KEY } from '@/lib/demo/demoData'

const LOGIN_PATH = '/demo/promoteur'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === LOGIN_PATH
  const [checked, setChecked] = useState(false)

  // Garde d'auth simulée (client) : pages protégées => session requise.
  // sessionStorage n'est lisible qu'après montage, d'où le passage par un état.
  useEffect(() => {
    if (!isLogin) {
      const authed = sessionStorage.getItem(DEMO_SESSION_KEY) === 'ok'
      if (!authed) {
        router.replace(LOGIN_PATH)
        return
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- déverrouillage du rendu après vérification de session côté client
    setChecked(true)
  }, [isLogin, pathname, router])

  // Page de connexion : plein écran, sans sidebar.
  if (isLogin) {
    return (
      <div className="min-h-screen flex flex-col">
        <DemoBanner />
        {children}
      </div>
    )
  }

  // Évite le flash de contenu protégé avant la vérification de session.
  if (!checked) {
    return (
      <div className="min-h-screen flex flex-col">
        <DemoBanner />
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Chargement de l’espace promoteur…
        </div>
      </div>
    )
  }

  // Espace authentifié : bandeau + sidebar + contenu.
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f6]">
      <DemoBanner />
      <div className="flex flex-1 flex-col md:flex-row">
        <DemoSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
