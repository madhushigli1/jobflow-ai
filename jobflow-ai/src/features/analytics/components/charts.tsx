"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/shared/utils/cn";

/* ----------------------------------------------------------------
   Lightweight, dependency-free SVG charts tuned for the dark theme.
   ---------------------------------------------------------------- */

interface Series {
  label: string;
  values: number[];
  color: string; // hsl()
}

/** Smooth multi-series area/line chart with gridlines and hover readout. */
export function AreaChart({
  labels,
  series,
  height = 240,
}: {
  labels: string[];
  series: Series[];
  height?: number;
}) {
  const W = 640;
  const H = height;
  const pad = { top: 16, right: 12, bottom: 28, left: 30 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const max = Math.max(...series.flatMap((s) => s.values), 1) * 1.15;
  const [hover, setHover] = React.useState<number | null>(null);

  const x = (i: number) => pad.left + (i / (labels.length - 1)) * innerW;
  const y = (v: number) => pad.top + innerH - (v / max) * innerH;

  const linePath = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const areaPath = (vals: number[]) =>
    `${linePath(vals)} L ${x(vals.length - 1)} ${pad.top + innerH} L ${x(0)} ${pad.top + innerH} Z`;

  const ticks = 4;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label="Applications over time"
      >
        <defs>
          {series.map((s, i) => (
            <linearGradient key={i} id={`area-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* horizontal gridlines + y labels */}
        {Array.from({ length: ticks + 1 }).map((_, i) => {
          const v = (max / ticks) * i;
          const gy = y(v);
          return (
            <g key={i}>
              <line x1={pad.left} y1={gy} x2={W - pad.right} y2={gy} stroke="hsl(230 20% 18%)" strokeWidth="1" />
              <text x={pad.left - 8} y={gy + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
                {Math.round(v)}
              </text>
            </g>
          );
        })}

        {/* areas + lines */}
        {series.map((s, i) => (
          <g key={i}>
            <path d={areaPath(s.values)} fill={`url(#area-${i})`} />
            <motion.path
              d={linePath(s.values)}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </g>
        ))}

        {/* x labels */}
        {labels.map((l, i) => (
          <text key={l} x={x(i)} y={H - 8} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {l}
          </text>
        ))}

        {/* hover interaction */}
        {labels.map((_, i) => (
          <rect
            key={i}
            x={x(i) - innerW / labels.length / 2}
            y={pad.top}
            width={innerW / labels.length}
            height={innerH}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
        ))}
        {hover !== null && (
          <g>
            <line x1={x(hover)} y1={pad.top} x2={x(hover)} y2={pad.top + innerH} stroke="hsl(258 90% 66% / 0.4)" strokeDasharray="3 3" />
            {series.map((s, i) => (
              <circle key={i} cx={x(hover)} cy={y(s.values[hover])} r="4" fill={s.color} stroke="hsl(230 35% 5%)" strokeWidth="2" />
            ))}
          </g>
        )}
      </svg>

      {hover !== null && (
        <div
          className="pointer-events-none absolute top-2 z-10 rounded-lg border border-border bg-background-elevated/95 px-3 py-2 text-xs shadow-xl backdrop-blur"
          style={{ left: `${(x(hover) / W) * 100}%`, transform: "translateX(-50%)" }}
        >
          <p className="font-medium">{labels[hover]}</p>
          {series.map((s) => (
            <p key={s.label} className="mt-0.5 flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: s.color }} />
              {s.label}: <span className="font-medium text-foreground">{s.values[hover]}</span>
            </p>
          ))}
        </div>
      )}

      <div className="mt-3 flex justify-center gap-5">
        {series.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2.5 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Donut chart with center total and legend. */
export function DonutChart({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const size = 180;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {data.map((d, i) => {
            const len = (d.value / total) * circ;
            const seg = (
              <motion.circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={stroke}
                strokeDasharray={`${len} ${circ - len}`}
                strokeDashoffset={-offset}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            );
            offset += len;
            return seg;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{total}</span>
          <span className="text-xs text-muted-foreground">total</span>
        </div>
      </div>
      <ul className="space-y-2">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="ml-auto font-medium">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Horizontal funnel with animated bars and conversion percentages. */
export function FunnelChart({ data }: { data: { stage: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const colors = ["hsl(199 92% 56%)", "hsl(234 89% 64%)", "hsl(258 90% 66%)", "hsl(152 60% 48%)"];
  return (
    <div className="space-y-3">
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        const conv = i === 0 ? 100 : Math.round((d.value / data[0].value) * 100);
        return (
          <div key={d.stage}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{d.stage}</span>
              <span className="font-medium">
                {d.value}
                <span className="ml-1.5 text-xs text-muted-foreground">{conv}%</span>
              </span>
            </div>
            <div className="h-7 overflow-hidden rounded-lg bg-muted">
              <motion.div
                className="h-full rounded-lg"
                style={{ background: colors[i % colors.length] }}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Tiny inline bar for a metric tile. */
export function MiniBars({ values, className }: { values: number[]; className?: string }) {
  const max = Math.max(...values, 1);
  return (
    <div className={cn("flex h-10 items-end gap-1", className)}>
      {values.map((v, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-primary"
          initial={{ height: 0 }}
          whileInView={{ height: `${(v / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}
