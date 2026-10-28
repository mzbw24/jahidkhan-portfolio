import { cn } from "@/lib/utils";

interface HeadingTextProps {
  title: string;
  accent?: string;
  titleEnd?: string;
  /** Put each part on its own line (hero style). */
  stack?: boolean;
}

/** Renders `title` + `accent` (brand red) + `titleEnd`, skipping empty parts. */
export function HeadingText({ title, accent, titleEnd, stack = false }: HeadingTextProps) {
  const parts = [
    { text: title, accent: false },
    { text: accent ?? "", accent: true },
    { text: titleEnd ?? "", accent: false },
  ].filter((part) => part.text.length > 0);

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part.text}-${index}`} className={cn(part.accent && "text-primary", stack && "block")}>
          {part.text}
          {!stack && index < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
