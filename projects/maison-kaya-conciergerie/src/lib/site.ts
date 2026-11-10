export const WHATSAPP_NUMBER = "33763901469";
export const PHONE_DISPLAY = "07 63 90 14 69";
export const whatsappLink = (msg = "Bonjour Maison Kaya, je suis propriétaire et j'aimerais en savoir plus sur votre accompagnement.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
export const CALENDLY_URL = "https://calendly.com/maisonkayaconciergerie/30min?month=2026-11&utm_source=ig&utm_medium=social&utm_content=link_in_bio";
export const INSTAGRAM_URL = "https://www.instagram.com/kaya.conciergerie/";
export const FACEBOOK_URL = "";

export const COMMISSION_TERMS = {
  rate: 20,
  basis: "revenus locatifs nets perçus, après les frais de la plateforme",
  separateFees: ["Ménage", "Blanchisserie", "Consommables", "Réparations", "Interventions"],
  pricing: "devis ou tarif annoncé",
} as const;

export const COMMUNES = [
  "Champigny-sur-Marne",
  "Saint-Maur-des-Fossés",
  "Nogent-sur-Marne",
  "Le Perreux-sur-Marne",
  "Joinville-le-Pont",
  "Villiers-sur-Marne",
  "Bry-sur-Marne",
];

export const INCLUDED = [
  "Création et optimisation des annonces pour mettre en valeur votre logement sur les plateformes de réservation",
  "Échanges avec les voyageurs avant, pendant et après le séjour",
  "Transmission des informations pratiques et des consignes",
  "Coordination des arrivées et des départs",
  "Organisation, planification et vérification du ménage",
  "Changement et mise en place du linge",
  "Vérification de l'état du logement après chaque départ",
  "Signalement des dégradations et anomalies",
  "Suivi régulier de l'activité de votre logement",
  "Ajustement des tarifs selon l'activité du logement",
  "Gestion des disponibilités, des calendriers et des réservations",
];

export const EXTRAS = [
  { title: "Décoration et aménagement", description: "Conseiller et organiser la mise en valeur de vos espaces." },
  { title: "Photographie professionnelle", description: "Organiser une séance pour présenter votre logement." },
  { title: "Préparation à la location", description: "Accompagner l’équipement et la préparation avant le premier séjour." },
  { title: "Travaux et rénovation", description: "Coordonner les intervenants après votre validation." },
  { title: "Attentions voyageurs", description: "Organiser paniers de bienvenue, packs et petites attentions." },
];
