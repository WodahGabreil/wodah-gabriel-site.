import type { ReactNode } from "react";
import { Reveal } from "../Reveal";
import { setNavTarget } from "../navTarget";

/** Section shell: alternating ground / surface bands give the page its rhythm. */
export function HomeSection({ tone = "ground", labelledBy, children }: { tone?: "ground" | "surface"; labelledBy: string; children: ReactNode }) {
  return (
    <section aria-labelledby={labelledBy} className={`relative ${tone === "surface" ? "border-y border-line bg-surface" : "bg-ground"} py-20 sm:py-28`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Eyebrow + headline (+ optional intro) used at the top of every block. */
export function SectionHead({ id, eyebrow, title, copy }: { id: string; eyebrow: string; title: string; copy?: string }) {
  return (
    <Reveal className="grid gap-5 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <p className="eyebrow mb-4 text-accent-text">{eyebrow}</p>
        <h2 id={id} className="text-[2.2rem] font-bold leading-[1.04] tracking-[-0.04em] text-ink sm:text-5xl">
          {title}
        </h2>
      </div>
      {copy && <p className="self-end text-[1.05rem] font-medium leading-relaxed text-muted lg:col-span-5">{copy}</p>}
    </Reveal>
  );
}

/**
 * Link to another page, optionally landing on a spot there (a service card, the framework)
 * or opening a case study. Plain anchor underneath, so it works with keyboard and without JS.
 */
export function PageLink({
  to,
  scrollTo,
  openCase,
  className,
  children,
  ariaLabel,
}: {
  to: "home" | "services" | "case-studies" | "about" | "contact";
  scrollTo?: string;
  openCase?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a href={`#${to}`} className={className} aria-label={ariaLabel} onClick={() => setNavTarget({ scrollTo, openCase })}>
      {children}
    </a>
  );
}
