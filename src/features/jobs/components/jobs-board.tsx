"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SearchX } from "lucide-react";
import { Container, Skeleton, Select } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import { useJobs } from "../hooks/use-jobs";
import { defaultJobFilters, type JobFilters, type JobSort } from "../types";
import { JobCard } from "./job-card";
import { JobFiltersPanel } from "./job-filters";

const sortLabels: Record<JobSort, string> = {
  match: "Best match",
  recent: "Most recent",
  salary: "Highest salary",
};

export function JobsBoard() {
  const [filters, setFilters] = React.useState<JobFilters>(defaultJobFilters);
  const { jobs, loading } = useJobs(filters);

  return (
    <Container className="py-10">
      {/* search + sort bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground" />
          <input
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            placeholder="Search roles, companies, skills…"
            className="h-12 w-full border-2 border-foreground bg-card pl-11 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus-visible:shadow-brutal-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span id="sort-label" className="label text-muted-foreground">
            Sort
          </span>
          <Select<JobSort>
            labelledBy="sort-label"
            align="end"
            value={filters.sort}
            onChange={(sort) => setFilters((f) => ({ ...f, sort }))}
            options={(Object.keys(sortLabels) as JobSort[]).map((s) => ({
              value: s,
              label: sortLabels[s],
            }))}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <JobFiltersPanel filters={filters} onChange={setFilters} />

        <div>
          <div className="label mb-4 flex items-center justify-between text-muted-foreground">
            <span aria-live="polite">
              {loading ? "Searching…" : `${jobs.length} role${jobs.length === 1 ? "" : "s"} found`}
            </span>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <EmptyState onReset={() => setFilters(defaultJobFilters)} />
          ) : (
            <motion.div layout className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </Container>
  );
}

function JobCardSkeleton() {
  return (
    <div className="border border-foreground bg-card p-5">
      <div className="flex items-start gap-4">
        <Skeleton className="size-12" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="size-11 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-3 w-2/3" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="mt-5 h-4 w-1/3" />
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid place-items-center border-2 border-dashed border-foreground bg-card py-20 text-center">
      <span className="grid size-14 place-items-center border-2 border-foreground bg-background text-foreground">
        <SearchX className="size-6" />
      </span>
      <h3 className="mt-4 font-serif text-2xl">No roles match your filters</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Try widening your search or clearing a few filters to see more opportunities.
      </p>
      <button
        onClick={onReset}
        className={cn(
          "press mt-5 border-2 border-foreground bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-accent-foreground shadow-brutal-sm",
        )}
      >
        Reset filters
      </button>
    </div>
  );
}
