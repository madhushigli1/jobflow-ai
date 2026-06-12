/** Single source of truth for site-level metadata. */
export const siteConfig = {
  name: "JobFlow AI",
  tagline: "Land your next role, on autopilot.",
  description:
    "JobFlow AI is the intelligent job platform that matches you to roles, tracks every application, and writes tailored cover letters — so you spend time interviewing, not organizing spreadsheets.",
  url: "https://jobflow.ai",
  ogImage: "/og.png",
  email: "hello@jobflow.ai",
  links: {
    github: "https://github.com/jobflow-ai",
    twitter: "https://twitter.com/jobflowai",
    linkedin: "https://linkedin.com/company/jobflow-ai",
  },
} as const;

export type SiteConfig = typeof siteConfig;
