'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projets } from '@/lib/data'

const docTypes = [
  {
    icon: '📋',
    color: 'bg-red-50 text-red-700',
    titre: 'Permis de construire',
    desc: 'Déposé et approuvé par la commune',
    count: 4,
  },
  {
    icon: '🏛️',
    color: 'bg-blue-50 text-blue-700',
    titre: 'Titre foncier',
    desc: 'Vérifié et authentique auprès de la conservation',
    count: 4,
  },
  {
    icon: '📐',
    color: 'bg-primary-50 text-primary-700',
    titre: 'Plans architecturaux',
    desc: 'Plans détaillés approuvés par le bureau de contrôle',
    count: 4,
  },
  {
    icon: '📅',
    color: 'bg-amber-50 text-amber-700',
    titre: 'Planning prévisionnel',
    desc: 'Calendrier des travaux et jalons du projet',
    count: 3,
  },
]

export default function DocumentsPage() {
  const [form, setForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    projetId: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const projet = projets.find((p) => p.id === form.projetId)

    const msg = [
      `Bonjour ImmoTrust Maroc,`,
      ``,
      `Je souhaite recevoir un rapport complet pour :`,
      `📍 Projet : ${projet?.titre ?? 'Non spécifié'} — ${projet?.ville ?? ''}`,
      ``,
      `📞 Mon numéro : +212${form.telephone}`,
      form.email ? `📧 Email : ${form.email}` : '',
      ``,
      `Cordialement, ${form.nom}`,
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-700 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Documents</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Main: Documents ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Documents du projet</h1>
              <p className="text-gray-500 text-sm">
                Tous les documents sont vérifiés et authentifiés par l&apos;équipe ImmoTrust Maroc auprès des autorités compétentes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {docTypes.map((d) => (
                <div key={d.titre} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${d.color}`}>
                    {d.icon}
                  </div>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900 text-sm">{d.titre}</h3>
                    <span className="text-xs text-gray-500 shrink-0">{d.count} projets</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">{d.desc}</p>
                  <button className="flex items-center gap-2 text-xs font-semibold text-primary-700 hover:text-primary-600 transition-colors border border-primary-200 rounded-lg px-3 py-2 hover:bg-primary-50">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Télécharger
                  </button>
                </div>
              ))}
            </div>

            {/* Notice */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 flex gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-800 mb-0.5">Documents vérifiés et mis à jour</p>
                <p className="text-xs text-primary-600 leading-relaxed">
                  Tous les documents sont authentifiés par l&apos;équipe ImmoTrust Maroc auprès des autorités compétentes (communes, conservations foncières, tribunaux).
                </p>
              </div>
            </div>

            {/* Projects list */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-4">Documents par projet</h2>
              <div className="space-y-3">
                {projets.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div
                      className="w-10 h-10 rounded-xl shrink-0"
                      style={{ background: `linear-gradient(135deg, ${p.couleur2}, ${p.couleur})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{p.titre}</p>
                      <p className="text-xs text-gray-500">{p.ville} · {p.documents.length} documents</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary-600 font-semibold shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {p.documents.filter((d) => d.verifie).length} vérifiés
                    </div>
                    <Link
                      href={`/projet/${p.id}`}
                      className="text-xs font-semibold text-gray-500 hover:text-primary-700 transition-colors"
                    >
                      Voir →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar: Request form ────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-20">
              {/* Header */}
              <div className="hero-gradient p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="font-bold">Demander un rapport complet</span>
                </div>
                <p className="text-white/75 text-xs leading-relaxed">
                  Recevez par WhatsApp un rapport complet et détaillé (avancement, risques, documents, promoteur) dans les 24h.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 text-center">
                  <div className="w-14 h-14 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-900 mb-1">Demande envoyée !</p>
                  <p className="text-xs text-gray-500 mb-4">Vous recevrez votre rapport sous 24h.</p>
                  <button onClick={() => setSubmitted(false)} className="text-xs text-primary-700 font-semibold hover:underline">
                    Nouvelle demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nom complet</label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmed Benali"
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pays &amp; Téléphone</label>
                    <div className="flex">
                      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600 shrink-0">
                        🇲🇦 +212
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="6 XX XX XX XX"
                        value={form.telephone}
                        onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                        className="flex-1 text-sm px-3 py-2.5 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Projet concerné</label>
                    <select
                      required
                      value={form.projetId}
                      onChange={(e) => setForm({ ...form, projetId: e.target.value })}
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Sélectionner un projet</option>
                      {projets.map((p) => (
                        <option key={p.id} value={p.id}>{p.titre} – {p.ville}</option>
                      ))}
                      <option value="autre">Autre projet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Email <span className="text-gray-500 font-normal">(optionnel)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="ahmed@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 flex gap-2 text-xs text-gray-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 text-primary-600">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    Vos données sont sécurisées et ne seront jamais partagées avec des tiers.
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-700 hover:bg-primary-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    Confirmer la demande
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
