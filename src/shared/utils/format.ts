/** Pure formatting helpers — no side effects, no React. */

/** "120000" → "$120k", range → "$120k – $160k" */
export function formatSalary(min: number, max: number, currency = "$"): string {
  const k = (n: number) => `${currency}${Math.round(n / 1000)}k`;
  return min === max ? k(min) : `${k(min)} – ${k(max)}`;
}

/** Relative time like "3d ago", "2w ago" from an ISO date. */
export function timeAgo(iso: string, now: Date = new Date()): string {
  const diff = now.getTime() - new Date(iso).getTime();
  const sec = Math.round(diff / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  const week = Math.round(day / 7);
  const month = Math.round(day / 30);
  if (sec < 60) return "just now";
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  if (day < 7) return `${day}d ago`;
  if (week < 5) return `${week}w ago`;
  return `${month}mo ago`;
}

/** Initials from a full name: "Aria Patel" → "AP". */
export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/** Compact number: 1500 → "1.5k", 1_200_000 → "1.2M". */
export function compactNumber(n: number): string {
  if (n < 1000) return `${n}`;
  if (n < 1_000_000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

/** Clamp a number to a range. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}
