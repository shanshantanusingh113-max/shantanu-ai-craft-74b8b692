import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";

const LINKS = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Contact", "#contact"],
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
        className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-6 px-5"
      >
        <a href="#top" className="font-medium tracking-tight">
          Shantanu Singh
        </a>
        <ul className="flex items-center gap-5 text-sm sm:gap-7">
          {LINKS.map(([label, href]) => (
            <li key={href} className="hidden sm:block">
              <a
                href={href}
                aria-current={active === href ? "true" : undefined}
                className={`transition-colors hover:text-foreground ${
                  active === href ? "text-foreground" : "text-muted-foreground"
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
              className="inline-flex items-center gap-1 rounded-full border border-line px-3.5 py-1.5 font-medium transition-colors hover:border-foreground"
            >
              Resume <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
