"use client";

import * as React from "react";
import { TrendingUp, MessageSquare, Trophy, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { api, type AnalyticsSummary } from "@/shared/lib/api-client";
import { Skeleton, ScoreRing } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import { AreaChart, DonutChart, FunnelChart, MiniBars } from "./charts";

export function AnalyticsView() {
  const [data, setData] = React.useState<AnalyticsSummary | null>(null);

  React.useEffect(() => {
    let active = true;
    api.analytics.summary().then((d) => active && setData(d));
    return () => {
      active = false;
    };
  }, []);

  if (!data) return <AnalyticsSkeleton />;

  const metrics = [
    {
      label: "Response rate",
      value: `${data.responseRate}%`,
      icon: MessageSquare,
      trend: data.weekly.map((w) => w.applications),
    },
    {
      label: "Interview rate",
      value: `${data.interviewRate}%`,
      icon: TrendingUp,
      trend: data.weekly.map((w) => w.interviews + 1),
    },
    {
      label: "Offer rate",
      value: `${data.offerRate}%`,
      icon: Trophy,
      accent: true,
      trend: [1, 1, 2, 2, 3, 3, 4, 5],
    },
  ];

  return (
    <div className="space-y-6">
      {/* metric tiles */}
      <div className="grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className={cn("bg-card p-5", m.accent && "bg-accent text-accent-foreground")}>
            <div className="flex items-start justify-between">
              <div>
                <p className={cn("label", m.accent ? "text-accent-foreground/80" : "text-muted-foreground")}>{m.label}</p>
                <p className="mt-2 font-serif text-5xl font-light tracking-tight">{m.value}</p>
              </div>
              <span
                className={cn(
                  "inline-flex size-9 items-center justify-center border-2",
                  m.accent ? "border-accent-foreground" : "border-foreground bg-background",
                )}
              >
                <m.icon className="size-4" />
              </span>
            </div>
            <MiniBars values={m.trend} className="mt-4" />
          </div>
        ))}
      </div>

      {/* main chart */}
      <div className="border-2 border-foreground bg-card p-6">
        <div className="flex items-center justify-between border-b border-foreground pb-4">
          <div>
            <h2 className="font-serif text-2xl">Application activity</h2>
            <p className="label mt-1 text-muted-foreground">Applications &amp; interviews · last 8 weeks</p>
          </div>
        </div>
        <div className="mt-5">
          <AreaChart
            labels={data.weekly.map((w) => w.week)}
            series={[
              { label: "Applications", values: data.weekly.map((w) => w.applications), color: "hsl(var(--foreground))" },
              { label: "Interviews", values: data.weekly.map((w) => w.interviews), color: "hsl(var(--accent))" },
            ]}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* funnel */}
        <div className="border-2 border-foreground bg-card p-6">
          <h2 className="font-serif text-2xl">Conversion funnel</h2>
          <p className="label mt-1 text-muted-foreground">How applications progress to offers</p>
          <div className="mt-6">
            <FunnelChart data={data.funnel} />
          </div>
        </div>

        {/* donut */}
        <div className="border-2 border-foreground bg-card p-6">
          <h2 className="font-serif text-2xl">Applications by work mode</h2>
          <p className="label mt-1 text-muted-foreground">Where you&apos;re focusing your search</p>
          <div className="mt-6">
            <DonutChart
              data={[
                { label: "Remote", value: data.byWorkMode[0].value, color: "hsl(var(--foreground))" },
                { label: "Hybrid", value: data.byWorkMode[1].value, color: "hsl(var(--accent))" },
                { label: "On-site", value: data.byWorkMode[2].value, color: "hsl(var(--foreground) / 0.35)" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* top matches */}
      <div className="border-2 border-foreground bg-card p-6">
        <h2 className="font-serif text-2xl">Your top matches</h2>
        <p className="label mt-1 text-muted-foreground">Highest-fit roles you haven&apos;t applied to yet</p>
        <ul className="mt-5 border-t border-foreground">
          {data.topMatches.map((m) => (
            <li key={m.id} className="border-b border-foreground">
              <Link
                href={`/jobs/${m.id}`}
                className="group flex items-center gap-4 py-3 transition-colors hover:text-accent"
              >
                <span className="grid size-10 shrink-0 place-items-center border-2 border-foreground bg-foreground font-serif text-sm text-background">
                  {m.company.logo}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{m.title}</p>
                  <p className="label text-muted-foreground">{m.company.name}</p>
                </div>
                <ScoreRing value={m.matchScore} size={40} stroke={4} />
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}
