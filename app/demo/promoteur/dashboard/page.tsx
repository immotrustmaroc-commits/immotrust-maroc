'use client'

import Link from 'next/link'
import ScoreGauge from '@/components/demo/ScoreGauge'
import {
  demoPromoter,
  demoAlerts,
  demoVisitStats,
  demoProjects,
  type DemoAlert,
} from '@/lib/demo/demoData'
import { useDemoStore, FLAGSHIP_PROJECT } from '@/lib/demo/demoStore'

const alertStyles: Record<DemoAlert['level'], { dot: string; badge: string; label: string }> = {
  info: { dot: '#1f8f58', badge: 'bg-primary-50 text-primary-700', label: 'Info' },
  warning: { dot: '#e87722', badge: 'bg-orange-50 text-[#b8560f]', label: 'À traiter' },
  critical: { dot: '#cc2200', badge: 'bg-red-50 text-[#cc2200]', label: 'Urgent' },
}

export default function DashboardPage() {
  const { published } = useDemoStore()
  const maxDaily = Math.max(...demoVisitStats.daily7, 1)

  // L'avancement du projet phare reflète la valeur publiée (live).
  const projectProgress = (p: { title: string; progress: number }) =>
    p.title === FLAGSHIP_PROJECT ? published.progress : p.progress

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Bienvenue, {demoPromoter.name} — {demoPromoter.city}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Score publié */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 self-start">
            Score de confiance publié
          </h2>
          <ScoreGauge score={published.score} />
          <p className="text-xs text-gray-500 mt-4">
            Dernier recalcul : {demoPromoter.lastRecalc}
          </p>
          {demoPromoter.isVerified && (
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-700">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Promoteur vérifié
            </span>
          )}
          <Link
            href="/demo/promoteur/simulation"
            className="mt-5 w-full bg-primary-700 hover:bg-primary-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            Simuler mon score
          </Link>
        </section>

        {/* Alertes & recommandations */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Alertes &amp; recommandations
            </h2>
            <span className="text-xs font-semibold bg-orange-50 text-[#b8560f] px-2 py-0.5 rounded-full">
              {demoAlerts.length}
            </span>
          </div>

          <ul className="space-y-3">
            {demoAlerts.map((a) => {
              const s = alertStyles[a.level]
              return (
                <li key={a.id} className="flex gap-3 rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50/60 transition-colors">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: s.dot }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-800">{a.title}</h3>
                      <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>
                        {s.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{a.detail}</p>
                    {a.cta && (
                      <Link
                        href={a.cta.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800 mt-2"
                      >
                        {a.cta.label}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {/* Stats de visite */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-5">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Statistiques de visite
          <span className="ml-2 normal-case font-normal text-gray-500 text-xs">(données agrégées anonymes)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-1 grid grid-cols-3 md:grid-cols-1 gap-3">
            {[
              { label: '7 derniers jours', value: demoVisitStats.last7 },
              { label: '30 derniers jours', value: demoVisitStats.last30 },
              { label: 'Total', value: demoVisitStats.total },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-primary-50 border border-primary-100 px-4 py-3 text-center md:text-left">
                <div className="text-2xl font-bold text-primary-700">{s.value.toLocaleString('fr-FR')}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Mini-graphe barres 7 jours */}
          <div className="md:col-span-2 flex flex-col">
            <span className="text-xs text-gray-500 mb-2">Vues sur 7 jours</span>
            <div className="flex-1 flex items-end gap-2 sm:gap-3 min-h-[140px]">
              {demoVisitStats.daily7.map((v, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-1.5">
                  <div className="text-[11px] text-gray-500">{v}</div>
                  <div
                    className="w-full rounded-t-md bg-primary-500/80 hover:bg-primary-600 transition-colors"
                    style={{ height: `${(v / maxDaily) * 110}px` }}
                  />
                  <div className="text-[11px] text-gray-500">{demoVisitStats.dailyLabels[idx]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Aperçu projets */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-5">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Mes projets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {demoProjects.map((p) => (
            <div key={p.id} className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm">{p.title}</h3>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    p.status === 'Retard' ? 'bg-orange-50 text-[#b8560f]' : 'bg-primary-50 text-primary-700'
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{p.city}</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Avancement</span>
                  <span className="font-semibold">{projectProgress(p)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${projectProgress(p)}%`, backgroundColor: p.status === 'Retard' ? '#e87722' : '#155e38' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
