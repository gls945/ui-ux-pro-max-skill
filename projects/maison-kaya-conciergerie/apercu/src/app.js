import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/* ───────── Données ───────── */
const values = [
  ["Proximité", "Privilégier les échanges humains et un accompagnement local, avec un interlocuteur qui connaît votre secteur."],
  ["Soin du détail", "Accorder de l'importance à chaque étape et à chaque intervention, comme pour un lieu qui mérite toute notre attention."],
  ["Transparence", "Maintenir une communication claire sur les prestations, les tarifs et le suivi de votre logement."],
];
const services = [
  ["voyageurs", "Accompagnement des voyageurs", "Réponses aux messages, informations utiles et suivi avant, pendant et après chaque séjour.", "living",
    ["Réponse aux demandes et messages des voyageurs.", "Communication avant, pendant et après le séjour.", "Transmission des informations utiles au séjour.", "Accompagnement dans le déroulement de l'expérience voyageur."]],
  ["menage-linge", "Coordination du ménage et du linge", "Organisation des interventions et préparation soignée du logement entre deux séjours.", "bedroom",
    ["Organisation des interventions de ménage.", "Coordination des prestataires.", "Préparation du logement entre les séjours.", "Vérification de la bonne préparation du logement selon les modalités convenues."]],
  ["annonces", "Création et valorisation des annonces", "Des annonces claires et soignées qui mettent en lumière les atouts de votre logement.", "apartment",
    ["Création ou amélioration de l'annonce.", "Rédaction des descriptions.", "Mise en valeur des caractéristiques du logement.", "Conseils pour les photographies.", "Amélioration de la présentation générale."]],
  ["decoration", "Décoration et aménagement", "Conseils et recommandations pour révéler le charme de votre intérieur.", "details",
    ["Conseils en décoration.", "Recommandations d'aménagement.", "Optimisation de la présentation du logement.", "Suggestions d'amélioration pour renforcer son attractivité."]],
  ["maintenance", "Maintenance et interventions", "Identification des besoins et coordination des professionnels, après votre validation.", "kitchen",
    ["Identification des besoins d'entretien.", "Coordination des interventions nécessaires.", "Mise en relation avec des professionnels.", "Suivi des interventions après validation du propriétaire."]],
];
const reasons = [
  ["Un accompagnement personnalisé", "Chaque logement est unique : nous adaptons notre accompagnement à votre bien et à vos attentes."],
  ["Un interlocuteur de proximité", "Basés à Champigny-sur-Marne, nous intervenons dans les communes voisines du Val-de-Marne."],
  ["Une communication transparente", "Des échanges clairs et réguliers sur les prestations, les interventions et le suivi."],
  ["Une attention portée au logement", "Nous prenons soin de votre intérieur comme d'un lieu qui mérite toute notre attention."],
  ["Une organisation sur mesure", "Une organisation pensée selon vos besoins, votre disponibilité et votre façon de louer."],
];
const steps = [
  ["Premier échange", "Compréhension de votre logement et de vos besoins."],
  ["Étude personnalisée", "Définition des prestations adaptées à votre situation."],
  ["Mise en place", "Préparation de l'accompagnement et de l'organisation."],
  ["Suivi", "Coordination et échanges réguliers avec vous, propriétaire."],
];
const pains = [
  ["Le manque de temps", "Suivre chaque séjour demande une disponibilité que l'on n'a pas toujours."],
  ["La coordination des interventions", "Ménage, linge, petites réparations : les intervenants se multiplient."],
  ["Les échanges avec les voyageurs", "Questions, arrivées, imprévus : les messages arrivent à toute heure."],
  ["La préparation entre deux réservations", "Le logement doit être impeccable, à chaque fois, dans des délais courts."],
  ["Le besoin d'un interlocuteur de confiance", "Confier son logement suppose de pouvoir compter sur quelqu'un de fiable et joignable."],
];
const communes = [
  ["Champigny-sur-Marne", 62, 58, true, "Notre point d'attache : nous y sommes installés et y accompagnons les propriétaires au plus près."],
  ["Saint-Maur-des-Fossés", 45, 68, false, "Une commune nichée dans une boucle de la Marne, que nous rejoignons rapidement depuis Champigny."],
  ["Nogent-sur-Marne", 43, 36, false, "Sur les bords de Marne, à proximité immédiate de notre secteur principal."],
  ["Le Perreux-sur-Marne", 55, 28, false, "Commune voisine de Nogent et de Bry, intégrée à notre périmètre de proximité."],
  ["Joinville-le-Pont", 33, 52, false, "À l'ouest de notre secteur, en bordure de Marne."],
  ["Villiers-sur-Marne", 80, 50, false, "À l'est de Champigny, dans notre périmètre d'intervention direct."],
  ["Bry-sur-Marne", 68, 36, false, "Entre Champigny et Le Perreux, sur la rive de la Marne."],
];
const n2 = (i) => String(i + 1).padStart(2, "0");
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ───────── Photographies ───────── */
function paintArt(root = document) {
  $$("[data-photo]", root).forEach((el) => {
    if (el.dataset.done) return;
    const p = PHOTOS[el.dataset.photo] || PHOTOS.living;
    el.src = p.src; el.alt = p.alt; el.decoding = "async"; el.dataset.done = "1";
  });
}
function immersive(kind, inner = "", tilt = 9) {
  return `<div class="immersive__card" data-tilt="${tilt}"><div class="immersive__media"><img data-photo="${kind}" class="immersive__img" alt=""></div><div class="immersive__glare" aria-hidden="true"></div><div class="immersive__frame" aria-hidden="true"></div>${inner ? `<div class="immersive__content">${inner}</div>` : ""}<span class="immersive__360" aria-hidden="true"><b>360°</b><em>Explorer la pièce</em></span><span class="immersive__tag">Photo d'illustration</span></div>`;
}

