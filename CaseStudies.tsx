import { useMemo, useState } from "react";
import { caseStudies, caseStudiesIntro } from "../content/caseStudies";
import { services } from "../content/services";
import { testimonials } from "../content/testimonials";
import type { PlatformId } from "../content/types";
import { CaseStudyCard } from "./CaseStudyCard";
import { PlatformIcon, platformColor } from "./Icons";
import { Reveal } from "./Reveal";

export function CaseStudies() {
  const [filter, setFilter] = useState<PlatformId | "all">("all");
  const platforms = useMemo(() => Array.from(new Set(caseStudies.map((c) => c.platform))), []);
  // Filter chips only appear once the portfolio grows beyond a handful of projects
  const showFilter = caseStudies.length > 3 && platforms.length > 1;
  const visible = caseStudies.filter((c) => filter === "all" || c.platform === filter);

  return (
    <section id="case-studies" className="relative bg-midnight py-20 text-ivory sm:py-28">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-lime">03 · Case studies</p>
            <h2 className="text-[2.2rem] font-semibold leading-[1.05] sm:text-5xl">{caseStudiesIntro.headline}</h2>
          </div>
          <div className="space-y-4 self-end text-mist lg:col-span-5">
            {caseStudiesIntro.copy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        {showFilter && (
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter case studies by platform">
            {(["all", ...platforms] as const).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={filter === p}
                onClick={() => setFilter(p)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
                  filter === p ? "border-lime bg-lime text-midnight" : "border-white/20 text-ivory hover:border-lime"
                }`}
              >
                {p !== "all" && (
                  <span style={{ color: filter === p ? undefined : platformColor[p], ["--icon-cut" as string]: filter === p ? "#c7f36b" : "#111c2b" }}>
                    <PlatformIcon id={p} size={14} />
                  </span>
                )}
                {p === "all" ? "All" : services.find((s) => s.id === p)?.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-12">
          {visible.map((cs, i) => (
            <Reveal key={cs.id}>
              <CaseStudyCard cs={cs} index={i} />
            </Reveal>
          ))}
        </div>

        {testimonials.length > 0 && (
          <div className="mt-20">
            <p className="eyebrow mb-6 text-lime">Client feedback</p>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <figure key={t.name + t.quote} className="rounded-2xl border border-white/12 bg-navy p-7">
                  <blockquote className="font-display text-xl leading-snug text-ivory">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm text-mist">
                    <span className="font-medium text-ivory">{t.name}</span>
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
