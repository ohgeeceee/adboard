"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-200/80 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,229,255,0.8)]" />
      {children}
    </span>
  );
}

export function BeaconMascot() {
  const reduce = useReducedMotion();
  return (
    <div className="beacon-stage relative mx-auto w-[190px] sm:w-[220px]" aria-label="AdBoard Beacon mascot">
      <div aria-hidden className="beacon-aura absolute inset-[12%] rounded-full bg-cyan-400/20 blur-3xl" />
      <motion.div
        className="relative z-10"
        animate={reduce ? undefined : { y: [0, -12, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/mascot/adboard-beacon.png"
          alt="AdBoard Beacon, the friendly billboard bot"
          width={1145}
          height={1374}
          priority
          className="h-auto w-full drop-shadow-[0_24px_35px_rgba(34,229,255,0.24)]"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="beacon-orbit absolute bottom-[3%] left-1/2 h-5 w-[78%] -translate-x-1/2 rounded-[50%] border border-cyan-300/60 bg-cyan-300/10 blur-[1px]"
        animate={reduce ? undefined : { scaleX: [0.86, 1, 0.86], opacity: [0.45, 0.9, 0.45] }}
        transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute -right-5 top-[14%] rounded-full border border-cyan-300/20 bg-[#07131c]/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur">
        Beacon online
      </span>
    </div>
  );
}

export function GradientButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300";
  const styles =
    variant === "primary"
      ? "text-[#04121a] bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 shadow-[0_0_28px_-6px_rgba(34,229,255,0.75)] hover:shadow-[0_0_38px_-4px_rgba(34,229,255,0.95)] hover:brightness-110"
      : "text-white border border-white/15 bg-white/5 backdrop-blur hover:border-white/30 hover:bg-white/10";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}
