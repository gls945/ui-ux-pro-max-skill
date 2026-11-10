import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/** Découpe un titre mot à mot (rendu côté serveur, donc sans écart d'hydratation). */
export function splitNodes(children: ReactNode, counter = { i: 0 }): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((part, k) => {
        if (!part) return null;
        if (!part.trim()) return part;
        const i = counter.i++;
        return (
          <span key={`${k}-${part}`} className="w"><span className="wi" style={{ ["--i" as string]: i }}>{part}</span></span>
        );
      });
    }
    if (isValidElement(child)) {
      const el = child as ReactElement<{ children?: ReactNode }>;
      if (el.type === "br") return child;
      return cloneElement(el, undefined, splitNodes(el.props.children, counter));
    }
    return child;
  });
}

export function Split({ as: Tag = "h2", className = "", children }: { as?: "h1" | "h2" | "h3" | "p"; className?: string; children: ReactNode }) {
  return <Tag className={`${className} split`} data-split>{splitNodes(children)}</Tag>;
}
