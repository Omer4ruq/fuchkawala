"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { Button, Eyebrow, Lines, Reveal } from "./ui";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const inset = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0% ${i}% 0% ${i}% round ${r}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <section id="process" className="relative bg-ink pt-20 pb-28 md:pt-28 md:pb-40">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 md:px-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-6 text-saffron">Making process</Eyebrow>
          <Lines
            className="display text-[clamp(3rem,7.5vw,7.5rem)]"
            lines={[
              "Watch the",
              <>
                <em className="display-italic text-saffron">magic</em> happen
              </>,
            ]}
          />
        </div>
        <Reveal className="lg:col-span-5" delay={0.15}>
          <p className="max-w-md text-lg leading-relaxed text-bone/70">
            See how every fuchka is prepared fresh, filled with flavor, and served with care. One look and you&apos;ll
            understand why customers keep coming back.
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative mt-16 md:mt-24">
        <motion.div style={{ clipPath }} className="relative mx-auto aspect-[4/5] max-h-[92vh] w-full overflow-hidden sm:aspect-video">
          <motion.video
            ref={video}
            style={{ scale }}
            className="absolute inset-0 size-full object-cover"
            src="/process.mp4"
            poster="/img/offer-fuchka.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Fuchka being prepared by hand at Fuchkawala"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-12">
            <p className="display display-italic max-w-md text-[clamp(1.6rem,3vw,2.8rem)] leading-tight">
              Every puri, filled by hand.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!video.current) return;
                  video.current.muted = !muted;
                  setMuted(!muted);
                }}
                className="flex h-14 items-center gap-3 rounded-full border border-bone/30 bg-ink/30 px-5 text-sm backdrop-blur-md transition-colors hover:bg-bone hover:text-ink"
              >
                <span className="flex h-4 items-end gap-[3px]" aria-hidden>
                  {[0, 1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className={`w-[3px] rounded-full bg-current ${muted ? "h-1" : "animate-[eq_0.9s_ease-in-out_infinite]"}`}
                      style={{ animationDelay: `${b * 0.15}s`, height: muted ? 4 : undefined }}
                    />
                  ))}
                </span>
                {muted ? "Sound on" : "Sound off"}
              </button>
              <Button href={site.mapsUrl} external>
                Taste the tradition
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
