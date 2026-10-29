/**
 * Site identity. When the site moves to its final domain, change SITE_URL here
 * and in public/robots.txt + public/sitemap.xml.
 */
export const SITE_URL = "https://shantanu-ai-craft.lovable.app";

export const SITE = {
  url: SITE_URL,
  name: "Shantanu Singh",
  title: "Shantanu Singh — Machine learning engineer",
  description:
    "Shantanu Singh builds machine learning systems end to end, from training runs to the software around them. B.Tech CSE (AI & ML) at JSS University.",
  ogImage: `${SITE_URL}/og-image.png`,
  locale: "en_IN",
  email: "shanshantanusingh113@gmail.com",
  twitter: "@Shantan18161942",
  linkedin: "https://www.linkedin.com/in/shantanu-singh-056b24316",
  github: "https://github.com/shanshantanusingh113-max",
  x: "https://x.com/Shantan18161942",
  resume: "/Shantanu_Singh_Resume.pdf",
} as const;

/** Minimal schema.org profile so search engines connect the site to its owner. */
export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    jobTitle: "Machine learning engineer",
    alumniOf: { "@type": "CollegeOrUniversity", name: "JSS University" },
    sameAs: [SITE.github, SITE.linkedin, SITE.x],
  };
}
