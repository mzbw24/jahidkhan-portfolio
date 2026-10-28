import type { ContactFormErrors, ContactFormValues } from "@/types/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
