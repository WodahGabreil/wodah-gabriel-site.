import { platformBand } from "../../content/home";
import { services } from "../../content/services";
import { ArrowRight, PlatformIcon, platformColor } from "../Icons";
import { Reveal } from "../Reveal";
import { HomeSection, PageLink, SectionHead } from "./HomeSection";

/** 1. Four large platform cards, each linking to its service. */
export function PlatformBand() {
  return (
    <HomeSection labelledBy="home-platforms">
      <SectionHead id="home-platforms" eyebrow={platformBand.eyebrow} title={platformBand.headline} copy={platformBand.copy} />
      <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {platformBand.items.map((p, i) => {
          const label = services.find((s) => s.id === p.id)?.label ?? p.id;
          return (
            <Reveal key={p.id} delay={i * 70} className="h-full">
              <PageLink
                to="services"
                scrollTo={`service-${p.id}`}
                ariaLabel={`Explore ${label} marketing`}
                className="card card-hover group flex h-full flex-col p-7 no-underline"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line-strong bg-ground"
                  style={{ color: platformColor[p.id], ["--icon-cut" as string]: "#0b1220" }}
                >
                  <PlatformIcon id={p.id} size={30} />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-ink">{label}</h3>
                <p className="mt-3 flex-1 text-[0.97rem] font-medium leading-relaxed text-muted">{p.line}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
                  Explore {label} marketing <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </PageLink>
            </Reveal>
          );
        })}
      </div>
    </HomeSection>
  );
}
