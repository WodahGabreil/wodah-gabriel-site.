import { caseStudies } from "../../content/caseStudies";
import { featuredResult } from "../../content/home";
import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import { ArrowRight, PlatformIcon, platformColor } from "../Icons";
import { GrowthChart } from "../GrowthChart";
import { Reveal } from "../Reveal";
import { HomeSection, PageLink } from "./HomeSection";

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * 3. Featured result. Pulls the confirmed before/after figures from the case study,
 * so it shows nothing unless real numbers exist. Count-up and chart use only those two figures.
 */
export function FeaturedResult() {
  const cs = caseStudies.find((c) => c.comparison.before != null && c.comparison.after != null);
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const before = cs?.comparison.before ?? 0;
  const after = cs?.comparison.after ?? 0;
  const value = useCountUp(before, after, !!cs && inView, 2400);
  if (!cs) return null;
  const suffix = cs.comparison.afterSuffix ?? "";
  const pct = Math.max((before / after) * 100, 4);

  return (
    <HomeSection labelledBy="home-featured">
      <Reveal>
        <div ref={ref} className="card relative overflow-hidden p-7 sm:p-12 lg:p-14" style={{ ["--icon-cut" as string]: "#121c30" }}>
          <div className="absolute inset-0 bg-[radial-gradient(44rem_26rem_at_88%_0%,rgb(61_107_255/0.28),transparent_65%)]" aria-hidden="true" />
          <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow flex items-center gap-2.5 text-accent-text">
                <span style={{ color: platformColor[cs.platform] }}>
                  <PlatformIcon id={cs.platform} size={16} />
                </span>
                {featuredResult.eyebrow}
              </p>
              <h2 id="home-featured" className="mt-4 text-[2.2rem] font-bold leading-[1.04] tracking-[-0.04em] text-ink sm:text-5xl">
                {featuredResult.headline}
              </h2>

              <div className="mt-9 grid grid-cols-2 gap-6">
                <div>
                  <p className="eyebrow text-muted">Initial {cs.comparison.metric.toLowerCase()}</p>
                  <p className="mt-2 font-display text-[2.6rem] font-bold tabular-nums tracking-tight text-ink/80 sm:text-6xl">{fmt(before)}</p>
                </div>
                <div>
                  <p className="eyebrow text-accent-text">Final {cs.comparison.metric.toLowerCase()}</p>
                  <p className="mt-2 font-display text-[2.6rem] font-bold tabular-nums tracking-tight text-accent-grad sm:text-6xl" aria-label={`${fmt(after)}${suffix}`}>
                    {fmt(value)}
                    {value >= after ? suffix : ""}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2" aria-hidden="true">
                <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-muted/70" style={{ width: inView ? `${pct}%` : "0%", transition: "width 1.4s cubic-bezier(.2,.7,.2,1)" }} />
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-accent" style={{ width: inView ? "100%" : "0%", transition: "width 1.8s cubic-bezier(.2,.7,.2,1) .2s" }} />
                </div>
              </div>
              <p className="mt-3 text-xs text-muted">Bars drawn to scale from the confirmed figures.</p>

              <p className="mt-7 max-w-md text-[1.02rem] font-medium leading-relaxed text-muted">{cs.summary}</p>
              <PageLink to="case-studies" openCase={cs.id} className="btn btn-primary mt-8">
                {featuredResult.cta} <ArrowRight size={18} />
              </PageLink>
            </div>

            <div className="rounded-2xl border border-line bg-ground/60 p-5 sm:p-7">
              <GrowthChart from={before} to={after} suffix={suffix} active={inView} id="home-feat" />
              <p className="mt-1 text-xs text-muted">Illustrative curve. Start and end figures are confirmed.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </HomeSection>
  );
}
