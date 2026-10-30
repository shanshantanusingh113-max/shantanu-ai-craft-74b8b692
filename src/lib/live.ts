import { createServerFn } from "@tanstack/react-start";

/**
 * Live data, fetched on the server so the browser never hits GitHub's rate limit
 * or CORS. Results are cached per server instance for a few minutes.
 */

const GITHUB_USER = "shanshantanusingh113-max";
const WEEKS = 12;

/** Deployed demos to health-check. Add LedgerLens / others here once they have public URLs. */
export const DEPLOYMENTS: { project: string; url: string }[] = [
  { project: "solar-system-lab", url: "https://shanshantanusingh113-max.github.io/kepler-orrery/" },
];

type Cached<T> = { at: number; value: T };
const cache = new Map<string, Cached<unknown>>();
async function cached<T>(key: string, ttlMs: number, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key) as Cached<T> | undefined;
  if (hit && Date.now() - hit.at < ttlMs) return hit.value;
  const value = await load();
  cache.set(key, { at: Date.now(), value });
  return value;
}

/* ── GitHub activity ─────────────────────────────────────────────────── */

export type Activity = {
  ok: boolean;
  /** one entry per day, oldest first, WEEKS*7 long */
  days: { date: string; count: number }[];
  total: number;
  repos: string[];
  lastPush?: string | undefined;
};

type GhEvent = {
  type: string;
  created_at: string;
  repo?: { name: string };
  payload?: { size?: number; commits?: unknown[] };
};

/** Pure: turn GitHub public events into a daily-count calendar. Exported for tests. */
export function toActivity(events: GhEvent[], now = new Date()): Activity {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const days: Activity["days"] = [];
  const index = new Map<string, number>();
  for (let i = WEEKS * 7 - 1; i >= 0; i--) {
    const d = new Date(end.getTime() - i * 86_400_000).toISOString().slice(0, 10);
    index.set(d, days.length);
    days.push({ date: d, count: 0 });
  }
  const repos = new Set<string>();
  let lastPush: string | undefined;
  let total = 0;
  for (const e of events) {
    const day = e.created_at?.slice(0, 10);
    const i = day ? index.get(day) : undefined;
    if (i === undefined) continue;
    const n =
      e.type === "PushEvent"
        ? Math.max(1, e.payload?.size ?? e.payload?.commits?.length ?? 1)
        : ["CreateEvent", "PullRequestEvent", "IssuesEvent", "ReleaseEvent"].includes(e.type)
          ? 1
          : 0;
    if (!n) continue;
    days[i]!.count += n;
    total += n;
    if (e.repo?.name) repos.add(e.repo.name.split("/")[1] ?? e.repo.name);
    if (e.type === "PushEvent" && (!lastPush || e.created_at > lastPush)) lastPush = e.created_at;
  }
  return { ok: true, days, total, repos: [...repos].slice(0, 6), lastPush };
}

/** Local preview only: `MOCK_LIVE=1 npm run dev` shows sample data when GitHub is unreachable. */
const MOCK = typeof process !== "undefined" && process.env?.["MOCK_LIVE"] === "1";
function mockActivity(): Activity {
  const now = Date.now();
  const events: GhEvent[] = [];
  for (let i = 0; i < 84; i++) {
    const n = (i * 7919) % 11 < 5 ? 0 : ((i * 104729) % 6) + 1;
    if (n)
      events.push({
        type: "PushEvent",
        created_at: new Date(now - i * 86_400_000).toISOString(),
        repo: { name: ["u/ledgerlens", "u/sih26067-samudra", "u/kepler-orrery"][i % 3]! },
        payload: { size: n },
      });
  }
  return toActivity(events);
}

export const getActivity = createServerFn({ method: "GET" }).handler(
  async (): Promise<Activity> => {
    if (MOCK) return mockActivity();
    return cached("activity", 10 * 60_000, async () => {
      try {
        const all: GhEvent[] = [];
        for (let page = 1; page <= 3; page++) {
          const res = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github+json",
                "User-Agent": "shantanu-portfolio",
              },
              signal: AbortSignal.timeout(6000),
            },
          );
          if (!res.ok) break;
          const batch = (await res.json()) as GhEvent[];
          all.push(...batch);
          if (batch.length < 100) break;
        }
        if (!all.length) return { ok: false, days: [], total: 0, repos: [] };
        return toActivity(all);
      } catch {
        return { ok: false, days: [], total: 0, repos: [] };
      }
    });
  },
);

/* ── Deployment health ───────────────────────────────────────────────── */

export type Health = { project: string; url: string; up: boolean; ms?: number; checkedAt: string };

export const getHealth = createServerFn({ method: "GET" }).handler(async (): Promise<Health[]> => {
  if (MOCK)
    return DEPLOYMENTS.map((d) => ({
      ...d,
      up: true,
      ms: 182,
      checkedAt: new Date().toISOString(),
    }));
  return cached("health", 60_000, () =>
    Promise.all(
      DEPLOYMENTS.map(async ({ project, url }) => {
        const t0 = Date.now();
        try {
          const res = await fetch(url, {
            method: "GET",
            redirect: "follow",
            signal: AbortSignal.timeout(5000),
          });
          return {
            project,
            url,
            up: res.ok,
            ms: Date.now() - t0,
            checkedAt: new Date().toISOString(),
          };
        } catch {
          return { project, url, up: false, checkedAt: new Date().toISOString() };
        }
      }),
    ),
  );
});
