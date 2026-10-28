import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Native <select> styled to match inputs — best accessibility and zero extra JS. */
const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-9 text-sm text-foreground transition-colors focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-primary",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  ),
);
Select.displayName = "Select";

export { Select };
