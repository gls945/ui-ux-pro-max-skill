import { useRef } from "react";

export function InteriorPhoto({ src, alt, className = "", imageClassName = "" }: { src: string; alt: string; className?: string; imageClassName?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  return (
    <div ref={frame} className={`interior-photo ${className}`} onPointerMove={(event) => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--tilt-x", `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 7}deg`);
      event.currentTarget.style.setProperty("--tilt-y", `${(event.clientX - rect.left - rect.width / 2) / rect.width * 7}deg`);
    }} onPointerLeave={() => {
      frame.current?.style.setProperty("--tilt-x", "0deg");
      frame.current?.style.setProperty("--tilt-y", "0deg");
    }}>
      <img src={src} alt={alt} loading="lazy" className={`interior-photo-image ${imageClassName}`} />
    </div>
  );
}