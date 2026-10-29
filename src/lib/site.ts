import { PROJECTS } from "./content";

/**
 * Single source of truth for SEO + identity.
 * ➜ When the site is live on its final domain, change SITE_URL here
 *   (and in public/robots.txt + public/sitemap.xml).
 */
export const SITE_URL = "https://shantanu-ai-craft.lovable.app";

export const SITE = {
  url: SITE_URL,
  name: "Shantanu Singh",
  shortName: "Shantanu",
  title: "Shantanu Singh — AI/ML Engineer · Machine Learning & Generative AI",
  description:
    "Shantanu Singh is an AI/ML engineer and B.Tech CSE (AI & ML) student at JSS University, two-time national hackathon Grand Finalist. Projects in RL for LLMs, explainable fraud detection, RAG and 3D data platforms.",
  keywords: [
    "Shantanu Singh",
    "Shantanu Singh portfolio",
    "AI ML engineer",
    "machine learning engineer",
    "generative AI",
    "RAG",
    "LLM fine-tuning",
    "PyTorch",
    "FastAPI",
    "hackathon grand finalist",
    "OpenEnv hackathon",
    "JSS University Noida",
    "B.Tech CSE AI ML",
    "ML internship",
  ].join(", "),
  ogImage: `${SITE_URL}/og-image.png`,
  locale: "en_IN",
  email: "shanshantanusingh113@gmail.com",
  twitter: "@Shantan18161942",
  location: { city: "Greater Noida", region: "Uttar Pradesh", country: "IN" },
  sameAs: [
    "https://www.linkedin.com/in/shantanu-singh-056b24316",
    "https://github.com/shanshantanusingh113-max",
    "https://x.com/Shantan18161942",
  ],
  repo: "https://github.com/shanshantanusingh113-max/shantanu-ai-craft-74b8b692",
  resume: "/Shantanu_Singh_Resume.pdf",
} as const;

/** schema.org structured data — helps Google show a rich result for your name. */
export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.name,
        url: SITE.url,
        image: `${SITE.url}/og-image.png`,
        email: `mailto:${SITE.email}`,
        jobTitle: "AI/ML Engineer",
        description: SITE.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.location.city,
          addressRegion: SITE.location.region,
          addressCountry: SITE.location.country,
        },
        alumniOf: { "@type": "CollegeOrUniversity", name: "JSS University" },
        knowsAbout: [
          "Machine Learning",
          "Deep Learning",
          "Generative AI",
          "Retrieval-Augmented Generation",
          "Reinforcement Learning",
          "Explainable AI",
          "PyTorch",
          "Python",
          "C++",
          "FastAPI",
          "React",
          "Three.js",
        ],
        award: [
          "Grand Finalist, Meta × PyTorch × Hugging Face OpenEnv Hackathon 2026",
          "Grand Finalist, iDEA 2.0, Union Bank of India 2026",
        ],
        sameAs: SITE.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: `${SITE.name} — Portfolio`,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE.url}/#person` },
      },
      ...PROJECTS.map((p) => ({
        "@type": "CreativeWork",
        name: p.name,
        description: p.summary,
        ...(p.links[0] ? { url: p.links[0].href } : {}),
        keywords: p.stack.join(", "),
        author: { "@id": `${SITE.url}/#person` },
      })),
    ],
  };
}
