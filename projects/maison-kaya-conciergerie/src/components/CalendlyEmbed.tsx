"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * Prise de rendez-vous Calendly (événement de 20 minutes).
 * Le lien officiel est lu depuis NEXT_PUBLIC_CALENDLY_URL. Aucun lien n'est inventé :
 * sans variable, un message indique que la prise de rendez-vous arrive bientôt.
 * L'iframe (service tiers déposant des cookies) n'est chargée qu'après un clic.
 */
export default function CalendlyEmbed() {
  const [loaded, setLoaded] = useState(false);
  const url = site.calendlyUrl;
  const valid = /^https:\/\/calendly\.com\/[\w\-/]+$/.test(url);

  if (!valid) {
    return (
      <div className="calendly calendly--pending">
        <p className="eyebrow">Rendez-vous de 20 minutes</p>
        <h3>Prendre rendez-vous</h3>
        <p>
          La réservation de créneau en ligne sera disponible très prochainement. En attendant, appelez-nous ou écrivez-nous sur
          WhatsApp : nous convenons ensemble d&apos;un moment pour échanger.
        </p>
      </div>
    );
  }

  const src = `${url}?hide_gdpr_banner=1&background_color=fdfbf5&text_color=332d28&primary_color=89796a`;
  return (
    <div className="calendly">
      <p className="eyebrow">Rendez-vous de 20 minutes</p>
      <h3>Prendre rendez-vous</h3>
      {loaded ? (
        <iframe src={src} title="Choisir un créneau de rendez-vous avec Maison Kaya (Calendly)" className="calendly__frame" loading="lazy" />
      ) : (
        <>
          <p>Choisissez le créneau qui vous convient pour un premier échange de 20 minutes.</p>
          <button type="button" className="btn btn--dark" onClick={() => setLoaded(true)}>
            Prendre rendez-vous
          </button>
          <p className="calendly__legal">
            En cliquant, vous chargez le service Calendly (Calendly LLC), susceptible de déposer des cookies. Voir notre{" "}
            <a href="/politique-confidentialite">politique de confidentialité</a>.
          </p>
        </>
      )}
    </div>
  );
}
