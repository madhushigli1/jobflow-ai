import { Container } from "@/shared/ui";
import { CountUp } from "./count-up";

const stats = [
  { value: 2.4, suffix: "M", label: "Jobs analyzed", decimals: 1 },
  { value: 89, suffix: "%", label: "Match accuracy" },
  { value: 3.2, suffix: "x", label: "Faster to offer", decimals: 1 },
  { value: 12, suffix: "k+", label: "Offers landed" },
];

export function Stats() {
  return (
    <Container className="py-8">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card/60 px-6 py-8 text-center">
            <div className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
              <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
