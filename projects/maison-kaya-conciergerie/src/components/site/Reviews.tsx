const REVIEWS = [
  { name: "Ana Catarina", initials: "AC", text: "Excellent service ! Équipe sérieuse, disponible et très efficace. Une conciergerie de confiance que je recommande vivement !" },
  { name: "Fabio Devine", initials: "FD", text: "Très satisfait des services de Maison Kaya ! Une équipe sérieuse, réactive et à l’écoute. Mention spéciale pour le ménage : le logement était impeccable…", excerpt: true },
  { name: "Olivier Fleurbaey", initials: "OF", text: "Nous avons passé un agréable séjour, la conciergerie était top, je recommande vivement." },
  { name: "Ezékiel Pavillon", initials: "EP", text: "Je recommande cette conciergerie sans hésitation !" },
];

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:py-40">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Avis Google</p>
          <h2 className="display-lg mt-5 max-w-2xl">Ce que disent <em className="text-primary">nos clients.</em></h2>
        </div>
        <a href="https://share.google/5V2kdbB0wrk7EvLVL" target="_blank" rel="noreferrer" className="btn-pill shrink-0">Voir les avis sur Google</a>
      </div>
      <div className="mt-14 grid gap-x-16 md:grid-cols-2">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="m-0 border-b border-border py-10">
            <figcaption className="flex items-center gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-secondary font-display text-lg text-primary">{r.initials}</span>
              <span className="min-w-0 flex-1 truncate">{r.name}</span>
              <span className="shrink-0 tracking-widest text-primary" aria-label="5 étoiles sur 5">★★★★★</span>
            </figcaption>
            <blockquote className="mt-8 font-display text-2xl leading-snug md:text-3xl">{r.name === "Ezékiel Pavillon" ? `« ${r.text}»` : `« ${r.text} »`}</blockquote>
            {r.excerpt && <p className="mt-6 text-sm text-muted-foreground">Extrait de l’avis Google.</p>}
          </figure>
        ))}
      </div>
    </section>
  );
}
