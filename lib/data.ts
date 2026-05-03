export type Promoteur = {
  id: string
  nom: string
  scoreConfiance: number
  projetsActifs: number
  anneeCreation: number
  ville: string
  description: string
  couleur: string
}

export type TimelineEvent = {
  date: string
  titre: string
  description: string
  statut: 'completed' | 'current' | 'upcoming'
}

export type Photo = {
  titre: string
  date: string
  verifie: boolean
  couleur: string
}

export type DocumentItem = {
  nom: string
  type: string
  taille: string
  date: string
  verifie: boolean
}

export type NiveauRisque = 'faible' | 'moyen' | 'élevé'

export type Risque = {
  categorie: string
  niveau: NiveauRisque
  description: string
  icone: string
}

export type Recommandation = {
  niveau: 'Excellent' | 'Bon' | 'Acceptable' | 'Risqué'
  score: number
  texte: string
}

export type Projet = {
  id: string
  titre: string
  promoteurId: string
  promoteurNom: string
  ville: string
  quartier: string
  type: string
  avancement: number
  prixMin: number
  prixMax: number
  livraison: string
  couleur: string
  couleur2: string
  surface: string
  description: string
  totalUnites: number
  unitesVendues: number
  timeline: TimelineEvent[]
  photos: Photo[]
  documents: DocumentItem[]
  risques: Risque[]
  recommandation: Recommandation
}

export const promoteurs: Promoteur[] = [
  {
    id: 'al-omrane',
    nom: 'Groupe Al Omrane',
    scoreConfiance: 94,
    projetsActifs: 23,
    anneeCreation: 2004,
    ville: 'Casablanca',
    description: 'Leader public de l\'habitat social et intermédiaire au Maroc.',
    couleur: '#1d4ed8',
  },
  {
    id: 'alliances',
    nom: 'Alliances Développement',
    scoreConfiance: 87,
    projetsActifs: 12,
    anneeCreation: 1994,
    ville: 'Casablanca',
    description: 'Promoteur coté en bourse, spécialisé dans le haut standing.',
    couleur: '#7c3aed',
  },
  {
    id: 'addoha',
    nom: 'Groupe Addoha',
    scoreConfiance: 82,
    projetsActifs: 18,
    anneeCreation: 1988,
    ville: 'Casablanca',
    description: 'Groupe diversifié présent sur tous les segments du marché.',
    couleur: '#dc2626',
  },
  {
    id: 'dar-saada',
    nom: 'Résidences Dar Saada',
    scoreConfiance: 76,
    projetsActifs: 9,
    anneeCreation: 2004,
    ville: 'Casablanca',
    description: 'Spécialisé dans les logements économiques et intermédiaires.',
    couleur: '#d97706',
  },
]

