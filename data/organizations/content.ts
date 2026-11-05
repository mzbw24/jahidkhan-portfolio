import type { Localized } from "@/types/common";
import type { OrganizationsContent } from "@/types/organizations";

const en: OrganizationsContent = {
  hero: {
    eyebrow: "Social Organizations",
    title: "Organizations &",
    accent: "Initiatives",
    text: "Community-driven organizations and social initiatives working for education, awareness, health, environment and a more inclusive society.",
    primaryCta: "Explore Organizations",
    secondaryCta: "Our Impact",
  },
  list: {
    eyebrow: "Organizations",
    title: "Where the work happens",
    text: "Select an organization to visit its dedicated page.",
    ariaLabel: "Organizations and initiatives",
  },
  impact: {
    eyebrow: "Our Collective Impact",
    title: "Creating Meaningful",
    accent: "Change Together",
    labels: { organizations: "Organizations", photos: "Photos documented" },
    note: "Counts reflect the organizations and photographs published on this website.",
  },
  cta: {
    title: "Join the",
    accent: "Social Journey",
    text: "Be part of our ongoing initiatives. Together, we can build a more conscious, compassionate and stronger society.",
    button: "Get Involved",
  },
  items: {
    jcdo: {
      name: "JCDO Sylhet",
      description: "Jalalabad Community Development Organization (JCDO) works for community awareness, health, education, environment and social development in Sylhet.",
      cta: "Visit JCDO",
      logoAlt: "JCDO emblem — Jalalabad Community Development Organization",
      coverAlt: "JCDO awareness poster: One community, shared responsibility",
    },
    yis: {
      name: "Youth Is Strength",
      description: "A youth-led initiative dedicated to empowering young people through education, social awareness, volunteering and community development.",
      cta: "Visit YIS",
      logoAlt: "Youth Is Strength emblem — Tarunnoi Shakti",
      coverAlt: "Youth Is Strength members at a group gathering",
    },
  },
};

const bn: OrganizationsContent = {
  hero: {
    eyebrow: "সামাজিক সংগঠন",
    title: "সংগঠন ও",
    accent: "উদ্যোগসমূহ",
    text: "শিক্ষা, সচেতনতা, স্বাস্থ্য, পরিবেশ এবং আরও অন্তর্ভুক্তিমূলক সমাজের জন্য কাজ করা সম্প্রদায়-চালিত সংগঠন ও সামাজিক উদ্যোগ।",
    primaryCta: "সংগঠনগুলো দেখুন",
    secondaryCta: "আমাদের প্রভাব",
  },
  list: {
    eyebrow: "সংগঠন",
    title: "যেখানে কাজ হয়",
    text: "কোনো সংগঠনের নিজস্ব পেজে যেতে সেটি বেছে নিন।",
    ariaLabel: "সংগঠন ও উদ্যোগসমূহ",
  },
  impact: {
    eyebrow: "আমাদের সম্মিলিত প্রভাব",
    title: "একসাথে গড়ি",
    accent: "অর্থবহ পরিবর্তন",
    labels: { organizations: "সংগঠন", photos: "নথিভুক্ত ছবি" },
    note: "সংখ্যাগুলো এই ওয়েবসাইটে প্রকাশিত সংগঠন ও ছবির হিসাব।",
  },
  cta: {
    title: "যুক্ত হোন",
    accent: "সামাজিক যাত্রায়",
    text: "আমাদের চলমান উদ্যোগের অংশ হোন। একসাথে আমরা আরও সচেতন, সহানুভূতিশীল ও শক্তিশালী সমাজ গড়তে পারি।",
    button: "যুক্ত হোন",
  },
  items: {
    jcdo: {
      name: "জেসিডিও সিলেট",
      description: "জালালাবাদ কমিউনিটি ডেভেলপমেন্ট অর্গানাইজেশন (জেসিডিও) সিলেটে সামাজিক সচেতনতা, স্বাস্থ্য, শিক্ষা, পরিবেশ ও সামাজিক উন্নয়নে কাজ করে।",
      cta: "জেসিডিও দেখুন",
      logoAlt: "জেসিডিও প্রতীক — জালালাবাদ কমিউনিটি ডেভেলপমেন্ট অর্গানাইজেশন",
      coverAlt: "জেসিডিও সচেতনতা পোস্টার: এক সম্প্রদায়, সম্মিলিত দায়িত্ব",
    },
    yis: {
      name: "তারুণ্যই শক্তি",
      description: "শিক্ষা, সামাজিক সচেতনতা, স্বেচ্ছাসেবা ও সম্প্রদায়ের উন্নয়নের মাধ্যমে তরুণদের ক্ষমতায়নে নিবেদিত একটি তরুণ-নেতৃত্বাধীন উদ্যোগ।",
      cta: "তারুণ্যই শক্তি দেখুন",
      logoAlt: "ইয়ুথ ইজ স্ট্রেংথ প্রতীক — তারুণ্যই শক্তি",
      coverAlt: "একটি সমাবেশে ইয়ুথ ইজ স্ট্রেংথ-এর সদস্যরা",
    },
  },
};

export const organizationsContent: Localized<OrganizationsContent> = { en, bn };
