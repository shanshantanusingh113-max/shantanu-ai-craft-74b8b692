import { useEffect, useRef, useState } from "react";

/** Premium desktop-only cursor: inner dot, trailing ring, click pulse, and blend mode.
 *  Disabled on touch devices and when reduced motion is preferred. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [clicking, setClicking] = useState(false);

  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: PointerEvent) => {
      dotPos.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement | null;
      setHot(!!target?.closest('a, button, input, textarea, [role="button"], [data-cursor-hover]'));
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, dotPos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, dotPos.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Trailing outer ring */}
      <span
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-primary/40 transition-[width,height,opacity] duration-300 ease-out will-change-transform dark:border-primary/35"
        style={{
          width: hot ? 56 : clicking ? 28 : 36,
          height: hot ? 56 : clicking ? 28 : 36,
          opacity: hot ? 0.9 : clicking ? 0.35 : 0.55,
        }}
      />
      {/* Inner dot */}
      <span
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full bg-primary mix-blend-difference transition-[width,height] duration-150 will-change-transform"
        style={{
          width: hot ? 8 : clicking ? 5 : 6,
          height: hot ? 8 : clicking ? 5 : 6,
        }}
      />
      {/* Click ripple */}
      <span
        className="absolute left-0 top-0 rounded-full border border-primary/60 transition-all duration-500 ease-out"
        style={{
          width: clicking ? 48 : 0,
          height: clicking ? 48 : 0,
          opacity: clicking ? 0 : 0,
          transform: `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
}

