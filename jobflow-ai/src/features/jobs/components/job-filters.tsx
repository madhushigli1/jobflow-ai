"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { formatSalary } from "@/shared/utils/format";
import {
  type JobFilters,
  workModeOptions,
  typeOptions,
  levelOptions,
  defaultJobFilters,
} from "../types";

interface Props {
  filters: JobFilters;
  onChange: (next: JobFilters) => void;
}

export function JobFiltersPanel({ filters, onChange }: Props) {
  const activeCount =
    filters.workMode.length +
    filters.type.length +
    filters.level.length +
    (filters.minSalary > 0 ? 1 : 0);

  function toggle<K extends "workMode" | "type" | "level">(
    key: K,
    value: JobFilters[K][number],
  ) {
    const list = filters[key] as string[];
    const next = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    onChange({ ...filters, [key]: next });
  }

  return (
    <aside className="glass h-fit rounded-2xl p-5 lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="size-4 text-primary" />
          Filters
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={() => onChange({ ...defaultJobFilters, search: filters.search, sort: filters.sort })}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3" /> Clear
          </button>
        )}
      </div>

      <FilterGroup label="Work mode">
        {workModeOptions.map((opt) => (
          <Pill key={opt} active={filters.workMode.includes(opt)} onClick={() => toggle("workMode", opt)}>
            {opt}
          </Pill>
        ))}
      </FilterGroup>

      <FilterGroup label="Employment type">
        {typeOptions.map((opt) => (
          <Pill key={opt} active={filters.type.includes(opt)} onClick={() => toggle("type", opt)}>
            {opt}
          </Pill>
        ))}
      </FilterGroup>

      <FilterGroup label="Seniority">
        {levelOptions.map((opt) => (
          <Pill key={opt} active={filters.level.includes(opt)} onClick={() => toggle("level", opt)}>
            {opt}
          </Pill>
        ))}
      </FilterGroup>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label htmlFor="salary" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Min salary
          </label>
          <span className="text-sm font-medium text-primary">
            {filters.minSalary === 0 ? "Any" : formatSalary(filters.minSalary, filters.minSalary)}
          </span>
        </div>
        <input
          id="salary"
          type="range"
          min={0}
          max={250000}
          step={10000}
          value={filters.minSalary}
          onChange={(e) => onChange({ ...filters, minSalary: Number(e.target.value) })}
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        />
      </div>
    </aside>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-all",
        active
          ? "border-primary/50 bg-primary/15 text-primary"
          : "border-border bg-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
