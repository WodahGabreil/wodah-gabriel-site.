import { useEffect, useState } from "react";
import { Logo, Menu, Close, ArrowRight } from "./Icons";
import { useActiveSection } from "../hooks/useActiveSection";
import { site } from "../content/site";

export const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "case-studies", label: "Case Studies" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const ids = sections.map((s) => s.id);

export function Nav() {
  const active = useActiveSection(ids as unknown as string[]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line-dark bg-midnight/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-lime focus:px-3 focus:py-2 focus:text-midnight"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-x flex h-[4.25rem] items-center justify-between">
        <a href="#home" className="flex items-center gap-3 text-ivory no-underline" aria-label={`${site.name}, home`}>
          <Logo />
          <span className="font-display text-[1.05rem] font-semibold tracking-tight">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.92rem] font-medium no-underline transition-colors ${
                  active === s.id ? "text-lime" : "text-ivory/75 hover:text-ivory"
                }`}
              >
                {s.label}
                {active === s.id && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-lime" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-lime hidden !min-h-11 !px-5 sm:inline-flex">
            Discuss a Project
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory lg:hidden"
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
        <div id="mobile-menu" className="border-t border-line-dark bg-midnight lg:hidden">
          <ul className="container-x flex flex-col py-4">
            {sections.map((s, i) => (
              <li key={s.id} className="border-b border-line-dark last:border-0">
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-4 font-display text-2xl no-underline ${
                    active === s.id ? "text-lime" : "text-ivory"
                  }`}
                >
                  <span>
                    <span className="mr-3 text-sm text-mist">0{i + 1}</span>
                    {s.label}
                  </span>
                  <ArrowRight size={18} />
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-lime w-full">
                Discuss a Project
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
