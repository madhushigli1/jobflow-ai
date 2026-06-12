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
      <div className="grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-3">
        {tabs.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "group relative p-5 text-left transition-colors",
                selected ? "bg-accent text-accent-foreground" : "bg-card hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-10 items-center justify-center border-2 transition-colors",
                  selected ? "border-accent-foreground" : "border-foreground bg-background",
                )}
              >
                <t.icon className="size-5" />
              </span>
              <p className="mt-3 font-serif text-xl">{t.label}</p>
              <p className={cn("label mt-1", selected ? "text-accent-foreground/80" : "text-muted-foreground")}>
                {t.desc}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-2 border-foreground bg-card p-5 sm:p-6">
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
