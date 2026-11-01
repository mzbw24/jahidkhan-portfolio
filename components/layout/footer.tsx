"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Facebook, Instagram, Linkedin, LucideFacebook, Mail, Phone, Twitter, Youtube, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/use-language";
import { navItems } from "@/lib/config/navigation";
import { publishedSocialLinks, siteConfig } from "@/lib/config/site";
import { isValidEmail } from "@/lib/validation";
import type { SocialLink } from "@/types/site";

const socialIcons: Record<SocialLink["key"], LucideIcon> = {
  "facebook-profile": Facebook,
  "facebook-page": LucideFacebook,
  youtube: Youtube,
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
};

export function Footer() {
  const { common } = useLanguage();
  const { footer } = common;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError(footer.newsletter.invalid);
      return;
    }
    setError("");
    toast.info(footer.newsletter.notConnected);
  };

  return (
    <footer className="bg-navy text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.1fr_1.4fr_1.3fr_1.2fr]">
        <div className="space-y-5">
          <BrandLogo />
          <ul aria-label={footer.socialLabel} className="flex items-center gap-2">
            {publishedSocialLinks.map((social) => {
              const SocialIcon = socialIcons[social.key];
              return (
                <li key={social.key}>
                  <a
                    href={social.url}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <SocialIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label={footer.quickLinks}>
          <h2 className="mb-4 text-sm font-semibold">{footer.quickLinks}</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-white/75">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {common.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold">{footer.contactTitle}</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-white">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
          </ul>
          <Button asChild variant="glass" size="sm" className="mt-4">
            <Link href="/contact">
              {footer.connect}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold">{footer.newsletter.title}</h2>
          <p className="mb-3 text-xs text-white/70">{footer.newsletter.text}</p>
          <form onSubmit={handleSubscribe} noValidate className="flex">
            <label htmlFor="newsletter-email" className="sr-only">
              {footer.newsletter.placeholder}
            </label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={footer.newsletter.placeholder}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "newsletter-error" : undefined}
              autoComplete="email"
              className="rounded-r-none border-0 bg-white text-slate-900 placeholder:text-slate-500"
            />
            <Button type="submit" aria-label={footer.newsletter.button} className="rounded-l-none px-4 hover:scale-100">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
          {error ? (
            <p id="newsletter-error" role="alert" className="mt-2 text-xs text-red-300">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/65 sm:flex-row">
          <p>{footer.rights}</p>
          <p className="flex items-center gap-4">
            <span>{footer.privacy}</span>
            <span aria-hidden="true" className="h-3 w-px bg-white/25" />
            <span>{footer.terms}</span>
          </p>
          <p>{footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
