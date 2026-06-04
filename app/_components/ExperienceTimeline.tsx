import { Badge, NeoCard } from "./neo";
import { cx } from "./cx";

type ExperienceItem = {
  company: string;
  role: string;
  summary: string;
  period: string;
  accent?: string;
};

function accentBg(accent?: string) {
  switch (accent) {
    case "mint":
      return "bg-[var(--neo-mint)]";
    case "sky":
      return "bg-[var(--neo-sky)]";
    case "sun":
      return "bg-[var(--neo-sun)]";
    case "peach":
      return "bg-[var(--neo-peach)]";
    case "coral":
      return "bg-[var(--neo-coral)]";
    default:
      return "bg-[var(--neo-paper)]";
  }
}

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="relative mt-4">
      <div className="pointer-events-none absolute inset-y-0 left-6 -translate-x-1/2 w-[3px] bg-black lg:left-1/2" />

      <ol className="grid gap-6">
        {items.map((x, idx) => {
          const left = idx % 2 === 0;
          const card = (
            <NeoCard accent="paper" className="bg-[var(--neo-paper)]">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-black">{x.company}</p>
                  <p className="mt-1 text-[11px] font-mono font-black uppercase tracking-widest opacity-75">
                    {x.role}
                  </p>
                </div>
                <Badge className={cx("shrink-0", accentBg(x.accent))}>
                  {x.period}
                </Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-black/75">
                {x.summary}
              </p>
            </NeoCard>
          );

          return (
            <li key={`${x.company}-${x.role}`} className="relative">
              {/* Mobile (stacked) */}
              <div className="absolute left-6 top-9 -translate-x-1/2 lg:hidden">
                <div
                  className={cx(
                    "neo-border neo-shadow flex h-12 w-12 items-center justify-center",
                    accentBg(x.accent),
                  )}
                  aria-hidden
                >
                  <span className="font-mono text-base font-black text-black">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="lg:hidden pl-14">{card}</div>

              {/* Desktop (alternating) */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_96px_1fr] lg:items-start lg:gap-6">
                <div
                  className={cx(
                    "max-w-xl",
                    left ? "justify-self-end" : "opacity-0",
                  )}
                  aria-hidden={!left}
                >
                  {left ? card : null}
                </div>

                <div className="relative flex items-start justify-center">
                  <div className="absolute left-1/2 top-8 -translate-x-1/2">
                    <div
                      className={cx(
                        "neo-border neo-shadow flex h-14 w-14 items-center justify-center",
                        accentBg(x.accent),
                      )}
                      aria-hidden
                    >
                      <span className="font-mono text-lg font-black text-black">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={cx(
                    "max-w-xl",
                    !left ? "justify-self-start" : "opacity-0",
                  )}
                  aria-hidden={left}
                >
                  {!left ? card : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
