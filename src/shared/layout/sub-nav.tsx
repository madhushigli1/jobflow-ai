"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/shared/utils/cn";
import type { NavItem } from "@/config/navigation";

/** Editorial secondary nav — square tabs, active filled in ink. */
export function SubNav({ items, layoutId = "subnav" }: { items: NavItem[]; layoutId?: string }) {
  const pathname = usePathname();
  return (
    <nav className="inline-flex items-center border-2 border-foreground bg-card">
      {items.map((item, i) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "label relative px-5 py-2.5 transition-colors",
              i > 0 && "border-l-2 border-foreground",
              active ? "text-background" : "text-foreground hover:bg-muted",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 bg-foreground"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
