import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const LINKS = [
  ["projects", "#projects"],
  ["activity", "#activity"],
  ["about", "#about"],
  ["contact", "#contact"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      let current = "";
      for (const [, href] of LINKS) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/85 backdrop-blur-md transition-[border-color] duration-300 ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-6 px-5 font-mono text-sm"
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="text-accent">~/</span>shantanu
        </a>
        <ul className="flex items-center gap-5 sm:gap-6">
          {LINKS.map(([label, href]) => (
            <li key={href} className="hidden md:block">
              <a
                href={href}
                aria-current={active === href ? "true" : undefined}
                className={`transition-colors hover:text-foreground ${
                  active === href ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener"
              className="rounded border border-line px-2.5 py-1 transition-colors hover:border-accent hover:text-accent"
            >
              resume.pdf
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
