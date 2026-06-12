import Image from 'next/image'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import { promoteurs, projets } from '@/lib/data'

/* ── helpers ──────────────────────────────────────────────── */
// Barème unique aligné sur le brief (≥75 Excellent / ≥50 Fiable / Vigilance),
// avec des couleurs conformes WCAG AA (amber-700 / red-700, pas l'orange clair).
function scoreLabel(s: number) {
  if (s >= 75) return 'Excellent'
  if (s >= 50) return 'Fiable'
  return 'Vigilance'
}

function scoreColor(s: number) {
  if (s >= 75) return { text: 'text-primary-700', bg: 'bg-primary-50', border: 'border-primary-200' }
  if (s >= 50) return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' }
  return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' }
}

function formatPrice(prix: number) {
  if (prix >= 1000000) return `${(prix / 1000000).toFixed(1)}M MAD`
  return `${(prix / 1000).toFixed(0)}K MAD`
}

function ProgressBar({ value }: { value: number }) {
  const color = value >= 75 ? '#155e38' : value >= 50 ? '#1f8f58' : value >= 25 ? '#e87722' : '#cc2200'
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  )
}

/* ── page ─────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div>

      {/* ── HERO (photo pleine largeur + overlay) ─────────── */}
      <section className="relative h-[360px] sm:h-[440px] lg:h-[500px] overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Immobilier marocain — résidences et mosquée"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay sombre léger */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Texte et boutons */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold text-white leading-[1.25] mb-3 sm:mb-4 drop-shadow">
                Avant d&apos;acheter sur plan,
                vérifiez le promoteur et le projet
              </h1>
              <p className="hidden sm:block text-white/80 text-base leading-relaxed mb-8 max-w-md">
                ImmoTrust Maroc aide les acheteurs, notamment les MRE,
                à comparer, vérifier les documents et suivre l&apos;avancement des projets
                immobiliers neufs au Maroc.
              </p>
              <p className="sm:hidden text-white/80 text-sm leading-relaxed mb-6">
                Vérifiez promoteurs et projets immobiliers neufs au Maroc.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#projets"
                  className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl transition-colors text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  Vérifier un projet
                </Link>
                <Link
                  href="/promoteurs"
                  className="inline-flex items-center gap-2 text-white border border-white/60 hover:border-white hover:bg-white/10 font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl transition-colors text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  Voir les promoteurs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BARRE DE RECHERCHE ────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { value: '200+', label: 'Projets analysés' },
              { value: '45', label: 'Promoteurs évalués' },
              { value: '15 000+', label: 'Investisseurs protégés' },
              { value: '98%', label: 'Taux de satisfaction' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-primary-100 rounded-2xl px-4 py-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-primary-700">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTRE MISSION ─────────────────────────────────── */}
      <section className="bg-primary-50 border-b border-primary-100 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-primary-200 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            À propos
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Qui sommes-nous&nbsp;?</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            ImmoTrust Maroc est une plateforme indépendante et neutre. Notre mission est simple&nbsp;: apporter la transparence dans l&apos;immobilier au Maroc. Nous ne vendons rien. Nous informons les acheteurs et valorisons les promoteurs sérieux qui n&apos;ont rien à cacher.
          </p>
        </div>
      </section>

      {/* ── PROMOTEURS À LA UNE ───────────────────────────── */}
      <section id="promoteurs" className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Promoteurs à la une</h2>
              </div>
              <p className="text-sm text-gray-500">Des promoteurs analysés et notés selon des critères de fiabilité et de transparence.</p>
            </div>
            <Link href="/promoteurs" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-600 transition-colors whitespace-nowrap">
              Voir tous les promoteurs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {promoteurs.map((p) => {
              const sc = scoreColor(p.scoreConfiance)
              return (
                <div key={p.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 shrink-0 w-64 card-hover flex flex-col">
                  {/* Nom + avatar */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 border-2 border-white shadow"
                      style={{ backgroundColor: p.couleur }}
                    >
                      {p.nom.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-sm leading-tight truncate">{p.nom}</p>
                      <span className="inline-block mt-1 text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded-full">
                        Promoteur vérifié
                      </span>
                    </div>
                  </div>
                  {/* Score bloc coloré */}
                  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border mb-4 ${sc.bg} ${sc.border}`}>
                    <span className={`text-2xl font-bold leading-none ${sc.text}`}>{p.scoreConfiance}</span>
                    <div>
                      <div className={`text-xs font-semibold ${sc.text}`}>/100 · {scoreLabel(p.scoreConfiance)}</div>
                      <div className="text-xs text-gray-500">Score de confiance</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs text-center border-t border-gray-100 pt-3">
                    <div>
                      <div className="font-bold text-gray-900 text-base">{Math.floor(p.projetsActifs * 0.6)}</div>
                      <div className="text-gray-500">Projets livrés</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-base">{Math.ceil(p.projetsActifs * 0.4)}</div>
                      <div className="text-gray-500">En cours</div>
                    </div>
                    <div>
                      <div className="font-bold text-primary-600 text-base flex items-center justify-center gap-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#155e38">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {(3.5 + p.scoreConfiance / 100).toFixed(1)}
                      </div>
                      <div className="text-gray-500">Avis clients</div>
                    </div>
                  </div>

                  <Link
                    href={`/promoteurs#${p.id}`}
                    className="block mt-3 text-center text-xs font-semibold text-primary-700 border border-primary-200 rounded-lg py-2 hover:bg-primary-50 transition-colors"
                  >
                    Voir la fiche
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PROJETS EN VEDETTE + SIDEBAR ──────────────────── */}
      <section id="projets" className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Projets en vedette</h2>
              </div>
              <p className="text-sm text-gray-500">Audités par notre équipe d&apos;experts sur le terrain.</p>
            </div>
            <Link href="/#projets" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-600 transition-colors whitespace-nowrap">
              Voir tous les projets
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project cards (2/3) */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {projets.slice(0, 3).map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden card-hover flex flex-col">
                  {/* Photo */}
                  <div
                    className="h-40 relative flex flex-col justify-between p-3"
                    style={{ background: `linear-gradient(160deg, ${p.couleur2} 0%, ${p.couleur} 100%)` }}
                  >
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1 bg-white/25 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {p.ville}
                      </span>
                      <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">En cours</span>
                    </div>
                    <div className="text-white">
                      <div className="text-lg font-bold">{p.avancement}%</div>
                      <div className="text-xs opacity-75">avancement</div>
                    </div>
                  </div>

                  <div className="p-3 flex flex-col flex-1">
                    <p className="font-bold text-gray-900 text-sm mb-0.5">{p.titre}</p>
                    <p className="text-xs text-gray-500 mb-3">{p.quartier}, {p.ville}</p>
                    <ProgressBar value={p.avancement} />
                    <div className="flex justify-between text-xs text-gray-500 mt-3 mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">{p.livraison.replace('Décembre', 'T4').replace('Juin', 'T2').replace('Mars', 'T1')}</div>
                        <div>Livraison prévue</div>
                      </div>
                    </div>
                    <Link
                      href={`/projet/${p.id}`}
                      className="mt-auto flex items-center gap-2 justify-center text-xs font-semibold border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 text-gray-600 rounded-lg py-2 transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                      Demander un rapport
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar (1/3) */}
            <div className="space-y-4">
              {/* Avancement du chantier */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <h3 className="font-bold text-gray-900 text-sm">Avancement du chantier</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">{projets[0].titre} – {projets[0].ville}</p>

                {/* Mini horizontal timeline */}
                <div className="relative pt-1 pb-6">
                  <div className="absolute top-3.5 left-2 right-2 h-0.5 bg-gray-200">
                    <div className="h-full bg-primary-600" style={{ width: `${(2 / 4) * 100}%` }} />
                  </div>
                  <div className="relative flex justify-between">
                    {['Fondations', 'Gros œuvre', 'Façade', 'Finitions', 'Livraison'].map((phase, i) => {
                      const done = i < 2; const cur = i === 2
                      return (
                        <div key={phase} className="flex flex-col items-center gap-2" style={{ width: '20%' }}>
                          <div className={`w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center ${done ? 'bg-primary-600 border-primary-600' : cur ? 'bg-white border-primary-500 ring-2 ring-primary-100' : 'bg-white border-gray-300'}`}>
                            {done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                            {cur && <div className="w-2 h-2 bg-primary-500 rounded-full" />}
                          </div>
                          <span className={`text-center leading-tight w-12 text-[9px] ${done || cur ? 'text-gray-700 font-semibold' : 'text-gray-500'}`}>{phase}</span>
                          <span className={`text-[9px] ${done ? 'text-primary-600' : cur ? 'text-amber-600' : 'text-gray-300'}`}>{done ? 'Terminée' : cur ? 'En cours' : 'À venir'}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Documents disponibles */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  <h3 className="font-bold text-gray-900 text-sm">Documents disponibles</h3>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center mb-3">
                  {[
                    { label: 'Permis de construire', icon: '📋', color: 'bg-red-50' },
                    { label: 'Titre foncier', icon: '🏛️', color: 'bg-blue-50' },
                    { label: 'Plans architecturaux', icon: '📐', color: 'bg-primary-50' },
                    { label: 'Planning prévisionnel', icon: '📅', color: 'bg-amber-50' },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className={`w-10 h-10 ${d.color} rounded-xl flex items-center justify-center text-lg mx-auto mb-1`}>
                        {d.icon}
                      </div>
                      <p className="text-[9px] text-gray-500 leading-tight">{d.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary-600 border-t border-gray-100 pt-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Documents vérifiés et mis à jour
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS + APP CTA ────────────────────────── */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Testimonial */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#d1f0df" className="mb-3">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            <p className="text-gray-700 leading-relaxed mb-5 text-sm">
              Grâce à ImmoTrust Maroc, j&apos;ai pu vérifier le promoteur, consulter les documents et suivre l&apos;avancement de mon projet depuis la France. Une vraie tranquillité d&apos;esprit&nbsp;!
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">Y</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Yassine B.</p>
                <p className="text-xs text-gray-500">Acheteur MRE – Paris</p>
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill="#155e38">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* App CTA */}
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                <h3 className="font-bold text-gray-900 text-lg">Suivez votre projet à distance</h3>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Plateforme pensée pour les MRE : transparence, mise à jour régulière et rapports détaillés.
              </p>
              <Link
                href="/documents"
                className="inline-flex items-center gap-2 bg-primary-800 hover:bg-primary-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Demander un rapport WhatsApp
              </Link>
            </div>
            {/* Phone mockup */}
            <div className="shrink-0 hidden sm:block">
              <div className="w-28 h-52 bg-primary-900 rounded-2xl border-4 border-primary-800 shadow-xl flex flex-col items-center justify-center overflow-hidden relative">
                <div className="absolute top-2 w-10 h-1 bg-primary-700 rounded-full" />
                <div className="w-full px-2 mt-4 space-y-1.5">
                  <div className="h-2 bg-primary-700 rounded-full w-3/4 mx-auto" />
                  <div className="h-8 bg-primary-800 rounded-lg mx-1 flex items-center px-2 gap-1">
                    <div className="w-5 h-5 rounded bg-primary-600" />
                    <div className="flex-1 space-y-1">
                      <div className="h-1 bg-primary-600 rounded w-full" />
                      <div className="h-1 bg-primary-700 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="h-1.5 bg-primary-600 rounded-full w-full mx-0" />
                  <div className="h-1 bg-primary-700 rounded-full w-4/5" />
                  <div className="h-4 bg-primary-600 rounded-lg" />
                  <div className="h-4 bg-primary-700 rounded-lg" />
                </div>
                <div className="absolute bottom-2 text-primary-400 text-[8px] font-bold">ImmoTrust</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
