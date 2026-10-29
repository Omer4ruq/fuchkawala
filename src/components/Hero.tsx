"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { useLoaded } from "./Providers";
import { Button, Lines, Star, WhatsAppIcon } from "./ui";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** The five waters from the Fuchka Shots — each one re-colours the hero. */
const panis = [
  { name: "Tamarind", bg: "#3a1607", a: "#f39540", b: "#ff3d68" },
  { name: "Mint", bg: "#05362a", a: "#55e6a5", b: "#ffb81c" },
  { name: "Chili", bg: "#3d0815", a: "#ff4f5e", b: "#ffb81c" },
  { name: "Jaggery", bg: "#352103", a: "#ffb81c", b: "#ff3d68" },
  { name: "Lime", bg: "#1f3209", a: "#c8f03c", b: "#ff3d68" },
];

// --- rickshaw-art medallion geometry (600×600 viewBox) ---
const C = 300;
const petals = (n: number, r0: number, r1: number, w: number) =>
  Array.from({ length: n }, (_, i) => ({
    rot: (360 / n) * i,
    d: `M${C} ${C - r0} Q${C + w} ${C - (r0 + r1) / 2} ${C} ${C - r1} Q${C - w} ${C - (r0 + r1) / 2} ${C} ${C - r0}Z`,
  }));
const scallop = (n: number, r: number) => {
  const pt = (i: number) => {
    const t = ((Math.PI * 2) / n) * i - Math.PI / 2;
    return [C + r * Math.cos(t), C + r * Math.sin(t)].map((v) => v.toFixed(2)).join(" ");
  };
  const bump = (Math.PI * r) / n;
  return `M${pt(0)} ` + Array.from({ length: n }, (_, i) => `A${bump} ${bump} 0 0 1 ${pt(i + 1)}`).join(" ");
};
const OUTER = petals(28, 236, 298, 15);
const INNER = petals(14, 150, 212, 27);
const DOTS = Array.from({ length: 56 }, (_, i) => (360 / 56) * i);
const SCALLOP = scallop(48, 226);

function Medallion({ show }: { show: boolean }) {
  const ring = (i: number) => ({
    initial: { scale: 0.3, opacity: 0, rotate: -60 },
    animate: show ? { scale: 1, opacity: 1, rotate: 0 } : undefined,
    transition: { duration: 1.6, ease: EXPO, delay: 0.15 + i * 0.12 },
    style: { transformOrigin: "300px 300px" },
  });
  return (
    <svg viewBox="0 0 600 600" className="size-full overflow-visible" aria-hidden>
      <motion.g {...ring(3)}>
        <g className="animate-spin-slower" style={{ transformOrigin: "300px 300px" }}>
          {OUTER.map((p, i) => (
            <path key={i} d={p.d} transform={`rotate(${p.rot} ${C} ${C})`} className="fill-(--fl-a) transition-[fill] duration-1000" />
          ))}
        </g>
      </motion.g>
      <motion.g {...ring(2)}>
        <path d={SCALLOP} fill="none" strokeWidth={1.5} className="stroke-bone/35" />
        {DOTS.map((a) => (
          <circle key={a} cx={C} cy={C - 212} r={2.6} transform={`rotate(${a} ${C} ${C})`} className="fill-bone/50" />
        ))}
      </motion.g>
      <motion.g {...ring(1)}>
        <g className="animate-[spin_60s_linear_infinite_reverse]" style={{ transformOrigin: "300px 300px" }}>
          {INNER.map((p, i) => (
            <path key={i} d={p.d} transform={`rotate(${p.rot} ${C} ${C})`} className="fill-(--fl-b) transition-[fill] duration-1000" />
          ))}
        </g>
      </motion.g>
      <motion.circle {...ring(0)} cx={C} cy={C} r={156} className="fill-(--fl-bg) stroke-bone/20 transition-[fill] duration-1000" strokeWidth={1} />
    </svg>
  );
}

