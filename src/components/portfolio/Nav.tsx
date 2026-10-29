import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { ThemeToggle } from "./theme";
import { SITE } from "@/lib/site";

const LINKS = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["Awards", "#awards"],
  ["Journey", "#journey"],
  ["Contact", "#contact"],
] as const;

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>("");
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, show: false });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 500 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
      let current = "";
      for (const [, href] of LINKS) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useIso(() => {
    const ul = listRef.current;
    const a = ul?.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
    if (!ul || !a) return setPill((p) => ({ ...p, show: false }));
    setPill({ left: a.offsetLeft, width: a.offsetWidth, show: true });
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-[var(--ease-out-expo)] sm:px-6 sm:pt-4 ${
        hidden && !open ? "-translate-y-[120%]" : ""
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`enter mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled || open
            ? "border border-border bg-background/75 shadow-[var(--shadow-lift)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          Shantanu Singh
        </a>

        <ul ref={listRef} className="relative hidden items-center lg:flex">
          <span
            aria-hidden
            className="absolute inset-y-0 rounded-full bg-secondary transition-all duration-500 ease-[var(--ease-out-expo)]"
            style={{ left: pill.left, width: pill.width, opacity: pill.show ? 1 : 0 }}
          />
          {LINKS.map(([label, href]) => (
            <li key={href} className="relative">
              <a
                href={href}
                aria-current={active === href ? "true" : undefined}
                className={`block rounded-full px-4 py-2 text-sm transition-colors ${
                  active === href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={SITE.resume}
            target="_blank"
            rel="noopener"
            className="btn btn-line hidden !px-4 !py-2 text-sm sm:inline-flex"
          >
            <FileText className="h-4 w-4" /> Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-full lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-0.5 w-5 rounded bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded bg-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 -z-10 bg-background transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:hidden ${
          open
            ? "[clip-path:circle(150%_at_calc(100%-2.5rem)_2.5rem)]"
            : "[clip-path:circle(0%_at_calc(100%-2.5rem)_2.5rem)]"
        }`}
      >
        <ul className="flex h-full flex-col justify-center gap-1 px-8">
          {LINKS.map(([label, href], i) => (
            <li key={href} className="overflow-hidden">
              <a
                href={href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block font-display text-5xl font-bold tracking-tight transition-transform duration-700 ease-[var(--ease-out-expo)]"
                style={{
                  transform: open ? "translateY(0)" : "translateY(110%)",
                  transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
                }}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-8">
            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener"
              tabIndex={open ? 0 : -1}
              className="btn btn-solid"
            >
              <FileText className="h-4 w-4" /> Open resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
