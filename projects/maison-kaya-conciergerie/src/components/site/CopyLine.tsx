import { useState } from "react";
import { Copy, Check } from "lucide-react";

/** Une coordonnée avec un bouton « copier » (le texte reste sélectionnable si la copie échoue). */
export function CopyLine({ label, value, copy, href }: { label: string; value: string; copy: string; href?: string }) {
  const [done, setDone] = useState(false);
  async function onCopy() {
    try { await navigator.clipboard.writeText(copy); setDone(true); window.setTimeout(() => setDone(false), 1800); }
    catch { /* copie refusée : le texte reste sélectionnable */ }
  }
  return (
    <div className="copy-line">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        {href ? <a href={href} className="link-line break-words text-lg">{value}</a> : <p className="break-words text-lg">{value}</p>}
      </div>
      <button type="button" onClick={onCopy} className="copy-btn" aria-label={`Copier : ${value}`}>
        {done ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        <span aria-live="polite">{done ? "Copié" : "Copier"}</span>
      </button>
    </div>
  );
}
