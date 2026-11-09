import * as THREE from "three";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ───── Contenus (cahier des charges) ───── */
const values = [
  ["Proximité", "Des échanges humains et un accompagnement local, avec un interlocuteur qui connaît votre secteur."],
  ["Soin du détail", "De l'importance accordée à chaque étape et à chaque intervention dans votre logement."],
  ["Transparence", "Une communication claire sur les prestations, les tarifs et le suivi."],
];
const services = [
  ["voyageurs", "Accompagnement des voyageurs", "Réponses aux messages, informations utiles et suivi avant, pendant et après chaque séjour.",
    ["Réponse aux demandes et messages des voyageurs.", "Communication avant, pendant et après le séjour.", "Transmission des informations utiles au séjour.", "Accompagnement dans le déroulement de l'expérience voyageur."]],
  ["menage", "Coordination du ménage et du linge", "Organisation des interventions et préparation du logement entre deux séjours.",
    ["Organisation des interventions de ménage.", "Coordination des prestataires.", "Préparation du logement entre les séjours.", "Vérification de la bonne préparation du logement selon les modalités convenues."]],
  ["annonces", "Création et valorisation des annonces", "Rédaction de l'annonce, mise en valeur du logement et conseils pour les photos.",
    ["Création ou amélioration de l'annonce.", "Rédaction des descriptions.", "Mise en valeur des caractéristiques du logement.", "Conseils pour les photographies.", "Amélioration de la présentation générale."]],
  ["decoration", "Décoration et aménagement", "Conseils de décoration et d'aménagement pour présenter le logement au mieux.",
    ["Conseils en décoration.", "Recommandations d'aménagement.", "Optimisation de la présentation du logement.", "Suggestions d'amélioration pour renforcer son attractivité."]],
  ["maintenance", "Maintenance et interventions", "Repérage des besoins d'entretien et coordination des professionnels, après votre validation.",
    ["Identification des besoins d'entretien.", "Coordination des interventions nécessaires.", "Mise en relation avec des professionnels.", "Suivi des interventions après validation du propriétaire."]],
];
const reasons = [
  ["Un accompagnement personnalisé", "Les prestations sont choisies selon votre logement et vos attentes."],
  ["Un interlocuteur de proximité", "Basé à Champigny-sur-Marne, à quelques minutes des communes desservies."],
  ["Une communication transparente", "Des échanges réguliers sur les prestations, les interventions et le suivi."],
  ["Une attention portée au logement", "Votre intérieur est préparé et vérifié selon les modalités convenues."],
  ["Une organisation adaptée", "Un fonctionnement calé sur votre disponibilité et votre façon de louer."],
];
const steps = [
  ["Premier échange", "Compréhension du logement et de vos besoins."],
  ["Étude personnalisée", "Définition des prestations adaptées."],
  ["Mise en place", "Préparation de l'accompagnement."],
  ["Suivi", "Coordination et échanges réguliers avec vous."],
];
const pains = [
  ["Le manque de temps pour suivre les séjours", "Arrivées, départs et imprévus demandent une disponibilité quotidienne."],
  ["La coordination des interventions", "Ménage, linge et petites réparations impliquent plusieurs intervenants."],
  ["Les échanges réguliers avec les voyageurs", "Les questions arrivent avant, pendant et après chaque séjour."],
  ["La préparation entre deux réservations", "Le logement doit être prêt dans des délais souvent courts."],
  ["Le besoin d'un interlocuteur de confiance", "Une personne fiable et joignable, qui connaît votre logement."],
];
// [nom, x, y, base]
const towns = [
  ["Champigny-sur-Marne", 62, 58, true], ["Saint-Maur-des-Fossés", 44, 68], ["Nogent-sur-Marne", 42, 36],
  ["Le Perreux-sur-Marne", 55, 27], ["Joinville-le-Pont", 31, 52], ["Villiers-sur-Marne", 82, 50], ["Bry-sur-Marne", 69, 37],
];

