import { useEffect, useMemo, useState } from "react";
import { caseStudies, caseStudiesIntro } from "../content/caseStudies";
import { services } from "../content/services";
import { testimonials } from "../content/testimonials";
import type { PlatformId } from "../content/types";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudyTile, FeaturedCaseStudy } from "./CaseStudyTile";
import { ChevronLeft, PlatformIcon, platformColor } from "./Icons";
import { Reveal } from "./Reveal";
import { takeCaseTarget } from "./navTarget";

export function CaseStudies() {
  const [filter, setFilter] = useState<PlatformId | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  // Arrive from a Home link: open that case study straight away
  useEffect(() => {
    const c = takeCaseTarget();
    if (c) setOpenId(c);
  }, []);
  const open = (id: string | null) => {
    setOpenId(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const opened = caseStudies.find((c) => c.id === openId);
  const platforms = useMemo(() => Array.from(new Set(caseStudies.map((c) => c.platform))), []);
  // Filter chips only appear once the portfolio grows beyond a handful of projects
  const showFilter = caseStudies.length > 3 && platforms.length > 1;
  const visible = caseStudies.filter((c) => filter === "all" || c.platform === filter);
  // A case study with confirmed before/after figures and a badge is shown as the featured card
  const featured = visible.find((c) => c.card?.badge && c.comparison.before != null && c.comparison.after != null);
  const rest = visible.filter((c) => c !== featured);

  return (
    <section id="case-studies" className="relative bg-ground py-24 text-ink sm:py-32">
      <div className="glow-top absolute inset-x-0 top-0 h-[28rem]" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-accent-text">03 · Case studies</p>
            <h2 className="text-[2.4rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{caseStudiesIntro.headline}</h2>
          </div>
          <div className="space-y-4 self-end text-[1.05rem] font-medium leading-relaxed text-muted lg:col-span-5">
            {caseStudiesIntro.copy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        {showFilter && !opened && (
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter case studies by platform">
            {(["all", ...platforms] as const).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={filter === p}
                onClick={() => setFilter(p)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
                  filter === p ? "border-accent-strong bg-accent-strong text-white" : "border-line-strong text-ink hover:border-accent hover:bg-accent/10"
                }`}
              >
                {p !== "all" && (
                  <span style={{ color: platformColor[p], ["--icon-cut" as string]: filter === p ? "#3560f2" : "#0b1220" }}>
                    <PlatformIcon id={p} size={14} />
                  </span>
                )}
                {p === "all" ? "All" : services.find((s) => s.id === p)?.label}
              </button>
            ))}
          </div>
        )}

        {opened ? (
          <div className="mt-10 sm:mt-14">
            <button type="button" onClick={() => open(null)} className="btn btn-outline mb-8 !min-h-11 !px-4 text-sm">
              <ChevronLeft size={16} /> All case studies
            </button>
            <CaseStudyCard cs={opened} index={caseStudies.indexOf(opened)} />
          </div>
        ) : (
          <div className="mt-12 space-y-6 sm:mt-16">
            {featured && (
              <Reveal>
                <FeaturedCaseStudy cs={featured} onOpen={() => open(featured.id)} />
              </Reveal>
            )}
            {rest.length > 0 && (
              <div className={`grid gap-6 md:grid-cols-2 ${rest.length > 2 ? "lg:grid-cols-3" : ""}`}>
                {rest.map((cs) => (
                  <Reveal key={cs.id} className="h-full">
                    <CaseStudyTile cs={cs} onOpen={() => open(cs.id)} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}

        {testimonials.length > 0 && !opened && (
          <div className="mt-20">
            <p className="eyebrow mb-6 text-accent-text">Client feedback</p>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <figure key={t.name + t.quote} className="card p-7">
                  <blockquote className="font-display text-xl leading-snug text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm text-muted">
                    <span className="font-medium text-ink">{t.name}</span>
                    {t.role ? ` · ${t.role}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