/* ───────── Rendu des listes ───────── */
$$("[data-values]").forEach((ul) => (ul.innerHTML = values.map(([t, p], i) => `<li class="value" data-reveal style="--d:${i * 120}ms"><h3 class="h3">${t}</h3><p>${p}</p></li>`).join("")));
$("#serviceCards").innerHTML = services.map(([id, t, s, art], i) => `<li class="service-card service-card--${i}" data-reveal style="--d:${(i % 3) * 100}ms"><a href="#services" data-scrollto="${id}" class="service-card__link"><div class="immersive">${immersive(art, "", 12)}</div><h3 class="h3">${t}</h3><p>${s}</p><span class="link-arrow">En savoir plus</span></a></li>`).join("");
$("#reasons").innerHTML = reasons.map(([t, p], i) => `<li data-reveal style="--d:${i * 80}ms"><h3 class="h3">${t}</h3><p>${p}</p></li>`).join("");
$("#steps").innerHTML = steps.map(([t, p], i) => `<li class="step" data-reveal style="--d:${i * 150}ms"><span class="step__num" aria-hidden="true"></span><h3 class="h3">${t}</h3><p>${p}</p></li>`).join("");
$("#miniSteps").innerHTML = steps.map(([t, p], i) => `<li><div><strong>${t}</strong> : ${p}</div></li>`).join("");
$("#pains").innerHTML = pains.map(([t, p], i) => `<li class="pain" data-reveal style="--d:${i * 90}ms"><h3 class="h3">${t}</h3><p>${p}</p></li>`).join("");
$("#toc").innerHTML = services.map(([id, t], i) => `<a href="#services" data-scrollto="${id}">${t}</a>`).join("");
$("#serviceDetails").innerHTML = services.map(([id, t, s, art, items], i) => `<section id="svc-${id}" class="section service-detail${i % 2 ? " is-reverse sand" : ""}"><div class="container service-detail__grid"><div class="service-detail__media" data-reveal><div class="immersive">${immersive(art)}</div></div><div class="service-detail__text"><p class="eyebrow" data-reveal>Nos services</p><h2 class="h2" data-reveal>${t}</h2><p class="lead" data-reveal>${s}</p><ul class="checklist" data-reveal>${items.map((x) => `<li>${x}</li>`).join("")}</ul></div></div></section>`).join("");
$("#communes").innerHTML = communes.map(([n, , , , note], i) => `<li class="commune" data-reveal style="--d:${(i % 3) * 100}ms"><h3 class="h3">Conciergerie ${n}</h3><p>${note}</p></li>`).join("");
$$("[data-chips]").forEach((ul) => (ul.innerHTML = communes.map(([n]) => `<li><a href="#zone">${n}</a></li>`).join("")));
$("#footerCommunes").innerHTML = communes.map(([n]) => `<li><a href="#zone">${n}</a></li>`).join("");
$("#communes-list").innerHTML = communes.map(([n]) => `<option value="${n}"></option>`).join("");
$$(".immersive[data-img]").forEach((el) => (el.innerHTML = immersive(el.dataset.img, "", 7)));

