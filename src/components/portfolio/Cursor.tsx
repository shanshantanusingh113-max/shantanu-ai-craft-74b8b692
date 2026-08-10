import { useEffect, useState } from "react";

/** Subtle desktop-only cursor dot + ring. Disabled on touch and reduced-motion. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      setHot(!!target?.closest('a, button, input, textarea, [role="button"]'));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <span
        className="absolute rounded-full bg-primary transition-[width,height,opacity] duration-200"
        style={{
          left: pos.x,
          top: pos.y,
          width: hot ? 5 : 6,
          height: hot ? 5 : 6,
          transform: "translate(-50%, -50%)",
        }}
      />
      <span
        className="absolute rounded-full border border-primary/50 transition-all duration-300 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: hot ? 38 : 22,
          height: hot ? 38 : 22,
          opacity: hot ? 0.9 : 0.45,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
