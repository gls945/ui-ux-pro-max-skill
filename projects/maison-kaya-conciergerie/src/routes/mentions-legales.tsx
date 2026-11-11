import { createFileRoute } from "@tanstack/react-router";
import { SITE_NAME, PHONE_DISPLAY, EMAIL, ADDRESS_DISPLAY, LEGAL_UPDATED } from "@/lib/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Mentions légales — Maison Kaya Conciergerie" },
      { name: "description", content: "Mentions légales du site Maison Kaya Conciergerie." },
      { property: "og:title", content: "Mentions légales — Maison Kaya" },
      { property: "og:description", content: "Informations légales de Maison Kaya Conciergerie." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <section className="legal mx-auto max-w-3xl px-6 pb-28 pt-32 md:pt-40">
      <h1 className="display-lg">Mentions légales</h1>
      <p className="mt-4 text-sm text-muted-foreground">Dernière mise à jour : {LEGAL_UPDATED}</p>
      <div className="mt-10 space-y-6 text-muted-foreground">
        <h2>Éditeur du site</h2>
        <p>{SITE_NAME}<br />{ADDRESS_DISPLAY}<br />Téléphone : {PHONE_DISPLAY}<br />E-mail : <a href={`mailto:${EMAIL}`} className="link-line">{EMAIL}</a></p>
        <p>Forme juridique, numéro d'immatriculation (SIREN / SIRET), capital social et directeur de la publication : informations à vérifier et à compléter avant publication.</p>
        <h2>Hébergement</h2>
        <p>Hébergeur : à compléter avec les coordonnées de l'hébergeur retenu pour le nom de domaine officiel.</p>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble des contenus de ce site (textes, logo, photographies, mise en page) est la propriété de {SITE_NAME} ou de ses partenaires. Toute reproduction sans autorisation est interdite.</p>
        <h2>Activité</h2>
        <p>Le périmètre des prestations de conciergerie est défini dans le contrat signé avec chaque propriétaire. Les informations présentées sur ce site ne constituent pas une offre contractuelle.</p>
      </div>
    </section>
  ),
});