const mapSVG = `<figure class="zonemap" data-reveal><div class="zonemap__plane"><svg viewBox="0 0 100 80" class="zonemap__svg" role="img" aria-label="Carte schématique des communes desservies dans le Val-de-Marne. Paris figure uniquement comme repère."><defs><pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0H0V5" fill="none" stroke="#2A2926" stroke-width=".08" opacity=".5"/></pattern></defs><rect width="100" height="80" fill="url(#grid)"/><path class="zonemap__river" d="M98 40 C88 44 82 40 74 44 C66 48 70 30 60 33 C50 36 54 46 48 50 C40 55 36 72 46 74 C56 76 58 60 50 58 C40 56 34 62 26 58 C18 54 12 48 4 47"/><g class="zonemap__paris"><circle cx="10" cy="22" r="6"/><text x="10" y="23.2" text-anchor="middle">Paris</text><text x="10" y="31.5" text-anchor="middle" class="zonemap__note">repère</text></g>${communes.map(([n, x, y, home], i) => `<g class="zonemap__pin${home ? " is-home" : ""}" style="--d:${i * 90}ms"><circle cx="${x}" cy="${y}" r="${home ? 2.2 : 1.5}" class="zonemap__dot"/><circle cx="${x}" cy="${y}" r="4" class="zonemap__halo"/><text x="${x}" y="${y - 3.4}" text-anchor="middle">${n}</text></g>`).join("")}</svg></div><figcaption>Représentation schématique. Paris n'est indiqué qu'à titre de repère géographique.</figcaption></figure>`;
$$("[data-map]").forEach((el) => (el.outerHTML = mapSVG));

const cta = `<section class="cta section"><div class="container cta__grid"><div class="cta__text" data-reveal><p class="eyebrow">Parlons-en</p><h2 class="h2">Et si nous prenions soin de votre logement ?</h2><p class="lead">Échangeons sur votre projet et découvrons ensemble comment Maison Kaya peut vous accompagner.</p><div class="btn-row"><a href="#contact" class="btn btn--dark btn--lg">Parlons de votre projet</a><a href="https://wa.me/33763901469" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--lg">Échanger sur WhatsApp</a></div></div><div class="cta__media" data-reveal><div class="immersive">${immersive("bedroom")}</div></div></div></section>`;
$$("[data-cta]").forEach((el) => (el.outerHTML = cta));
paintArt();

/* ───────── Image immersive : inclinaison, parallaxe, reflet ───────── */
document.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return;
  const card = e.target.closest?.(".immersive__card");
  $$(".immersive__card.is-tilting").forEach((c) => {
    if (c !== card) {
      c.classList.remove("is-tilting");
      ["--rx", "--ry"].forEach((p) => c.style.setProperty(p, "0deg"));
      ["--px", "--py"].forEach((p) => c.style.setProperty(p, "0px"));
    }
  });
  if (!card) return;
  card.classList.add("is-tilting");
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  // Pendant la vue 360°, la carte ne s'incline presque plus : c'est le regard qui bouge.
  const t = (Number(card.dataset.tilt) || 9) * (card.classList.contains("is-pano") ? 0.25 : 1);
  card.style.setProperty("--rx", `${(0.5 - y) * t}deg`);
  card.style.setProperty("--ry", `${(x - 0.5) * t}deg`);
  card.style.setProperty("--px", `${(0.5 - x) * 28}px`);
  card.style.setProperty("--py", `${(0.5 - y) * 28}px`);
  card.style.setProperty("--gx", `${x * 100}%`);
  card.style.setProperty("--gy", `${y * 100}%`);
  pano.look(card, x, y);
}, { passive: true });

