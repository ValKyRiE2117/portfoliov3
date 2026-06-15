"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "./cx";

type ImageCarouselProps = {
  images: string[];
  alt?: string;
  className?: string;
};

export function ImageCarousel({ images, alt = "Project image", className }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const hasMultiple = count > 1;

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(((idx % count) + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  /* Touch / swipe support */
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (delta > threshold) next();
    else if (delta < -threshold) prev();
  }

  /* Keyboard navigation when focused */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }

    const container = containerRef.current;
    container?.addEventListener("keydown", handleKey);
    return () => container?.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  if (count === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cx("relative w-full overflow-hidden bg-black/5", className)}
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            className="w-full flex-shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${count}`}
          >
            <div className="relative w-full aspect-video">
              <img
                src={src}
                alt={`${alt} — ${i + 1}`}
                className="aspect-video"
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={prev}
            onTouchStart={(e) => e.stopPropagation()}
            className={cx(
              "absolute left-2 top-1/2 -translate-y-1/2",
              "neo-border neo-press flex h-9 w-9 items-center justify-center",
              "bg-[var(--neo-paper)] text-[var(--neo-ink)]",
              "hover:bg-[var(--neo-sun)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60",
              "sm:left-3 sm:h-10 sm:w-10",
            )}
            aria-label="Previous image"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            onTouchStart={(e) => e.stopPropagation()}
            className={cx(
              "absolute right-2 top-1/2 -translate-y-1/2",
              "neo-border neo-press flex h-9 w-9 items-center justify-center",
              "bg-[var(--neo-paper)] text-[var(--neo-ink)]",
              "hover:bg-[var(--neo-sun)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60",
              "sm:right-3 sm:h-10 sm:w-10",
            )}
            aria-label="Next image"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {hasMultiple && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 sm:bottom-3 sm:gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cx(
                "neo-border h-2.5 w-2.5 rounded-none transition-colors sm:h-3 sm:w-3",
                i === current
                  ? "bg-[var(--neo-sun)]"
                  : "bg-[var(--neo-paper)] hover:bg-[var(--neo-peach)]",
              )}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            />
          ))}
        </div>
      )}

      {/* Counter badge */}
      {hasMultiple && (
        <span className="absolute top-2 left-2 neo-border bg-[var(--neo-paper)] px-2 py-0.5 text-[10px] font-mono font-bold sm:top-3 sm:left-3">
          {current + 1} / {count}
        </span>
      )}
    </div>
  );
}
