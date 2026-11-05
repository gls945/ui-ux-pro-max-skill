/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENU CENTRAL DU SITE — Maison Kaya Conciergerie
 *  Modifiez ici les textes, coordonnées, communes et images.
 *  Voir README.md, section « Modifier le contenu ».
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Maison Kaya Conciergerie",
  shortName: "Maison Kaya",
  slogan: "Le soin du détail, la sérénité en plus.",
  description:
    "Conciergerie de location courte durée (Airbnb) dans le Val-de-Marne (94) : accompagnement personnalisé des propriétaires à Champigny-sur-Marne, Saint-Maur-des-Fossés, Nogent-sur-Marne et alentours.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  phoneDisplay: "07 63 90 14 69",
  phoneHref: "tel:+33763901469",
  email: "maisonkayaconciergerie@gmail.com",
  address: {
    street: "17 TER rue Jean Allemane",
    postalCode: "94500",
    city: "Champigny-sur-Marne",
    region: "Île-de-France",
    country: "FR",
  },
  whatsappNumber: "33763901469",
  whatsappMessage:
    "Bonjour Maison Kaya, je suis propriétaire d'un logement et souhaiterais obtenir des informations sur votre accompagnement.",
  /** Lien Calendly officiel : renseigné via la variable d'environnement NEXT_PUBLIC_CALENDLY_URL. */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  /**
   * Réseaux sociaux : ajoutez les URL officielles lorsqu'elles existent.
   * Une entrée vide n'est pas affichée (aucun lien fictif).
   */
  socials: [
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
    { label: "LinkedIn", href: "" },
  ],
} as const;

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/proprietaires", label: "Pour les propriétaires" },
  { href: "/notre-approche", label: "Notre approche" },
  { href: "/zone-intervention", label: "Zone d'intervention" },
  { href: "/contact", label: "Contact" },
] as const;

/** Communes desservies. x / y = position sur la carte stylisée (en % de la largeur/hauteur). */
export const communes = [
  { name: "Champigny-sur-Marne", slug: "champigny-sur-marne", x: 62, y: 58, home: true },
  { name: "Saint-Maur-des-Fossés", slug: "saint-maur-des-fosses", x: 45, y: 68 },
  { name: "Nogent-sur-Marne", slug: "nogent-sur-marne", x: 43, y: 36 },
  { name: "Le Perreux-sur-Marne", slug: "le-perreux-sur-marne", x: 55, y: 28 },
  { name: "Joinville-le-Pont", slug: "joinville-le-pont", x: 33, y: 52 },
  { name: "Villiers-sur-Marne", slug: "villiers-sur-marne", x: 80, y: 50 },
  { name: "Bry-sur-Marne", slug: "bry-sur-marne", x: 68, y: 36 },
] as const;

/**
 * Photographies d'illustration (banque d'images Unsplash, licence libre).
 * Elles ne représentent PAS des logements gérés par Maison Kaya.
 * Remplacez-les par les photos de l'entreprise : déposez-les dans /public/images
 * puis indiquez par ex. src: "/images/salon.jpg".
 */
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;

export const images = {
  hero: { src: u("photo-1600210492486-724fe5c67fb0"), alt: "Salon lumineux aux tons crème, canapé en lin et bois naturel" },
  doorView: { src: u("photo-1586023492125-27b2c045efd7"), alt: "Intérieur chaleureux aperçu depuis l'entrée d'un appartement" },
  living: { src: u("photo-1493809842364-78817add7ffb"), alt: "Pièce de vie aux matières naturelles, lumière douce de fin de journée" },
  bedroom: { src: u("photo-1505693416388-ac5ce068fe85"), alt: "Chambre soigneusement préparée, linge de lit blanc et coussins" },
  bedroom2: { src: u("photo-1540518614846-7eded433c457"), alt: "Chambre sobre au linge clair, prête à accueillir des voyageurs" },
  kitchen: { src: u("photo-1484154218962-a197022b5858"), alt: "Cuisine élégante en bois et pierre claire" },
  apartment: { src: u("photo-1522708323590-d24dbb6b0267"), alt: "Appartement ouvert et lumineux, décoration sobre" },
  details: { src: u("photo-1513694203232-719a280e022f"), alt: "Détail de décoration : bois, céramique et lin" },
  salon2: { src: u("photo-1560448204-e02f11c3d0e2"), alt: "Séjour accueillant aux couleurs sable et taupe" },
  interior: { src: u("photo-1502672260266-1c1ef2d93688"), alt: "Intérieur d'appartement baigné de lumière naturelle" },
} as const;

