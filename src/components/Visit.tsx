"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { ArrowIcon, Button, Eyebrow, Lines, Reveal, WhatsAppIcon } from "./ui";

/** Open 12:00–22:00 daily, Philadelphia time. */
function useOpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const h = Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "America/New_York" }).format(new Date()));
      setOpen(h >= 12 && h < 22);
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return open;
}

export function Visit() {
  const open = useOpenNow();
  const rows = [
    { k: "Location", v: `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.zip}`, href: site.mapsUrl },
    { k: "Phone", v: site.phone, href: site.phoneHref },
    { k: "Email", v: site.email, href: `mailto:${site.email}` },
    { k: "Hours", v: site.hours },
  ];

  return (
    <section id="visit" className="relative bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow className="mb-6 text-saffron">Our location</Eyebrow>
            <Lines
              className="display text-[clamp(3rem,7.5vw,7.5rem)]"
              lines={[
                <>
                  Visit us <em className="display-italic text-saffron">today</em>
                </>,
              ]}
            />
          </div>
          {open !== null && (
            <Reveal className="flex items-center gap-3 rounded-full border border-bone/15 px-5 py-3 text-sm">
              <span className={`relative flex size-2.5`}>
                {open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />}
                <span className={`relative inline-flex size-2.5 rounded-full ${open ? "bg-emerald-400" : "bg-chili"}`} />
              </span>
              {open ? "Open now · until 10 PM" : "Closed now · opens 12 PM"}
            </Reveal>
          )}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-bone/70">
                Stop by and experience Philadelphia&apos;s favorite fuchka destination. Fresh ingredients, authentic flavors,
                and unforgettable taste await you.
              </p>
            </Reveal>
            <dl className="mt-10 border-t border-bone/10">
              {rows.map((r, i) => (
                <Reveal key={r.k} delay={i * 0.06} className="border-b border-bone/10">
                  <div className="group grid grid-cols-[6rem_1fr] items-baseline gap-4 py-5">
                    <dt className="eyebrow text-sand">{r.k}</dt>
                    <dd>
                      {r.href ? (
                        <a
                          href={r.href}
                          {...(r.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                          className="inline-flex items-center gap-2 text-lg transition-colors hover:text-saffron"
                        >
                          {r.v}
                          <ArrowIcon className="size-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                        </a>
                      ) : (
                        <span className="text-lg">{r.v}</span>
                      )}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal className="mt-8 flex flex-wrap gap-2">
              {["Parking available", "Takeout available", "100% Halal"].map((c) => (
                <span key={c} className="rounded-full bg-ink-3 px-4 py-2 text-sm text-bone/80">
                  {c}
                </span>
              ))}
            </Reveal>
            <Reveal className="mt-10 flex flex-wrap gap-3">
              <Button href={site.whatsapp} external icon={<WhatsAppIcon />}>
                WhatsApp order
              </Button>
              <Button href={site.mapsUrl} external variant="ghost">
                Get directions
              </Button>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.15}>
            <div className="group relative h-full min-h-[26rem] overflow-hidden rounded-[2rem] border border-bone/10">
              <iframe
                title="Fuchkawala on Google Maps"
                src={site.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full [filter:grayscale(1)_invert(0.92)_sepia(0.35)_hue-rotate(-12deg)_contrast(0.95)] transition-[filter] duration-700 group-hover:[filter:none]"
              />
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-ink/85 py-2 pr-5 pl-2 text-sm backdrop-blur-md"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-saffron text-ink">
                  <ArrowIcon />
                </span>
                Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
