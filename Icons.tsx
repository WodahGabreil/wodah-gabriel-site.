import type { SVGProps } from "react";
import type { PlatformId } from "../content/types";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
});

/* ---------- UI icons (Lucide-style line icons) ---------- */
export const ArrowRight = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M7 17L17 7M8 7h9v9" /></svg>
);
export const Check = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M5 12.5l4.5 4.5L19 7" /></svg>
);
export const Menu = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Plus = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const ChevronLeft = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M15 6l-6 6 6 6" /></svg>
);
export const ChevronRight = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M9 6l6 6-6 6" /></svg>
);
export const Mail = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>
);
export const Expand = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
);
export const ImageIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-8 9" /></svg>
);
export const Search = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>
);
export const Compass = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></svg>
);
export const Layers = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>
);
export const Rocket = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M5 19c.5-3 1.5-4 3-5M14 5c3-1.5 5-1.5 5-1.5S19 5.5 17.5 8.5L12 14l-3-3z" /><path d="M9 11L6 10l-2 2 3 1M13 15l1 3 2-2-1-3" /></svg>
);
export const Gauge = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M4 18a8.5 8.5 0 1116 0" /><path d="M12 18l4-6" /></svg>
);
export const Camera = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></svg>
);
export const Radio = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8a6 6 0 010 8.4M7.8 16.2a6 6 0 010-8.4M19 5a10 10 0 010 14M5 19a10 10 0 010-14" /></svg>
);
export const Briefcase = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" /></svg>
);
export const Tag = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M3 11V4h7l10 10-7 7L3 11z" /><circle cx="7.5" cy="7.5" r="1.2" /></svg>
);
export const WhatsApp = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}><path d="M4 20l1.2-4A8 8 0 1112 20a8 8 0 01-3.8-1z" /><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" /></svg>
);

/* ---------- Platform-inspired marks (simplified, not official logos) ---------- */
export function PlatformIcon({ id, size = 24, ...p }: IconProps & { id: PlatformId }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;
  switch (id) {
    case "youtube":
      return (
        <svg {...common} {...p}>
          <rect x="2" y="5" width="20" height="14" rx="4.5" fill="currentColor" />
          <path d="M10 9.2v5.6l5-2.8z" fill="var(--icon-cut, #121c30)" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} {...p}>
          <path
            d="M14.5 3h-2.8v11.3a2.6 2.6 0 11-2.6-2.6c.3 0 .6 0 .8.1V8.9a5.4 5.4 0 105.4 5.4V9.1a6.6 6.6 0 003.8 1.2V7.5a3.9 3.9 0 01-3.9-3.9V3z"
            fill="currentColor"
          />
        </svg>
      );
    case "twitch":
      return (
        <svg {...common} {...p}>
          <path d="M4 3h17v11.5L16.5 19H12.5L10 21.5V19H5.5L4 17.5V3zm2 2v11h4v2.2L12.2 16H16l3-3V5H6z" fill="currentColor" fillRule="evenodd" />
          <path d="M11 7.5h1.7v4.7H11zM15 7.5h1.7v4.7H15z" fill="currentColor" />
        </svg>
      );
    case "kick":
      return (
        <svg {...common} {...p}>
          <path d="M4 3h5v5h2.5V5.5H14V3h6v5h-3v2.5h-2.5V13H17v2.5h3V21h-6v-2.5h-2.5V16H9v5H4V3z" fill="currentColor" />
        </svg>
      );
  }
}

export const platformColor: Record<PlatformId, string> = {
  youtube: "var(--color-yt)",
  tiktok: "var(--color-tt)",
  twitch: "var(--color-tw)",
  kick: "var(--color-kk)",
};

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#3d6bff" />
      <path d="M12 22l8 22 8-15 8 15 8-22" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="52" cy="14" r="4" fill="#ffffff" />
    </svg>
  );
}
