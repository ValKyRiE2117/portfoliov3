"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { cx } from "./cx";
import { Badge } from "./neo";
import { ImageCarousel } from "./ImageCarousel";

export type ProjectDetail = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  image?: string;
  accent?: string;
  role?: string;
  impact?: string[];
  images?: string[];
};

const accentBg: Record<string, string> = {
  mint: "bg-[var(--neo-mint)]",
  sky: "bg-[var(--neo-sky)]",
  peach: "bg-[var(--neo-peach)]",
  sun: "bg-[var(--neo-sun)]",
  paper: "bg-[var(--neo-paper)]",
};

export function NeoDialog({ project }: { project: ProjectDetail }) {
  const carouselImages =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : [];

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className={cx(
            "neo-border neo-shadow neo-press inline-flex w-full items-center justify-center gap-2",
            "rounded-none px-4 py-2 text-xs font-mono font-bold uppercase tracking-wide",
            "bg-[var(--neo-sun)] text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60",
            "mt-6 cursor-pointer",
          )}
        >
          DETAIL →
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className={cx(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
            "data-[state=open]:animate-[neo-overlay-in_200ms_ease-out]",
            "data-[state=closed]:animate-[neo-overlay-out_150ms_ease-in]",
          )}
        />

        {/* Content Container */}
        <DialogPrimitive.Content
          className={cx(
            
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            
            "w-[calc(100vw-24px)] max-w-2xl",
            "max-h-[calc(100dvh-32px)] sm:max-h-[90dvh]",
            
            "neo-border neo-shadow bg-[var(--neo-paper)]",
            
            "data-[state=open]:animate-[neo-content-in_250ms_ease-out]",
            "data-[state=closed]:animate-[neo-content-out_150ms_ease-in]",
            
            "flex flex-col overflow-hidden",
          )}
        >
          {/* Scrollable area */}
          <div className="overflow-y-auto overflow-x-hidden no-scrollbar flex-1">
            {/* ── Image Carousel ── */}
            {carouselImages.length > 0 && (
              <div className="neo-border border-x-0 border-t-0">
                <ImageCarousel images={carouselImages} alt={project.title} />
              </div>
            )}

            {/* ── Content Body ── */}
            <div className="flex flex-col gap-5 p-4 sm:p-6">
              {/* Category badge */}
              <span
                className={cx(
                  "neo-border px-2.5 py-1 text-[10px] font-mono font-black uppercase tracking-wider w-fit neo-shadow",
                  accentBg[project.accent ?? "paper"] ?? accentBg.paper,
                )}
              >
                {project.category}
              </span>

              {/* Title & Description */}
              <div className="flex flex-col gap-1.5">
                <DialogPrimitive.Title className="text-xl font-black leading-tight tracking-tight sm:text-2xl pr-8">
                  {project.title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-2 text-sm leading-relaxed text-black/70">
                  {project.description}
                </DialogPrimitive.Description>
              </div>

              {/* Separator */}
              <div className="h-[3px] w-full bg-[var(--neo-border)]" />

              {/* Role & Contribution */}
              {project.role && (
                <div>
                  <h4 className="text-xs font-mono font-black uppercase tracking-widest text-black/60 mb-2">
                    My Role & Contribution
                  </h4>
                  <p className="text-sm leading-relaxed text-black/80">
                    {project.role}
                  </p>
                </div>
              )}

              {/* Impact / Value */}
              {project.impact && project.impact.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-black uppercase tracking-widest text-black/60 mb-2">
                    Impact & Value
                  </h4>
                  <ul className="space-y-1.5">
                    {project.impact.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-black/80">
                        <span
                          className={cx(
                            "mt-1.5 h-2.5 w-2.5 flex-shrink-0 neo-border",
                            accentBg[project.accent ?? "sun"] ?? accentBg.sun,
                          )}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Separator */}
              <div className="h-[3px] w-full bg-[var(--neo-border)]" />

              {/* Tech Stack */}
              {project.tags.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-black uppercase tracking-widest text-black/60 mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Link */}
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className={cx(
                  "neo-border neo-shadow neo-press inline-flex w-full items-center justify-center gap-2",
                  "rounded-none px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wide",
                  "bg-[var(--neo-night)] text-[var(--neo-snow)]",
                  "hover:bg-[var(--neo-ink)]/90 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60",
                )}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                VIEW PROJECT
              </a>
            </div>
          </div>

          {/* Close button */}
          <DialogPrimitive.Close
            className={cx(
              "absolute right-3 top-3 z-50 cursor-pointer",
              "neo-border neo-press flex h-8 w-8 items-center justify-center",
              "bg-[var(--neo-paper)] text-[var(--neo-ink)]",
              "hover:bg-[var(--neo-coral)] hover:text-white",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60",
            )}
            aria-label="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
