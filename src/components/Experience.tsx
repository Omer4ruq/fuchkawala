"use client";

import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { features } from "@/lib/site";
import { Eyebrow } from "./ui";

const statement =
  "Every bite is crafted with authentic flavors, premium ingredients, and the perfect balance of crunch, spice, and tangy delight.";
const accent = new Set(["crunch,", "spice,", "tangy"]);

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.22em] inline-block">
      <motion.span style={{ opacity }} className={accent.has(word) ? "display-italic text-saffron" : ""}>
        {word}
      </motion.span>
    </span>
  );
}

function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = statement.split(" ");
  return (
    <div className="mx-auto max-w-360 px-5 md:px-10">
      <Eyebrow className="mb-10 text-saffron">Why our fuchka is different</Eyebrow>
      <p ref={ref} className="display max-w-6xl text-[clamp(2.2rem,5.6vw,5.8rem)] leading-[1.02]">
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </div>
  );
}

const heat = ["Mild", "Medium", "Extra hot"] as const;

function HeatPicker() {
  const [level, setLevel] = useState(1);
  return (
    <div className="relative z-10 mt-6">
      <div className="mb-3 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            className="size-7"
            animate={{ scale: i <= level ? 1 : 0.85, opacity: i <= level ? 1 : 0.25, rotate: i <= level ? -12 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <path
              fill="currentColor"
              d="M14.5 3c.3 1.4-.2 2.4-1 3 2.7.6 6.5 3.3 6.5 8.3C20 18.5 16.4 21 12 21c-3.7 0-7-2.2-7-6 0-3.7 2.8-5.7 4.6-6.3-.1 1.2.3 2.2 1.1 2.7.2-3.8 1.6-6.9 3.8-8.4Z"
            />
          </motion.svg>
        ))}
      </div>
      <div role="radiogroup" aria-label="Choose your heat" className="inline-flex rounded-full bg-ink/10 p-1">
        {heat.map((h, i) => (
          <button
            key={h}
            role="radio"
            aria-checked={level === i}
            onClick={() => setLevel(i)}
            className="relative rounded-full px-4 py-2 text-xs font-medium"
          >
            {level === i && <motion.span layoutId="heat" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className={`relative ${level === i ? "text-chili" : "text-ink/70"}`}>{h}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Per-card art direction: colour, sticker treatment and the word that pops on hover. */
const looks = [
  { bg: "bg-leaf", fg: "text-bone", img: "/img/handmade-crispy-shells.webp", ink: false, word: "Crunch!", pop: "bg-saffron text-ink" },
  { bg: "bg-saffron", fg: "text-ink", img: "/img/signature-spice-blend.webp", ink: true, word: "Zing!", pop: "bg-chili text-ink" },
  { bg: "bg-chili", fg: "text-ink", img: "/img/customizable-heat.webp", ink: true, word: "Hot hot!", pop: "bg-ink text-chili" },
  { bg: "bg-tamarind", fg: "text-bone", img: "/img/fresh-tamarind-water.webp", ink: false, word: "Slurp!", pop: "bg-mint text-ink" },
  { bg: "bg-mint", fg: "text-ink", img: "/img/hygienic-preparation.webp", ink: true, word: "Squeaky!", pop: "bg-chili text-ink" },
  { bg: "bg-paper", fg: "text-ink", img: "/img/authentic-street-food-taste.webp", ink: true, word: "Desh!", pop: "bg-leaf text-bone" },
];

const STICKER_OUTLINE =
  "drop-shadow(2px 0 0 #fbf2e2) drop-shadow(-2px 0 0 #fbf2e2) drop-shadow(0 2px 0 #fbf2e2) drop-shadow(0 -2px 0 #fbf2e2) drop-shadow(0 14px 18px rgba(0,0,0,0.35))";

function Card({ i, progress, pinned }: { i: number; progress: MotionValue<number>; pinned: boolean }) {
  const f = features[i];
  const look = looks[i];
  const dir = i % 2 ? 1 : -1;
  // hanging-sign swing: upright while passing mid-screen, tilting in from and out to the edges
  const mid = (i + 1.5) / (features.length + 2);
  const swing = useTransform(progress, [mid - 0.4, mid, mid + 0.4], [9 * dir, 0, -9 * dir]);
  const bob = useTransform(progress, [mid - 0.4, mid, mid + 0.4], [24, 0, 24]);
  // pointer tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  return (
    <motion.div className="shrink-0 lg:w-[min(27rem,80vw)]" style={pinned ? { rotate: swing, y: bob, perspective: 1000 } : { rotate: dir * 1.5 }}>
      <motion.article
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap="hover"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx.set(((e.clientY - r.top) / r.height - 0.5) * -14);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry }}
        className={`relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-[2rem] p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] md:p-10 lg:min-h-0 ${look.bg} ${look.fg}`}
      >
        {i === 3 && <TamarindWave />}

        <div className="relative z-10 flex items-start justify-between">
          <span className="display text-outline text-[6rem] leading-none opacity-50">{String(i + 1).padStart(2, "0")}</span>
          <div className="relative -mt-2 -mr-2 w-[46%]">
            <motion.div
              variants={{ rest: { scale: 1, rotate: -8 }, hover: { scale: 1.12, rotate: [-8, 10, -6, 4, 0] } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src={look.img}
                alt=""
                width={400}
                height={400}
                sizes="200px"
                className="w-full"
                style={{ filter: look.ink ? "brightness(0)" : STICKER_OUTLINE, opacity: look.ink ? 0.88 : 1 }}
              />
            </motion.div>
            <motion.span
              aria-hidden
              variants={{ rest: { scale: 0, rotate: -30, opacity: 0 }, hover: { scale: 1, rotate: -10, opacity: 1 } }}
              transition={{ type: "spring", stiffness: 500, damping: 14 }}
              className={`display display-italic absolute -bottom-2 -left-10 rounded-full px-4 py-1.5 text-2xl whitespace-nowrap shadow-lg ${look.pop}`}
            >
              {look.word}
            </motion.span>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="display text-[clamp(2rem,3vw,2.7rem)] leading-[1]">{f.title}</h3>
          <p className="mt-3 max-w-xs leading-relaxed opacity-75">{f.text}</p>
          {i === 2 && <HeatPicker />}
        </div>
      </motion.article>
    </motion.div>
  );
}

/** Liquid that rises when you hover the tamarind card. */
function TamarindWave() {
  const wave = "M0 20 Q 25 0 50 20 T 100 20 T 150 20 T 200 20 V 60 H 0 Z";
  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 bottom-0"
      variants={{ rest: { height: "16%" }, hover: { height: "64%" } }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute -top-[18px] left-0 h-5 w-[200%] animate-[wave_3s_linear_infinite] fill-[#c0621f]">
        <path d={wave} />
      </svg>
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute -top-[12px] left-0 h-5 w-[200%] animate-[wave_5s_linear_infinite_reverse] fill-[#9c4815]">
        <path d={wave} />
      </svg>
      <div className="absolute inset-0 bg-linear-to-b from-[#9c4815] to-[#5c230b]" />
    </motion.div>
  );
}

export function Experience() {
  const track = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => setDistance(mq.matches && track.current ? track.current.scrollWidth - window.innerWidth : 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section aria-labelledby="exp-title" className="relative z-10 -mt-16 rounded-t-[2.5rem] bg-ink pt-28 md:-mt-24 md:rounded-t-[4rem] md:pt-40">
      <Manifesto />

      <div ref={section} className="relative mt-24" style={{ height: distance ? `calc(100vh + ${distance}px)` : undefined }}>
        <div className={distance ? "sticky top-0 flex h-screen flex-col justify-center overflow-clip" : ""}>
          <motion.div ref={track} style={{ x }} className="flex flex-col gap-6 px-5 md:px-10 lg:h-[min(68vh,40rem)] lg:flex-row lg:items-stretch lg:gap-8">
            <div className="flex shrink-0 flex-col justify-between py-4 lg:w-[30rem] lg:pr-6">
              <h2 id="exp-title" className="display text-[clamp(3rem,6vw,6rem)]">
                Not just fuchka.
                <br />
                <em className="display-italic text-saffron">An experience.</em>
              </h2>
              <p className="mt-6 hidden max-w-xs text-bone/60 lg:block">
                Six things we never compromise on. Hover them — they bite back.
              </p>
            </div>
            {features.map((_, i) => (
              <Card key={i} i={i} progress={scrollYProgress} pinned={distance > 0} />
            ))}
            <div className="relative hidden aspect-[3/2] shrink-0 lg:block lg:w-[44rem]">
              <Image src="/img/hero-img.webp" alt="A fuchka stall platter with puris, chickpeas and tamarind water" fill sizes="44rem" className="object-contain" />
            </div>
          </motion.div>
          {distance > 0 && (
            <div className="mx-10 mt-12 h-px bg-bone/10">
              <motion.div style={{ width: bar }} className="h-full bg-saffron" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
