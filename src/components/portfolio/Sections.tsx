import { useRef, useState } from "react";
import { ArrowUpRight, Trophy } from "lucide-react";
import { InView, Tilt, useInView, useScrollProgress } from "./Motion";
import { ProjectVisual } from "./ProjectVisual";
import { JOURNEY, PROJECTS, SKILL_MATRIX, type Project } from "@/lib/content";
import profile from "@/assets/shantanu.jpg";

/* ── Photo with an object-detection box ─────────────────────────────── */

export function DetectPhoto() {
  return (
    <InView className="relative mx-auto w-full max-w-sm" threshold={0.35}>
      <div className="relative overflow-hidden rounded-3xl bg-secondary">
        <img
          src={profile}
          alt="Shantanu Singh"
          width={722}
          height={714}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="scanline absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-[var(--v4)]/30 to-transparent" />
        </div>
        <div aria-hidden className="detect-box absolute">
          {[
            "left-0 top-0 border-l-2 border-t-2 origin-top-left",
            "right-0 top-0 border-r-2 border-t-2 origin-top-right",
            "left-0 bottom-0 border-l-2 border-b-2 origin-bottom-left",
            "right-0 bottom-0 border-r-2 border-b-2 origin-bottom-right",
          ].map((c, i) => (
            <span
              key={c}
              className={`detect-corner absolute h-7 w-7 border-[var(--v4)] ${c}`}
              style={{ ["--d" as string]: `${500 + i * 90}ms` }}
            />
          ))}
          <span className="absolute -top-7 left-0 rounded-md bg-[var(--v4)] px-2 py-0.5 font-mono text-[11px] font-medium text-[#120c24]">
            shantanu 0.99
          </span>
        </div>
      </div>
    </InView>
  );
}

/* ── Skills × projects heatmap ──────────────────────────────────────── */

const HEAT = ["var(--v1)", "var(--v2)", "var(--v3)", "var(--v4)", "var(--v5)"];
/** one viridis colour per project column */
const COLS = ["#5b2a8c", "#3b528b", "#2d708e", "#22a07a", "#8cc63f", "#e8d33a"];

