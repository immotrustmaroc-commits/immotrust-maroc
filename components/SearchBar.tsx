'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { villes, typesProjet } from '@/lib/data'

export default function SearchBar() {
  const [ville, setVille] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [score, setScore] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push('/#projets')
  }

  const fieldClass =
    'w-full text-sm text-gray-700 bg-transparent border-0 focus:outline-none focus:ring-0 appearance-none cursor-pointer py-1'

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-gray-100">

        {/* Ville */}
        <div className="flex-1 px-4 py-3 min-w-0">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ville</label>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2" className="shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <select value={ville} onChange={(e) => setVille(e.target.value)} className={fieldClass}>
              <option value="">Toutes les villes</option>
              {villes.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        {/* Type */}
        <div className="flex-1 px-4 py-3 min-w-0">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Type de projet</label>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2" className="shrink-0">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
              <option value="">Tous types</option>
              {typesProjet.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Date de livraison */}
        <div className="flex-1 px-4 py-3 min-w-0">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Date de livraison</label>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2" className="shrink-0">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <select value={date} onChange={(e) => setDate(e.target.value)} className={fieldClass}>
              <option value="">Toutes dates</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027+">2027+</option>
            </select>
          </div>
        </div>

        {/* Score de confiance */}
        <div className="flex-1 px-4 py-3 min-w-0">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Score de confiance</label>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2" className="shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <select value={score} onChange={(e) => setScore(e.target.value)} className={fieldClass}>
              <option value="">Tous les scores</option>
              <option value="90">Excellent (90+)</option>
              <option value="80">Très fiable (80+)</option>
              <option value="70">Fiable (70+)</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="px-4 py-3 flex flex-col justify-center gap-1 shrink-0">
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary-800 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            Rechercher
          </button>
          <button type="button" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Recherche avancée
          </button>
        </div>
      </div>
    </form>
  )
}
