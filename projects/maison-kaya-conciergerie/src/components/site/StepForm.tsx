import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { COMMUNES } from "@/lib/site";
import { Link } from "@tanstack/react-router";

type Field =
  | { name: string; label: string; type: "choice"; options: string[] }
  | { name: string; label: string; type: "text" | "email" | "tel" | "number" | "textarea"; placeholder?: string; required?: boolean };

export type Step = { title: string; fields: Field[] };

const contactSchema = z.object({
  full_name: z.string().trim().min(1, "Merci d'indiquer votre nom et votre prénom.").max(120),
  email: z.string().trim().email("L'adresse e-mail n'est pas valide (exemple : prenom@exemple.fr).").max(200),
  phone: z.string().trim().max(40).optional(),
});

export function StepForm({ kind, steps }: { kind: "contact" | "estimation"; steps: Step[] }) {
  const [i, setI] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [website, setWebsite] = useState(""); // champ piège anti-robots, laissé vide par un humain
  const step = steps[i]!;
  const last = i === steps.length - 1;
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext = step.fields.every((f) => f.type === "choice" ? !!data[f.name] : !("required" in f && f.required) || !!data[f.name]?.trim());

  async function submit() {
    setError(null);
    if (website) { setDone(true); return; }
    if (!consent) { setError("Merci de cocher la case de consentement pour que nous puissions vous répondre."); return; }
    const parsed = contactSchema.safeParse({ full_name: data["full_name"], email: data["email"], phone: data["phone"] || undefined });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Champs invalides"); return; }
    setSending(true);
    const { full_name, email, phone, city, housing_type, message, ...rest } = data;
    setConfirm(false);
    const { error } = await supabase.from("owner_requests").insert({
      kind, full_name: parsed.data.full_name, email: parsed.data.email, phone: parsed.data.phone ?? null,
      city: city ?? null, housing_type: housing_type ?? null, message: message?.slice(0, 3000) ?? null, details: rest,
    });
    setSending(false);
    if (error) { setError("Votre demande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez, ou écrivez-nous sur WhatsApp au 07 63 90 14 69."); return; }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-[2rem] bg-secondary p-10 md:p-16">
        <Check className="h-10 w-10 text-primary" />
        <h3 className="mt-6 font-display text-4xl">Merci, votre demande est bien envoyée.</h3>
        <p className="mt-4 max-w-lg text-muted-foreground">
          {kind === "estimation"
            ? "Nous étudions votre logement et revenons vers vous avec une première estimation, indicative et sans engagement."
            : "Nous revenons vers vous très rapidement pour échanger sur votre projet."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] bg-card p-6 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--foreground)_35%,transparent)] md:p-12">
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
      </div>
      <h3 key={step.title} className="mt-10 font-display text-3xl animate-rise md:text-4xl">{step.title}</h3>
      <div key={i} className="mt-8 space-y-8 animate-rise">
        {step.fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={`${kind}-${f.name}`} className="mb-3 block text-sm text-muted-foreground">{f.label}</label>
            {f.type === "choice" ? (
              <div className="flex flex-wrap gap-2">
                {f.options.map((o) => (
                  <button type="button" key={o} onClick={() => set(f.name, o)}
                    className={`rounded-full border px-5 py-2.5 text-sm transition ${data[f.name] === o ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-foreground"}`}>
                    {o}
                  </button>
                ))}
              </div>
            ) : f.type === "textarea" ? (
              <textarea id={`${kind}-${f.name}`} rows={4} maxLength={3000} value={data[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} placeholder={f.placeholder}
                className="w-full rounded-2xl border border-input bg-background p-4 outline-none focus:border-primary" />
            ) : (
              <input id={`${kind}-${f.name}`} type={f.type} value={data[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} placeholder={f.placeholder} maxLength={200}
                className="w-full border-b border-input bg-transparent py-3 text-lg outline-none focus:border-primary" />
            )}
          </div>
        ))}
      </div>
      {last && (
        <div className="mt-8 space-y-4">
          <label className="consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>J'accepte que mes informations soient utilisées pour répondre à ma demande. <Link to="/confidentialite" className="link-line">En savoir plus</Link>.</span>
          </label>
          <label className="hp" aria-hidden="true"><span>Site web</span><input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
        </div>
      )}
      {error && <p className="mt-6 text-sm text-destructive" role="alert">{error}</p>}
      {confirm && (
        <div className="confirm-box" role="dialog" aria-label="Confirmer l'envoi">
          <p className="font-display text-2xl">Envoyer votre demande ?</p>
          <p className="mt-2 text-sm text-muted-foreground">Nous répondrons à {data["email"]}{data["phone"] ? ` ou au ${data["phone"]}` : ""}.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={submit} disabled={sending} className="pill pill-primary">{sending ? "Envoi…" : "Oui, envoyer"}</button>
            <button type="button" onClick={() => setConfirm(false)} className="pill pill-ghost">Modifier</button>
          </div>
        </div>
      )}
      <div className="mt-12 flex items-center justify-between">
        <button type="button" onClick={() => setI(i - 1)} disabled={i === 0} className="flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-0">
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>
        {last ? (
          <button type="button" onClick={() => { setError(null); if (!consent) { setError("Merci de cocher la case de consentement pour que nous puissions vous répondre."); return; } const parsed = contactSchema.safeParse({ full_name: data["full_name"], email: data["email"], phone: data["phone"] || undefined }); if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Champs invalides"); return; } setConfirm(true); }} disabled={!canNext || sending || confirm} className="pill pill-primary disabled:opacity-40">
            Envoyer ma demande
          </button>
        ) : (
          <button type="button" onClick={() => setI(i + 1)} disabled={!canNext} className="pill pill-ink disabled:opacity-40">
            Continuer
          </button>
        )}
      </div>
    </div>
  );
}

export const HOUSING = ["Studio", "T2", "T3", "T4", "T5 et +", "Maison"];
export const CITIES = [...COMMUNES, "Autre"];
export const COORDS_STEP: Step = {
  title: "Comment vous joindre ?",
  fields: [
    { name: "full_name", label: "Nom et prénom", type: "text", required: true },
    { name: "email", label: "E-mail", type: "email", required: true },
    { name: "phone", label: "Téléphone", type: "tel", required: true },
  ],
};
