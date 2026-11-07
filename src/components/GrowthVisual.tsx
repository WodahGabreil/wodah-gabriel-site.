import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { PlatformIcon, platformColor } from "./Icons";
import { GrowthChart } from "./GrowthChart";
import type { PlatformId } from "../content/types";

/**
 * Hero dashboard card. Only the two follower figures are confirmed data
 * (from the TikTok case study); the curve is illustrative and carries no other numbers.
 */
const names: Record<PlatformId, string> = { youtube: "YouTube", tiktok: "TikTok", twitch: "Twitch", kick: "Kick" };

export function GrowthVisual({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const value = useCountUp(from, to, inView, 2200);
  const platforms: PlatformId[] = ["youtube", "tiktok", "twitch", "kick"];
  const pct = Math.max((from / to) * 100, 4);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[35rem]"
      role="img"
      aria-label={`Illustrative growth chart for the confirmed TikTok project: followers rising from ${from.toLocaleString()} to ${to.toLocaleString()}${suffix}.`}
    >
      {/* soft glow */}
      <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-accent/20 blur-3xl" aria-hidden="true" />

      <div className="overflow-hidden rounded-3xl border border-line-strong bg-surface/85 shadow-[0_40px_90px_-40px_rgba(61,107,255,0.55)] backdrop-blur" style={{ ["--icon-cut" as string]: "#121c30" }}>
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="eyebrow text-[0.66rem] text-muted">Audience growth ledger</span>
        </div>

        <div className="px-5 pb-5 pt-6 sm:px-8">
          <div className="flex items-center gap-2">
            <span style={{ color: platformColor.tiktok }}>
              <PlatformIcon id="tiktok" size={16} />
            </span>
            <p className="eyebrow text-[0.66rem] text-muted">TikTok followers · confirmed project</p>
          </div>

          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[0.62rem] text-muted">Now</p>
              <p className="mt-1 font-display text-[3.2rem] font-bold leading-none tracking-tighter tabular-nums text-ink sm:text-[4.4rem]">
                {value.toLocaleString("en-US")}
                {value >= to ? <span className="text-accent-grad">{suffix}</span> : null}
              </p>
            </div>
            <div className="pb-1 text-right">
              <p className="eyebrow text-[0.62rem] text-muted">Started at</p>
              <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-muted sm:text-3xl">{from.toLocaleString("en-US")}</p>
            </div>
          </div>

          {/* to-scale bars from the two confirmed figures */}
          <div className="mt-5 space-y-2" aria-hidden="true">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
              <div className="h-full rounded-full bg-muted/70" style={{ width: inView ? `${pct}%` : "0%", transition: "width 1.4s cubic-bezier(.2,.7,.2,1)" }} />
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
              <div className="h-full rounded-full bg-accent" style={{ width: inView ? "100%" : "0%", transition: "width 1.8s cubic-bezier(.2,.7,.2,1) .2s" }} />
            </div>
          </div>

          <div className="mt-4">
            <GrowthChart from={from} to={to} suffix={suffix} active={inView} id="hero" />
          </div>
          <p className="mt-1 text-[0.7rem] text-muted">Illustrative curve. Start and end figures are confirmed.</p>
        </div>

        {/* platform signals */}
        <div className="grid grid-cols-4 divide-x divide-line border-t border-line">
          {platforms.map((p) => (
            <div key={p} className="flex flex-col items-center gap-1.5 py-4">
              <span style={{ color: platformColor[p] }}>
                <PlatformIcon id={p} size={22} />
              </span>
              <span className="text-[0.7rem] font-medium text-muted">{names[p]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* floating chips */}
      <div className="absolute -left-3 top-[17rem] hidden rotate-[-4deg] rounded-xl border border-line-strong bg-ground/80 px-3.5 py-2 backdrop-blur-md sm:block" aria-hidden="true">
        <p className="eyebrow text-[0.62rem] text-accent-text">Discoverability</p>
      </div>
      <div className="absolute -right-3 bottom-28 hidden rotate-[3deg] rounded-xl border border-line-strong bg-ground/80 px-3.5 py-2 backdrop-blur-md sm:block" aria-hidden="true">
        <p className="eyebrow text-[0.62rem] text-accent-text">Audience development</p>
      </div>
    </div>
  );
}
