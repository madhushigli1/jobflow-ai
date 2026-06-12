"use client";

import { Info } from "lucide-react";
import { useApplications } from "../hooks/use-applications";
import { StatCards } from "./stat-cards";
import { KanbanBoard } from "./kanban-board";

export function Tracker() {
  const { applications, loading, move } = useApplications();

  return (
    <div className="space-y-6">
      <StatCards applications={applications} />

      <div className="label flex items-center gap-2 border border-foreground bg-card px-4 py-2.5 text-muted-foreground">
        <Info className="size-4 shrink-0 text-accent" />
        Drag any card between columns to update its stage.
      </div>

      <KanbanBoard applications={applications} loading={loading} onMove={move} />
    </div>
  );
}
