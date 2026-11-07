import { stats } from "../content/stats";
import type { Stat } from "../content/stats";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";

function Cell({ stat }: { stat: Stat }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const value = useCountUp(0, stat.value, inView, 1800);
  const suffix = stat.suffix ?? "";
  return (
    <div ref={ref} className="px-1 text-center sm:px-4">
      <p className="font-display text-[1.9rem] font-bold leading-none tracking-tight text-accent tabular-nums sm:text-6xl lg:text-7xl">
        <span aria-hidden="true">
          {value.toLocaleString("en-US")}
          {suffix}
        </span>
        <span className="sr-only">
          {stat.value.toLocaleString("en-US")}
          {suffix}
        </span>
      </p>
      <p className="eyebrow mt-3 text-[0.6rem] text-muted sm:text-xs">{stat.label}</p>
    </div>
  );
}

/** Key figures strip. Edit the numbers in src/content/stats.ts; an empty list hides it. */
export function StatsStrip() {
  if (!stats.length) return null;
  return (
    <section aria-label="Key figures" className="relative border-b border-line bg-ground">
      <div className="container-x py-12 sm:py-16">
        <div className="grid grid-cols-4 divide-x divide-line">
          {stats.map((s) => (
            <Cell key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
