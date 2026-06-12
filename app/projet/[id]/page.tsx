import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjet, getPromoteur } from '@/lib/data'
import ProjectTabs from '@/components/ProjectTabs'

// Barème unifié (brief) : ≥75 Excellent / ≥50 Fiable / Vigilance.
function scoreLabel(s: number) {
  if (s >= 75) return 'Excellent'
  if (s >= 50) return 'Fiable'
  return 'Vigilance'
}

function formatPrice(prix: number) {
  if (prix >= 1000000) return `${(prix / 1000000).toFixed(1)}M MAD`
  return `${(prix / 1000).toFixed(0)}K MAD`
}

export default async function ProjetPage(props: PageProps<'/projet/[id]'>) {
  const { id } = await props.params
  const projet = getProjet(id)
  if (!projet) notFound()

  const promoteur = getPromoteur(projet.promoteurId)
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
            <span className="text-gray-500">{projet.ville}</span>
            <span>/</span>
            <span className="text-gray-800 font-medium">{projet.titre}</span>
          </nav>
        </div>
      </div>

      {/* ── Main header: photo + info ────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* Photo */}
            <div className="lg:col-span-2 relative">
              <div
                className="rounded-2xl overflow-hidden h-64 lg:h-80 relative flex items-end"
                style={{ background: `linear-gradient(160deg, ${projet.couleur2} 0%, ${projet.couleur} 100%)` }}
              >
                {/* Building silhouette */}
                <div className="absolute inset-0 opacity-15">
                  <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
                    <rect x="30" y="60" width="40" height="240" fill="white" rx="3" />
                    <rect x="90" y="100" width="55" height="200" fill="white" rx="3" />
                    <rect x="165" y="40" width="70" height="260" fill="white" rx="3" />
                    <rect x="255" y="80" width="50" height="220" fill="white" rx="3" />
                    <rect x="325" y="110" width="60" height="190" fill="white" rx="3" />
                    <rect x="0" y="295" width="400" height="10" fill="white" />
                  </svg>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                    {projet.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {projet.avancement}% avancé
                  </span>
                </div>

                <div className="relative p-4 text-white">
                  <div className="flex gap-2 flex-wrap">
                    {['Promoteur vérifié', 'Documents vérifiés', 'Chantier suivi'].map((badge) => (
                      <span key={badge} className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/30">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-3">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {projet.quartier}, {projet.ville}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{projet.titre}</h1>
                  <p className="text-gray-500 text-sm mt-1">Par {projet.promoteurNom}</p>
                </div>

                {/* Score badge */}
                <div className="shrink-0 border-2 border-primary-200 bg-primary-50 rounded-2xl px-4 py-3 text-center">
                  <div className="flex items-baseline gap-1 justify-center">
                    <span className="text-3xl font-bold text-primary-700">{projet.recommandation.score}</span>
                    <span className="text-sm text-gray-500 font-medium">/100</span>
                  </div>
                  <div className="text-xs font-bold text-primary-700 mt-0.5">{scoreLabel(projet.recommandation.score)}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Score de confiance</div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">{projet.description}</p>

              {/* Key stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Livraison prévue', value: projet.livraison },
                  { label: 'Surface', value: projet.surface },
                  { label: 'Type', value: projet.type },
                  { label: 'Unités vendues', value: `${venduPct}%` },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500 mb-0.5">{s.label}</div>
                    <div className="font-bold text-gray-900 text-sm">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Promoteur card */}
              {promoteur && (
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                    style={{ backgroundColor: promoteur.couleur }}
                  >
                    {promoteur.nom.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{promoteur.nom}</p>
                    <p className="text-xs text-gray-500">{promoteur.ville} · Score: {promoteur.scoreConfiance}/100</p>
                  </div>
                  <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-2.5 py-1 rounded-full">
                    {scoreLabel(promoteur.scoreConfiance)}
                  </span>
                </div>
              )}

              {/* Date du rapport */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Date du rapport : {new Date().toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content with tabs */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <ProjectTabs projet={projet} />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* À propos du projet */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">À propos du projet</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Superficie', value: projet.surface },
                  { label: 'Type de bien', value: projet.type },
                  { label: 'Nbre de unités', value: `${projet.totalUnites} logements` },
                  { label: 'Livraison', value: projet.livraison },
                  { label: 'Prix min.', value: `${formatPrice(projet.prixMin)}` },
                  { label: 'Prix max.', value: `${formatPrice(projet.prixMax)}` },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-semibold text-gray-900 text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact promoteur */}
            {promoteur && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3">Contact promoteur</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: promoteur.couleur }}
                  >
                    {promoteur.nom.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{promoteur.nom}</p>
                    <p className="text-xs text-gray-500">{promoteur.projetsActifs} projets actifs</p>
                  </div>
                </div>
                <button className="w-full text-sm font-semibold border border-primary-200 text-primary-700 py-2.5 rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.19 2.22 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-.55a2 2 0 012.11.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Contacter le promoteur
                </button>
              </div>
            )}

            {/* CTA WhatsApp */}
            <Link
              href="/documents"
              className="block bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl p-5 text-center transition-colors"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-2">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <div className="font-bold">Rapport complet via WhatsApp</div>
              <div className="text-white/80 text-xs mt-1">Réponse sous 24h garantie</div>
            </Link>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Promoteur vérifié', icon: '🏢' },
                { label: 'Documents vérifiés', icon: '📄' },
                { label: 'Chantier suivi', icon: '🏗️' },
              ].map((b) => (
                <div key={b.label} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                  <div className="text-xl mb-1">{b.icon}</div>
                  <div className="text-xs text-gray-600 font-medium leading-tight">{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
