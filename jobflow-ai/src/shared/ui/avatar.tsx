import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { initials } from "@/shared/utils/format";

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
} as const;

/** Gradient initials avatar — deterministic hue from the name. */
export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const hue = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-1 ring-white/10",
        sizes[size],
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 80% 58%), hsl(${(hue + 50) % 360} 80% 52%))`,
      }}
    >
      {initials(name)}
    </span>
  );
}
