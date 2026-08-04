import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUp,
  Braces,
  BrainCircuit,
  Check,
  Copy,
  Download,
  GitBranch,
  Github,
  GraduationCap,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Puzzle,
  Rocket,
  Send,
  Sparkles,
  Target,
  Terminal,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { Nav } from "@/components/portfolio/Nav";
import { Reveal } from "@/components/portfolio/Reveal";
import { Typewriter } from "@/components/portfolio/Typewriter";
import profile from "@/assets/shantanu.jpg";

const TITLE = "Shantanu Singh — AI & ML Student, Python & C++ Developer";
const DESC =
  "Portfolio of Shantanu Singh, second-year B.Tech CSE (AI & ML) student at JSS University — Python, C++, machine learning, DSA and UI/UX.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EMAIL = "shantanusingh6362@gmail.com";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shantanu-singh-056b24316", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/shanshantanusingh113-max", Icon: Github },
  { label: "X", href: "https://x.com/Shantan18161942", Icon: Twitter },
];

const SKILLS = [
  { group: "Programming", items: [{ name: "Python", value: 80, Icon: Terminal }, { name: "C++", value: 72, Icon: Braces }] },
  {
    group: "Computer Science",
    items: [
      { name: "Data Structures & Algorithms", value: 68, Icon: Puzzle },
      { name: "Problem Solving", value: 75, Icon: Target },
      { name: "Git", value: 70, Icon: GitBranch },
    ],
  },
  { group: "Artificial Intelligence", items: [{ name: "Machine Learning", value: 60, Icon: BrainCircuit }] },
  { group: "Design", items: [{ name: "UI/UX Design", value: 65, Icon: Palette }] },
];

const SERVICES = [
  { name: "Python Development", Icon: Terminal },
  { name: "Machine Learning Solutions", Icon: BrainCircuit },
  { name: "UI/UX Design", Icon: Palette },
  { name: "Web Development", Icon: Globe },
  { name: "AI-based Applications", Icon: Sparkles },
];

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{sub}</p>}
    </Reveal>
  );
}

