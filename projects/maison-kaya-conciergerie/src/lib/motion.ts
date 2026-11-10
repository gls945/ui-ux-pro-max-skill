/**
 * Couche d'animations Maison Kaya — sans dépendance.
 * S'applique au DOM déjà rendu (pages SSR), après l'hydratation :
 *  - titres révélés mot à mot (masque + montée)
 *  - textes, listes, avis et boutons qui apparaissent en cascade
 *  - photos dévoilées par un rideau, puis légère parallaxe au défilement
 *  - boutons « aimantés » et curseur personnalisé (souris uniquement)
 *  - barre de progression de lecture, compteurs animés ([data-count])
 *  - en-tête qui se replie au défilement vers le bas
 * Rien n'est caché si le script ne tourne pas ; « réduire les animations » désactive tout.
 */

type Cleanup = () => void;

const EASE = "cubic-bezier(.2,.75,.2,1)";
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Découpe un titre en mots, sans toucher aux titres dynamiques (formulaires, en-tête). */
function splitWords(el: HTMLElement) {
  if (el.dataset["mkSplit"] || el.closest("form, header, [data-no-motion]")) return false;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  while (walker.nextNode()) texts.push(walker.currentNode as Text);
  let i = 0;
  for (const t of texts) {
    const parts = (t.textContent ?? "").split(/(\s+)/);
    if (!parts.some((p) => p.trim())) continue;
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (!part) continue;
      if (!part.trim()) { frag.appendChild(document.createTextNode(part)); continue; }
      const outer = document.createElement("span");
      outer.className = "mk-w";
      const inner = document.createElement("span");
      inner.className = "mk-wi";
      inner.style.setProperty("--i", String(i++));
      inner.textContent = part;
      outer.appendChild(inner);
      frag.appendChild(outer);
    }
    t.parentNode?.replaceChild(frag, t);
  }
  el.dataset["mkSplit"] = "1";
  el.classList.add("mk-split");
  return true;
}

