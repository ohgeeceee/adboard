"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CheckCircle2, Image as ImageIcon, Type } from "lucide-react";
import { AdCreative, Billboard } from "./billboard";
import { Reveal, SectionLabel } from "./primitives";

const PALETTES = [
  { name: "Electric", bg: "linear-gradient(135deg,#2f6bff 0%,#22e5ff 55%,#a855f7 100%)" },
  { name: "Sunset", bg: "linear-gradient(135deg,#ff4d6d 0%,#ff9f1c 60%,#ffd166 100%)" },
  { name: "Lime", bg: "linear-gradient(135deg,#00b09b 0%,#96c93d 100%)" },
  { name: "Deep", bg: "linear-gradient(135deg,#0f172a 0%,#312e81 55%,#7c3aed 100%)" },
  { name: "Mono", bg: "linear-gradient(135deg,#111827 0%,#374151 100%)" },
  { name: "Neon", bg: "linear-gradient(135deg,#ff00a0 0%,#7b2cff 50%,#00e0ff 100%)" },
];

/**
 * Truncate on code points, not UTF-16 units: slice() cuts astral characters
 * (emoji) in half and emits a lone surrogate, which breaks hydration.
 */
function clip(s: string, max: number) {
  const chars = Array.from(s);
  return chars.length <= max ? s : chars.slice(0, max).join("");
}

const PRESETS = [
  "HAPPY BIRTHDAY SAM 🎉",
  "WILL YOU MARRY ME?",
  "GRAND OPENING — 20% OFF",
  "LIVE TONIGHT @ 9PM",
  "NOW HIRING — JOIN US",
];

export function Simulator() {
  const [title, setTitle] = useState("GRAND OPENING — 20% OFF");
  const [subtitle, setSubtitle] = useState("SATURDAY 10AM");
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"template" | "text" | "upload">("template");

  const bg = useMemo(() => PALETTES[active].bg, [active]);

  return (
    <section id="simulator" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Live creative simulator</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            See your ad on a real LED screen{" "}
            <span className="text-gradient">before you spend a cent</span>
          </h2>
          <p className="mt-4 text-base text-white/60">
            Type a headline, pick a background, and watch it render pixel-for-pixel the way
            drivers will see it tonight.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-start">
          {/* controls */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex gap-1 rounded-lg border border-white/10 bg-black/40 p-1 text-xs font-medium">
              {(
                [
                  ["template", "Templates", ImageIcon],
                  ["text", "Text", Type],
                ] as const
              ).map(([key, label, Icon]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 transition-colors ${
                    mode === key
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
              <button
                onClick={() => setMode("upload")}
                className={`flex-1 rounded-md px-3 py-2 transition-colors ${
                  mode === "upload"
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Upload
              </button>
            </div>

            {mode !== "upload" ? (
              <>
                <label className="mt-5 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                  Headline
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(Array.from(e.target.value).slice(0, 40).join(""))}
                  maxLength={40}
                  placeholder="Your headline"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                />
                <div className="mt-1 flex justify-between text-[10px] text-white/30">
                  <span>Keep it punchy — big type reads at 60mph</span>
                  <span>{title.length}/40</span>
                </div>

                <label className="mt-5 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                  Sub-line
                </label>
                <input
                  value={subtitle}
                  onChange={(e) => setSubtitle(Array.from(e.target.value).slice(0, 24).join(""))}
                  maxLength={24}
                  placeholder="Optional detail"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                />
              </>
            ) : (
              <div className="mt-5 rounded-lg border border-dashed border-white/15 bg-black/30 px-4 py-8 text-center">
                <ImageIcon className="mx-auto h-6 w-6 text-white/35" />
                <p className="mt-2 text-xs text-white/50">Drop a photo or short video</p>
                <p className="mt-1 text-[10px] text-white/30">
                  15s MP4 · 1080&times;1920 recommended · checked automatically
                </p>
              </div>
            )}

            <label className="mt-5 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
              Background
            </label>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {PALETTES.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setActive(i)}
                  aria-label={`${p.name} background`}
                  aria-pressed={active === i}
                  className={`h-9 rounded-lg border transition ${
                    active === i
                      ? "border-cyan-300 ring-2 ring-cyan-300/40"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  style={{ background: p.bg }}
                />
              ))}
            </div>

            <div className="mt-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                Quick presets
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setTitle(p)}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/65 transition hover:border-cyan-400/40 hover:text-white"
                  >
                    {clip(p, 20)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* render */}
          <div className="lg:pl-4">
            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/35">
              <span>Preview · Midtown 4th &amp; Main</span>
              <span className="flex items-center gap-1.5 text-emerald-300/80">
                <CheckCircle2 className="h-3.5 w-3.5" /> Approved in 42s
              </span>
            </div>
            <Billboard>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${title}-${subtitle}-${active}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.28 }}
                  className="absolute inset-0"
                >
                  <AdCreative title={title} subtitle={subtitle} background={bg} />
                </motion.div>
              </AnimatePresence>
            </Billboard>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/55">
              <span>Estimated reach: 14,000 impressions tonight</span>
              <span className="font-semibold text-white">$5.00 · 1 hour</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}