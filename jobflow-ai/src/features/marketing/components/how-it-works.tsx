import { Container, Section, Eyebrow, Reveal } from "@/shared/ui";

const steps = [
  {
    n: "01",
    title: "Build your profile",
    desc: "Add your skills, experience, and what you're looking for. It takes two minutes — and powers everything else.",
  },
  {
    n: "02",
    title: "Get matched instantly",
    desc: "Our engine scores thousands of roles against your profile and surfaces the ones you're most likely to land.",
  },
  {
    n: "03",
    title: "Apply with AI",
    desc: "One-click apply with autofilled details and a tailored cover letter, generated and ready to edit.",
  },
  {
    n: "04",
    title: "Track to the offer",
    desc: "Every application flows across your board automatically. Watch your pipeline turn into offers.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="relative">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            From sign-up to signed offer
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four steps. No spreadsheets, no chaos.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group h-full bg-card/60 p-7 transition-colors hover:bg-card">
                <span className="text-3xl font-semibold text-gradient-brand">{s.n}</span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
