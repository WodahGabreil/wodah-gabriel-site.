export type PlatformId = "youtube" | "tiktok" | "twitch" | "kick";

export interface Service {
  id: PlatformId;
  number: string;
  name: string;
  /** Short label used in forms and chips */
  label: string;
  description: string;
  capabilities: string[];
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
