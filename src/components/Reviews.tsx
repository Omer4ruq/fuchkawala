"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { reviews, site } from "@/lib/site";
import { Eyebrow, Lines, Star } from "./ui";

const EXPO = [0.16, 1, 0.3, 1] as const;
const DURATION = 7000;

export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const r = reviews[i];
  const go = (d: number) => setI((n) => (n + d + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <section id="reviews" className="relative bg-bone py-28 text-ink md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow className="mb-6 text-chili">Reviews</Eyebrow>
          <Lines
            className="display text-[clamp(2.8rem,5vw,5rem)]"
            lines={[
              "Loved by",
              <>
                <em className="display-italic text-chili">2k+</em> Philly
              </>,
              "food lovers",
            ]}
          />
          <div className="mt-12 flex items-center gap-5 rounded-3xl border border-ink/10 p-6">
            <span className="display text-6xl leading-none">{site.rating}</span>
            <div>
              <div className="flex gap-0.5 text-saffron">
                {Array.from({ length: 5 }, (_, k) => (
                  <Star key={k} className="size-5" />
                ))}
              </div>
              <p className="mt-1.5 text-sm text-ink/60">
                Excellent · Based on {site.reviewCount} Google reviews
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col justify-between lg:col-span-7 lg:col-start-6"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Customer reviews"
        >
          <svg viewBox="0 0 48 36" className="mb-8 w-14 text-chili" aria-hidden>
            <path fill="currentColor" d="M0 36V20.6C0 8.6 6.4 1.7 19.2 0l1.6 5.4C13.7 7 10.4 10.7 10 16.4h9.6V36H0Zm27.2 0V20.6C27.2 8.6 33.6 1.7 46.4 0L48 5.4c-7.1 1.6-10.4 5.3-10.8 11h9.6V36H27.2Z" />
          </svg>

          <div className="relative min-h-[18rem] md:min-h-[20rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && go(info.offset.x < 0 ? 1 : -1)}
                className="cursor-grab active:cursor-grabbing"
                data-cursor="Drag"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.8, ease: EXPO }}
              >
                <blockquote
                  lang={r.lang ?? "en"}
                  className={`${r.lang === "bn" ? "font-bangla leading-snug" : "display leading-[1.08]"} text-[clamp(1.7rem,3.2vw,3.1rem)]`}
                >
                  {r.text}
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-ink text-lg text-bone">{r.name[0]}</span>
                  <span>
                    <span className="block font-medium">{r.name}</span>
                    <span className="text-sm text-ink/50">Posted on Google</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex flex-1 gap-2">
              {reviews.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Show review ${k + 1}`}
                  aria-current={k === i}
                  className="relative h-8 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-ink/15">
                    {k === i ? (
                      <motion.span
                        key={`${i}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-ink"
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "0%" : "100%" }}
                        transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                      />
                    ) : (
                      k < i && <span className="absolute inset-0 bg-ink/40" />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  onClick={() => go(d)}
                  aria-label={d < 0 ? "Previous review" : "Next review"}
                  className="flex size-14 items-center justify-center rounded-full border border-ink/15 transition-colors duration-300 hover:bg-ink hover:text-bone"
                >
                  <svg viewBox="0 0 24 24" className={`size-5 ${d < 0 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                    <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
