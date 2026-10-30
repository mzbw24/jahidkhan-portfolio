import type { VisionContent } from "@/types/content";

// NOTE: The 10-point plan wording is drawn from the design reference and must be approved by Jahid Khan.
export const visionEn: VisionContent = {
  hero: {
    eyebrow: "Vision for Sylhet",
    title: "A Cleaner, Greener, Smarter",
    accent: "Sylhet",
    text: "Modern infrastructure, quality healthcare, better education, more opportunities — for a prosperous Sylhet where every citizen can live with dignity.",
    primaryCta: { label: "Explore My Plan", href: "#ten-point-plan" },
    secondaryCta: { label: "Watch My Vision", video: true },
    quote: { text: "You don't need a party to stand with the people — only conscience and humanity.", author: "Jahid Khan" },
    scriptTagline: "Sylhet Deserves Better",
    portraitAlt: "Portrait of Jahid Khan",
    chips: [
      { icon: "users", title: "People First" },
      { icon: "shield", title: "Transparent Governance" },
      { icon: "leaf", title: "Sustainable Development" },
      { icon: "globe", title: "Global Connections" },
    ],
  },
  intro: {
    eyebrow: "Our Vision",
    title: "A People-Centered Sylhet City Corporation",
    text: "My vision is to build a Sylhet that is clean, green, modern, inclusive and opportunity-rich — a city where everyone, from students to working professionals, from business owners to low-income families, can live a better and more secure life.",
    icons: [
      { icon: "trees", title: "Clean City" },
      { icon: "pulse", title: "Healthy People" },
      { icon: "smartphone", title: "Smart Services" },
      { icon: "trend", title: "Strong Economy" },
    ],
    quote: {
      text: "Real change happens when we listen to people, understand their needs and work with practical solutions.",
      author: "Jahid Khan",
    },
    facts: [
      { icon: "pin", title: "From Sylhet", text: "Rooted in Sylhet, connected globally" },
      { icon: "flag", title: "Currently in California, USA", text: "Building global networks for Sylhet" },
      { icon: "heart", title: "Always for the People", text: "Working beyond politics" },
    ],
    portraitAlt: "Campaign poster featuring Jahid Khan",
  },
  challenges: {
    title: "Key Challenges & Solutions",
    viewAll: { label: "See Full Plan", href: "#ten-point-plan" },
    currentLabel: "Current Issue",
    planLabel: "Our Plan",
    items: [
      { image: "challengeTraffic", title: "Traffic & Infrastructure", issue: "Traffic congestion, poor road management", plan: "Modern road networks, smart traffic system" },
      { image: "challengeHospital", title: "Healthcare Services", issue: "Limited access and overcrowded hospitals", plan: "Better clinics, affordable medical services" },
      { image: "challengeWaste", title: "Waste Management", issue: "Improper waste disposal and pollution", plan: "Modern waste management and a cleaner city" },
      { image: "challengeYouth", title: "Youth Opportunities", issue: "Limited opportunities for youth", plan: "Skills development, entrepreneurship and jobs" },
    ],
  },
  plan: {
    id: "ten-point-plan",
    title: "My 10-Point Plan for Sylhet",
    items: [
      { icon: "recycle", title: "Clean & Green City", text: "Better waste management and green spaces" },
      { icon: "building", title: "Modern Infrastructure", text: "Roads, drainage, transportation" },
      { icon: "stethoscope", title: "Quality Healthcare", text: "Accessible and affordable medical services" },
      { icon: "graduation", title: "Education & Skills", text: "Better education and youth development" },
      { icon: "smartphone", title: "Smart City Services", text: "Digital governance and citizen services" },
      { icon: "shield", title: "Safe & Livable City", text: "A safer environment for all" },
      { icon: "briefcase", title: "Business & Investment", text: "Local and global opportunities" },
      { icon: "handHeart", title: "Social Welfare", text: "Support for vulnerable communities" },
      { icon: "landmark", title: "Cultural & Tourism Growth", text: "Preserving heritage and promoting tourism" },
      { icon: "scale", title: "Transparent Governance", text: "Accountability and people's participation" },
    ],
  },
  global: {
    title: "A Global Perspective for a Stronger",
    accent: "Sylhet",
    text: "From California to Sylhet — connecting opportunities, investments and knowledge to build a brighter future.",
    items: [
      { icon: "network", title: "Global Network", text: "USA, Canada & Beyond" },
      { icon: "trend", title: "Investment Opportunities", text: "Connecting businesses" },
      { icon: "book", title: "Knowledge Exchange", text: "Best practices for Sylhet" },
      { icon: "users", title: "Community Support", text: "Stronger diaspora network" },
    ],
    californiaLabel: "California, USA",
    sylhetLabel: "Sylhet, Bangladesh",
  },
};
