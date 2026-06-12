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
  const fill =
    tone === "success"
      ? "from-success to-success"
      : tone === "warning"
        ? "from-warning to-warning"
        : "from-primary to-accent";
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full bg-gradient-to-r transition-[width] duration-700 ease-out", fill)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
