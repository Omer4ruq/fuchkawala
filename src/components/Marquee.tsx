"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";

const words = ["Fuchka", "Chotpoti", "Haleem", "Jhal Muri", "Doi Fuchka", "Mango Chat", "Chaa", "Lassi"];

function Row({ base, className }: { base: number; className: string }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(v, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dir = useRef(1);
  const pos = useTransform(x, (n) => `${wrap(-50, 0, n)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000);
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    move += dir.current * move * Math.abs(b);
    x.set(x.get() + move);
  });

  const items = [...words, ...words];
  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex shrink-0" style={{ x: pos }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className={`display px-6 md:px-10 ${i % 2 ? "display-italic" : ""}`}>{w}</span>
                <svg viewBox="0 0 24 24" className="size-6 md:size-9" aria-hidden>
                  <path fill="currentColor" d="M12 0c.7 6.5 5.5 11.3 12 12-6.5.7-11.3 5.5-12 12-.7-6.5-5.5-11.3-12-12C6.5 11.3 11.3 6.5 12 0Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="What we serve" className="relative z-10 -my-6 py-10">
      <div className="-rotate-2 bg-chili py-4 text-ink shadow-[0_30px_80px_-20px_rgba(255,61,104,0.45)] md:py-6">
        <Row base={-1.6} className="text-[clamp(2.4rem,6vw,5.5rem)] leading-none" />
      </div>
    </section>
  );
}