export function Hero() {
  const loaded = useLoaded();
  const ref = useRef<HTMLElement>(null);
  const [pani, setPani] = useState(0);
  const [picked, setPicked] = useState(false);
  const p = panis[pani];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // stacked layout on mobile — parallax would push the copy into the plate
  const textY = useTransform(scrollYProgress, (v) =>
    typeof window !== "undefined" && window.innerWidth >= 1024 ? `${v * 35}%` : "0%",
  );
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // every pani change gives the plate a springy quarter-spin
  const kick = useMotionValue(0);
  const kickS = useSpring(kick, { stiffness: 70, damping: 13 });
  const scrollSpin = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const plateRotate = useTransform(() => kickS.get() + scrollSpin.get());

  const choose = (i: number) => {
    setPani(i);
    kick.set(kick.get() + 72);
  };

  // auto-cycle until someone picks a pani themselves
  useEffect(() => {
    if (!loaded || picked) return;
    const t = setInterval(() => {
      setPani((i) => (i + 1) % panis.length);
      kick.set(kick.get() + 72);
    }, 3800);
    return () => clearInterval(t);
  }, [loaded, picked, kick]);

  // pointer parallax, normalised -0.5..0.5
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const near = { x: useTransform(px, (v) => v * 26), y: useTransform(py, (v) => v * 26) };
  const far = { x: useTransform(px, (v) => v * -8), y: useTransform(py, (v) => v * -8) };
  const side = { x: useTransform(px, (v) => v * -40), y: useTransform(py, (v) => v * -40) };
  const tiltX = useTransform(py, (v) => v * -12);
  const tiltY = useTransform(px, (v) => v * 12);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      style={{ "--fl-bg": p.bg, "--fl-a": p.a, "--fl-b": p.b } as React.CSSProperties}
      className="relative isolate min-h-svh overflow-hidden bg-(--fl-bg) pt-28 pb-16 transition-colors duration-1000 md:pt-32"
    >
      {/* ambient light + rickshaw dot texture */}
      <div aria-hidden className="pointer-events-none absolute top-[5%] right-[-15%] -z-10 size-[65vw] max-w-275 rounded-full bg-(--fl-a) opacity-20 blur-[140px] transition-colors duration-1000" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(251,242,226,0.07)_1px,transparent_1.6px)] bg-size-[22px_22px] mask-[linear-gradient(to_bottom,black,transparent_85%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-transparent to-ink" />

      <div className="mx-auto grid max-w-360 items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-6">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-7">
          <motion.div
            className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EXPO, delay: 0.1 }}
          >
            <p className="eyebrow flex items-center gap-3 text-(--fl-a) transition-colors duration-1000">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-current" />
              </span>
              Freshly made daily · Upper Darby, PA
            </p>
            <span lang="bn" className="font-bangla text-lg text-bone/60">
              {site.tagline}
            </span>
          </motion.div>

          <Lines
            as="h1"
            waitForLoad
            delay={0.15}
            className="display text-[clamp(2.9rem,7vw,8.25rem)]"
            lines={[
              "Philadelphia's most",
              <>
                <em className="display-italic rickshaw">addictive</em> fuchka
              </>,
              "experience.",
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.2, ease: EXPO, delay: 0.55 }}
          >
            <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/75">
              Crispy, tangy, and bursting with flavor. Handcrafted daily with traditional Bangladeshi spices, right here in
              the heart of Philly.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={site.whatsapp} external icon={<WhatsAppIcon />}>
                Order on WhatsApp
              </Button>
              <Button href="#menu" variant="ghost">
                Explore the menu
              </Button>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-bone/15 pt-6">
              {[
                { k: "Google rating", v: <>{site.rating} <Star className="size-4 text-(--fl-a) transition-colors duration-1000" /></> },
                { k: "Happy customers", v: "2k+" },
                { k: "Halal, always", v: "100%" },
              ].map((s) => (
                <div key={s.k} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-bone/55">{s.k}</dt>
                  <dd className="flex items-center gap-1.5 text-2xl font-medium">{s.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>

        {/* Medallion stage */}
        <div className="relative lg:col-span-5">
          <motion.div className="relative mx-auto aspect-square w-full max-w-140" style={{ scale: stageScale, perspective: 1200 }}>
            <motion.div className="absolute -inset-[4%]" style={far}>
              <Medallion show={loaded} />
            </motion.div>

            <motion.div className="absolute inset-0 flex items-center justify-center" style={{ x: near.x, y: near.y, rotateX: tiltX, rotateY: tiltY }}>
              <motion.div
                className="w-[56%]"
                initial={{ scale: 0.4, opacity: 0, rotate: -120 }}
                animate={loaded ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
                transition={{ duration: 1.8, ease: EXPO, delay: 0.5 }}
              >
                <motion.div style={{ rotate: plateRotate }}>
                  <Image
                    src="/img/tamarind-fuchka.webp"
                    alt="A plate of tamarind fuchka around a bowl of tamarind water"
                    width={400}
                    height={400}
                    preload
                    sizes="(min-width: 1024px) 320px, 56vw"
                    className="w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.6)]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="absolute -top-[2%] right-[2%] w-[24%]" style={side}>
              <motion.div initial={{ y: 60, opacity: 0 }} animate={loaded ? { y: 0, opacity: 1 } : undefined} transition={{ duration: 1.4, ease: EXPO, delay: 0.9 }}>
                <Image src="/img/lassi.webp" alt="" width={512} height={512} sizes="140px" className="w-full -rotate-6 drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)]" />
              </motion.div>
            </motion.div>
            <motion.div className="absolute bottom-[2%] left-[-2%] w-[28%]" style={side}>
              <motion.div initial={{ y: 60, opacity: 0 }} animate={loaded ? { y: 0, opacity: 1 } : undefined} transition={{ duration: 1.4, ease: EXPO, delay: 1 }}>
                <Image src="/img/jhal-muri.webp" alt="" width={512} height={512} sizes="160px" className="w-full rotate-12 drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)]" />
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute right-[0%] bottom-[4%]"
              initial={{ scale: 0, rotate: -120 }}
              animate={loaded ? { scale: 1, rotate: 0 } : undefined}
              transition={{ duration: 1.4, ease: EXPO, delay: 1.2 }}
            >
              <RoundBadge />
            </motion.div>
          </motion.div>

          {/* Pani picker */}
          <motion.div
            className="relative z-10 mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EXPO, delay: 1.3 }}
          >
            <div role="radiogroup" aria-label="Pick your pani" className="flex items-center gap-1 rounded-full border border-bone/15 bg-ink/40 p-1.5 pl-5 backdrop-blur-md">
              <span className="eyebrow mr-2 hidden text-[0.62rem] text-bone/60 sm:inline">Pick your pani</span>
              {panis.map((x, i) => (
                <button
                  key={x.name}
                  role="radio"
                  aria-checked={pani === i}
                  aria-label={x.name}
                  onClick={() => {
                    setPicked(true);
                    choose(i);
                  }}
                  className="relative flex h-9 items-center gap-2 rounded-full px-2 text-xs font-medium"
                >
                  {pani === i && <motion.span layoutId="pani" className="absolute inset-0 rounded-full bg-bone" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  <span className="relative size-5 rounded-full ring-2 ring-bone/25" style={{ background: x.a }} />
                  <AnimatePresence initial={false}>
                    {pani === i && (
                      <motion.span
                        className="relative overflow-hidden pr-1 whitespace-nowrap text-ink"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EXPO }}
                      >
                        {x.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#menu"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : undefined}
        className="eyebrow absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-bone/50 xl:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-bone/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-(--fl-a)" />
        </span>
      </motion.a>
    </section>
  );
}

function RoundBadge() {
  const text = "MADE FRESH DAILY • 100% HALAL • AUTHENTIC RECIPE • ";
  return (
    <div className="relative flex size-24 items-center justify-center rounded-full bg-bone text-ink shadow-2xl md:size-28">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink text-[8.4px] font-semibold tracking-[0.18em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="display display-italic text-2xl md:text-3xl">4.8</span>
    </div>
  );
}
