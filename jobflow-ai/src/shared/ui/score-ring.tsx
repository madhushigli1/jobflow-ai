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
  const color = pct >= 85 ? "hsl(152 60% 48%)" : pct >= 70 ? "hsl(258 90% 66%)" : "hsl(38 92% 58%)";

  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(230 20% 18%)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-sm font-semibold" style={{ color }}>
            {Math.round(pct)}
          </span>
        </div>
      )}
    </div>
  );
}