export function initMotion(root: ParentNode = document): Cleanup {
  if (typeof window === "undefined") return () => {};
  const doc = document.documentElement;
  if (reduced()) { doc.classList.remove("mk-motion"); return () => {}; }
  doc.classList.add("mk-motion");
  const cleanups: Cleanup[] = [];
  const main = (root as Document).querySelector?.("main") ?? root;

  /* 1. Apparitions au défilement */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      (e.target as HTMLElement).classList.add("mk-in");
      io.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  cleanups.push(() => io.disconnect());

  const heads = main.querySelectorAll<HTMLElement>("h1, h2, .display-xl, .display-lg, .decision-option h3");
  heads.forEach((h) => {
    // Déjà découpé lors d'un passage précédent mais pas encore révélé : on le réobserve.
    if (splitWords(h) || (h.dataset["mkSplit"] && !h.classList.contains("mk-in"))) io.observe(h);
  });

  const groups = new Map<Element, number>();
  main.querySelectorAll<HTMLElement>("p, li, figure, h3, .btn-pill, a.rounded-full, form, address, iframe, dl > div")
    .forEach((el) => {
      if (el.closest(".mk-split, header, [data-no-motion], .animate-rise")) return;
      if (el.classList.contains("mk-rise")) { if (!el.classList.contains("mk-in")) io.observe(el); return; }
      const parent = el.parentElement ?? el;
      const n = groups.get(parent) ?? 0;
      groups.set(parent, n + 1);
      el.classList.add("mk-rise");
      el.style.setProperty("--d", `${Math.min(n, 6) * 70}ms`);
      io.observe(el);
    });

  /* 2. Photos : rideau puis parallaxe */
  const photos = [...main.querySelectorAll<HTMLElement>(".interior-photo, img")].filter((el) => {
    if (el.tagName === "IMG" && el.closest(".interior-photo, .hero-logo, .delegation-sculpture")) return false;
    if (el.closest(".home-hero")) return false;
    const r = el.getBoundingClientRect();
    return r.width > 160 && r.height > 120;
  });
  photos.forEach((el) => { el.classList.add("mk-photo"); if (!el.classList.contains("mk-in")) io.observe(el); });

  /* 3. Défilement : progression, parallaxe, en-tête, héros */
  const bar = document.createElement("div");
  bar.className = "mk-progress";
  document.body.appendChild(bar);
  cleanups.push(() => bar.remove());
  const header = document.querySelector<HTMLElement>("body > header, header.fixed, header");
  const hero = main.querySelector<HTMLElement>(".home-hero");
  const kaya = document.querySelectorAll<HTMLElement>("[data-parallax-x]");
  let lastY = window.scrollY;
  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      bar.style.transform = `scaleX(${Math.min(1, y / max)})`;
      if (header) {
        const down = y > lastY && y > 160;
        header.classList.toggle("mk-hide", down);
        header.classList.toggle("mk-scrolled", y > 40);
      }
      lastY = y;
      for (const el of photos) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > innerHeight + 100) continue;
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.setProperty("--mk-py", `${(p * -28).toFixed(1)}px`);
      }
      if (hero) {
        const p = Math.min(1, Math.max(0, y / (hero.offsetHeight || 1)));
        hero.style.setProperty("--mk-hero", p.toFixed(3));
      }
      kaya.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = (r.top - innerHeight) / innerHeight;
        el.style.setProperty("--mk-x", `${(p * 18).toFixed(2)}vw`);
      });
    });
  };
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  cleanups.push(() => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); });

  /* 4. Compteurs */
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

  /* 5. Boutons aimantés + curseur (souris uniquement) */
  if (finePointer()) {
    const magnets = [...document.querySelectorAll<HTMLElement>(".btn-pill, a.rounded-full, button.rounded-full, .menu-toggle")];
    const onMove = (e: PointerEvent) => {
      for (const m of magnets) {
        const r = m.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const near = Math.abs(dx) < r.width / 2 + 40 && Math.abs(dy) < r.height / 2 + 40;
        m.style.translate = near ? `${dx * 0.22}px ${dy * 0.3}px` : "";
      }
    };
    addEventListener("pointermove", onMove, { passive: true });
    cleanups.push(() => { removeEventListener("pointermove", onMove); magnets.forEach((m) => (m.style.translate = "")); });

    let cursor = document.querySelector<HTMLElement>(".mk-cursor");
    if (!cursor) {
      cursor = document.createElement("div");
      cursor.className = "mk-cursor";
      cursor.innerHTML = "<span></span>";
      document.body.appendChild(cursor);
    }
    const c = cursor;
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, loop = 0;
    const follow = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      c.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      loop = requestAnimationFrame(follow);
    };
    follow();
    const onCursor = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target as Element | null;
      c.classList.add("is-on");
      c.classList.toggle("is-link", !!t?.closest("a, button, [role=button], input, select, textarea, label"));
      c.classList.toggle("is-photo", !!t?.closest(".mk-photo, .interior-photo"));
    };
    const onLeave = () => c.classList.remove("is-on");
    addEventListener("pointermove", onCursor, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    cleanups.push(() => { cancelAnimationFrame(loop); removeEventListener("pointermove", onCursor); document.removeEventListener("pointerleave", onLeave); });
  }

  return () => cleanups.forEach((fn) => fn());
}

/** Rideau de transition entre deux pages. */
export function playPageTransition() {
  if (typeof window === "undefined" || reduced()) return;
  const veil = document.createElement("div");
  veil.className = "mk-veil";
  veil.innerHTML = '<span>Maison <em>Kaya</em></span>';
  document.body.appendChild(veil);
  veil.addEventListener("animationend", (e) => { if (e.target === veil) veil.remove(); });
  setTimeout(() => veil.remove(), 1600);
}

export { EASE };
