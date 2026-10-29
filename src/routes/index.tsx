import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUp,
  Braces,
  BrainCircuit,
  Check,
  ChevronDown,
  Copy,
  Download,
  GitBranch,
  Github,
  GraduationCap,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Palette,
  Puzzle,
  Rocket,
  Send,
  Sparkles,
  Target,
  Terminal,
  Twitter,
  Zap,
  Layers,
  Search,
  Accessibility,
  ExternalLink,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { Nav } from "@/components/portfolio/Nav";
import { Reveal } from "@/components/portfolio/Reveal";
import { Backdrop } from "@/components/portfolio/Backdrop";
import { Cursor } from "@/components/portfolio/Cursor";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Typewriter } from "@/components/portfolio/Typewriter";
import profile from "@/assets/shantanu.jpg";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import {
  Counter,
  Magnetic,
  Marquee,
  ScrollProgress,
  SplitText,
  Tilt,
} from "@/components/portfolio/Motion";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      // Open Graph (LinkedIn, WhatsApp, Facebook previews)
      { property: "og:type", content: "profile" },
      { property: "og:site_name", content: `${SITE.name} — Portfolio` },
      { property: "og:locale", content: SITE.locale },
      { property: "og:url", content: `${SITE.url}/` },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:image", content: SITE.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Shantanu Singh — AI & ML Student portfolio" },
      { property: "profile:first_name", content: "Shantanu" },
      { property: "profile:last_name", content: "Singh" },
      // X / Twitter
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

const EMAIL = SITE.email;

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shantanu-singh-056b24316",
    Icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/shanshantanusingh113-max", Icon: Github },
  { label: "X", href: "https://x.com/Shantan18161942", Icon: Twitter },
];

const LEVELS = ["Learning", "Familiar", "Comfortable", "Proficient"] as const;

const SKILLS: {
  group: string;
  meta: string;
  items: { name: string; level: number; Icon: typeof Terminal }[];
}[] = [
  {
    group: "Programming",
    meta: "core languages",
    items: [
      { name: "Python", level: 4, Icon: Terminal },
      { name: "C++", level: 3, Icon: Braces },
    ],
  },
  {
    group: "Computer Science",
    meta: "fundamentals",
    items: [
      { name: "Data Structures & Algorithms", level: 3, Icon: Puzzle },
      { name: "Problem Solving", level: 3, Icon: Target },
      { name: "Git & Version Control", level: 3, Icon: GitBranch },
    ],
  },
  {
    group: "Artificial Intelligence",
    meta: "in progress",
    items: [{ name: "Machine Learning", level: 2, Icon: BrainCircuit }],
  },
  {
    group: "Design",
    meta: "interest",
    items: [{ name: "UI/UX Design", level: 3, Icon: Palette }],
  },
];

const SERVICES = [
  {
    name: "Python Development",
    Icon: Terminal,
    body: "Scripts, automation and small tools — building toward production-grade backends.",
  },
  {
    name: "Machine Learning Solutions",
    Icon: BrainCircuit,
    body: "Data preparation, classical ML models and evaluation, learned through hands-on experiments.",
  },
  {
    name: "UI/UX Design",
    Icon: Palette,
    body: "Clean interface design, layout systems and usable, accessible product thinking.",
  },
  {
    name: "Web Development",
    Icon: Globe,
    body: "Modern, responsive front-ends with an eye for detail and performance.",
  },
  {
    name: "AI-based Applications",
    Icon: Sparkles,
    body: "Combining models with real interfaces so the intelligence is actually usable.",
  },
];

const FEATURED = {
  title: "AI Craft Portfolio",
  tagline: "A fast, animated, SEO-ready personal site — the one you're on right now.",
  body: "Designed and shipped end-to-end: a server-rendered React app with a glassmorphism design system, light/dark theming without flash, scroll-driven motion that respects reduced-motion settings, and structured data so search engines understand who I am.",
  highlights: [
    {
      Icon: Zap,
      t: "Server-side rendered",
      b: "TanStack Start renders HTML on the server — fast first paint and crawlable content.",
    },
    {
      Icon: Layers,
      t: "Custom motion system",
      b: "Scroll reveals, 3D tilt, magnetic buttons and counters with zero animation libraries.",
    },
    {
      Icon: Search,
      t: "SEO built in",
      b: "Open Graph, Twitter cards, JSON-LD Person schema, sitemap and canonical URLs.",
    },
    {
      Icon: Accessibility,
      t: "Accessible by default",
      b: "Semantic landmarks, keyboard focus states and full reduced-motion support.",
    },
  ],
  stack: ["React 19", "TypeScript", "TanStack Start", "Tailwind CSS v4", "Vite", "Netlify"],
  repo: SITE.repo,
  live: SITE.url,
};

