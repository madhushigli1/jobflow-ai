/** Navigation structure consumed by the navbar and footer. */

export interface NavItem {
  label: string;
  href: string;
  /** Marks app-only (post-login) destinations. */
  app?: boolean;
}

export const mainNav: NavItem[] = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Dashboard", href: "/dashboard", app: true },
  { label: "AI Tools", href: "/ai-tools", app: true },
];

export const dashboardNav: NavItem[] = [
  { label: "Tracker", href: "/dashboard" },
  { label: "Analytics", href: "/dashboard/analytics" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Find Jobs", href: "/jobs" },
      { label: "Application Tracker", href: "/dashboard" },
      { label: "AI Tools", href: "/ai-tools" },
      { label: "Analytics", href: "/dashboard/analytics" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/" },
      { label: "Careers", href: "/jobs" },
      { label: "Blog", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Resume Guide", href: "/ai-tools" },
      { label: "Interview Prep", href: "/" },
      { label: "Help Center", href: "/" },
      { label: "Changelog", href: "/" },
    ],
  },
];
