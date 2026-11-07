import { useState } from "react";
import { faq } from "../../content/home";
import { Plus } from "../Icons";
import { Reveal } from "../Reveal";
import { HomeSection, SectionHead } from "./HomeSection";

function Item({ q, a, id, defaultOpen }: { q: string; a: string; id: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
        >
          {q}
          <span
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent-text transition-transform duration-300 ${open ? "rotate-45 border-accent bg-accent/10" : ""}`}
            aria-hidden="true"
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className="expand" data-open={open}>
        <div>
          <p className="max-w-3xl pb-6 text-[1rem] font-medium leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

/** 8. FAQ: an accessible accordion (buttons with aria-expanded, panels linked by id). */
export function Faq() {
  return (
    <HomeSection tone="surface" labelledBy="home-faq">
      <SectionHead id="home-faq" eyebrow={faq.eyebrow} title={faq.headline} />
      <Reveal className="mt-10 sm:mt-14">
        <div className="max-w-4xl border-t border-line">
          {faq.items.map((it, i) => (
            <Item key={it.q} id={`faq-${i}`} q={it.q} a={it.a} />
          ))}
        </div>
      </Reveal>
    </HomeSection>
  );
}
