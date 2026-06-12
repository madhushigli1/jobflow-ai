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
    { label: "Active applications", value: active, icon: Send, hint: "in flight" },
    { label: "Interviews", value: interviews, icon: CalendarCheck, hint: "scheduled or done" },
    { label: "Offers", value: offers, icon: Trophy, hint: "let's go", accent: true },
    { label: "Total tracked", value: applications.length, icon: Flame, hint: "this search" },
  ];

  return (
    <div className="grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className={cn("bg-card p-5", s.accent && "bg-accent text-accent-foreground")}>
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "grid size-9 place-items-center border-2",
                s.accent ? "border-accent-foreground" : "border-foreground bg-background",
              )}
            >
              <s.icon className="size-4" />
            </span>
            <span className={cn("label", s.accent ? "text-accent-foreground/70" : "text-muted-foreground")}>
              {s.hint}
            </span>
          </div>
          <p className="mt-4 font-serif text-5xl font-light tracking-tight">{s.value}</p>
          <p className={cn("label mt-1", s.accent ? "text-accent-foreground/80" : "text-muted-foreground")}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
