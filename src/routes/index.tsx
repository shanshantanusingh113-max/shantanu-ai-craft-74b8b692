import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  MapPin,
  Send,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { Nav } from "@/components/portfolio/Nav";
import { Cursor } from "@/components/portfolio/Cursor";
import { Preloader } from "@/components/portfolio/Preloader";
import { NeuralHero } from "@/components/portfolio/NeuralHero";
import {
  InView,
  Magnetic,
  Marquee,
  Scramble,
  ScrollProgress,
  ScrubText,
} from "@/components/portfolio/Motion";
import {
  AwardField,
  DetectPhoto,
  Journey,
  ProjectStack,
  SkillHeatmap,
} from "@/components/portfolio/Sections";
import { AWARDS, PROJECTS, SKILL_GROUPS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:type", content: "profile" },
      { property: "og:site_name", content: `${SITE.name} — Portfolio` },
      { property: "og:locale", content: SITE.locale },
      { property: "og:url", content: `${SITE.url}/` },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:image", content: SITE.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Shantanu Singh — AI/ML Engineer" },
      { property: "profile:first_name", content: "Shantanu" },
      { property: "profile:last_name", content: "Singh" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE.twitter },
      { name: "twitter:creator", content: SITE.twitter },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/` }],
  }),
  component: Index,
});

const SOCIALS = [
  { label: "GitHub", href: SITE.sameAs[1], Icon: Github },
  { label: "LinkedIn", href: SITE.sameAs[0], Icon: Linkedin },
  { label: "X", href: SITE.sameAs[2], Icon: Twitter },
];

const ABOUT =
  "I'm a computer science (AI & ML) student who ships machine learning end to end — from training and evaluating models to deployed apps people actually use. I've built explainable fraud detection, RAG pipelines, an RL environment for fine-tuning LLMs and live 3D data platforms, mostly with Python, PyTorch, FastAPI and React.";

function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 sm:mb-16">
      <Scramble
        as="h2"
        text={title}
        className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]"
      />
      {note && (
        <InView
          as="p"
          reveal="up"
          className="max-w-sm text-sm leading-relaxed text-muted-foreground"
        >
          {note}
        </InView>
      )}
    </div>
  );
}

function Index() {
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Select the address and copy it manually.");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const next: Record<string, string> = {};
    if (name.length < 2) next["name"] = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next["email"] = "Use an email like you@example.com.";
    if (message.length < 10) next["message"] = "Write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Hello from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email app with the message ready to send");
  };

  const field =
    "w-full border-b border-white/20 bg-transparent py-3 text-base text-[#f1eef9] outline-none transition-colors placeholder:text-[#a39cbc]/60 focus:border-[#b5dd3c]";

  return (
    <div id="top" className="relative min-h-screen overflow-x-clip">
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <Nav />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <NeuralHero>
          <section className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-10 pt-32">
            <p
              className="enter inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm backdrop-blur"
              style={{ ["--d" as string]: "0ms" }}
            >
              <span className="live-dot h-2 w-2 rounded-full bg-[var(--v3)]" />
              Open to ML engineering internships
            </p>

            <h1 className="mt-6 font-display text-[clamp(4.2rem,17vw,12.5rem)] font-extrabold leading-[0.86] tracking-[-0.055em]">
              <span data-particles className="block">
                Shantanu
              </span>
              <span data-particles className="block">
                Singh
              </span>
            </h1>

            <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
              <p
                className="enter max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
                style={{ ["--d" as string]: "250ms" }}
              >
                AI/ML engineer and two-time national hackathon Grand Finalist. I build models and
                then build the software around them.
              </p>
              <div
                className="enter flex flex-wrap gap-3 lg:justify-end"
                style={{ ["--d" as string]: "380ms" }}
              >
                <Magnetic>
                  <a href="#work" className="btn btn-solid">
                    See projects <ArrowDown className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href={SITE.resume} download className="btn btn-line">
                    <FileText className="h-4 w-4" /> Download resume
                  </a>
                </Magnetic>
              </div>
            </div>

            <dl
              className="enter mt-14 grid grid-cols-3 gap-4 border-t border-border pt-6 sm:max-w-2xl"
              style={{ ["--d" as string]: "500ms" }}
            >
              {[
                ["2×", "national Grand Finalist"],
                [String(PROJECTS.length), "ML projects shipped"],
                ["0.999", "pair F1 on LedgerLens"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {v}
                  </dd>
                  <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{l}</dd>
                </div>
              ))}
            </dl>
          </section>
        </NeuralHero>

        {/* ── Award ticker ─────────────────────────────────────── */}
        <div className="border-y border-border bg-secondary/40 py-5" aria-label="Recognition">
          <Marquee speed={38}>
            {[
              "Grand Finalist — Meta × PyTorch × Hugging Face OpenEnv",
              "Grand Finalist — iDEA 2.0, Union Bank of India",
              "Smart India Hackathon 2026",
              "Top 100 of 31,000 teams",
              "Top 40 of 1,500 teams",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-8 pr-8 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {t}
                <span aria-hidden className="text-viridis text-xl">
                  ✦
                </span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* ── About ────────────────────────────────────────────── */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <DetectPhoto />
            <div>
              <ScrubText
                text={ABOUT}
                className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.025em]"
              />
              <InView reveal="up" as="dl" className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  ["Studying", "B.Tech CSE (AI & ML), JSS University, 2025–2029"],
                  ["Based in", "Greater Noida, India"],
                  ["Working on", "Machine learning, generative AI, full-stack apps"],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-border pt-3">
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </InView>
            </div>
          </div>
        </section>

        {/* ── Work ─────────────────────────────────────────────── */}
        <section id="work" className="mx-auto max-w-6xl px-5 pb-28 sm:pb-36">
          <SectionTitle
            title="Selected work"
            note="Six projects, from training runs to deployed apps. The first two reached national hackathon finals."
          />
          <ProjectStack />
        </section>

        {/* ── Skills ───────────────────────────────────────────── */}
        <section id="skills" className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
            <SectionTitle
              title="Skills, in use"
              note="Each lit cell is a skill I used to ship a project. Hover a cell to follow its row and column."
            />
            <SkillHeatmap />

            <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
              {SKILL_GROUPS.map((g, gi) => (
                <InView key={g.name} reveal="up" delay={gi * 90}>
                  <h3 className="text-lg font-bold">{g.name}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="cursor-default rounded-full border border-border bg-background px-2.5 py-1 text-xs transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--v3)]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </InView>
              ))}
            </div>
          </div>
        </section>

        {/* ── Awards ───────────────────────────────────────────── */}
        <section id="awards" className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
          <SectionTitle
            title="Recognition"
            note="Each square is a team. The lit ones made it to the grand final."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {AWARDS.map((a, i) => (
              <InView
                key={a.title}
                as="article"
                reveal="up"
                delay={i * 120}
                className="tile flex flex-col justify-between rounded-[1.75rem] p-7 sm:p-9"
              >
                <p className="text-sm text-muted-foreground">
                  {a.result}, {a.year}
                </p>
                <h3 className="mt-1 text-2xl font-bold leading-tight">{a.title}</h3>
                <p className="mt-6 flex flex-wrap items-baseline gap-2">
                  <span className="text-viridis font-display text-6xl font-extrabold tracking-tight">
                    Top {a.rank}
                  </span>
                  <span className="text-muted-foreground">
                    of {a.of.toLocaleString("en-IN")} teams
                  </span>
                </p>
                <div className="mt-6 text-foreground">
                  <AwardField
                    total={a.of}
                    lit={a.rank}
                    perDot={a.of > 5000 ? 100 : 1}
                    cols={a.of > 5000 ? 31 : 75}
                  />
                  {a.of > 5000 && (
                    <p className="mt-2 text-xs text-muted-foreground">One square = 100 teams</p>
                  )}
                </div>
                <p className="mt-6 text-sm">
                  Built{" "}
                  <a href="#work" className="link-u font-semibold">
                    {a.project}
                  </a>
                </p>
              </InView>
            ))}
          </div>
        </section>

        {/* ── Journey ──────────────────────────────────────────── */}
        <section id="journey" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
            <SectionTitle title="So far" note="From the first semester to the next step." />
            <Journey />
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="relative overflow-hidden bg-[#120c24] text-[#f1eef9]">
          <div
            aria-hidden
            className="grid-bg pointer-events-none absolute inset-0 opacity-40 [--grid-line:rgb(255_255_255/5%)]"
          />
          <div
            aria-hidden
            className="floaty pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#2d708e] opacity-40 blur-[120px]"
          />
          <div className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36">
            <Scramble
              as="h2"
              text="Let's build something."
              className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em]"
            />
            <div className="mt-14 grid gap-14 lg:grid-cols-2">
              <InView reveal="left">
                <p className="max-w-md text-lg leading-relaxed text-[#c9c3dd]">
                  I'm looking for ML engineering internships and interesting problems. Email is the
                  fastest way to reach me.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="min-w-0 font-display text-lg font-semibold text-[#b5dd3c] sm:text-2xl"
                  >
                    <Scramble text={SITE.email} onHover duration={600} className="break-all" />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-6 flex items-center gap-2 text-sm text-[#c9c3dd]">
                  <MapPin className="h-4 w-4" /> Greater Noida, India
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <Magnetic key={label} strength={0.35}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener"
                        aria-label={label}
                        className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-colors hover:border-[#b5dd3c] hover:text-[#b5dd3c]"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </Magnetic>
                  ))}
                  <Magnetic strength={0.2}>
                    <a
                      href={SITE.resume}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold transition-colors hover:border-[#b5dd3c] hover:text-[#b5dd3c]"
                    >
                      <FileText className="h-4 w-4" /> Resume
                    </a>
                  </Magnetic>
                </div>
              </InView>

              <InView reveal="up" delay={120}>
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  {(
                    [
                      ["name", "Your name", "text", "name"],
                      ["email", "Your email", "email", "email"],
                    ] as const
                  ).map(([n, label, type, ac]) => (
                    <label key={n} className="block">
                      <span className="text-sm text-[#a39cbc]">{label}</span>
                      <input
                        name={n}
                        type={type}
                        autoComplete={ac}
                        className={field}
                        aria-invalid={!!errors[n]}
                      />
                      {errors[n] && (
                        <span className="mt-1.5 block text-sm text-[#fb923c]">{errors[n]}</span>
                      )}
                    </label>
                  ))}
                  <label className="block">
                    <span className="text-sm text-[#a39cbc]">Message</span>
                    <textarea
                      name="message"
                      rows={4}
                      className={`${field} resize-none`}
                      aria-invalid={!!errors["message"]}
                    />
                    {errors["message"] && (
                      <span className="mt-1.5 block text-sm text-[#fb923c]">
                        {errors["message"]}
                      </span>
                    )}
                  </label>
                  <button
                    type="submit"
                    className="btn btn-solid [--background:#120c24] [--foreground:#f1eef9] [--primary-foreground:#120c24] [--primary:#b5dd3c]"
                  >
                    Send message <Send className="h-4 w-4" />
                  </button>
                </form>
              </InView>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="overflow-hidden bg-[#120c24] text-[#f1eef9]">
        <Marquee speed={45} className="border-t border-white/10 py-6">
          <span className="text-viridis whitespace-nowrap pr-10 font-display text-[clamp(4rem,14vw,11rem)] font-extrabold leading-[1.05] tracking-[-0.05em]">
            Shantanu Singh ✦ AI/ML engineer ✦
          </span>
        </Marquee>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-5 py-8 text-sm text-[#a39cbc] sm:flex-row">
          <p>© {new Date().getFullYear()} Shantanu Singh. Designed and built by me.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-5">
            {["about", "work", "skills", "contact"].map((id) => (
              <a key={id} href={`#${id}`} className="link-u capitalize hover:text-[#f1eef9]">
                {id}
              </a>
            ))}
            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener"
              className="link-u hover:text-[#f1eef9]"
            >
              Resume <ArrowUpRight className="inline h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-[var(--shadow-lift)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
