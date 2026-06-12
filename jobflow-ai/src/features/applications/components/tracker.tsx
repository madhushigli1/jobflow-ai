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

      <div className="flex items-center gap-2 rounded-xl border border-border bg-card/30 px-4 py-2.5 text-sm text-muted-foreground">
        <Info className="size-4 shrink-0 text-primary" />
        Drag any card between columns to update its stage.
      </div>

      <KanbanBoard applications={applications} loading={loading} onMove={move} />
    </div>
  );
}
