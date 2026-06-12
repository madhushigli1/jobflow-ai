"use client";

import * as React from "react";
import { animate, useInView } from "motion/react";

/** Counts from 0 → value when scrolled into view. */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  React.useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        node.textContent = `${prefix}${v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, prefix, decimals, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
