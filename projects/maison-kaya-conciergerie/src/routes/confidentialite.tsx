import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Confidentialité & cookies — Maison Kaya" },
      { name: "description", content: "Politique de confidentialité et cookies de Maison Kaya Conciergerie." },
      { property: "og:title", content: "Confidentialité — Maison Kaya" },
      { property: "og:description", content: "Comment nous traitons vos données." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 pb-28 pt-40">
      <h1 className="display-lg">Confidentialité & cookies</h1>
      <div className="mt-10 space-y-6 text-muted-foreground">
        <p>Les informations transmises via nos formulaires servent uniquement à répondre à votre demande et ne sont jamais revendues.</p>
        <p>Vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous contactant.</p>
        <p>Ce site n'utilise pas de cookies publicitaires.</p>
      </div>
    </section>
  ),
});
