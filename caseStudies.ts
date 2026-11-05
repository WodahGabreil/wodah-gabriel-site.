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
    evidence: [
      {
        src: "evidence/tiktok-01.png",
        alt: "TikTok account screenshot showing follower growth",
        caption: "Evidence screenshot 1",
      },
      {
        src: "evidence/tiktok-02.png",
        alt: "TikTok account analytics screenshot",
        caption: "Evidence screenshot 2",
      },
      {
        src: "evidence/tiktok-03.png",
        alt: "TikTok account performance screenshot",
        caption: "Evidence screenshot 3",
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
    evidence: [
      {
        src: "evidence/youtube-01.png",
        alt: "YouTube channel analytics screenshot",
        caption: "Evidence screenshot 1",
      },
      {
        src: "evidence/youtube-02.png",
        alt: "YouTube channel performance screenshot",
        caption: "Evidence screenshot 2",
      },
    ],
  },
];
