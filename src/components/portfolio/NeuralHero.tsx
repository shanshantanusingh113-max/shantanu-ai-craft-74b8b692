import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "./Motion";

/**
 * Canvas behind the hero:
 *  - a drifting "neural network" of nodes that link up near each other and the cursor
 *  - particles that fly in and assemble into any text marked [data-particles],
 *    then scatter away from the pointer.
 * The real <h1> stays in the DOM (for SEO / screen readers) and turns transparent once
 * the particles have taken its place.
 */

// Viridis, deepened slightly so the yellow end stays legible on white.
const STOPS: [number, number, number][] = [
  [68, 26, 116],
  [45, 104, 142],
  [28, 146, 112],
  [104, 168, 40],
  [196, 166, 18],
];
function viridis(t: number) {
  const x = Math.min(0.999, Math.max(0, t)) * (STOPS.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = STOPS[i]!;
  const b = STOPS[i + 1]!;
  return `rgb(${(a[0] + (b[0] - a[0]) * f) | 0},${(a[1] + (b[1] - a[1]) * f) | 0},${(a[2] + (b[2] - a[2]) * f) | 0})`;
}

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  c: string;
  s: number;
};
type N = { x: number; y: number; vx: number; vy: number };

export function NeuralHero({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = wrap.current;
    const cv = canvas.current;
    if (!host || !cv || prefersReducedMotion()) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: P[] = [];
    let gapPx = 4;
    let nodes: N[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let running = false;
    let disposed = false;
    // performance.now() counts from page load, so this lines up with the intro animation.
    const boot = document.documentElement.classList.contains("seen") ? 0 : 2300;
    const startAt = Math.max(performance.now() + 150, boot);

    const sampleTargets = () => {
      const targets: { x: number; y: number; t: number }[] = [];
      const hr = host.getBoundingClientRect();
      const off = document.createElement("canvas");
      off.width = Math.ceil(W);
      off.height = Math.ceil(H);
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return targets;
      host.querySelectorAll<HTMLElement>("[data-particles]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        o.textBaseline = "middle";
        o.fillStyle = "#000";
        if ("letterSpacing" in o)
          (o as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
            cs.letterSpacing;
        o.fillText(el.textContent ?? "", r.left - hr.left, r.top - hr.top + r.height / 2);
      });
      const fs =
        parseFloat(getComputedStyle(host.querySelector("[data-particles]") ?? host).fontSize) || 80;
      const gap = Math.max(3, Math.round(fs / 40));
      gapPx = gap;
      const data = o.getImageData(0, 0, off.width, off.height).data;
      let minX = Infinity;
      let maxX = -Infinity;
      for (let y = 0; y < off.height; y += gap)
        for (let x = 0; x < off.width; x += gap)
          if (data[(y * off.width + x) * 4 + 3]! > 140) {
            targets.push({ x, y, t: 0 });
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
          }
      for (const t of targets) t.t = (t.x - minX) / Math.max(1, maxX - minX);
      return targets;
    };

    const build = () => {
      const r = host.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targets = sampleTargets();
      const size = Math.max(1.4, gapPx * 0.72);
      const old = particles;
      particles = targets.map((t, i) => {
        const prev = old[i];
        return {
          x: prev?.x ?? Math.random() * W,
          y: prev?.y ?? Math.random() * H,
          vx: 0,
          vy: 0,
          tx: t.x,
          ty: t.y,
          c: viridis(t.t),
          s: size * (0.85 + Math.random() * 0.3),
        };
      });

      const count = Math.round(Math.min(90, (W * H) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
      if (targets.length) host.setAttribute("data-particles-ready", "");
    };

    const frame = (now: number) => {
      raf = 0;
      if (!running || disposed) return;
      ctx.clearRect(0, 0, W, H);
      const lineRGB = "45,104,142";

      // network
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      const LINK = 140;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${lineRGB},${(1 - d / LINK) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 200) {
          ctx.strokeStyle = `rgba(${lineRGB},${(1 - dm / 200) * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${lineRGB},0.55)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // particles forming the name
      const live = now > startAt;
      const t = now / 1000;
      const R = 90;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        if (live) {
          const wob = Math.sin(t * 1.6 + i * 0.37) * 0.6;
          p.vx += (p.tx + wob - p.x) * 0.045;
          p.vy += (p.ty + wob - p.y) * 0.045;
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = ((R - d) / R) * 6;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
          p.vx *= 0.8;
          p.vy *= 0.8;
          p.x += p.vx;
          p.y += p.vy;
        }
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(build, 180);
    };

    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? start() : stop()));
    const onVis = () => (document.hidden ? stop() : start());

    document.fonts.ready.then(() => {
      if (disposed) return;
      build();
      io.observe(host);
    });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      stop();
      io.disconnect();
      clearTimeout(resizeT);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      host.removeAttribute("data-particles-ready");
    };
  }, []);

  return (
    <div ref={wrap} className={`neural-hero relative ${className}`}>
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
}
