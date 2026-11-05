"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Contenu superposé (légende, titre) qui flotte en profondeur au survol */
  children?: ReactNode;
  /** Intensité de l'inclinaison en degrés */
  tilt?: number;
  /** Mention d'illustration (les photos ne représentent pas des logements gérés) */
  illustration?: boolean;
};

/**
 * Image immersive : au survol, la carte s'incline en 3D, la photo glisse en
 * parallaxe (effet de fenêtre), un reflet de lumière suit le curseur et la
 * légende flotte au premier plan.
 */
export default function ImmersiveImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  className,
  children,
  tilt = 9,
  illustration = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(0.5 - y) * tilt}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * tilt}deg`);
      el.style.setProperty("--px", `${(0.5 - x) * 28}px`);
      el.style.setProperty("--py", `${(0.5 - y) * 28}px`);
      el.style.setProperty("--gx", `${x * 100}%`);
      el.style.setProperty("--gy", `${y * 100}%`);
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    ["--rx", "--ry", "--px", "--py"].forEach((p) => el.style.setProperty(p, p.startsWith("--r") ? "0deg" : "0px"));
  };

  return (
    <div className={`immersive ${className ?? ""}`}>
      <div ref={ref} className="immersive__card" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="immersive__media">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="immersive__img" />
        </div>
        <div className="immersive__glare" aria-hidden="true" />
        <div className="immersive__frame" aria-hidden="true" />
        {children ? <div className="immersive__content">{children}</div> : null}
        {illustration ? <span className="immersive__tag">Photo d&apos;illustration</span> : null}
      </div>
    </div>
  );
}
