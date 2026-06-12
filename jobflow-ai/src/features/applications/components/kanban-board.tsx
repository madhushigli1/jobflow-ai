"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Skeleton } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import type { Application, ApplicationStage } from "@/shared/types";
import { stages } from "../types";
import { ApplicationCard } from "./application-card";

export function KanbanBoard({
  applications,
  loading,
  onMove,
}: {
  applications: Application[];
  loading: boolean;
  onMove: (id: string, stage: ApplicationStage) => void;
}) {
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [overStage, setOverStage] = React.useState<ApplicationStage | null>(null);

  function handleDrop(stage: ApplicationStage) {
    if (draggingId) onMove(draggingId, stage);
    setDraggingId(null);
    setOverStage(null);
  }

  if (loading) return <BoardSkeleton />;

  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
      {stages.map((stage) => {
        const cards = applications.filter((a) => a.stage === stage.id);
        const isOver = overStage === stage.id;
        return (
          <div
            key={stage.id}
            onDragOver={(e) => {
              e.preventDefault();
              setOverStage(stage.id);
            }}
            onDragLeave={(e) => {
              // only clear if leaving the column entirely
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverStage(null);
            }}
            onDrop={() => handleDrop(stage.id)}
            className={cn(
              "flex flex-col rounded-2xl border bg-card/20 p-3 transition-colors",
              isOver ? "border-primary/50 bg-primary/5" : "border-border",
            )}
          >
            <div className="flex items-center gap-2 px-1 pb-3">
              <span className={cn("size-2 rounded-full", stage.dot)} />
              <h3 className="text-sm font-semibold">{stage.label}</h3>
              <span className="ml-auto grid min-w-6 place-items-center rounded-full bg-muted px-1.5 text-xs text-muted-foreground">
                {cards.length}
              </span>
            </div>

            <div className="flex min-h-24 flex-1 flex-col gap-2.5">
              <AnimatePresence mode="popLayout">
                {cards.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    dragging={draggingId === app.id}
                    onDragStart={() => setDraggingId(app.id)}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setOverStage(null);
                    }}
                  />
                ))}
              </AnimatePresence>

              {cards.length === 0 && (
                <div
                  className={cn(
                    "grid flex-1 place-items-center rounded-xl border border-dashed border-border/70 py-8 text-center text-xs text-muted-foreground/60 transition-colors",
                    isOver && "border-primary/40 text-primary",
                  )}
                >
                  {isOver ? "Drop here" : "Drag cards here"}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BoardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
      {stages.map((s) => (
        <div key={s.id} className="rounded-2xl border border-border bg-card/20 p-3">
          <Skeleton className="mb-3 h-4 w-20" />
          <div className="space-y-2.5">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
