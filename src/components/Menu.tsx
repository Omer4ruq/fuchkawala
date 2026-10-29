"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { beverages, site, streetFood, type Dish } from "@/lib/site";
import { Button, Eyebrow, Lines, Reveal, WhatsAppIcon } from "./ui";

const EXPO = [0.16, 1, 0.3, 1] as const;
const tabs = [
  { id: "food", label: "Street food", items: streetFood },
  { id: "drinks", label: "Beverages", items: beverages },
] as const;

const tagStyle: Record<string, string> = {
  Popular: "bg-ink text-paper",
  Veg: "bg-leaf/10 text-leaf",
  Spicy: "bg-chili/10 text-chili",
};

export function Menu() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("food");
  const items = tabs.find((t) => t.id === tab)!.items;
  const [active, setActive] = useState<Dish>(items[0]);

  return (
    <section id="menu" className="relative z-0 rounded-t-[2.5rem] bg-paper pt-28 pb-24 text-ink md:rounded-t-[4rem] md:pt-40 md:pb-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-6 text-chili">Our menu</Eyebrow>
            <Lines
              className="display text-[clamp(3rem,7.5vw,7.5rem)]"
              lines={[
                "Traditional",
                <>
                  <em className="display-italic text-chili">favorites</em>, plated
                </>,
              ]}
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.2}>
            <p className="max-w-sm text-lg leading-relaxed text-ink/70">
              Authentic street food crafted fresh with bold flavors and premium ingredients. Choose your heat — mild,
              medium, or extra hot.
            </p>
            <div role="tablist" aria-label="Menu category" className="mt-8 inline-flex rounded-full border border-ink/15 p-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  aria-controls="menu-list"
                  onClick={() => {
                    setTab(t.id);
                    setActive(t.items[0]);
                  }}
                  className="relative rounded-full px-6 py-3 text-sm font-medium"
                >
                  {tab === t.id && (
                    <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className={`relative transition-colors duration-300 ${tab === t.id ? "text-paper" : "text-ink/60"}`}>
                    {t.label} <sup className="ml-0.5 text-[0.65em] opacity-60">{t.items.length}</sup>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
          {/* Sticky stage — desktop only */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-square w-full">
                <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#5a2a17,#2a110a_70%)]" />
                <div className="absolute inset-[3%] animate-spin-slow rounded-full border border-dashed border-ink/20" />
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active.img}
                    className="absolute inset-[8%]"
                    initial={{ opacity: 0, scale: 0.7, rotate: -50 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 40 }}
                    transition={{ duration: 0.8, ease: EXPO }}
                  >
                    <Image src={active.img} alt={active.name} fill sizes="40vw" className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.45)]" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex items-baseline justify-between border-t border-ink/15 pt-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={active.name}
                    className="display text-4xl"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    {active.name}
                  </motion.p>
                </AnimatePresence>
                <p className="display display-italic text-4xl text-chili">${active.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div id="menu-list" role="tabpanel" className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.ul
                key={tab}
                initial="hide"
                animate="show"
                exit="hide"
                variants={{ show: { transition: { staggerChildren: 0.05 } }, hide: { transition: { staggerChildren: 0.02, staggerDirection: -1 } } }}
              >
                {items.map((d, i) => (
                  <motion.li
                    key={d.name}
                    variants={{ hide: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.7, ease: EXPO }}
                    onPointerEnter={() => setActive(d)}
                    onFocus={() => setActive(d)}
                    tabIndex={0}
                    className={`group relative isolate grid grid-cols-[auto_1fr] gap-x-5 border-b border-ink/12 py-6 outline-none md:grid-cols-[3rem_1fr_auto] md:py-8 ${
                      active.name === d.name ? "lg:[&_.name]:text-chili" : ""
                    }`}
                  >
                    <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink/[0.04] transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
                    <span className="hidden pt-2 text-xs tabular-nums text-ink/40 md:block">{String(i + 1).padStart(2, "0")}</span>
                    <Image src={d.img} alt="" width={96} height={96} className="row-span-2 size-20 object-contain lg:hidden" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <h3 className="name display text-[clamp(1.6rem,3vw,2.6rem)] transition-[color,translate] duration-500 ease-out-expo group-hover:translate-x-2">
                          {d.name}
                        </h3>
                        {d.tags?.map((t) => (
                          <span key={t} className={`eyebrow rounded-full px-2.5 py-1 text-[0.6rem] ${tagStyle[t]}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-ink/60">{d.desc}</p>
                    </div>
                    <p className="display display-italic col-start-2 mt-3 text-2xl md:col-start-auto md:mt-0 md:pt-1 md:text-3xl">
                      ${d.price.toFixed(2)}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <Reveal className="mt-12 flex flex-wrap items-center gap-6">
              <Button href={site.whatsapp} external variant="dark" icon={<WhatsAppIcon />}>
                Order for pickup
              </Button>
              <p className="text-sm text-ink/60">Pickup only · Order ahead on WhatsApp</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
