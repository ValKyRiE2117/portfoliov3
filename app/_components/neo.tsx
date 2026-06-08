import { cx } from "./cx";

const accentBg: Record<string, string> = {
  paper: "bg-[var(--neo-paper)]",
  mint: "bg-[var(--neo-mint)]",
  sky: "bg-[var(--neo-sky)]",
  sun: "bg-[var(--neo-sun)]",
  peach: "bg-[var(--neo-peach)]",
  coral: "bg-[var(--neo-coral)]",
};

export function AccentBg({
  accent,
  className,
}: {
  accent?: string;
  className?: string;
}) {
  return <span className={cx(accent ? accentBg[accent] : undefined, className)} />;
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function SectionHeader({
  kicker,
  title,
  id,
}: {
  kicker: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="flex gap-4 items-end">
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-xs font-mono uppercase tracking-widest text-black/70">
          {kicker}
        </p>
        <h2
          id={id}
          className="scroll-mt-28 text-2xl font-black tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      <div className="h-[2px] flex-1 bg-black/80" />
    </div>
  );
}

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-none neo-border px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-foreground",
        className?.includes("bg-") ? "" : "bg-[var(--neo-paper)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-none neo-border px-2 py-1 text-[11px] font-mono font-bold uppercase tracking-wide text-foreground",
        className?.includes("bg-") ? "" : "bg-[var(--neo-paper)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function NeoCard({
  children,
  accent = "paper",
  className,
}: {
  children: React.ReactNode;
  accent?: keyof typeof accentBg | string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "neo-border neo-shadow rounded-none p-4 sm:p-5",
        accentBg[String(accent)] ?? accentBg.paper,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function NeoButton({
  children,
  href,
  variant = "solid",
  className,
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "outline";
  className?: string;
  target?: string;
  rel?: string;
}) {
  const base =
    "neo-border neo-shadow neo-press inline-flex items-center justify-center gap-2 rounded-none px-4 py-2 text-sm font-mono font-bold uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60";
  const style =
    variant === "solid"
      ? "bg-[var(--neo-sun)] text-foreground"
      : "bg-[var(--neo-paper)] text-foreground";

  return (
    <a className={cx(base, style, className)} href={href} target={target} rel={rel}>
      {children}
    </a>
  );
}
