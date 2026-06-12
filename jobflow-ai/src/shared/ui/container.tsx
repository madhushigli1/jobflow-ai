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

/** Editorial eyebrow label — mono, uppercase, with a red tick. */
export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("label inline-flex items-center gap-2 text-foreground", className)} {...props}>
      <span className="inline-block size-2 bg-accent" aria-hidden />
      {children}
    </span>
  );
}
