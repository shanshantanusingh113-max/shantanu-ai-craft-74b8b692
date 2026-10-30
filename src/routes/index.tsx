import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Nav } from "@/components/portfolio/Nav";
import { InView } from "@/components/portfolio/Motion";
import { Console } from "@/components/portfolio/Console";
import { ActivityPanel, RunsTable, SkillHeatmap } from "@/components/portfolio/Sections";
import { AWARDS, JOURNEY, SKILL_GROUPS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/` },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:image", content: SITE.ogImage },
      { property: "og:locale", content: SITE.locale },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: SITE.twitter },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/` }],
  }),
  component: Index,
});

const SOURCE = "https://github.com/shanshantanusingh113-max/shantanu-ai-craft-74b8b692";

const CONSOLE = [
  {
    cmd: "whoami",
    out: ["Shantanu Singh. ML engineer, B.Tech CSE (AI & ML) at JSS University, Noida."],
  },
  {
    cmd: "cat focus.txt",
    out: [
      "Training and evaluating models, then building the software around them.",
      "Mostly Python and PyTorch, with FastAPI and React.",
    ],
  },
  {
    cmd: "grep finalist awards.log",
    out: [
      "2026  OpenEnv Hackathon   top 100 / 31,000",
      "2026  iDEA 2.0             top 40 / 1,500",
    ],
  },
];

function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <InView
        reveal="up"
        className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2"
      >
        <h2 className="font-mono text-lg">
          <span className="text-accent">#</span> {title}
        </h2>
        {note && <p className="max-w-md text-sm text-muted-foreground">{note}</p>}
      </InView>
      {children}
    </section>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="link inline-flex items-center gap-1"
    >
      {children}
      {external && <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />}
    </a>
  );
}

function Index() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      toast.success("Email address copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Select the address and copy it manually.");
    }
  };

  return (
    <div id="top" className="min-h-screen">
      <Nav />

      <main>
        {/* ── Intro ─────────────────────────────────────────────── */}
        <section className="mx-auto grid max-w-5xl items-start gap-12 px-5 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p
              className="enter flex items-center gap-2 font-mono text-xs text-muted-foreground"
              style={{ ["--d" as string]: "0ms" }}
            >
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-ok" />
              open to ML engineering internships
            </p>
            <h1
              className="enter mt-5 text-[clamp(2.4rem,6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
              style={{ ["--d" as string]: "60ms" }}
            >
              Shantanu Singh
            </h1>
            <p
              className="enter mt-5 max-w-[46ch] text-lg leading-relaxed text-muted-foreground"
              style={{ ["--d" as string]: "140ms" }}
            >
              I build machine learning systems end to end: the training run, the evaluation, and the
              app someone actually uses. Two national hackathon finals this year.
            </p>
            <div
              className="enter mt-7 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm"
              style={{ ["--d" as string]: "220ms" }}
            >
              <Ext href={`mailto:${SITE.email}`}>email</Ext>
              <Ext href={SITE.github}>github</Ext>
              <Ext href={SITE.linkedin}>linkedin</Ext>
              <Ext href={SITE.resume}>resume</Ext>
            </div>
          </div>
          <div className="enter" style={{ ["--d" as string]: "200ms" }}>
            <Console lines={CONSOLE} />
          </div>
        </section>

        {/* ── Projects ──────────────────────────────────────────── */}
        <Section
          id="projects"
          title="projects"
          note="Click a row for details. Deployed demos are checked live from the server."
        >
          <RunsTable />
        </Section>

        {/* ── Activity ──────────────────────────────────────────── */}
        <Section
          id="activity"
          title="activity"
          note="Public GitHub activity, refreshed every few minutes."
        >
          <ActivityPanel profileUrl={SITE.github} />
          <ul className="mt-8 border-t border-line">
            {AWARDS.map((a, i) => (
              <InView
                as="li"
                reveal="up"
                delay={i * 70}
                key={a.title}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-4 sm:grid-cols-[3.5rem_1fr_auto]"
              >
                <span className="font-mono text-sm text-muted-foreground">{a.year}</span>
                <span>
                  {a.result}, {a.title}
                  <span className="block text-sm text-muted-foreground sm:inline">
                    <span className="hidden sm:inline"> — </span>with {a.project}
                  </span>
                </span>
                <span className="col-start-2 font-mono text-sm text-accent sm:col-start-auto">
                  top {a.rank} / {a.of.toLocaleString("en-IN")}
                </span>
              </InView>
            ))}
            <InView
              as="li"
              reveal="up"
              delay={140}
              className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-4 sm:grid-cols-[3.5rem_1fr_auto]"
            >
              <span className="font-mono text-sm text-muted-foreground">2026</span>
              <span>
                Smart India Hackathon
                <span className="block text-sm text-muted-foreground sm:inline">
                  <span className="hidden sm:inline"> — </span>with SAMUDRA
                </span>
              </span>
              <span className="col-start-2 font-mono text-sm text-muted-foreground sm:col-start-auto">
                participant
              </span>
            </InView>
          </ul>
        </Section>

        {/* ── Skills ────────────────────────────────────────────── */}
        <Section
          id="skills"
          title="skills"
          note="Where each one was actually used. Hover to trace."
        >
          <SkillHeatmap />
          <InView as="dl" reveal="up" className="mt-10 border-t border-line">
            {SKILL_GROUPS.map((g) => (
              <div
                key={g.name}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <dt className="font-mono text-sm">{g.name.toLowerCase()}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  {g.items.join(", ")}
                </dd>
              </div>
            ))}
          </InView>
        </Section>

        {/* ── About ─────────────────────────────────────────────── */}
        <Section id="about" title="about">
          <InView reveal="up" className="max-w-[64ch] space-y-4 leading-relaxed">
            <p>
              I like problems where the model is only half the work. A fraud detector is only useful
              if an analyst can see why it fired, and a fine-tuned LLM is only interesting if you
              can measure that it got better. So I spend as much time on evaluation, explanations
              and the surrounding software as on training.
            </p>
            <p className="text-muted-foreground">
              Outside class I build projects and enter hackathons, which is where most of the work
              above comes from.
            </p>
          </InView>
          <ol className="mt-8 border-t border-line">
            {JOURNEY.map((j, i) => (
              <InView
                as="li"
                reveal="up"
                delay={i * 60}
                key={j.title}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-4"
              >
                <span className="font-mono text-sm text-muted-foreground">{j.when}</span>
                <div>
                  <p>{j.title}</p>
                  <p className="mt-0.5 text-[0.95rem] text-muted-foreground">{j.body}</p>
                </div>
              </InView>
            ))}
          </ol>
        </Section>

        {/* ── Contact ───────────────────────────────────────────── */}
        <Section id="contact" title="contact">
          <InView reveal="up">
            <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              I'm looking for ML engineering internships and interesting problems. Email is the
              fastest way to reach me.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="link break-all font-mono text-[clamp(1.05rem,2.6vw,1.5rem)] text-accent"
              >
                {SITE.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="grid h-9 w-9 shrink-0 place-items-center rounded border border-line text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
              <Ext href={SITE.github}>github</Ext>
              <Ext href={SITE.linkedin}>linkedin</Ext>
              <Ext href={SITE.x}>x</Ext>
              <Ext href={SITE.resume}>resume.pdf</Ext>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">Greater Noida, India (IST).</p>
          </InView>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-7 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Shantanu Singh</p>
          <a href={SOURCE} target="_blank" rel="noopener" className="link hover:text-foreground">
            source on github
          </a>
        </div>
      </footer>
    </div>
  );
}
