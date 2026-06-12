"use client";

import { motion, type Variants } from "motion/react";
import * as React from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Scroll-triggered fade-up. Wraps children and animates them into view once.
 * `delay` staggers siblings; `as` lets it render any motion element.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 22,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its <Reveal> / motion children. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = variants;
