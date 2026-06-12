import type { Metadata } from "next";
import { Tracker } from "@/features/applications";

export const metadata: Metadata = {
  title: "Application Tracker",
  description: "Track every job application across stages on a single drag-and-drop board.",
};

export default function DashboardPage() {
  return <Tracker />;
}
