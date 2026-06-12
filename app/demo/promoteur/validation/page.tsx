'use client'

import Link from 'next/link'
import {
  useDemoStore,
  approveSubmission,
  rejectSubmission,
  resetDemo,
  type Submission,
} from '@/lib/demo/demoStore'
import { getScoreLabel } from '@/lib/demo/score'

const subTypeLabel = (t: Submission['type']) =>
  t === 'INFO_UPDATE' ? 'Mise à jour — Informations société'
  : t === 'SCORE_UPDATE' ? 'Mise à jour — Score de confiance'
  : 'Mise à jour — Chantier'

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function SubmissionCard({ sub }: { sub: Submission }) {
  return (
    <li className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border-b border-amber-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#b8560f]">
          {subTypeLabel(sub.type)}
        </span>
        <span className="text-[11px] text-gray-500">
          Soumis {new Date(sub.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="px-4 py-3.5">
        {sub.type === 'SCORE_UPDATE' ? (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">Nouveau score de confiance proposé :</span>
            <span className="inline-flex items-center gap-2">
              <span className="text-2xl font-bold" style={{ color: getScoreLabel(sub.score).color === '#e87722' ? '#b8560f' : getScoreLabel(sub.score).color }}>{sub.score}</span>
              <span className="text-xs text-gray-400">/ 100</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: getScoreLabel(sub.score).color === '#e87722' ? '#b8560f' : getScoreLabel(sub.score).color, backgroundColor: `${getScoreLabel(sub.score).color}14` }}>{getScoreLabel(sub.score).label}</span>
            </span>
          </div>
        ) : sub.type === 'INFO_UPDATE' ? (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 text-sm">
            <div><dt className="text-gray-500 text-xs">Raison sociale</dt><dd className="text-gray-800">{sub.info.name}</dd></div>
            <div><dt className="text-gray-500 text-xs">Ville</dt><dd className="text-gray-800">{sub.info.city}</dd></div>
            <div><dt className="text-gray-500 text-xs">ICE</dt><dd className="text-gray-800 font-mono">{sub.info.ice}</dd></div>
            <div><dt className="text-gray-500 text-xs">Téléphone</dt><dd className="text-gray-800">{sub.info.phone}</dd></div>
            <div className="sm:col-span-2"><dt className="text-gray-500 text-xs">Adresse</dt><dd className="text-gray-800">{sub.info.address}</dd></div>
            <div className="sm:col-span-2"><dt className="text-gray-500 text-xs">Description</dt><dd className="text-gray-700 leading-relaxed">{sub.info.description}</dd></div>
          </dl>
        ) : (
          <div className="text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-800">{sub.entry.title}</h3>
              {sub.progress !== null && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700">
                  Avancement → {sub.progress}%
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{sub.entry.project} · {formatDate(sub.entry.date)}</p>
            <p className="text-gray-600 mt-2 leading-relaxed">{sub.entry.description}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/60">
        <button
          onClick={() => approveSubmission(sub.id)}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
          Valider et publier
        </button>
        <button
          onClick={() => rejectSubmission(sub.id)}
          className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Rejeter
        </button>
      </div>
    </li>
  )
}

export default function ValidationPage() {
  const { pending } = useDemoStore()

  function handleReset() {
    if (window.confirm('Réinitialiser la démo ? Toutes les modifications publiées et en attente seront effacées et la fiche publique reviendra à son état initial.')) {
      resetDemo()
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#cc2200] bg-red-50 px-2 py-0.5 rounded">
              Admin ImmoTrust · Démo
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">File de validation</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Rien n’est publié sur le site public sans vérification d’ImmoTrust. Validez une soumission
            pour la rendre visible <strong>en direct</strong> sur la fiche publique.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#cc2200] border border-gray-200 hover:border-[#cc2200]/40 px-3 py-2 rounded-lg transition-colors"
          title="Repartir d’un état propre entre deux présentations"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 12a9 9 0 109-9 9 9 0 00-6.36 2.64L3 8" /><path d="M3 3v5h5" />
          </svg>
          Réinitialiser la démo
        </button>
      </header>

      {pending.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <p className="text-gray-600 font-medium">Aucune soumission en attente</p>
          <p className="text-sm text-gray-500 mt-1">
            Les mises à jour soumises depuis l’espace promoteur apparaîtront ici pour validation.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <Link href="/demo/promoteur/chantier" className="font-semibold text-primary-700 hover:text-primary-800">Aller au fil chantier →</Link>
            <Link href="/demo/promoteur/informations" className="font-semibold text-primary-700 hover:text-primary-800">Modifier les infos →</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              {pending.length} soumission{pending.length > 1 ? 's' : ''} en attente
            </span>
            <a
              href="/projet/residences-zineb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800"
            >
              Ouvrir la fiche publique
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
            </a>
          </div>
          <ul className="space-y-4">
            {pending.map((sub) => (
              <SubmissionCard key={sub.id} sub={sub} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
