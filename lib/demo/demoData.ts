/**
 * Données fictives crédibles pour la démo SMAP (Phase 1).
 * Promoteur démo : « Résidences Zineb — Casablanca ».
 * Aucune donnée réelle. Tout est statique côté client.
 */

import type { ScoreInputs } from './score'

export const DEMO_CREDENTIALS = {
  email: 'demo@immotrust.ma',
  password: 'SMAP2026',
} as const

/** Clé de « session » démo en sessionStorage (auth simulée). */
export const DEMO_SESSION_KEY = 'immotrust_demo_session'

export const demoPromoter = {
  name: 'Résidences Zineb',
  city: 'Casablanca',
  tagline: 'Résidences Zineb — Casablanca',
  ice: '0027459800087',
  address: '14, boulevard Zerktouni, Casablanca 20100',
  phone: '+212 5 22 00 00 00',
  email: 'contact@residences-zineb.ma',
  description:
    'Promoteur casablancais spécialisé dans les résidences de moyen et haut standing. Trois projets actifs sur le grand Casablanca, avec un suivi de chantier transparent.',
  trustScore: 78,
  label: 'Excellent' as const,
  lastRecalc: '8 juin 2026',
  isVerified: true,
}

/** Entrée du fil chantier (MAJ publiées). */
export type ChantierUpdate = {
  id: string
  date: string // ISO yyyy-mm-dd
  title: string
  description: string
  project: string
  status: 'published' | 'pending'
}

export const demoChantierFeed: ChantierUpdate[] = [
  {
    id: 'u1',
    date: '2026-06-05',
    title: 'Coulage de la dalle du 6ᵉ étage',
    description:
      "La structure de la résidence Les Jardins de Zineb atteint le 6ᵉ niveau. Le gros œuvre avance conformément au planning révisé.",
    project: 'Les Jardins de Zineb',
    status: 'published',
  },
  {
    id: 'u2',
    date: '2026-05-22',
    title: 'Livraison des menuiseries extérieures',
    description:
      'Pose des fenêtres aluminium double vitrage sur les façades sud et est du bâtiment A.',
    project: 'Résidence Zineb Park',
    status: 'published',
  },
  {
    id: 'u3',
    date: '2026-05-09',
    title: 'Achèvement des fondations',
    description:
      'Les fondations profondes du projet Zineb Marina sont achevées et réceptionnées par le bureau de contrôle.',
    project: 'Zineb Marina',
    status: 'published',
  },
  {
    id: 'u4',
    date: '2026-04-18',
    title: 'Démarrage du second œuvre',
    description:
      'Plomberie et électricité lancées sur les trois premiers niveaux des Jardins de Zineb.',
    project: 'Les Jardins de Zineb',
    status: 'published',
  },
]

/** Stats de visite (agrégées, anonymes) pour le dashboard. */
export const demoVisitStats = {
  last7: 342,
  last30: 1487,
  total: 9216,
  // Vues/jour sur 7 jours pour un mini-graphe en barres
  daily7: [38, 52, 41, 67, 49, 58, 37],
  dailyLabels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
}

/** Alertes & recommandations affichées sur le dashboard démo. */
export type DemoAlert = {
  id: string
  level: 'info' | 'warning' | 'critical'
  title: string
  detail: string
  cta?: { label: string; href: string }
}

export const demoAlerts: DemoAlert[] = [
  {
    id: 'a1',
    level: 'warning',
    title: 'Document manquant : Garantie Financière d’Achèvement',
    detail: "La GFA du projet Zineb Marina n’est pas encore vérifiée. L’ajouter augmenterait votre score de +20 pts.",
    cta: { label: 'Simuler l’impact', href: '/demo/promoteur/simulation' },
  },
  {
    id: 'a2',
    level: 'warning',
    title: 'Retard constaté sur Zineb Marina',
    detail: 'Un écart de planning a été relevé par nos équipes. Publiez une mise à jour de chantier pour rassurer les acheteurs.',
    cta: { label: 'Mettre à jour le chantier', href: '/demo/promoteur/chantier' },
  },
  {
    id: 'a3',
    level: 'info',
    title: 'Encouragez les avis acheteurs',
    detail: 'Vos premiers avis vérifiés feront basculer votre score sur la formule complète (avec coefficient avis).',
  },
]

/** Valeurs d’entrée de DÉPART pour le simulateur (état actuel du promoteur démo). */
export const demoScoreDefaults: ScoreInputs = {
  has_permis: true,
  has_titre: true,
  has_plans: true,
  has_gfa: false, // GFA manquante → cohérent avec l'alerte a1
  delay_months: 2, // léger retard → cohérent avec l'alerte a2
  is_halted: false,
  no_dispute: true,
  inspector_access: 'PARTIAL',
  ice_published: true,
  avg_rating: 0, // aucun avis publié pour l'instant → formule temporaire
}

/** Projets du promoteur démo (pour le formulaire infos et le contexte). */
export const demoProjects = [
  { id: 'jardins-de-zineb', title: 'Les Jardins de Zineb', city: 'Casablanca', progress: 62, status: 'En cours' },
  { id: 'zineb-park', title: 'Résidence Zineb Park', city: 'Casablanca', progress: 84, status: 'En cours' },
  { id: 'zineb-marina', title: 'Zineb Marina', city: 'Mohammedia', progress: 28, status: 'Retard' },
]
