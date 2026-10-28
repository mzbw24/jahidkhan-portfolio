"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function NotFoundView() {
  const { common } = useLanguage();
  return (
    <section className="container flex min-h-[55vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="font-display text-7xl font-bold text-primary">404</p>
      <h1 className="font-display text-3xl font-bold">{common.notFound.title}</h1>
      <p className="max-w-md text-muted-foreground">{common.notFound.text}</p>
      <Button asChild className="mt-2">
        <Link href="/">{common.notFound.button}</Link>
      </Button>
    </section>
  );
}
