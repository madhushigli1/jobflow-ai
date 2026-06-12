import Link from "next/link";
import { MapPin, Users, Clock, ArrowUpRight } from "lucide-react";
import { Badge, ScoreRing } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import { formatSalary, timeAgo } from "@/shared/utils/format";
import type { Job } from "@/shared/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:glow-soft",
        job.featured && "border-primary/30",
      )}
    >
      {job.featured && (
        <span className="absolute -top-2 left-5 rounded-full bg-gradient-to-r from-primary to-accent px-2.5 py-0.5 text-[11px] font-medium text-white shadow-lg shadow-primary/30">
          Featured
        </span>
      )}

      <div className="flex items-start gap-4">
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-xl font-bold text-white shadow-inner ring-1 ring-white/10",
            job.company.brand,
          )}
        >
          {job.company.logo}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold leading-snug group-hover:text-primary">
            {job.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {job.company.name} · {job.company.industry}
          </p>
        </div>

        <ScoreRing value={job.matchScore} size={48} stroke={4} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" /> {timeAgo(job.postedAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="size-3.5" /> {job.applicants}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge variant="primary" size="sm">
          {job.workMode}
        </Badge>
        <Badge size="sm">{job.type}</Badge>
        {job.tags.slice(0, 2).map((t) => (
          <Badge key={t} variant="outline" size="sm">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
        <span className="font-semibold text-foreground">
          {formatSalary(job.salaryMin, job.salaryMax)}
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            {job.type === "Internship" ? "/mo" : "/yr"}
          </span>
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          View role <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
