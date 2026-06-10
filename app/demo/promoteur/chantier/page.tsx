'use client'

import { useState } from 'react'
import { demoChantierFeed, demoProjects, type ChantierUpdate } from '@/lib/demo/demoData'

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ChantierPage() {
  const [feed, setFeed] = useState<ChantierUpdate[]>(demoChantierFeed)
  const [project, setProject] = useState(demoProjects[0].title)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [toast, setToast] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const entry: ChantierUpdate = {
      id: `u${Date.now()}`,
      date,
      title: title.trim(),
      description: description.trim(),
      project,
      status: 'pending', // soumis → en attente de validation admin (simulé)
    }
    setFeed((prev) => [entry, ...prev])
    setTitle('')
    setDescription('')
    setToast(true)
    setTimeout(() => setToast(false), 3500)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fil chantier</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Publiez l’avancement de vos projets. Chaque mise à jour est vérifiée par ImmoTrust avant
          publication publique.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Formulaire de soumission */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Nouvelle mise à jour</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">Projet</label>
                <select
                  id="project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {demoProjects.map((p) => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex. Coulage de la dalle du 4ᵉ étage"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Décrivez l’avancement…"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              {/* Upload photo simulé */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">Photo (optionnel)</span>
                <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg px-4 py-5 text-center text-gray-400">
                  <div>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-1">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="text-xs">Glisser une photo (démo — non enregistrée)</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-700 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                Soumettre la mise à jour
              </button>
              <p className="text-[11px] text-gray-400 text-center">
                La mise à jour sera publiée après vérification par ImmoTrust.
              </p>
            </form>
          </div>
        </section>

        {/* Fil */}
        <section className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Historique des mises à jour
          </h2>
          <ol className="relative border-l-2 border-gray-100 ml-2 space-y-5">
            {feed.map((u) => (
              <li key={u.id} className="ml-5">
                <span
                  className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: u.status === 'pending' ? '#e87722' : '#155e38' }}
                />
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm">{u.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {u.project} · {formatDate(u.date)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        u.status === 'pending'
                          ? 'bg-orange-50 text-[#e87722]'
                          : 'bg-primary-50 text-primary-700'
                      }`}
                    >
                      {u.status === 'pending' ? 'En attente' : 'Publié'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{u.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Toast de confirmation */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-primary-800 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Mise à jour soumise — en attente de validation ImmoTrust.
        </div>
      )}
    </div>
  )
}
