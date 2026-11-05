"use client";

import { useRef, useState } from "react";
import { communes, housingTypes, site, whatsappHref } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "phone" | "city" | "type" | "message" | "consent", string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0-9 ().-]{10,20}$/;

function validate(d: Record<string, string>, consent: boolean): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Merci d'indiquer votre nom et prénom.";
  if (!EMAIL_RE.test(d.email.trim())) e.email = "Merci d'indiquer une adresse e-mail valide (ex. nom@domaine.fr).";
  if (!PHONE_RE.test(d.phone.trim())) e.phone = "Merci d'indiquer un numéro de téléphone valide.";
  if (!d.city.trim()) e.city = "Merci d'indiquer la ville du logement.";
  if (!d.type) e.type = "Merci de choisir le type de logement.";
  if (d.message.trim().length < 10) e.message = "Votre message doit contenir au moins 10 caractères.";
  if (!consent) e.consent = "Merci d'accepter l'utilisation de vos données pour traiter votre demande.";
  return e;
}

export default function ContactForm() {
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      city: String(fd.get("city") ?? ""),
      type: String(fd.get("type") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // pot de miel
    };
    const consent = fd.get("consent") === "on";
    const errs = validate(data, consent);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent, elapsed: Date.now() - startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors };
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
      } else {
        if (json.errors) setErrors(json.errors);
        setServerMsg(json.error || "Votre demande n'a pas pu être envoyée.");
        setStatus("error");
      }
    } catch {
      setServerMsg("La connexion a échoué. Vérifiez votre connexion internet puis réessayez.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <p className="eyebrow">Demande envoyée</p>
        <h3>Merci, votre message nous est bien parvenu.</h3>
        <p>Nous revenons vers vous dans les meilleurs délais pour échanger sur votre projet.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
  });
  const err = (name: keyof Errors) =>
    errors[name] ? (
      <p className="field__error" id={`e-${name}`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        <div className="field">
          <label htmlFor="f-name">Nom et prénom *</label>
          <input {...field("name")} type="text" autoComplete="name" maxLength={100} required />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="f-email">Adresse e-mail *</label>
          <input {...field("email")} type="email" autoComplete="email" maxLength={150} required />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Numéro de téléphone *</label>
          <input {...field("phone")} type="tel" autoComplete="tel" maxLength={20} required />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor="f-city">Ville du logement *</label>
          <input {...field("city")} type="text" list="communes-list" maxLength={80} required />
          <datalist id="communes-list">
            {communes.map((c) => (
              <option key={c.slug} value={c.name} />
            ))}
          </datalist>
          {err("city")}
        </div>
        <div className="field field--full">
          <label htmlFor="f-type">Type de logement *</label>
          <select {...field("type")} defaultValue="" required>
            <option value="" disabled>
              Sélectionnez…
            </option>
            {housingTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {err("type")}
        </div>
        <div className="field field--full">
          <label htmlFor="f-message">Message *</label>
          <textarea {...field("message")} rows={6} maxLength={3000} required placeholder="Parlez-nous de votre logement et de vos attentes." />
          {err("message")}
        </div>
        {/* Pot de miel anti-robots : invisible pour les humains */}
        <div className="field--hp" aria-hidden="true">
          <label htmlFor="f-website">Ne pas remplir</label>
          <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="field field--full field--check">
          <input {...field("consent")} type="checkbox" />
          <label htmlFor="f-consent">
            J&apos;accepte que mes données soient utilisées par Maison Kaya Conciergerie pour répondre à ma demande, conformément à la{" "}
            <a href="/politique-confidentialite">politique de confidentialité</a>. *
          </label>
          {err("consent")}
        </div>
      </div>

      {status === "error" && (
        <div className="form-error" role="alert">
          <p>
            <strong>{serverMsg}</strong>
          </p>
          <p>
            Vous pouvez aussi nous joindre directement par téléphone au <a href={site.phoneHref}>{site.phoneDisplay}</a>, sur{" "}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            ou par e-mail à <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      )}

      <div className="form__foot">
        <button type="submit" className="btn btn--dark btn--lg" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
        <p className="form__legal">* Champs obligatoires.</p>
      </div>
    </form>
  );
}
