import {
  Hero,
  LogoCloud,
  Features,
  HowItWorks,
  Stats,
  Testimonials,
  CTA,
} from "@/features/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}
