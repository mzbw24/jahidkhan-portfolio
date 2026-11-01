import { siteConfig } from "@/lib/config/site";
import { FIELD_LIMITS, sanitizeLine, sanitizeMultiline } from "@/lib/validation";
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
  const rawPhone = sanitizeLine(values.phone, FIELD_LIMITS.phone);
  const phone = rawPhone ? `${sanitizeLine(values.countryCode, 6)} ${rawPhone}` : "-";
  return [
    `*${heading}*`,
    "",
    `*${labels.name}:* ${sanitizeLine(values.name, FIELD_LIMITS.name)}`,
    `*${labels.email}:* ${sanitizeLine(values.email, FIELD_LIMITS.email)}`,
    `*${labels.phone}:* ${phone}`,
    `*${labels.subject}:* ${sanitizeLine(subjectLabel, 60)}`,
    `*${labels.message}:* ${sanitizeMultiline(values.message, FIELD_LIMITS.message)}`,
  ].join("\n");
}

export function buildWhatsAppUrl(message: string, rawNumber: string = siteConfig.whatsappNumber): string {
  return `https://wa.me/${normalizeNumber(rawNumber)}?text=${encodeURIComponent(message)}`;
}
