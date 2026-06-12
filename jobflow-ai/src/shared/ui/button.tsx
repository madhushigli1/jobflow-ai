import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-foreground font-semibold uppercase tracking-[0.06em] outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.05em] [&_svg]:shrink-0 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]",
  {
    variants: {
      variant: {
        // ink block — the workhorse primary
        primary:
          "bg-foreground text-background shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_0_hsl(var(--foreground))] active:shadow-none",
        // the rare red pop
        accent:
          "bg-accent text-accent-foreground shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_0_hsl(var(--foreground))] active:shadow-none",
        // paper block with ink edge
        secondary:
          "bg-card text-foreground shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_0_hsl(var(--foreground))] active:shadow-none",
        outline:
          "bg-transparent text-foreground hover:translate-x-0 hover:translate-y-0 hover:bg-foreground hover:text-background active:translate-x-0 active:translate-y-0",
        ghost:
          "border-transparent bg-transparent text-foreground hover:translate-x-0 hover:translate-y-0 hover:bg-muted active:translate-x-0 active:translate-y-0",
        // legacy alias used in a few CTAs → paper block
        glass:
          "bg-card text-foreground shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[2px_2px_0_0_hsl(var(--foreground))] active:shadow-none",
        destructive:
          "bg-foreground text-background shadow-[4px_4px_0_0_hsl(var(--accent))] hover:shadow-[2px_2px_0_0_hsl(var(--accent))] active:shadow-none",
      },
      size: {
        sm: "h-9 px-4 text-[0.7rem]",
        md: "h-11 px-5 text-xs",
        lg: "h-13 px-7 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
