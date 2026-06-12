"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CalendarClock, GripVertical } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { formatSalary, timeAgo } from "@/shared/utils/format";
import type { Application } from "@/shared/types";

export function ApplicationCard({
  application,
  onDragStart,
  onDragEnd,
  dragging,
}: {
  application: Application;
  onDragStart: () => void;
  onDragEnd: () => void;
  dragging: boolean;
}) {
  const { job } = application;
  return (
    <motion.div
      layout
      layoutId={application.id}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: dragging ? 0.4 : 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group cursor-grab rounded-xl border border-border bg-card/70 p-3.5 active:cursor-grabbing",
        "hover:border-primary/40",
        dragging && "ring-2 ring-primary/50",
      )}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={cn(
            "mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-sm font-bold text-white ring-1 ring-white/10",
            job.company.brand,
          )}
        >
          {job.company.logo}
        </span>
        <div className="min-w-0 flex-1">
          <Link
            href={`/jobs/${job.id}`}
            className="line-clamp-1 text-sm font-medium leading-snug hover:text-primary"
            onClick={(e) => e.stopPropagation()}
          >
            {job.title}
          </Link>
          <p className="text-xs text-muted-foreground">{job.company.name}</p>
        </div>
        <GripVertical className="size-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground/80">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
        <span className="rounded-full bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
          {job.matchScore}% match
        </span>
      </div>

      {application.nextStep && (
        <div className="mt-3 flex items-start gap-1.5 rounded-lg border border-border/70 bg-background/40 px-2 py-1.5 text-[11px] text-muted-foreground">
          <CalendarClock className="mt-0.5 size-3 shrink-0 text-primary" />
          <span className="line-clamp-2">{application.nextStep}</span>
        </div>
      )}

      <p className="mt-2 text-[11px] text-muted-foreground/70">
        Updated {timeAgo(application.timeline.at(-1)?.date ?? application.appliedAt)}
      </p>
    </motion.div>
  );
}
