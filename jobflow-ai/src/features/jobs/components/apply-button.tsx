"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, Bookmark } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function ApplyButton({ className }: { className?: string }) {
  const [applied, setApplied] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      <button
        onClick={() => setApplied((v) => !v)}
        className={cn(
          "relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all active:scale-[0.98]",
          applied
            ? "bg-success text-success-foreground"
            : "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110",
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
          "flex h-11 w-full items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors",
          saved
            ? "border-primary/50 bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
        )}
      >
        <Bookmark className={cn("size-4", saved && "fill-primary")} />
        {saved ? "Saved to board" : "Save for later"}
      </button>
    </div>
  );
}
