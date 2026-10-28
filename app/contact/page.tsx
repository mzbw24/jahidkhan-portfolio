import { ContactPage } from "@/components/pages/contact-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Jahid Khan: send a message via WhatsApp, find the location and meeting options, and read common questions.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
