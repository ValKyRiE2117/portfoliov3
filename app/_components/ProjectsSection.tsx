"use client";

import { useMemo, useState } from "react";
import { Badge, NeoCard } from "./neo";
import { cx } from "./cx";
import { NeoDialog, type ProjectDetail } from "./NeoDialog";

const PAGE_SIZE = 4;

export function ProjectsSection({ projects }: { projects: ProjectDetail[] }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [page, setPage] = useState<number>(1);

  const filtered = useMemo(() => {
    const list =
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory);
    return list;
  }, [activeCategory, projects]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  function setCategory(next: string) {
    setActiveCategory(next);
    setPage(1);
  }

  function goTo(next: number) {
    const clamped = Math.min(Math.max(1, next), pageCount);
    setPage(clamped);
  }

  
  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const active = c === activeCategory;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cx(
                "neo-border neo-press rounded-none px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all",
                active
                  ? "neo-shadow bg-[var(--neo-night)] text-[var(--neo-snow)] "
                  : "bg-[var(--neo-paper)] text-[var(--neo-ink)] hover:bg-black/5",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {pageItems.map((p) => (
          <NeoCard key={p.title} accent="paper" className="p-0 group">
            {p.image ? (
              <div className="relative w-full aspect-video overflow-hidden neo-border border-x-0 border-t-0 bg-black/5">
                <img
                  src={p.image}
                  alt={p.title}
                  className="transition-transform duration-300 group-hover:scale-105 aspect-video"
                />
                <span
                  className={cx(
                    "absolute top-3 left-3 neo-border px-2.5 py-1 text-[10px] font-mono font-black uppercase tracking-wider neo-shadow",
                    p.accent === "mint"
                      ? "bg-[var(--neo-mint)]"
                      : p.accent === "sky"
                        ? "bg-[var(--neo-sky)]"
                        : p.accent === "peach"
                          ? "bg-[var(--neo-peach)]"
                          : p.accent === "sun"
                            ? "bg-[var(--neo-sun)]"
                            : "bg-[var(--neo-paper)]",
                  )}
                >
                  {p.category}
                </span>
              </div>
            ) : (
              <div
                className={cx(
                  "neo-border border-x-0 border-t-0 p-10 sm:p-12",
                  p.accent === "mint"
                    ? "bg-[var(--neo-mint)]"
                    : p.accent === "sky"
                      ? "bg-[var(--neo-sky)]"
                      : p.accent === "peach"
                        ? "bg-[var(--neo-peach)]"
                        : p.accent === "sun"
                          ? "bg-[var(--neo-sun)]"
                          : "bg-[var(--neo-paper)]",
                )}
              >
                <p className="text-center text-[11px] font-mono font-black uppercase tracking-[0.3em] opacity-80">
                  {p.category}
                </p>
              </div>
            )}

            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-black leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {p.description}
                  </p>
                </div>
                
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <NeoDialog project={p} />
            </div>
          </NeoCard>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, i) => {
          const pNum = i + 1;
          const isCurrent = pNum === page;
          return (
            <button
              key={pNum}
              type="button"
              onClick={() => goTo(pNum)}
              className={cx(
                "neo-border neo-press neo-shadow rounded-none px-3.5 py-1.5 text-xs font-mono font-black uppercase tracking-wider transition-all",
                isCurrent
                  ? "bg-[var(--neo-night)] text-[var(--neo-snow)]"
                  : "bg-[var(--neo-paper)] text-[var(--neo-ink)] hover:bg-black/5"
              )}
            >
              {pNum}
            </button>
          );
        })}
        {pageCount > 1 && (
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page >= pageCount}
            className="neo-border neo-press neo-shadow rounded-none bg-[var(--neo-paper)] px-3.5 py-1.5 text-xs font-mono font-black uppercase tracking-wider disabled:opacity-50 hover:bg-black/5"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}
