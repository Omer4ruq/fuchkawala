"use client";

import { AnimatePresence, motion, useAnimationControls, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";

const WORD = "Fuchkawala";
const RADIUS = 260; // px of cursor influence
const MAX_PURIS = 28;

type Puri = { id: number; x: number; y: number; dx: number; rot: number; size: number };

function Letter({ ch, mouseX, active, onPop }: { ch: string; mouseX: MotionValue<number>; active: MotionValue<number>; onPop: (x: number, y: number) => void }) {
  const ref = useRef<HTMLSpanElement>(null);
  const controls = useAnimationControls();

  // 0..1 closeness to the cursor
  const near = useTransform(() => {
    const el = ref.current;
    if (!el || !active.get()) return 0;
    const r = el.getBoundingClientRect();
    return Math.max(0, 1 - Math.abs(mouseX.get() - (r.left + r.width / 2)) / RADIUS);
  });
  const p = useSpring(near, { stiffness: 260, damping: 18, mass: 0.6 });
  const y = useTransform(p, (v) => `${-v * 0.16}em`);
  const scaleY = useTransform(p, [0, 1], [1, 1.12]);
  const fvs = useTransform(p, (v) => `"wght" ${Math.round(300 + v * 600)}, "SOFT" ${Math.round(v * 100)}, "WONK" 1, "opsz" 144`);

  return (
    <motion.span
      ref={ref}
      style={{ y, scaleY, fontVariationSettings: fvs, transformOrigin: "50% 100%" }}
      className="inline-block cursor-pointer select-none"
      onClick={(e) => {
        onPop(e.clientX, e.clientY);
        controls.start({
          rotate: [0, -360],
          y: [0, -90, 0],
          transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
        });
      }}
    >
      <motion.span animate={controls} className="inline-block">
        {ch}
      </motion.span>
    </motion.span>
  );
}

/** Footer brand: letters swell and go wonky under the cursor, puris spill out, click a letter to flip it. */
export function Wordmark() {
  const mouseX = useMotionValue(-9999);
  const active = useMotionValue(0);
  const box = useRef<HTMLDivElement>(null);
  const last = useRef(0);
  const [puris, setPuris] = useState<Puri[]>([]);
  const id = useRef(0);

  const spawn = (cx: number, cy: number, count: number) => {
    const b = box.current?.getBoundingClientRect();
    if (!b) return;
    const born = Array.from({ length: count }, () => ({
      id: id.current++,
      x: cx - b.left,
      y: cy - b.top,
      dx: (Math.random() - 0.5) * (count > 1 ? 420 : 160),
      rot: (Math.random() - 0.5) * 720,
      size: 28 + Math.random() * 34,
    }));
    setPuris((ps) => [...ps, ...born].slice(-MAX_PURIS));
  };

  return (
    <div
      ref={box}
      className="relative pt-[0.12em]"
      onPointerEnter={() => active.set(1)}
      onPointerLeave={() => {
        active.set(0);
        mouseX.set(-9999);
      }}
      onPointerMove={(e) => {
        mouseX.set(e.clientX);
        const now = performance.now();
        if (now - last.current > 110 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          last.current = now;
          spawn(e.clientX, e.clientY, 1);
        }
      }}
      data-cursor="Play"
    >
      <p
        aria-label="Fuchkawala"
        className="display display-italic text-center text-[clamp(4rem,19.5vw,22rem)] leading-[0.82] tracking-[-0.05em] whitespace-nowrap text-ink"
      >
        {WORD.split("").map((ch, i) => (
          <Letter key={i} ch={ch} mouseX={mouseX} active={active} onPop={(x, y) => spawn(x, y, 9)} />
        ))}
      </p>

      <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
        <AnimatePresence>
          {puris.map((pu) => (
            <motion.img
              key={pu.id}
              src="/img/handmade-crispy-shells.webp"
              alt=""
              width={pu.size}
              height={pu.size}
              className="absolute -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_6px_6px_rgba(74,28,11,0.35)]"
              style={{ left: pu.x, top: pu.y }}
              initial={{ scale: 0, x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.15, 1, 0.9],
                x: [0, pu.dx * 0.6, pu.dx],
                y: [0, -140 - Math.abs(pu.dx) * 0.3, 420],
                rotate: pu.rot,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 1.5, ease: ["easeOut", "easeIn"], times: [0, 0.35, 1] }}
              onAnimationComplete={() => setPuris((ps) => ps.filter((x) => x.id !== pu.id))}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
