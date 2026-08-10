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
        if (el && el.getBoundingClientRect().top <= 160) current = href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-500 lg:flex lg:justify-between ${
          scrolled
            ? "glass border-border/60 supports-[backdrop-filter]:backdrop-blur-xl"
            : "border border-transparent bg-transparent shadow-none"
        }`}
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="min-w-0 truncate font-display text-base font-bold tracking-tight sm:text-lg"
        >
          Shantanu<span className="text-primary">.</span>
          <span className="mono-label ml-2 hidden align-middle sm:inline">AI / ML</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map(([label, href]) => {
            const isActive = active === href;
            return (
              <li key={href} className="relative">
                <a
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-3 py-1.5 text-[13px] transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-primary transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="btn-ghost grid h-9 w-9 shrink-0 place-items-center rounded-xl lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <div
        className={`mx-auto max-w-6xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass rounded-2xl p-2">
          <ul className="grid grid-cols-2 gap-1">
            {LINKS.map(([label, href], i) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: `${open ? i * 25 : 0}ms` }}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ${
                    active === href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  } ${open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                >
                  <span className="font-mono text-[10px] text-muted-foreground">
                    0{i + 1}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
