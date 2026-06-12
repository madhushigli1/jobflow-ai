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
      <div className="space-y-5">
        <div>
          <label htmlFor="job" className="label mb-2 block text-muted-foreground">
            Target role
          </label>
          <select
            id="job"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="h-11 w-full border-2 border-foreground bg-card px-3 text-sm font-medium outline-none focus-visible:shadow-brutal-sm"
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title} · {j.company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="label mb-2 block text-muted-foreground">Tone</span>
          <div className="flex">
            {tones.map((t, i) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                aria-pressed={tone === t}
                className={cn(
                  "flex-1 border-2 border-foreground py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                  i > 0 && "border-l-0",
                  tone === t ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:bg-muted",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="highlight" className="label mb-2 block text-muted-foreground">
            Emphasize (optional)
          </label>
          <Input
            id="highlight"
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder="e.g. I led a 0→1 design system"
          />
        </div>

        <Button onClick={generate} variant="accent" disabled={!jobId || generating} className="w-full">
          {generating ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {generating ? "Writing…" : output ? "Regenerate" : "Generate"}
        </Button>
      </div>

      {/* output */}
      <div className="relative min-h-[24rem] border-2 border-foreground bg-card p-6">
        {output && !generating && (
          <button
            onClick={copy}
            className="label absolute right-4 top-4 inline-flex items-center gap-1.5 border-2 border-foreground bg-background px-2.5 py-1.5 text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
        {typed ? (
          <pre className="whitespace-pre-wrap font-serif text-base leading-relaxed text-foreground">
            {typed}
            {generating && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-accent align-middle" />}
          </pre>
        ) : (
          <div className="grid h-80 place-items-center text-center">
            <div className="px-6 text-sm text-muted-foreground">
              <Sparkles className="mx-auto size-6 text-accent" />
              <p className="mt-3">Pick a role and tone — your tailored letter writes itself.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
