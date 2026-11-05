/**
 * Animated growth curve. The curve is illustrative: only the two end figures are confirmed data,
 * and the chart carries no time axis and no other numbers.
 */
export function GrowthChart({ from, to, suffix = "", active, id = "gc" }: { from: number; to: number; suffix?: string; active: boolean; id?: string }) {
  const curve = "M 24 214 C 90 212, 130 204, 170 186 S 250 118, 300 92 S 372 44, 404 30";
  const area = `${curve} L 404 240 L 24 240 Z`;
  return (
    <svg viewBox="0 0 428 250" className={`h-auto w-full ${active ? "is-in" : ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d6bff" stopOpacity=".38" />
          <stop offset="1" stopColor="#3d6bff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3d6bff" />
          <stop offset="1" stopColor="#8ca6ff" />
        </linearGradient>
      </defs>
      {[40, 90, 140, 190].map((y) => (
        <line key={y} x1="24" x2="404" y1={y} y2={y} stroke="rgb(255 255 255 / .07)" strokeDasharray="2 6" />
      ))}
      <path d={area} fill={`url(#${id}-fill)`} opacity={active ? 1 : 0} style={{ transition: "opacity 1.2s ease .8s" }} />
      <path d={curve} pathLength={1} fill="none" stroke={`url(#${id}-line)`} strokeWidth="3.5" strokeLinecap="round" className="draw-line" />
      <circle cx="24" cy="214" r="6" fill="#121c30" stroke="#9aa7bd" strokeWidth="2" />
      <g>
        <circle cx="404" cy="30" r="9" fill="#3d6bff" opacity=".35" className="pulse-ring" />
        <circle cx="404" cy="30" r="6" fill="#8ca6ff" />
      </g>
      <text x="24" y="238" fill="#9aa7bd" fontSize="11" fontFamily="Inter, sans-serif">
        {from.toLocaleString("en-US")}
      </text>
      <text x="404" y="14" fill="#8ca6ff" fontSize="11" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="600">
        {to.toLocaleString("en-US")}
        {suffix}
      </text>
    </svg>
  );
}
