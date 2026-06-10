'use client'

import { useState } from 'react'
import { demoPromoter } from '@/lib/demo/demoData'

type Form = {
  name: string
  ice: string
  city: string
  address: string
  phone: string
  email: string
  description: string
}

const initial: Form = {
  name: demoPromoter.name,
  ice: demoPromoter.ice,
  city: demoPromoter.city,
  address: demoPromoter.address,
  phone: demoPromoter.phone,
  email: demoPromoter.email,
  description: demoPromoter.description,
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
    </div>
  )
}

export default function InformationsPage() {
  const [form, setForm] = useState<Form>(initial)
  const [submitted, setSubmitted] = useState(false)

  function set<K extends keyof Form>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
    setSubmitted(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes informations</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Tenez à jour les informations publiques de votre société. Toute modification est soumise à
          la validation d’ImmoTrust avant publication.
        </p>
      </header>

      {submitted && (
        <div className="mb-5 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#155e38" strokeWidth="2.5" className="shrink-0 mt-0.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-primary-800">Modifications soumises</p>
            <p className="text-sm text-primary-700/80">
              Vos informations sont en attente de validation par ImmoTrust. Elles seront publiées
              après vérification.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Raison sociale" id="name" value={form.name} onChange={(v) => set('name', v)} />
          <Field label="Numéro ICE" id="ice" value={form.ice} onChange={(v) => set('ice', v)} />
          <Field label="Ville" id="city" value={form.city} onChange={(v) => set('city', v)} />
          <Field label="Téléphone" id="phone" type="tel" value={form.phone} onChange={(v) => set('phone', v)} />
        </div>

        <Field label="Adresse" id="address" value={form.address} onChange={(v) => set('address', v)} />
        <Field label="Email de contact" id="email" type="email" value={form.email} onChange={(v) => set('email', v)} />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description de la société
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-1">
          <button
            type="button"
            onClick={() => { setForm(initial); setSubmitted(false) }}
            className="order-2 sm:order-1 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="order-1 sm:order-2 px-5 py-2.5 rounded-lg bg-primary-700 hover:bg-primary-600 text-white text-sm font-semibold transition-colors"
          >
            Soumettre les modifications
          </button>
        </div>
      </form>
    </div>
  )
}
