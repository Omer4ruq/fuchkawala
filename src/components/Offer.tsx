"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { site } from "@/lib/site";
import { Button, Eyebrow, Lines, Reveal, WhatsAppIcon } from "./ui";

export function Offer() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <section id="offer" className="relative overflow-hidden bg-leaf py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute -top-1/3 -left-1/4 size-[60rem] rounded-full bg-[radial-gradient(closest-side,rgba(242,169,59,0.18),transparent)]" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow className="mb-6 text-turmeric">Limited time only</Eyebrow>
          <Lines
            className="display text-[clamp(3rem,6.5vw,6.5rem)]"
            lines={[
              "Bring your",
              <>
                <em className="display-italic text-turmeric">friends.</em>
              </>,
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/75">
              Enjoy our exclusive combo deals, available for a limited time. Freshly prepared. Freshly served. Freshly
              loved.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={site.whatsapp} external icon={<WhatsAppIcon />}>
                Claim the combo
              </Button>
              <Button href="#visit" variant="ghost">
                Visit us today
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7" style={{ perspective: 1400 }}>
          <motion.div
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onPointerLeave={() => {
              mx.set(0);
              my.set(0);
            }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.92, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)]"
          >
            <Image src="/img/offer-fuchka.webp" alt="Combo platter of fuchka with tamarind, mint and lime waters" width={768} height={512} sizes="(min-width:1024px) 55vw, 100vw" className="w-full" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{ background: useTransform(glareX, (g) => `radial-gradient(circle at ${g} 30%, rgba(255,255,255,0.35), transparent 50%)`) }}
            />
          </motion.div>

          <div className="absolute -top-10 -right-2 flex size-32 items-center justify-center md:-right-8 md:size-40" aria-hidden>
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
              <defs>
                <path id="offer-circle" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
              </defs>
              <circle cx="50" cy="50" r="49" className="fill-chili" />
              <text className="fill-bone text-[8px] font-semibold tracking-[0.2em]">
                <textPath href="#offer-circle">COMBO DEALS • LIMITED TIME • COMBO DEALS • </textPath>
              </text>
            </svg>
            <span className="display display-italic relative text-2xl text-bone md:text-3xl">Combo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
