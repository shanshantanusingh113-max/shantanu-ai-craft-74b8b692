export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* technical grid */}
      <div className="grid-bg absolute inset-0" />
      {/* atmospheric radials */}
      <div className="animate-blob absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-primary/12 blur-[140px] dark:bg-primary/18" />
      <div
        className="animate-blob absolute right-[-15%] top-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-[150px] dark:bg-accent/14"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="animate-blob absolute bottom-[-10%] left-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/8 blur-[150px] dark:bg-primary/12"
        style={{ animationDelay: "-15s" }}
      />
      {/* grain */}
      <div className="noise-bg absolute inset-0 mix-blend-overlay" />
    </div>
  );
}
