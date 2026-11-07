import { processPreview } from "../../content/home";
import { process, processIntro } from "../../content/process";
import { ArrowRight } from "../Icons";
import { Reveal } from "../Reveal";
import { HomeSection, PageLink, SectionHead } from "./HomeSection";

/** 5. Five-step process strip (horizontal on desktop, stacked on phones). Steps come from process.ts. */
export function ProcessPreview() {
  return (
    <HomeSection labelledBy="home-process">
      <SectionHead id="home-process" eyebrow={processPreview.eyebrow} title={processIntro.headline} />
      <ol className="relative mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {/* connecting line on desktop */}
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-[1.65rem] hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block" aria-hidden="true" />
        {process.map((step, i) => (
          <li key={step.number} className="relative">
            <Reveal delay={i * 80} className="h-full">
              <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 lg:flex-col lg:items-center lg:gap-4 lg:border-0 lg:bg-transparent lg:p-3 lg:text-center">
                <span className="relative z-10 flex h-[3.3rem] w-[3.3rem] shrink-0 items-center justify-center rounded-full border border-accent/60 bg-ground font-display text-lg font-bold text-accent-text shadow-[0_0_24px_-6px_rgb(61_107_255/0.8)]">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold leading-tight text-ink">{step.title}</h3>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal className="mt-10">
        <PageLink to="about" scrollTo="framework" className="btn btn-outline">
          {processPreview.cta} <ArrowRight size={18} />
        </PageLink>
      </Reveal>
    </HomeSection>
  );
}
