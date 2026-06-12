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
      tone: "text-accent",
      trend: data.weekly.map((w) => w.applications),
    },
    {
      label: "Interview rate",
      value: `${data.interviewRate}%`,
      icon: TrendingUp,
      tone: "text-primary",
      trend: data.weekly.map((w) => w.interviews + 1),
    },
    {
      label: "Offer rate",
      value: `${data.offerRate}%`,
      icon: Trophy,
      tone: "text-success",
      trend: [1, 1, 2, 2, 3, 3, 4, 5],
    },
  ];

  return (
    <div className="space-y-6">
      {/* metric tiles */}
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-card/40 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">{m.value}</p>
              </div>
              <span className={cn("inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background-elevated", m.tone)}>
                <m.icon className="size-4" />
              </span>
            </div>
            <MiniBars values={m.trend} className="mt-4" />
          </div>
        ))}
      </div>

      {/* main chart */}
      <div className="rounded-2xl border border-border bg-card/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Application activity</h2>
            <p className="text-sm text-muted-foreground">Applications &amp; interviews over the last 8 weeks</p>
          </div>
        </div>
        <div className="mt-5">
          <AreaChart
            labels={data.weekly.map((w) => w.week)}
            series={[
              { label: "Applications", values: data.weekly.map((w) => w.applications), color: "hsl(258 90% 66%)" },
              { label: "Interviews", values: data.weekly.map((w) => w.interviews), color: "hsl(199 92% 56%)" },
            ]}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* funnel */}
        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="font-semibold">Conversion funnel</h2>
          <p className="text-sm text-muted-foreground">How applications progress to offers</p>
          <div className="mt-6">
            <FunnelChart data={data.funnel} />
          </div>
        </div>

        {/* donut */}
        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="font-semibold">Applications by work mode</h2>
          <p className="text-sm text-muted-foreground">Where you&apos;re focusing your search</p>
          <div className="mt-6">
            <DonutChart
              data={[
                { label: "Remote", value: data.byWorkMode[0].value, color: "hsl(258 90% 66%)" },
                { label: "Hybrid", value: data.byWorkMode[1].value, color: "hsl(199 92% 56%)" },
                { label: "On-site", value: data.byWorkMode[2].value, color: "hsl(234 89% 64%)" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* top matches */}
      <div className="rounded-2xl border border-border bg-card/40 p-6">
        <h2 className="font-semibold">Your top matches</h2>
        <p className="text-sm text-muted-foreground">Highest-fit roles you haven&apos;t applied to yet</p>
        <ul className="mt-5 divide-y divide-border">
          {data.topMatches.map((m) => (
            <li key={m.id}>
              <Link
                href={`/jobs/${m.id}`}
                className="group flex items-center gap-4 py-3 transition-colors hover:text-primary"
              >
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-sm font-bold text-white ring-1 ring-white/10", m.company.brand)}>
                  {m.company.logo}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.company.name}</p>
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
