/**
 * HOME PAGE BLOCKS: all copy for the sections under the hero lives here.
 * Edit the text freely. Rules for this page: no invented numbers, clients, prices,
 * timelines or guarantees. The only confirmed result is the TikTok case study.
 */
import type { PlatformId } from "./types";

/* 1. Platform expertise band */
export const platformBand = {
  eyebrow: "Platform expertise",
  headline: "Four Platforms. Four Different Playbooks.",
  copy: "Each platform rewards different things, so the approach changes with the platform.",
  items: [
    { id: "youtube", line: "Discoverability is the engine: search, titles and clear positioning decide who finds a channel." },
    { id: "tiktok", line: "Short-form reach depends on how well content is positioned and surfaced to the right audience." },
    { id: "twitch", line: "Live community and channel visibility shape how streamers are found and remembered." },
    { id: "kick", line: "A live platform where structured promotion and community outreach build a recognisable presence." },
  ] as { id: PlatformId; line: string }[],
};

/* 2. Why strategy beats shortcuts */
export type WhyIcon = "compass" | "layers" | "search" | "check";
export const whyStrategy = {
  eyebrow: "Why strategy",
  headline: "Sustainable Growth Comes From Strategy, Not Shortcuts.",
  copy: "Growth that lasts comes from understanding the platform, positioning your content clearly and making it easy to discover. It does not come from buying views, followers or engagement.",
  points: [
    { icon: "compass", title: "Platform understanding", text: "Every platform has its own audience behaviour, content formats and discovery system. Good strategy starts there." },
    { icon: "layers", title: "Clear positioning", text: "A defined niche, identity and audience make a channel easier to recognise, follow and recommend." },
    { icon: "search", title: "Discoverability", text: "Well-optimised titles, descriptions, categories and profiles help the right audience find the work." },
    { icon: "check", title: "Honest growth", text: "No bought views, followers or fake engagement. Results vary by platform, content and market, and none can be guaranteed." },
  ] as { icon: WhyIcon; title: string; text: string }[],
};

/* 3. Featured result (the numbers come from the case study in caseStudies.ts) */
export const featuredResult = {
  eyebrow: "Featured result",
  headline: "A Documented TikTok Audience Growth Project.",
  cta: "View the Case Study",
};

/* 4. Services preview: one sentence per service */
export const servicesPreview = {
  eyebrow: "What I help with",
  headline: "Platform-Specific Marketing Support.",
  copy: "A short overview of each service. The full detail is on the Services page.",
  cta: "See All Services",
  items: [
    { id: "youtube", line: "Channel audits, SEO and promotion to strengthen discoverability." },
    { id: "tiktok", line: "Account growth strategy, profile optimization and content visibility planning." },
    { id: "twitch", line: "Visibility audits, category analysis and streamer promotion." },
    { id: "kick", line: "Channel promotion, positioning and community outreach." },
  ] as { id: PlatformId; line: string }[],
};

/* 5. Process preview (the five steps come from process.ts) */
export const processPreview = {
  eyebrow: "How I work",
  cta: "See the Full Framework",
};

/* 6. Who I work with */
export type WhoIcon = "camera" | "radio" | "briefcase" | "tag";
export const whoIWorkWith = {
  eyebrow: "Who I work with",
  headline: "Support for Creators, Streamers, Businesses and Brands.",
  items: [
    { icon: "camera", title: "Creators", line: "Clear positioning and a repeatable approach to growing an audience." },
    { icon: "radio", title: "Streamers", line: "Visibility within the live ecosystem and a recognisable channel presence." },
    { icon: "briefcase", title: "Businesses", line: "A professional, structured presence on the platforms their audience uses." },
    { icon: "tag", title: "Brands", line: "Consistent, platform-appropriate promotion that fits their identity." },
  ] as { icon: WhoIcon; title: string; line: string }[],
};

/* 7. Hire me through trusted platforms (links come from site.ts) */
export const hireStrip = {
  eyebrow: "Hire me",
  headline: "Hire Me Through Trusted Platforms.",
  copy: "Prefer a structured way to get started? Work with me through a freelance platform, or send an inquiry directly.",
  inquiry: "Send an Inquiry",
};

/* 8. Frequently asked questions. Keep answers general: no prices, timelines or policies. */
export const faq = {
  eyebrow: "FAQ",
  headline: "Frequently Asked Questions.",
  items: [
    {
      q: "Which platforms do you work on?",
      a: "YouTube, TikTok, Twitch and Kick. Each platform rewards different things, so the approach is built around the platform you choose.",
    },
    {
      q: "How do we start?",
      a: "Send an inquiry through the contact form with your platform, your objectives and a link to your channel or account. I will review it and reply by email to discuss your project.",
    },
    {
      q: "Do you guarantee results?",
      a: "No. No one can honestly guarantee growth on these platforms, and I do not. I focus on strategy, positioning and discoverability, and on documenting progress with the data that is available.",
    },
    {
      q: "Do you buy views, followers or engagement?",
      a: "No. I do not use bought views, followers or fake engagement. The work is platform-specific strategy, positioning and promotion.",
    },
    {
      q: "How do you report progress?",
      a: "Progress is assessed against the objectives we agree, using the performance data available from the platform. How and when to report is agreed at the start of a project.",
    },
    {
      q: "Can I see examples?",
      a: "Yes. The Case Studies page documents projects with evidence screenshots, including the TikTok project that grew from 2,147 to 14,100+ followers. Further examples are added as project data is confirmed.",
    },
  ],
};

/* 10. Final call to action */
export const finalCta = {
  headline: "Your Next Stage of Digital Growth Starts With a Strategy.",
  copy: "Let's identify the opportunities, define the objectives, and build a marketing approach suited to your platform.",
  cta: "Discuss Your Project",
};
