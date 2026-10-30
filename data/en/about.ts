import type { AboutContent } from "@/types/content";

// NOTE: Biography and milestones come from the supplied design reference — confirm with Jahid Khan.
export const aboutEn: AboutContent = {
  hero: {
    eyebrow: "About Jahid Khan",
    title: "A Proud Son of",
    accent: "Sylhet",
    text: "My journey is rooted in the values, people and heritage of Sylhet. Wherever I am, my heart remains with my hometown and its people.",
    primaryCta: { label: "My Journey", href: "#story" },
    secondaryCta: { label: "Watch My Story", video: true },
    quote: { text: "Building a developed and humane Sylhet is the goal of my life." },
    scriptTagline: "Sylhet Always in My Heart",
    portraitAlt: "Portrait of Jahid Khan",
  },
  trust: [
    { icon: "home", title: "Born in", text: "Sylhet" },
    { icon: "plane", title: "Currently in", text: "California, USA" },
    { icon: "graduation", title: "Entrepreneur", text: "& Community Leader" },
    { icon: "heart", title: "Committed to", text: "People & Development" },
    { icon: "building", title: "Independent Mayor Candidate", text: "Sylhet City Corporation" },
  ],
  story: {
    eyebrow: "My Story",
    title: "From Sylhet to a Global Perspective",
    paragraphs: [
      "I am Jahid Khan, a proud son of Sylhet, currently based in California, USA. My journey has been shaped by the values, culture and resilience of Sylhet and its people.",
      "Living abroad has given me the opportunity to learn, work and build global connections, but my roots and responsibility remain in Sylhet. I believe in practical solutions, transparent leadership and inclusive development that creates real opportunities for every citizen.",
    ],
    signatureCaption: "Independent Mayor Candidate, Sylhet City Corporation",
    quote: {
      text: "No matter where I am, Sylhet will always be my home, my inspiration and my responsibility.",
      author: "— Jahid Khan",
    },
    portraitAlt: "Full-length portrait of Jahid Khan in a suit",
  },
  values: {
    eyebrow: "My Core Values",
    items: [
      { icon: "users", title: "People First", text: "Always with the people" },
      { icon: "heart", title: "Integrity", text: "Honesty in action" },
      { icon: "eye", title: "Transparency", text: "Open and accountable" },
      { icon: "briefcase", title: "Opportunity for All", text: "Inclusive growth" },
      { icon: "leaf", title: "Sustainable Development", text: "A cleaner, greener Sylhet" },
      { icon: "handshake", title: "Community Empowerment", text: "Strong, united communities" },
    ],
  },
  vision: {
    eyebrow: "My Vision",
    title: "A Cleaner, Greener and More Prosperous Sylhet",
    text: "To build a modern, inclusive and opportunity-rich Sylhet where every citizen can live with dignity, safety and hope.",
    cta: { label: "Explore My Vision", href: "/vision-plan" },
    items: [
      { icon: "building", title: "Modern Infrastructure", text: "Better roads, transport and public facilities" },
      { icon: "heart", title: "Quality Healthcare", text: "Accessible and affordable medical services" },
      { icon: "graduation", title: "Education & Youth", text: "Skills, innovation and employment" },
      { icon: "shield", title: "Safe & Liveable City", text: "A cleaner, greener and safer environment" },
    ],
  },
  journey: {
    eyebrow: "My Journey",
    title: "Key Milestones in My Life",
    steps: [
      { icon: "home", title: "Early Life in Sylhet", text: "Grew up with the values, culture and resilience of Sylhet." },
      { icon: "graduation", title: "Education and Learning", text: "Pursued education with a focus on creating a positive impact." },
      { icon: "plane", title: "Global Exposure", text: "Moved to California, USA, gaining international experience and global connections." },
      { icon: "users", title: "Community Leadership", text: "Working with people, businesses and communities for a better Sylhet." },
    ],
    gallery: [
      { image: "galleryPeople", title: "With the People", text: "Listening, understanding, working together." },
      { image: "galleryCommunity", title: "In Community Events", text: "Supporting education, youth and development." },
      { image: "galleryPartners", title: "Building Partnerships", text: "Connecting Sylhet with global opportunities." },
      { image: "galleryFuture", title: "Always for Sylhet", text: "Working for a brighter, stronger future." },
    ],
  },
  running: {
    eyebrow: "Why I'm Running",
    title: "For the People, For a Stronger Sylhet",
    text: "I am running for Mayor of Sylhet City Corporation because I believe our city deserves better — better infrastructure, quality healthcare, improved education, more opportunities for youth and a cleaner, safer environment. This campaign is about people, progress and a brighter future for every citizen of Sylhet.",
    cta: { label: "Join the Movement", href: "/contact" },
    photoAlt: "Campaign poster showing Jahid Khan with a community member",
  },
  commitment: {
    eyebrow: "Personal Commitment",
    quote: "I am committed to working hard, listening to the people and taking practical action to solve real problems. Together, we can build a cleaner, greener, more modern and more prosperous Sylhet.",
    signatureCaption: "Independent Mayor Candidate, Sylhet City Corporation",
  },
};
