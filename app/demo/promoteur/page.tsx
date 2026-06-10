'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { DEMO_CREDENTIALS, DEMO_SESSION_KEY } from '@/lib/demo/demoData'

export default function DemoLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      setLoading(true)
      sessionStorage.setItem(DEMO_SESSION_KEY, 'ok')
      router.push('/demo/promoteur/dashboard')
    } else {
      setError('Identifiants incorrects. Utilisez les identifiants démo ci-dessous.')
    }
  }

  function fillDemo() {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setError('')
  }

  // Accès démo en un clic — remplit, ouvre la session et redirige directement.
  function loginDemo() {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setLoading(true)
    sessionStorage.setItem(DEMO_SESSION_KEY, 'ok')
    router.push('/demo/promoteur/dashboard')
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10 hero-gradient">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-7 sm:p-8">
          <div className="flex justify-center mb-6">
            <Image src="/logo-ImmoTrust-Maroc.png" alt="ImmoTrust Maroc" width={160} height={48} className="h-12 w-auto" style={{ width: 'auto' }} priority />
          </div>

          <h1 className="text-xl font-bold text-center text-gray-900">Espace promoteur</h1>
          <p className="text-sm text-gray-500 text-center mt-1 mb-5">
            Connectez-vous pour accéder à votre tableau de bord
          </p>

          {/* Accès démo en un clic — chemin principal pour le salon */}
          <button
            type="button"
            onClick={loginDemo}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            {loading ? 'Connexion…' : 'Entrer en mode démo'}
          </button>

          {/* Séparateur */}
          <div className="flex items-center gap-3 my-5">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">ou connexion manuelle</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.ma"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-[#cc2200] bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-primary-700 text-primary-700 hover:bg-primary-50 disabled:opacity-60 font-semibold py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>

          {/* Encart identifiants démo salon */}
          <div className="mt-6 rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                Identifiants démo
              </span>
              <button
                type="button"
                onClick={fillDemo}
                className="text-xs font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
              >
                Pré-remplir
              </button>
            </div>
            <dl className="mt-2 text-sm text-gray-700 space-y-0.5">
              <div className="flex gap-2">
                <dt className="text-gray-500 w-20">Email</dt>
                <dd className="font-mono">{DEMO_CREDENTIALS.email}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 w-20">Mot de passe</dt>
                <dd className="font-mono">{DEMO_CREDENTIALS.password}</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="text-center text-white/70 text-xs mt-5">
          ImmoTrust Maroc — Environnement de démonstration
        </p>
      </div>
    </div>
  )
}
