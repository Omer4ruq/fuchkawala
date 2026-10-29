"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { lenis, useLoaded } from "./Providers";
import { WhatsAppIcon } from "./ui";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const loaded = useLoaded();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
        initial={{ y: -120 }}
        animate={{ y: loaded && !hidden ? 0 : -120 }}
        transition={{ duration: 0.9, ease: EXPO, delay: loaded && !scrolled ? 0.6 : 0 }}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex h-16 max-w-[1440px] items-center justify-between rounded-full pr-2 pl-3 transition-all duration-700 ease-out-expo ${
            scrolled ? "border border-bone/10 bg-ink/70 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-3" aria-label="Fuchkawala — home">
            <Image src="/img/fuchkawala-logo.webp" alt="" width={40} height={40} className="size-10 rounded-full" />
            <span className="display display-italic text-2xl">Fuchkawala</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative block px-4 py-2 text-sm text-bone/75 transition-colors hover:text-bone">
                  {l.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-right scale-x-0 bg-saffron transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-12 items-center gap-2 rounded-full bg-saffron px-5 text-sm font-medium text-ink transition-colors hover:bg-turmeric sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" /> Order now
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex size-12 items-center justify-center rounded-full border border-bone/15 lg:hidden"
            >
              <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ease-out-expo ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ease-out-expo ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-2 px-6 pt-28 pb-10 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {nav.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-bone/10">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline justify-between py-3 text-[clamp(2.5rem,11vw,4rem)]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: EXPO, delay: 0.25 + i * 0.05 }}
                  >
                    {l.label}
                    <span aria-hidden className="eyebrow text-sand">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-1 text-sm text-sand"
            >
              <a href={site.phoneHref} className="text-bone">{site.phone}</a>
              <span>{site.hours}</span>
              <span lang="bn" className="font-bangla mt-3 text-xl text-saffron">{site.tagline}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
