'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Fraunces } from 'next/font/google'

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const features = [
  {
    title: 'Promoteurs vérifiés',
    text: 'Chaque promoteur est contrôlé sur des critères objectifs : documents, légalité, historique. Pas de classement marketing, des faits.',
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" />
    ),
  },
  {
    title: 'Score de confiance',
    text: 'Une note transparente sur 100, calculée par nos équipes après vérification. Jamais achetée, jamais négociée.',
    icon: <path d="M3 3v18h18 M18 17V9 M13 17V5 M8 17v-3" />,
  },
  {
    title: 'Suivi de chantier',
    text: "L'avancement réel de votre projet, étape par étape, vérifié sur le terrain. Vous savez exactement où en sont les travaux.",
    icon: <path d="M2 20h20 M4 20V8l8-5 8 5v12 M9 20v-6h6v6" />,
  },
]

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setDone(true)
  }

  return (
    <div className="cs-root fixed inset-0 z-[100] overflow-y-auto text-[#eef3ef]">
      <style>{`
        @keyframes cs-rise { from { opacity:0; transform: translateY(18px); } to { opacity:1; transform:none; } }
        @keyframes cs-glow { 0%,100%{ opacity:.5 } 50%{ opacity:.85 } }
        @keyframes cs-dot { 0%,100%{ transform:scale(1); opacity:1 } 50%{ transform:scale(1.5); opacity:.55 } }
        .cs-root{ background:#06170f; }
        .cs-rise{ opacity:0; animation: cs-rise .9s cubic-bezier(.16,.84,.44,1) forwards; }
        .cs-d1{animation-delay:.05s}.cs-d2{animation-delay:.18s}.cs-d3{animation-delay:.31s}
        .cs-d4{animation-delay:.44s}.cs-d5{animation-delay:.57s}.cs-d6{animation-delay:.70s}.cs-d7{animation-delay:.83s}
        @media (prefers-reduced-motion: reduce){ .cs-rise{ animation:none; opacity:1 } }
      `}</style>

      {/* Fonds : dégradés radiaux + grille + grain */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% -10%, #155e38 0%, #0e3d25 38%, #06170f 72%)' }} />
        <div className="absolute inset-0" style={{ animation: 'cs-glow 7s ease-in-out infinite', background: 'radial-gradient(50% 38% at 78% 8%, rgba(56,173,116,.30), transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '46px 46px', maskImage: 'radial-gradient(70% 60% at 50% 30%, #000 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(70% 60% at 50% 30%, #000 30%, transparent 80%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      </div>

      <div className="relative min-h-full flex flex-col max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
        {/* En-tête : logo */}
        <header className="cs-rise cs-d1 flex items-center justify-between">
          <Image src="/logo-ImmoTrust-Maroc-for-dark-background.png" alt="ImmoTrust Maroc" width={150} height={45} className="h-10 w-auto" style={{ width: 'auto' }} priority />
          <span className="hidden sm:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9ccdb2]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#cc2200]" style={{ animation: 'cs-dot 2.4s ease-in-out infinite' }} />
            </span>
            En développement
          </span>
        </header>

        {/* Corps */}
        <main className="flex-1 flex flex-col justify-center py-14 sm:py-20">
          <p className="cs-rise cs-d2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7fbf9c]">
            ImmoTrust Maroc · Tiers de confiance immobilier
          </p>

          <h1 className={`${display.className} cs-rise cs-d3 mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.04] font-semibold tracking-tight`}>
            La confiance se construit.
            <br />
            <span className="italic text-[#9ccdb2]">Notre plateforme aussi.</span>
          </h1>

          <p className="cs-rise cs-d4 mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#cfe0d6]">
            Nous finalisons la première plateforme marocaine de vérification indépendante
            des promoteurs et des projets immobiliers. Pensée pour les MRE et les
            investisseurs qui veulent <span className="text-white font-medium">acheter sur plan en toute sérénité</span>,
            même à distance.
          </p>

          {/* Trois piliers */}
          <div className="cs-rise cs-d5 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 transition-colors hover:bg-white/[0.07]">
                <div className="w-9 h-9 rounded-xl bg-[#155e38] flex items-center justify-center mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ccdb2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {f.icon}
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-white">{f.title}</h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#aecbbb]">{f.text}</p>
              </div>
            ))}
          </div>

          {/* Lancement + capture email */}
          <div className="cs-rise cs-d6 mt-11 flex flex-col gap-5">
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#cc2200]/40 bg-[#cc2200]/10 px-3 py-1 text-xs font-semibold text-[#ff9b86]">
                Lancement
              </span>
              <span className="text-[#cfe0d6]">Mise en ligne prévue — <span className="text-white font-semibold">Septembre 2026</span></span>
            </div>

            {done ? (
              <div className="rounded-2xl border border-[#38ad74]/30 bg-[#155e38]/30 px-5 py-4 flex items-center gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-[#155e38] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ccdb2" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                </span>
                <p className="text-sm text-[#dbeae1]">
                  <span className="font-semibold text-white">Merci !</span> Vous serez parmi les premiers informés du lancement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <label htmlFor="cs-email" className="sr-only">Votre adresse email</label>
                <input
                  id="cs-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-[#8fae9d] focus:outline-none focus:border-[#38ad74] focus:ring-2 focus:ring-[#38ad74]/30"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#1f8f58] hover:bg-[#38ad74] text-white text-sm font-semibold px-6 py-3 transition-colors whitespace-nowrap"
                >
                  Être prévenu·e
                </button>
              </form>
            )}
            <p className="text-xs text-[#88a896]">
              Promoteur ? Écrivez-nous à{' '}
              <a href="mailto:contact@immotrust.ma" className="text-[#9ccdb2] underline underline-offset-2 hover:text-white">contact@immotrust.ma</a>{' '}
              pour rejoindre le lancement.
            </p>
          </div>
        </main>

        {/* Pied */}
        <footer className="cs-rise cs-d7 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#88a896]">
          <p>© {new Date().getFullYear()} ImmoTrust Maroc — Transparence · Confiance · Sérénité</p>
          <div className="flex items-center gap-4">
            <span>Casablanca, Maroc</span>
            <a href="mailto:contact@immotrust.ma" className="hover:text-white transition-colors">contact@immotrust.ma</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
