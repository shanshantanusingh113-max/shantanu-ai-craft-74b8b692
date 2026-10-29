/** Everything on the page comes from here — sourced from Shantanu's CV. */

export type ProjectVisual = "reward" | "ledger" | "anomaly" | "legal" | "ocean" | "orbit";

export type Project = {
  id: string;
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  award?: string;
  metric?: { value: string; label: string };
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
  visual: ProjectVisual;
};

export const PROJECTS: Project[] = [
  {
    id: "ml-debug-env",
    name: "ML Debug Env",
    kind: "RL for LLMs",
    tagline: "An RL environment that teaches LLMs to debug PyTorch code",
    summary:
      "A partially observable reinforcement-learning environment where an LLM agent diagnoses and fixes broken PyTorch training scripts through diagnostic tool calls.",
    award: "OpenEnv Grand Finalist — top 100 of 31,000 teams",
    metric: { value: "1.5B", label: "Qwen2.5 fine-tuned with GRPO + LoRA" },
    points: [
      "Rewards only fixes that pass sandboxed subprocess grading, AST validation and an LLM judge of the diagnosis.",
      "An adversarial task scheduler serves harder bugs as the agent improves.",
    ],
    stack: ["PyTorch", "Qwen2.5", "LoRA", "GRPO", "RL"],
    links: [],
    visual: "reward",
  },
  {
    id: "sentineliq",
    name: "SentinelIQ",
    kind: "Fraud detection",
    tagline: "Real-time insider fraud detection with explained alerts",
    summary:
      "Per-employee behavioural baselines feed an Isolation Forest, LSTM autoencoder and XGBoost ensemble. Every alert is explained with SHAP and grouped into fraud cases.",
    award: "iDEA 2.0 Grand Finalist — top 40 of 1,500 teams",
    metric: { value: "3", label: "model ensemble, SHAP on every alert" },
    points: [
      "Alerts are auto-grouped into fraud cases instead of a noisy feed.",
      "Served through FastAPI so SIEM tools can consume them directly.",
    ],
    stack: ["Isolation Forest", "LSTM", "XGBoost", "SHAP", "FastAPI"],
    links: [],
    visual: "anomaly",
  },
  {
    id: "ledgerlens",
    name: "LedgerLens",
    kind: "Fintech ML",
    tagline: "AI copilot for GST reconciliation",
    summary:
      "Reconciles invoices against the ledger, bank statement and GSTR-2B, and prices every mismatch in rupees.",
    metric: { value: "0.999", label: "pair F1 vs 0.98 rule baseline" },
    points: [
      "Gradient-boosted record matchers trained on 55,000+ candidate pairs, tested on a held-out month.",
      "Graph analysis catches PAN-linked supplier rings.",
      "Deployed on Hugging Face Spaces and Vercel.",
    ],
    stack: ["scikit-learn", "FastAPI", "Next.js", "NetworkX", "Docker"],
    links: [{ label: "Code", href: "https://github.com/shanshantanusingh113-max/ledgerlens" }],
    visual: "ledger",
  },
  {
    id: "courtmitra",
    name: "CourtMitra",
    kind: "Legal NLP",
    tagline: "Indian court judgments, in plain language",
    summary:
      "Turns court judgments into plain-language summaries, legal entities, reasoning flowcharts and Hindi translations.",
    metric: { value: "RAG", label: "grounded Q&A with hallucination guards" },
    points: [
      "RAG pipeline on PyMuPDF and ChromaDB for grounded questions and similar-case search.",
      "Entity extraction with spaCy and sentence-transformer embeddings.",
    ],
    stack: ["RAG", "ChromaDB", "sentence-transformers", "spaCy"],
    links: [],
    visual: "legal",
  },
  {
    id: "samudra",
    name: "SAMUDRA",
    kind: "Scientific viz",
    tagline: "3D ocean data explorer for INCOIS",
    summary:
      "An interactive 3D platform fusing NOAA WOA23 ocean fields with Argo floats, gliders, BGC floats and real HYCOM currents.",
    award: "Smart India Hackathon 2026",
    metric: { value: "463", label: "Argo floats in one 3D scene" },
    points: [
      "Plug-in Python ingest adapters write to an offline store under 15 MB.",
      "Bias and RMSE validation views for comparing data sources.",
    ],
    stack: ["Next.js", "React Three Fiber", "xarray", "Python"],
    links: [
      { label: "Code", href: "https://github.com/shanshantanusingh113-max/sih26067-samudra" },
    ],
    visual: "ocean",
  },
  {
    id: "solar-system-lab",
    name: "Solar System Lab",
    kind: "Simulation",
    tagline: "Planetary science in the browser",
    summary:
      "A 3D orrery driven by NASA JPL orbital elements, solving Kepler's equation every frame with Newton's method.",
    metric: { value: "A*", label: "Mars EVA route planner" },
    points: [
      "Route planner respects oxygen and radio limits.",
      "Monte Carlo rover-survival model and a landing-site scorer.",
    ],
    stack: ["JavaScript", "Three.js", "Numerical methods"],
    links: [
      { label: "Live demo", href: "https://shanshantanusingh113-max.github.io/kepler-orrery/" },
    ],
    visual: "orbit",
  },
];

