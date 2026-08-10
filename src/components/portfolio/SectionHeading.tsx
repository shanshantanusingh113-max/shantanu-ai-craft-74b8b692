import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-12 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      <div
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-primary">
          {index}
        </span>
        <span className="h-px w-8 bg-border" />
        <span className="mono-label">{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-[1.75rem] font-bold leading-[1.15] sm:text-4xl">{title}</h2>
      {sub && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{sub}</p>
      )}
    </Reveal>
  );
}
