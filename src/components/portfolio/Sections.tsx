import { useId, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { InView } from "./Motion";
import { ProjectVisual } from "./ProjectVisual";
import { PROJECTS, SKILL_MATRIX, type Project } from "@/lib/content";

/* ── Work: an index of projects; each row opens into its details ───── */

export function ProjectList() {
  const [open, setOpen] = useState<string | null>(PROJECTS[0]?.id ?? null);
  return (
    <ol className="border-t border-line">
      {PROJECTS.map((p, i) => (
        <ProjectRow
          key={p.id}
          project={p}
          index={i}
          open={open === p.id}
          onToggle={() => setOpen((cur) => (cur === p.id ? null : p.id))}
        />
      ))}
    </ol>
  );
}

function ProjectRow({
  project: p,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  return (
    <InView as="li" reveal="up" delay={index * 60} className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 text-left sm:grid-cols-[9rem_1fr_auto]"
        >
          <span className="hidden font-mono text-xs text-muted-foreground sm:block">{p.kind}</span>
          <span className="min-w-0">
            <span className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent sm:text-xl">
              {p.name}
            </span>
            <span className="mt-0.5 block text-[0.95rem] text-muted-foreground">{p.tagline}</span>
          </span>
          <Plus
            aria-hidden
            className={`h-5 w-5 text-muted-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:text-foreground ${
              open ? "rotate-45" : ""
            }`}
          />
        </button>
      </h3>

      <div id={panelId} className="expand" data-open={open} role="region" aria-label={p.name}>
        <div>
          <div className="expand-inner grid gap-8 pb-10 sm:grid-cols-[9rem_1fr] sm:gap-x-6">
            <div className="hidden sm:block" />
            <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
              <div>
                {p.award && <p className="text-sm font-medium text-accent">{p.award}</p>}
                <p className={`leading-relaxed ${p.award ? "mt-2" : ""}`}>{p.summary}</p>
                <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {p.points.map((pt) => (
                    <li key={pt} className="relative pl-4">
                      <span className="absolute left-0 top-[0.7em] h-px w-2 bg-muted-foreground/60" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {p.metric && (
                  <p className="mt-6 text-sm text-muted-foreground">
                    <span className="mr-2 font-mono text-base font-medium text-foreground">
                      {p.metric.value}
                    </span>
                    {p.metric.label}
                  </p>
                )}
                <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
                  {p.stack.join(" / ")}
                </p>
                {p.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener"
                        className="link inline-flex items-center gap-1"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="self-start rounded-xl border border-line bg-subtle p-4 text-foreground">
                <ProjectVisual kind={p.visual} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </InView>
  );
}

/* ── Skills × projects heatmap ──────────────────────────────────────── */

/** one viridis colour per project column */
const COLS = ["#46247a", "#3b528b", "#2d708e", "#22a07a", "#7ab83a", "#d9c22a"];

export function SkillHeatmap() {
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);
  return (
    <InView className="relative -mx-5 overflow-x-auto px-5 pb-2" threshold={0.2}>
      <table className="w-full min-w-[640px] table-fixed border-separate border-spacing-1 text-sm">
        <caption className="sr-only">Which skills each project used</caption>
        <thead>
          <tr>
            <th className="w-44" />
            {PROJECTS.map((p, c) => (
              <th
                key={p.id}
                scope="col"
                className={`pb-3 text-left align-bottom text-xs font-normal leading-tight transition-colors ${
                  hover?.c === c ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {p.name}
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
                    className="p-0"
                    onPointerEnter={() => setHover({ r, c })}
                    onPointerLeave={() => setHover(null)}
                  >
                    <span
                      className="heat-cell relative block h-6 rounded-[3px] transition-opacity duration-300"
                      title={on ? `${row.skill} — ${p.name}` : undefined}
                      style={{
                        background: on ? COLS[c % COLS.length] : "var(--subtle)",
                        opacity: dim ? 0.35 : undefined,
                        ["--d" as string]: `${(r + c) * 30}ms`,
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
