import { ArrowRight, PlatformIcon, platformColor } from "./Icons";
import type { PlatformId } from "../content/types";
import { GrowthVisual } from "./GrowthVisual";
import { site } from "../content/site";
import { caseStudies } from "../content/caseStudies";

const platformName: Record<PlatformId, string> = { youtube: "YouTube", tiktok: "TikTok", twitch: "Twitch", kick: "Kick" };

export function Hero() {
  const featured = caseStudies.find((c) => c.comparison.before != null && c.comparison.after != null);
  const cmp = featured?.comparison;

  return (
    <section id="home" className="relative isolate overflow-hidden bg-midnight pt-28 text-ivory sm:pt-32">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-28">
        <div>
          <p className="eyebrow mb-6 flex items-center gap-3 text-lime">
            <span className="h-px w-8 bg-lime" aria-hidden="true" />
            {site.title}
          </p>
          <h1 className="text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[3.3rem] xl:text-[3.7rem]">
            Building Digital Visibility.{" "}
            <span className="text-mist">Developing Audiences.</span>{" "}
            <span className="text-lime">Supporting Sustainable Growth.</span>
          </h1>

          <div className="mt-8 max-w-xl space-y-4 text-[1.02rem] leading-relaxed text-mist">
            <p>
              Digital growth requires more than simply publishing content. It requires an understanding of
              platform dynamics, audience behaviour, discoverability, and strategic promotion.
            </p>
            <p>
              I'm <strong className="font-semibold text-ivory">{site.name}</strong>, an independent digital marketing
              and audience growth specialist helping creators, streamers, and businesses strengthen their online
              presence across YouTube, TikTok, Twitch, and Kick.
            </p>
            <p>
              Through platform-specific marketing and structured promotional strategies, I help clients identify
              growth opportunities and improve the visibility of their digital platforms.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn btn-lime">
              Discuss Your Project <ArrowRight size={18} />
            </a>
            <a href="#case-studies" className="btn btn-ghost-dark">
              Explore My Case Studies
            </a>
          </div>

          {cmp && featured && (
            <a
              href="#case-studies"
              className="group mt-12 flex max-w-xl items-center gap-5 border-t border-line-dark pt-6 no-underline"
            >
              <div className="shrink-0">
                <p className="eyebrow text-[0.66rem] text-mist">Featured result</p>
                <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-ivory sm:text-[1.7rem]">
                  {cmp.before?.toLocaleString("en-US")} <span className="text-lime">→</span>{" "}
                  {cmp.after?.toLocaleString("en-US")}
                  {cmp.afterSuffix} <span className="text-base font-medium text-mist">Followers</span>
                </p>
              </div>
              <ArrowRight size={20} className="ml-auto shrink-0 text-lime transition-transform group-hover:translate-x-1" />
            </a>
          )}
          {featured && (
            <p className="mt-3 max-w-xl text-sm text-mist">
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

      {/* platform expertise strip */}
      <div className="border-t border-line-dark bg-navy/60">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <p className="eyebrow text-mist">Platform expertise</p>
          <ul className="flex flex-wrap gap-x-9 gap-y-3 font-display text-lg font-medium text-ivory/90">
            {(["youtube", "tiktok", "twitch", "kick"] as PlatformId[]).map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <span style={{ color: platformColor[p], ["--icon-cut" as string]: "#19283a" }}>
                  <PlatformIcon id={p} size={22} />
                </span>
                {platformName[p]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
