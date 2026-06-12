/**
 * Deterministic, offline "AI" simulation. In production these would be
 * API calls to an LLM; here we derive plausible results from the input so
 * the UX (loading, scoring, generation) is fully demonstrable.
 */
import type { UserProfile } from "@/shared/types";

const STRONG_VERBS = ["led", "built", "shipped", "designed", "improved", "owned", "scaled", "drove"];
const METRIC_RE = /\d+%|\$\d|\d+x|\d{2,}/;

export interface ResumeAnalysis {
  score: number;
  categories: { label: string; score: number }[];
  suggestions: { severity: "high" | "medium" | "low"; text: string }[];
  keywords: { matched: string[]; missing: string[] };
}

export function analyzeResume(text: string, profile: UserProfile): ResumeAnalysis {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lower = text.toLowerCase();

  const verbHits = STRONG_VERBS.filter((v) => lower.includes(v)).length;
  const hasMetrics = METRIC_RE.test(text);
  const metricCount = (text.match(/\d+%|\$\d+|\d+x/g) ?? []).length;

  const impact = clampScore(40 + metricCount * 12 + (hasMetrics ? 10 : 0));
  const clarity = clampScore(50 + Math.min(words.length, 200) / 8);
  const action = clampScore(45 + verbHits * 9);

  const matched = profile.skills.filter((s) => lower.includes(s.toLowerCase()));
  const missing = profile.skills.filter((s) => !lower.includes(s.toLowerCase()));
  const keywordScore = clampScore((matched.length / profile.skills.length) * 100);

  const score = Math.round((impact + clarity + action + keywordScore) / 4);

  const suggestions: ResumeAnalysis["suggestions"] = [];
  if (!hasMetrics)
    suggestions.push({ severity: "high", text: "Quantify your impact — add metrics like “cut load time 40%”." });
  if (verbHits < 3)
    suggestions.push({ severity: "medium", text: "Start bullets with strong action verbs (led, shipped, built)." });
  if (missing.length)
    suggestions.push({ severity: "medium", text: `Surface missing keywords: ${missing.slice(0, 3).join(", ")}.` });
  if (words.length < 120)
    suggestions.push({ severity: "low", text: "Add a little more detail — this reads short for a full resume." });
  if (words.length > 600)
    suggestions.push({ severity: "low", text: "Tighten it up — aim for one page of high-signal content." });
  if (suggestions.length === 0)
    suggestions.push({ severity: "low", text: "Strong resume! Tailor keywords per role for an extra edge." });

  return {
    score,
    categories: [
      { label: "Impact & metrics", score: impact },
      { label: "Clarity", score: clarity },
      { label: "Action verbs", score: action },
      { label: "Keyword match", score: keywordScore },
    ],
    suggestions,
    keywords: { matched, missing },
  };
}

export type Tone = "Professional" | "Friendly" | "Bold";

export function generateCoverLetter(opts: {
  jobTitle: string;
  company: string;
  tone: Tone;
  profile: UserProfile;
  highlight?: string;
}): string {
  const { jobTitle, company, tone, profile, highlight } = opts;
  const openers: Record<Tone, string> = {
    Professional: `Dear ${company} Hiring Team,\n\nI'm writing to express my strong interest in the ${jobTitle} role at ${company}.`,
    Friendly: `Hi ${company} team,\n\nThe ${jobTitle} opening immediately caught my eye — it reads like it was written for me.`,
    Bold: `${company} team,\n\nYou're looking for a ${jobTitle}. I'm exactly that — and here's why.`,
  };
  const skills = profile.skills.slice(0, 4).join(", ");
  const highlightLine = highlight?.trim()
    ? ` In particular, ${highlight.trim()}`
    : ` I've spent the last several years building polished, performant interfaces with ${skills}.`;

  const closers: Record<Tone, string> = {
    Professional: `I'd welcome the chance to discuss how I can contribute to ${company}. Thank you for your consideration.\n\nSincerely,\n${profile.name}`,
    Friendly: `I'd love to chat about how I can help ${company} ship something great. Thanks so much for reading!\n\nWarmly,\n${profile.name}`,
    Bold: `Let's build something exceptional together. I'm ready when you are.\n\n${profile.name}`,
  };

  return [
    openers[tone],
    `As a ${profile.title} based in ${profile.location}, I thrive where craft meets performance.${highlightLine} My toolkit — ${skills} — maps directly to what this role demands.`,
    `What draws me to ${company} is the bar you set for quality. I obsess over the details that make products feel effortless: motion, accessibility, and speed. I'd bring that same standard to the ${jobTitle} team.`,
    closers[tone],
  ].join("\n\n");
}

export interface MatchResult {
  score: number;
  matched: string[];
  missing: string[];
  summary: string;
}

export function scoreMatch(jobDescription: string, profile: UserProfile): MatchResult {
  const lower = jobDescription.toLowerCase();
  const matched = profile.skills.filter((s) => lower.includes(s.toLowerCase()));
  const missing = profile.skills.filter((s) => !lower.includes(s.toLowerCase()));
  const base = (matched.length / profile.skills.length) * 100;
  const score = clampScore(Math.round(base * 0.85 + 15));
  const summary =
    score >= 85
      ? "Excellent fit — apply with confidence and lean into your matching strengths."
      : score >= 70
        ? "Solid fit. Tailor your resume to highlight the matched skills below."
        : "Stretch role. Emphasize transferable experience and close the gaps over time.";
  return { score, matched, missing, summary };
}

function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}