export const AWARDS = [
  {
    title: "Meta × PyTorch × Hugging Face OpenEnv Hackathon",
    result: "Grand Finalist",
    year: 2026,
    rank: 100,
    of: 31000,
    project: "ML Debug Env",
  },
  {
    title: "iDEA 2.0, Union Bank of India",
    result: "Grand Finalist",
    year: 2026,
    rank: 40,
    of: 1500,
    project: "SentinelIQ",
  },
];

export const SKILL_GROUPS = [
  {
    name: "AI and ML",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Anomaly Detection",
      "Explainable AI (SHAP)",
      "Feature Engineering",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
    ],
  },
  {
    name: "Generative AI",
    items: [
      "LLMs",
      "RAG",
      "ChromaDB",
      "sentence-transformers",
      "LoRA",
      "GRPO",
      "Reinforcement learning",
      "spaCy",
      "Groq API",
      "Gemini API",
    ],
  },
  {
    name: "Programming",
    items: ["Python", "C++", "C", "SQL", "Java", "JavaScript", "TypeScript"],
  },
  {
    name: "Software",
    items: [
      "FastAPI",
      "Flask",
      "REST APIs",
      "React",
      "Next.js",
      "Three.js",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "SQLite",
    ],
  },
  {
    name: "Tools and cloud",
    items: [
      "Git",
      "Docker",
      "Hugging Face Spaces",
      "Vercel",
      "Netlify",
      "Render",
      "Jupyter",
      "Tableau",
    ],
  },
];

/** Which skills each project actually used — drawn as a heatmap. */
export const SKILL_MATRIX: { skill: string; uses: string[] }[] = [
  { skill: "Python", uses: ["ml-debug-env", "sentineliq", "ledgerlens", "courtmitra", "samudra"] },
  { skill: "Deep learning", uses: ["ml-debug-env", "sentineliq"] },
  { skill: "Classical ML", uses: ["sentineliq", "ledgerlens"] },
  { skill: "LLMs & RAG", uses: ["ml-debug-env", "courtmitra"] },
  { skill: "Reinforcement learning", uses: ["ml-debug-env"] },
  { skill: "Explainable AI", uses: ["sentineliq"] },
  { skill: "NLP", uses: ["courtmitra"] },
  { skill: "Graph analysis", uses: ["ledgerlens"] },
  { skill: "FastAPI", uses: ["sentineliq", "ledgerlens"] },
  { skill: "React / Next.js", uses: ["ledgerlens", "samudra"] },
  { skill: "Three.js", uses: ["samudra", "solar-system-lab"] },
  { skill: "Numerical methods", uses: ["solar-system-lab", "samudra"] },
];

export const JOURNEY = [
  {
    when: "2025",
    title: "B.Tech CSE (AI & ML), JSS University, Noida",
    body: "Coursework in machine learning, data structures and algorithms, Python, C/C++ and database systems.",
  },
  {
    when: "2029",
    title: "Expected graduation",
    body: "Looking for ML engineering internships in the meantime.",
  },
];
