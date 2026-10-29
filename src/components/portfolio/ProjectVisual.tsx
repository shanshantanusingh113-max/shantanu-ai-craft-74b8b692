import type { ProjectVisual as Kind } from "@/lib/content";

/** Small looping illustrations — each one is a sketch of what the project does. */
export function ProjectVisual({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={`pv h-auto w-full ${className}`}
      role="img"
      aria-label={LABELS[kind]}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`vg-${kind}`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--v1)" />
          <stop offset=".4" stopColor="var(--v2)" />
          <stop offset=".7" stopColor="var(--v3)" />
          <stop offset="1" stopColor="var(--v5)" />
        </linearGradient>
      </defs>
      {ART[kind](`url(#vg-${kind})`)}
    </svg>
  );
}

const LABELS: Record<Kind, string> = {
  reward: "Reward curve rising as the agent learns to fix bugs",
  anomaly: "Scatter of behaviour with flagged anomalies",
  ledger: "Invoices matched to ledger entries",
  legal: "A judgment condensed into a short summary",
  ocean: "Floats drifting on ocean currents",
  orbit: "Planets orbiting the sun",
};

const ART: Record<Kind, (g: string) => React.ReactNode> = {
  reward: (g) => (
    <g>
      {[60, 110, 160, 210].map((y) => (
        <line key={y} x1="40" x2="370" y1={y} y2={y} stroke="currentColor" strokeOpacity=".08" />
      ))}
      <path
        className="pv-draw"
        d="M40 215 C 70 212, 90 200, 110 204 S 140 170, 165 176 S 200 130, 225 138 S 260 92, 290 96 S 330 62, 370 58"
        fill="none"
        stroke={g}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        className="pv-ride"
        r="6"
        fill="var(--v5)"
        style={{
          offsetPath:
            "path('M40 215 C 70 212, 90 200, 110 204 S 140 170, 165 176 S 200 130, 225 138 S 260 92, 290 96 S 330 62, 370 58')",
        }}
      />
      <g fontFamily="var(--font-mono)" fontSize="12" fill="currentColor">
        <text x="40" y="36" opacity=".55">
          reward ↑ — epoch
        </text>
        <text className="pv-blink" x="290" y="36" fill="var(--v3)">
          ✓ fix passed
        </text>
      </g>
    </g>
  ),
  anomaly: () => (
    <g>
      {Array.from({ length: 54 }, (_, i) => {
        const a = (i * 137.5 * Math.PI) / 180;
        const r = 18 + ((i * 29) % 70);
        return (
          <circle
            key={i}
            cx={Math.round(170 + Math.cos(a) * r * 1.4)}
            cy={Math.round(135 + Math.sin(a) * r * 0.9)}
            r="4"
            fill="var(--v2)"
            opacity=".55"
          />
        );
      })}
      {[
        [330, 50, 0],
        [60, 225, 1.1],
        [345, 210, 2.2],
      ].map(([x, y, d]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="6" fill="var(--v5)" />
          <circle
            className="pv-ping"
            cx={x}
            cy={y}
            r="6"
            fill="none"
            stroke="var(--v5)"
            strokeWidth="2"
            style={{ animationDelay: `${d}s`, transformOrigin: `${x}px ${y}px` }}
          />
        </g>
      ))}
      <text
        x="292"
        y="36"
        fontFamily="var(--font-mono)"
        fontSize="12"
        fill="currentColor"
        opacity=".6"
      >
        alert · SHAP
      </text>
    </g>
  ),
  ledger: (g) => (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="40"
            y={40 + i * 40}
            width="110"
            height="24"
            rx="6"
            fill="currentColor"
            opacity=".08"
          />
          <rect
            x="250"
            y={40 + ((i * 3) % 5) * 40}
            width="110"
            height="24"
            rx="6"
            fill="currentColor"
            opacity=".08"
          />
          <path
            className="pv-link"
            d={`M150 ${52 + i * 40} C 200 ${52 + i * 40}, 200 ${52 + ((i * 3) % 5) * 40}, 250 ${52 + ((i * 3) % 5) * 40}`}
            fill="none"
            stroke={g}
            strokeWidth="2.5"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        </g>
      ))}
      <g fontFamily="var(--font-mono)" fontSize="11" fill="currentColor" opacity=".55">
        <text x="40" y="28">
          invoices
        </text>
        <text x="250" y="28">
          GSTR-2B
        </text>
      </g>
    </g>
  ),
  legal: (g) => (
    <g>
      <rect x="40" y="30" width="150" height="200" rx="10" fill="currentColor" opacity=".06" />
      {Array.from({ length: 11 }, (_, i) => (
        <rect
          key={i}
          x="56"
          y={48 + i * 16}
          width={80 + ((i * 37) % 40)}
          height="6"
          rx="3"
          fill="currentColor"
          opacity=".18"
        />
      ))}
      <rect
        className="pv-scan"
        x="48"
        y="44"
        width="134"
        height="14"
        rx="4"
        fill="var(--v4)"
        opacity=".25"
      />
      <path
        d="M205 130 h30"
        stroke={g}
        strokeWidth="3"
        strokeLinecap="round"
        className="pv-blink"
      />
      <path d="M228 122 l9 8 -9 8" fill="none" stroke={g} strokeWidth="3" strokeLinecap="round" />
      <rect x="250" y="70" width="120" height="120" rx="10" fill="currentColor" opacity=".06" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          className="pv-grow"
          x="264"
          y={92 + i * 22}
          width={86 - i * 18}
          height="8"
          rx="4"
          fill={g}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      <text x="264" y="172" fontSize="16" fill="var(--v3)" fontFamily="var(--font-sans)">
        हिंदी
      </text>
    </g>
  ),
  ocean: () => (
    <g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className="pv-wave"
          d={`M-400 ${110 + i * 40} q 50 -18 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0`}
          fill="none"
          stroke={`var(--v${i + 2})`}
          strokeWidth="2.5"
          opacity={0.7 - i * 0.15}
          style={{ animationDuration: `${7 + i * 3}s` }}
        />
      ))}
      {[70, 140, 215, 290, 345].map((x, i) => (
        <g key={x} className="pv-bob" style={{ animationDelay: `${i * 0.5}s` }}>
          <line
            x1={x}
            x2={x}
            y1={70 + (i % 2) * 30}
            y2={98 + (i % 2) * 30}
            stroke="currentColor"
            strokeOpacity=".4"
          />
          <circle cx={x} cy={66 + (i % 2) * 30} r="5" fill="var(--v5)" />
        </g>
      ))}
      <text
        x="40"
        y="236"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="currentColor"
        opacity=".55"
      >
        Argo · glider · BGC · HYCOM
      </text>
    </g>
  ),
  orbit: () => (
    <g>
      <circle cx="200" cy="130" r="16" fill="var(--v5)" />
      <circle cx="200" cy="130" r="26" fill="var(--v5)" opacity=".15" />
      {[
        [44, 6, 4, "var(--v4)"],
        [72, 9, 6, "var(--v3)"],
        [102, 14, 5, "var(--v2)"],
        [128, 22, 8, "var(--v1)"],
      ].map(([r, dur, size, c]) => (
        <g key={r as number}>
          <ellipse
            cx="200"
            cy="130"
            rx={r as number}
            ry={r as number}
            fill="none"
            stroke="currentColor"
            strokeOpacity=".12"
          />
          <g
            className="pv-spin"
            style={{ animationDuration: `${dur}s`, transformOrigin: "200px 130px" }}
          >
            <circle cx={200 + (r as number)} cy="130" r={size as number} fill={c as string} />
          </g>
        </g>
      ))}
      <text
        x="40"
        y="236"
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill="currentColor"
        opacity=".55"
      >
        E − e·sin E = M
      </text>
    </g>
  ),
};
