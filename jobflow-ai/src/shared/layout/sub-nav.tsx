"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/shared/utils/cn";
import type { NavItem } from "@/config/navigation";

/** Pill-style secondary navigation with an animated active indicator. */
export function SubNav({ items, layoutId = "subnav" }: { items: NavItem[]; layoutId?: string }) {
  const pathname = usePathname();
  return (
    <nav className="inline-flex items-center gap-1 rounded-full border border-border bg-card/40 p-1">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 ring-1 ring-primary/30"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
