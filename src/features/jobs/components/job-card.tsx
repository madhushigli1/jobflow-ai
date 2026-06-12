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
        "group relative flex flex-col border border-foreground bg-card p-5 transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal",
        job.featured && "border-2",
      )}
    >
      {job.featured && (
        <span className="absolute -top-px right-4 border-x border-b border-foreground bg-accent px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-accent-foreground">
          Featured
        </span>
      )}

      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center border-2 border-foreground bg-foreground font-serif text-xl text-background">
          {job.company.logo}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-serif text-xl leading-snug group-hover:text-accent">
            {job.title}
          </h3>
          <p className="label mt-1 text-muted-foreground">
            {job.company.name} · {job.company.industry}
          </p>
        </div>

        <ScoreRing value={job.matchScore} size={46} stroke={4} />
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
        <Badge variant="primary" size="sm">{job.workMode}</Badge>
        <Badge size="sm">{job.type}</Badge>
        {job.tags.slice(0, 2).map((t) => (
          <Badge key={t} variant="outline" size="sm">{t}</Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-foreground pt-4">
        <span className="font-serif text-lg">
          {formatSalary(job.salaryMin, job.salaryMax)}
          <span className="ml-1 font-sans text-xs text-muted-foreground">
            {job.type === "Internship" ? "/mo" : "/yr"}
          </span>
        </span>
        <span className="label inline-flex items-center gap-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">
          View <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