function SkillBar({
  name,
  value,
  Icon,
}: {
  name: string;
  value: number;
  Icon: typeof Terminal;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate text-sm font-medium">{name}</span>
        </div>
        <span className="text-xs text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="btn-glow h-full rounded-full transition-[width] duration-1000 ease-out"
          style={{ width: on ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function Index() {
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks for reaching out! I'll reply soon.");
    e.currentTarget.reset();
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-primary/25 blur-[120px]" />
        <div
          className="animate-blob absolute -right-40 top-1/3 h-[38rem] w-[38rem] rounded-full bg-accent/25 blur-[130px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="animate-blob absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-primary/15 blur-[120px]"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <Nav />

      <main>
        {/* HERO */}
        <section id="home" className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:pt-40">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="animate-fade-up">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Available for internships & collaborations
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-6xl">
                Shantanu <span className="text-gradient">Singh</span>
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                AI & Machine Learning Student · Python Developer · C++ Programmer · UI/UX Enthusiast
              </p>
              <p className="mt-3 text-lg">
                I&apos;m a <Typewriter words={["AI Enthusiast", "Python Developer", "C++ Programmer", "Problem Solver", "UI/UX Learner"]} />
              </p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Hi, I&apos;m Shantanu, a second-year B.Tech undergraduate pursuing Computer Science &
                Engineering (AI & ML) at JSS University. I enjoy turning creative ideas into reality through
                code and problem-solving. Currently, I&apos;m strengthening my expertise in Python and C++ while
                continuously exploring Artificial Intelligence, Machine Learning, and modern software
                development.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="btn-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  <Mail className="h-4 w-4" /> Contact Me
                </a>
                <button
                  type="button"
                  onClick={() => toast.info("Resume will be available soon.")}
                  className="glass gradient-border lift inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  <Download className="h-4 w-4 text-primary" /> Download Resume
                </button>
              </div>
              <div className="mt-8 flex items-center gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="glass lift grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="animate-float glass gradient-border overflow-hidden rounded-[2.5rem] p-3">
                <img
                  src={profile}
                  alt="Portrait of Shantanu Singh"
                  width={722}
                  height={714}
                  className="aspect-square w-full rounded-[2rem] object-cover"
                />
              </div>
              <div className="glass absolute -bottom-4 left-4 rounded-2xl px-4 py-2 text-xs">
                <span className="font-semibold">B.Tech CSE</span>
                <span className="text-muted-foreground"> · AI & ML · 2029</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle
            eyebrow="About"
            title="A curious student building for the future"
            sub="Passionate about emerging technologies, clean code and thoughtful design."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="glass gradient-border lift h-full rounded-3xl p-7">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Shantanu is a passionate Computer Science student who enjoys learning emerging technologies
                  and building technical skills. He is actively developing expertise in Python, C++, Machine
                  Learning, Data Structures & Algorithms, and Git while aiming to contribute to impactful
                  software and AI projects. He is eager to collaborate with fellow developers, mentors, and
                  innovative teams.
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-secondary/60 p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                      <Sparkles className="h-4 w-4 text-primary" /> Personal interests
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      AI research, competitive programming, interface design, open-source and tech communities.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-secondary/60 p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                      <Target className="h-4 w-4 text-primary" /> Career goals
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Land a meaningful software / ML internship and ship AI-driven products that solve real
                      problems.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="glass gradient-border lift h-full rounded-3xl p-7">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Education</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  B.Tech in Computer Science & Engineering (AI & ML)
                </p>
                <p className="mt-1 text-sm font-medium">JSS University</p>
                <p className="mt-1 text-xs text-muted-foreground">Expected graduation · 2029</p>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {["Second year undergraduate", "Focus: AI, ML & core CS", "Building DSA foundations"].map(
                    (t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* EDUCATION TIMELINE */}
        <section id="education" className="mx-auto max-w-4xl px-5 py-24">
          <SectionTitle eyebrow="Education" title="Academic journey" />
          <div className="relative pl-10">
            <div className="absolute bottom-2 left-3 top-2 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
            {[
              {
                Icon: GraduationCap,
                title: "B.Tech · Computer Science & Engineering (AI & ML)",
                place: "JSS University",
                meta: "2025 — 2029 (Expected)",
                body: "Core computer science with a specialisation in Artificial Intelligence and Machine Learning, alongside hands-on Python and C++ practice.",
              },
              {
                Icon: Rocket,
                title: "Skill building & self-learning",
                place: "Ongoing",
                meta: "Present",
                body: "Data Structures & Algorithms, machine learning fundamentals, Git workflows and UI/UX design principles.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 120} className="relative pb-10 last:pb-0">
                <span className="btn-glow absolute -left-10 grid h-7 w-7 place-items-center rounded-full">
                  <item.Icon className="h-3.5 w-3.5" />
                </span>
                <div className="glass gradient-border lift rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.meta}</p>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.place}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle eyebrow="Skills" title="What I work with" sub="Growing every semester." />
          <div className="grid gap-6 md:grid-cols-2">
            {SKILLS.map((group, i) => (
              <Reveal key={group.group} delay={i * 100}>
                <div className="glass gradient-border lift h-full rounded-3xl p-7">
                  <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
                    {group.group}
                  </h3>
                  <div className="space-y-5">
                    {group.items.map((s) => (
                      <SkillBar key={s.name} {...s} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mx-auto max-w-4xl px-5 py-24">
          <SectionTitle eyebrow="Experience" title="No professional work experience yet" />
          <Reveal>
            <div className="glass gradient-border lift rounded-3xl p-8 text-center">
              <Rocket className="mx-auto h-10 w-10 text-primary" />
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Currently focused on learning, academic projects, and strengthening technical skills while
                preparing for internship opportunities and real-world software development experiences.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  ["2", "Years into B.Tech"],
                  ["7+", "Skills in progress"],
                  ["2029", "Graduation year"],
                ].map(([n, l]) => (
                  <div key={l} className="rounded-2xl bg-secondary/60 p-5">
                    <p className="text-gradient font-display text-2xl font-bold">{n}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle
            eyebrow="Services"
            title="Future services"
            sub="Areas I'm training to offer professionally."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={i * 90}>
                <div className="glass gradient-border lift group h-full rounded-3xl p-7">
                  <div className="flex items-center justify-between">
                    <span className="btn-glow grid h-11 w-11 place-items-center rounded-2xl">
                      <s.Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      Coming soon
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    In active learning — building the depth to deliver production-quality work.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle
            eyebrow="Portfolio"
            title="Projects coming soon"
            sub="I am currently building exciting academic and personal projects in Python, Machine Learning, and software development. This section will soon showcase my work with detailed case studies and live demos."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Terminal, t: "Python Project" },
              { Icon: BrainCircuit, t: "ML Experiment" },
              { Icon: Palette, t: "UI/UX Case Study" },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 110}>
                <div className="glass gradient-border lift flex h-56 flex-col items-center justify-center gap-4 rounded-3xl p-7 text-center">
                  <span className="animate-float grid h-14 w-14 place-items-center rounded-2xl bg-primary/12">
                    <p.Icon className="h-6 w-6 text-primary" />
                  </span>
                  <h3 className="text-base font-semibold">{p.t}</h3>
                  <p className="text-xs text-muted-foreground">In the works · Stay tuned</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle eyebrow="Contact" title="Let's build something together" sub="Open to internships, collaborations and mentorship." />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="glass gradient-border h-full rounded-3xl p-7">
                <div className="space-y-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12">
                        <Mail className="h-4 w-4 text-primary" />
                      </span>
                      <a href={`mailto:${EMAIL}`} className="truncate text-sm hover:text-primary">
                        {EMAIL}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="glass lift grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12">
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
                        className="glass lift grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:text-primary"
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
                      className="h-48 w-full"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <form onSubmit={onSubmit} className="glass gradient-border h-full rounded-3xl p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-muted-foreground">Name</span>
                    <input
                      required
                      name="name"
                      className="w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-muted-foreground">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      className="w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="mt-4 block text-sm">
                  <span className="mb-1.5 block text-muted-foreground">Subject</span>
                  <input
                    name="subject"
                    className="w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    placeholder="Internship / Collaboration"
                  />
                </label>
                <label className="mt-4 block text-sm">
                  <span className="mb-1.5 block text-muted-foreground">Message</span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    placeholder="Tell me about your idea..."
                  />
                </label>
                <button
                  type="submit"
                  className="btn-glow mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  <Send className="h-4 w-4" /> Send message
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 text-center">
          <p className="font-display text-sm font-semibold">
            Designed &amp; Developed by <span className="text-gradient">Shantanu Singh</span>
          </p>
          <div className="flex items-center justify-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="glass lift grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Shantanu Singh. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating actions */}
      <a
        href="#contact"
        aria-label="Jump to contact"
        className="btn-glow fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="glass lift animate-fade-up fixed bottom-22 right-6 z-40 grid h-12 w-12 place-items-center rounded-full"
        >
          <ArrowUp className="h-5 w-5 text-primary" />
        </button>
      )}
    </div>
  );
}
