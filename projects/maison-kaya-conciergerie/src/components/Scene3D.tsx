"use client";

import { useEffect, useRef } from "react";

type Props = {
  variant: "key" | "sculpture";
  className?: string;
};

/**
 * Visuel 3D animé (three.js), chargé à la demande et mis en pause hors écran.
 * - "key" : clé en laiton qui flotte et suit la souris
 * - "sculpture" : arche et volumes architecturaux aux tons sable
 */
export default function Scene3D({ variant, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const lib = await import("@/lib/three-objects");
      if (disposed) return;
      let renderer: import("three").WebGLRenderer, env: import("three").Texture;
      try {
        ({ renderer, env } = lib.createRenderer(canvas));
      } catch {
        wrap.classList.add("is-fallback");
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      scene.environment = env;
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, variant === "key" ? 9 : 10.5);
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(-3, 5, 6);
      light.castShadow = false;
      scene.add(light, new THREE.AmbientLight(0xfbfaf5, 0.5));

      const root = new THREE.Group();
      scene.add(root);
      let extra: { ring?: import("three").Object3D; small?: import("three").Object3D; sphere?: import("three").Object3D } = {};
      if (variant === "key") {
        const key = lib.createKey(lib.ivoryMetalMaterial());
        key.rotation.set(0.35, -0.5, 0.45);
        root.add(key);
      } else {
        const s = lib.createSculpture();
        root.add(s.group);
        root.rotation.y = -0.35;
        extra = s;
      }

      const resize = () => {
        const { width, height } = wrap.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.tx = e.clientX / window.innerWidth - 0.5;
        mouse.ty = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let running = false;
      let raf = 0;
      const clock = new THREE.Clock();
      const tick = () => {
        const t = clock.getElapsedTime();
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        const scrollP = Math.min(window.scrollY / 1200, 1);
        if (variant === "key") {
          root.rotation.y = (reduce ? 0 : t * 0.35) + mouse.x * 0.9 + scrollP * 1.5;
          root.rotation.x = mouse.y * 0.5;
          root.position.y = reduce ? 0 : Math.sin(t * 1.1) * 0.15;
        } else {
          root.rotation.y = -0.35 + mouse.x * 0.6 + (reduce ? 0 : Math.sin(t * 0.25) * 0.15);
          root.rotation.x = 0.08 + mouse.y * 0.2;
          if (!reduce) {
            if (extra.small) extra.small.position.y = 0.25 + Math.sin(t * 1.2) * 0.12;
            if (extra.ring) extra.ring.rotation.y = t * 0.8;
            if (extra.sphere) extra.sphere.position.y = -1.08 + Math.sin(t * 0.9 + 1) * 0.05;
          }
        }
        renderer.render(scene, camera);
        if (running) raf = requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          tick();
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(wrap);
      wrap.classList.add("is-ready");

      cleanup = () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        lib.disposeScene(scene);
        env.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [variant]);

  return (
    <div ref={wrapRef} className={`scene3d scene3d--${variant} ${className ?? ""}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
