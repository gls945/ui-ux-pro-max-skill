export const SITE_NAME = "Maison Kaya Conciergerie";
export const SLOGAN = "Le soin du détail, la sérénité en plus.";
export const WHATSAPP_NUMBER = "33763901469";
export const PHONE_DISPLAY = "07 63 90 14 69";
export const PHONE_TEL = "+33763901469";
export const EMAIL = "maisonkayaconciergerie@gmail.com";
export const ADDRESS = { street: "17 ter rue Jean Allemane", zip: "94500", city: "Champigny-sur-Marne" };
export const ADDRESS_DISPLAY = `${ADDRESS.street}, ${ADDRESS.zip} ${ADDRESS.city}`;
export const whatsappLink = (msg = "Bonjour Maison Kaya, je suis propriétaire d'un logement et souhaiterais obtenir des informations sur votre accompagnement.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
/** Lien Calendly fourni par Maison Kaya (événement « 30min » côté Calendly) ; le suivi UTM identifie le site. */
export const CALENDLY_URL = "https://calendly.com/maisonkayaconciergerie/30min?utm_source=site&utm_medium=website&utm_campaign=rendez-vous";
export const INSTAGRAM_URL = "https://www.instagram.com/kaya.conciergerie/";
export const FACEBOOK_URL = "";
/** Date de dernière mise à jour des pages juridiques. */
export const LEGAL_UPDATED = "11 novembre 2026";

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

/** Les trois valeurs de Maison Kaya. */
export const VALUES = [
  { t: "Proximité", d: "Privilégier les échanges humains et un accompagnement local, au plus près de votre logement." },
  { t: "Soin du détail", d: "Accorder de l'importance à chaque étape et à chaque intervention, du linge aux consignes." },
  { t: "Transparence", d: "Maintenir une communication claire sur les prestations, les tarifs et le suivi." },
];

/** Les prestations, telles que présentées sur la page Services. */
export const SERVICES = [
  { slug: "voyageurs", t: "Accompagnement des voyageurs", short: "Nous répondons aux voyageurs avant, pendant et après le séjour.", items: [
    "Réponse aux demandes et messages des voyageurs",
    "Communication avant, pendant et après le séjour",
    "Transmission des informations utiles au séjour",
    "Accompagnement dans le déroulement de l'expérience voyageur",
  ] },
  { slug: "menage", t: "Coordination du ménage et du linge", short: "Le logement est préparé entre chaque séjour, selon les modalités convenues.", items: [
    "Organisation des interventions de ménage",
    "Coordination des prestataires",
    "Préparation du logement entre les séjours",
    "Vérification de la bonne préparation du logement selon les modalités convenues",
  ] },
  { slug: "annonces", t: "Création et valorisation des annonces", short: "Une annonce claire et soignée, qui met en valeur votre logement.", items: [
    "Création ou amélioration de l'annonce",
    "Rédaction des descriptions",
    "Mise en valeur des caractéristiques du logement",
    "Conseils pour les photographies",
    "Amélioration de la présentation générale",
  ] },
  { slug: "decoration", t: "Décoration et aménagement", short: "Des conseils pour rendre votre logement plus accueillant et plus attractif.", items: [
    "Conseils en décoration",
    "Recommandations d'aménagement",
    "Optimisation de la présentation du logement",
    "Suggestions d'amélioration pour renforcer son attractivité",
  ] },
  { slug: "maintenance", t: "Maintenance et interventions", short: "Les interventions sont coordonnées après votre validation.", items: [
    "Identification des besoins d'entretien",
    "Coordination des interventions nécessaires",
    "Mise en relation avec des professionnels",
    "Suivi des interventions après validation du propriétaire",
  ] },
];

/** Comment ça fonctionne : quatre étapes. */
export const STEPS = [
  { t: "Premier échange", d: "Compréhension du logement et de vos besoins." },
  { t: "Étude personnalisée", d: "Définition des prestations adaptées à votre logement." },
  { t: "Mise en place", d: "Préparation de l'accompagnement : annonce, consignes, linge, ménage." },
  { t: "Suivi", d: "Coordination et échanges réguliers avec vous." },
];