export function SkillHeatmap() {
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);
  return (
    <InView className="overflow-x-auto pb-2" threshold={0.2}>
      <table className="w-full min-w-[620px] table-fixed border-separate border-spacing-1.5 text-sm">
        <caption className="sr-only">Which skills each project used</caption>
        <thead>
          <tr>
            <th className="w-48" />
            {PROJECTS.map((p, c) => (
              <th
                key={p.id}
                scope="col"
                className={`h-28 align-bottom font-normal transition-colors ${
                  hover?.c === c ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span className="inline-block origin-bottom-left translate-x-1/2 -rotate-45 whitespace-nowrap text-xs">
                  {p.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SKILL_MATRIX.map((row, r) => (
            <tr key={row.skill}>
              <th
                scope="row"
                className={`pr-3 text-left font-normal transition-colors ${
                  hover?.r === r ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {row.skill}
              </th>
              {PROJECTS.map((p, c) => {
                const on = row.uses.includes(p.id);
                const dim = hover && hover.r !== r && hover.c !== c;
                return (
                  <td
                    key={p.id}
                    onPointerEnter={() => setHover({ r, c })}
                    onPointerLeave={() => setHover(null)}
                    className="p-0"
                  >
                    <span
                      className="heat-cell block h-8 rounded-md transition-[opacity,transform] duration-300 hover:scale-110"
                      title={on ? `${row.skill} used in ${p.name}` : undefined}
                      style={{
                        background: on ? COLS[c % COLS.length] : "var(--secondary)",
                        ["--d" as string]: `${(r + c) * 45}ms`,
                        filter: dim ? "saturate(0.3) opacity(0.45)" : undefined,
                      }}
                    >
                      {on && <span className="sr-only">used</span>}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </InView>
  );
}

/* ── Award: field of teams with the finalists lit ───────────────────── */

export function AwardField({
  total,
  lit,
  perDot = 1,
  cols = 50,
}: {
  total: number;
  lit: number;
  perDot?: number;
  cols?: number;
}) {
  const [ref, inView] = useInView<SVGSVGElement>(0.3);
  const dots = Math.ceil(total / perDot);
  const litDots = Math.max(1, Math.round(lit / perDot));
  const rows = Math.ceil(dots / cols);
  const S = 8;
  let grey = "";
  for (let i = litDots; i < dots; i++) {
    const x = (i % cols) * S;
    const y = Math.floor(i / cols) * S;
    grey += `M${x} ${y}h5v5h-5z`;
  }
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${cols * S} ${rows * S}`}
      className="w-full"
      role="img"
      aria-label={`${lit} of ${total.toLocaleString("en-IN")} teams reached the final`}
    >
      <path d={grey} fill="currentColor" opacity=".13" />
      {Array.from({ length: litDots }, (_, i) => (
        <rect
          key={i}
          x={(i % cols) * S}
          y={Math.floor(i / cols) * S}
          width="5"
          height="5"
          fill={HEAT[2 + (i % 3)]}
          style={{
            opacity: inView ? 1 : 0,
            transition: `opacity .4s ease ${300 + i * 25}ms`,
          }}
        />
      ))}
    </svg>
  );
}

/* ── Stacking project cards ─────────────────────────────────────────── */

export function ProjectStack() {
  const list = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(list, "pinned");
  const n = PROJECTS.length;
  return (
    <div ref={list} className="relative">
      {PROJECTS.map((proj, i) => {
        const past = Math.max(0, Math.min(1, p * n - i - 0.35));
        return (
          <div
            key={proj.id}
            className="mb-6 lg:sticky lg:mb-10"
            style={{ top: `calc(6.5rem + ${i * 14}px)` }}
          >
            <div
              className="origin-top transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${1 - past * 0.06})`,
                filter: `brightness(${1 - past * 0.25})`,
              }}
            >
              <ProjectCard project={proj} index={i} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <InView
      as="article"
      reveal="scale"
      threshold={0.1}
      className="tile grid overflow-hidden rounded-[1.75rem] lg:min-h-[30rem] lg:grid-cols-[1fr_1.1fr]"
    >
      <Tilt className="relative min-h-56 overflow-hidden border-b border-border bg-secondary/50 text-foreground lg:border-b-0 lg:border-r">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="relative flex h-full items-center px-6 pb-6 pt-12 sm:px-10">
          <ProjectVisual kind={p.visual} />
        </div>
        <span className="absolute left-5 top-4 font-display text-sm font-semibold text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </Tilt>
      <div className="flex flex-col p-6 sm:p-9">
        {p.award && (
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--v4)]/15 px-3 py-1 text-xs font-medium text-foreground">
            <Trophy className="h-3.5 w-3.5 text-[var(--v3)]" /> {p.award}
          </span>
        )}
        <h3 className="text-3xl font-bold sm:text-4xl">{p.name}</h3>
        <p className="mt-1.5 text-base text-muted-foreground">{p.tagline}</p>
        {p.metric && (
          <div className="mt-6 flex items-end gap-3 border-y border-border py-4">
            <span className="text-viridis font-display text-5xl font-extrabold leading-none tracking-tight">
              {p.metric.value}
            </span>
            <span className="pb-1 text-sm text-muted-foreground">{p.metric.label}</span>
          </div>
        )}
        <p className="mt-5 text-[0.95rem] leading-relaxed">{p.summary}</p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--v3)]" />
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
          {p.links.length > 0 && (
            <div className="flex gap-2">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-line !py-2 !text-sm"
                >
                  {l.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </InView>
  );
}

/* ── Journey: path draws itself as you scroll ───────────────────────── */

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const p = useScrollProgress(ref);
  const drawn = Math.min(1, Math.max(0, (p - 0.15) / 0.55));
  return (
    <ol ref={ref} className="relative mx-auto max-w-3xl">
      <span
        aria-hidden
        className="absolute bottom-0 left-4 top-0 w-0.5 -translate-x-1/2 bg-border sm:left-1/2"
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-4 top-0 w-[3px] origin-top -translate-x-1/2 bg-[linear-gradient(#4a1f78,#22a07a_50%,#e8d33a)] sm:left-1/2"
        style={{ transform: `translateX(-50%) scaleY(${drawn})` }}
      />
      {JOURNEY.map((j, i) => {
        const reached = drawn >= (i + 0.5) / JOURNEY.length;
        const right = i % 2 === 1;
        return (
          <li
            key={j.title}
            className="relative pb-12 pl-12 last:pb-0 sm:grid sm:grid-cols-2 sm:gap-16 sm:pl-0"
          >
            <span
              aria-hidden
              className={`absolute left-4 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-all duration-500 sm:left-1/2 ${
                reached
                  ? "scale-125 border-[var(--v4)] bg-[var(--v4)]"
                  : "border-border bg-background"
              }`}
            />
            <InView
              reveal={right ? "scale" : "left"}
              className={right ? "sm:col-start-2" : "sm:text-right"}
            >
              <p className="font-display text-sm font-semibold text-[var(--v3)]">{j.when}</p>
              <h3 className="mt-1 text-xl font-bold">{j.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{j.body}</p>
            </InView>
          </li>
        );
      })}
    </ol>
  );
}
