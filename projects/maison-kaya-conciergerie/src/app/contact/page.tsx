import CalendlyEmbed from "@/components/CalendlyEmbed";
import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { site, whatsappHref } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact : parlons de votre projet",
  description:
    "Contactez Maison Kaya Conciergerie par téléphone, WhatsApp, e-mail ou formulaire, ou prenez rendez-vous pour un échange de 20 minutes. Champigny-sur-Marne (94).",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="page-hero page-hero--contact">
        <div className="container narrow-left">
          <p className="eyebrow" data-reveal>Contact</p>
          <h1 className="h1" data-reveal>Parlons de votre projet.</h1>
          <p className="lead" data-reveal>
            Vous possédez un logement dans notre secteur d&apos;intervention et souhaitez être accompagné ? Contactez-nous pour échanger sur
            vos besoins.
          </p>
          <ul className="quick-contact" data-reveal>
            <li>
              <a href={site.phoneHref} className="quick-contact__item">
                <span className="quick-contact__label">Téléphone</span>
                <span className="quick-contact__value">{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="quick-contact__item">
                <span className="quick-contact__label">
                  <WhatsAppIcon size={16} /> WhatsApp
                </span>
                <span className="quick-contact__value">Échanger sur WhatsApp</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="quick-contact__item">
                <span className="quick-contact__label">E-mail</span>
                <span className="quick-contact__value quick-contact__value--sm">{site.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="section contact-main" aria-labelledby="form-title">
        <div className="container contact-main__grid">
          <div id="formulaire" className="contact-main__form">
            <h2 id="form-title" className="h2">Envoyer une demande</h2>
            <ContactForm />
          </div>
          <aside className="contact-main__side">
            <div id="rendez-vous">
              <CalendlyEmbed />
            </div>
            <div className="address-card">
              <p className="eyebrow">Adresse</p>
              <address>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
