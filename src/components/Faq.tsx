"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faqs } from "@/lib/site";
import { Eyebrow, Lines, Reveal } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-bone/10 bg-ink py-28 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="mb-6 text-saffron">Got questions?</Eyebrow>
            <Lines
              className="display text-[clamp(2.8rem,5vw,5rem)]"
              lines={[
                "We've got",
                <>
                  <em className="display-italic text-saffron">answers.</em>
                </>,
              ]}
            />
            <p className="mt-6 max-w-xs text-bone/60">Quick answers about our menu, ingredients, and services.</p>
          </div>
        </div>

        <Reveal className="lg:col-span-7 lg:col-start-6">
        <ul className="border-t border-bone/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-bone/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span className={`display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-tight transition-colors duration-300 ${isOpen ? "text-saffron" : "group-hover:text-saffron"}`}>
                        {f.q}
                      </span>
                      <span
                        className={`relative flex size-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out-expo ${
                          isOpen ? "rotate-180 border-saffron bg-saffron text-ink" : "border-bone/20 group-hover:border-bone/50"
                        }`}
                        aria-hidden
                      >
                        <span className="absolute h-px w-4 bg-current" />
                        <span className={`absolute h-4 w-px bg-current transition-transform duration-500 ${isOpen ? "scale-y-0" : ""}`} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-8 text-lg leading-relaxed text-bone/65">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </li>
            );
          })}
        </ul>
        </Reveal>
      </div>
    </section>
  );
}
