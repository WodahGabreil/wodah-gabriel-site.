import { services, servicesIntro } from "../content/services";
import type { PlatformId, Service } from "../content/types";
import { ArrowRight, Check, PlatformIcon, platformColor } from "./Icons";
import { Reveal } from "./Reveal";

/** Lets any CTA pre-select a platform in the contact form. */
export const INQUIRY_EVENT = "wg:inquire";
export const startInquiry = (platform?: PlatformId) =>
  window.dispatchEvent(new CustomEvent(INQUIRY_EVENT, { detail: { platform } }));

/** Platform-specific abstract motif drawn behind each service icon. */
function Motif({ id }: { id: PlatformId }) {
  const c = platformColor[id];
  switch (id) {
    case "youtube":
      // timeline / video scrubber
      return (
        <g stroke={c} strokeWidth="2" strokeLinecap="round" opacity=".5">
          <line x1="20" y1="118" x2="300" y2="118" opacity=".35" />
          <line x1="20" y1="118" x2="190" y2="118" strokeWidth="4" />
          <circle cx="190" cy="118" r="6" fill={c} stroke="none" />
          <rect x="196" y="22" width="92" height="52" rx="8" fill="none" opacity=".45" />
          <path d="M236 38v20l17-10z" fill={c} stroke="none" />
        </g>
      );
    case "tiktok":
      // waveform bars
      return (
        <g fill={c} opacity=".5">
          {[22, 46, 30, 70, 54, 88, 40, 64, 28, 50, 76, 36, 58, 24].map((h, i) => (
            <rect key={i} x={20 + i * 20} y={120 - h} width="8" height={h} rx="4" />
          ))}
        </g>
      );
    case "twitch":
      // chat bubbles
      return (
        <g fill="none" stroke={c} strokeWidth="2" opacity=".5">
          <rect x="150" y="18" width="140" height="30" rx="10" />
          <rect x="120" y="58" width="170" height="30" rx="10" />
          <rect x="176" y="98" width="114" height="26" rx="10" />
          <circle cx="166" cy="33" r="5" fill={c} />
          <circle cx="136" cy="73" r="5" fill={c} />
          <circle cx="192" cy="111" r="5" fill={c} />
        </g>
      );
    case "kick":
      // pixel blocks
      return (
        <g fill={c} opacity=".5">
          {[
            [200, 20], [230, 20], [260, 50], [230, 50], [260, 80], [200, 80], [230, 110], [260, 110], [170, 110], [140, 80],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="24" height="24" rx="3" opacity={0.35 + (i % 4) * 0.2} />
          ))}
        </g>
      );
  }
}

function ServicePlate({ id }: { id: PlatformId }) {
  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-midnight"
      style={{ ["--icon-cut" as string]: "#111c2b" }}
    >
      <svg viewBox="0 0 320 144" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Motif id={id} />
      </svg>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 18% 78%, color-mix(in srgb, ${platformColor[id]} 22%, transparent), transparent 55%)` }}
        aria-hidden="true"
      />
      <div className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-navy" style={{ color: platformColor[id] }}>
        <PlatformIcon id={id} size={30} />
      </div>
    </div>
  );
}

function ServiceRow({ s }: { s: Service }) {
  return (
    <article className="grid gap-8 border-t border-line-light py-14 first:border-t-0 lg:grid-cols-12 lg:gap-14 lg:py-20">
      <div className="lg:col-span-5">
        <Reveal>
          <ServicePlate id={s.id} />
          <p className="eyebrow mt-7 text-slate">Service {s.number}</p>
          <h3 className="mt-3 text-[1.75rem] font-semibold leading-[1.1] sm:text-[2rem]">{s.name}</h3>
          <p className="mt-4 max-w-md text-ink-soft">{s.description}</p>
          <a
            href="#contact"
            onClick={() => startInquiry(s.id)}
            className="btn btn-navy mt-7"
            aria-label={`Discuss a ${s.label} project`}
          >
            Discuss a {s.label} Project <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <Reveal delay={120}>
          <p className="eyebrow mb-5 text-slate">Core capabilities</p>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {s.capabilities.map((c) => (
              <li key={c} className="flex gap-3 border-b border-line-light py-3.5 text-[0.97rem] leading-snug">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-midnight text-lime">
                  <Check size={12} strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="on-light bg-ivory py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-slate">02 · Services</p>
            <h2 className="text-[2.2rem] font-semibold leading-[1.05] sm:text-5xl">{servicesIntro.headline}</h2>
          </div>
          <p className="self-end text-ink-soft lg:col-span-5">{servicesIntro.copy}</p>
        </Reveal>

        <div className="mt-14 sm:mt-20">
          {services.map((s) => (
            <ServiceRow key={s.id} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
