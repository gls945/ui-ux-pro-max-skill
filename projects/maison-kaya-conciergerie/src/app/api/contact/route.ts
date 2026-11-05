import { NextResponse } from "next/server";

/**
 * Backend léger du formulaire de contact.
 * - Validation côté serveur de tous les champs
 * - Anti-spam : pot de miel, délai minimal de remplissage, limitation de débit par IP
 * - Envoi via l'API Resend (clé dans RESEND_API_KEY, jamais exposée au navigateur)
 * - Ne renvoie un succès QUE si l'e-mail a réellement été accepté par Resend
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0-9 ().-]{10,20}$/;
const TYPES = ["Studio", "Appartement", "Maison", "Autre"];

// Limitation simple en mémoire (best effort sur une instance serverless)
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_HITS;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Trop de demandes envoyées. Merci de réessayer dans quelques minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Pot de miel ou envoi trop rapide → robot probable. On ne prétend pas avoir envoyé.
  const elapsed = Number(body.elapsed);
  if (clean(body.website, 200) || !Number.isFinite(elapsed) || elapsed < 3000) {
    return NextResponse.json({ ok: false, error: "Votre demande n'a pas pu être vérifiée. Merci de réessayer." }, { status: 400 });
  }

  const d = {
    name: clean(body.name, 100),
    email: clean(body.email, 150),
    phone: clean(body.phone, 20),
    city: clean(body.city, 80),
    type: clean(body.type, 30),
    message: clean(body.message, 3000),
  };
  const errors: Record<string, string> = {};
  if (d.name.length < 2) errors.name = "Merci d'indiquer votre nom et prénom.";
  if (!EMAIL_RE.test(d.email)) errors.email = "Adresse e-mail invalide.";
  if (!PHONE_RE.test(d.phone)) errors.phone = "Numéro de téléphone invalide.";
  if (!d.city) errors.city = "Merci d'indiquer la ville du logement.";
  if (!TYPES.includes(d.type)) errors.type = "Type de logement invalide.";
  if (d.message.length < 10) errors.message = "Message trop court.";
  if (body.consent !== true) errors.consent = "Le consentement est requis.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Certains champs sont à corriger.", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "maisonkayaconciergerie@gmail.com";
  if (!apiKey || !from) {
    console.error("[contact] RESEND_API_KEY ou CONTACT_FROM_EMAIL manquant");
    return NextResponse.json(
      { ok: false, error: "Le service d'envoi est momentanément indisponible. Votre demande n'a pas été envoyée." },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Nom et prénom", d.name],
    ["E-mail", d.email],
    ["Téléphone", d.phone],
    ["Ville du logement", d.city],
    ["Type de logement", d.type],
  ];
  const html = `
    <div style="font-family:Georgia,serif;color:#332D28;background:#FDFBF5;padding:24px">
      <h2 style="font-weight:normal">Nouvelle demande depuis le site Maison Kaya</h2>
      <table style="border-collapse:collapse">${rows
        .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#89796A">${k}</td><td style="padding:6px 0">${esc(v)}</td></tr>`)
        .join("")}</table>
      <h3 style="font-weight:normal;margin-top:24px">Message</h3>
      <p style="white-space:pre-wrap">${esc(d.message)}</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\nMessage :\n${d.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: d.email,
        subject: `Nouvelle demande propriétaire — ${d.name} (${d.city})`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend a refusé l'envoi", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "Votre demande n'a pas pu être envoyée. Merci de réessayer." }, { status: 502 });
    }
  } catch (e) {
    console.error("[contact] Erreur réseau", e);
    return NextResponse.json({ ok: false, error: "Votre demande n'a pas pu être envoyée. Merci de réessayer." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
