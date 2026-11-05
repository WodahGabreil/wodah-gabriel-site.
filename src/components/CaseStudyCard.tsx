import { useState } from "react";
import type { CaseStudy } from "../content/types";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { PlatformIcon, platformColor, Plus } from "./Icons";
import { EvidenceGallery } from "./EvidenceGallery";

const fmt = (n: number) => n.toLocaleString("en-US");

function Pending({ children = "Details to be added" }: { children?: string }) {
  return (
    <p className="rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm italic text-mist">
      {children}
    </p>
  );
}

function Comparison({ cs }: { cs: CaseStudy }) {
  const { before, after, afterSuffix = "", metric } = cs.comparison;
  const known = before != null && after != null;
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const value = useCountUp(before ?? 0, after ?? 0, known && inView, 2200);
  const pct = known ? Math.max((before! / after!) * 100, 4) : 0;

  return (
    <div ref={ref} className="rounded-2xl border border-white/12 bg-midnight/70 p-6 sm:p-8">
      <p className="eyebrow text-mist">Performance comparison · {metric}</p>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mist">Initial</p>
          {known ? (
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-ivory/85 sm:text-4xl">{fmt(before!)}</p>
          ) : (
            <p className="mt-2 rounded-lg border border-dashed border-white/20 px-3 py-3 text-sm italic text-mist">Add initial {metric.toLowerCase()}</p>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-lime">Final</p>
          {known ? (
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-lime sm:text-4xl" aria-label={`${fmt(after!)}${afterSuffix}`}>
              {fmt(value)}
              {value >= after! ? afterSuffix : ""}
            </p>
          ) : (
            <p className="mt-2 rounded-lg border border-dashed border-lime/40 px-3 py-3 text-sm italic text-mist">Add final {metric.toLowerCase()}</p>
          )}
        </div>
      </div>

      {/* to-scale bars */}
      <div className="mt-8 space-y-3" aria-hidden="true">
        <div className="h-3 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-mist/70"
            style={{ width: known && inView ? `${pct}%` : "0%", transition: "width 1.4s cubic-bezier(.2,.7,.2,1)" }}
          />
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-lime"
            style={{ width: known && inView ? "100%" : "0%", transition: "width 1.8s cubic-bezier(.2,.7,.2,1) .2s" }}
          />
        </div>
      </div>
      {known && <p className="mt-3 text-[0.7rem] text-mist/80">Bars drawn to scale from the confirmed figures.</p>}

      {cs.extraMetrics && cs.extraMetrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line-dark pt-5">
          {cs.extraMetrics.map((m) => (
            <div key={m.label}>
              <dt className="text-xs uppercase tracking-widest text-mist">{m.label}</dt>
              <dd className="mt-1 font-display text-lg text-ivory">{m.value ?? <span className="text-sm italic text-mist">Add details</span>}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `acc-${title.replace(/\s+/g, "-").toLowerCase()}-${Math.abs(title.length * 7919) % 997}`;
  return (
    <div className="border-b border-line-dark">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-lg font-medium text-ivory"
        >
          {title}
          <span
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-lime transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            <Plus size={16} />
          </span>
        </button>
      </h4>
      <div id={id} role="region" aria-label={title} className="expand" data-open={open}>
        <div>
          <div className="pb-5 text-[0.97rem] leading-relaxed text-mist">{children}</div>
        </div>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return <Pending />;
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
          {i}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const c = platformColor[cs.platform];
  return (
    <article className="rounded-[1.75rem] border border-white/12 bg-navy p-5 sm:p-9 lg:p-12" aria-labelledby={`cs-${cs.id}`}>
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-mist">Case study {String(index + 1).padStart(2, "0")}</span>
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-midnight px-3 py-1.5 text-xs font-medium text-ivory"
              style={{ ["--icon-cut" as string]: "#111c2b" }}
            >
              <span style={{ color: c }}>
                <PlatformIcon id={cs.platform} size={14} />
              </span>
              {cs.category}
            </span>
            {cs.status === "draft" && (
              <span className="rounded-full border border-lime/50 px-3 py-1.5 text-xs font-medium text-lime">
                Awaiting project data
              </span>
            )}
          </div>
          <h3 id={`cs-${cs.id}`} className="mt-4 text-3xl font-semibold text-ivory sm:text-4xl">
            {cs.title}
          </h3>
          <p className="mt-3 text-mist">{cs.summary}</p>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <Comparison cs={cs} />

        <div className="rounded-2xl border border-white/12 bg-midnight/40 p-6 sm:p-8">
          <p className="eyebrow text-mist">Channel information</p>
          <dl className="mt-4 divide-y divide-line-dark">
            {cs.channelInfo.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-sm text-mist">{f.label}</dt>
                <dd className="text-right text-sm font-medium text-ivory">
                  {f.value ?? <span className="italic text-mist">Add details</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-1 text-mist">Project details</p>
        <div className="border-t border-line-dark">
          <Accordion title="Project overview" defaultOpen={index === 0}>
            {cs.overview ? <p>{cs.overview}</p> : <Pending />}
          </Accordion>
          <Accordion title="Marketing objectives">
            <BulletList items={cs.objectives} />
          </Accordion>
          <Accordion title="Work performed">
            <BulletList items={cs.workPerformed} />
          </Accordion>
          <Accordion title="Marketing approach">
            <BulletList items={cs.approach} />
          </Accordion>
          <Accordion title="Results summary" defaultOpen={index === 0}>
            {cs.resultsSummary ? <p className="text-ivory">{cs.resultsSummary}</p> : <Pending />}
          </Accordion>
        </div>
      </div>

      <div className="mt-12">
        <EvidenceGallery images={cs.evidence} />
      </div>
    </article>
  );
}
