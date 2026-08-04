import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme";

const LINKS = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Education", "#education"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Services", "#services"],
  ["Portfolio", "#portfolio"],
  ["Contact", "#contact"],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      let current = "#home";
      for (const [, href] of LINKS) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= 140) current = href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-2.5 transition-all lg:flex lg:justify-between ${
          scrolled ? "glass gradient-border" : "border border-transparent"
        }`}
        aria-label="Main navigation"
      >
        <a href="#home" className="min-w-0 truncate font-display text-lg font-bold tracking-tight">
          Shantanu<span className="text-gradient">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === href
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="glass grid h-9 w-9 shrink-0 place-items-center rounded-xl lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass animate-fade-up mx-auto mt-2 max-w-6xl rounded-2xl p-3 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