/* ───── Rendu ───── */
const photo = (key, ratio = "43") => `<div class="photo photo--${ratio}" data-photo="${key}" data-pano></div>`;
$$("[data-values]").forEach((el) => (el.innerHTML = values.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("")));
$("[data-rows]").innerHTML = services.map(([id, t, s]) => `<li class="row"><h3>${t}</h3><div><p>${s}</p><a class="link link--on row__more" href="#services" data-goto="${id}">Voir la prestation</a></div>${photo(id)}</li>`).join("");
$("[data-reasons]").innerHTML = reasons.map(([t, d]) => `<li><strong>${t}</strong><span>${d}</span></li>`).join("");
$("[data-steps]").innerHTML = steps.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join("");
$("[data-pains]").innerHTML = pains.map(([t, d]) => `<li><strong>${t}</strong><span>${d}</span></li>`).join("");
$("[data-towns]").innerHTML = towns.map(([n, , , home]) => `<li><a href="#zone">${n}${home ? "<small>notre base</small>" : ""}</a></li>`).join("");
$("[data-townlist]").innerHTML = towns.map(([n, , , home]) => `<li><strong>Conciergerie ${n}</strong><span>${home ? "Siège de Maison Kaya, 17 TER rue Jean Allemane." : "Commune desservie depuis Champigny-sur-Marne."}</span></li>`).join("");
$("[data-foottowns]").innerHTML = towns.map(([n]) => `<li><a href="#zone">${n}</a></li>`).join("");
$("#cities").innerHTML = towns.map(([n]) => `<option value="${n}"></option>`).join("");
$("[data-details]").innerHTML = services.map(([id, t, s, items], i) => `
  <section class="section${i % 2 ? " band" : ""}" id="svc-${id}" aria-labelledby="h-${id}">
    <div class="wrap split${i % 2 ? " split--rev" : ""}">
      <div class="split__a">${photo(id)}</div>
      <div class="split__b stack"><h2 id="h-${id}">${t}</h2><p class="muted">${s}</p><ul class="plain">${items.map((x) => `<li>${x}</li>`).join("")}</ul></div>
    </div>
  </section>`).join("");

const map = `<svg class="map" viewBox="0 0 100 80" role="img" aria-label="Plan schématique des 7 communes desservies le long de la Marne. Paris est indiqué comme repère.">
  <path class="river" d="M98 40 C88 44 82 40 74 44 C66 48 70 30 60 33 C50 36 54 46 48 50 C40 55 36 72 46 74 C56 76 58 60 50 58 C40 56 34 62 26 58 C18 54 12 48 4 47"/>
  <g class="ref"><line x1="16" y1="20" x2="27" y2="47"/><text x="5" y="18">Paris (repère)</text></g>
  ${towns.map(([n, x, y, home]) => `<g class="town${home ? " home" : ""}"><rect x="${x - 1.3}" y="${y - 1.3}" width="2.6" height="2.6"/><text x="${x}" y="${y - 3}" text-anchor="middle">${n}</text></g>`).join("")}
</svg>`;
$$("[data-map]").forEach((el) => (el.outerHTML = map));

const cta = `<section class="section band--ink" aria-label="Contact">
  <div class="wrap split">
    <div class="split__a stack">
      <h2>Et si nous prenions soin de votre logement ?</h2>
      <p>Échangeons sur votre projet et découvrons ensemble comment Maison Kaya peut vous accompagner.</p>
      <div class="actions"><a class="btn" href="#contact">Parlons de votre projet</a><a class="btn btn--line" href="${WA}" target="_blank" rel="noopener noreferrer">Échanger sur WhatsApp</a></div>
    </div>
    <div class="split__b">${photo("cta", "45")}</div>
  </div>
</section>`;
$$("[data-cta]").forEach((el) => (el.outerHTML = cta));

$$("[data-photo]").forEach((el) => {
  const p = PHOTOS[el.dataset.photo];
  el.innerHTML = `<img src="${p.src}" alt="${p.alt}" width="${p.w}" height="${p.h}" decoding="async"><span class="pano-label" aria-hidden="true">Vue 360°</span>`;
});

