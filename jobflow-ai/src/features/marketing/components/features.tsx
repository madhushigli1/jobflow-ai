import {
  Target,
  LayoutGrid,
  PenLine,
  BarChart3,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Container, Section, Eyebrow, Reveal, StaggerGroup } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";

const features = [
  {
    icon: Target,
    no: "01",
    title: "AI match scoring",
    desc: "Every role is scored 0–100 against your skills and goals, so you apply where you'll actually win.",
    span: "lg:col-span-2",
  },
  {
    icon: PenLine,
    no: "02",
    title: "Tailored cover letters",
    desc: "Generate a letter that sounds like you, tuned to each job — in seconds.",
    span: "",
  },
  {
    icon: LayoutGrid,
    no: "03",
    title: "One-board tracking",
    desc: "Drag applications across Saved → Applied → Interview → Offer. Never lose track again.",
    span: "",
  },
  {
    icon: BarChart3,
    no: "04",
    title: "Search analytics",
    desc: "Response, interview, and offer rates over time — know what's working and double down.",
    span: "lg:col-span-2",
  },
  {
    icon: Zap,
    no: "05",
    title: "One-click apply",
    desc: "Your profile, autofilled. Apply in a tap and JobFlow logs it for you.",
    span: "",
  },
  {
    icon: ShieldCheck,
    no: "06",
    title: "Private by default",
    desc: "Your data is yours. No recruiters spamming your inbox, ever.",
    span: "lg:col-span-2",
  },
];

export function Features() {
  return (
    <Section id="features" className="border-b-2 border-foreground">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Everything in one place</Eyebrow>
          <h2 className="mt-5 font-serif text-5xl font-light leading-[1] tracking-tight sm:text-6xl">
            The whole job search,
            <span className="italic text-accent"> handled.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop juggling tabs, docs, and spreadsheets. JobFlow brings discovery,
            tracking, and AI assistance into a single, considered workspace.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-px border-2 border-foreground bg-foreground sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Reveal key={f.title} className={cn("bg-card", f.span)}>
              <article className="group h-full p-7 transition-colors hover:bg-muted">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center border-2 border-foreground bg-background text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <f.icon className="size-5" />
                  </span>
                  <span className="font-serif text-3xl text-foreground/15">{f.no}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </article>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
