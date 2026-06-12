import * as React from "react";
import { cn } from "@/shared/utils/cn";

/** Centered max-width container with responsive gutters. */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}

/** Vertical section rhythm wrapper. */
export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-20 sm:py-28", className)} {...props} />;
}

/** Small eyebrow label used above section headings. */
export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary",
        className,
      )}
      {...props}
    />
  );
}
