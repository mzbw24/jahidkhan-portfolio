import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/80 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-primary",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
