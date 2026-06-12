/**
 * Centralized API client. UI components and feature hooks call `api.*`
 * and never touch the data source directly — so swapping this mock for a
 * real backend (fetch/REST) is a single-file change.
 */
import type {
  Application,
  ApplicationStage,
  Job,
  Testimonial,
  UserProfile,
} from "@/shared/types";
import {
  applications as seedApplications,
  jobs as seedJobs,
  testimonials as seedTestimonials,
  user as seedUser,
} from "./mock-db";

/** Standard response envelope, mirroring a real paginated API. */
export interface ApiResponse<T> {
  data: T;
  meta?: { total: number; page: number };
}

export interface JobQuery {
  search?: string;
  workMode?: string[];
  type?: string[];
  level?: string[];
  minSalary?: number;
  sort?: "match" | "recent" | "salary";
}

export interface AnalyticsSummary {
  totals: { applications: number; interviews: number; offers: number; rejected: number };
  responseRate: number;
  interviewRate: number;
  offerRate: number;
  /** Applications submitted per week (last 8 weeks). */
  weekly: { week: string; applications: number; interviews: number }[];
  /** Funnel from applied → offer. */
  funnel: { stage: string; value: number }[];
  /** Applications grouped by work mode. */
  byWorkMode: { label: string; value: number }[];
  topMatches: Pick<Job, "id" | "title" | "company" | "matchScore">[];
}

// Simulate network latency so loading states are real.
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function filterJobs(query: JobQuery = {}): Job[] {
  let result = [...seedJobs];
  const { search, workMode, type, level, minSalary, sort } = query;

  if (search?.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.name.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q),
    );
  }
  if (workMode?.length) result = result.filter((j) => workMode.includes(j.workMode));
  if (type?.length) result = result.filter((j) => type.includes(j.type));
  if (level?.length) result = result.filter((j) => level.includes(j.level));
  if (minSalary) result = result.filter((j) => j.salaryMax >= minSalary);

  switch (sort) {
    case "recent":
      result.sort((a, b) => +new Date(b.postedAt) - +new Date(a.postedAt));
      break;
    case "salary":
      result.sort((a, b) => b.salaryMax - a.salaryMax);
      break;
    default:
      result.sort((a, b) => b.matchScore - a.matchScore);
  }
  return result;
}

function buildAnalytics(): AnalyticsSummary {
  const count = (s: ApplicationStage) => seedApplications.filter((a) => a.stage === s).length;
  const applied = seedApplications.length;
  const interviews = count("interview") + count("offer");
  const offers = count("offer");
  const rejected = count("rejected");

  return {
    totals: { applications: applied, interviews, offers, rejected },
    responseRate: Math.round(((interviews + rejected) / applied) * 100),
    interviewRate: Math.round((interviews / applied) * 100),
    offerRate: Math.round((offers / applied) * 100),
    weekly: [
      { week: "Apr 21", applications: 3, interviews: 0 },
      { week: "Apr 28", applications: 5, interviews: 1 },
      { week: "May 05", applications: 4, interviews: 1 },
      { week: "May 12", applications: 6, interviews: 2 },
      { week: "May 19", applications: 5, interviews: 2 },
      { week: "May 26", applications: 7, interviews: 3 },
      { week: "Jun 02", applications: 6, interviews: 3 },
      { week: "Jun 09", applications: 8, interviews: 4 },
    ],
    funnel: [
      { stage: "Applied", value: applied },
      { stage: "Screen", value: 7 },
      { stage: "Interview", value: interviews },
      { stage: "Offer", value: offers },
    ],
    byWorkMode: [
      { label: "Remote", value: 6 },
      { label: "Hybrid", value: 3 },
      { label: "On-site", value: 1 },
    ],
    topMatches: seedJobs
      .slice()
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 4)
      .map((j) => ({ id: j.id, title: j.title, company: j.company, matchScore: j.matchScore })),
  };
}

export const api = {
  jobs: {
    async list(query?: JobQuery): Promise<ApiResponse<Job[]>> {
      await delay(450);
      const data = filterJobs(query);
      return { data, meta: { total: data.length, page: 1 } };
    },
    async get(id: string): Promise<Job | null> {
      await delay(300);
      return seedJobs.find((j) => j.id === id) ?? null;
    },
    async related(id: string): Promise<Job[]> {
      await delay(200);
      const job = seedJobs.find((j) => j.id === id);
      if (!job) return [];
      return seedJobs
        .filter((j) => j.id !== id && j.level === job.level)
        .slice(0, 3);
    },
  },
  applications: {
    async list(): Promise<ApiResponse<Application[]>> {
      await delay(400);
      const data = [...seedApplications];
      return { data, meta: { total: data.length, page: 1 } };
    },
  },
  user: {
    async get(): Promise<UserProfile> {
      await delay(150);
      return seedUser;
    },
  },
  testimonials: {
    async list(): Promise<Testimonial[]> {
      await delay(100);
      return seedTestimonials;
    },
  },
  analytics: {
    async summary(): Promise<AnalyticsSummary> {
      await delay(500);
      return buildAnalytics();
    },
  },
};
