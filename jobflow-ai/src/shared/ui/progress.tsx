import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { clamp } from "@/shared/utils/format";

/** Linear progress / meter with gradient fill. */
export function Progress({
  value,
  className,
  tone = "brand",
}: {
  value: number;
  className?: string;
  tone?: "brand" | "success" | "warning";
}) {
  const pct = clamp(value, 0, 100);
  const fill = tone === "warning" ? "bg-muted-foreground" : tone === "success" ? "bg-accent" : "bg-foreground";
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2.5 w-full overflow-hidden border border-foreground bg-card", className)}
    >
      <div
        className={cn("h-full transition-[width] duration-700 ease-out", fill)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