const STACK = [
  "Python",
  "C++",
  "Machine Learning",
  "DSA",
  "Git",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "UI/UX",
  "Figma",
];

const BUILDING = [
  {
    t: "Academic projects",
    b: "Coursework built beyond requirements — with real structure and documentation.",
  },
  {
    t: "Personal projects",
    b: "Self-directed Python and ML builds to turn theory into working software.",
  },
  { t: "AI/ML learning", b: "Model fundamentals, math intuition and practical experimentation." },
  {
    t: "DSA & problem solving",
    b: "Consistent practice on data structures, algorithms and contest-style problems.",
  },
  {
    t: "Internship preparation",
    b: "Portfolio, resume, interview fundamentals and technical communication.",
  },
  {
    t: "Community & open source",
    b: "Learning in public, reading code and contributing where I can help.",
  },
];

function Proficiency({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1" role="img" aria-label={`${LEVELS[level - 1]} level`}>
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className="h-1.5 w-6 overflow-hidden rounded-full bg-secondary">
            {i <= level && (
              <span
                className="bar-seg block h-full w-full rounded-full bg-gradient-to-r from-primary to-accent"
                style={{ transitionDelay: `${300 + i * 140}ms` }}
              />
            )}
          </span>
        ))}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {LEVELS[level - 1]}
      </span>
    </div>
  );
}