/* ───── Navigation par ancre ───── */
const PAGES = ["accueil", "services", "proprietaires", "approche", "zone", "contact", "mentions", "confidentialite"];
const menu = $("#menu"), burger = $("#burger");
function closeMenu() { menu.hidden = true; burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Ouvrir le menu"); document.documentElement.style.overflow = ""; }
burger.addEventListener("click", () => {
  const open = menu.hidden;
  menu.hidden = !open; burger.setAttribute("aria-expanded", String(open)); burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  document.documentElement.style.overflow = open ? "hidden" : "";
});
let pendingScroll = null;
function route() {
  const h = location.hash.slice(1);
  const page = PAGES.includes(h) ? h : "accueil";
  $$(".page").forEach((p) => (p.hidden = p.dataset.page !== page));
  $$(".nav a").forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + page));
  closeMenu();
  if (pendingScroll) { const id = pendingScroll; pendingScroll = null; requestAnimationFrame(() => document.getElementById("svc-" + id)?.scrollIntoView()); }
  else window.scrollTo(0, 0);
}
addEventListener("hashchange", route);
document.addEventListener("click", (e) => {
  const a = e.target.closest?.("[data-goto]");
  if (!a) return;
  e.preventDefault();
  pendingScroll = a.dataset.goto;
  if (location.hash === "#services") route(); else location.hash = "services";
});
addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) closeMenu(); });

/* ───── Formulaire (aperçu : aucun envoi réel) ───── */
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget, d = Object.fromEntries(new FormData(f));
  const errs = {};
  if ((d.name || "").trim().length < 2) errs.name = "Indiquez votre nom et prénom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((d.email || "").trim())) errs.email = "Indiquez une adresse e-mail valide, par exemple nom@domaine.fr.";
  if (!/^[+0-9 ().-]{10,20}$/.test((d.phone || "").trim())) errs.phone = "Indiquez un numéro de téléphone à 10 chiffres.";
  if (!(d.city || "").trim()) errs.city = "Indiquez la ville du logement.";
  if (!d.type) errs.type = "Choisissez le type de logement.";
  if ((d.message || "").trim().length < 10) errs.message = "Décrivez votre logement en quelques mots (10 caractères minimum).";
  if (!d.consent) errs.consent = "Cochez la case pour que nous puissions traiter votre demande.";
  $$(".err", f).forEach((x) => x.remove());
  $$("[aria-invalid]", f).forEach((x) => x.removeAttribute("aria-invalid"));
  Object.entries(errs).forEach(([k, m]) => {
    const input = f.elements[k]; input.setAttribute("aria-invalid", "true");
    const p = document.createElement("p"); p.className = "err"; p.textContent = m; input.closest(".field").appendChild(p);
  });
  const first = Object.keys(errs)[0];
  if (first) { f.elements[first].focus(); $("#formMsg").innerHTML = ""; return; }
  $("#formMsg").innerHTML = `<div class="note" role="alert"><p><strong>Demande non envoyée : cette page est un aperçu.</strong></p><p>L'envoi fonctionnera sur le site en ligne. En attendant, appelez le 07 63 90 14 69 ou écrivez sur <a class="link link--on" href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p></div>`;
});

/* ───── Vue 360° à la première personne ─────
   Au survol, la photo est projetée à l'intérieur d'une sphère ; la souris oriente le regard.
   Sur écran tactile, on fait glisser le doigt. Un seul contexte WebGL partagé. */
