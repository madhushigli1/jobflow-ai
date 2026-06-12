"use client";

import * as React from "react";
import { api } from "@/shared/lib/api-client";
import type { Job } from "@/shared/types";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import type { JobFilters } from "../types";

/**
 * Fetches jobs for the given filters via the api client.
 * Search is debounced; every other filter change refetches immediately.
 */
export function useJobs(filters: JobFilters) {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const debouncedSearch = useDebouncedValue(filters.search, 300);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    api.jobs
      .list({
        search: debouncedSearch,
        workMode: filters.workMode,
        type: filters.type,
        level: filters.level,
        minSalary: filters.minSalary,
        sort: filters.sort,
      })
      .then((res) => {
        if (active) {
          setJobs(res.data);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    filters.workMode,
    filters.type,
    filters.level,
    filters.minSalary,
    filters.sort,
  ]);

  return { jobs, loading };
}