export const projets: Projet[] = [
  {
    id: 'al-yasmine-casablanca',
    titre: 'Résidence Al Yasmine',
    promoteurId: 'al-omrane',
    promoteurNom: 'Groupe Al Omrane',
    ville: 'Casablanca',
    quartier: 'Sidi Maarouf',
    type: 'Appartement',
    avancement: 68,
    prixMin: 650000,
    prixMax: 1200000,
    livraison: 'Décembre 2024',
    couleur: '#0e7490',
    couleur2: '#164e63',
    surface: '65 - 120 m²',
    description: 'Résidence moderne au cœur de Sidi Maarouf avec appartements de standing et vue panoramique sur Casablanca.',
    totalUnites: 240,
    unitesVendues: 187,
    timeline: [
      { date: 'Mars 2022', titre: 'Permis de construire obtenu', description: 'Le permis de construire a été délivré par la commune de Casablanca après examen complet du dossier.', statut: 'completed' },
      { date: 'Juin 2022', titre: 'Début du terrassement', description: 'Les travaux de terrassement et d\'infrastructure ont débuté conformément au planning initial.', statut: 'completed' },
      { date: 'Janvier 2023', titre: 'Fondations et gros œuvre', description: 'Achèvement des fondations et démarrage du gros œuvre sur les 12 niveaux de la résidence.', statut: 'completed' },
      { date: 'Septembre 2023', titre: 'Second œuvre en cours', description: 'Les travaux de second œuvre (plomberie, électricité, cloisons) sont en cours d\'exécution.', statut: 'current' },
      { date: 'Juin 2024', titre: 'Finitions et espaces communs', description: 'Réalisation des finitions intérieures et aménagement des espaces communs et de la piscine.', statut: 'upcoming' },
      { date: 'Décembre 2024', titre: 'Livraison prévue', description: 'Livraison des clés aux acquéreurs et remise de l\'ensemble des documents de propriété.', statut: 'upcoming' },
    ],
    photos: [
      { titre: 'Vue façade principale', date: 'Oct 2023', verifie: true, couleur: '#0e7490' },
      { titre: 'Avancement gros œuvre', date: 'Oct 2023', verifie: true, couleur: '#0369a1' },
      { titre: 'Appartement témoin - Salon', date: 'Sept 2023', verifie: true, couleur: '#1d4ed8' },
      { titre: 'Parking sous-sol niveau -2', date: 'Août 2023', verifie: false, couleur: '#374151' },
      { titre: 'Piscine en construction', date: 'Oct 2023', verifie: true, couleur: '#0891b2' },
      { titre: 'Vue depuis le 8ème étage', date: 'Oct 2023', verifie: true, couleur: '#155e38' },
    ],
    documents: [
      { nom: 'Permis de construire n°PC-2022-04521', type: 'PDF', taille: '2.4 MB', date: 'Mars 2022', verifie: true },
      { nom: 'Plan de masse approuvé', type: 'PDF', taille: '4.1 MB', date: 'Février 2022', verifie: true },
      { nom: 'Fiche technique du projet', type: 'PDF', taille: '1.8 MB', date: 'Juin 2022', verifie: true },
      { nom: 'Contrat type VEFA', type: 'PDF', taille: '0.9 MB', date: 'Juillet 2022', verifie: true },
      { nom: 'Rapport d\'avancement - T3 2023', type: 'PDF', taille: '3.2 MB', date: 'Octobre 2023', verifie: true },
      { nom: 'Assurance dommages-ouvrage', type: 'PDF', taille: '1.1 MB', date: 'Mars 2022', verifie: true },
    ],
    risques: [
      { categorie: 'Risque financier', niveau: 'faible', description: 'Le projet est financé à 78% par fonds propres. Taux de vente de 78% sur l\'ensemble des unités.', icone: '💰' },
      { categorie: 'Risque juridique', niveau: 'faible', description: 'Tous les documents légaux sont en règle. Aucun litige enregistré sur ce projet.', icone: '⚖️' },
      { categorie: 'Risque de livraison', niveau: 'moyen', description: 'Un retard de 2 mois est possible en raison de la disponibilité des matériaux de finition importés.', icone: '⏰' },
      { categorie: 'Risque qualité', niveau: 'faible', description: 'Suivi des normes AIMF. Les inspections sur site montrent un travail conforme aux spécifications contractuelles.', icone: '🏗️' },
    ],
    recommandation: {
      niveau: 'Excellent',
      score: 91,
      texte: 'Ce projet présente d\'excellentes garanties pour les investisseurs. Le promoteur Al Omrane dispose d\'un historique solide et irréprochable. Les documents légaux sont complets, le niveau d\'avancement est conforme au planning et le taux de vente est rassurant. Nous recommandons vivement cet investissement avec un risque global très faible.',
    },
  },
  {
    id: 'jardins-de-rabat',
    titre: 'Jardins de Rabat',
    promoteurId: 'alliances',
    promoteurNom: 'Alliances Développement',
    ville: 'Rabat',
    quartier: 'Hay Riad',
    type: 'Villa',
    avancement: 45,
    prixMin: 2800000,
    prixMax: 5500000,
    livraison: 'Juin 2025',
    couleur: '#7c3aed',
    couleur2: '#4c1d95',
    surface: '250 - 480 m²',
    description: 'Ensemble résidentiel de villas contemporaines dans le quartier prisé de Hay Riad avec jardins paysagers.',
    totalUnites: 48,
    unitesVendues: 31,
    timeline: [
      { date: 'Janvier 2023', titre: 'Obtention du permis de construire', description: 'Permis délivré par la wilaya de Rabat-Salé-Kénitra après révision du dossier urbanistique.', statut: 'completed' },
      { date: 'Avril 2023', titre: 'Début des travaux de viabilisation', description: 'Travaux de voirie, réseaux d\'eau potable, électricité basse tension et assainissement.', statut: 'completed' },
      { date: 'Septembre 2023', titre: 'Fondations en cours', description: 'Les fondations des 48 villas sont en cours de réalisation selon le planning prévu.', statut: 'current' },
      { date: 'Mars 2024', titre: 'Gros œuvre', description: 'Démarrage du gros œuvre pour l\'ensemble des villas du lotissement.', statut: 'upcoming' },
      { date: 'Novembre 2024', titre: 'Second œuvre et finitions', description: 'Réalisation du second œuvre et pose des finitions intérieures haute gamme.', statut: 'upcoming' },
      { date: 'Juin 2025', titre: 'Livraison prévue', description: 'Livraison progressive des villas aux propriétaires avec réception officielle.', statut: 'upcoming' },
    ],
    photos: [
      { titre: 'Maquette 3D du projet', date: 'Oct 2023', verifie: true, couleur: '#7c3aed' },
      { titre: 'État chantier - Fondations', date: 'Oct 2023', verifie: true, couleur: '#6d28d9' },
      { titre: 'Plan de masse approuvé', date: 'Janv 2023', verifie: true, couleur: '#5b21b6' },
      { titre: 'Modèle villa type A - Rendu', date: 'Oct 2023', verifie: false, couleur: '#4c1d95' },
    ],
    documents: [
      { nom: 'Permis de construire global', type: 'PDF', taille: '3.1 MB', date: 'Janvier 2023', verifie: true },
      { nom: 'Plan de masse approuvé', type: 'PDF', taille: '5.8 MB', date: 'Décembre 2022', verifie: true },
      { nom: 'Fiche descriptive des villas', type: 'PDF', taille: '2.3 MB', date: 'Mars 2023', verifie: true },
      { nom: 'Contrat VEFA standard', type: 'PDF', taille: '1.2 MB', date: 'Avril 2023', verifie: true },
    ],
    risques: [
      { categorie: 'Risque financier', niveau: 'faible', description: 'Alliances est coté en bourse (MASI). Financement solide avec 65% de fonds propres et ligne bancaire confirmée.', icone: '💰' },
      { categorie: 'Risque juridique', niveau: 'faible', description: 'Permis en règle. Foncier sécurisé avec titre foncier propre et libre de tout hypothèque.', icone: '⚖️' },
      { categorie: 'Risque de livraison', niveau: 'moyen', description: 'Projet à mi-parcours. Un retard de 3 mois est envisageable selon l\'avancement actuel des fondations.', icone: '⏰' },
      { categorie: 'Risque qualité', niveau: 'faible', description: 'Alliances utilise des matériaux haut de gamme certifiés. Bureau de contrôle indépendant actif sur le site.', icone: '🏗️' },
    ],
    recommandation: {
      niveau: 'Bon',
      score: 84,
      texte: 'Jardins de Rabat est un investissement de qualité dans un emplacement premium de la capitale. Le promoteur Alliances Développement est coté en bourse et bénéficie d\'une solide réputation. L\'avancement de 45% est globalement conforme au calendrier. Quelques réserves mineures sur les délais potentiels de livraison. Recommandé avec vigilance.',
    },
  },
  {
    id: 'terrasses-marrakech',
    titre: 'Les Terrasses de Marrakech',
    promoteurId: 'addoha',
    promoteurNom: 'Groupe Addoha',
    ville: 'Marrakech',
    quartier: 'Guéliz',
    type: 'Appartement',
    avancement: 82,
    prixMin: 890000,
    prixMax: 2100000,
    livraison: 'Mars 2024',
    couleur: '#b45309',
    couleur2: '#78350f',
    surface: '80 - 180 m²',
    description: 'Résidence de prestige au cœur de Guéliz avec vue sur l\'Atlas et piscine à débordement.',
    totalUnites: 120,
    unitesVendues: 108,
    timeline: [
      { date: 'Juin 2021', titre: 'Permis de construire', description: 'Permis accordé par la commune urbaine de Marrakech après étude d\'impact urbanistique.', statut: 'completed' },
      { date: 'Octobre 2021', titre: 'Terrassement et fondations', description: 'Travaux de terrassement et fondations achevés dans les délais prévus au contrat.', statut: 'completed' },
      { date: 'Mai 2022', titre: 'Gros œuvre achevé', description: 'Le gros œuvre de l\'ensemble des bâtiments est terminé avec succès.', statut: 'completed' },
      { date: 'Janvier 2023', titre: 'Second œuvre achevé', description: 'Plomberie, électricité, cloisons et menuiseries extérieures entièrement posées.', statut: 'completed' },
      { date: 'Septembre 2023', titre: 'Finitions en cours', description: 'Carrelages, peintures, sanitaires et équipements de cuisine en cours d\'installation.', statut: 'current' },
      { date: 'Mars 2024', titre: 'Livraison prévue', description: 'Livraison des appartements et remise des titres de propriété aux acquéreurs.', statut: 'upcoming' },
    ],
    photos: [
      { titre: 'Façade principale achevée', date: 'Oct 2023', verifie: true, couleur: '#b45309' },
      { titre: 'Intérieur - Finitions en cours', date: 'Oct 2023', verifie: true, couleur: '#92400e' },
      { titre: 'Piscine à débordement', date: 'Oct 2023', verifie: true, couleur: '#0369a1' },
      { titre: 'Terrasse commune - Vue Atlas', date: 'Oct 2023', verifie: true, couleur: '#78350f' },
      { titre: 'Hall d\'entrée principal', date: 'Sept 2023', verifie: true, couleur: '#6b7280' },
    ],
    documents: [
      { nom: 'Permis de construire', type: 'PDF', taille: '2.8 MB', date: 'Juin 2021', verifie: true },
      { nom: 'Plan de masse', type: 'PDF', taille: '6.2 MB', date: 'Juin 2021', verifie: true },
      { nom: 'Fiche technique complète', type: 'PDF', taille: '3.5 MB', date: 'Octobre 2021', verifie: true },
      { nom: 'Contrat VEFA', type: 'PDF', taille: '1.4 MB', date: 'Novembre 2021', verifie: true },
      { nom: 'Rapport d\'avancement - T3 2023', type: 'PDF', taille: '4.1 MB', date: 'Octobre 2023', verifie: true },
      { nom: 'Certificat de conformité partielle', type: 'PDF', taille: '0.7 MB', date: 'Août 2023', verifie: true },
    ],
    risques: [
      { categorie: 'Risque financier', niveau: 'faible', description: '90% des unités vendues. Le financement du projet est quasi-totalement assuré par les versements des acquéreurs.', icone: '💰' },
      { categorie: 'Risque juridique', niveau: 'faible', description: 'Tous les documents sont en ordre. Certificat de conformité partielle obtenu auprès de la commune.', icone: '⚖️' },
      { categorie: 'Risque de livraison', niveau: 'faible', description: 'Avancement exceptionnel à 82%. La livraison en mars 2024 est quasi-certaine avec une marge minimale.', icone: '⏰' },
      { categorie: 'Risque qualité', niveau: 'moyen', description: 'Quelques non-conformités mineures relevées lors de l\'inspection des finitions. Corrections en cours par l\'entreprise.', icone: '🏗️' },
    ],
    recommandation: {
      niveau: 'Excellent',
      score: 88,
      texte: 'Les Terrasses de Marrakech est une opportunité rare en phase quasi-finale. L\'avancement exceptionnel de 82% et le taux de vente de 90% témoignent de l\'attractivité du projet. Quelques réserves mineures sur la qualité de certaines finitions mais le promoteur est réactif aux observations. Recommandé pour acquisition immédiate.',
    },
  },
  {
    id: 'marina-bay-tanger',
    titre: 'Marina Bay Tanger',
    promoteurId: 'dar-saada',
    promoteurNom: 'Résidences Dar Saada',
    ville: 'Tanger',
    quartier: 'Malabata',
    type: 'Appartement',
    avancement: 31,
    prixMin: 750000,
    prixMax: 1800000,
    livraison: 'Décembre 2025',
    couleur: '#0f766e',
    couleur2: '#134e4a',
    surface: '70 - 160 m²',
    description: 'Complexe résidentiel vue mer à Malabata avec accès direct à la plage et marina privée.',
    totalUnites: 180,
    unitesVendues: 67,
    timeline: [
      { date: 'Août 2023', titre: 'Permis de construire obtenu', description: 'Permis accordé par la commune de Tanger après révision favorable du plan d\'aménagement de la zone.', statut: 'completed' },
      { date: 'Octobre 2023', titre: 'Début du terrassement', description: 'Les travaux de terrassement ont débuté sur les 3 hectares du terrain avec les engins de chantier.', statut: 'current' },
      { date: 'Avril 2024', titre: 'Fondations et infrastructure', description: 'Réalisation des fondations profondes et des réseaux d\'infrastructure souterrains.', statut: 'upcoming' },
      { date: 'Novembre 2024', titre: 'Gros œuvre', description: 'Construction des structures porteuses des 4 bâtiments R+8 du complexe.', statut: 'upcoming' },
      { date: 'Juillet 2025', titre: 'Second œuvre et finitions', description: 'Travaux de second œuvre, pose des finitions et aménagements des espaces communs.', statut: 'upcoming' },
      { date: 'Décembre 2025', titre: 'Livraison prévue', description: 'Livraison progressive des appartements aux acquéreurs avec célébrité officielle.', statut: 'upcoming' },
    ],
    photos: [
      { titre: 'Vue panoramique - Terrain et mer', date: 'Oct 2023', verifie: true, couleur: '#0f766e' },
      { titre: 'Début du terrassement', date: 'Oct 2023', verifie: true, couleur: '#115e59' },
      { titre: 'Maquette architecturale 3D', date: 'Août 2023', verifie: true, couleur: '#134e4a' },
    ],
    documents: [
      { nom: 'Permis de construire', type: 'PDF', taille: '2.1 MB', date: 'Août 2023', verifie: true },
      { nom: 'Plan de masse', type: 'PDF', taille: '4.9 MB', date: 'Juillet 2023', verifie: true },
      { nom: 'Fiche descriptive du projet', type: 'PDF', taille: '1.6 MB', date: 'Août 2023', verifie: false },
      { nom: 'Contrat VEFA', type: 'PDF', taille: '1.0 MB', date: 'Septembre 2023', verifie: true },
    ],
    risques: [
      { categorie: 'Risque financier', niveau: 'moyen', description: 'Seulement 37% des unités vendues à ce stade. Besoin de maintenir un rythme de commercialisation soutenu.', icone: '💰' },
      { categorie: 'Risque juridique', niveau: 'faible', description: 'Permis en règle. Titre foncier propre, libre de tout hypothèque et sans contestation.', icone: '⚖️' },
      { categorie: 'Risque de livraison', niveau: 'moyen', description: 'Projet en phase très précoce. Deux années de chantier devant nous impliquent un risque de retard non négligeable.', icone: '⏰' },
      { categorie: 'Risque qualité', niveau: 'faible', description: 'Bureau de contrôle indépendant désigné dès la phase de fondations. Spécifications techniques de bon niveau.', icone: '🏗️' },
    ],
    recommandation: {
      niveau: 'Acceptable',
      score: 72,
      texte: 'Marina Bay Tanger est un projet prometteur dans un emplacement exceptionnel avec vue mer, mais son stade précoce implique des risques plus importants. Le taux de vente de 37% et la longue durée restante (2 ans) sont des facteurs à surveiller attentivement. Investissement acceptable pour les profils tolérant un risque modéré, avec potentiel de plus-value significative à terme.',
    },
  },
]

export function getProjet(id: string): Projet | undefined {
  return projets.find((p) => p.id === id)
}

export function getPromoteur(id: string): Promoteur | undefined {
  return promoteurs.find((p) => p.id === id)
}

export const villes = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Meknès', 'Oujda']
export const typesProjet = ['Appartement', 'Villa', 'Bureau', 'Commercial', 'Résidence']
