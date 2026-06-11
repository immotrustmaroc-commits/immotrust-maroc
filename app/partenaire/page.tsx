'use client'

import Link from 'next/link'
import { useState } from 'react'

const avantages = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    titre: 'Profil vérifié et crédible',
    description:
      'Votre société est auditée et affiche un badge de confiance visible par tous les acheteurs sur la plateforme.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    titre: 'Vos projets mis en valeur',
    description:
      "Chaque projet dispose d'une fiche détaillée : avancement, documents, plans et calendrier de livraison.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    titre: 'Les acheteurs vous trouvent en confiance',
    description:
      "Des acheteurs sérieux, notamment les MRE, consultent ImmoTrust Maroc avant de prendre leur décision.",
  },
]

export default function PartenairePage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    nom: '',
    societe: '',
    ville: '',
    telephone: '',
    email: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 text-xs text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-primary-700 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Devenir partenaire</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Promoteurs immobiliers
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Rejoignez ImmoTrust Maroc
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            La transparence immobilière au Maroc commence ici.
          </p>
        </div>

        {/* Avantages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {avantages.map((a) => (
            <div key={a.titre} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                {a.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">{a.titre}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Candidature envoyée</h2>
              <p className="text-gray-500 text-sm">
                Merci, <span className="font-semibold text-gray-700">{form.nom}</span>. Notre équipe vous répond sous 48h.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">Formulaire de candidature</h2>
                <p className="text-sm text-gray-500 mt-0.5">Tous les champs sont obligatoires.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nom complet</label>
                    <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      required
                      placeholder="Mohamed Alami"
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Société</label>
                    <input
                      type="text"
                      name="societe"
                      value={form.societe}
                      onChange={handleChange}
                      required
                      placeholder="Nom de votre société"
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white placeholder-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ville</label>
                    <select
                      name="ville"
                      value={form.ville}
                      onChange={handleChange}
                      required
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white appearance-none text-gray-700"
                    >
                      <option value="" disabled>Sélectionner une ville</option>
                      <option>Casablanca</option>
                      <option>Rabat</option>
                      <option>Marrakech</option>
                      <option>Tanger</option>
                      <option>Agadir</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Téléphone</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      required
                      placeholder="+212 6XX XXX XXX"
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white placeholder-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email professionnel</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="contact@votre-societe.ma"
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white placeholder-gray-300"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-800 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Envoyer ma candidature
                  </button>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Notre équipe vous répond sous 48h
                  </p>
                </div>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
