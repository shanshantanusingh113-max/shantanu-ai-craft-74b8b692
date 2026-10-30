import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./Motion";

export type ConsoleLine = { cmd: string; out: string[] };

/**
 * A small terminal that types a few commands once on load.
 * The full text is server-rendered for crawlers and screen readers;
 * the typing is a visual layer only.
 */
export function Console({ lines }: { lines: ConsoleLine[] }) {
  const script = lines.flatMap((l) => [
    { kind: "cmd" as const, text: l.cmd },
    ...l.out.map((o) => ({ kind: "out" as const, text: o })),
  ]);
  const totalChars = script.reduce((n, s) => n + (s.kind === "cmd" ? s.text.length : 1), 0);
  const [typed, setTyped] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setTyped(0);
    let n = 0;
    let t: number;
    const step = () => {
      n += 1;
      setTyped(n);
      if (n >= totalChars) return;
      // commands type character by character; output lines land whole after a beat
      let pos = 0;
      let delay = 34;
      for (const s of script) {
        const len = s.kind === "cmd" ? s.text.length : 1;
        if (n < pos + len) {
          delay = s.kind === "cmd" ? 28 + Math.random() * 40 : 90;
          if (s.kind === "cmd" && n === pos) delay = 380;
          break;
        }
        pos += len;
      }
      t = window.setTimeout(step, delay);
    };
    t = window.setTimeout(step, 450);
    return () => clearTimeout(t);
  }, [totalChars]); // eslint-disable-line react-hooks/exhaustive-deps

  let budget = typed ?? Infinity;
  const done = budget >= totalChars;

  return (
    <div className="scan overflow-hidden rounded-lg border border-line bg-subtle font-mono text-[13px] leading-6 sm:text-sm">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-muted-foreground">
        <span>shantanu — zsh</span>
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
        </span>
      </div>
      <div className="sr-only">
        {lines.map((l) => (
          <p key={l.cmd}>
            {l.cmd}: {l.out.join(". ")}
          </p>
        ))}
      </div>
      <div aria-hidden className="min-h-[15.5rem] px-4 py-3">
        {script.map((s, i) => {
          if (budget <= 0) return null;
          if (s.kind === "cmd") {
            const shown = s.text.slice(0, budget);
            const typing = !done && budget <= s.text.length;
            budget -= s.text.length;
            return (
              <div key={i} className={i ? "mt-2" : ""}>
                <span className="text-accent">❯</span> {shown}
                {typing && <span className="caret ml-0.5" />}
              </div>
            );
          }
          budget -= 1;
          return (
            <div key={i} className="whitespace-pre-wrap text-muted-foreground">
              {s.text}
            </div>
          );
        })}
        {done && (
          <div className="mt-2">
            <span className="text-accent">❯</span> <span className="caret" />
          </div>
        )}
      </div>
    </div>
  );
}
