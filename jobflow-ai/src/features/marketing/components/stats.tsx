import { Container } from "@/shared/ui";
import { CountUp } from "./count-up";

const stats = [
  { value: 2.4, suffix: "M", label: "Jobs analyzed", decimals: 1 },
  { value: 89, suffix: "%", label: "Match accuracy" },
  { value: 3.2, suffix: "×", label: "Faster to offer", decimals: 1 },
  { value: 12, suffix: "k+", label: "Offers landed" },
];

export function Stats() {
  return (
    <section className="border-b-2 border-foreground bg-foreground text-background">
      <Container className="py-0">
        <div className="grid divide-y-2 divide-background/20 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x-2 lg:divide-background/20">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-10 text-center">
              <div className="font-serif text-6xl font-light tracking-tight text-background sm:text-7xl">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <p className="label mt-3 text-background/60">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
