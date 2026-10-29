import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "./Reveal";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Thin gradient bar at the top of the page that tracks scroll position. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        ref={ref}
        className="h-full origin-left bg-[linear-gradient(90deg,var(--neon),var(--neon-2))]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/** Letter-by-letter rise animation. Screen readers get the plain text. */
export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 38,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="split-char"
          style={{ animationDelay: `${delay + i * stagger}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

/** Counts up from 0 when scrolled into view. */
export function Counter({
  from = 0,
  to,
  suffix = "",
  duration = 1400,
}: {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [ref, visible] = useInView<HTMLSpanElement>(0.2);
  const [n, setN] = useState(from);
  useEffect(() => {
    if (!visible) return;
    if (reduced()) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, from, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/** Subtle 3D tilt that follows the pointer (desktop only), with a moving glare. */
export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
        el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
        el.style.setProperty("--gx", `${x * 100}%`);
        el.style.setProperty("--gy", `${y * 100}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
      <span aria-hidden className="tilt-glare" />
    </div>
  );
}

/** Element drifts slightly toward the cursor — used on the main CTA. */
export function Magnetic({
  children,
  strength = 0.25,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const onLeave = () => (el.style.transform = "");
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);
  return (
    <span ref={ref} className="magnetic inline-block">
      {children}
    </span>
  );
}

/** Infinite horizontal ticker; pauses on hover. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="marquee-mask relative overflow-hidden py-1"
      aria-label={`Tech stack: ${items.join(", ")}`}
    >
      <div className="marquee-track flex w-max gap-3" aria-hidden>
        {row.map((t, i) => (
          <span
            key={i}
            className="glass whitespace-nowrap rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
