import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { PlatformIcon, platformColor } from "./Icons";
import type { PlatformId } from "../content/types";

/**
 * Custom hero visual: an editorial "growth ledger".
 * The curve is illustrative; only the two follower figures are confirmed data
 * (from the TikTok case study) and it carries no time axis or other numbers.
 */
const names: Record<PlatformId, string> = { youtube: "YouTube", tiktok: "TikTok", twitch: "Twitch", kick: "Kick" };

export function GrowthVisual({
  from,
  to,
  suffix = "",
}: {
  from: number;
  to: number;
  suffix?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const value = useCountUp(from, to, inView, 2000);
  const platforms: PlatformId[] = ["youtube", "tiktok", "twitch", "kick"];

  // Smooth rising curve (illustrative)
  const curve = "M 24 214 C 90 212, 130 204, 170 186 S 250 118, 300 92 S 372 44, 404 30";
  const area = `${curve} L 404 240 L 24 240 Z`;

  return (
    <div
      ref={ref}
      className={`relative w-full max-w-[34rem] ${inView ? "is-in" : ""}`}
      role="img"
      aria-label={`Illustrative growth chart for the confirmed TikTok project: followers rising from ${from.toLocaleString()} to ${to.toLocaleString()}${suffix}.`}
    >
      {/* soft glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-lime/10 blur-3xl" aria-hidden="true" />

      <div className="overflow-hidden rounded-3xl border border-white/12 bg-navy/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)]">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-line-dark px-5 py-3.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="eyebrow text-[0.66rem] text-mist">Audience growth ledger</span>
        </div>

        <div className="px-5 pb-5 pt-6 sm:px-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[0.66rem] text-mist">TikTok followers · confirmed project</p>
              <p className="mt-2 font-display text-5xl font-semibold leading-none tracking-tight text-ivory tabular-nums sm:text-6xl">
                {value.toLocaleString("en-US")}
                {value >= to ? <span className="text-lime">{suffix}</span> : null}
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="eyebrow text-[0.66rem] text-mist">Started at</p>
              <p className="mt-1 font-display text-xl text-ivory/80 tabular-nums">{from.toLocaleString("en-US")}</p>
            </div>
          </div>

          <svg viewBox="0 0 428 250" className="mt-5 h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id="gv-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c7f36b" stopOpacity=".28" />
                <stop offset="1" stopColor="#c7f36b" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 90, 140, 190].map((y) => (
              <line key={y} x1="24" x2="404" y1={y} y2={y} stroke="rgb(255 255 255 / .08)" strokeDasharray="2 6" />
            ))}
            <path d={area} fill="url(#gv-fill)" opacity={inView ? 1 : 0} style={{ transition: "opacity 1.2s ease .8s" }} />
            <path d={curve} pathLength={1} fill="none" stroke="#c7f36b" strokeWidth="3" strokeLinecap="round" className="draw-line" />
            {/* start node */}
            <circle cx="24" cy="214" r="6" fill="#19283a" stroke="#a8b4c6" strokeWidth="2" />
            {/* end node */}
            <g>
              <circle cx="404" cy="30" r="9" fill="#c7f36b" opacity=".25" className="pulse-ring" />
              <circle cx="404" cy="30" r="6" fill="#c7f36b" />
            </g>
            <text x="24" y="238" fill="#a8b4c6" fontSize="11" fontFamily="Inter, sans-serif">
              {from.toLocaleString("en-US")}
            </text>
            <text x="404" y="14" fill="#c7f36b" fontSize="11" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="600">
              {to.toLocaleString("en-US")}
              {suffix}
            </text>
          </svg>
          <p className="mt-1 text-[0.7rem] text-mist/80">Illustrative curve. Start and end figures are confirmed.</p>
        </div>

        {/* platform signals */}
        <div className="grid grid-cols-4 divide-x divide-line-dark border-t border-line-dark">
          {platforms.map((p) => (
            <div key={p} className="flex flex-col items-center gap-1.5 py-4 text-ivory/85">
              <span style={{ color: platformColor[p], ["--icon-cut" as string]: "#19283a" }}>
                <PlatformIcon id={p} size={22} />
              </span>
              <span className="text-[0.7rem] font-medium text-mist">{names[p]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* floating tags */}
      <div className="absolute -left-3 top-[15rem] hidden rotate-[-4deg] rounded-xl border border-white/15 bg-midnight px-3.5 py-2 shadow-xl sm:block" aria-hidden="true">
        <p className="eyebrow text-[0.62rem] text-lime">Discoverability</p>
      </div>
      <div className="absolute -right-3 bottom-28 hidden rotate-[3deg] rounded-xl border border-white/15 bg-midnight px-3.5 py-2 shadow-xl sm:block" aria-hidden="true">
        <p className="eyebrow text-[0.62rem] text-lime">Audience development</p>
      </div>
    </div>
  );
}