/* ───────── Vue 360° à la première personne ─────────
   Au survol (ou au toucher), la photo est projetée sur l'intérieur d'une sphère ;
   la caméra est au centre de la pièce et la souris oriente le regard
   gauche/droite et haut/bas. Un seul moteur WebGL est partagé entre toutes les photos. */
const pano = (() => {
  const noop = { look() {}, enter() {}, leave() {} };
  const canvas = document.createElement("canvas");
  canvas.className = "pano";
  canvas.setAttribute("aria-hidden", "true");
  let R;
  try { R = new THREE.WebGLRenderer({ canvas, antialias: true }); } catch { return noop; }
  R.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  R.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xefebe3);
  const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  cam.rotation.order = "YXZ";
  const deg = THREE.MathUtils.degToRad;
  const cache = {};
  let mesh = null, card = null, span = { h: deg(130), v: deg(90) }, raf = 0, active = false;
  const st = { yaw: 0, pitch: 0, ty: 0, tp: 0, fov: 120, tfov: 120 };

  function sphereFor(key, img) {
    if (cache[key]) return cache[key];
    const tex = new THREE.Texture(img);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = R.capabilities.getMaxAnisotropy();
    tex.needsUpdate = true;
    // Arc horizontal large ; arc vertical déduit du format de la photo pour garder ses proportions.
    const h = deg(130);
    const v = Math.min(h / (img.naturalWidth / img.naturalHeight), deg(120));
    const geo = new THREE.SphereGeometry(10, 96, 64, (3 * Math.PI) / 2 - h / 2, h, Math.PI / 2 - v / 2, v);
    geo.scale(-1, 1, 1); // on regarde depuis l'intérieur
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex }));
    return (cache[key] = { m, h, v });
  }
  function size() {
    const r = card.querySelector(".immersive__media").getBoundingClientRect();
    R.setSize(r.width, r.height, false);
    cam.aspect = r.width / Math.max(r.height, 1);
  }
  function limits() {
    // Champ de vision : on garde de la marge pour pouvoir balayer la pièce.
    const vf = Math.min(st.fov, THREE.MathUtils.radToDeg(span.v) * 0.86);
    const hf = 2 * Math.atan(Math.tan(deg(vf) / 2) * cam.aspect);
    return { vf, maxYaw: Math.max(0, (span.h - hf) / 2) * 0.92, maxPitch: Math.max(0, (span.v - deg(vf)) / 2) * 0.8 };
  }
  function frame() {
    st.fov += (st.tfov - st.fov) * 0.08;
    st.yaw += (st.ty - st.yaw) * 0.09;
    st.pitch += (st.tp - st.pitch) * 0.09;
    const L = limits();
    cam.fov = L.vf;
    cam.updateProjectionMatrix();
    cam.rotation.y = THREE.MathUtils.clamp(st.yaw, -L.maxYaw, L.maxYaw);
    cam.rotation.x = THREE.MathUtils.clamp(st.pitch, -L.maxPitch, L.maxPitch);
    R.render(scene, cam);
    if (active) raf = requestAnimationFrame(frame);
  }
  return {
    enter(c) {
      if (card === c) return;
      if (card) this.leave(card);
      const img = c.querySelector(".immersive__img");
      if (!img || !img.complete || !img.naturalWidth) return;
      card = c;
      const s = sphereFor(img.dataset.photo, img);
      if (mesh) scene.remove(mesh);
      mesh = s.m; span = s; scene.add(mesh);
      c.querySelector(".immersive__media").appendChild(canvas);
      size();
      Object.assign(st, { yaw: 0, pitch: 0, ty: 0, tp: 0, fov: 120, tfov: 120 }); // pas de zoom : champ large, profondeur naturelle
      active = true;
      cancelAnimationFrame(raf);
      frame();
      c.classList.add("is-pano");
    },
    look(c, x, y) {
      if (c !== card) this.enter(c);
      if (c !== card) return;
      const L = limits();
      st.ty = (0.5 - x) * 2 * L.maxYaw;   // souris à droite → on regarde à droite
      st.tp = (0.5 - y) * 2 * L.maxPitch; // souris en haut → on lève les yeux
    },
    leave(c) {
      if (c !== card) return;
      c.classList.remove("is-pano");
      active = false;
      cancelAnimationFrame(raf);
      card = null;
      setTimeout(() => { if (!card && canvas.parentNode) canvas.remove(); }, 450);
    },
  };
})();

