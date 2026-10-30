import { useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { InView } from "./Motion";
import { ProjectVisual } from "./ProjectVisual";
import { PROJECTS, SKILL_MATRIX, type Project } from "@/lib/content";
import { getActivity, getHealth, type Activity, type Health } from "@/lib/live";

/* ── Live data hooks (client-side, after first paint) ───────────────── */

function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => getHealth(),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}

function useActivity() {
  return useQuery({
    queryKey: ["activity"],
    queryFn: () => getActivity(),
    staleTime: 10 * 60_000,
    refetchOnWindowFocus: false,
  });
}

/* ── Status pill ────────────────────────────────────────────────────── */

function Status({
  project,
  health,
  loading,
}: {
  project: Project;
  health?: Health | undefined;
  loading: boolean;
}) {
  if (health || (loading && project.links.some((l) => l.label === "Live demo"))) {
    if (!health) return <span className="font-mono text-xs text-muted-foreground">checking…</span>;
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-mono text-xs ${health.up ? "text-ok" : "text-bad"}`}
        title={`Checked ${new Date(health.checkedAt).toLocaleTimeString()}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${health.up ? "live-dot bg-ok" : "bg-bad"}`} />
        {health.up ? `live${health.ms ? ` · ${health.ms}ms` : ""}` : "down"}
      </span>
    );
  }
  if (p_isFinalist(project)) return <span className="font-mono text-xs text-accent">finalist</span>;
  if (project.links.length)
    return <span className="font-mono text-xs text-muted-foreground">code</span>;
  return <span className="font-mono text-xs text-muted-foreground">built</span>;
}
const p_isFinalist = (p: Project) => !!p.award?.toLowerCase().includes("finalist");

/* ── Projects as a table of runs; each row expands ──────────────────── */

export function RunsTable() {
  const [open, setOpen] = useState<string | null>(PROJECTS[0]?.id ?? null);
  const health = useHealth();
  const byProject = new Map((health.data ?? []).map((h) => [h.project, h]));

  return (
    <div>
      <div className="hidden grid-cols-[1.4fr_1fr_1.1fr_6.5rem] gap-4 border-b border-line pb-2 font-mono text-xs text-muted-foreground md:grid">
        <span>project</span>
        <span>area</span>
        <span>headline result</span>
        <span className="text-right">status</span>
      </div>
      <ol>
        {PROJECTS.map((p, i) => (
          <Run
            key={p.id}
            project={p}
            index={i}
            open={open === p.id}
            onToggle={() => setOpen((cur) => (cur === p.id ? null : p.id))}
            health={byProject.get(p.id)}
            loading={health.isLoading}
          />
        ))}
      </ol>
      {(health.data?.length ?? 0) > 0 && (
        <button
          type="button"
          onClick={() => health.refetch()}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCw className={`h-3 w-3 ${health.isFetching ? "animate-spin" : ""}`} />
          re-check deployments
        </button>
      )}
    </div>
  );
}

function Run({
  project: p,
  index,
  open,
  onToggle,
  health,
  loading,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
  health?: Health | undefined;
  loading: boolean;
}) {
  const panelId = useId();
  return (
    <InView as="li" reveal="up" delay={index * 50} className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className={`group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 text-left transition-colors md:grid-cols-[1.4fr_1fr_1.1fr_6.5rem] ${
            open ? "" : "hover:bg-subtle/60"
          }`}
        >
          <span className="flex min-w-0 items-baseline gap-2">
            <span
              aria-hidden
              className={`font-mono text-xs text-muted-foreground transition-transform duration-300 ${open ? "rotate-90 text-accent" : ""}`}
            >
              ›
            </span>
            <span className="font-medium transition-colors group-hover:text-accent">{p.name}</span>
          </span>
          <span className="order-last col-span-2 pl-4 text-sm text-muted-foreground md:order-none md:col-span-1 md:pl-0">
            {p.kind}
          </span>
          <span className="hidden font-mono text-sm md:block">
            {p.metric ? (
              <>
                {p.metric.value}{" "}
                <span className="font-sans text-muted-foreground">
                  {shortMetric(p.metric.label)}
                </span>
              </>
            ) : (
              "—"
            )}
          </span>
          <span className="text-right">
            <Status project={p} health={health} loading={loading} />
          </span>
        </button>
      </h3>

      <div id={panelId} className="expand" data-open={open} role="region" aria-label={p.name}>
        <div>
          <div className="expand-inner grid gap-8 pb-8 pl-4 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-[0.95rem] text-muted-foreground">{p.tagline}</p>
              {p.award && <p className="mt-3 text-sm text-accent">{p.award}</p>}
              <p className="mt-3 leading-relaxed">{p.summary}</p>
              <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                {p.points.map((pt) => (
                  <li key={pt} className="relative pl-4">
                    <span className="absolute left-0 font-mono text-accent/70">-</span>
                    {pt}
                  </li>
                ))}
              </ul>
              {p.metric && (
                <p className="mt-5 text-sm text-muted-foreground md:hidden">
                  <span className="mr-2 font-mono text-foreground">{p.metric.value}</span>
                  {p.metric.label}
                </p>
              )}
              <p className="mt-5 font-mono text-xs leading-relaxed text-muted-foreground">
                {p.stack.join("  ")}
              </p>
              {p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-5 text-sm">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="link inline-flex items-center gap-1 font-medium text-accent"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="self-start rounded-lg border border-line bg-subtle p-4 text-foreground">
              <ProjectVisual kind={p.visual} />
            </div>
          </div>
        </div>
      </div>
    </InView>
  );
}

const shortMetric = (label: string) => label.split(/[,(]| vs | with /)[0]!.trim();

/* ── GitHub activity ────────────────────────────────────────────────── */

const LEVELS = ["var(--subtle)", "#2a3d5a", "var(--v2)", "var(--v3)", "var(--v4)"];
const level = (n: number) => (n === 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 7 ? 3 : 4);

export function ActivityPanel({ profileUrl }: { profileUrl: string }) {
  const q = useActivity();
  const a: Activity | undefined = q.data;

  return (
    <InView reveal="up" className="rounded-lg border border-line p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-sm">
          <span className="text-accent">git</span> log --since=12.weeks
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener"
          className="link inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          GitHub profile <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {q.isLoading ? (
        <div className="mt-5 space-y-3">
          <div className="skeleton h-[104px] rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
        </div>
      ) : a?.ok ? (
        <>
          <div className="mt-5 grid items-start gap-6 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="-mx-1 overflow-x-auto px-1">
              <div
                className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
                role="img"
                aria-label={`${a.total} public contributions in the last 12 weeks`}
              >
                {a.days.map((d) => (
                  <span
                    key={d.date}
                    title={`${d.count} on ${d.date}`}
                    className="h-3 w-3 rounded-[2px] sm:h-4 sm:w-4"
                    style={{ background: LEVELS[level(d.count)] }}
                  />
                ))}
              </div>
            </div>
            <dl className="grid gap-4 text-sm sm:grid-cols-3 md:grid-cols-1">
              <div>
                <dt className="text-muted-foreground">Public contributions</dt>
                <dd className="mt-0.5 font-mono text-lg">{a.total}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Last push</dt>
                <dd className="mt-0.5 font-mono text-lg">{a.lastPush ? ago(a.lastPush) : "—"}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted-foreground">Recently in</dt>
                <dd className="mt-0.5 truncate font-mono">{a.repos.join(", ") || "—"}</dd>
              </div>
            </dl>
          </div>
        </>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">
          GitHub isn't responding right now. The full history is on the profile.
        </p>
      )}
    </InView>
  );
}

function ago(iso: string) {
  const h = Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return d === 1 ? "yesterday" : `${d} days ago`;
}

/* ── Skills × projects heatmap ──────────────────────────────────────── */

const COLS = ["#6a3fb0", "#3e64a8", "#2d8bb0", "#22a07a", "#7ab83a", "#d9c22a"];

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
                className={`pb-3 text-left align-bottom font-mono text-xs font-normal leading-tight transition-colors ${
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
                        opacity: dim ? 0.3 : undefined,
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
