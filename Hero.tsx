import { ArrowRight } from "./Icons";
import { GrowthVisual } from "./GrowthVisual";
import { site } from "../content/site";
import { caseStudies } from "../content/caseStudies";

export function Hero() {
  const featured = caseStudies.find((c) => c.comparison.before != null && c.comparison.after != null);
  const cmp = featured?.comparison;

  return (
    <section className="relative isolate overflow-hidden bg-ground pt-28 sm:pt-36">
      <div className="hero-mesh absolute inset-0 -z-20" aria-hidden="true" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-70" aria-hidden="true" />

      <div className="container-x grid items-center gap-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-32">
        <div>
          <p className="eyebrow mb-7 inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-accent-text backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(61_107_255/0.9)]" aria-hidden="true" />
            {site.title}
          </p>
          <h1 className="text-[2.75rem] font-bold leading-[1.0] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[3.5rem] xl:text-[4.2rem]">
            Building Digital Visibility.{" "}
            <span className="text-muted">Developing Audiences.</span>{" "}
            <span className="text-accent-grad">Supporting Sustainable Growth.</span>
          </h1>

          <div className="mt-9 max-w-xl space-y-5 text-[1.08rem] font-medium leading-[1.75] text-muted">
            <p>
              Digital growth requires more than simply publishing content. It requires an understanding of
              platform dynamics, audience behaviour, discoverability, and strategic promotion.
            </p>
            <p>
              I'm <strong className="font-bold text-ink">{site.name}</strong>, an independent digital marketing
              and audience growth specialist helping creators, streamers, and businesses strengthen their online
              presence across YouTube, TikTok, Twitch, and Kick.
            </p>
            <p>
              Through platform-specific marketing and structured promotional strategies, I help clients identify
              growth opportunities and improve the visibility of their digital platforms.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn btn-primary">
              Discuss Your Project <ArrowRight size={18} />
            </a>
            <a href="#case-studies" className="btn btn-outline">
              Explore My Case Studies
            </a>
          </div>

          {cmp && featured && (
            <a
              href="#case-studies"
              className="card card-hover group mt-12 flex max-w-xl items-center gap-5 px-6 py-5 no-underline"
            >
              <div className="shrink-0">
                <p className="eyebrow text-[0.66rem] text-muted">Featured result</p>
                <p className="mt-1.5 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">
                  {cmp.before?.toLocaleString("en-US")} <span className="text-accent-text">→</span>{" "}
                  {cmp.after?.toLocaleString("en-US")}
                  {cmp.afterSuffix} <span className="text-base font-medium text-muted">Followers</span>
                </p>
              </div>
              <ArrowRight size={20} className="ml-auto shrink-0 text-accent-text transition-transform group-hover:translate-x-1" />
            </a>
          )}
          {featured && (
            <p className="mt-4 max-w-xl text-sm text-muted">
              A documented TikTok audience growth project demonstrating measurable account development.
            </p>
          )}
        </div>

        <div className="flex justify-center lg:justify-end">
          {cmp && cmp.before != null && cmp.after != null ? (
            <GrowthVisual from={cmp.before} to={cmp.after} suffix={cmp.afterSuffix} />
          ) : null}
        </div>
      </div>

    </section>
  );
}
