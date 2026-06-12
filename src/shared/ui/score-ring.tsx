"use client";

import { motion } from "motion/react";
import { cn } from "@/shared/utils/cn";

/** Animated circular match-score ring (0–100). Color shifts with the score. */
export function ScoreRing({
  value,
  size = 56,
  stroke = 5,
  className,
  showLabel = true,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  showLabel?: boolean;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circ - (pct / 100) * circ;
  // Editorial: ink track, red arc; only standout scores fill red, else ink.
  const color = pct >= 85 ? "hsl(var(--accent))" : "hsl(var(--foreground))";

  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--foreground) / 0.15)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="butt"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-mono text-xs font-semibold" style={{ color }}>
            {Math.round(pct)}
          </span>
        </div>
      )}
    </div>
  );
}