function Index() {
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy manually.");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (name.length < 2) next["name"] = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next["email"] = "Enter a valid email address.";
    if (message.length < 10) next["message"] = "A little more detail would help (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSent(true);
    toast.success("Thanks for reaching out! I'll reply soon.");
    formRef.current?.reset();
    setTimeout(() => setSent(false), 4000);
  };

  const field =
    "w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring/15";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Backdrop />
      <Cursor />
      <Nav />

      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <section id="home" className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span
                className="animate-fade-up glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground"
                style={{ animationDelay: "60ms" }}
              >
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
                Available for internships &amp; collaborations
              </span>

              <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.05] sm:text-6xl lg:text-[4.2rem]">
                <SplitText text="Shantanu" delay={140} />{" "}
                <span
                  className="split-char text-gradient"
                  style={{ animationDelay: `${140 + 9 * 38}ms` }}
                >
                  Singh
                </span>
              </h1>

              <p
                className="animate-fade-up mono-label mt-4 leading-relaxed"
                style={{ animationDelay: "220ms" }}
              >
                AI &amp; ML Student · Python Developer · C++ Programmer · UI/UX Enthusiast
              </p>

              <p
                className="animate-fade-up mt-5 text-lg sm:text-xl"
                style={{ animationDelay: "290ms" }}
              >
                I&apos;m an{" "}
                <Typewriter
                  words={[
                    "AI Enthusiast",
                    "Python Developer",
                    "C++ Programmer",
                    "Problem Solver",
                    "UI/UX Learner",
                  ]}
                />
              </p>

              <p
                className="animate-fade-up mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
                style={{ animationDelay: "360ms" }}
              >
                Second-year B.Tech undergraduate in Computer Science &amp; Engineering (AI &amp; ML)
                at JSS University. I enjoy turning ideas into working software through code and
                careful problem-solving — currently deepening Python and C++ while exploring machine
                learning and modern product engineering.
              </p>

              <div
                className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "430ms" }}
              >
                <Magnetic>
                  <a
                    href="#portfolio"
                    className="btn-primary btn-shine group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    View My Work
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Magnetic>
                <a
                  href="#contact"
                  className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  <Mail className="h-4 w-4 text-primary" /> Let&apos;s Connect
                </a>
                <a
                  href={resumeAsset.url}
                  download="Shantanu_Singh_Resume.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Download className="h-4 w-4" />
                  <span className="link-underline">Resume</span>
                </a>
              </div>

              <div
                className="animate-fade-up mt-9 flex items-center gap-3"
                style={{ animationDelay: "500ms" }}
              >
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="btn-ghost grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
                <span className="mono-label ml-1 hidden sm:inline">Gorakhpur, IN</span>
              </div>
            </div>

            {/* Hero visual */}
            <div
              className="animate-fade-up relative mx-auto w-full max-w-[22rem]"
              style={{ animationDelay: "600ms" }}
            >
              <div
                aria-hidden
                className="absolute inset-6 -z-10 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25"
              />
              <div className="animate-float panel gradient-border relative overflow-hidden rounded-[2rem] p-2.5">
                <span
                  aria-hidden
                  className="orbit-ring pointer-events-none absolute -inset-1/2 opacity-50"
                />
                <img
                  fetchPriority="high"
                  decoding="async"
                  src={profile}
                  alt="Portrait of Shantanu Singh"
                  width={722}
                  height={714}
                  loading="eager"
                  className="relative aspect-square w-full rounded-[1.6rem] object-cover"
                />
              </div>

              <span className="glass absolute -left-3 top-8 hidden rounded-xl px-3 py-1.5 font-mono text-[10px] tracking-widest sm:block">
                AI / ML
              </span>
              <span
                className="animate-float glass absolute -right-3 top-1/3 hidden rounded-xl px-3 py-1.5 font-mono text-[10px] tracking-widest sm:block"
                style={{ animationDelay: "-2s" }}
              >
                PYTHON
              </span>
              <span className="glass absolute -left-4 bottom-20 hidden rounded-xl px-3 py-1.5 font-mono text-[10px] tracking-widest sm:block">
                C++
              </span>
              <span
                className="animate-float glass absolute -right-2 bottom-10 hidden rounded-xl px-3 py-1.5 font-mono text-[10px] tracking-widest sm:block"
                style={{ animationDelay: "-4s" }}
              >
                DSA
              </span>

              <div className="panel mt-4 flex items-center justify-between rounded-2xl px-4 py-3">
                <span className="text-xs font-semibold">B.Tech CSE</span>
                <span className="mono-label">AI &amp; ML · 2029</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4"
            style={{ animationDelay: "720ms" }}
          >
            {[
              { n: 2, s: "", l: "Core languages" },
              { n: 7, s: "", l: "Skills in practice" },
              { n: 1, s: "", l: "Shipped project" },
              { n: 2029, from: 2020, s: "", l: "Graduating" },
            ].map((x) => (
              <div key={x.l} className="panel panel-hover rounded-2xl px-5 py-4">
                <p className="font-display text-2xl font-bold sm:text-3xl">
                  <span className="text-gradient">
                    <Counter from={"from" in x ? x.from : 0} to={x.n} suffix={x.s} />
                  </span>
                </p>
                <p className="mono-label mt-1">{x.l}</p>
              </div>
            ))}
          </div>

          <div className="animate-fade-up mt-10" style={{ animationDelay: "820ms" }}>
            <Marquee items={STACK} />
          </div>

          <a
            href="#about"
            className="mt-12 hidden flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary sm:flex"
            aria-label="Scroll to about section"
          >
            <span className="mono-label">Scroll</span>
            <ChevronDown className="animate-scroll-hint h-4 w-4" />
          </a>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────── */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            index="01"
            eyebrow="About"
            title="A curious engineer-in-training, building deliberately."
            sub="I care about fundamentals, clean code and interfaces that respect the person using them."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal variant="left" className="lg:col-span-2">
              <div className="panel panel-hover h-full rounded-3xl p-7 sm:p-8">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  I&apos;m a Computer Science student who enjoys learning emerging technologies and
                  turning them into something tangible. My focus right now is depth over breadth:
                  Python, C++, data structures &amp; algorithms, machine learning foundations and
                  version control. Alongside that, I study interface design because good engineering
                  and good design solve the same problem from two directions.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  I&apos;m actively looking to collaborate with developers, mentors and teams where
                  I can contribute, be challenged and ship work that matters.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      Icon: BrainCircuit,
                      t: "Currently Learning",
                      b: "Machine learning foundations, DSA and system fundamentals.",
                    },
                    {
                      Icon: Sparkles,
                      t: "Interested In",
                      b: "AI research, competitive programming, product design, open source.",
                    },
                    {
                      Icon: Target,
                      t: "Career Goal",
                      b: "A meaningful ML/software internship, then AI products with real impact.",
                    },
                  ].map(({ Icon, t, b }) => (
                    <div
                      key={t}
                      className="group rounded-2xl border border-border/70 bg-secondary/40 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-secondary/70"
                    >
                      <Icon className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
                      <h3 className="mt-3 text-sm font-semibold">{t}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <div className="panel panel-hover h-full rounded-3xl p-7">
                <div className="flex items-center justify-between">
                  <GraduationCap className="h-7 w-7 text-primary" />
                  <span className="mono-label">Snapshot</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">B.Tech CSE (AI &amp; ML)</h3>
                <p className="mt-1 text-sm text-muted-foreground">JSS University</p>
                <p className="mono-label mt-2">2025 — 2029 · Expected</p>
                <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Second-year undergraduate",
                    "Focus: AI, ML & core CS",
                    "Building DSA foundations",
                    "Open to internships",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── EDUCATION ───────────────────────────────────────── */}
        <section id="education" className="mx-auto max-w-4xl px-5 py-20 sm:py-24">
          <SectionHeading index="02" eyebrow="Education" title="Academic journey" />
          <Reveal className="relative pl-10">
            <div className="timeline-spine absolute bottom-2 left-3 top-2 w-px bg-gradient-to-b from-primary/70 via-accent/50 to-transparent" />
            {[
              {
                Icon: GraduationCap,
                title: "B.Tech · Computer Science & Engineering (AI & ML)",
                place: "JSS University",
                meta: "2025 — 2029 (Expected)",
                body: "Core computer science with a specialisation in Artificial Intelligence and Machine Learning, alongside hands-on Python and C++ practice.",
                tags: ["AI & ML", "Core CS", "Python", "C++"],
              },
              {
                Icon: Rocket,
                title: "Skill building & self-learning",
                place: "Ongoing",
                meta: "Present",
                body: "Data Structures & Algorithms, machine learning fundamentals, Git workflows and UI/UX design principles.",
                tags: ["DSA", "ML", "Git", "UI/UX"],
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                variant="left"
                delay={200 + i * 160}
                className="relative pb-8 last:pb-0"
              >
                <span className="btn-primary absolute -left-10 grid h-7 w-7 place-items-center rounded-full">
                  <item.Icon className="h-3.5 w-3.5" />
                </span>
                <div className="panel panel-hover rounded-3xl p-6">
                  <p className="mono-label text-primary">{item.meta}</p>
                  <h3 className="mt-2.5 text-base font-semibold sm:text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.place}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border/70 bg-secondary/50 px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </Reveal>
        </section>

        {/* ── SKILLS ──────────────────────────────────────────── */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            index="03"
            eyebrow="Skills"
            title="What I work with"
            sub="Honest proficiency levels — each one moving forward every semester."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {SKILLS.map((group, i) => (
              <Reveal key={group.group} variant="scale" delay={i * 110}>
                <div className="panel panel-hover h-full rounded-3xl p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                      {group.group}
                    </h3>
                    <span className="mono-label">{group.meta}</span>
                  </div>
                  <div className="mt-7 space-y-6">
                    {group.items.map((s) => (
                      <div key={s.name} className="group">
                        <div className="mb-2.5 flex min-w-0 items-center gap-2">
                          <s.Icon className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
                          <span className="truncate text-sm font-medium">{s.name}</span>
                        </div>
                        <Proficiency level={s.level} />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ──────────────────────────────────────── */}
        <section id="experience" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            index="04"
            eyebrow="Experience"
            title="Building experience"
            sub="No professional roles yet — and I won't invent any. Here's exactly where my time goes while I prepare for my first internship."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BUILDING.map((item, i) => (
              <Reveal key={item.t} delay={i * 80}>
                <div className="panel panel-hover h-full rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-widest text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                      <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
                      Active
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── SERVICES ────────────────────────────────────────── */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            index="05"
            eyebrow="Services"
            title="Where I'm heading professionally"
            sub="Areas I'm intentionally training in, with the goal of delivering them at a professional standard."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} variant="scale" delay={i * 90}>
                <div className="panel panel-hover group h-full rounded-3xl p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                      <s.Icon className="h-5 w-5" />
                    </span>
                    <span className="mono-label shrink-0">Currently learning</span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    In progress
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────── */}
        <section id="portfolio" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            index="06"
            eyebrow="Featured Project"
            title="My best work, built end to end."
            sub="One project, done properly — from design system to deployment."
          />

          <Reveal variant="scale">
            <Tilt className="rounded-[2rem]">
              <article className="panel gradient-border grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.05fr_0.95fr]">
                {/* Visual: animated browser mockup of this site */}
                <div className="relative overflow-hidden border-b border-border/70 bg-secondary/40 p-5 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="grid-bg absolute inset-0 opacity-70" />
                  <div
                    aria-hidden
                    className="animate-blob absolute -left-10 top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
                  />
                  <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-glow)]">
                    <div className="flex items-center gap-1.5 border-b border-border/70 px-3 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-3 truncate rounded-md bg-secondary px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {FEATURED.live.replace("https://", "")}
                      </span>
                    </div>
                    <div className="relative h-64 overflow-hidden sm:h-72" aria-hidden>
                      <div className="screen-scroll space-y-3 p-4">
                        <div className="flex items-center justify-between">
                          <span className="h-2 w-14 rounded-full bg-foreground/70" />
                          <span className="flex gap-1.5">
                            {[0, 1, 2, 3].map((k) => (
                              <span
                                key={k}
                                className="h-1.5 w-6 rounded-full bg-muted-foreground/30"
                              />
                            ))}
                          </span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] items-center gap-4 pt-4">
                          <div className="space-y-2">
                            <span className="block h-1.5 w-24 rounded-full bg-primary/40" />
                            <span className="block h-4 w-36 rounded-md bg-foreground/80" />
                            <span className="block h-4 w-24 rounded-md bg-gradient-to-r from-primary to-accent" />
                            <span className="block h-1.5 w-40 rounded-full bg-muted-foreground/30" />
                            <span className="block h-1.5 w-32 rounded-full bg-muted-foreground/30" />
                            <span className="mt-3 inline-block h-5 w-20 rounded-full bg-primary" />
                          </div>
                          <img
                            src={profile}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            width={80}
                            height={80}
                            className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary/40"
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 pt-3">
                          {[0, 1, 2, 3].map((k) => (
                            <span
                              key={k}
                              className="h-10 rounded-lg border border-border bg-secondary/60"
                            />
                          ))}
                        </div>
                        <span className="block h-2.5 w-28 rounded-full bg-foreground/60 pt-2" />
                        <div className="grid grid-cols-3 gap-2">
                          {[0, 1, 2, 3, 4, 5].map((k) => (
                            <span
                              key={k}
                              className="h-14 rounded-xl border border-border bg-secondary/50"
                            />
                          ))}
                        </div>
                        <span className="block h-2.5 w-24 rounded-full bg-foreground/60" />
                        <div className="grid grid-cols-2 gap-2">
                          {[0, 1].map((k) => (
                            <span
                              key={k}
                              className="h-16 rounded-xl border border-border bg-secondary/50"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-5 flex flex-wrap justify-center gap-2">
                    {FEATURED.stack.map((t, i) => (
                      <span
                        key={t}
                        className="glass animate-float rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                        style={{ animationDelay: `${-i * 1.1}s` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Copy */}
                <div className="relative flex flex-col p-7 sm:p-9">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                      <Star className="h-3 w-3 fill-current" /> Best project
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                      Live
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold sm:text-3xl">{FEATURED.title}</h3>
                  <p className="mt-2 text-sm font-medium text-primary">{FEATURED.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {FEATURED.body}
                  </p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {FEATURED.highlights.map(({ Icon, t, b }, i) => (
                      <Reveal
                        as="li"
                        key={t}
                        delay={250 + i * 110}
                        className="group rounded-2xl border border-border/70 bg-secondary/40 p-4 transition-colors duration-300 hover:border-primary/40"
                      >
                        <Icon className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
                        <p className="mt-2.5 text-sm font-semibold">{t}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b}</p>
                      </Reveal>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                    <a
                      href={FEATURED.live}
                      target="_blank"
                      rel="noopener"
                      className="btn-primary btn-shine group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                    >
                      Live site
                      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href={FEATURED.repo}
                      target="_blank"
                      rel="noopener"
                      className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                    >
                      <Github className="h-4 w-4" /> Source code
                    </a>
                  </div>
                </div>
              </article>
            </Tilt>
          </Reveal>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────── */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            index="07"
            eyebrow="Contact"
            title="Let's build something together."
            sub="I'm open to internships, collaborations, mentorship and genuinely interesting technical projects. Tell me what you're working on."
          />

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal variant="left">
              <div className="panel h-full rounded-3xl p-7">
                <div className="space-y-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </span>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="link-underline truncate text-sm hover:text-primary"
                      >
                        {EMAIL}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="btn-ghost grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </span>
                    <p className="text-sm">Gorakhpur, Uttar Pradesh, India</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {SOCIALS.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={label}
                        className="btn-ghost grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-border">
                    <iframe
                      title="Map of Gorakhpur, Uttar Pradesh"
                      src="https://www.google.com/maps?q=Gorakhpur,Uttar%20Pradesh&output=embed"
                      loading="lazy"
                      className="h-44 w-full grayscale-[35%] transition-all duration-500 hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                className="panel h-full rounded-3xl p-7"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Name
                    </span>
                    <input name="name" className={field} placeholder="Your name" />
                    {errors["name"] && (
                      <span className="mt-1.5 block text-xs text-destructive">
                        {errors["name"]}
                      </span>
                    )}
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      className={field}
                      placeholder="you@example.com"
                    />
                    {errors["email"] && (
                      <span className="mt-1.5 block text-xs text-destructive">
                        {errors["email"]}
                      </span>
                    )}
                  </label>
                </div>
                <label className="mt-4 block text-sm">
                  <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Subject
                  </span>
                  <input
                    name="subject"
                    className={field}
                    placeholder="Internship / Collaboration"
                  />
                </label>
                <label className="mt-4 block text-sm">
                  <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    className={`${field} resize-none`}
                    placeholder="Tell me about your idea..."
                  />
                  {errors["message"] && (
                    <span className="mt-1.5 block text-xs text-destructive">
                      {errors["message"]}
                    </span>
                  )}
                </label>
                <button
                  type="submit"
                  className="btn-primary group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  {sent ? (
                    <>
                      <Check className="h-4 w-4" /> Message sent
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      Send message
                    </>
                  )}
                </button>
                <p className="mono-label mt-4 block text-center">Typical reply within 1–2 days</p>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="mt-8 border-t border-border/60 px-5 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1.2fr_1fr_auto]">
          <div>
            <p className="font-display text-base font-bold">
              Shantanu<span className="text-primary">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              B.Tech CSE (AI &amp; ML) student at JSS University — Python, C++, machine learning and
              interface design.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="mono-label">Navigate</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                ["Home", "home"],
                ["About", "about"],
                ["Education", "education"],
                ["Skills", "skills"],
                ["Experience", "experience"],
                ["Services", "services"],
                ["Projects", "portfolio"],
                ["Contact", "contact"],
              ].map(([l, id]) => (
                <li key={l}>
                  <a href={`#${id}`} className="link-underline hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mono-label">Elsewhere</p>
            <div className="mt-3 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="btn-ghost grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            Designed &amp; developed by{" "}
            <span className="font-medium text-foreground">Shantanu Singh</span>
          </p>
          <p className="mono-label">
            © {new Date().getFullYear()} Shantanu Singh · All rights reserved
          </p>
        </div>
      </footer>

      {showTop && (
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            })
          }
          aria-label="Scroll to top"
          className="glass lift animate-fade-up fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full"
        >
          <ArrowUp className="h-4 w-4 text-primary" />
        </button>
      )}
    </div>
  );
}
