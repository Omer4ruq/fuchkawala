"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const KEY = "fw-intro-seen";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctrl = animate(count, 100, {
      duration: seen || reduced ? 0.25 : 1.8,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        setExiting(true);
        onDone();
      },
    });
    return () => ctrl.stop();
  }, [count, onDone]);

  if (gone) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-2 p-6 md:p-10"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={exiting ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => exiting && setGone(true)}
    >
      <div className="eyebrow flex justify-between text-sand">
        <span>Fuchkawala</span>
        <span>Upper Darby · PA</span>
      </div>

      <div className="overflow-hidden text-center">
        <motion.p
          lang="bn"
          className="font-bangla text-[clamp(2.4rem,8vw,6.5rem)] leading-[1.3] text-saffron"
          initial={{ y: "110%" }}
          animate={{ y: exiting ? "-110%" : "0%" }}
          transition={{ duration: exiting ? 0.7 : 1, ease: [0.16, 1, 0.3, 1], delay: exiting ? 0 : 0.15 }}
        >
          {site.tagline}
        </motion.p>
      </div>

      <div className="flex items-end justify-between">
        <span className="eyebrow max-w-40 text-sand">Handmade fresh, every day</span>
        <motion.span className="display text-[clamp(4rem,14vw,11rem)] tabular-nums text-bone">{rounded}</motion.span>
      </div>
    </motion.div>
  );
}
