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
        "group cursor-grab border border-foreground bg-card p-3.5 transition-shadow active:cursor-grabbing hover:shadow-brutal-sm",
        dragging && "shadow-brutal-sm",
      )}
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center border-2 border-foreground bg-foreground font-serif text-sm text-background">
          {job.company.logo}
        </span>
        <div className="min-w-0 flex-1">
          <Link
            href={`/jobs/${job.id}`}
            className="line-clamp-1 text-sm font-semibold leading-snug hover:text-accent"
            onClick={(e) => e.stopPropagation()}
          >
            {job.title}
          </Link>
          <p className="label text-muted-foreground">{job.company.name}</p>
        </div>
        <GripVertical className="size-4 shrink-0 text-foreground/30 transition-colors group-hover:text-foreground" />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-serif text-sm">{formatSalary(job.salaryMin, job.salaryMax)}</span>
        <span className="border border-foreground bg-accent px-1.5 py-0.5 font-mono text-[0.6rem] font-medium uppercase text-accent-foreground">
          {job.matchScore}% match
        </span>
      </div>

      {application.nextStep && (
        <div className="mt-3 flex items-start gap-1.5 border border-foreground bg-background px-2 py-1.5 text-[0.7rem] text-muted-foreground">
          <CalendarClock className="mt-0.5 size-3 shrink-0 text-accent" />
          <span className="line-clamp-2">{application.nextStep}</span>
        </div>
      )}

      <p className="label mt-2.5 text-muted-foreground/70">
        Updated {timeAgo(application.timeline.at(-1)?.date ?? application.appliedAt)}
      </p>
    </motion.div>
  );
}
