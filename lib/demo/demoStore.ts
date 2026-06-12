/**
 * Store partagé pour la démo SMAP — « mini-backend » côté navigateur.
 *
 * Sans base de données : l'état vit dans localStorage et se synchronise
 * EN DIRECT entre les onglets via BroadcastChannel (même navigateur).
 * Permet le flux : promoteur soumet → ImmoTrust valide → front public mis à jour.
 *
 * ⚠️ Code jetable Phase 1. Live uniquement sur l'appareil qui pilote la démo.
 */

import { useSyncExternalStore } from 'react'
import { demoPromoter, demoChantierFeed } from './demoData'

const STORAGE_KEY = 'immotrust_demo_state'
const CHANNEL_NAME = 'immotrust-demo'

export type PromoterInfo = {
  name: string
  city: string
  ice: string
  address: string
  phone: string
  email: string
  description: string
}

export type PublishedChantier = {
  id: string
  date: string // yyyy-mm-dd
  title: string
  description: string
  project: string
}

export type DemoPublished = {
  info: PromoterInfo
  progress: number // avancement % du projet phare publié sur le front
  chantier: PublishedChantier[]
  score: number // score de confiance publié (validé par ImmoTrust)
}

export type Submission =
  | { id: string; type: 'INFO_UPDATE'; createdAt: number; info: PromoterInfo }
  | {
      id: string
      type: 'CONSTRUCTION_UPDATE'
      createdAt: number
      entry: PublishedChantier
      progress: number | null
    }
  | { id: string; type: 'SCORE_UPDATE'; createdAt: number; score: number }

export type DemoState = {
  published: DemoPublished
  pending: Submission[]
}

/** Projet phare présenté sur la fiche publique live. */
export const FLAGSHIP_PROJECT = 'Les Jardins de Zineb'
export const FLAGSHIP_DEFAULT_PROGRESS = 62
export const DEFAULT_PUBLISHED_SCORE = 78

function makeDefault(): DemoState {
  return {
    published: {
      info: {
        name: demoPromoter.name,
        city: demoPromoter.city,
        ice: demoPromoter.ice,
        address: demoPromoter.address,
        phone: demoPromoter.phone,
        email: demoPromoter.email,
        description: demoPromoter.description,
      },
      progress: FLAGSHIP_DEFAULT_PROGRESS,
      chantier: demoChantierFeed
        .filter((u) => u.status === 'published')
        .map(({ id, date, title, description, project }) => ({ id, date, title, description, project })),
      score: DEFAULT_PUBLISHED_SCORE,
    },
    pending: [],
  }
}

/** Snapshot serveur / pré-montage stable (évite le tearing SSR). */
const SERVER_STATE: DemoState = makeDefault()

let memory: DemoState | null = null
let channel: BroadcastChannel | null = null
let initialized = false
const listeners = new Set<() => void>()

const isBrowser = () => typeof window !== 'undefined'

function readStorage(): DemoState {
  if (!isBrowser()) return SERVER_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as DemoState
  } catch {
    /* ignore parse/quota errors — on retombe sur le défaut */
  }
  return makeDefault()
}

function emit() {
  listeners.forEach((l) => l())
}

function ensureInit() {
  if (initialized || !isBrowser()) return
  initialized = true
  memory = readStorage()
  try {
    channel = new BroadcastChannel(CHANNEL_NAME)
    channel.onmessage = () => {
      memory = readStorage()
      emit()
    }
  } catch {
    /* BroadcastChannel indisponible — on garde la sync via l'event storage */
  }
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      memory = readStorage()
      emit()
    }
  })
}

function write(next: DemoState) {
  memory = next
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* quota — ignore */
    }
    channel?.postMessage('update')
  }
  emit()
}

function getSnapshot(): DemoState {
  if (!isBrowser()) return SERVER_STATE
  ensureInit()
  if (!memory) memory = readStorage()
  return memory
}

function getServerSnapshot(): DemoState {
  return SERVER_STATE
}

function subscribe(cb: () => void) {
  ensureInit()
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

/* ── Actions ─────────────────────────────────────────────────── */

export function submitInfoUpdate(info: PromoterInfo) {
  const state = getSnapshot()
  const submission: Submission = { id: uid('sub'), type: 'INFO_UPDATE', createdAt: Date.now(), info }
  write({ ...state, pending: [submission, ...state.pending] })
}

export function submitConstructionUpdate(
  entry: Omit<PublishedChantier, 'id'>,
  progress: number | null,
) {
  const state = getSnapshot()
  const submission: Submission = {
    id: uid('sub'),
    type: 'CONSTRUCTION_UPDATE',
    createdAt: Date.now(),
    entry: { ...entry, id: uid('upd') },
    progress,
  }
  write({ ...state, pending: [submission, ...state.pending] })
}

export function submitScoreUpdate(score: number) {
  const state = getSnapshot()
  const submission: Submission = { id: uid('sub'), type: 'SCORE_UPDATE', createdAt: Date.now(), score }
  write({ ...state, pending: [submission, ...state.pending] })
}

export function approveSubmission(id: string) {
  const state = getSnapshot()
  const sub = state.pending.find((s) => s.id === id)
  if (!sub) return

  const published = { ...state.published }
  if (sub.type === 'INFO_UPDATE') {
    published.info = sub.info
  } else if (sub.type === 'SCORE_UPDATE') {
    published.score = sub.score
  } else {
    published.chantier = [sub.entry, ...state.published.chantier]
    if (sub.progress !== null) published.progress = sub.progress
  }

  write({ published, pending: state.pending.filter((s) => s.id !== id) })
}

export function rejectSubmission(id: string) {
  const state = getSnapshot()
  write({ ...state, pending: state.pending.filter((s) => s.id !== id) })
}

/** Réinitialise toute la démo (utile entre deux présentations au salon). */
export function resetDemo() {
  write(makeDefault())
}

/* ── Hook React ──────────────────────────────────────────────── */

export function useDemoStore(): DemoState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
