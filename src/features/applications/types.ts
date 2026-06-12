import type { ApplicationStage } from "@/shared/types";

export interface StageMeta {
  id: ApplicationStage;
  label: string;
  /** Tailwind text/dot color class. */
  dot: string;
  accent: string;
}

/** Ordered columns for the Kanban board. Editorial: ink + lone red accent. */
export const stages: StageMeta[] = [
  { id: "saved", label: "Saved", dot: "bg-card border border-foreground", accent: "text-muted-foreground" },
  { id: "applied", label: "Applied", dot: "bg-muted-foreground", accent: "text-muted-foreground" },
  { id: "interview", label: "Interview", dot: "bg-foreground", accent: "text-foreground" },
  { id: "offer", label: "Offer", dot: "bg-accent", accent: "text-accent" },
  { id: "rejected", label: "Rejected", dot: "bg-foreground/30", accent: "text-muted-foreground" },
];
