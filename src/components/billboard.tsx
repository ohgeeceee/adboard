"use client";

import { motion } from "framer-motion";

/**
 * A realistic-ish digital billboard: bezel, LED pixel matrix, scanline,
 * ambient spill light and a support pole. Children render inside the LED area.
 */
export function Billboard({
  children,
  className = "",
  ratio = "aspect-[16/9]",
}: {
  children?: React.ReactNode;
  className?: string;
  ratio?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* ambient spill onto the "street" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-6 bottom-0 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(34,229,255,0.22), transparent 70%)",
        }}
      />
      {/* pole */}
      <div className="absolute left-1/2 top-full h-28 w-4 -translate-x-1/2 rounded-b bg-gradient-to-b from-zinc-700 to-zinc-900" />
      <div className="absolute left-1/2 top-[calc(100%+6.5rem)] h-2 w-24 -translate-x-1/2 rounded-full bg-zinc-800" />

      <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-zinc-800 to-zinc-950 p-2.5 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.9)]">
        {/* bezel screws */}
        {["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-white/15`}
          />
        ))}
        <div
          className={`led-screen scanline relative ${ratio} overflow-hidden rounded-md bg-black`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** The content that plays inside the LED screen. */
export function AdCreative({
  title,
  subtitle,
  background,
}: {
  title: string;
  subtitle?: string;
  background: string;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
      style={{ background }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 40%, rgba(255,255,255,0.28), transparent 65%)",
        }}
      />
      <p
        className="relative max-w-[92%] text-balance font-black leading-[0.95] tracking-tight text-white uppercase"
        style={{
          fontSize: "clamp(1.1rem, 4.2cqw, 3rem)",
          textShadow: "0 0 18px rgba(255,255,255,0.45)",
        }}
      >
        {title || "YOUR AD HERE"}
      </p>
      {subtitle ? (
        <p
          className="relative text-nowrap font-semibold tracking-[0.3em] text-white/85 uppercase"
          style={{
            fontSize: "clamp(0.45rem, 1.5cqw, 0.95rem)",
            textShadow: "0 0 12px rgba(255,255,255,0.35)",
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/** Phone mockup with a tiny composer UI; used in the hero. */
export function PhoneMockup({ className = "w-[236px] sm:w-[268px]" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 40%, rgba(168,85,247,0.35), transparent 70%)",
        }}
      />
      <div className="rounded-[2.4rem] border border-white/15 bg-gradient-to-b from-zinc-800 to-zinc-950 p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-[#07080d]">
          {/* status bar */}
          <div className="flex items-center justify-between px-4 pt-3 text-[9px] font-medium text-white/70">
            <span>9:41</span>
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              <span className="h-1.5 w-3 rounded-sm bg-white/60" />
            </span>
          </div>

          <div className="px-3.5 pt-3">
            <p className="text-[9px] font-semibold tracking-[0.2em] text-cyan-300/80 uppercase">
              Ad Studio
            </p>
            <p className="mt-1 text-[13px] leading-tight font-bold text-white">
              Live in 4 minutes
            </p>

            {/* preview thumb */}
            <div className="led-screen relative mt-3 aspect-[16/9] overflow-hidden rounded-md bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-black tracking-tight text-white uppercase drop-shadow">
                  Grand Opening
                </span>
              </div>
            </div>

            {/* fake input rows */}
            <div className="mt-3 space-y-1.5">
              {["Headline", "Choose screen", "Pick a time"].map((t) => (
                <div
                  key={t}
                  className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5"
                >
                  <span className="text-[9px] text-white/55">{t}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-md bg-gradient-to-r from-cyan-300 to-blue-400 py-1.5 text-center text-[9px] font-bold tracking-wide text-[#04121a]">
              PAY $5 &amp; GO LIVE
            </div>
          </div>

          {/* home indicator */}
          <div className="absolute inset-x-0 bottom-2 flex justify-center">
            <span className="h-1 w-16 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Animated signal beam with travelling packets from phone -> billboard. */
export function Beam({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative h-24 min-w-[70px] flex-1 sm:h-10">
      {/* horizontal beam (desktop) */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-violet-400/60 via-cyan-300/80 to-cyan-300/10 sm:block"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.8, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
      {/* vertical beam (mobile) */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 bottom-0 mx-auto hidden w-px bg-gradient-to-b from-violet-400/60 via-cyan-300/80 to-cyan-300/10 sm:hidden"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, delay: 0.8, ease: "easeOut" }}
        style={{ originY: 0 }}
      />

      {/* travelling packets (horizontal) */}
      {[
        { d: 2.2, delay: 0.9, color: "bg-violet-300" },
        { d: 2.6, delay: 1.3, color: "bg-cyan-200" },
        { d: 3.0, delay: 1.8, color: "bg-blue-300" },
      ].map((p, i) => (
        <span
          key={i}
          aria-hidden
          className={`packet absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full shadow-[0_0_10px_2px_rgba(34,229,255,0.9)] sm:block ${p.color}`}
          style={
            reduced
              ? undefined
              : ({ "--dur": `${p.d}s`, "--delay": `${p.delay}s` } as React.CSSProperties)
          }
        />
      ))}
      {/* travelling packets (vertical) */}
      {[
        { d: 2.4, delay: 1.0 },
        { d: 3.0, delay: 1.6 },
      ].map((p, i) => (
        <span
          key={`v${i}`}
          aria-hidden
          className="packet absolute left-1/2 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_10px_2px_rgba(34,229,255,0.9)] sm:hidden"
          style={
            reduced
              ? undefined
              : ({ "--dur": `${p.d}s`, "--delay": `${p.delay}s` } as React.CSSProperties)
          }
        />
      ))}
    </div>
  );
}