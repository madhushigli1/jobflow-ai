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
              "flex flex-col border-2 border-foreground bg-card/40 p-3 transition-colors",
              isOver && "bg-accent/10",
            )}
          >
            <div className="flex items-center gap-2 border-b border-foreground px-1 pb-3">
              <span className={cn("size-2.5", stage.dot)} />
              <h3 className="label text-foreground">{stage.label}</h3>
              <span className="ml-auto grid min-w-6 place-items-center border border-foreground bg-background px-1.5 font-mono text-xs">
                {cards.length}
              </span>
            </div>

            <div className="flex min-h-24 flex-1 flex-col gap-2.5 pt-3">
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
                    "label grid flex-1 place-items-center border border-dashed border-foreground/40 py-8 text-center text-muted-foreground/60 transition-colors",
                    isOver && "border-accent text-accent",
                  )}
                >
                  {isOver ? "Drop here" : "Drag here"}
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
        <div key={s.id} className="border-2 border-foreground bg-card/40 p-3">
          <Skeleton className="mb-3 h-4 w-20" />
          <div className="space-y-2.5">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
