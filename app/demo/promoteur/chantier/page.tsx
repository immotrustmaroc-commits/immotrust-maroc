'use client'

import Link from 'next/link'
import { useState } from 'react'
import { demoProjects } from '@/lib/demo/demoData'
import {
  useDemoStore,
  submitConstructionUpdate,
  FLAGSHIP_PROJECT,
} from '@/lib/demo/demoStore'

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ChantierPage() {
  const { published, pending } = useDemoStore()

  const [project, setProject] = useState(FLAGSHIP_PROJECT)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [setProgress, setSetProgress] = useState(false)
  const [progress, setProgressValue] = useState(published.progress)
  const [toast, setToast] = useState(false)

  const pendingConstruction = pending.filter((s) => s.type === 'CONSTRUCTION_UPDATE').length

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    submitConstructionUpdate(
      { date, title: title.trim(), description: description.trim(), project },
      setProgress ? progress : null,
    )
    setTitle('')
    setDescription('')
    setToast(true)
    setTimeout(() => setToast(false), 3800)
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

      {/* Bandeau validation */}
      {pendingConstruction > 0 && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-sm text-amber-800">
            <strong>{pendingConstruction}</strong> mise{pendingConstruction > 1 ? 's' : ''} à jour en attente de validation ImmoTrust.
          </p>
          <Link href="/demo/promoteur/validation" className="shrink-0 text-sm font-semibold text-[#cc2200] hover:underline">
            Voir la file →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Formulaire */}
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
                <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" required />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex. Coulage de la dalle du 7ᵉ étage"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" required />
              </div>

              <div>
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                  placeholder="Décrivez l’avancement…"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500" required />
              </div>

              {/* Avancement % (optionnel) */}
              <div className="rounded-lg border border-gray-200 p-3">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={setProgress} onChange={(e) => setSetProgress(e.target.checked)}
                    className="w-4 h-4 accent-primary-600" />
                  <span className="text-sm font-medium text-gray-700">Mettre à jour l’avancement du projet</span>
                </label>
                {setProgress && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Avancement</span>
                      <span className="font-semibold text-primary-700">{progress}%</span>
                    </div>
                    <input type="range" min={0} max={100} step={1} value={progress}
                      onChange={(e) => setProgressValue(Number(e.target.value))}
                      className="w-full accent-primary-600" />
                  </div>
                )}
              </div>

              <button type="submit"
                className="w-full bg-primary-700 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-lg transition-colors">
                Soumettre la mise à jour
              </button>
              <p className="text-[11px] text-gray-400 text-center">
                La mise à jour part en validation ImmoTrust avant publication sur le front.
              </p>
            </form>
          </div>
        </section>

        {/* Fil publié */}
        <section className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Fil publié</h2>
            <a href="/projet/residences-zineb" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800">
              Voir sur le front
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
            </a>
          </div>
          <ol className="relative border-l-2 border-gray-100 ml-2 space-y-5">
            {published.chantier.map((u) => (
              <li key={u.id} className="ml-5">
                <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white" style={{ backgroundColor: '#155e38' }} />
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm">{u.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{u.project} · {formatDate(u.date)}</p>
                    </div>
                    <span className="shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700">Publié</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{u.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-primary-800 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
          Soumise — en attente de validation ImmoTrust.
        </div>
      )}
    </div>
  )
}
