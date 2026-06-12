import type { EmploymentType, SeniorityLevel, WorkMode } from "@/shared/types";

export type JobSort = "match" | "recent" | "salary";

/** UI filter state for the job board. */
export interface JobFilters {
  search: string;
  workMode: WorkMode[];
  type: EmploymentType[];
  level: SeniorityLevel[];
  minSalary: number;
  sort: JobSort;
}

export const defaultJobFilters: JobFilters = {
  search: "",
  workMode: [],
  type: [],
  level: [],
  minSalary: 0,
  sort: "match",
};

export const workModeOptions: WorkMode[] = ["Remote", "Hybrid", "On-site"];
export const typeOptions: EmploymentType[] = [
  "Full-time",
  "Contract",
  "Internship",
  "Part-time",
];
export const levelOptions: SeniorityLevel[] = [
  "Junior",
  "Mid",
  "Senior",
  "Staff",
  "Lead",
];
