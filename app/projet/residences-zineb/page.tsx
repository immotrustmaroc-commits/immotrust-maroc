'use client'

import Link from 'next/link'
import { useDemoStore } from '@/lib/demo/demoStore'
import { getProjet } from '@/lib/data'

// Faits statiques de la fiche (prix, surface, unités…) — les parties vivantes
// (infos société, avancement, fil chantier) viennent du store démo.
const projet = getProjet('residences-zineb')!

function scoreColor(s: number) {
  if (s >= 75) return '#1a3a2a'
  if (s >= 50) return '#e87722'
  return '#cc2200'
}
function scoreLabel(s: number) {
  if (s >= 75) return 'Excellent'
  if (s >= 50) return 'Fiable'
  return 'Vigilance'
}
function formatPrice(p: number) {
  if (p >= 1000000) return `${(p / 1000000).toFixed(2)}M MAD`
  return `${(p / 1000).toFixed(0)}K MAD`
}
function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const phaseDefs = [
  { label: 'Fondations', done: 15, current: 0 },
  { label: 'Gros œuvre', done: 70, current: 15 },
  { label: 'Façade', done: 85, current: 60 },
  { label: 'Finitions', done: 97, current: 80 },
  { label: 'Livraison', done: 100, current: 99 },
]
function phaseState(p: number, def: { done: number; current: number }) {
  if (p >= def.done) return 'done'
  if (p >= def.current) return 'current'
  return 'upcoming'
}

export default function ResidencesZinebPage() {
  const { published } = useDemoStore()
  const info = published.info
  const progress = published.progress
  const score = published.score
  const scoreLabelColor = scoreColor(score) === '#e87722' ? '#b8560f' : scoreColor(score)
  const venduPct = Math.round((projet.unitesVendues / projet.totalUnites) * 100)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/#projets" className="hover:text-primary-700 transition-colors">Projets</Link>
            <span>/</span>
            <span className="text-gray-500">{info.city}</span>
            <span>/</span>
            <span className="text-gray-800 font-medium">{projet.titre}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Photo */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden h-64 lg:h-80 relative flex items-end"
                style={{ background: `linear-gradient(160deg, ${projet.couleur2} 0%, ${projet.couleur} 100%)` }}>
                <div className="absolute inset-0 opacity-15">
                  <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
                    <rect x="30" y="60" width="40" height="240" fill="white" rx="3" />
                    <rect x="90" y="100" width="55" height="200" fill="white" rx="3" />
                    <rect x="165" y="40" width="70" height="260" fill="white" rx="3" />
                    <rect x="255" y="80" width="50" height="220" fill="white" rx="3" />
                    <rect x="320" y="120" width="50" height="180" fill="white" rx="3" />
                  </svg>
                </div>
                <div className="relative p-5 text-white">
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full">
                    {projet.type} · {projet.surface}
                  </span>
                </div>
              </div>
            </div>

            {/* Infos */}
            <div className="lg:col-span-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{projet.titre}</h1>
                  <p className="text-gray-500 mt-1">
                    par <span className="font-semibold text-gray-700">{info.name}</span> · {projet.quartier}, {info.city}
                  </p>
                </div>
                {/* Score */}
                <div className="shrink-0 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold transition-colors duration-500"
                    style={{ backgroundColor: scoreColor(score) }}>
                    {score}
                  </div>
                  <div className="text-[11px] font-semibold mt-1 transition-colors duration-500" style={{ color: scoreLabelColor }}>
                    {scoreLabel(score)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  Promoteur vérifié
                </span>
                <span className="inline-flex items-center text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                  ICE {info.ice}
                </span>
              </div>

              {/* Faits clés */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  { label: 'Prix', value: `${formatPrice(projet.prixMin)}` },
                  { label: 'Surface', value: projet.surface },
                  { label: 'Livraison', value: projet.livraison },
                  { label: 'Vendus', value: `${venduPct}%` },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2.5">
                    <div className="text-sm font-bold text-gray-900">{f.value}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{f.label}</div>
                  </div>
                ))}
              </div>

              <button className="mt-5 inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                Suivre ce projet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avancement + fil */}
        <div className="lg:col-span-2 space-y-6">
          {/* Avancement (LIVE) */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Avancement des travaux</h2>
            <div className="flex items-end justify-between mb-1.5">
              <span className="text-sm text-gray-500">Progression globale</span>
              <span className="text-2xl font-bold" style={{ color: '#155e38' }}>{progress}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%`, backgroundColor: '#155e38' }} />
            </div>

            {/* Phases */}
            <div className="grid grid-cols-5 gap-2 mt-6">
              {phaseDefs.map((ph) => {
                const st = phaseState(progress, ph)
                const color = st === 'done' ? '#155e38' : st === 'current' ? '#e87722' : '#d1d5db'
                return (
                  <div key={ph.label} className="text-center">
                    <div className="mx-auto w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: st === 'upcoming' ? '#f3f4f6' : color }}>
                      {st === 'done' ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                      ) : st === 'current' ? (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                      )}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 mt-1.5 leading-tight">{ph.label}</div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Fil chantier (LIVE) */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Fil du chantier</h2>
            <ol className="relative border-l-2 border-gray-100 ml-2 space-y-5">
              {published.chantier.map((u) => (
                <li key={u.id} className="ml-5">
                  <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-primary-600" />
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 text-sm">{u.title}</h3>
                    <span className="text-[11px] text-gray-500 shrink-0">{formatDate(u.date)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{u.project}</p>
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{u.description}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Documents (statut) */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-1">Conformité documentaire</h2>
            <p className="text-xs text-gray-500 mb-4">Seul le statut est publié — les documents originaux ne sont jamais accessibles publiquement.</p>
            <ul className="divide-y divide-gray-100">
              {projet.documents.slice(0, 4).map((d) => (
                <li key={d.nom} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-gray-700">{d.nom}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${d.verifie ? 'bg-primary-50 text-primary-700' : 'bg-amber-50 text-[#b8560f]'}`}>
                    {d.verifie ? 'Vérifié' : 'En attente'}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* À propos (LIVE) */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-6">
            <h2 className="font-bold text-gray-900 mb-3">À propos du promoteur</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="text-gray-700">{info.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="shrink-0"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.19 2.22 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-.55a2 2 0 012.11.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                <span className="text-gray-700">{info.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <span className="text-gray-700">{info.email}</span>
              </div>
            </dl>
            <div className="mt-5 rounded-xl bg-primary-50 border border-primary-100 px-4 py-3">
              <p className="text-xs text-primary-800 leading-relaxed">
                <strong>Vérifié par ImmoTrust.</strong> Les informations et l’avancement de ce projet
                sont contrôlés par nos équipes avant publication.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
