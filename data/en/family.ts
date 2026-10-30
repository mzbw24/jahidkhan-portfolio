import type { FamilyPageContent } from "@/types/family";

const familyFiles = ["image-family.jpeg", "image-family (1).jpeg", "image-family (2).jpeg", "image-family (3).jpeg", "image-family (4).jpeg", "image-family (5).jpeg", "image-family (6).jpeg", "image-family (7).jpeg", "image-family (8).jpeg", "image-family (9).jpeg"] as const;
const familyPath = (file: string) => `/images/family/${file}`;
const categories = ["family-life", "children", "travel", "celebrations", "family-life", "children", "travel", "celebrations", "family-life", "children"] as const;

export const familyEn: FamilyPageContent = {
  hero: { eyebrow: "Family", title: "My Family", accent: "My Strength", text: "Behind every step of my journey is the love, support and inspiration of my family. They keep me grounded and motivated to serve our community with a bigger purpose.", primaryCta: "Explore Our Moments", videoCta: "Watch Family Video", imageAlt: "Jahid Khan spending time with his daughter" },
  album: { title: "Our family album", subtitle: "A little collection of the moments that matter most.", all: "All moments", items: [
    { category: "family-life", title: "Family life", text: "Everyday moments", image: familyPath(familyFiles[0]) },
    { category: "celebrations", title: "Special celebrations", text: "Birthdays & events", image: familyPath(familyFiles[3]) },
    { category: "children", title: "With my children", text: "Growing together", image: familyPath(familyFiles[4]) },
    { category: "travel", title: "Family travel", text: "Exploring together", image: familyPath(familyFiles[6]) },
  ] },
  photos: { eyebrow: "Photos", title: "Photo Gallery", subtitle: "A collection of beautiful moments, memories and milestones with my family.", viewAll: "View all photos", filters: { all: "All", "family-life": "Family Life", celebrations: "Celebrations", children: "With Children", travel: "Travel" }, items: familyFiles.map((file, index) => ({ id: `family-photo-${index + 1}`, src: familyPath(file), thumb: familyPath(file), width: 1600, height: 1200, alt: "Family memory", title: "A family memory", category: categories[index]! })) },
  videos: { eyebrow: "Videos", title: "Video Gallery", subtitle: "Watch our family videos and special moments.", viewAll: "View all videos", items: [1, 2, 3, 4].map((id, index) => ({ id: `family-video-${id}`, src: `/media/videos/video-${id}.mp4`, poster: familyPath(familyFiles[index]!), title: ["A day together", "Celebrating together", "Growing together", "A family afternoon"][index]!, description: "A cherished family moment.", category: categories[index]! })) },
  story: { eyebrow: "Special moments", title: "The Heart of My Journey", text: "My family’s love, prayers and encouragement give me the courage to keep working for a better Sylhet. Every moment with them reminds me why I do what I do.", cta: "Read Our Story", quote: "A supportive family builds a stronger community.", author: "Jahid Khan" },
  values: { eyebrow: "Family values", title: "Together for a Brighter Tomorrow", text: "My family inspires me to work for a safer, greener and more prosperous Sylhet — a place where every family can thrive.", items: [{ title: "Unity", text: "Stronger families" }, { title: "Compassion", text: "Happier communities" }, { title: "A better Sylhet", text: "For future generations" }] },
  ui: { close: "Close viewer", previous: "Previous photo", next: "Next photo", play: "Play video", pause: "Pause video", video: "Video", photo: "Photo" },
};
