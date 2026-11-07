/**
 * KEY FIGURES strip (under the hero). Each figure counts up when it scrolls into view.
 * Only list numbers you can stand behind and, if a client asks, show evidence for.
 * Leave the list empty to hide the strip.
 */
export interface Stat {
  /** The number to count up to */
  value: number;
  /** Shown right after the number, e.g. "M" for millions or "+" */
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 100, suffix: "M", label: "Views generated" },
  { value: 10, label: "Creators grown" },
  { value: 12, label: "Channels monetized" },
  { value: 5, label: "Platforms mastered" },
];
