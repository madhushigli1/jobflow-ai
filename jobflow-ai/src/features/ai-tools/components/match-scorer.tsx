"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Target, Loader2, Check, X } from "lucide-react";
import { Button, Textarea, ScoreRing } from "@/shared/ui";
import { user } from "@/shared/lib/mock-db";
import { scoreMatch, type MatchResult } from "../lib/simulate";

const SAMPLE = `We're hiring a Senior Frontend Engineer to build performant, accessible
interfaces in React, Next.js, and TypeScript. You'll own a design system,
care deeply about performance and Core Web Vitals, and collaborate closely
with design. Tailwind CSS experience is a plus.`;

export function MatchScorer() {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<MatchResult | null>(null);

  async function score() {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1100));
    setResult(scoreMatch(text, user));
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="jd" className="text-sm font-medium">
            Paste a job description
          </label>
          <button onClick={() => setText(SAMPLE)} className="text-xs text-primary hover:underline">
            Use sample
          </button>
        </div>
        <Textarea
          id="jd"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the full job description to score your fit…"
          className="min-h-64"
        />
        <Button onClick={score} disabled={!text.trim() || loading} className="mt-3 w-full">
          {loading ? <Loader2 className="animate-spin" /> : <Target />}
          {loading ? "Scoring…" : "Score my fit"}
        </Button>
      </div>

      <div className="grid min-h-64 place-items-center rounded-2xl border border-border bg-card/40 p-6">
        {loading ? (
          <div className="text-center text-sm text-muted-foreground">
            <Loader2 className="mx-auto size-6 animate-spin text-primary" />
            <p className="mt-3">Comparing against your profile…</p>
          </div>
        ) : result ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center"
          >
            <div className="relative mx-auto w-fit">
              <ScoreRing value={result.score} size={120} stroke={9} showLabel={false} />
              <div className="absolute inset-0 grid place-items-center">
                <div>
                  <span className="text-4xl font-semibold">{result.score}</span>
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{result.summary}</p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-left">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-success">
                  <Check className="size-3.5" /> Matched ({result.matched.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.matched.map((s) => (
                    <span key={s} className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[11px] text-success">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <X className="size-3.5" /> Gaps ({result.missing.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.missing.length ? (
                    result.missing.map((s) => (
                      <span key={s} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-muted-foreground">None — full coverage 🎉</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            <Target className="mx-auto size-6 text-primary/60" />
            <p className="mt-3">Paste a job description to see your match score.</p>
          </div>
        )}
      </div>
    </div>
  );
}
