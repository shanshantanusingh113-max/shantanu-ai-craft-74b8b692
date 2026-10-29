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
  title: "Shantanu Singh — AI & ML Student · Python & C++ Developer",
  description:
    "Portfolio of Shantanu Singh, B.Tech CSE (AI & ML) student at JSS University. Python, C++, machine learning, DSA and UI/UX — open to internships and collaborations.",
  keywords: [
    "Shantanu Singh",
    "Shantanu Singh portfolio",
    "AI ML student",
    "Python developer",
    "C++ programmer",
    "machine learning",
    "JSS University",
    "B.Tech CSE AI ML",
    "Gorakhpur developer",
    "UI/UX",
    "internship",
  ].join(", "),
  ogImage: `${SITE_URL}/og-image.png`,
  locale: "en_IN",
  email: "shantanusingh6362@gmail.com",
  twitter: "@Shantan18161942",
  location: { city: "Gorakhpur", region: "Uttar Pradesh", country: "IN" },
  sameAs: [
    "https://www.linkedin.com/in/shantanu-singh-056b24316",
    "https://github.com/shanshantanusingh113-max",
    "https://x.com/Shantan18161942",
  ],
  repo: "https://github.com/shanshantanusingh113-max/shantanu-ai-craft-74b8b692",
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
        jobTitle: "AI & ML Student, Python Developer",
        description: SITE.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.location.city,
          addressRegion: SITE.location.region,
          addressCountry: SITE.location.country,
        },
        alumniOf: { "@type": "CollegeOrUniversity", name: "JSS University" },
        knowsAbout: [
          "Python",
          "C++",
          "Machine Learning",
          "Data Structures and Algorithms",
          "Git",
          "UI/UX Design",
          "React",
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
      {
        "@type": "SoftwareSourceCode",
        name: "AI Craft Portfolio",
        description:
          "Responsive, animated personal portfolio built with React 19, TanStack Start (SSR), Tailwind CSS v4 and TypeScript.",
        codeRepository: SITE.repo,
        programmingLanguage: ["TypeScript", "React"],
        author: { "@id": `${SITE.url}/#person` },
      },
    ],
  };
}
