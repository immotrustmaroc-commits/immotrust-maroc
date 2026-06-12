'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import ScoreGauge from '@/components/demo/ScoreGauge'
import { calculateSimulatedScore, getScoreLabel, type ScoreInputs, type InspectorAccess } from '@/lib/demo/score'
import { demoScoreDefaults } from '@/lib/demo/demoData'
import { useDemoStore, submitScoreUpdate } from '@/lib/demo/demoStore'

/* ── Petits composants de contrôle ──────────────────────────── */

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string
  hint?: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-start justify-between gap-3 py-3 cursor-pointer select-none">
      <span className="min-w-0">
        <span className="block text-sm font-medium text-gray-800">{label}</span>
        {hint && <span className="block text-xs text-gray-500 mt-0.5">{hint}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-primary-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </label>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

export default function SimulationPage() {
  const [inputs, setInputs] = useState<ScoreInputs>(demoScoreDefaults)

  // Recalcul instantané à CHAQUE changement — aucun debounce (REQ-13).
  const result = useMemo(() => calculateSimulatedScore(inputs), [inputs])
  const { color } = getScoreLabel(result.score)
  // Texte foncé pour le score « Fiable » (contraste AA) ; l'orange reste pour les surfaces.
  const scoreTextColor = color === '#e87722' ? '#b8560f' : color

  const { published, pending } = useDemoStore()
  const [scoreToast, setScoreToast] = useState(false)
  const pendingScore = pending.some((s) => s.type === 'SCORE_UPDATE')

  function submitScore() {
    submitScoreUpdate(result.score)
    setScoreToast(true)
    setTimeout(() => setScoreToast(false), 4000)
  }

  function set<K extends keyof ScoreInputs>(key: K, value: ScoreInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const weightRows = [
    { key: 'doc', label: 'Documents (C_Doc)', value: result.breakdown.c_doc, weight: result.weights.doc },
    { key: 'chantier', label: 'Chantier (C_Chantier)', value: result.breakdown.c_chantier, weight: result.weights.chantier },
    {
      key: 'avis',
      label: 'Avis acheteurs (C_Avis)',
      value: result.breakdown.c_avis,
      weight: result.weights.avis,
    },
    { key: 'transp', label: 'Transparence (C_Transp)', value: result.breakdown.c_transp, weight: result.weights.transp },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Simulateur de score</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Ajustez les paramètres et observez l’impact en temps réel sur votre score de confiance.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Colonne paramètres ─────────────────────────────── */}
        <div className="lg:col-span-3 space-y-5">
          {/* Documents */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Documents vérifiés</h2>
            <p className="text-xs text-gray-500 mb-2">Permis +30 · Titre +30 · Plans +20 · GFA +20</p>
            <div className="divide-y divide-gray-100">
              <Toggle label="Permis de construire vérifié" checked={inputs.has_permis} onChange={(v) => set('has_permis', v)} />
              <Toggle label="Titre foncier vérifié" checked={inputs.has_titre} onChange={(v) => set('has_titre', v)} />
              <Toggle label="Plans architecturaux validés" checked={inputs.has_plans} onChange={(v) => set('has_plans', v)} />
              <Toggle label="Garantie Financière d’Achèvement (GFA)" checked={inputs.has_gfa} onChange={(v) => set('has_gfa', v)} />
            </div>
          </section>

          {/* Chantier */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Avancement chantier</h2>
            <p className="text-xs text-gray-500 mb-3">À l’heure : 100 · retard &gt; 0 : 60 · &gt; 6 mois : 20 · arrêté : 0</p>

            <label htmlFor="delay" className="flex items-center justify-between text-sm text-gray-700">
              <span className="font-medium">Retard estimé</span>
              <span className="font-semibold text-primary-700">{inputs.delay_months} mois</span>
            </label>
            <input
              id="delay"
              type="range"
              min={0}
              max={12}
              step={1}
              value={inputs.delay_months}
              onChange={(e) => set('delay_months', Number(e.target.value))}
              disabled={inputs.is_halted}
              className="w-full mt-2 accent-primary-600 disabled:opacity-40"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-0.5">
              <span>0</span><span>6</span><span>12 mois</span>
            </div>

            <div className="border-t border-gray-100 mt-1">
              <Toggle
                label="Chantier à l’arrêt"
                hint="Met le coefficient chantier à 0"
                checked={inputs.is_halted}
                onChange={(v) => set('is_halted', v)}
              />
            </div>
          </section>

          {/* Transparence */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Transparence</h2>
            <p className="text-xs text-gray-500 mb-2">Aucun litige +50 · accès inspecteur (complet +30 / partiel +15) · ICE +20</p>
            <div className="divide-y divide-gray-100">
              <Toggle label="Aucun litige en cours" checked={inputs.no_dispute} onChange={(v) => set('no_dispute', v)} />
              <Toggle label="Numéro ICE publié" checked={inputs.ice_published} onChange={(v) => set('ice_published', v)} />
            </div>

            <div className="mt-3">
              <span className="block text-sm font-medium text-gray-800 mb-2">Accès inspecteur terrain</span>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { v: 'FULL', label: 'Complet', pts: '+30' },
                  { v: 'PARTIAL', label: 'Partiel', pts: '+15' },
                  { v: 'NONE', label: 'Aucun', pts: '+0' },
                ] as { v: InspectorAccess; label: string; pts: string }[]).map((opt) => {
                  const active = inputs.inspector_access === opt.v
                  return (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => set('inspector_access', opt.v)}
                      className={`rounded-lg border px-2 py-2 text-center transition-colors ${
                        active
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{opt.label}</span>
                      <span className="block text-[11px] text-gray-500">{opt.pts}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Avis */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Avis acheteurs</h2>
            <p className="text-xs text-gray-500 mb-3">
              Note moyenne × 20 = coefficient. À 0, la formule temporaire (sans avis) s’applique.
            </p>
            <label htmlFor="rating" className="flex items-center justify-between text-sm text-gray-700">
              <span className="font-medium">Note moyenne</span>
              <span className="font-semibold text-primary-700">
                {inputs.avg_rating > 0 ? `${inputs.avg_rating.toFixed(1)} ★` : 'Aucun avis'}
              </span>
            </label>
            <input
              id="rating"
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={inputs.avg_rating}
              onChange={(e) => set('avg_rating', Number(e.target.value))}
              className="w-full mt-2 accent-primary-600"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-0.5">
              <span>0</span><span>2.5</span><span>5 ★</span>
            </div>
          </section>
        </div>

        {/* ── Panneau score (sticky) ─────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-6 space-y-4">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Score simulé
              </h2>
              <ScoreGauge score={result.score} />

              {/* Décomposition formule */}
              <div className="mt-6 text-left">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Décomposition
                </div>
                <ul className="space-y-2">
                  {weightRows.map((row) => {
                    const isAvisInactive = row.key === 'avis' && (row.value === null || row.weight === null)
                    const contribution =
                      row.value !== null && row.weight !== null ? row.value * row.weight : null
                    return (
                      <li
                        key={row.key}
                        className={`flex items-center justify-between text-sm ${isAvisInactive ? 'opacity-40' : ''}`}
                      >
                        <span className="text-gray-600">{row.label}</span>
                        <span className="font-mono text-gray-800">
                          {isAvisInactive ? (
                            <span className="text-xs text-gray-500">non pris en compte</span>
                          ) : (
                            <>
                              {row.value} × {row.weight} ={' '}
                              <span className="font-semibold">{contribution!.toFixed(1)}</span>
                            </>
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
                <div className="border-t border-gray-100 mt-3 pt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Score total</span>
                  <span className="text-lg font-bold" style={{ color: scoreTextColor }}>
                    {result.score}/100
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-2">
                  {result.hasReviews
                    ? 'Formule complète (avec avis) appliquée.'
                    : 'Formule temporaire (sans avis) appliquée.'}
                </p>
              </div>

              {/* Mention permanente obligatoire */}
              <div className="mt-5 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5 text-left">
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Ce score est une simulation.</strong> Le score publié est calculé par
                  ImmoTrust après vérification des pièces.
                </p>
              </div>

              {/* Soumettre le score à la vérification ImmoTrust */}
              <div className="mt-4 text-left">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Score publié actuel</span>
                  <span className="font-semibold text-gray-700">{published.score} / 100</span>
                </div>
                <button
                  onClick={submitScore}
                  disabled={pendingScore}
                  className="w-full bg-primary-700 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                >
                  Soumettre ce score à ImmoTrust
                </button>
                {pendingScore ? (
                  <p className="text-[11px] text-amber-700 mt-2 text-center">
                    Score déjà en attente de validation —{' '}
                    <Link href="/demo/promoteur/validation" className="font-semibold underline">file ImmoTrust</Link>
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-500 mt-2 text-center">
                    Après vérification par ImmoTrust, ce score remplacera le score publié sur votre fiche.
                  </p>
                )}
              </div>
            </section>

            {/* Recommandations */}
            {result.recommendations.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-sm font-semibold text-gray-800 mb-3">
                  Comment améliorer mon score
                </h2>
                <ul className="space-y-2.5">
                  {result.recommendations.slice(0, 5).map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 shrink-0 text-primary-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                      <span className="text-gray-600 leading-snug">
                        {r.text}
                        {r.points > 0 && (
                          <span className="ml-1 font-semibold text-primary-700">+{r.points} pts</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      {scoreToast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-primary-800 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
          Score soumis — en attente de validation ImmoTrust.
        </div>
      )}
    </div>
  )
}
