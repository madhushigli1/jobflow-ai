import type { Metadata } from "next";
import { AnalyticsView } from "@/features/analytics";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Understand your job search with response, interview, and offer-rate analytics.",
};

export default function AnalyticsPage() {
  return <AnalyticsView />;
}
