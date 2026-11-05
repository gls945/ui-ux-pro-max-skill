import type { ReactNode } from "react";
import ImmersiveImage from "./ImmersiveImage";

type Props = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  image: { src: string; alt: string };
  children?: ReactNode;
};

/** En-tête éditorial des pages intérieures. */
export default function PageHero({ eyebrow, title, intro, image, children }: Props) {
  return (
    <section className="page-hero">
      <div className="container page-hero__grid">
        <div className="page-hero__text">
          <p className="eyebrow" data-reveal>{eyebrow}</p>
          <h1 className="h1" data-reveal>{title}</h1>
          {intro ? <div className="lead" data-reveal>{intro}</div> : null}
          {children}
        </div>
        <div className="page-hero__media" data-reveal>
          <ImmersiveImage src={image.src} alt={image.alt} priority sizes="(max-width: 900px) 100vw, 46vw" tilt={7} />
        </div>
      </div>
    </section>
  );
}
