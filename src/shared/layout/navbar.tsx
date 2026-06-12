"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { mainNav } from "@/config/navigation";
import { buttonVariants } from "@/shared/ui";
import { Logo } from "./logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b-2 border-foreground bg-background transition-shadow",
        scrolled && "shadow-[0_3px_0_0_hsl(var(--foreground))]",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "label relative py-1 transition-colors",
                isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard" className="label text-muted-foreground transition-colors hover:text-foreground">
            Sign in
          </Link>
          <Link href="/jobs" className={buttonVariants({ variant: "accent", size: "sm" })}>
            Get started
          </Link>
        </div>

        <button
          className="grid size-10 place-items-center border-2 border-foreground bg-card text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t-2 border-foreground bg-background md:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "label border-b border-border/30 py-3.5 transition-colors",
                    isActive(item.href) ? "text-accent" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/jobs"
                className={cn(buttonVariants({ variant: "accent", size: "md" }), "mt-4")}
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
