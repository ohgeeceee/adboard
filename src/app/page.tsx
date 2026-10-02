"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  ChevronDown,
  Layers,
  MapPin,
  MonitorSmartphone,
  Plus,
  Quote,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AdCreative, Beam, Billboard, PhoneMockup } from "../components/billboard";
import { BeaconMascot, GradientButton, Reveal, SectionLabel } from "../components/primitives";
import { Simulator } from "../components/simulator";

/* ----------------------------- nav ----------------------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-300 to-blue-500 font-black text-[#04121a]">
            A
          </span>
          <span className="text-[15px] font-bold tracking-tight">
            Ad<span className="text-cyan-300">Board</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/60 md:flex">
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#simulator" className="transition hover:text-white">Try it</a>
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/adboard/portal/register"
            className="hidden rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/80 transition hover:border-white/30 hover:text-white sm:inline-flex"
          >
            Owner portal
          </a>
          <a
            href="#map"
            className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-4 py-2 text-[13px] font-semibold text-[#04121a] transition hover:brightness-110"
          >
            Find a billboard
          </a>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- hero ----------------------------- */

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative overflow-x-clip overflow-y-visible">
      <div aria-hidden className="glow-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[900px] max-w-none -translate-x-1/2 blur-[120px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(47,107,255,0.30), rgba(168,85,247,0.16) 45%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1 text-[11px] font-medium tracking-wide text-cyan-200/90">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-cyan-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </span>
                1,240 screens live · 38 cities
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-[2.6rem] leading-[1.03] font-black tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.1rem]">
                Put Your Business on{" "}
                <span className="text-gradient">Any Billboard</span> in Seconds.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Scan, design on your phone, pay, and go live instantly on premium digital
                screens across the city. No contracts, no sales rep, no waiting weeks.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <GradientButton href="#map">
                  <MapPin className="h-4 w-4" />
                  Find a Billboard Near You
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </GradientButton>
                <GradientButton href="/adboard/portal/register" variant="ghost">
                  <Plus className="h-4 w-4" />
                  List Your Screen
                </GradientButton>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
                {[
                  ["< 60s", "moderation"],
                  ["from $5", "per spot"],
                  ["4 min", "median go-live"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {v}
                    </dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/40">
                      {l}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex items-center gap-3 text-xs text-white/45">
                <div className="h-px w-8 bg-cyan-300/40" />
                Meet Beacon — your ad’s signal to the city.
              </div>
            </Reveal>
          </div>

          {/* visual: phone -> beam -> billboard */}
          <Reveal delay={0.2} y={30}>
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-4">
              <BeaconMascot />
              <div className={reduce ? "" : "float-slow"}>
                <PhoneMockup className="w-[186px] sm:w-[200px] lg:w-[212px]" />
              </div>
              <Beam reduced={!!reduce} />
              {/* sm:w-auto gave this flex child no intrinsic width, so the
                  aspect-ratio billboard collapsed to 0x0 — keep an explicit basis. */}
              <div className="w-full max-w-[320px] flex-none sm:w-[280px] lg:w-[300px] lg:max-w-none">
                <Billboard>
                  <AdCreative
                    title="YOUR BUSINESS HERE"
                    subtitle="LIVE TONIGHT"
                    background="linear-gradient(135deg,#2f6bff 0%,#22e5ff 55%,#a855f7 100%)"
                  />
                </Billboard>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- how it works -------------------------- */

const STEPS = [
  {
    Icon: ScanLine,
    title: "Scan the QR code",
    body: "Every screen has a QR code on the frame. Scan it, or pick a location straight from our live map if you'd rather browse first.",
    accent: "from-cyan-300 to-blue-400",
  },
  {
    Icon: Sparkles,
    title: "Create your ad",
    body: "Start from a template, type your message, or upload your own photo or video. Design on your phone in about 30 seconds flat.",
    accent: "from-violet-400 to-fuchsia-400",
  },
  {
    Icon: Wallet,
    title: "Choose your time & pay",
    body: "Book a slot from $5. Automated safety review clears in under 60 seconds and your ad streams live within minutes.",
    accent: "from-emerald-300 to-cyan-400",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            Three steps. About four minutes.
          </h2>
          <p className="mt-4 text-base text-white/60">
            The whole loop fits in the time it takes to make a coffee.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.09}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20">
              <div
                aria-hidden
                className={`absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${s.accent} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-[#04121a]`}
                  >
                    <s.Icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <span className="font-mono text-3xl font-bold text-white/10">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/55">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- features ---------------------------- */

const FEATURES = [
  {
    Icon: ShieldCheck,
    title: "Instant AI content moderation",
    body: "Every creative is checked automatically before it hits the screen. Safety guaranteed in under 60 seconds.",
  },
  {
    Icon: Wallet,
    title: "Flexible budgets",
    body: "Pay per spot, per hour, or per day. Starting spots cost $5 — scale up only when it works.",
  },
  {
    Icon: Camera,
    title: "Real-time proof of play",
    body: "Get a photo notification on your phone the moment your ad runs. Verified delivery, every time.",
  },
  {
    Icon: Layers,
    title: "Network scaling",
    body: "Broadcast on 1 billboard or 100 screens at once with one checkout and one creative.",
  },
  {
    Icon: TrendingUp,
    title: "Daypart targeting",
    body: "Run happy hour at lunch, live music at 10pm. Schedule by hour, day, or a whole week.",
  },
  {
    Icon: MonitorSmartphone,
    title: "Built for small budgets",
    body: "Local shops, creators, proposals, birthdays. Ad spend that fits in the cash register.",
  },
];

function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Why AdBoard</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            Built like software, priced like a coffee
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.07}>
            <div className="group h-full bg-ink p-6 transition-colors hover:bg-ink-2">
              <f.Icon className="h-6 w-6 text-cyan-300" strokeWidth={2} />
              <h3 className="mt-4 text-base font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------- testimonials -------------------------- */

function Testimonials() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Proof</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            It works on both sides of the screen
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {[
          {
            quote:
              "We bought one hour on the screen outside the bank on a Tuesday morning. By lunch we had 50-odd walk-ins — more foot traffic than the previous two weeks combined. The proof-of-play photo came through while we were still pouring lattes.",
            name: "Marisol Vega",
            role: "Owner, Juniper Lane Café · Portland, OR",
            stat: "50+ walk-ins",
            statLabel: "from a single 1-hour run",
          },
          {
            quote:
              "My screens used to sit on a looping slideshow nobody looked at twice. AdBoard fills the empty gaps automatically and pays out on schedule. Three of my idle loops now earn every month without me lifting a finger.",
            name: "Dev Raman",
            role: "Operator, 14 digital screens · Sacramento, CA",
            stat: "$1,840/mo",
            statLabel: "passive, from empty ad loops",
          },
        ].map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <div
                aria-hidden
                className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-violet-500/12 blur-3xl"
              />
              <Quote className="relative h-7 w-7 text-cyan-300/50" />
              <blockquote className="relative mt-5 text-base leading-relaxed text-white/75">
                “{t.quote}”
              </blockquote>
              <figcaption className="relative mt-7 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-xs text-white/45">{t.role}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-cyan-300">{t.stat}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">
                    {t.statLabel}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ faq ------------------------------ */

const FAQS = [
  {
    q: "How fast does my ad go live?",
    a: "Upload, pay, and your creative clears automated safety review in under 60 seconds. From payment to your ad playing on the screen is typically about four minutes — often less. You'll get a push notification and a proof-of-play photo the moment it starts running.",
  },
  {
    q: "What content is allowed?",
    a: "Standard advertising rules apply: no illegal products, no misleading claims, no hate speech or adult content, and nothing that targets protected groups. Political advertising requires ID verification before a campaign can go live. Creators, birthdays, proposals, events, hiring posts and everyday business promos are all fine — most are approved without edits.",
  },
  {
    q: "Where are the screens located?",
    a: "Screens are concentrated in high-traffic commercial corridors: intersections, transit stops, retail strips and major arterials. Open the map after scanning and you'll see live availability, rate per hour, audience size, and a street-level photo of each exact screen.",
  },
  {
    q: "Can I schedule my ad for a future time?",
    a: "Yes. Pick any start and end time in the booking calendar, including recurring daily or weekly dayparts. Future bookings are charged at checkout and are fully refundable if you cancel more than 24 hours before the slot starts.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-5 py-20 sm:py-28">
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />
      <Reveal>
        <div className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            Questions, answered
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="faq">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-cyan-300" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-white/55">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------- footer ---------------------------- */

function Footer() {
  const groups = [
    {
      title: "Advertisers",
      links: ["Find a billboard", "Pricing", "Creative studio", "Proof of play", "Ad policies"],
    },
    {
      title: "Billboard owners",
      links: [
        "List your screen",
        "Owner dashboard",
        "Hardware requirements",
        "Revenue rates",
        "Support",
      ],
    },
    {
      title: "Developers",
      links: ["API documentation", "Screens API", "Bookings API", "Webhooks", "Status"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Terms of Service", "Privacy", "Contact"],
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-ink-2">
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-300 to-blue-500 font-black text-[#04121a]">
                A
              </span>
              <span className="text-[15px] font-bold tracking-tight">
                Ad<span className="text-cyan-300">Board</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              Self-serve digital billboard advertising. Scan, design, pay, go live.
            </p>
            <GradientButton href="#map" className="mt-6 px-5 py-2.5 text-[13px]">
              <MapPin className="h-3.5 w-3.5" />
              Find a billboard
            </GradientButton>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="text-sm text-white/55 transition hover:text-cyan-300">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/35 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AdBoard, Inc. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <a href="#top" className="transition hover:text-white">Terms of Service</a>
            <a href="#top" className="transition hover:text-white">Contact</a>
            <span className="hidden sm:inline">hello@adboard.example</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------- page ----------------------------- */

export default function Page() {
  return (
    <main className="min-h-screen bg-ink">
      <Nav />
      <Hero />
      <HowItWorks />
      <Simulator />
      <Features />
      <Testimonials />
      <section id="map" className="relative mx-auto max-w-6xl px-5 pb-24">
        <Reveal>
          <div
            id="owners"
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/12 via-violet-500/10 to-cyan-400/12 px-6 py-14 text-center sm:px-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[600px] -translate-x-1/2 blur-[100px]"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(34,229,255,0.3), transparent 70%)",
              }}
            />
            <h2 className="relative text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Got a dark screen paying for nothing?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-white/60">
              List your digital billboard in under ten minutes. We handle ad sales, payment
              collection and moderation — you collect the revenue on an empty loop.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <GradientButton href="/adboard/portal/register">
                <Plus className="h-4 w-4" />
                List Your Screen
              </GradientButton>
              <GradientButton href="#how" variant="ghost">
                See how payouts work
                <ArrowRight className="h-4 w-4" />
              </GradientButton>
            </div>
          </div>
        </Reveal>
      </section>
      <Faq />
      <Footer />
    </main>
  );
}
