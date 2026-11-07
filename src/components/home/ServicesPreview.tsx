import { servicesPreview } from "../../content/home";
import { services } from "../../content/services";
import { ArrowRight, PlatformIcon, platformColor } from "../Icons";
import { Reveal } from "../Reveal";
import { HomeSection, PageLink, SectionHead } from "./HomeSection";

/** 4. Four compact service cards: one sentence each, linking to the full Services page. */
export function ServicesPreview() {
  return (
    <HomeSection tone="surface" labelledBy="home-services">
      <SectionHead id="home-services" eyebrow={servicesPreview.eyebrow} title={servicesPreview.headline} copy={servicesPreview.copy} />
      <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {servicesPreview.items.map((it, i) => {
          const s = services.find((x) => x.id === it.id);
          if (!s) return null;
          return (
            <Reveal key={it.id} delay={i * 60} className="h-full">
              <PageLink
                to="services"
                scrollTo={`service-${it.id}`}
                ariaLabel={`${s.name}: read more`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-ground p-6 no-underline transition-colors hover:border-accent/60"
              >
                <div className="flex items-center gap-3" style={{ ["--icon-cut" as string]: "#0b1220" }}>
                  <span style={{ color: platformColor[it.id] }}>
                    <PlatformIcon id={it.id} size={22} />
                  </span>
                  <p className="eyebrow text-muted">Service {s.number}</p>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{s.name}</h3>
                <p className="mt-2 flex-1 text-[0.93rem] font-medium leading-relaxed text-muted">{it.line}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
                  Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </PageLink>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-10">
        <PageLink to="services" className="btn btn-outline">
          {servicesPreview.cta} <ArrowRight size={18} />
        </PageLink>
      </Reveal>
    </HomeSection>
  );
}