document.addEventListener("pointerout", (e) => {
  const c = e.target.closest?.(".immersive__card");
  if (c && !c.contains(e.relatedTarget)) pano.leave(c);
});
// Tactile : on fait glisser le doigt sur la photo pour regarder autour de soi.
let touchCard = null, touchStart = null;
document.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse") return;
  const c = e.target.closest?.(".immersive__card");
  if (!c) return;
  touchCard = c;
  touchStart = { x: e.clientX, y: e.clientY, lx: 0.5, ly: 0.5 };
  pano.look(c, 0.5, 0.5);
});
document.addEventListener("pointermove", (e) => {
  if (e.pointerType === "mouse" || !touchCard) return;
  const r = touchCard.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, touchStart.lx - (e.clientX - touchStart.x) / r.width));
  const y = Math.min(1, Math.max(0, touchStart.ly - (e.clientY - touchStart.y) / r.height));
  pano.look(touchCard, x, y);
}, { passive: true });
document.addEventListener("pointerup", () => { touchCard = null; });
document.addEventListener("scroll", () => { if (touchCard === null) { const c = document.querySelector(".immersive__card.is-pano"); if (c && !c.matches(":hover")) pano.leave(c); } }, { passive: true });

/* ───────── Apparitions ───────── */
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
const observeReveal = () => $$(".page:not([hidden]) [data-reveal]:not(.is-in)").forEach((el) => io.observe(el));

/* ───────── Navigation par ancre ───────── */
const PAGES = ["accueil", "services", "proprietaires", "approche", "zone", "contact", "mentions", "confidentialite"];
const header = $("#header");
function route() {
  const h = location.hash.slice(1);
  const page = PAGES.includes(h) ? h : "accueil";
  $$(".page").forEach((p) => (p.hidden = p.dataset.page !== page));
  document.body.classList.toggle("on-home", page === "accueil");
  $$(".header__nav a, .mobile-menu a").forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === "#" + page ? "page" : "false"));
  closeMenu();
  window.scrollTo(0, 0);
  requestAnimationFrame(() => { observeReveal(); onScroll(); scenes.forEach((s) => s.resize()); });
}
window.addEventListener("hashchange", route);
document.addEventListener("click", (e) => {
  const a = e.target.closest?.("[data-scrollto]");
  if (!a) return;
  e.preventDefault();
  const go = () => document.getElementById("svc-" + a.dataset.scrollto)?.scrollIntoView({ behavior: "smooth" });
  if (location.hash !== "#services") { location.hash = "services"; setTimeout(go, 80); } else go();
});

/* Menu mobile */
const burger = $("#burger"), menu = $("#mobile-menu");
function closeMenu() { menu.hidden = true; header.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); document.documentElement.classList.remove("menu-open"); }
burger.addEventListener("click", () => {
  const open = menu.hidden;
  menu.hidden = !open; header.classList.toggle("is-open", open); burger.setAttribute("aria-expanded", String(open));
  document.documentElement.classList.toggle("menu-open", open);
});

/* Défilement : en-tête + parallaxe */
function onScroll() {
  header.classList.toggle("is-scrolled", scrollY > 24);
  $$(".page:not([hidden]) [data-parallax]").forEach((el) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--parallax", `${((r.top + r.height / 2 - innerHeight / 2) * -(Number(el.dataset.parallax) || 0.1)).toFixed(1)}px`);
  });
}
addEventListener("scroll", onScroll, { passive: true });
$("#hero").addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return;
  e.currentTarget.style.setProperty("--hx", (e.clientX / innerWidth - 0.5).toFixed(3));
  e.currentTarget.style.setProperty("--hy", (e.clientY / innerHeight - 0.5).toFixed(3));
});

