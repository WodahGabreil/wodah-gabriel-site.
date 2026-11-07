import { useEffect, useState } from "react";
import { services, servicesIntro } from "../content/services";
import type { Service } from "../content/types";
import { ArrowRight, Check, Expand, PlatformIcon, platformColor } from "./Icons";
import { Lightbox } from "./Lightbox";
import { startInquiry } from "./inquiry";
import { asset } from "./assets";
import { Reveal } from "./Reveal";
import { scrollToId, takeScrollTarget } from "./navTarget";

/**
 * Screenshot frame at the top of a service card; click to see it full size.
 * "contain" shows a whole portrait screenshot on a lit stage, "wide" a whole landscape one,
 * and the default crops from the top. The frame grows to match a taller card beside it.
 */
function ServicePlate({ s }: { s: Service }) {
  const [open, setOpen] = useState(false);
  if (!s.image) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center bg-ground" style={{ color: platformColor[s.id], ["--icon-cut" as string]: "#0b1220" }}>
        <PlatformIcon id={s.id} size={44} />
      </div>
    );
  }
  const alt = s.imageAlt ?? `${s.label} screenshot`;
  const whole = s.imageFit === "contain" || s.imageFit === "wide";
  const ratio = s.imageFit === "contain" ? "125%" : "62.5%"; // 4:5 for a whole portrait, 16:10 otherwise
  return (
    <div className="flex flex-1 flex-col">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${alt}`}
        className="group relative block w-full flex-1 overflow-hidden bg-ground"
        style={whole ? { backgroundImage: "radial-gradient(circle at 50% 38%, rgba(61,107,255,0.30), transparent 62%)" } : undefined}
      >
        <span aria-hidden="true" className="block w-full" style={{ paddingTop: ratio }} />
        <img
          src={asset(s.image)}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={
            whole
              ? "absolute inset-0 h-full w-full rounded-xl object-contain p-5 transition-transform duration-500 group-hover:scale-[1.02]"
              : "absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          }
        />
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-strong text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand size={16} />
        </span>
      </button>
      {s.imageCaption && <p className="px-7 pt-3 text-xs text-muted">{s.imageCaption}</p>}
      {open && <Lightbox images={[{ src: s.image, alt, caption: s.imageCaption ?? alt }]} index={0} onChange={() => {}} onClose={() => setOpen(false)} />}
    </div>
  );
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <article id={`service-${s.id}`} className="card card-hover flex h-full scroll-mt-24 flex-col overflow-hidden">
      <ServicePlate s={s} />
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-ground"
            style={{ color: platformColor[s.id], ["--icon-cut" as string]: "#0b1220" }}
          >
            <PlatformIcon id={s.id} size={22} />
          </span>
          <p className="eyebrow text-muted">Service {s.number}</p>
        </div>
        <h3 className="mt-5 text-[1.7rem] font-bold leading-[1.1] text-ink sm:text-[1.9rem]">{s.name}</h3>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{s.description}</p>

        <p className="eyebrow mb-3 mt-8 text-accent-text">Core capabilities</p>
        <ul className="grid gap-x-6 sm:grid-cols-2">
          {s.capabilities.map((c) => (
            <li key={c} className="flex gap-3 border-b border-line py-3 text-[0.93rem] leading-snug text-ink">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-text">
                <Check size={12} strokeWidth={3} />
              </span>
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <a
            href="#contact"
            onClick={() => startInquiry(s.id)}
            className="btn btn-primary"
            aria-label={`Discuss a ${s.label} project`}
          >
            Discuss a {s.label} Project <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  // Arrive from a Home link: scroll to the matching service card
  useEffect(() => {
    const t = takeScrollTarget();
    if (t) scrollToId(t);
  }, []);
  return (
    <section id="services" className="relative bg-ground py-24 sm:py-32">
      <div className="glow-top absolute inset-x-0 top-0 h-[28rem]" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-accent-text">02 · Services</p>
            <h2 className="text-[2.4rem] font-bold leading-[1.02] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">{servicesIntro.headline}</h2>
          </div>
          <p className="self-end text-[1.05rem] font-medium leading-relaxed text-muted lg:col-span-5">{servicesIntro.copy}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:mt-20 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 90} className="h-full">
              <ServiceCard s={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