const pano = (() => {
  const noop = { look() {}, leave() {} };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return noop;
  const canvas = document.createElement("canvas");
  canvas.className = "pano"; canvas.setAttribute("aria-hidden", "true");
  let R;
  try { R = new THREE.WebGLRenderer({ canvas, antialias: true }); } catch { return noop; }
  R.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  R.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0xefe8dc);
  const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 100); cam.rotation.order = "YXZ";
  const deg = THREE.MathUtils.degToRad;
  const cache = {};
  let mesh = null, cur = null, span = { h: deg(130), v: deg(90) }, raf = 0, active = false;
  const st = { yaw: 0, pitch: 0, ty: 0, tp: 0 };
  function sphere(key, img) {
    if (cache[key]) return cache[key];
    const tex = new THREE.Texture(img); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = R.capabilities.getMaxAnisotropy(); tex.needsUpdate = true;
    const h = deg(130), v = Math.min(h / (img.naturalWidth / img.naturalHeight), deg(120));
    const geo = new THREE.SphereGeometry(10, 96, 64, (3 * Math.PI) / 2 - h / 2, h, Math.PI / 2 - v / 2, v);
    geo.scale(-1, 1, 1);
    return (cache[key] = { m: new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex })), h, v });
  }
  function limits() {
    const vf = THREE.MathUtils.radToDeg(span.v) * 0.86;
    const hf = 2 * Math.atan(Math.tan(deg(vf) / 2) * cam.aspect);
    return { vf, maxYaw: Math.max(0, (span.h - hf) / 2) * 0.92, maxPitch: Math.max(0, (span.v - deg(vf)) / 2) * 0.8 };
  }
  function frame() {
    st.yaw += (st.ty - st.yaw) * 0.09; st.pitch += (st.tp - st.pitch) * 0.09;
    const L = limits();
    cam.fov = L.vf; cam.updateProjectionMatrix();
    cam.rotation.y = THREE.MathUtils.clamp(st.yaw, -L.maxYaw, L.maxYaw);
    cam.rotation.x = THREE.MathUtils.clamp(st.pitch, -L.maxPitch, L.maxPitch);
    R.render(scene, cam);
    if (active) raf = requestAnimationFrame(frame);
  }
  function enter(el) {
    const img = $("img", el);
    if (!img || !img.complete || !img.naturalWidth) return false;
    if (cur) leave(cur);
    cur = el;
    const s = sphere(el.dataset.photo, img);
    if (mesh) scene.remove(mesh);
    mesh = s.m; span = s; scene.add(mesh);
    el.appendChild(canvas);
    const r = el.getBoundingClientRect();
    R.setSize(r.width, r.height, false); cam.aspect = r.width / Math.max(r.height, 1);
    Object.assign(st, { yaw: 0, pitch: 0, ty: 0, tp: 0 });
    active = true; cancelAnimationFrame(raf); frame();
    el.classList.add("is-pano");
    return true;
  }
  function leave(el) {
    if (el !== cur) return;
    el.classList.remove("is-pano"); active = false; cancelAnimationFrame(raf); cur = null;
    setTimeout(() => { if (!cur && canvas.parentNode) canvas.remove(); }, 400);
  }
  return {
    look(el, x, y) {
      if (el !== cur && !enter(el)) return;
      const L = limits();
      st.ty = (0.5 - x) * 2 * L.maxYaw;
      st.tp = (0.5 - y) * 2 * L.maxPitch;
    },
    leave,
  };
})();
document.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return;
  const el = e.target.closest?.("[data-pano]");
  if (!el) return;
  const r = el.getBoundingClientRect();
  pano.look(el, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
}, { passive: true });
document.addEventListener("pointerout", (e) => {
  const el = e.target.closest?.("[data-pano]");
  if (el && !el.contains(e.relatedTarget)) pano.leave(el);
});
let touch = null;
document.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse") return;
  const el = e.target.closest?.("[data-pano]");
  if (!el) return;
  touch = { el, x: e.clientX, y: e.clientY };
  pano.look(el, 0.5, 0.5);
});
document.addEventListener("pointermove", (e) => {
  if (e.pointerType === "mouse" || !touch) return;
  const r = touch.el.getBoundingClientRect();
  const clamp = (v) => Math.min(1, Math.max(0, v));
  pano.look(touch.el, clamp(0.5 - (e.clientX - touch.x) / r.width), clamp(0.5 - (e.clientY - touch.y) / r.height));
}, { passive: true });
document.addEventListener("pointerup", () => { touch = null; });

route();
