/**
 * Core domain entities, shared across features.
 * Jobs ↔ Applications ↔ Analytics reference each other, so these
 * cross-cutting entities live in shared/types (not a single feature).
 */

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type SeniorityLevel = "Junior" | "Mid" | "Senior" | "Staff" | "Lead";

export interface Company {
  name: string;
  /** Single emoji used as a lightweight logo. */
  logo: string;
  /** Tailwind gradient stops for the logo tile, e.g. "from-violet-500 to-blue-500". */
  brand: string;
  size: string;
  industry: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  workMode: WorkMode;
  type: EmploymentType;
  level: SeniorityLevel;
  salaryMin: number;
  salaryMax: number;
  /** AI-computed fit score against the user's profile (0–100). */
  matchScore: number;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  postedAt: string; // ISO
  applicants: number;
  featured?: boolean;
}

export type ApplicationStage = "saved" | "applied" | "interview" | "offer" | "rejected";

export interface ApplicationEvent {
  label: string;
  date: string; // ISO
}

export interface Application {
  id: string;
  job: Pick<Job, "id" | "title" | "company" | "location" | "salaryMin" | "salaryMax" | "matchScore">;
  stage: ApplicationStage;
  appliedAt: string; // ISO
  /** Optional next scheduled touchpoint. */
  nextStep?: string;
  notes?: string;
  timeline: ApplicationEvent[];
}

export interface UserProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  /** Top skills used by the matching engine. */
  skills: string[];
  desiredRoles: string[];
  /** 0–100 profile completeness. */
  profileStrength: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}
