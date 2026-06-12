import type { ApplicationStage } from "@/shared/types";

export interface StageMeta {
  id: ApplicationStage;
  label: string;
  /** Tailwind text/dot color class. */
  dot: string;
  accent: string;
}

/** Ordered columns for the Kanban board. */
export const stages: StageMeta[] = [
  { id: "saved", label: "Saved", dot: "bg-muted-foreground", accent: "text-muted-foreground" },
  { id: "applied", label: "Applied", dot: "bg-accent", accent: "text-accent" },
  { id: "interview", label: "Interview", dot: "bg-primary", accent: "text-primary" },
  { id: "offer", label: "Offer", dot: "bg-success", accent: "text-success" },
  { id: "rejected", label: "Rejected", dot: "bg-destructive", accent: "text-destructive" },
];
