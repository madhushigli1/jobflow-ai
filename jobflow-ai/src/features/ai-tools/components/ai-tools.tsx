"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, PenLine, Target } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { ResumeAnalyzer } from "./resume-analyzer";
import { CoverLetterGenerator } from "./cover-letter-generator";
import { MatchScorer } from "./match-scorer";

const tabs = [
  { id: "resume", label: "Resume Analyzer", icon: FileText, desc: "Score and sharpen your resume", Comp: ResumeAnalyzer },
  { id: "cover", label: "Cover Letter", icon: PenLine, desc: "Generate a tailored letter", Comp: CoverLetterGenerator },
  { id: "match", label: "Match Scorer", icon: Target, desc: "Score your fit for any role", Comp: MatchScorer },
] as const;

export function AiTools() {
  const [active, setActive] = React.useState<(typeof tabs)[number]["id"]>("resume");
  const ActiveComp = tabs.find((t) => t.id === active)!.Comp;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {tabs.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all",
                selected
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-card/30 hover:border-primary/30",
              )}
            >
              {selected && (
                <motion.div
                  layoutId="ai-tab-glow"
                  className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/20 blur-2xl"
                />
              )}
              <span
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-xl border transition-colors",
                  selected
                    ? "border-primary/40 bg-gradient-to-br from-primary to-accent text-white"
                    : "border-border bg-background-elevated text-primary",
                )}
              >
                <t.icon className="size-5" />
              </span>
              <p className="mt-3 font-semibold">{t.label}</p>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card/20 p-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ActiveComp />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
