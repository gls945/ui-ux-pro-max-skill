# Maison Kaya — fichiers du site

Cette archive contient la version actuelle du site : pages, styles, photos, animations et formulaires.

Les identifiants privés, les données des formulaires, les dépendances et les fichiers générés ne sont pas inclus.

## Utilisation locale

Installer Bun, puis lancer `bun install` et `bun run dev`.

Les formulaires nécessitent une connexion au service cloud et les variables de configuration publiques correspondantes. Aucun fichier `.env` n’est fourni.

Certaines images historiques sont représentées par des fichiers `.asset.json` et sont hébergées par Lovable. Les principales photos affichées actuellement sont incluses directement dans `src/assets`.

Pour mettre cette version en ligne sur votre site Lovable, utilisez Publier → Publier les modifications.

## Refonte « cinématique » (style 10k-websites)

- Accueil : parcours épinglé au défilement (la caméra traverse le salon, les bords de Marne, le linge, l'accueil des voyageurs), logo MK en 3D à côté du titre, clés 3D de « Déléguer, sans rien lâcher » qui tournent avec le défilement.
- Moteur de défilement unique : `src/lib/scroll.ts`. Pas de bande défilante, pas de curseur personnalisé, pas de voile entre les pages, aucun lien qui bouge au survol, en-tête sans barre qui bloque les clics.
- Sur mobile et avec « réduire les animations », le parcours devient une suite de sections normales.
- Aperçu statique sans serveur : `npx vite build -c vite.preview.config.ts` (les formulaires n'y sont pas branchés à la base).
