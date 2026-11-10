/**
 * Moteur de défilement Maison Kaya (sans dépendance, sans curseur personnalisé).
 *  - [data-scene="journey"]    : parcours « caméra » épinglé (accueil)
 *  - [data-scene="delegation"] : scène des clés 3D épinglée
 *  - apparitions (mots, textes, photos), parallaxe [data-speed], ouverture [data-expand]
 *  - tracés SVG qui se dessinent [data-draw], compteurs [data-count]
 *  - en-tête : thème clair/sombre selon la section survolée, jamais déplacé au survol
 * Tout est écrit une seule fois par image (rAF) et seulement si la valeur change.
 * Sans JavaScript, ou avec « réduire les animations », la page reste complète et lisible.
 */

export const sceneState = { delegation: 0 };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => { const x = clamp(t); return x * x * (3 - 2 * x); };
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Les chapitres du parcours : une photo par chapitre, la caméra avance à travers. */
const JOURNEY_CHAPTERS = 4;

export function pinnedMode() {
  return !reduced() && window.matchMedia("(min-width: 768px)").matches;
}

export function initScroll(): () => void {
  if (typeof window === "undefined") return () => {};
  const html = document.documentElement;
  const cleanups: Array<() => void> = [];
  const isReduced = reduced();
  const pinned = pinnedMode();
  html.classList.toggle("mk-pin", pinned);
  html.classList.toggle("mk-motion", !isReduced);
  (window as unknown as { __mkReady?: boolean }).__mkReady = true;

  const main = document.querySelector("main") ?? document.body;

  /* ───────── 1. Apparitions ───────── */
  if (!isReduced) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).classList.add("mk-in");
        io.unobserve(e.target);
      }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.1 });
    cleanups.push(() => io.disconnect());

    document.querySelectorAll<HTMLElement>("[data-split], .photo-reveal").forEach((el) => io.observe(el));

    const groups = new Map<Element, number>();
    main.querySelectorAll<HTMLElement>("p, li, figure, h3, .btn-pill, a.pill, form, iframe, [data-rise]").forEach((el) => {
      if (el.closest("[data-split], [data-no-reveal], .journey, .delegation-stage, header, .site-menu")) return;
      if (el.closest("form") && el.tagName !== "FORM") return;
      const parent = el.parentElement ?? el;
      const n = groups.get(parent) ?? 0;
      groups.set(parent, n + 1);
      el.classList.add("mk-rise");
      el.style.setProperty("--d", `${Math.min(n, 6) * 70}ms`);
      io.observe(el);
    });

    /* compteurs */
    main.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const target = Number(el.dataset["count"]);
      if (!Number.isFinite(target)) return;
      const cio = new IntersectionObserver(([e]) => {
        if (!e?.isIntersecting) return;
        cio.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1400);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(tick);
        };
        el.textContent = "0";
        requestAnimationFrame(tick);
      }, { threshold: 0.6 });
      cio.observe(el);
      cleanups.push(() => cio.disconnect());
    });
  }

  /* ───────── 2. Éléments pilotés par le défilement ───────── */
  const header = document.querySelector<HTMLElement>("header.site-header");
  const bar = document.querySelector<HTMLElement>(".mk-progress");
  const darkZones = [...document.querySelectorAll<HTMLElement>("[data-dark]")];
  const speeds = isReduced ? [] : [...main.querySelectorAll<HTMLElement>("[data-speed]")];
  const expands = isReduced ? [] : [...main.querySelectorAll<HTMLElement>("[data-expand]")];
  const draws = isReduced ? [] : [...main.querySelectorAll<SVGPathElement>("[data-draw]")];
  draws.forEach((p) => { p.setAttribute("pathLength", "1"); p.style.strokeDasharray = "1"; p.style.strokeDashoffset = "1"; });

  const journey = pinned ? document.querySelector<HTMLElement>('[data-scene="journey"]') : null;
  const jLayers = journey ? [...journey.querySelectorAll<HTMLElement>(".j-layer")] : [];
  const jCopies = journey ? [...journey.querySelectorAll<HTMLElement>(".j-copy")] : [];
  const jDots = journey ? [...journey.querySelectorAll<HTMLElement>(".j-dot")] : [];
  const jGlow = journey?.querySelector<HTMLElement>(".j-glow") ?? null;
  const jPersist = journey?.querySelector<HTMLElement>(".j-persist") ?? null;
  const deleg = pinned ? document.querySelector<HTMLElement>('[data-scene="delegation"]') : null;
  const dItems = deleg ? [...deleg.querySelectorAll<HTMLElement>(".d-item")] : [];

    const written = new WeakMap<HTMLElement, Record<string, string>>();
  const put = (el: HTMLElement | null, prop: "opacity" | "transform" | "visibility" | "translate" | "clipPath", value: string) => {
    if (!el) return;
    let memo = written.get(el);
    if (!memo) { memo = {}; written.set(el, memo); }
    if (memo[prop] === value) return;
    memo[prop] = value;
    (el.style as unknown as Record<string, string>)[prop] = value;
  };

  let jp = 0; let jt = 0; // progression affichée / cible du parcours
  let dp = 0; let dt = 0;
  let raf = 0; let lastY = -1;

  const sceneProgress = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height - innerHeight));
  };

  function paintJourney(p: number) {
    const n = JOURNEY_CHAPTERS;
    const seg = 1 / n;
    jLayers.forEach((layer, i) => {
      const start = i * seg;
      const u = clamp((p - (start - 0.05)) / (seg + 0.05 + (i === n - 1 ? 0 : 0.0)));
      const scale = 0.95 + 0.3 * u;
      const appear = i === 0 ? 1 : smooth((p - (start - 0.045)) / 0.07);
      const covered = i < n - 1 && p > (i + 1) * seg + 0.03;
      put(layer, "opacity", appear.toFixed(3));
      put(layer, "transform", `scale(${scale.toFixed(4)})`);
      put(layer, "visibility", covered ? "hidden" : "visible");
    });
    jCopies.forEach((copy, i) => {
      const start = i * seg;
      const inT = i === 0 ? 1 : smooth((p - (start + 0.025)) / 0.05);
      const outT = i === n - 1 ? 0 : smooth((p - ((i + 1) * seg - 0.045)) / 0.04);
      const o = inT * (1 - outT);
      const y = (1 - inT) * 46 - outT * 46;
      put(copy, "opacity", o.toFixed(3));
      put(copy, "transform", `translate3d(0,${y.toFixed(1)}px,0)`);
      put(copy, "visibility", o < 0.01 ? "hidden" : "visible");
    });
    const pin = smooth((p - (seg + 0.03)) / 0.05);
    put(jPersist, "opacity", pin.toFixed(3));
    put(jPersist, "transform", `translate3d(0,${((1 - pin) * 30).toFixed(1)}px,0)`);
    put(jPersist, "visibility", pin < 0.01 ? "hidden" : "visible");
    const active = clamp(Math.floor(p * n + 0.0001), 0, n - 1);
    jDots.forEach((d, i) => { d.dataset["on"] = i === active ? "1" : i < active ? "done" : "0"; });
    journey!.style.setProperty("--jp", p.toFixed(3));
    journey!.dataset["tone"] = p > 0.235 ? "light" : "dark";
    if (jGlow) put(jGlow, "transform", `translate3d(${(p * 40 - 10).toFixed(1)}%, ${(Math.sin(p * 6.28) * 8).toFixed(1)}%, 0)`);
  }

  function paintDelegation(p: number) {
    const idx = clamp(Math.floor(p * 3 * 0.999), 0, 2);
    dItems.forEach((it, i) => { it.dataset["state"] = i === idx ? "on" : i < idx ? "past" : "next"; });
    deleg!.style.setProperty("--dp", p.toFixed(3));
    sceneState.delegation = p;
  }

  function frame() {
    raf = 0;
    const y = window.scrollY;
    const vh = innerHeight;
    let busy = false;

    if (bar) bar.style.transform = `scaleX(${clamp(y / Math.max(1, html.scrollHeight - vh)).toFixed(4)})`;

    if (journey) {
      jt = sceneProgress(journey);
      jp += (jt - jp) * 0.14;
      if (Math.abs(jt - jp) < 0.0006) jp = jt; else busy = true;
      paintJourney(jp);
    }
    if (deleg) {
      dt = sceneProgress(deleg);
      dp += (dt - dp) * 0.14;
      if (Math.abs(dt - dp) < 0.0006) dp = dt; else busy = true;
      paintDelegation(dp);
    }

    for (const el of speeds) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const k = Number(el.dataset["speed"] ?? 0.1);
      const c = (r.top + r.height / 2 - vh / 2) / vh;
      put(el, "translate", `0 ${(c * -k * 100).toFixed(1)}px`);
    }
    for (const el of expands) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const q = smooth((vh - r.top) / (vh * 0.7));
      const inset = (1 - q);
      put(el, "clipPath", `inset(${(inset * 9).toFixed(2)}% ${(inset * 6).toFixed(2)}% round ${(inset * 2.2).toFixed(2)}rem)`);
    }
    for (const p of draws) {
      const box = (p.ownerSVGElement ?? p).getBoundingClientRect();
      if (box.bottom < -50 || box.top > vh + 50) continue;
      const q = clamp((vh * 0.78 - box.top) / Math.max(1, box.height + vh * 0.25));
      p.style.strokeDashoffset = String((1 - q).toFixed(4));
    }

    if (header) {
      let dark = false;
      for (const z of darkZones) {
        const r = z.getBoundingClientRect();
        if (z.dataset["tone"] === "light") continue;
        if (r.top <= 44 && r.bottom >= 44) { dark = true; break; }
      }
      header.classList.toggle("over-dark", dark);
      header.classList.toggle("is-solid", !dark && y > 24);
    }
    lastY = y;
    if (busy) raf = requestAnimationFrame(frame);
  }

  const request = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const onScroll = () => { if (window.scrollY !== lastY || !raf) request(); };
  frame();
  // La hauteur change quand les images chargent : on recalcule.
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(request) : null;
  ro?.observe(main);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", request);
  cleanups.push(() => { removeEventListener("scroll", onScroll); removeEventListener("resize", request); ro?.disconnect(); cancelAnimationFrame(raf); });

  return () => cleanups.forEach((fn) => fn());
}
