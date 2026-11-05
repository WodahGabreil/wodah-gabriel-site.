import { useEffect, useState } from "react";
import { Logo, Menu, Close, ArrowRight } from "./Icons";
import type { PageId } from "../hooks/useRoute";
import { site } from "../content/site";

export const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "case-studies", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav({ page }: { page: PageId }) {
  const active = page;
  const [open, setOpen] = useState(false);

  // Close menu on Escape and lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ground/70 backdrop-blur-xl supports-[backdrop-filter]:bg-ground/55">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-accent-strong focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-x flex h-[4.25rem] items-center justify-between">
        <a href="#home" className="flex items-center gap-3 text-ink no-underline" aria-label={`${site.name}, home`}>
          <Logo />
          <span className="font-display text-[1.05rem] font-bold tracking-tight">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.92rem] font-medium no-underline transition-all duration-200 ${
                  active === s.id
                    ? "bg-accent/15 text-accent-text shadow-[0_0_24px_-6px_rgb(61_107_255/0.8)]"
                    : "text-muted hover:bg-white/5 hover:text-ink"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary hidden !min-h-11 !px-5 sm:inline-flex">
            Discuss a Project
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-ground lg:hidden">
          <ul className="container-x flex flex-col py-4">
            {sections.map((s, i) => (
              <li key={s.id} className="border-b border-line last:border-0">
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-4 font-display text-2xl font-bold no-underline ${
                    active === s.id ? "text-accent-text" : "text-ink"
                  }`}
                >
                  <span>
                    <span className="mr-3 text-sm font-normal text-muted">0{i + 1}</span>
                    {s.label}
                  </span>
                  <ArrowRight size={18} />
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Discuss a Project
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
