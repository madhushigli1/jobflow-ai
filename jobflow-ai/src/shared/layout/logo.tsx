import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { siteConfig } from "@/config/site";

/** Brand mark: gradient glyph + wordmark. */
export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" aria-hidden>
          <path
            d="M5 13.5 10 18.5 19 6.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="text-[1.05rem] font-semibold tracking-tight">
        Job<span className="text-gradient-brand">Flow</span>
      </span>
    </Link>
  );
}
