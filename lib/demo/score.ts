/**
 * Moteur de calcul du Score de Confiance — SIMULATION (Phase 1 démo SMAP).
 *
 * ⚠️ Code jetable, calcul 100 % côté client (JS pur), aucun appel réseau.
 * La formule reproduit À L'IDENTIQUE la spécification du brief V1.1 (§10.3 / §13).
 * En production (Phase 2), ce calcul sera fait côté serveur après vérification.
 */

export type InspectorAccess = 'FULL' | 'PARTIAL' | 'NONE'

export type ScoreInputs = {
  // C_Doc
  has_permis: boolean
  has_titre: boolean
  has_plans: boolean
  has_gfa: boolean
  // C_Chantier
  delay_months: number
  is_halted: boolean
  // C_Transp
  no_dispute: boolean
  inspector_access: InspectorAccess
  ice_published: boolean
  // C_Avis (note moyenne 0 = aucun avis → formule temporaire)
  avg_rating: number
}

export type ScoreLabel = 'Excellent' | 'Fiable' | 'Vigilance'

export type Recommendation = {
  text: string
  points: number // gain potentiel estimé
  tone: 'doc' | 'chantier' | 'transp' | 'avis'
}

export type SimulatedScore = {
  score: number
  breakdown: {
    c_doc: number
    c_chantier: number
    c_transp: number
    c_avis: number | null
  }
  /** Pondérations appliquées selon la présence ou non d'avis (pour l'affichage). */
  weights: {
    doc: number
    chantier: number
    transp: number
    avis: number | null
  }
  hasReviews: boolean
  label: ScoreLabel
  recommendations: Recommendation[]
}

/** C_Doc (0-100) */
export function calcCDoc(i: ScoreInputs): number {
  let c = 0
  if (i.has_permis) c += 30
  if (i.has_titre) c += 30
  if (i.has_plans) c += 20
  if (i.has_gfa) c += 20
  return c
}

/** C_Chantier (0-100) — basé sur le retard estimé */
export function calcCChantier(i: ScoreInputs): number {
  if (i.is_halted) return 0
  if (i.delay_months > 6) return 20
  if (i.delay_months > 0) return 60
  return 100
}

/** C_Transp (0-100) */
export function calcCTransp(i: ScoreInputs): number {
  let c = 0
  if (i.no_dispute) c += 50
  if (i.inspector_access === 'FULL') c += 30
  else if (i.inspector_access === 'PARTIAL') c += 15
  if (i.ice_published) c += 20
  return c
}

/** Label + couleur charte selon le score. Seuils brief : ≥75 / ≥50. */
export function getScoreLabel(score: number): { label: ScoreLabel; color: string } {
  if (score >= 75) return { label: 'Excellent', color: '#1a3a2a' }
  if (score >= 50) return { label: 'Fiable', color: '#e87722' }
  return { label: 'Vigilance', color: '#cc2200' }
}

function generateRecommendations(i: ScoreInputs): Recommendation[] {
  const recos: Recommendation[] = []

  // Documents manquants
  if (!i.has_permis) recos.push({ text: 'Faites vérifier votre permis de construire.', points: 30, tone: 'doc' })
  if (!i.has_titre) recos.push({ text: 'Faites vérifier votre titre foncier.', points: 30, tone: 'doc' })
  if (!i.has_plans) recos.push({ text: 'Ajoutez les plans architecturaux validés.', points: 20, tone: 'doc' })
  if (!i.has_gfa) recos.push({ text: 'Fournissez la Garantie Financière d’Achèvement (GFA).', points: 20, tone: 'doc' })

  // Chantier
  if (i.is_halted) {
    recos.push({ text: 'Chantier arrêté : reprenez les travaux et publiez une mise à jour.', points: 100, tone: 'chantier' })
  } else if (i.delay_months > 6) {
    recos.push({ text: 'Retard important (> 6 mois) : un plan de rattrapage redonnerait jusqu’à +80 pts de chantier.', points: 80, tone: 'chantier' })
  } else if (i.delay_months > 0) {
    recos.push({ text: 'Léger retard constaté : rattraper le planning vaut +40 pts de chantier.', points: 40, tone: 'chantier' })
  }

  // Transparence
  if (!i.no_dispute) recos.push({ text: 'Aucun litige déclaré augmenterait fortement votre transparence (+50 pts).', points: 50, tone: 'transp' })
  if (i.inspector_access !== 'FULL') {
    const gain = i.inspector_access === 'PARTIAL' ? 15 : 30
    recos.push({ text: 'Accordez un accès inspecteur complet à nos équipes terrain.', points: gain, tone: 'transp' })
  }
  if (!i.ice_published) recos.push({ text: 'Publiez votre numéro ICE : +20 pts de transparence.', points: 20, tone: 'transp' })

  // Avis
  if (i.avg_rating <= 0) {
    recos.push({ text: 'Aucun avis acheteur : invitez vos clients à témoigner auprès d’ImmoTrust.', points: 0, tone: 'avis' })
  }

  // Tri par gain décroissant pour mettre en avant les actions à fort impact
  return recos.sort((a, b) => b.points - a.points)
}

/**
 * Calcul principal — instantané, pur, sans effet de bord.
 * Avec avis : Score = C_Doc×0.30 + C_Chantier×0.25 + C_Avis×0.25 + C_Transp×0.20
 * Sans avis : Score = C_Doc×0.45 + C_Chantier×0.35 + C_Transp×0.20
 */
export function calculateSimulatedScore(i: ScoreInputs): SimulatedScore {
  const c_doc = calcCDoc(i)
  const c_chantier = calcCChantier(i)
  const c_transp = calcCTransp(i)

  const hasReviews = i.avg_rating > 0
  const c_avis = hasReviews ? i.avg_rating * 20 : null

  let score: number
  let weights: SimulatedScore['weights']

  if (hasReviews && c_avis !== null) {
    score = c_doc * 0.3 + c_chantier * 0.25 + c_avis * 0.25 + c_transp * 0.2
    weights = { doc: 0.3, chantier: 0.25, transp: 0.2, avis: 0.25 }
  } else {
    score = c_doc * 0.45 + c_chantier * 0.35 + c_transp * 0.2
    weights = { doc: 0.45, chantier: 0.35, transp: 0.2, avis: null }
  }

  const rounded = Math.round(score)

  return {
    score: rounded,
    breakdown: { c_doc, c_chantier, c_transp, c_avis },
    weights,
    hasReviews,
    label: getScoreLabel(rounded).label,
    recommendations: generateRecommendations(i),
  }
}
