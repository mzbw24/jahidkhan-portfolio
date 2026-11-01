import { MediaImage } from "@/components/shared/media-image";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";
import { SectionHeading } from "@/components/shared/section-heading";
import type { HomeContent } from "@/types/content";

export function ProjectsSection({
  content,
}: {
  content: HomeContent["projects"];
}) {
  return (
    <section id="projects" className="section-y">
      <div className="container">
        <div data-reveal className="flex flex-wrap items-end gap-x-4 gap-y-2">
          <SectionHeading title={content.title} text={content.text} />
          <PlaceholderBadge className="mb-1" />
        </div>
        <ul data-stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {content.items.map((project) => (
            <li key={project.title}>
              <article className="card-surface card-hover h-full overflow-hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <MediaImage
                    media={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    style={{ objectPosition: "50% 0%" }}
                  />
                  <span className="absolute left-3 top-3 rounded bg-navy/85 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {project.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.text}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