/* Formulaire (aperçu : aucun envoi réel) */
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget, d = Object.fromEntries(new FormData(f));
  const errs = {};
  if ((d.name || "").trim().length < 2) errs.name = "Merci d'indiquer votre nom et prénom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((d.email || "").trim())) errs.email = "Merci d'indiquer une adresse e-mail valide (ex. nom@domaine.fr).";
  if (!/^[+0-9 ().-]{10,20}$/.test((d.phone || "").trim())) errs.phone = "Merci d'indiquer un numéro de téléphone valide.";
  if (!(d.city || "").trim()) errs.city = "Merci d'indiquer la ville du logement.";
  if (!d.type) errs.type = "Merci de choisir le type de logement.";
  if ((d.message || "").trim().length < 10) errs.message = "Votre message doit contenir au moins 10 caractères.";
  if (!d.consent) errs.consent = "Merci d'accepter l'utilisation de vos données pour traiter votre demande.";
  $$(".field__error", f).forEach((x) => x.remove());
  $$("[aria-invalid]", f).forEach((x) => x.removeAttribute("aria-invalid"));
  Object.entries(errs).forEach(([k, m]) => {
    const input = f.elements[k];
    input.setAttribute("aria-invalid", "true");
    const p = document.createElement("p"); p.className = "field__error"; p.textContent = m;
    input.closest(".field").appendChild(p);
  });
  const first = Object.keys(errs)[0];
  if (first) { f.elements[first].focus(); $("#formMsg").innerHTML = ""; return; }
  $("#formMsg").innerHTML = `<div class="form-error" role="alert"><p><strong>Votre demande n'a pas été envoyée : ceci est un aperçu du site.</strong></p><p>L'envoi par e-mail fonctionnera sur le site en ligne. En attendant, joignez Maison Kaya au 07 63 90 14 69, sur <a href="https://wa.me/33763901469" target="_blank" rel="noopener noreferrer">WhatsApp</a> ou à maisonkayaconciergerie@gmail.com.</p></div>`;
});

/* ───────── three.js : objets ───────── */
const ink = () => new THREE.MeshStandardMaterial({ color: 0x2a2926, metalness: 0.85, roughness: 0.32 });
const ivoryMetal = () => new THREE.MeshStandardMaterial({ color: 0xf1eee6, metalness: 1, roughness: 0.26 });
function makeRenderer(canvas) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.toneMapping = THREE.ACESFilmicToneMapping;
  const pm = new THREE.PMREMGenerator(r);
  const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  pm.dispose();
  return { r, env };
}
function createKey(m = ink()) {
  const k = new THREE.Group();
  const add = (geo, x, y = 0, rotZ = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, 0); o.rotation.z = rotZ; k.add(o); return o; };
  add(new THREE.TorusGeometry(0.55, 0.11, 32, 96), -1.35);
  for (let i = 0; i < 4; i++) { const a = (i * Math.PI) / 2; add(new THREE.TorusGeometry(0.2, 0.045, 16, 48), -1.35 + Math.cos(a) * 0.2, Math.sin(a) * 0.2); }
  add(new THREE.SphereGeometry(0.09, 24, 24), -1.35);
  add(new THREE.CylinderGeometry(0.15, 0.15, 0.22, 32), -0.68, 0, Math.PI / 2);
  add(new THREE.CylinderGeometry(0.12, 0.12, 0.11, 32), -0.45, 0, Math.PI / 2);
  add(new THREE.CylinderGeometry(0.075, 0.075, 2.1, 32), 0.6, 0, Math.PI / 2);
  add(new THREE.SphereGeometry(0.075, 24, 24), 1.65);
  add(new THREE.BoxGeometry(0.5, 0.42, 0.08), 1.32, -0.25);
  [1.15, 1.32, 1.5].forEach((x, i) => add(new THREE.BoxGeometry(0.1, 0.16 + (i % 2) * 0.1, 0.08), x, -0.5 - (i % 2) * 0.05));
  return k;
}
function createSculpture() {
  const g = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0xf7f5ef, roughness: 0.85 });
  const greige = new THREE.MeshStandardMaterial({ color: 0xe4ded3, roughness: 0.9 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2926, roughness: 0.35, metalness: 0.2 });
  const s = new THREE.Shape(); s.moveTo(-1, -1.6); s.lineTo(-1, 0.4); s.absarc(0, 0.4, 1, Math.PI, 0, true); s.lineTo(1, -1.6); s.lineTo(-1, -1.6);
  const h = new THREE.Path(); h.moveTo(-0.62, -1.6); h.lineTo(-0.62, 0.4); h.absarc(0, 0.4, 0.62, Math.PI, 0, true); h.lineTo(0.62, -1.6); s.holes.push(h);
  const arch = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 0.35, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3, curveSegments: 48 }), stone);
  arch.position.set(0, 0.1, -0.2); g.add(arch);
  const slab = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 1.4), greige); slab.position.y = -1.6; g.add(slab);
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), dark); sphere.position.set(1.55, -1.08, 0.3); g.add(sphere);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.05, 24, 80), ink()); ring.position.set(-1.45, -0.6, 0.4); g.add(ring);
  const small = new THREE.Mesh(new THREE.SphereGeometry(0.16, 48, 48), ink()); small.position.set(0, 0.25, 0.25); g.add(small);
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.9, 48), greige); cyl.position.set(-1.35, -1.06, -0.2); g.add(cyl);
  return { g, ring, small, sphere };
}
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
addEventListener("pointermove", (e) => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; }, { passive: true });

