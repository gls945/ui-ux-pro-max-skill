# Maison Kaya Conciergerie — site vitrine

> « Le soin du détail, la sérénité en plus. »

Next.js 15 · TypeScript · CSS personnalisé · three.js (visuels 3D) · déploiement Vercel.

## Ce que contient le site

| Page | URL |
|---|---|
| Accueil (avec l'entrée immersive : porte + porte-clés 3D) | `/` |
| Nos services | `/services` |
| Pour les propriétaires | `/proprietaires` |
| Notre approche | `/notre-approche` |
| Zone d'intervention | `/zone-intervention` |
| Contact (formulaire, WhatsApp, Calendly) | `/contact` |
| Mentions légales | `/mentions-legales` |
| Politique de confidentialité (inclut les cookies) | `/politique-confidentialite` |

Plus : `sitemap.xml`, `robots.txt`, balises Open Graph, données structurées `LocalBusiness`, bouton WhatsApp flottant.

**L'entrée** : à la première visite de la session, le visiteur arrive sur un palier. Chaque clé du porte-clés (Entrer, Nos services, Propriétaires, Contact) vole jusqu'à la serrure, tourne, la porte s'ouvre et l'on entre dans le site. « Passer l'entrée » ou la touche Échap permettent de l'ignorer. Elle n'est pas rejouée pendant la même session.

## Lancer en local

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev                  # http://localhost:3000
```

## Mettre en ligne sur Vercel

1. Sur vercel.com → **Add New… → Project** → importer le dépôt GitHub.
2. **Root Directory** : `projects/maison-kaya-conciergerie` (ou la racine si le projet est déplacé dans son propre dépôt).
3. Renseigner les **variables d'environnement** (voir ci-dessous) → **Deploy**.
4. Dans **Settings → Domains**, ajouter le nom de domaine officiel (l'associé qui gère le domaine ajoute les enregistrements DNS indiqués par Vercel). HTTPS est automatique.

### Variables d'environnement

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL officielle du site (SEO, sitemap). |
| `NEXT_PUBLIC_CALENDLY_URL` | Lien officiel de l'événement Calendly de 20 min. Vide = message « bientôt disponible ». |
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com) pour l'envoi des e-mails du formulaire. **Secrète.** |
| `CONTACT_FROM_EMAIL` | Expéditeur vérifié dans Resend (domaine du site). |
| `CONTACT_TO_EMAIL` | Destinataire : `maisonkayaconciergerie@gmail.com`. |

Sans `RESEND_API_KEY`, le formulaire affiche un message d'erreur clair (jamais de fausse confirmation) et propose téléphone / WhatsApp / e-mail.

## Modifier le contenu

Presque tout est dans **`src/content/site.ts`** :

- coordonnées, message WhatsApp, réseaux sociaux (une URL vide n'est pas affichée) ;
- communes desservies (et leur position sur la carte) ;
- services, valeurs, étapes, problématiques propriétaires ;
- **images** : remplacez les photos d'illustration par les vôtres en les déposant dans `public/images/` puis en indiquant `src: "/images/mon-fichier.jpg"` et un texte `alt` descriptif.

Les textes propres à une page sont dans `src/app/<page>/page.tsx`. Le logo provisoire est dans `src/components/Logo.tsx` (à remplacer par le logo officiel).

## À fournir / vérifier avant publication

- [ ] Logo officiel.
- [ ] Photos de l'entreprise (les photos actuelles sont des illustrations Unsplash, signalées comme telles).
- [ ] Lien Calendly officiel.
- [ ] Informations juridiques (marquées « À compléter » dans les mentions légales et la politique de confidentialité).
- [ ] Vérification juridique du périmètre au regard de la loi Hoguet.
- [ ] Présentation des fondateurs (page Notre approche, repère `TODO`).
- [ ] Liens des réseaux sociaux, témoignages authentiques et autorisés (aucun n'est affiché pour l'instant).
- [ ] Compte Resend + domaine vérifié.

## Technique

- Les scènes 3D sont chargées à la demande, mises en pause hors écran, et respectent `prefers-reduced-motion`.
- Formulaire : validation client + serveur, pot de miel, délai minimal, limitation par IP, échappement HTML.
- En-têtes de sécurité (HSTS, nosniff, etc.) dans `next.config.ts`.
