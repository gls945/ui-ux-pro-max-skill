"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { images } from "@/content/site";

/**
 * L'ENTRÉE — expérience d'accueil immersive.
 * Un palier d'appartement, une porte, un porte-clés mural en 3D (three.js).
 * Chaque clé ouvre la porte puis mène à une partie du site.
 */

const KEYS: { label: string; href: string; main?: boolean }[] = [
  { label: "Entrer", href: "/", main: true },
  { label: "Nos services", href: "/services" },
  { label: "Propriétaires", href: "/proprietaires" },
  { label: "Contact", href: "/contact" },
];

type Phase = "idle" | "unlocking" | "opening" | "entering" | "done";

export default function EntryExperience() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keyholeRef = useRef<HTMLDivElement>(null);
  const rackRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const chooseRef = useRef<(i: number) => void>(() => {});
  const [phase, setPhase] = useState<Phase>("idle");
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [webgl, setWebgl] = useState(true);

  const finish = useCallback(
    (href: string) => {
      try {
        sessionStorage.setItem("mk-entered", "1");
      } catch {}
      document.documentElement.dataset.entered = "1";
      document.documentElement.classList.remove("entry-lock");
      setVisible(false);
      if (href !== "/") router.push(href);
      else window.scrollTo(0, 0);
    },
    [router],
  );

  // Déjà entré pendant cette session → pas de rejouage.
  useEffect(() => {
    let entered = false;
    try {
      entered = sessionStorage.getItem("mk-entered") === "1";
    } catch {}
    if (entered) {
      setVisible(false);
      return;
    }
    document.documentElement.classList.add("entry-lock");
    return () => document.documentElement.classList.remove("entry-lock");
  }, []);

  // Séquence d'ouverture déclenchée par une clé
  const runOpen = useCallback(
    (href: string, keyAnimMs: number) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const k = reduce ? 0 : keyAnimMs;
      setTimeout(() => setPhase("opening"), k);
      setTimeout(() => setPhase("entering"), k + (reduce ? 200 : 1150));
      setTimeout(() => finish(href), k + (reduce ? 600 : 2100));
    },
    [finish],
  );

  // Parallaxe du palier selon la souris
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !visible) return;
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [visible]);

  // Scène three.js : porte-clés
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let raf = 0;
    let cleanup = () => {};

    (async () => {
      let THREE: typeof import("three");
      let lib: typeof import("@/lib/three-objects");
      try {
        THREE = await import("three");
        lib = await import("@/lib/three-objects");
      } catch {
        setWebgl(false);
        return;
      }
      if (disposed) return;
      let renderer: import("three").WebGLRenderer, env: import("three").Texture;
      try {
        ({ renderer, env } = lib.createRenderer(canvas));
      } catch {
        setWebgl(false);
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      scene.environment = env;
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 10);
      const sun = new THREE.DirectionalLight(0xffffff, 1.6);
      sun.position.set(-4, 6, 8);
      scene.add(sun, new THREE.AmbientLight(0xfbfaf5, 0.45));

      const visibleH = 2 * 10 * Math.tan(THREE.MathUtils.degToRad(35 / 2));
      let W = 1,
        H = 1,
        pxPerUnit = 1;

      const keys = KEYS.map((k, i) => {
        const mat = new THREE.MeshStandardMaterial({
          color: k.main ? 0x22221e : i % 2 ? 0x34332f : 0x2c2b28,
          metalness: 0.85,
          roughness: k.main ? 0.24 : 0.34,
        });
        const key = lib.createKey(mat);
        key.rotation.z = -Math.PI / 2; // anneau en haut
        key.position.y = -1.9; // pivot au sommet de l'anneau
        const pivot = new THREE.Group();
        pivot.add(key);
        scene.add(pivot);
        return { pivot, key, mat, phase: i * 1.7, swing: 0, swingV: 0, hover: 0, scale: 1, flying: false };
      });

      const toWorld = (px: number, py: number) => ({
        x: (px / W - 0.5) * (visibleH * (W / H)),
        y: -(py / H - 0.5) * visibleH,
      });

      const layout = () => {
        W = window.innerWidth;
        H = window.innerHeight;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        pxPerUnit = H / visibleH;
        const rack = rackRef.current?.getBoundingClientRect();
        if (!rack) return;
        const keyPx = Math.min(rack.height * 1.9, 150, W * 0.22);
        keys.forEach((k, i) => {
          if (k.flying) return;
          const hx = rack.left + (rack.width * (i + 0.5)) / KEYS.length;
          const hy = rack.top + rack.height * 0.32;
          const w = toWorld(hx, hy);
          k.pivot.position.set(w.x, w.y, 0.3);
          k.scale = keyPx / (3.8 * pxPerUnit);
          k.pivot.scale.setScalar(k.scale);
          const lbl = labelRefs.current[i];
          if (lbl) {
            lbl.style.left = `${hx}px`;
            lbl.style.top = `${hy + keyPx + 14}px`;
          }
        });
      };
      layout();
      window.addEventListener("resize", layout);

      // Interaction
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      let hoverIdx: number | null = null;
      let lastX = 0;
      const pick = (e: PointerEvent) => {
        ndc.set((e.clientX / W) * 2 - 1, -(e.clientY / H) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        for (let i = 0; i < keys.length; i++) {
          if (ray.intersectObject(keys[i].pivot, true).length) return i;
        }
        return null;
      };
      const onMove = (e: PointerEvent) => {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        const i = pick(e);
        if (i !== hoverIdx) {
          hoverIdx = i;
          setHovered(i);
          canvas.style.cursor = i !== null ? "pointer" : "default";
          if (i !== null) keys[i].swingV += 0.04 * Math.sign(dx || 1);
        }
        // la main frôle les clés : légère oscillation
        keys.forEach((k) => {
          if (!k.flying) {
            const p = k.pivot.position.clone().project(camera);
            const sx = ((p.x + 1) / 2) * W;
            if (Math.abs(sx - e.clientX) < 60 && Math.abs(dx) > 2) k.swingV += dx * 0.0006;
          }
        });
      };
      const onClick = (e: PointerEvent) => {
        const i = pick(e);
        if (i !== null) chooseRef.current(i);
        else {
          const d = doorRef.current?.getBoundingClientRect();
          if (d && e.clientX > d.left && e.clientX < d.right && e.clientY > d.top && e.clientY < d.bottom) chooseRef.current(0);
        }
      };
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onClick);

      // Animation d'une clé vers la serrure
      let flight: null | {
        k: (typeof keys)[number];
        t0: number;
        fromPos: import("three").Vector3;
        fromQ: import("three").Quaternion;
        toPos: import("three").Vector3;
        toQ: import("three").Quaternion;
        fromScale: number;
        toScale: number;
      } = null;

      chooseRef.current = (i: number) => {
        if (flight) return;
        const k = keys[i];
        k.flying = true;
        const hole = keyholeRef.current?.getBoundingClientRect();
        const target = hole ? toWorld(hole.left + hole.width / 2, hole.top + hole.height / 2) : { x: 0, y: 0 };
        // Détacher la clé du pivot en conservant sa transformation monde
        scene.attach(k.key);
        k.key.scale.setScalar(k.scale);
        const toQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        flight = {
          k,
          t0: performance.now(),
          fromPos: k.key.position.clone(),
          fromQ: k.key.quaternion.clone(),
          toPos: new THREE.Vector3(target.x, target.y, 0),
          toQ,
          fromScale: k.scale,
          toScale: Math.min(H * 0.055, 48) / (1.3 * pxPerUnit),
        };
        setPhase("unlocking");
        runOpen(KEYS[i].href, reduce ? 0 : 1900);
      };

      const clock = new THREE.Clock();
      const zAxis = new THREE.Vector3(0, 0, -1);
      const tick = () => {
        const t = clock.getElapsedTime();
        keys.forEach((k, i) => {
          if (k.flying) return;
          // pendule amorti + brise légère
          const target = reduce ? 0 : Math.sin(t * 0.8 + k.phase) * 0.035;
          k.swingV += (target - k.swing) * 0.02;
          k.swingV *= 0.96;
          k.swing += k.swingV;
          k.pivot.rotation.z = k.swing;
          k.pivot.rotation.y = Math.sin(t * 0.5 + k.phase) * 0.25;
          const hv = hoverIdx === i ? 1 : 0;
          k.hover += (hv - k.hover) * 0.12;
          k.pivot.scale.setScalar(k.scale * (1 + k.hover * 0.08));
          k.mat.emissive.setRGB(0.07 * k.hover, 0.07 * k.hover, 0.065 * k.hover);
        });
        if (flight) {
          const f = flight;
          const el = (performance.now() - f.t0) / 1000;
          // 0 → 0.9 s : vol vers la serrure (devant la porte)
          const a = lib.easeInOut(Math.min(el / 0.9, 1));
          const front = f.toPos.clone().setZ(1.6);
          f.k.key.position.lerpVectors(f.fromPos, front, a);
          f.k.key.position.y += Math.sin(a * Math.PI) * 0.6;
          f.k.key.quaternion.slerpQuaternions(f.fromQ, f.toQ, a);
          f.k.key.scale.setScalar(THREE.MathUtils.lerp(f.fromScale, f.toScale, a));
          // 0.9 → 1.25 s : insertion
          if (el > 0.9) {
            const b = lib.easeOut(Math.min((el - 0.9) / 0.35, 1));
            f.k.key.position.z = THREE.MathUtils.lerp(1.6, 0.35, b);
          }
          // 1.25 → 1.85 s : tour de clé
          if (el > 1.25) {
            const c = lib.easeInOut(Math.min((el - 1.25) / 0.6, 1));
            const q = new THREE.Quaternion().setFromAxisAngle(zAxis, c * Math.PI / 2);
            f.k.key.quaternion.copy(q.multiply(f.toQ));
          }
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", layout);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onClick);
        lib.disposeScene(scene);
        env.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [visible, runOpen]);

  // Clavier / repli sans WebGL
  const choose = (i: number) => {
    if (phase !== "idle") return;
    if (webgl) chooseRef.current(i);
    else {
      setPhase("unlocking");
      runOpen(KEYS[i].href, 300);
    }
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, finish]);

  if (!visible) return null;

  return (
    <div ref={rootRef} className={`entry entry--${phase}`} role="dialog" aria-modal="true" aria-label="Entrée de Maison Kaya">
      <div className="entry__hall" aria-hidden="true">
        <div className="entry__wall" />
        <div className="entry__wainscot" />
        <div className="entry__floor" />
        <div className="entry__sconce entry__sconce--l" />
        <div className="entry__sconce entry__sconce--r" />
      </div>

      <div className="entry__stage">
        <div className="entry__doorway">
          <div className="entry__inside">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.doorView.src} alt="" />
            <div className="entry__inside-light" />
          </div>
          <div ref={doorRef} className="entry__door">
            <div className="entry__door-face">
              <div className="entry__panel entry__panel--top" />
              <div className="entry__panel entry__panel--bottom" />
              <div className="entry__plaque">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo-badge.png" alt="" />
              </div>
              <div className="entry__handle" />
              <div ref={keyholeRef} className="entry__keyhole" />
            </div>
            <div className="entry__door-edge" />
          </div>
          <div className="entry__frame" />
          <div className="entry__under-light" />
        </div>
        <div className="entry__mat" aria-hidden="true">
          <span>Bienvenue</span>
        </div>
      </div>

      <div className="entry__rack-wrap">
        <div ref={rackRef} className="entry__rack" aria-hidden="true">
          {KEYS.map((k) => (
            <span key={k.label} className="entry__hook" />
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} className="entry__canvas" aria-hidden="true" />

      <nav className="entry__labels" aria-label="Choisissez une clé">
        {KEYS.map((k, i) => (
          <button
            key={k.label}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            type="button"
            className={`entry__label${k.main ? " is-main" : ""}${hovered === i ? " is-hover" : ""}${webgl ? "" : " is-static"}`}
            onClick={() => choose(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {k.label}
          </button>
        ))}
      </nav>

      <header className="entry__intro">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="entry__logo" src="/brand/logo-ink-dark.png" alt="Maison Kaya Conciergerie" width={96} height={96} />
        <p className="entry__brand">Maison Kaya</p>
        <p className="entry__kicker">Conciergerie · Val-de-Marne</p>
        <h2 className="entry__title">Le soin du détail, la sérénité en plus.</h2>
        <p className="entry__hint">
          <span className="entry__hint-dot" /> Choisissez une clé pour ouvrir la porte
        </p>
      </header>

      <button type="button" className="entry__skip" onClick={() => finish("/")}>
        Passer l&apos;entrée <span aria-hidden="true">→</span>
      </button>
      <div className="entry__veil" aria-hidden="true" />
    </div>
  );
}
