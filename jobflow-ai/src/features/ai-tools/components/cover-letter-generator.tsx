"use client";

import * as React from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { Button, Input } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import { api } from "@/shared/lib/api-client";
import { user } from "@/shared/lib/mock-db";
import type { Job } from "@/shared/types";
import { generateCoverLetter, type Tone } from "../lib/simulate";

const tones: Tone[] = ["Professional", "Friendly", "Bold"];

export function CoverLetterGenerator() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [jobId, setJobId] = React.useState("");
  const [tone, setTone] = React.useState<Tone>("Professional");
  const [highlight, setHighlight] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [typed, setTyped] = React.useState("");
  const [generating, setGenerating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    api.jobs.list().then((res) => {
      setJobs(res.data);
      setJobId(res.data[0]?.id ?? "");
    });
  }, []);

  // Typewriter reveal of the generated letter.
  React.useEffect(() => {
    if (!output) return;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i += 4;
      setTyped(output.slice(0, i));
      if (i >= output.length) {
        clearInterval(id);
        setGenerating(false);
      }
    }, 16);
    return () => clearInterval(id);
  }, [output]);

  async function generate() {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    setGenerating(true);
    setOutput("");
    setTyped("");
    await new Promise((r) => setTimeout(r, 700));
    setOutput(
      generateCoverLetter({
        jobTitle: job.title,
        company: job.company.name,
        tone,
        profile: user,
        highlight,
      }),
    );
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* controls */}
      <div className="space-y-4">
        <div>
          <label htmlFor="job" className="mb-1.5 block text-sm font-medium">
            Target role
          </label>
          <select
            id="job"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="h-11 w-full rounded-xl border border-input bg-background-elevated/60 px-3 text-sm outline-none focus-visible:border-primary/60"
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id} className="bg-background">
                {j.title} · {j.company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium">Tone</span>
          <div className="flex gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                aria-pressed={tone === t}
                className={cn(
                  "flex-1 rounded-xl border px-3 py-2 text-sm transition-all",
                  tone === t
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="highlight" className="mb-1.5 block text-sm font-medium">
            Something to emphasize <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="highlight"
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder="e.g. I led a 0→1 design system"
          />
        </div>

        <Button onClick={generate} disabled={!jobId || generating} className="w-full">
          {generating ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {generating ? "Writing…" : output ? "Regenerate" : "Generate cover letter"}
        </Button>
      </div>

      {/* output */}
      <div className="relative min-h-[24rem] rounded-2xl border border-border bg-card/40 p-6">
        {output && !generating && (
          <button
            onClick={copy}
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
        {typed ? (
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
            {typed}
            {generating && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-primary align-middle" />}
          </pre>
        ) : (
          <div className="grid h-80 place-items-center text-center">
            <div className="px-6 text-sm text-muted-foreground">
              <Sparkles className="mx-auto size-6 text-primary/60" />
              <p className="mt-3">Pick a role and tone — your tailored letter writes itself.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
