"use client";

import Image from "next/image";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Eyebrow, Lines, Reveal } from "./ui";

function Count({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const stats = [
  { node: <Count to={site.rating} decimals={1} />, label: "Google rating" },
  { node: <Count to={2} suffix="k+" />, label: "Happy customers" },
  { node: <Count to={100} suffix="%" />, label: "Halal ingredients" },
  { node: <Count to={7} />, label: "Days a week, 12–10" },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section id="story" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div ref={ref} className="mx-auto grid max-w-[1440px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <motion.div
            className="arch relative aspect-[3/4] overflow-hidden bg-[linear-gradient(180deg,#0f4c47,#08302d_60%,#11201f)]"
            initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 24px 24px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 24px 24px)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.span
              lang="bn"
              style={{ y: textY }}
              className="font-bangla absolute inset-x-0 top-[12%] text-center text-[clamp(2.4rem,5vw,4.5rem)] leading-tight text-saffron/25"
            >
              ঢাকা
            </motion.span>
            <motion.div style={{ y: imgY }} className="absolute inset-x-[-10%] bottom-[6%] aspect-[3/2]">
              <Image
                src="/img/mohabbat-ka-sharbat-fuchka-haleem.webp"
                alt="Mohabbat Ka Sharbat with fuchka and haleem"
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </motion.div>
          <div className="arch pointer-events-none absolute -inset-3 border border-saffron/20" aria-hidden />
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Eyebrow className="mb-6 text-saffron">Our story</Eyebrow>
          <Lines
            className="display text-[clamp(2.8rem,6vw,6rem)]"
            lines={[
              "Born in Dhaka.",
              <>
                Made for <em className="display-italic text-saffron">Philly.</em>
              </>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-10 text-xl leading-relaxed text-bone/90 md:text-2xl">
              We grew up eating fuchka on the streets of Bangladesh — gathering around a cart, watching the wala fill each
              puri with care, and that first burst of tamarind water hitting your tongue.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 text-bone/60 md:grid-cols-2">
            <Reveal delay={0.2}>
              <p className="leading-relaxed">
                We brought that exact magic to Philadelphia. Every ingredient is carefully sourced, every recipe is passed
                down from our family, and every single fuchka is made by hand — because shortcuts ruin the experience.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="leading-relaxed">
                Whether you grew up with fuchka or you&apos;re trying it for the first time, we promise you one thing: one
                bite and you&apos;ll understand why a billion people can&apos;t live without it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <dl className="mx-auto mt-24 grid max-w-[1440px] grid-cols-2 border-y border-bone/10 px-5 md:mt-32 md:px-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className={`flex flex-col-reverse py-10 md:py-14 ${i % 2 ? "pl-6 md:pl-10" : ""} ${i > 0 ? "lg:border-l lg:border-bone/10 lg:pl-10" : ""} ${i % 2 ? "border-l border-bone/10" : ""} ${i > 1 ? "border-t border-bone/10 lg:border-t-0" : ""}`}
          >
            <dt className="eyebrow mt-4 text-sand">{s.label}</dt>
            <dd className="display text-[clamp(3rem,6vw,5.5rem)] leading-none text-bone">{s.node}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
