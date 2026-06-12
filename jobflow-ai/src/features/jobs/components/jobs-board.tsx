"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SearchX } from "lucide-react";
import { Container, Skeleton } from "@/shared/ui";
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
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            placeholder="Search roles, companies, skills…"
            className="h-12 w-full rounded-xl border border-input bg-background-elevated/60 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-muted-foreground">
            Sort
          </label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as JobSort }))}
            className="h-12 rounded-xl border border-input bg-background-elevated/60 px-3 text-sm outline-none focus-visible:border-primary/60"
          >
            {(Object.keys(sortLabels) as JobSort[]).map((s) => (
              <option key={s} value={s} className="bg-background">
                {sortLabels[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <JobFiltersPanel filters={filters} onChange={setFilters} />

        <div>
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
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
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
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
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <div className="flex items-start gap-4">
        <Skeleton className="size-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="size-12 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-3 w-2/3" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="mt-5 h-4 w-1/3" />
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card/30 py-20 text-center">
      <span className="grid size-14 place-items-center rounded-2xl border border-border bg-background-elevated text-muted-foreground">
        <SearchX className="size-6" />
      </span>
      <h3 className="mt-4 font-semibold">No roles match your filters</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Try widening your search or clearing a few filters to see more opportunities.
      </p>
      <button
        onClick={onReset}
        className={cn(
          "mt-5 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-primary-foreground",
        )}
      >
        Reset filters
      </button>
    </div>
  );
}
