import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurBackdrop } from "@/components/shared/photo-image";
import { cn } from "@/lib/utils";
import type { OrganizationRecord, OrganizationText } from "@/types/organizations";

interface OrganizationCardProps {
  organization: OrganizationRecord;
  text: OrganizationText;
  priority?: boolean;
}

export function OrganizationCard({ organization, text, priority }: OrganizationCardProps) {
  const { cover, logo } = organization;
  return (
    <article className="card-surface card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted">
        <BlurBackdrop blur={cover.blur} className="opacity-60" />
        <Image
          src={cover.src}
          alt={text.coverAlt}
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 92vw"
          quality={80}
          priority={priority}
          placeholder="blur"
          blurDataURL={cover.blur}
          className="relative h-full w-auto max-w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <div
          className={cn(
            "relative h-24 w-24 shrink-0 overflow-hidden bg-white ring-1 ring-border",
            organization.logoShape === "round" ? "rounded-full" : "rounded-2xl p-1.5",
          )}
        >
          <Image
            src={logo.src}
            alt={text.logoAlt}
            fill
            sizes="96px"
            quality={85}
            placeholder="blur"
            blurDataURL={logo.blur}
            className={cn("object-contain", organization.logoShape === "round" && "scale-[1.26]")}
          />
        </div>
        <div className="min-w-0 flex-1 sm:border-l sm:pl-5">
          <h3 className="font-display text-xl font-bold">{text.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text.description}</p>
          <Link
            href={organization.href}
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring after:absolute after:inset-0 after:content-['']"
          >
            {text.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
