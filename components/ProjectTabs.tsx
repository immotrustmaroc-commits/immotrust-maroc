'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Projet, NiveauRisque } from '@/lib/data'

function niveauColor(n: NiveauRisque) {
  if (n === 'faible') return { bg: 'bg-green-100', text: 'text-green-800' }
  if (n === 'moyen') return { bg: 'bg-amber-100', text: 'text-amber-800' }
  return { bg: 'bg-red-100', text: 'text-red-800' }
}

const PHASES = ['Fondations', 'Gros œuvre', 'Façade', 'Finitions', 'Livraison']

function phaseIndex(avancement: number) {
  if (avancement < 20) return 0
  if (avancement < 40) return 1
  if (avancement < 65) return 2
  if (avancement < 85) return 3
  return 4
}

export default function ProjectTabs({ projet }: { projet: Projet }) {
  const [tab, setTab] = useState<'avancement' | 'documents' | 'risques'>('avancement')
  const currentPhase = phaseIndex(projet.avancement)
  const progressPct = (currentPhase / (PHASES.length - 1)) * 100

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 mb-6 gap-1">
        {([
          { id: 'avancement', label: 'Avancement' },
          { id: 'documents', label: 'Documents' },
          { id: 'risques', label: 'Analyse des risques' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === t.id
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Avancement ── */}
      {tab === 'avancement' && (
        <div className="space-y-8">
          {/* Horizontal timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Avancement du chantier</h3>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                {projet.avancement}% · En cours
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Mis à jour régulièrement par la plateforme et vérifié par l&apos;équipe ImmoTrust Maroc.
            </p>

            {/* Timeline */}
            <div className="relative pt-2 pb-8">
              {/* Background line */}
              <div className="absolute top-5 left-6 right-6 h-0.5 bg-gray-200">
                <div
                  className="h-full bg-primary-600 transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="relative flex justify-between">
                {PHASES.map((phase, i) => {
                  const done = i < currentPhase
                  const current = i === currentPhase
                  return (
                    <div key={phase} className="flex flex-col items-center gap-3" style={{ width: `${100 / PHASES.length}%` }}>
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
                          done
                            ? 'bg-primary-600 border-primary-600'
                            : current
                            ? 'bg-white border-primary-600 ring-4 ring-primary-100'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {done ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : current ? (
                          <div className="w-3 h-3 bg-primary-600 rounded-full" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-300 rounded-full" />
                        )}
                      </div>
                      <span className={`text-xs font-medium text-center leading-tight w-16 ${done || current ? 'text-gray-800' : 'text-gray-500'}`}>
                        {phase}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Timeline events list */}
            <div className="mt-2 space-y-4">
              {projet.timeline.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    event.statut === 'completed' ? 'bg-primary-600' :
                    event.statut === 'current' ? 'bg-amber-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500 font-medium">{event.date}</span>
                      {event.statut === 'completed' && <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full font-medium">Terminé</span>}
                      {event.statut === 'current' && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">En cours</span>}
                      {event.statut === 'upcoming' && <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">À venir</span>}
                    </div>
                    <p className={`text-sm font-semibold mt-0.5 ${event.statut === 'upcoming' ? 'text-gray-500' : 'text-gray-800'}`}>{event.titre}</p>
                    <p className={`text-xs mt-0.5 leading-relaxed ${event.statut === 'upcoming' ? 'text-gray-300' : 'text-gray-500'}`}>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photos chantier */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Mise à jour des réserves — Photos vérifiées</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {projet.photos.map((photo, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-100">
                  <div
                    className="h-28 flex items-end p-2 relative"
                    style={{ background: `linear-gradient(160deg, ${photo.couleur}bb, ${photo.couleur})` }}
                  >
                    <div className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-0.5 rounded-full ${photo.verifie ? 'bg-primary-600' : 'bg-gray-500'}`}>
                      {photo.verifie ? '✓ Vérifié' : 'Non vérifié'}
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-50">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs font-medium text-gray-700 truncate">{photo.titre}</p>
                    <p className="text-xs text-gray-500">{photo.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Documents ── */}
      {tab === 'documents' && (
        <div>
          <div className="flex items-center gap-2 mb-5 text-xs text-primary-700 bg-primary-50 border border-primary-100 rounded-xl px-4 py-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Documents vérifiés et mis à jour par l&apos;équipe ImmoTrust Maroc
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {projet.documents.map((doc, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-colors">
                <div className="w-10 h-10 bg-red-100 text-red-700 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold">PDF</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 truncate">{doc.nom}</p>
                    {doc.verifie && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2.5" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{doc.taille} · {doc.date}</p>
                  <button className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-600 transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/documents"
            className="block text-center bg-primary-700 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
          >
            Demander le rapport complet via WhatsApp
          </Link>
        </div>
      )}

      {/* ── Analyse des risques ── */}
      {tab === 'risques' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projet.risques.map((r, i) => {
              const c = niveauColor(r.niveau)
              return (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">{r.icone} {r.categorie}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                      {r.niveau.charAt(0).toUpperCase() + r.niveau.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{r.description}</p>
                </div>
              )
            })}
          </div>

          <div className={`rounded-2xl p-6 ${
            projet.recommandation.niveau === 'Excellent' ? 'bg-primary-700' :
            projet.recommandation.niveau === 'Bon' ? 'bg-primary-600' :
            projet.recommandation.niveau === 'Acceptable' ? 'bg-amber-600' : 'bg-red-700'
          } text-white`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">Recommandation finale</h3>
              <span className="text-2xl font-bold bg-white/20 px-3 py-1 rounded-xl">
                {projet.recommandation.score}/100
              </span>
            </div>
            <div className="text-lg font-semibold opacity-90 mb-2">{projet.recommandation.niveau}</div>
            <p className="text-sm leading-relaxed opacity-85">{projet.recommandation.texte}</p>
          </div>
        </div>
      )}
    </div>
  )
}
