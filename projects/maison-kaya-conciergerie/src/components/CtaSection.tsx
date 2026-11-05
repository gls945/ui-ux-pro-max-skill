import Link from "next/link";
import { images, whatsappHref } from "@/content/site";
import ImmersiveImage from "./ImmersiveImage";
import { WhatsAppIcon } from "./WhatsAppButton";

export default function CtaSection() {
  return (
    <section className="cta section" aria-labelledby="cta-title">
      <div className="container cta__grid">
        <div className="cta__text" data-reveal>
          <p className="eyebrow">Parlons-en</p>
          <h2 id="cta-title" className="h2">Et si nous prenions soin de votre logement ?</h2>
          <p className="lead">Échangeons sur votre projet et découvrons ensemble comment Maison Kaya peut vous accompagner.</p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn--dark btn--lg">
              Parlons de votre projet
            </Link>
            <a href={whatsappHref} className="btn btn--ghost btn--lg" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> Échanger sur WhatsApp
            </a>
          </div>
        </div>
        <div className="cta__media" data-reveal>
          <ImmersiveImage src={images.bedroom2.src} alt={images.bedroom2.alt} sizes="(max-width: 900px) 100vw, 45vw" />
        </div>
      </div>
    </section>
  );
}
