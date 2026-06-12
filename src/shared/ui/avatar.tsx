import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { initials } from "@/shared/utils/format";

const sizes = {
  sm: "size-8 text-[0.7rem]",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
} as const;

/** Square editorial initials avatar — ink block, mono initials. */
export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center border-2 border-foreground bg-foreground font-mono font-semibold uppercase text-background",
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
