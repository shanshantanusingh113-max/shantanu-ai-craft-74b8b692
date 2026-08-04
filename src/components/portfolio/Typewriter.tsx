import { useEffect, useState } from "react";

export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";
    if (!deleting && len === word.length) {
      const t = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(t);
    }
    if (deleting && len === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setLen((l) => l + (deleting ? -1 : 1)), deleting ? 45 : 90);
    return () => clearTimeout(t);
  }, [len, deleting, index, words]);

  const word = words[index % words.length] ?? "";

  return (
    <span aria-live="polite" className="font-display font-semibold">
      <span className="text-gradient">{word.slice(0, len)}</span>
      <span className="animate-caret ml-0.5 inline-block w-[2px] translate-y-0.5 bg-primary align-middle text-transparent">
        |
      </span>
    </span>
  );
}
