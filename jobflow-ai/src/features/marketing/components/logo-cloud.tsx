import { Container } from "@/shared/ui";

const companies = [
  "Vercel",
  "Linear",
  "Stripe",
  "Figma",
  "Notion",
  "Ramp",
  "Supabase",
  "Perplexity",
];

export function LogoCloud() {
  return (
    <Container className="py-10">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Trusted by candidates hired at
      </p>
      <div className="mask-fade-edges relative mt-6 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12">
          {[...companies, ...companies].map((name, i) => (
            <span
              key={i}
              className="shrink-0 text-lg font-semibold tracking-tight text-muted-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </Container>
  );
}
