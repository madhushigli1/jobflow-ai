import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 border font-mono uppercase tracking-[0.1em] transition-colors [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-foreground bg-card text-foreground",
        primary: "border-foreground bg-foreground text-background",
        accent: "border-foreground bg-accent text-accent-foreground",
        success: "border-foreground bg-accent text-accent-foreground",
        warning: "border-foreground bg-card text-muted-foreground",
        destructive: "border-foreground bg-foreground text-background",
        outline: "border-foreground bg-transparent text-foreground",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[0.6rem]",
        md: "px-2 py-0.5 text-[0.65rem]",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
