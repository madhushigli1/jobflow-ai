import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { siteConfig } from "@/config/site";

/** Brand mark: ink square + wordmark with a red full-stop. */
export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="grid size-8 place-items-center border-2 border-foreground bg-foreground transition-transform group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="size-4 text-background" fill="none" aria-hidden>
          <path
            d="M5 13.5 10 18.5 19 6.5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">
        JobFlow<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
