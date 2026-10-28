"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, CircleAlert, Loader2, ShieldCheck, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { validateContactForm } from "@/lib/validation";
import { buildWhatsAppMessage, buildWhatsAppUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import type { FormContent } from "@/types/content";
import type { ContactFormErrors, ContactFormValues } from "@/types/site";

const COUNTRY_CODES = ["+1", "+880", "+44", "+61", "+971", "+966", "+65", "+60"] as const;

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  countryCode: "+1",
  phone: "",
  subject: "",
  message: "",
};

type Status = "idle" | "submitting" | "ready" | "unavailable" | "error";
type Field = keyof ContactFormValues;

/**
 * No backend: the form validates on the client, formats every field on its own labelled line,
 * and opens WhatsApp (wa.me) with the message pre-filled. It NEVER claims delivery.
 */
export function ContactForm({ content }: { content: FormContent }) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const pending = timer;
    return () => window.clearTimeout(pending.current);
  }, []);

  const update =
    (field: Field) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target;
      setValues((previous) => ({ ...previous, [field]: value }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
      setStatus((previous) => (previous === "submitting" ? previous : "idle"));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateContactForm(values);
    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      setErrors(found);
      setStatus("idle");
      document.getElementById(`cf-${firstInvalid}`)?.focus();
      return;
    }

    if (!isWhatsAppConfigured()) {
      console.warn(
        "[contact form] WhatsApp number is not configured. Set NEXT_PUBLIC_WHATSAPP_NUMBER or siteConfig.whatsappNumber in lib/config/site.ts.",
      );
      setStatus("unavailable");
      toast.error(content.toast.notConfigured);
      return;
    }

    setStatus("submitting");
    try {
      const subjectLabel =
        (content.fields.subject.options as Record<string, string>)[values.subject] ?? values.subject;
      const message = buildWhatsAppMessage(values, subjectLabel, content.whatsapp.labels, content.whatsapp.heading);
      const link = document.createElement("a");
      link.href = buildWhatsAppUrl(message);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();

      timer.current = window.setTimeout(() => {
        setStatus("ready");
        toast.success(content.toast.success);
      }, 700);
    } catch {
      setStatus("error");
      toast.error(content.toast.error);
    }
  };

  const err = (field: Field) => (errors[field] ? content.errors[errors[field]] : undefined);
  const describedBy = (field: Field) => (errors[field] ? `cf-${field}-error` : undefined);
  const submitting = status === "submitting";

  const renderError = (field: Field) =>
    errors[field] ? (
      <p id={`cf-${field}-error`} role="alert" className="mt-1.5 text-xs font-medium text-primary">
        {err(field)}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4" aria-busy={submitting}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name">
            {content.fields.name.label} <span className="text-primary" aria-hidden="true">*</span>
          </Label>
          <Input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            className="mt-2"
            placeholder={content.fields.name.placeholder}
            value={values.name}
            onChange={update("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
          />
          {renderError("name")}
        </div>
        <div>
          <Label htmlFor="cf-email">
            {content.fields.email.label} <span className="text-primary" aria-hidden="true">*</span>
          </Label>
          <Input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            className="mt-2"
            placeholder={content.fields.email.placeholder}
            value={values.email}
            onChange={update("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
          />
          {renderError("email")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-phone">{content.fields.phone.label}</Label>
          <div className="mt-2 flex gap-2">
            <Select
              aria-label={content.fields.countryCode.label}
              value={values.countryCode}
              onChange={update("countryCode")}
              className="w-[5.5rem]"
            >
              {COUNTRY_CODES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </Select>
            <Input
              id="cf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={content.fields.phone.placeholder}
              value={values.phone}
              onChange={update("phone")}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy("phone")}
            />
          </div>
          {renderError("phone")}
        </div>
        <div>
          <Label htmlFor="cf-subject">
            {content.fields.subject.label} <span className="text-primary" aria-hidden="true">*</span>
          </Label>
          <Select
            id="cf-subject"
            name="subject"
            required
            aria-required="true"
            className="mt-2"
            value={values.subject}
            onChange={update("subject")}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={describedBy("subject")}
          >
            <option value="">{content.fields.subject.placeholder}</option>
            {Object.entries(content.fields.subject.options).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
          {renderError("subject")}
        </div>
      </div>

      <div>
        <Label htmlFor="cf-message">
          {content.fields.message.label} <span className="text-primary" aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="cf-message"
          name="message"
          required
          aria-required="true"
          className="mt-2"
          rows={5}
          placeholder={content.fields.message.placeholder}
          value={values.message}
          onChange={update("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
        />
        {renderError("message")}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {content.submitting}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            {content.submit}
          </>
        )}
      </Button>

      <div aria-live="polite">
        {status === "ready" ? (
          <p className="flex items-start gap-2 rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {content.toast.success}
          </p>
        ) : null}
        {status === "unavailable" ? (
          <p className="flex items-start gap-2 rounded-md bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-300">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {content.toast.notConfigured}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-start gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-800 dark:text-red-300">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {content.toast.error}
          </p>
        ) : null}
      </div>

      <div className="space-y-2 text-xs text-muted-foreground">
        <p className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {content.privacy}
        </p>
        <p className="pl-6">{content.noBackendNote}</p>
      </div>
    </form>
  );
}
