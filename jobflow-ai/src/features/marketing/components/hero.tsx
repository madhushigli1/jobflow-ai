"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Container, ScoreRing } from "@/shared/ui";
import { buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-foreground">
      <Container className="relative pt-16 pb-14 sm:pt-24">
        {/* top meta rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between border-b border-foreground pb-3"
        >
          <span className="label text-foreground">No. 01 — The Job Platform</span>
          <span className="label hidden text-muted-foreground sm:block">Est. 2026 · Remote-First</span>
        </motion.div>

        <div className="mx-auto max-w-4xl pt-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="label inline-flex items-center gap-2 text-foreground"
          >
            <span className="size-2 bg-accent" /> AI-Powered Job Search
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
            className="mt-6 font-serif text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
          >
            Land your next
            <br />
            role, <span className="italic text-accent">on autopilot.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.14 }}
            className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            JobFlow matches you to the right jobs, tracks every application in one
            board, and writes tailored cover letters — so you spend time interviewing,
            not organizing spreadsheets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/jobs" className={cn(buttonVariants({ variant: "accent", size: "lg" }), "group w-full sm:w-auto")}>
              Find your match
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-auto")}
            >
              See the dashboard
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-accent text-accent" />
              ))}
            </span>
            <span className="font-medium text-foreground">4.9</span> · loved by 12,000+ job seekers
          </motion.div>
        </div>

        <HeroPreview />
      </Container>
    </section>
  );
}

/** Framed, monochrome product preview — ink borders, hard shadow. */
function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.3 }}
      className="relative mx-auto mt-16 max-w-5xl"
    >
      <div className="border-2 border-foreground bg-card shadow-brutal-lg">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-3">
          <span className="size-3 border-2 border-foreground" />
          <span className="size-3 border-2 border-foreground" />
          <span className="size-3 border-2 border-foreground bg-accent" />
          <div className="ml-3 flex h-7 flex-1 items-center border border-foreground bg-background px-3 font-mono text-xs text-muted-foreground">
            jobflow.ai/dashboard
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-5 sm:p-6">
          {/* top match */}
          <div className="border-2 border-foreground bg-background p-5 sm:col-span-2">
            <div className="flex items-start justify-between">
              <div className="text-left">
                <p className="label text-muted-foreground">Top match</p>
                <p className="mt-1 font-serif text-xl">Senior Frontend Engineer</p>
                <p className="text-sm text-muted-foreground">Vercel · Remote</p>
              </div>
              <ScoreRing value={96} size={52} />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["React", "Next.js", "TypeScript"].map((t) => (
                <span key={t} className="border border-foreground px-2 py-0.5 font-mono text-[0.65rem] uppercase">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 border-2 border-foreground bg-accent py-2 text-center text-xs font-semibold uppercase tracking-wide text-accent-foreground">
              One-click apply
            </div>
          </div>

          {/* mini kanban */}
          <div className="grid grid-cols-3 gap-3 sm:col-span-3">
            {[
              { label: "Applied", n: 5 },
              { label: "Interview", n: 2 },
              { label: "Offer", n: 1, accent: true },
            ].map((col) => (
              <div key={col.label} className="border border-foreground bg-background p-3">
                <div className="label flex items-center justify-between text-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className={cn("size-1.5", col.accent ? "bg-accent" : "bg-foreground")} />
                    {col.label}
                  </span>
                  <span>{col.n}</span>
                </div>
                <div className="mt-2 space-y-2">
                  {Array.from({ length: col.n > 2 ? 2 : col.n }).map((_, i) => (
                    <div key={i} className="border border-foreground bg-card p-2">
                      <div className="h-1.5 w-3/4 bg-foreground/70" />
                      <div className="mt-1.5 h-1.5 w-1/2 bg-foreground/30" />
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
