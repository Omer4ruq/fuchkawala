"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { useLoaded } from "./Providers";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** Pulls its child toward the pointer — subtle, springy. */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

type BtnProps = {
  href: string;
  children: string;
  variant?: "solid" | "ghost" | "dark";
  icon?: React.ReactNode;
  external?: boolean;
};

/** Pill button with a vertical text roll and a fill that wipes up from below. */
export function Button({ href, children, variant = "solid", icon, external }: BtnProps) {
  const styles = {
    solid: "bg-saffron text-ink [--fill:var(--color-bone)]",
    ghost: "border border-bone/25 text-bone [--fill:var(--color-bone)] hover:text-ink",
    dark: "bg-ink text-bone [--fill:var(--color-chili)]",
  }[variant];

  return (
    <Magnetic>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pr-7 pl-6 text-[0.95rem] font-medium tracking-tight transition-colors duration-500 ${styles}`}
      >
        <span className="absolute inset-0 translate-y-full rounded-[50%_50%_0_0] bg-(--fill) transition-[translate,border-radius] duration-700 ease-out-expo group-hover:translate-y-0 group-hover:rounded-none" />
        {icon && <span className="relative">{icon}</span>}
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{children}</span>
          <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
            {children}
          </span>
        </span>
      </a>
    </Magnetic>
  );
}

/** Masked line-by-line reveal. Pass each visual line as an array entry. */
export function Lines({
  lines,
  className = "",
  delay = 0,
  waitForLoad = false,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  waitForLoad?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const loaded = useLoaded();
  const show = inView && (!waitForLoad || loaded);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%", rotate: 2 }}
            animate={show ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1.2, ease: EXPO, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.36-.5.06-1.13.09-1.83-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.58-.36.77-.36h.55c.18 0 .42-.07.66.5.24.58.82 2.01.9 2.15.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.3-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.14.46.12.63-.08.17-.19.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.14.48.22.55.34.08.12.08.7-.16 1.38Z" />
    </svg>
  );
}

export function Star({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M10 1.5l2.6 5.5 6 .7-4.5 4.1 1.2 5.9L10 14.8 4.7 17.7l1.2-5.9L1.4 7.7l6-.7L10 1.5z" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
