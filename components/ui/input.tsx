import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/80 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-primary",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
