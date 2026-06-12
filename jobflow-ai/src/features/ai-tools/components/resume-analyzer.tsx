"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wand2, Loader2, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { Button, Textarea, ScoreRing, Progress, Badge } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import { user } from "@/shared/lib/mock-db";
import { analyzeResume, type ResumeAnalysis } from "../lib/simulate";

const SAMPLE = `Senior Frontend Engineer with 6 years building React and Next.js applications.
Led a redesign that improved Core Web Vitals and cut load time 42%.
Shipped a TypeScript design system adopted by 5 teams.
Built accessible, high-performance interfaces with Tailwind CSS.`;

const severityMeta = {
  high: { icon: AlertTriangle, cls: "text-destructive", badge: "destructive" as const },
  medium: { icon: Info, cls: "text-warning", badge: "warning" as const },
  low: { icon: CheckCircle2, cls: "text-success", badge: "success" as const },
};

export function ResumeAnalyzer() {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<ResumeAnalysis | null>(null);

  async function analyze() {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1400));
    setResult(analyzeResume(text, user));
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="resume" className="text-sm font-medium">
            Paste your resume
          </label>
          <button
            onClick={() => setText(SAMPLE)}
            className="text-xs text-primary hover:underline"
          >
            Use sample
          </button>
        </div>
        <Textarea
          id="resume"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your resume text here…"
          className="min-h-64"
        />
        <Button onClick={analyze} disabled={!text.trim() || loading} className="mt-3 w-full">
          {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
          {loading ? "Analyzing…" : "Analyze resume"}
        </Button>
      </div>

      <div className="min-h-64">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid h-full place-items-center rounded-2xl border border-dashed border-border"
            >
              <div className="text-center text-sm text-muted-foreground">
                <Loader2 className="mx-auto size-6 animate-spin text-primary" />
                <p className="mt-3">Scanning for impact, clarity &amp; keywords…</p>
              </div>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5 rounded-2xl border border-border bg-card/40 p-6"
            >
              <div className="flex items-center gap-4">
                <ScoreRing value={result.score} size={72} stroke={6} />
                <div>
                  <p className="text-sm text-muted-foreground">Resume score</p>
                  <p className="text-2xl font-semibold">
                    {result.score}
                    <span className="text-base text-muted-foreground">/100</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {result.categories.map((c) => (
                  <div key={c.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">{c.label}</span>
                      <span className="font-medium">{c.score}</span>
                    </div>
                    <Progress value={c.score} />
                  </div>
                ))}
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Suggestions</p>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => {
                    const m = severityMeta[s.severity];
                    return (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <m.icon className={cn("mt-0.5 size-4 shrink-0", m.cls)} />
                        <span className="text-muted-foreground">{s.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {result.keywords.matched.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {result.keywords.matched.map((k) => (
                    <Badge key={k} variant="success" size="sm">{k}</Badge>
                  ))}
                  {result.keywords.missing.map((k) => (
                    <Badge key={k} variant="outline" size="sm">{k}</Badge>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid h-full place-items-center rounded-2xl border border-dashed border-border text-center"
            >
              <div className="px-6 text-sm text-muted-foreground">
                <Wand2 className="mx-auto size-6 text-primary/60" />
                <p className="mt-3">Your AI resume report will appear here.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
