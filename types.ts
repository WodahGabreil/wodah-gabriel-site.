export type PlatformId = "youtube" | "tiktok" | "twitch" | "kick";

export interface Service {
  id: PlatformId;
  number: string;
  name: string;
  /** Short label used in forms and chips */
  label: string;
  description: string;
  capabilities: string[];
  /** Optional screenshot for the service card, a path under /public. Without it a drawn platform mock-up is shown. */
  image?: string;
  imageAlt?: string;
  /** "cover" fills the frame and crops (default). "contain" shows the whole portrait image. "wide" shows a whole landscape image. */
  imageFit?: "cover" | "contain" | "wide";
  /** Small credit line shown under the image, e.g. a data source. */
  imageCaption?: string;
}

/** A labelled value. Leave `value` empty and an "add details" placeholder is shown. */
export interface Field {
  label: string;
  value?: string;
}

export interface EvidenceImage {
  /** Path relative to /public, e.g. "evidence/tiktok-01.png" */
  src: string;
  alt: string;
  caption: string;
}

export interface Comparison {
  metric: string;
  /** Numeric values drive the animated counter. Leave undefined for placeholders. */
  before?: number;
  after?: number;
  /** Appended to the final number, e.g. "+" */
  afterSuffix?: string;
}

/** What the portfolio card shows. Leave `card` off a case study and its card uses plain defaults. */
export interface CardInfo {
  /** Small badge on the screenshot, e.g. "Featured result". Leave empty for no badge. */
  badge?: string;
  /** The big headline figure. Only use figures shown in your evidence screenshots. */
  metric: string;
  /** Small text after the headline figure, e.g. "followers" */
  metricNote?: string;
  /** Short line under the title. Falls back to the case study summary. */
  blurb?: string;
  /** Screenshot on the card, a path under /public. Falls back to the first evidence image. */
  image?: string;
}

export interface CaseStudy {
  id: string;
  /** "draft" shows a small "Awaiting project data" tag. Switch to "published" once complete. */
  status: "published" | "draft";
  platform: PlatformId;
  category: string;
  title: string;
  /** One-line description shown in the card header */
  summary: string;
  channelInfo: Field[];
  comparison: Comparison;
  /** Optional extra confirmed metrics, shown beside the comparison */
  extraMetrics?: Field[];
  overview?: string;
  objectives: string[];
  workPerformed: string[];
  approach: string[];
  resultsSummary?: string;
  evidence: EvidenceImage[];
  /** How this case study appears as a card in the portfolio grid */
  card?: CardInfo;
}

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  platform?: PlatformId;
}

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
}
