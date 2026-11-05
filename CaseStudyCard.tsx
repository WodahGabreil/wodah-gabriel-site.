import { useState } from "react";
import type { CaseStudy } from "../content/types";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { PlatformIcon, platformColor, Plus } from "./Icons";
import { EvidenceGallery } from "./EvidenceGallery";
import { GrowthChart } from "./GrowthChart";

const fmt = (n: number) => n.toLocaleString("en-US");

function Pending({ children = "Details to be added" }: { children?: string }) {
  return <p className="rounded-xl border border-dashed border-line-strong px-4 py-3 text-sm italic text-muted">{children}</p>;
}

/** Large before/after numbers, to-scale bars and an animated growth curve. */
function Comparison({ cs }: { cs: CaseStudy }) {
  const { before, after, afterSuffix = "", metric } = cs.comparison;
  const known = before != null && after != null;
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const value = useCountUp(before ?? 0, after ?? 0, known && inView, 2400);
  const pct = known ? Math.max((before! / after!) * 100, 4) : 0;

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-ground/60 p-6 sm:p-9">
      <p className="eyebrow text-muted">Performance comparison · {metric}</p>

      <div className="mt-7 grid grid-cols-2 gap-6">
        <div>
          <p className="eyebrow text-muted">Initial</p>
          {known ? (
            <p className="mt-3 font-display text-4xl font-bold tabular-nums tracking-tight text-ink/80 sm:text-6xl">{fmt(before!)}</p>
          ) : (
            <p className="mt-3 rounded-xl border border-dashed border-line-strong px-3 py-3 text-sm italic text-muted">Add initial {metric.toLowerCase()}</p>
          )}
        </div>
        <div>
          <p className="eyebrow text-accent-text">Final</p>
          {known ? (
            <p className="mt-3 font-display text-4xl font-bold tabular-nums tracking-tight text-accent-grad sm:text-6xl" aria-label={`${fmt(after!)}${afterSuffix}`}>
              {fmt(value)}
              {value >= after! ? afterSuffix : ""}
            </p>
          ) : (
            <p className="mt-3 rounded-xl border border-dashed border-accent/50 px-3 py-3 text-sm italic text-muted">Add final {metric.toLowerCase()}</p>
          )}
        </div>
      </div>

      {/* to-scale bars */}
      <div className="mt-8 space-y-3" aria-hidden="true">
        <div className="h-3 overflow-hidden rounded-full bg-white/8">
          <div className="h-full rounded-full bg-muted/70" style={{ width: known && inView ? `${pct}%` : "0%", transition: "width 1.4s cubic-bezier(.2,.7,.2,1)" }} />
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/8">
          <div className="h-full rounded-full bg-accent" style={{ width: known && inView ? "100%" : "0%", transition: "width 1.8s cubic-bezier(.2,.7,.2,1) .2s" }} />
        </div>
      </div>
      {known && <p className="mt-3 text-[0.72rem] text-muted">Bars drawn to scale from the confirmed figures.</p>}

      {known && (
        <div className="mt-7 border-t border-line pt-6">
          <GrowthChart from={before!} to={after!} suffix={afterSuffix} active={inView} id={`cs-${cs.id}`} />
          <p className="mt-1 text-[0.72rem] text-muted">Illustrative curve. Start and end figures are confirmed.</p>
        </div>
      )}

      {cs.extraMetrics && cs.extraMetrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
          {cs.extraMetrics.map((m) => (
            <div key={m.label}>
              <dt className="text-xs uppercase tracking-widest text-muted">{m.label}</dt>
              <dd className="mt-1 font-display text-lg text-ink">{m.value ?? <span className="text-sm italic text-muted">Add details</span>}</dd>
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
    <div className="border-b border-line">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold tracking-tight text-ink"
        >
          {title}
          <span
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent-text transition-transform duration-300 ${open ? "rotate-45 border-accent bg-accent/10" : ""}`}
          >
            <Plus size={16} />
          </span>
        </button>
      </h4>
      <div id={id} role="region" aria-label={title} className="expand" data-open={open}>
        <div>
          <div className="pb-6 text-[0.97rem] leading-relaxed text-muted">{children}</div>
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
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {i}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyCard({ cs, index }: { cs: CaseStudy; index: number }) {
  return (
    <article className="card p-5 sm:p-9 lg:p-12" aria-labelledby={`cs-${cs.id}`} style={{ ["--icon-cut" as string]: "#0b1220" }}>
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-muted">Case study {String(index + 1).padStart(2, "0")}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ground px-3 py-1.5 text-xs font-medium text-ink">
              <span style={{ color: platformColor[cs.platform] }}>
                <PlatformIcon id={cs.platform} size={14} />
              </span>
              {cs.category}
            </span>
            {cs.status === "draft" && (
              <span className="rounded-full border border-accent/60 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-text">Awaiting project data</span>
            )}
          </div>
          <h3 id={`cs-${cs.id}`} className="mt-5 text-[2.2rem] font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl">
            {cs.title}
          </h3>
          <p className="mt-4 text-[1.05rem] text-muted">{cs.summary}</p>
        </div>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Comparison cs={cs} />

        <div className="rounded-2xl border border-line bg-ground/40 p-6 sm:p-8">
          <p className="eyebrow text-muted">Channel information</p>
          <dl className="mt-4 divide-y divide-line">
            {cs.channelInfo.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="text-right text-sm font-medium text-ink">{f.value ?? <span className="italic text-muted">Add details</span>}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-12">
        <p className="eyebrow mb-1 text-muted">Project details</p>
        <div className="border-t border-line">
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
            {cs.resultsSummary ? <p className="text-ink">{cs.resultsSummary}</p> : <Pending />}
          </Accordion>
        </div>
      </div>

      <div className="mt-12">
        <EvidenceGallery images={cs.evidence} />
      </div>
    </article>
  );
}
