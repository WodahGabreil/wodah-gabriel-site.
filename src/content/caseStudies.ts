import type { CaseStudy } from "./types";

export const caseStudiesIntro = {
  headline: "Performance Demonstrated Through Real Projects.",
  copy: [
    "Marketing effectiveness should be evaluated through documented work, measurable progress, and a clear understanding of project objectives.",
    "Explore selected examples of audience development and digital marketing projects.",
  ],
};

/**
 * CASE STUDIES: add a new project by copying one object below.
 * - Only enter numbers and facts you can prove with evidence.
 * - Anything left empty ([] or undefined) shows an "add details" placeholder.
 * - Put screenshots in /public/evidence and list them under `evidence`.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "tiktok-audience-growth",
    status: "published",
    platform: "tiktok",
    category: "TikTok Marketing & Audience Development",
    title: "TikTok Audience Growth",
    summary:
      "A documented TikTok audience growth project demonstrating measurable account development.",
    channelInfo: [
      { label: "Platform", value: "TikTok" },
      { label: "Project category", value: "TikTok Marketing & Audience Development" },
      { label: "Account", value: undefined },
      { label: "Niche", value: undefined },
    ],
    comparison: {
      metric: "Followers",
      before: 2147,
      after: 14100,
      afterSuffix: "+",
    },
    overview:
      "An audience development project focused on growing the follower base of a TikTok account. The starting and final follower counts shown here are confirmed.",
    objectives: ["Grow the account's TikTok follower base."],
    workPerformed: [],
    approach: [],
    resultsSummary: "The account grew from 2,147 to 14,100+ followers.",
    card: { badge: "Featured result", metric: "2,147 → 14,100+", metricNote: "followers" },
    evidence: [
      {
        src: "evidence/tiktok-01.webp",
        alt: "Before and after TikTok profile screenshots showing followers rising from 2,147 to 14.1K",
        caption: "Evidence screenshot 1",
      },
    ],
  },
  {
    id: "youtube-marketing-project",
    status: "draft",
    platform: "youtube",
    category: "YouTube Marketing & Channel Growth",
    title: "YouTube Marketing Project",
    summary: "A YouTube channel marketing project. Project data is being compiled.",
    channelInfo: [
      { label: "Channel name", value: undefined },
      { label: "Niche", value: undefined },
      { label: "Project category", value: "YouTube Marketing & Channel Growth" },
    ],
    // Fill in `before` / `after` (numbers) once supplied. Example: before: 1200, after: 5400
    comparison: {
      metric: "Subscribers",
      before: undefined,
      after: undefined,
    },
    extraMetrics: [
      { label: "Views", value: undefined },
      { label: "Watch time", value: undefined },
    ],
    overview: undefined,
    objectives: [],
    workPerformed: [],
    approach: [],
    resultsSummary: undefined,
    card: {
      metric: "+882",
      metricNote: "subscribers, last 28 days",
      blurb: "YouTube Studio analytics for the last 28 days: 175.5K views and 164.6K watch hours.",
    },
    evidence: [
      {
        src: "evidence/youtube-01.jpg",
        alt: "YouTube Studio analytics screenshot showing views, watch time, subscribers and estimated revenue for the last 28 days",
        caption: "Evidence screenshot 1",
      },
      {
        src: "evidence/youtube-02.jpg",
        alt: "YouTube Studio revenue screenshot showing estimated monthly revenue",
        caption: "Evidence screenshot 2",
      },
      {
        src: "evidence/youtube-03.jpg",
        alt: "YouTube Studio channel analytics screenshot showing subscribers, views and watch time for the last 28 days",
        caption: "Evidence screenshot 3",
      },
      {
        src: "evidence/youtube-04.jpg",
        alt: "YouTube Studio Shorts analytics screenshot showing views, how viewers engaged and top Shorts for the last 28 days",
        caption: "Evidence screenshot 4",
      },
    ],
  },
];
