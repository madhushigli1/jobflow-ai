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
    <aside className="h-fit border-2 border-foreground bg-card p-5 lg:sticky lg:top-24">
      <div className="flex items-center justify-between border-b border-foreground pb-3">
        <h2 className="label flex items-center gap-2 text-foreground">
          <SlidersHorizontal className="size-4" />
          Filters
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center bg-accent text-[0.65rem] font-semibold text-accent-foreground">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={() => onChange({ ...defaultJobFilters, search: filters.search, sort: filters.sort })}
            className="inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground transition-colors hover:text-accent"
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
          <label htmlFor="salary" className="label text-muted-foreground">
            Min salary
          </label>
          <span className="font-serif text-base text-foreground">
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
          className="mt-3 h-2 w-full cursor-pointer appearance-none border border-foreground bg-muted accent-accent"
        />
      </div>
    </aside>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="label text-muted-foreground">{label}</p>
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
        "border border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
        active
          ? "bg-foreground text-background"
          : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
