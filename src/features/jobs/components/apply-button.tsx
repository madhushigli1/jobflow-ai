"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, Bookmark } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function ApplyButton({ className }: { className?: string }) {
  const [applied, setApplied] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  return (
    <div className={cn("space-y-2.5", className)}>
      <button
        onClick={() => setApplied((v) => !v)}
        className={cn(
          "relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden border-2 border-foreground text-xs font-semibold uppercase tracking-[0.06em] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]",
          applied
            ? "bg-foreground text-background shadow-[4px_4px_0_0_hsl(var(--accent))] hover:shadow-[2px_2px_0_0_hsl(var(--accent))] active:shadow-none"
            : "bg-accent text-accent-foreground shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_0_hsl(var(--foreground))] active:shadow-none",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {applied ? (
            <motion.span
              key="applied"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2"
            >
              <Check className="size-4" /> Application submitted
            </motion.span>
          ) : (
            <motion.span
              key="apply"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2"
            >
              <Zap className="size-4" /> One-click apply
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <button
        onClick={() => setSaved((v) => !v)}
        className={cn(
          "flex h-11 w-full items-center justify-center gap-2 border-2 border-foreground text-xs font-semibold uppercase tracking-[0.06em] transition-colors",
          saved ? "bg-foreground text-background" : "bg-card text-foreground hover:bg-muted",
        )}
      >
        <Bookmark className={cn("size-4", saved && "fill-background")} />
        {saved ? "Saved to board" : "Save for later"}
      </button>
    </div>
  );
}
