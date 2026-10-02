# AdBoard — Landing Page

Self-serve digital billboard advertising. Scan a QR code, design on your phone, pay, go live.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS v4 (`@theme` tokens, no `tailwind.config.js` needed)
- Framer Motion for scroll reveals, beam packets, and accordion height animation
- Lucide React icons

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Sections

| Section | id | Notes |
|---|---|---|
| Hero | `#top` | Phone → animated signal beam → LED billboard |
| How it works | `#how` | Three steps |
| Creative simulator | `#simulator` | Live input + 6 palettes + presets, rendered on an LED frame |
| Features | `#features` | Six-cell grid |
| Testimonials | — | Cafe owner + billboard operator |
| Owner CTA | `#owners` (inside `#map`) | Billboard owners |
| FAQ | `#faq` | Single-open accordion |
| Footer | — | Advertiser / owner / developer / company link groups |

## Files

```
src/app/layout.tsx        fonts, metadata
src/app/globals.css       Tailwind import, theme tokens, LED-pixel + scanline + packet keyframes
src/app/page.tsx          all page sections
src/components/billboard.tsx  Billboard, AdCreative, PhoneMockup, Beam
src/components/simulator.tsx  interactive creative simulator
src/components/primitives.tsx Reveal, SectionLabel, GradientButton
verify.py                  Playwright checks (see below)
```

## LED screen effect

`.led-screen` layers two offset radial-gradient dot patterns into a pixel matrix, plus a
moving `.scanline`. Type scales with `cqw` (the element is a `container-type: inline-size`
context), so ad copy stays proportional on any billboard size.

## Verification

`verify.py` runs the production build in real headless Chromium and asserts structure,
the dark/neon theme, every interaction (typing, swatches, presets, upload tab, accordion,
anchor nav) and zero horizontal overflow at 1440px and 390px.

```bash
npm run build
PLAYWRIGHT_BROWSERS_PATH=/opt/playwright python3 verify.py
```

## Accessibility

`prefers-reduced-motion` disables the float, scanline, packets and pulse. Swatches are
labelled buttons with `aria-pressed`; FAQ rows use `aria-expanded`.

## Known gaps

Copy and links are placeholders — `#map`, `#owners` and most footer links point at
on-page anchors. Wire them to the real map, checkout and legal pages before launch.
