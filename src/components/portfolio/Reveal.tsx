import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur";

/** Hook: becomes true once the element scrolls into view (fires once). */
export function useInView<T extends Element>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  as?: "div" | "li" | "section" | "article";
  style?: CSSProperties;
}) {
  const [ref, visible] = useInView<HTMLDivElement>();
  const Component = Tag as "div";

  return (
    <Component
      ref={ref}
      className={`reveal ${className}`}
      data-variant={variant}
      data-visible={visible}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
