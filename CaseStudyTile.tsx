import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { GrowthChart } from "./GrowthChart";
import type { CaseStudy } from "../content/types";
import { ArrowRight, ImageIcon, PlatformIcon, platformColor } from "./Icons";
import { asset } from "./assets";

/** Portfolio grid card: screenshot, platform, big headline figure, title, short line, button. */
export function CaseStudyTile({ cs, onOpen }: { cs: CaseStudy; onOpen: () => void }) {
  const [broken, setBroken] = useState(false);
  const card = cs.card;
  const image = card?.image ?? cs.evidence[0]?.src;
  const alt = cs.evidence.find((e) => e.src === image)?.alt ?? `${cs.title} screenshot`;

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden" aria-labelledby={`tile-${cs.id}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-ground" style={{ ["--icon-cut" as string]: "#0b1220" }}>
        {image && !broken ? (
          <img
            src={asset(image)}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ color: platformColor[cs.platform] }}>
            <PlatformIcon id={cs.platform} size={44} />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" aria-hidden="true" />
        {card?.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-accent-strong px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-white shadow-[0_8px_20px_-8px_rgba(61,107,255,0.9)]">
            {card.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="eyebrow flex items-center gap-2.5 text-muted" style={{ ["--icon-cut" as string]: "#121c30" }}>
          <span style={{ color: platformColor[cs.platform] }}>
            <PlatformIcon id={cs.platform} size={16} />
          </span>
          {cs.category}
        </p>
        {card?.metric ? (
          <p className="mt-5 font-display text-[2.4rem] font-bold leading-none tracking-tight tabular-nums text-accent-grad sm:text-[2.7rem]">
            {card.metric}
            {card.metricNote && <span className="mt-2 block text-sm font-medium tracking-normal text-muted" style={{ WebkitTextFillColor: "initial" }}>{card.metricNote}</span>}
          </p>
        ) : (
          <ImageIcon className="mt-5 text-muted" size={22} />
        )}
        <h3 id={`tile-${cs.id}`} className="mt-7 text-xl font-bold text-ink">
          {cs.title}
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{card?.blurb ?? cs.summary}</p>
        <button type="button" onClick={onOpen} className="btn btn-outline mt-7 self-start !min-h-10 !px-4 text-[0.78rem] uppercase tracking-wider">
          View case study <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

/**
 * Full-width featured card for a case study with confirmed before/after figures:
 * large numbers that count up, plus an animated growth curve. Only the two figures are data.
 */
export function FeaturedCaseStudy({ cs, onOpen }: { cs: CaseStudy; onOpen: () => void }) {
  const { before, after, afterSuffix = "", metric } = cs.comparison;
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const value = useCountUp(before ?? 0, after ?? 0, inView, 2400);
  const [broken, setBroken] = useState(false);
  if (before == null || after == null) return null;
  const image = cs.card?.image ?? cs.evidence[0]?.src;
  const alt = cs.evidence.find((e) => e.src === image)?.alt ?? `${cs.title} screenshot`;
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <article ref={ref} className="card card-hover group grid overflow-hidden lg:grid-cols-[1fr_1.1fr]" aria-labelledby={`feat-${cs.id}`} style={{ ["--icon-cut" as string]: "#121c30" }}>
      <div className="relative min-h-[20rem] overflow-hidden border-b border-line bg-ground lg:border-b-0 lg:border-r">
        {image && !broken ? (
          <img
            src={asset(image)}
            alt={alt}
            decoding="async"
            onError={() => setBroken(true)}
            className="absolute inset-0 h-full w-full object-contain object-center p-3 transition-transform duration-500 group-hover:scale-[1.02] sm:p-5"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ color: platformColor[cs.platform] }}>
            <PlatformIcon id={cs.platform} size={56} />
          </div>
        )}
        {cs.card?.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-accent-strong px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-white shadow-[0_8px_20px_-8px_rgba(61,107,255,0.9)]">
            {cs.card.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col p-7 sm:p-10 lg:p-12">
        <p className="eyebrow flex items-center gap-2.5 text-muted">
          <span style={{ color: platformColor[cs.platform] }}>
            <PlatformIcon id={cs.platform} size={16} />
          </span>
          {cs.category}
        </p>
        <h3 id={`feat-${cs.id}`} className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-4xl">
          {cs.title}
        </h3>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div>
            <p className="eyebrow text-muted">Initial {metric.toLowerCase()}</p>
            <p className="mt-2 font-display text-4xl font-bold tabular-nums tracking-tight text-ink/80 sm:text-5xl">{fmt(before)}</p>
          </div>
          <div>
            <p className="eyebrow text-accent-text">Final {metric.toLowerCase()}</p>
            <p className="mt-2 font-display text-4xl font-bold tabular-nums tracking-tight text-accent-grad sm:text-5xl" aria-label={`${fmt(after)}${afterSuffix}`}>
              {fmt(value)}
              {value >= after ? afterSuffix : ""}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <GrowthChart from={before} to={after} suffix={afterSuffix} active={inView} id={`feat-${cs.id}`} />
          <p className="mt-1 text-[0.72rem] text-muted">Illustrative curve. Start and end figures are confirmed.</p>
        </div>

        <p className="mt-6 text-[0.98rem] leading-relaxed text-muted">{cs.card?.blurb ?? cs.summary}</p>
        <button type="button" onClick={onOpen} className="btn btn-primary mt-7 self-start">
          View case study <ArrowRight size={18} />
        </button>
      </div>
    </article>
  );
}
