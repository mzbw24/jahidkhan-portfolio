import type { HomeContent } from "@/types/content";

// NOTE: Biography lines, quotes and the candidacy label are taken from the supplied design references
// and must be confirmed by Jahid Khan before launch. Stats and projects are mock data.
export const homeEn: HomeContent = {
  hero: {
    eyebrow: "Independent Mayor Candidate",
    title: "A Stronger",
    accent: "Sylhet",
    titleEnd: "Together",
    text: "For People. For Progress. For a Cleaner, Greener and More Prosperous Sylhet.",
    primaryCta: { label: "Learn About My Vision", href: "/vision-plan" },
    secondaryCta: { label: "Watch My Message", video: true },
    quote: { text: "You don't need a party to stand with the people — only conscience and humanity." },
    scriptTagline: "The Loyal Son of Sylhet",
    portraitAlt: "Placeholder portrait of Jahid Khan",
  },
  trust: [
    { icon: "users", title: "People First", text: "Always with the people" },
    { icon: "shield", title: "Transparent Leadership", text: "Open and accountable" },
    { icon: "lightbulb", title: "Practical Solutions", text: "Real, impactful work" },
    { icon: "leaf", title: "Stronger Sylhet", text: "A brighter future" },
    { icon: "pin", title: "From Sylhet", text: "Now in California, USA" },
  ],
  intro: {
    eyebrow: "About Jahid Khan",
    title: "A People-Focused Leader, Entrepreneur and",
    accent: "Change Agent",
    text: "I am Jahid Khan, a proud son of Sylhet, currently based in California, USA. My journey is shaped by community service, entrepreneurship and a deep commitment to creating opportunities for people. I believe in practical solutions, transparent leadership and inclusive development for a stronger Sylhet.",
    bullets: [
      "Independent Mayor Candidate – Sylhet City Corporation",
      "Entrepreneur & Business Initiator",
      "Community Advocate",
      "Global Network for Sylhet's Development",
    ],
    cta: { label: "More About My Journey", href: "/about" },
    quote: "My mission is simple — to work for people, create opportunities and build a better, more liveable Sylhet for everyone.",
    californiaTitle: "Currently in California, USA",
    californiaText: "Working, learning and building global connections for Sylhet.",
    portraitAlt: "Placeholder portrait of Jahid Khan speaking at a podium",
  },
  vision: {
    eyebrow: "My Vision For",
    title: "Sylhet City Corporation",
    text: "A modern, well-planned, clean, green and opportunity-rich Sylhet where every citizen can live with dignity, safety and hope.",
    cta: { label: "Explore My Plan", href: "/vision-plan" },
    items: [
      { icon: "leaf", title: "Clean & Green Sylhet", text: "A healthier, more sustainable city" },
      { icon: "building", title: "Modern Infrastructure", text: "Better roads, drainage and public facilities" },
      { icon: "rocket", title: "Youth Opportunities", text: "Skills, employment and innovation" },
      { icon: "smartphone", title: "Smart City Services", text: "Technology for people's convenience" },
      { icon: "users", title: "Inclusive Development", text: "No one left behind" },
    ],
  },
  focus: {
    title: "Key Focus Areas",
    text: "Working on practical solutions for a stronger, more prosperous Sylhet.",
    areas: [
      { image: "focusEducation", icon: "graduation", title: "Education & Youth", text: "Better education, skills and career opportunities" },
      { image: "focusHealth", icon: "stethoscope", title: "Healthcare for All", text: "Accessible and affordable medical services" },
      { image: "focusInfrastructure", icon: "building", title: "Infrastructure Development", text: "Roads, drainage, transportation and urban planning" },
      { image: "focusEnvironment", icon: "leaf", title: "Clean & Green Environment", text: "Waste management, greenery and climate resilience" },
      { image: "focusWelfare", icon: "handHeart", title: "Social Welfare", text: "Support for vulnerable groups and low-income families" },
      { image: "focusDigital", icon: "smartphone", title: "Digital Sylhet", text: "Smart services, technology and e-governance" },
      { image: "focusBusiness", icon: "briefcase", title: "Business & Investment", text: "Creating local and global opportunities" },
      { image: "focusSafety", icon: "shield", title: "Safe & Liveable City", text: "A city with safety, harmony and better public facilities" },
    ],
  },
  mission: {
    bannerTitle: "A Cleaner, Greener and More Prosperous Sylhet",
    text: "Preserving our natural beauty while creating new opportunities for generations to come.",
    videoLabel: "Watch My Vision Video",
    videoDuration: "3:45 minutes",
    panelTitle: "My Mission",
    items: [
      { icon: "users", title: "Serve the People", text: "Be accessible, listen and take action." },
      { icon: "lightbulb", title: "Create Opportunities", text: "For youth, businesses and communities." },
      { icon: "globe", title: "Work with Global Partners", text: "Bring investment, knowledge and innovation." },
      { icon: "building", title: "Build a Stronger Sylhet", text: "Through transparent and inclusive leadership." },
    ],
  },
  business: {
    title: "Business & Ventures",
    text: "Creating opportunities, building partnerships and contributing to community development both locally and globally.",
    cta: { label: "Explore Partnerships", href: "/contact" },
    cards: [
      { icon: "trend", title: "Investment Opportunities", text: "Connecting Sylhet with global investment." },
      { icon: "handshake", title: "Strategic Partnerships", text: "Collaboration for sustainable growth." },
      { icon: "heart", title: "Social Impact Projects", text: "Business with a purpose for community development." },
    ],
  },
  // PLACEHOLDER — mock projects.
  projects: {
    title: "Projects & Initiatives",
    text: "Initiatives for the community.",
    items: [
      { image: "projectA", tag: "Community", title: "Community Clean-Up Initiative", text: "Placeholder description — replace with details of a real initiative." },
      { image: "projectB", tag: "Youth", title: "Youth Skills Workshops", text: "Placeholder description — replace with details of a real initiative." },
      { image: "projectC", tag: "Business", title: "Local Business Meetups", text: "Placeholder description — replace with details of a real initiative." },
    ],
  },
  // PLACEHOLDER — mock statistics.
  stats: [
    { icon: "calendar", value: "5+", label: "Years of Public Engagement" },
    { icon: "building", value: "10+", label: "Projects & Initiatives" },
    { icon: "users", value: "1000+", label: "People Reached" },
    { icon: "globe", value: "Global Network", label: "Local and international partners" },
  ],
};
