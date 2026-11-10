import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { COMMUNES } from "@/lib/site";

type Field =
  | { name: string; label: string; type: "choice"; options: string[] }
  | { name: string; label: string; type: "text" | "email" | "tel" | "number" | "textarea"; placeholder?: string; required?: boolean };

export type Step = { title: string; fields: Field[] };

const contactSchema = z.object({
  full_name: z.string().trim().min(1, "Votre nom est requis").max(120),
  email: z.string().trim().email("E-mail invalide").max(200),
  phone: z.string().trim().max(40).optional(),
});

export function StepForm({ kind, steps }: { kind: "contact" | "estimation"; steps: Step[] }) {
  const [i, setI] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const step = steps[i]!;
  const last = i === steps.length - 1;
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext = step.fields.every((f) => f.type === "choice" ? !!data[f.name] : !("required" in f && f.required) || !!data[f.name]?.trim());

  async function submit() {
    setError(null);
    const parsed = contactSchema.safeParse({ full_name: data["full_name"], email: data["email"], phone: data["phone"] || undefined });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Champs invalides"); return; }
    setSending(true);
    const { full_name, email, phone, city, housing_type, message, ...rest } = data;
    const { error } = await supabase.from("owner_requests").insert({
      kind, full_name: parsed.data.full_name, email: parsed.data.email, phone: parsed.data.phone ?? null,
      city: city ?? null, housing_type: housing_type ?? null, message: message?.slice(0, 3000) ?? null, details: rest,
    });
    setSending(false);
    if (error) { setError("L'envoi a échoué, merci de réessayer ou de nous écrire sur WhatsApp."); return; }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-[2rem] bg-secondary p-10 md:p-16">
        <Check className="h-10 w-10 text-primary" />
        <h3 className="mt-6 font-display text-4xl">Merci, c'est bien reçu.</h3>
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
            <label className="mb-3 block text-sm text-muted-foreground">{f.label}</label>
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
              <textarea rows={4} maxLength={3000} value={data[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} placeholder={f.placeholder}
                className="w-full rounded-2xl border border-input bg-background p-4 outline-none focus:border-primary" />
            ) : (
              <input type={f.type} value={data[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} placeholder={f.placeholder} maxLength={200}
                className="w-full border-b border-input bg-transparent py-3 text-lg outline-none focus:border-primary" />
            )}
          </div>
        ))}
      </div>
      {error && <p className="mt-6 text-sm text-destructive">{error}</p>}
      <div className="mt-12 flex items-center justify-between">
        <button type="button" onClick={() => setI(i - 1)} disabled={i === 0} className="flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-0">
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>
        {last ? (
          <button type="button" onClick={submit} disabled={!canNext || sending} className="rounded-full bg-primary px-7 py-3.5 text-primary-foreground transition disabled:opacity-40">
            {sending ? "Envoi…" : "Envoyer ma demande"}
          </button>
        ) : (
          <button type="button" onClick={() => setI(i + 1)} disabled={!canNext} className="flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-ink-foreground transition disabled:opacity-40">
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
