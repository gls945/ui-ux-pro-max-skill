import avisAna from "@/assets/avis-ana.jpg";
import avisFabio from "@/assets/avis-fabio.jpg";
import avisOlivier from "@/assets/avis-olivier.jpg";
import avisEzekiel from "@/assets/avis-ezekiel.jpg";

/** Captures d'avis Google authentiques (fournies par Maison Kaya). */
const REVIEWS = [
  { src: avisAna, width: 1150, height: 618, alt: "Avis Google d'Ana Catarina, 5 sur 5 : « Excellent service ! Équipe sérieuse, disponible et très efficace. Une conciergerie de confiance que je recommande vivement ! »" },
  { src: avisFabio, width: 1150, height: 624, alt: "Avis Google de Fabio Devine, 5 sur 5 : « Très satisfait des services de Maison Kaya ! Une équipe sérieuse, réactive et à l'écoute. Mention spéciale pour le ménage : le logement était impeccable… »" },
  { src: avisOlivier, width: 1150, height: 548, alt: "Avis Google d'Olivier Fleurbaey, 5 sur 5 : « Nous avons passé un agréable séjour, la conciergerie était top, je recommande vivement »" },
  { src: avisEzekiel, width: 1150, height: 500, alt: "Avis Google d'Ezékiel Pavillon, 5 sur 5 : « Je recommande cette conciergerie sans hésitation ! »" },
];

import { Split } from "@/components/site/Split";

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:py-40">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Avis Google</p>
          <Split as="h2" className="display-lg mt-5 max-w-2xl">Ce que disent <em className="text-primary">nos clients.</em></Split>
        </div>
        <a href="https://share.google/5V2kdbB0wrk7EvLVL" target="_blank" rel="noreferrer" className="btn-pill shrink-0">Voir les avis sur Google</a>
      </div>
      <div className="mt-14 grid items-start gap-6 md:grid-cols-2">
        {REVIEWS.map((r, i) => (
          <figure key={r.src} className={`review-capture m-0 ${i % 2 ? "md:mt-14" : ""}`}>
            <img src={r.src} alt={r.alt} width={r.width} height={r.height} loading="lazy" className="block h-auto w-full" />
          </figure>
        ))}
      </div>
    </section>
  );
}
