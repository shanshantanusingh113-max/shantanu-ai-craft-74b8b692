import { useEffect, useState } from "react";

/** A short pretend "training run" shown once per session. Exits via CSS even without JS. */
export function Preloader() {
  const [epoch, setEpoch] = useState(0);
  useEffect(() => {
    if (document.documentElement.classList.contains("seen")) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1900);
      setEpoch(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const loss = (2.31 * Math.exp(-epoch / 22) + 0.04).toFixed(3);

  return (
    <div className="preloader" aria-hidden>
      <div className="w-[min(22rem,80vw)]">
        <svg viewBox="0 0 300 120" className="w-full overflow-visible">
          <defs>
            <linearGradient id="pl-g" x1="0" x2="1">
              <stop offset="0" stopColor="#4a1f78" />
              <stop offset="0.35" stopColor="#2d708e" />
              <stop offset="0.65" stopColor="#22a07a" />
              <stop offset="1" stopColor="#e8d33a" />
            </linearGradient>
          </defs>
          <line x1="0" y1="118" x2="300" y2="118" stroke="currentColor" strokeOpacity=".15" />
          <path
            className="preloader-curve"
            d="M0 6 C 30 60, 50 84, 90 96 S 170 108, 300 112"
            fill="none"
            stroke="url(#pl-g)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="mt-5 flex items-baseline justify-between font-mono text-xs text-muted-foreground">
          <span>
            Training shantanu.model <span className="text-foreground">{epoch}%</span>
          </span>
          <span>loss {loss}</span>
        </div>
      </div>
    </div>
  );
}
