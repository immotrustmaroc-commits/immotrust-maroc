import Link from 'next/link'
import { promoteurs, projets } from '@/lib/data'

// Barème unique aligné sur le brief (≥75 Excellent / ≥50 Fiable / Vigilance),
// couleurs conformes WCAG AA.
function scoreLabel(s: number) {
  if (s >= 75) return 'Excellent'
  if (s >= 50) return 'Fiable'
  return 'Vigilance'
}

function scoreColor(s: number) {
  if (s >= 75) return { text: 'text-primary-700', bg: 'bg-primary-50', border: 'border-primary-200', badge: 'bg-primary-100 text-primary-700' }
  if (s >= 50) return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' }
  return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' }
}

const extraPromoteurs = [
  {
    id: 'tmsa',
    nom: 'Groupe TMSA',
    scoreConfiance: 83,
    projetsActifs: 7,
    anneeCreation: 2002,
    ville: 'Tanger',
    description: 'Opérateur spécialisé dans l\'aménagement et le développement de grandes zones économiques.',
    couleur: '#0891b2',
  },
  {
    id: 'prestigia',
    nom: 'Prestigia Immobilier',
    scoreConfiance: 79,
    projetsActifs: 11,
    anneeCreation: 2009,
    ville: 'Marrakech',
    description: 'Expert du luxe et du haut standing, avec une forte présence à Marrakech et Casablanca.',
    couleur: '#9333ea',
  },
]

const allPromoteurs = [...promoteurs, ...extraPromoteurs]

export default function PromoteursPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 text-xs text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-primary-700 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Promoteurs</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Promoteurs vérifiés et suivis</h1>
          <p className="text-gray-500 text-sm mt-1">
            Découvrez les promoteurs immobiliers actifs au Maroc. Tous les promoteurs sont analysés et notés selon des critères de fiabilité et de transparence.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-40">
              <label htmlFor="filtre-ville" className="block text-xs font-semibold text-gray-600 mb-1.5">Ville</label>
              <select id="filtre-ville" className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white appearance-none">
                <option>Toutes les villes</option>
                <option>Casablanca</option>
                <option>Rabat</option>
                <option>Marrakech</option>
                <option>Tanger</option>
              </select>
            </div>
            <div className="flex-1 min-w-40">
              <label htmlFor="filtre-score" className="block text-xs font-semibold text-gray-600 mb-1.5">Score de confiance</label>
              <select id="filtre-score" className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white appearance-none">
                <option>Tous les scores</option>
                <option>Excellent (75+)</option>
                <option>Fiable (50–74)</option>
                <option>Vigilance (&lt; 50)</option>
              </select>
            </div>
            <div className="flex-1 min-w-40">
              <label htmlFor="filtre-statut" className="block text-xs font-semibold text-gray-600 mb-1.5">Statut</label>
              <select id="filtre-statut" className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white appearance-none">
                <option>Tous les statuts</option>
                <option>Promoteur vérifié</option>
                <option>En cours de vérification</option>
              </select>
            </div>
            <div className="flex-1 min-w-40">
              <label htmlFor="filtre-projets" className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre de projets</label>
              <select id="filtre-projets" className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white appearance-none">
                <option>Tous</option>
                <option>1–5 projets</option>
                <option>6–15 projets</option>
                <option>15+ projets</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="text-sm font-semibold bg-primary-700 hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl transition-colors">
                Rechercher
              </button>
              <button className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{allPromoteurs.length}</span> promoteurs trouvés
          </p>
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="tri-promoteurs" className="text-gray-500">Trier par :</label>
            <select id="tri-promoteurs" className="text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400">
              <option>Score de confiance</option>
              <option>Nombre de projets</option>
              <option>Nom</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allPromoteurs.map((p) => {
            const sc = scoreColor(p.scoreConfiance)
            const projetsP = projets.filter((proj) => proj.promoteurId === p.id)

            return (
              <div key={p.id} id={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ backgroundColor: p.couleur }}
                    >
                      {p.nom.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{p.nom}</h3>
                      <p className="text-xs text-gray-500">{p.ville} · {p.anneeCreation}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${sc.badge}`}>
                    {scoreLabel(p.scoreConfiance)}
                  </span>
                </div>

                {/* Score */}
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border mb-4 ${sc.bg} ${sc.border}`}>
                  <div className={`text-2xl font-bold leading-none ${sc.text}`}>{p.scoreConfiance}</div>
                  <div>
                    <div className={`text-xs font-semibold ${sc.text}`}>/100 · {scoreLabel(p.scoreConfiance)}</div>
                    <div className="text-xs text-gray-500">Score de confiance</div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-4">{p.description}</p>

                {/* Stats */}
                <div className="flex gap-3 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span><b>{p.projetsActifs}</b> projets actifs</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Promoteur vérifié</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 text-xs font-semibold text-primary-700 border border-primary-200 rounded-lg py-2 hover:bg-primary-50 transition-colors">
                    Voir la fiche
                  </button>
                  {projetsP.length > 0 ? (
                    <Link
                      href={`/projet/${projetsP[0].id}`}
                      className="flex-1 text-xs font-semibold text-center bg-primary-700 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors"
                    >
                      Voir les projets
                    </Link>
                  ) : (
                    <button className="flex-1 text-xs font-semibold bg-primary-700 text-white rounded-lg py-2 hover:bg-primary-600 transition-colors">
                      Voir les projets
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-sm text-gray-500 hover:border-primary-300 hover:text-primary-700 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-xl bg-primary-700 text-white text-sm font-semibold">1</button>
          <button className="w-9 h-9 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-primary-300 hover:text-primary-700 transition-colors">2</button>
          <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-sm text-gray-500 hover:border-primary-300 hover:text-primary-700 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
