"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  /** Accessible name when there's no visible <label htmlFor>. */
  "aria-label"?: string;
  /** id of an external visible label, wired via aria-labelledby. */
  labelledBy?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  /** Which edge the popover aligns to. */
  align?: "start" | "end";
}

/**
 * Accessible custom listbox select — replaces the native <select> so the
 * option list can be styled to match the editorial UI. Implements the
 * button + listbox (aria-activedescendant) pattern with full keyboard support.
 */
export function Select<T extends string>({
  value,
  onChange,
  options,
  id,
  placeholder = "Select…",
  className,
  align = "start",
  labelledBy,
  ...aria
}: SelectProps<T>) {
  const reactId = React.useId();
  const baseId = id ?? reactId;
  const listId = `${baseId}-listbox`;
  const optionId = (i: number) => `${baseId}-opt-${i}`;

  const [open, setOpen] = React.useState(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const [active, setActive] = React.useState(selectedIndex);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.value === value);

  // Keep the active descendant synced to the selection whenever we open.
  React.useEffect(() => {
    if (open) setActive(selectedIndex);
  }, [open, selectedIndex]);

  // Close on outside pointer / Escape, and keep the active option in view.
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  function commit(i: number) {
    const opt = options[i];
    if (opt) onChange(opt.value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) commit(active);
        else setOpen(true);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={buttonRef}
        type="button"
        id={baseId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-label={aria["aria-label"]}
        aria-labelledby={labelledBy}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-3 border-2 border-foreground bg-card px-3.5 text-sm font-medium outline-none transition-shadow focus-visible:shadow-brutal-sm",
          open && "shadow-brutal-sm",
        )}
      >
        <span className={cn(!selected && "text-muted-foreground")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-labelledby={labelledBy ?? baseId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className={cn(
              "absolute z-50 mt-1.5 max-h-72 w-max min-w-full overflow-auto border-2 border-foreground bg-card py-1 shadow-brutal",
              align === "end" ? "right-0" : "left-0",
            )}
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isActive = i === active;
              return (
                <li
                  key={opt.value}
                  id={optionId(i)}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(i)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 px-3.5 py-2 text-sm",
                    isActive ? "bg-foreground text-background" : "text-foreground",
                  )}
                >
                  <Check
                    className={cn(
                      "size-4 shrink-0 transition-opacity",
                      isSelected ? "opacity-100" : "opacity-0",
                      isActive ? "text-background" : "text-accent",
                    )}
                  />
                  <span className="whitespace-nowrap">{opt.label}</span>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