export const values = [
  {
    title: "Proximité",
    text: "Privilégier les échanges humains et un accompagnement local, avec un interlocuteur qui connaît votre secteur.",
  },
  {
    title: "Soin du détail",
    text: "Accorder de l'importance à chaque étape et à chaque intervention, comme pour un lieu qui mérite toute notre attention.",
  },
  {
    title: "Transparence",
    text: "Maintenir une communication claire sur les prestations, les tarifs et le suivi de votre logement.",
  },
] as const;

export const services = [
  {
    id: "voyageurs",
    title: "Accompagnement des voyageurs",
    short: "Réponses aux messages, informations utiles et suivi avant, pendant et après chaque séjour.",
    image: images.living,
    items: [
      "Réponse aux demandes et messages des voyageurs.",
      "Communication avant, pendant et après le séjour.",
      "Transmission des informations utiles au séjour.",
      "Accompagnement dans le déroulement de l'expérience voyageur.",
    ],
  },
  {
    id: "menage-linge",
    title: "Coordination du ménage et du linge",
    short: "Organisation des interventions et préparation soignée du logement entre deux séjours.",
    image: images.bedroom,
    items: [
      "Organisation des interventions de ménage.",
      "Coordination des prestataires.",
      "Préparation du logement entre les séjours.",
      "Vérification de la bonne préparation du logement selon les modalités convenues.",
    ],
  },
  {
    id: "annonces",
    title: "Création et valorisation des annonces",
    short: "Des annonces claires et soignées qui mettent en lumière les atouts de votre logement.",
    image: images.apartment,
    items: [
      "Création ou amélioration de l'annonce.",
      "Rédaction des descriptions.",
      "Mise en valeur des caractéristiques du logement.",
      "Conseils pour les photographies.",
      "Amélioration de la présentation générale.",
    ],
  },
  {
    id: "decoration",
    title: "Décoration et aménagement",
    short: "Conseils et recommandations pour révéler le charme de votre intérieur.",
    image: images.details,
    items: [
      "Conseils en décoration.",
      "Recommandations d'aménagement.",
      "Optimisation de la présentation du logement.",
      "Suggestions d'amélioration pour renforcer son attractivité.",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance et interventions",
    short: "Identification des besoins et coordination des professionnels, après votre validation.",
    image: images.kitchen,
    items: [
      "Identification des besoins d'entretien.",
      "Coordination des interventions nécessaires.",
      "Mise en relation avec des professionnels.",
      "Suivi des interventions après validation du propriétaire.",
    ],
  },
] as const;

export const reasons = [
  { title: "Un accompagnement personnalisé", text: "Chaque logement est unique : nous adaptons notre accompagnement à votre bien et à vos attentes." },
  { title: "Un interlocuteur de proximité", text: "Basés à Champigny-sur-Marne, nous intervenons dans les communes voisines du Val-de-Marne." },
  { title: "Une communication transparente", text: "Des échanges clairs et réguliers sur les prestations, les interventions et le suivi." },
  { title: "Une attention portée au logement", text: "Nous prenons soin de votre intérieur comme d'un lieu qui mérite toute notre attention." },
  { title: "Une organisation sur mesure", text: "Une organisation pensée selon vos besoins, votre disponibilité et votre façon de louer." },
] as const;

export const steps = [
  { title: "Premier échange", text: "Compréhension de votre logement et de vos besoins." },
  { title: "Étude personnalisée", text: "Définition des prestations adaptées à votre situation." },
  { title: "Mise en place", text: "Préparation de l'accompagnement et de l'organisation." },
  { title: "Suivi", text: "Coordination et échanges réguliers avec vous, propriétaire." },
] as const;

export const ownerPains = [
  { title: "Le manque de temps", text: "Suivre chaque séjour demande une disponibilité que l'on n'a pas toujours." },
  { title: "La coordination des interventions", text: "Ménage, linge, petites réparations : les intervenants se multiplient." },
  { title: "Les échanges avec les voyageurs", text: "Questions, arrivées, imprévus : les messages arrivent à toute heure." },
  { title: "La préparation entre deux réservations", text: "Le logement doit être impeccable, à chaque fois, dans des délais courts." },
  { title: "Le besoin d'un interlocuteur de confiance", text: "Confier son logement suppose de pouvoir compter sur quelqu'un de fiable et joignable." },
] as const;

export const housingTypes = ["Studio", "Appartement", "Maison", "Autre"] as const;