/* Scènes décoratives */
const scenes = [];
$$("[data-scene]").forEach((wrap) => {
  const canvas = $("canvas", wrap);
  let R;
  try { R = makeRenderer(canvas); } catch { return; }
  const scene = new THREE.Scene(); scene.environment = R.env;
  const variant = wrap.dataset.scene;
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100); cam.position.z = variant === "key" ? 9 : 10.5;
  const l = new THREE.DirectionalLight(0xffffff, 2); l.position.set(-3, 5, 6);
  scene.add(l, new THREE.AmbientLight(0xfbfaf5, 0.5));
  const root = new THREE.Group(); scene.add(root);
  let ex = {};
  if (variant === "key") { const k = createKey(ivoryMetal()); k.rotation.set(0.35, -0.5, 0.45); root.add(k); }
  else { ex = createSculpture(); root.add(ex.g); }
  const resize = () => { const b = wrap.getBoundingClientRect(); if (!b.width) return; R.r.setSize(b.width, b.height, false); cam.aspect = b.width / Math.max(b.height, 1); cam.updateProjectionMatrix(); };
  resize(); new ResizeObserver(resize).observe(wrap);
  let on = false;
  new IntersectionObserver(([e]) => (on = e.isIntersecting)).observe(wrap);
  const clock = new THREE.Clock();
  scenes.push({ resize, tick() {
    if (!on) return;
    const t = clock.getElapsedTime();
    if (variant === "key") {
      root.rotation.y = (reduce ? 0 : t * 0.35) + mouse.x * 0.9 + Math.min(scrollY / 1200, 1) * 1.5;
      root.rotation.x = mouse.y * 0.5; root.position.y = reduce ? 0 : Math.sin(t * 1.1) * 0.15;
    } else {
      root.rotation.y = -0.35 + mouse.x * 0.6 + (reduce ? 0 : Math.sin(t * 0.25) * 0.15); root.rotation.x = 0.08 + mouse.y * 0.2;
      if (!reduce) { ex.small.position.y = 0.25 + Math.sin(t * 1.2) * 0.12; ex.ring.rotation.y = t * 0.8; }
    }
    R.r.render(scene, cam);
  } });
  wrap.classList.add("is-ready");
});

/* Boucle d'animation unique */
(function loop() {
  mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
  scenes.forEach((s) => s.tick());
  requestAnimationFrame(loop);
})();
route();
