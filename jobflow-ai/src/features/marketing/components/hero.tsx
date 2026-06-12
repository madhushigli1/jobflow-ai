"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Container, ScoreRing } from "@/shared/ui";
import { buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28">
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Link
              href="/ai-tools"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Sparkles className="size-3 text-white" />
              </span>
              New — AI cover letters &amp; match scoring
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
            className="mt-7 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            Land your next role,
            <br />
            <span className="text-gradient">on autopilot.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.14 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            JobFlow AI matches you to the right jobs, tracks every application in one
            board, and writes tailored cover letters — so you spend time interviewing,
            not organizing spreadsheets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/jobs" className={cn(buttonVariants({ size: "lg" }), "group w-full sm:w-auto")}>
              Find your match
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "glass", size: "lg" }), "w-full sm:w-auto")}
            >
              See the dashboard
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {["from-violet-500 to-indigo-500", "from-rose-500 to-orange-500", "from-emerald-400 to-teal-500", "from-sky-400 to-blue-600"].map(
                (g, i) => (
                  <span
                    key={i}
                    className={cn("size-7 rounded-full bg-gradient-to-br ring-2 ring-background", g)}
                  />
                ),
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-warning text-warning" />
              <span className="font-medium text-foreground">4.9</span> from 12,000+ job seekers
            </div>
          </motion.div>
        </div>

        <HeroPreview />
      </Container>
    </section>
  );
}

/** Stylized product preview window with a matched job card and mini pipeline. */
function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.3 }}
      style={{ perspective: 1200 }}
      className="relative mx-auto mt-16 max-w-5xl"
    >
      <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[2rem] bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />
      <div className="glass-strong overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/50">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border/80 px-4 py-3">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-warning/70" />
          <span className="size-3 rounded-full bg-success/70" />
          <div className="ml-3 flex h-7 flex-1 items-center rounded-md bg-background/60 px-3 text-xs text-muted-foreground">
            jobflow.ai/dashboard
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-5 sm:p-6">
          {/* left: top match card */}
          <div className="border-gradient rounded-xl p-5 sm:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Top match for you</p>
                <p className="mt-1 font-semibold">Senior Frontend Engineer</p>
                <p className="text-sm text-muted-foreground">Vercel · Remote</p>
              </div>
              <ScoreRing value={96} size={52} />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["React", "Next.js", "TypeScript"].map((t) => (
                <span key={t} className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 h-9 rounded-full bg-gradient-to-r from-primary to-accent text-center text-sm font-medium leading-9 text-white">
              One-click apply
            </div>
          </div>

          {/* right: mini kanban */}
          <div className="grid grid-cols-3 gap-3 sm:col-span-3">
            {[
              { label: "Applied", n: 5, color: "bg-accent" },
              { label: "Interview", n: 2, color: "bg-primary" },
              { label: "Offer", n: 1, color: "bg-success" },
            ].map((col) => (
              <div key={col.label} className="rounded-xl border border-border bg-background/40 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={cn("size-1.5 rounded-full", col.color)} />
                  {col.label}
                  <span className="ml-auto">{col.n}</span>
                </div>
                <div className="mt-2 space-y-2">
                  {Array.from({ length: col.n > 2 ? 2 : col.n }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-border/70 bg-card/60 p-2">
                      <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/30" />
                      <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-muted-foreground/20" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
