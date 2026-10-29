"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { nav, site } from "@/lib/site";
import { Button, Lines, WhatsAppIcon } from "./ui";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const plateRotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);

  return (
    <footer ref={ref} className="relative overflow-hidden rounded-t-[2.5rem] bg-saffron text-ink md:rounded-t-[4rem]">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10 md:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Lines
              className="display text-[clamp(3rem,7.2vw,7.5rem)]"
              lines={[
                "Ready for the best",
                <>
                  <em className="display-italic">fuchka</em> in Philly?
                </>,
              ]}
            />
            <p className="mt-8 max-w-md text-lg text-ink/70">
              Once you try our freshly prepared fuchka, you&apos;ll understand why customers keep coming back.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={site.whatsapp} external variant="dark" icon={<WhatsAppIcon />}>
                Order on WhatsApp
              </Button>
              <a
                href={site.phoneHref}
                className="inline-flex h-14 items-center rounded-full border border-ink/25 px-7 font-medium transition-colors hover:bg-ink hover:text-saffron"
              >
                Call {site.phone}
              </a>
            </div>
          </div>
          <motion.div style={{ rotate: plateRotate }} className="mx-auto w-64 md:w-80 lg:col-span-4">
            <Image src="/img/fuchka-shots.webp" alt="" width={512} height={512} sizes="320px" className="w-full drop-shadow-[0_40px_40px_rgba(61,26,12,0.45)]" />
          </motion.div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-ink/15 pt-12 text-sm grid-cols-2 md:grid-cols-4">
          <div>
            <p className="eyebrow mb-4 text-ink/50">Visit</p>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="block leading-relaxed hover:underline">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.zip}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-4 text-ink/50">Hours</p>
            <p className="leading-relaxed">
              Every day
              <br />
              12 PM – 10 PM
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow mb-4 text-ink/50">Explore</p>
            <ul className="grid grid-cols-2 gap-y-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-4 text-ink/50">Follow</p>
            <ul className="space-y-2">
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Facebook ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative mt-16">
        <p aria-hidden className="eyebrow absolute top-0 right-5 text-ink/50 md:right-10">
          Hover me · tap a letter
        </p>
        <motion.div style={{ y: wordY }}>
          <Wordmark />
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-ink/15 px-5 py-6 text-xs text-ink/60 md:px-10">
        <p>© 2026 Fuchkawala LLC. All rights reserved.</p>
        <p className="flex gap-4">
          <span>Halal certified</span>
          <span>Fresh daily</span>
          <span>Authentic</span>
        </p>
        <p lang="bn" className="font-bangla text-sm text-ink">
          {site.tagline}
        </p>
      </div>
    </footer>
  );
}
