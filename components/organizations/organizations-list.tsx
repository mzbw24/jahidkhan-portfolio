import { OrganizationCard } from "./organization-card";
import type { OrganizationRecord, OrganizationsContent } from "@/types/organizations";

interface OrganizationsListProps {
  content: OrganizationsContent;
  organizations: OrganizationRecord[];
}

/** Data-driven: renders whatever is in the registry. */
export function OrganizationsList({ content, organizations }: OrganizationsListProps) {
  return (
    <section id="organizations" aria-labelledby="orgs-list-title" className="section-y scroll-mt-20">
      <div className="container">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">{content.list.eyebrow}</p>
          <h2 id="orgs-list-title" className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {content.list.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{content.list.text}</p>
        </div>
        <ul data-stagger aria-label={content.list.ariaLabel} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {organizations.map((organization, index) => {
            const text = content.items[organization.id];
            return text ? (
              <li key={organization.id}>
                <OrganizationCard organization={organization} text={text} priority={index === 0} />
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </section>
  );
}
