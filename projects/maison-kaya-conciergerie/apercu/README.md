# Aperçu autonome — Maison Kaya Conciergerie

`index.html` est la version d'aperçu du site, en un seul fichier :
ouvrez-le dans un navigateur (connexion internet requise pour les polices et three.js).
C'est la version publiée sur le lien d'aperçu (accès direct à l'accueil, photos
d'intérieur, vue 360° à la première personne au survol des photos, clé et sculpture 3D).

- `src/` : sources de l'aperçu (balisage, styles complémentaires, script). Les styles de base
  viennent de `../src/app/globals.css`.
- `photos/` : photographies d'illustration (Unsplash, licence libre) — elles ne représentent
  pas des logements gérés par Maison Kaya. À remplacer par les photos de l'entreprise.

Le formulaire de l'aperçu n'envoie pas d'e-mail ; l'envoi réel est assuré par la version
Next.js (dossier parent) une fois déployée sur Vercel.
