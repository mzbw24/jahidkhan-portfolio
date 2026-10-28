import { siteConfig } from "@/lib/config/site";
import type { ContactFormValues } from "@/types/site";

interface MessageLabels {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function normalizeNumber(raw: string): string {
  return raw.replace(/\D/g, "");
}

/** True only when a plausible international number (8–15 digits) is configured. */
export function isWhatsAppConfigured(raw: string = siteConfig.whatsappNumber): boolean {
  const digits = normalizeNumber(raw);
  return digits.length >= 8 && digits.length <= 15;
}

/** Every submitted field goes on its own clearly labelled line. */
export function buildWhatsAppMessage(
  values: ContactFormValues,
  subjectLabel: string,
  labels: MessageLabels,
  heading: string,
): string {
  const phone = values.phone.trim() ? `${values.countryCode} ${values.phone.trim()}` : "-";
  return [
    `*${heading}*`,
    "",
    `*${labels.name}:* ${values.name.trim()}`,
    `*${labels.email}:* ${values.email.trim()}`,
    `*${labels.phone}:* ${phone}`,
    `*${labels.subject}:* ${subjectLabel}`,
    `*${labels.message}:* ${values.message.trim()}`,
  ].join("\n");
}

export function buildWhatsAppUrl(message: string, rawNumber: string = siteConfig.whatsappNumber): string {
  return `https://wa.me/${normalizeNumber(rawNumber)}?text=${encodeURIComponent(message)}`;
}
