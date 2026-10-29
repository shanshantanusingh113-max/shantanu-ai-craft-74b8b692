import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Nav } from "@/components/portfolio/Nav";
import { InView } from "@/components/portfolio/Motion";
import { ProjectList, SkillHeatmap } from "@/components/portfolio/Sections";
import { AWARDS, JOURNEY, PROJECTS, SKILL_GROUPS } from "@/lib/content";
import { SITE } from "@/lib/site";
import profile from "@/assets/shantanu.jpg";

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

/** Two-column section: label on the left, content on the right. */
function Section({
  id,
  title,
  children,
  full,
}: {
  id: string;
  title: string;
  children?: ReactNode;
  /** content that spans both columns, below the label row */
  full?: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-y-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-6">
        <InView as="h2" reveal="up" className="text-sm font-medium">
          {title}
        </InView>
        <div className="min-w-0">{children}</div>
      </div>
      {full && <div className="mt-10">{full}</div>}
    </section>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="link inline-flex items-center gap-1 font-medium"
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
        <section className="mx-auto max-w-5xl px-5 pb-20 pt-20 sm:pb-28 sm:pt-32">
          <p
            className="enter flex items-center gap-2 text-sm text-muted-foreground"
            style={{ ["--d" as string]: "0ms" }}
          >
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Open to ML engineering internships
          </p>
          <h1
            className="enter mt-6 max-w-[22ch] text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.035em]"
            style={{ ["--d" as string]: "80ms" }}
          >
            I build machine learning systems end to end, from training runs to the software people
            use.
          </h1>
          <p
            className="enter mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground"
            style={{ ["--d" as string]: "180ms" }}
          >
            I'm Shantanu, an AI &amp; ML undergraduate at JSS University, Noida. Two of my projects
            reached national hackathon finals this year. Most of my work is in Python and PyTorch,
            with FastAPI and React around it.
          </p>
          <div
            className="enter mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem]"
            style={{ ["--d" as string]: "280ms" }}
          >
            <ExtLink href={`mailto:${SITE.email}`}>Email</ExtLink>
            <ExtLink href={SITE.github}>GitHub</ExtLink>
            <ExtLink href={SITE.linkedin}>LinkedIn</ExtLink>
            <ExtLink href={SITE.resume}>Resume</ExtLink>
          </div>
        </section>

        {/* ── Work ──────────────────────────────────────────────── */}
        <Section id="work" title="Selected work" full={<ProjectList />}>
          <p className="max-w-[60ch] text-muted-foreground">
            {PROJECTS.length} projects. The first two reached national hackathon finals. Open one
            for the details.
          </p>
        </Section>

        {/* ── Recognition ───────────────────────────────────────── */}
        <Section id="recognition" title="Recognition">
          <ul className="border-t border-line">
            {AWARDS.map((a, i) => (
              <InView
                as="li"
                reveal="up"
                delay={i * 80}
                key={a.title}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-5"
              >
                <span className="font-mono text-sm text-muted-foreground">{a.year}</span>
                <div>
                  <p className="font-medium">
                    {a.result}, {a.title}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-muted-foreground">
                    Top {a.rank} of {a.of.toLocaleString("en-IN")} teams with {a.project}
                  </p>
                </div>
              </InView>
            ))}
            <InView
              as="li"
              reveal="up"
              delay={160}
              className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-5"
            >
              <span className="font-mono text-sm text-muted-foreground">2026</span>
              <div>
                <p className="font-medium">Smart India Hackathon</p>
                <p className="mt-1 text-[0.95rem] text-muted-foreground">
                  Built SAMUDRA, a 3D ocean data explorer for INCOIS
                </p>
              </div>
            </InView>
          </ul>
        </Section>

        {/* ── Skills ────────────────────────────────────────────── */}
        <Section id="skills" title="Skills">
          <p className="mb-8 max-w-[60ch] text-muted-foreground">
            Where each skill was actually used. Hover a cell to trace its row and column.
          </p>
          <SkillHeatmap />
          <InView as="dl" reveal="up" className="mt-12 border-t border-line">
            {SKILL_GROUPS.map((g) => (
              <div
                key={g.name}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <dt className="text-sm font-medium">{g.name}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  {g.items.join(", ")}
                </dd>
              </div>
            ))}
          </InView>
        </Section>

        {/* ── About ─────────────────────────────────────────────── */}
        <Section id="about" title="About">
          <div className="grid gap-10 lg:grid-cols-[1fr_11rem]">
            <InView reveal="up" className="max-w-[62ch] space-y-4 leading-relaxed">
              <p>
                I like problems where the model is only half the work. A fraud detector is only
                useful if an analyst can see why it fired, and a fine-tuned LLM is only interesting
                if you can measure that it got better. So I spend as much time on evaluation,
                explanations and the surrounding software as on training.
              </p>
              <p className="text-muted-foreground">
                At university I'm studying machine learning, data structures and algorithms,
                database systems and C/C++. Outside class I build projects and enter hackathons,
                which is where most of the work above comes from.
              </p>
            </InView>
            <InView reveal="up" delay={100}>
              <img
                src={profile}
                alt="Shantanu Singh"
                width={722}
                height={714}
                loading="lazy"
                decoding="async"
                className="aspect-square w-40 rounded-xl object-cover grayscale-[20%] lg:w-full"
              />
            </InView>
          </div>

          <ol className="mt-12 border-t border-line">
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
                  <p className="font-medium">{j.title}</p>
                  <p className="mt-0.5 text-[0.95rem] text-muted-foreground">{j.body}</p>
                </div>
              </InView>
            ))}
          </ol>
        </Section>

        {/* ── Contact ───────────────────────────────────────────── */}
        <Section id="contact" title="Contact">
          <InView reveal="up">
            <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              I'm looking for ML engineering internships and interesting problems to work on. Email
              is the best way to reach me.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="link break-all text-[clamp(1.25rem,3vw,1.75rem)] font-medium tracking-tight"
              >
                {SITE.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem]">
              <ExtLink href={SITE.github}>GitHub</ExtLink>
              <ExtLink href={SITE.linkedin}>LinkedIn</ExtLink>
              <ExtLink href={SITE.x}>X</ExtLink>
              <ExtLink href={SITE.resume}>Resume (PDF)</ExtLink>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">Based in Greater Noida, India.</p>
          </InView>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Shantanu Singh</p>
          <p>
            Built with React and TanStack Start.{" "}
            <a href={SOURCE} target="_blank" rel="noopener" className="link text-foreground">
              Source
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
