import type { ContactFormErrors, ContactFormValues } from "@/types/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Hard limits for every contact field. Also applied as `maxLength` on the inputs and when building the WhatsApp message. */
export const FIELD_LIMITS = {
  name: 80,
  email: 120,
  phone: 20,
  message: 1000,
} as const;

/** Drops control characters (they have no place in a chat message); optionally keeps line feeds. */
function stripControlChars(value: string, keepLineFeeds: boolean): string {
  let out = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const isControl = code < 32 || code === 127;
    if (!isControl || (keepLineFeeds && code === 10)) out += char;
  }
  return out;
}

/** Single-line fields: collapse any line breaks/tabs so a value can never fake an extra labelled line. */
export function sanitizeLine(value: string, max: number): string {
  const flat = value.replace(/[\r\n\t]+/g, " ");
  return stripControlChars(flat, false).replace(/\s{2,}/g, " ").trim().slice(0, max);
}

/** Multi-line message: keep line breaks, drop other control characters, cap the length. */
export function sanitizeMultiline(value: string, max: number): string {
  const normalised = value.replace(/\r\n?/g, "\n").replace(/\t/g, " ");
  return stripControlChars(normalised, true).trim().slice(0, max);
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/** Returns error codes per field (empty object = valid). Codes map to localized text at render time. */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const result: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) result.name = "required";
  else if (name.length < 2) result.name = "nameShort";

  const email = values.email.trim();
  if (!email) result.email = "required";
  else if (!isValidEmail(email)) result.email = "email";

  const phone = values.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15 || /[^\d\s()+\-.]/.test(phone)) {
      result.phone = "phone";
    }
  }

  if (!values.subject) result.subject = "subject";

  const message = values.message.trim();
  if (!message) result.message = "required";
  else if (message.length < 10) result.message = "messageShort";

  return result;
}
