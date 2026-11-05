import type { Service } from "./types";

export const servicesIntro = {
  headline: "Strategic Marketing Solutions for Digital Platform Growth.",
  copy: "Every platform presents different opportunities and challenges. My approach focuses on understanding those differences and applying marketing strategies suited to each platform's audience, content environment, and growth objectives.",
};

export const services: Service[] = [
  {
    id: "youtube",
    image: "services/youtube.jpg",
    imageAlt: "YouTube Studio channel analytics screenshot",
    number: "01",
    name: "YouTube Marketing & Channel Growth",
    label: "YouTube",
    description:
      "Helping YouTube creators and businesses strengthen their channel presence through strategic promotion, optimization, and audience-focused marketing.",
    capabilities: [
      "YouTube channel audits and performance analysis",
      "YouTube video promotion",
      "Channel SEO and keyword research",
      "Video title and description optimization",
      "Content discoverability strategy",
      "YouTube Shorts marketing strategy",
      "Competitor and niche research",
      "Audience development",
      "Channel positioning and optimization",
      "Long-term channel growth planning",
    ],
  },
  {
    id: "tiktok",
    image: "services/tiktok.jpg",
    imageAlt: "TikTok Studio analytics screenshot",
    number: "02",
    name: "TikTok Marketing & Audience Development",
    label: "TikTok",
    description:
      "Supporting creators and brands in improving their TikTok presence through targeted marketing, strategic promotion, and audience development.",
    capabilities: [
      "TikTok account growth strategy",
      "Audience development",
      "Content visibility planning",
      "TikTok profile optimization",
      "Promotional campaign planning",
      "Content positioning",
      "Competitor analysis",
      "Growth performance assessment",
    ],
  },
  {
    id: "twitch",
    image: "services/twitch.jpg",
    imageAlt: "Twitch stream summary screenshot",
    imageFit: "contain",
    number: "03",
    name: "Twitch Promotion & Channel Visibility",
    label: "Twitch",
    description:
      "Helping Twitch streamers improve their discoverability, strengthen their channel positioning, and develop a more recognizable presence within the streaming ecosystem.",
    capabilities: [
      "Twitch channel visibility audits",
      "Streamer promotion",
      "Category and discoverability analysis",
      "Channel presentation recommendations",
      "Streaming audience development",
      "Community-focused promotion",
      "Stream branding recommendations",
      "Competitor research",
      "Streaming growth strategy",
    ],
  },
  {
    id: "kick",
    image: "services/kick.webp",
    imageAlt: "Kick viewership statistics for June 2026: hours watched, peak and average viewers, active channels",
    imageFit: "wide",
    imageCaption: "Kick platform viewership, June 2026. Source: StreamsCharts.",
    number: "04",
    name: "Kick Promotion & Audience Development",
    label: "Kick",
    description:
      "Helping Kick creators develop their platform presence through structured promotion, visibility improvement, and audience-focused marketing.",
    capabilities: [
      "Kick channel promotion",
      "Channel visibility strategy",
      "Streamer discovery",
      "Audience development",
      "Channel positioning",
      "Community outreach",
      "Competitor research",
      "Long-term platform growth planning",
    ],
  },
];
