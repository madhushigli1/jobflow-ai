import * as React from "react";
import { cn } from "@/shared/utils/cn";

const inputBase =
  "w-full rounded-xl border border-input bg-background-elevated/60 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors outline-none focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cn(inputBase, "h-11 px-4", className)} {...props} />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(inputBase, "min-h-28 px-4 py-3 resize-y", className)} {...props} />
));
Textarea.displayName = "Textarea";

export { Input, Textarea, inputBase };
