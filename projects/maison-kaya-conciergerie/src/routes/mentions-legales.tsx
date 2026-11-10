import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Mentions légales — Maison Kaya" },
      { name: "description", content: "Mentions légales du site Maison Kaya Conciergerie." },
      { property: "og:title", content: "Mentions légales — Maison Kaya" },
      { property: "og:description", content: "Informations légales de Maison Kaya Conciergerie." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pb-28 pt-40">
      <h1 className="display-lg">Mentions légales</h1>
      <div className="mt-10 space-y-6 text-muted-foreground">
        <p>Éditeur : Maison Kaya Conciergerie — raison sociale, SIRET, adresse et directeur de publication à compléter.</p>
        <p>Contact : 07 63 90 14 69.</p>
        <p>Hébergement : Lovable.</p>
      </div>
    </section>
  ),
});
