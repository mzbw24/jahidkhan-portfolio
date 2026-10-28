import type { CommonContent } from "@/types/content";

export const commonEn: CommonContent = {
  siteTagline: "People · Sylhet · Progress",
  skipLink: "Skip to main content",
  nav: {
    home: "Home",
    about: "About",
    vision: "Vision & Plan",
    service: "Public Service",
    business: "Business & Ventures",
    projects: "Projects",
    media: "Media",
    contact: "Contact",
    support: "Support Jahid",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    ariaLabel: "Main navigation",
  },
  controls: {
    languageLabel: "বাংলা",
    languageAria: "Switch language to Bangla",
    themeAria: "Toggle light and dark theme",
  },
  footer: {
    quickLinks: "Quick Links",
    contactTitle: "Contact Information",
    location: "Sylhet, Bangladesh",
    locationNote: "(Originally from Sylhet, currently in California, USA)",
    connect: "Let's Connect",
    socialLabel: "Social media",
    rights: "© 2026 Jahid Khan. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    tagline: "A Stronger Sylhet. Together.",
    newsletter: {
      title: "Newsletter",
      text: "Get the latest updates and join the movement.",
      placeholder: "Your email address",
      button: "Subscribe",
      invalid: "Enter a valid email address.",
      notConnected:
        "Newsletter sign-up isn't connected yet, so your email was not saved. Please use the contact page instead.",
    },
  },
  cta: {
    scriptLines: ["Together", "For a Brighter", "Sylhet"],
    title: "Be Part of the Change",
    text: "Let's work together for a cleaner, greener, more modern and prosperous Sylhet.",
    button: "Support Jahid Khan",
  },
  news: {
    title: "Latest News & Insights",
    text: "Updates, thoughts and activities from Sylhet, USA and beyond.",
    watchLabel: "Watch on YouTube",
    // PLACEHOLDER — mock items, replace with real articles.
    items: [
      { image: "newsPortrait", tag: "Insights", title: "Why a People-Centered Sylhet Matters", date: "22 Oct 2026", kind: "article" },
      { image: "newsCity", tag: "Sylhet", title: "Plans for a Smarter and Cleaner Sylhet", date: "18 Oct 2026", kind: "article" },
      { image: "newsYouth", tag: "Community", title: "Youth Are the Future of Sylhet", date: "12 Oct 2026", kind: "article" },
      { image: "newsVideo", tag: "Video", title: "My Vision for Sylhet City Corporation", date: "", kind: "video", duration: "7:28" },
    ],
  },
  placeholderBadge: "Sample content",
  comingSoon: "This video isn't available yet.",
  notFound: {
    title: "Page not found",
    text: "The page you are looking for doesn't exist or has moved.",
    button: "Back to home",
  },
};
