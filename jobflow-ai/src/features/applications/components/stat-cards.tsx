"use client";

import { Send, CalendarCheck, Trophy, Flame } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { Application } from "@/shared/types";

export function StatCards({ applications }: { applications: Application[] }) {
  const count = (fn: (a: Application) => boolean) => applications.filter(fn).length;
  const active = count((a) => a.stage === "applied" || a.stage === "interview");
  const interviews = count((a) => a.stage === "interview" || a.stage === "offer");
  const offers = count((a) => a.stage === "offer");

  const stats = [
    {
      label: "Active applications",
      value: active,
      icon: Send,
      tone: "text-accent",
      ring: "from-accent/20",
      hint: "in flight",
    },
    {
      label: "Interviews",
      value: interviews,
      icon: CalendarCheck,
      tone: "text-primary",
      ring: "from-primary/20",
      hint: "scheduled or done",
    },
    {
      label: "Offers",
      value: offers,
      icon: Trophy,
      tone: "text-success",
      ring: "from-success/20",
      hint: "🎉 let's go",
    },
    {
      label: "Total tracked",
      value: applications.length,
      icon: Flame,
      tone: "text-warning",
      ring: "from-warning/20",
      hint: "this search",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5"
        >
          <div
            className={cn(
              "pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br to-transparent blur-2xl",
              s.ring,
            )}
          />
          <div className="flex items-center justify-between">
            <span className={cn("inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background-elevated", s.tone)}>
              <s.icon className="size-4" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold tracking-tight">{s.value}</p>
          <p className="text-sm text-muted-foreground">{s.label}</p>
          <p className="mt-1 text-xs text-muted-foreground/60">{s.hint}</p>
        </div>
      ))}
    </div>
  );
}
