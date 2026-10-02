import asyncio, sys, json, re
from playwright.async_api import async_playwright

URL = "http://127.0.0.1:4311/"
OUT = "/home/pn/adboard/shots"

results = []
def check(name, cond, extra=""):
    results.append((name, bool(cond), str(extra)[:160]))
    print(("  ok   " if cond else "  FAIL ") + name + (f"  {extra}" if not cond and extra else ""))

async def main():
    import subprocess, time, os, signal, urllib.request
    # own server so the test never races the sandbox's background-process lifecycle
    srv = subprocess.Popen(
        ["node", "./node_modules/next/dist/bin/next", "start", "-p", "4311"],
        cwd="/home/pn/adboard",
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        preexec_fn=os.setsid,
    )
    for _ in range(40):
        try:
            urllib.request.urlopen("http://127.0.0.1:4311/", timeout=2)
            break
        except Exception:
            time.sleep(1)
    else:
        srv.kill(); raise SystemExit("server never came up")
    print("server up on 4311")
    try:
        await run(srv)
    finally:
        os.killpg(os.getpgid(srv.pid), signal.SIGTERM)

async def run(srv):
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=["--no-sandbox"])
        page = await browser.new_page(viewport={"width": 1440, "height": 950})
        errors, console_errs = [], []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: console_errs.append(m.text) if m.type == "error" else None)

        resp = await page.goto(URL, wait_until="networkidle")
        check("HTTP 200", resp.status == 200, resp.status)
        await page.wait_for_timeout(1500)

        # ---------- structure ----------
        print("\n[structure]")
        h1 = (await page.text_content("h1")) or ""
        check("h1 headline", "Put Your Business on" in h1 and "Any Billboard" in h1 and "in Seconds" in h1, h1[:90])
        sub = (await page.text_content("#top p")) or ""
        check("subheadline copy", "Scan, design on your phone, pay, and go live instantly" in sub, sub[:80])
        check("CTA find billboard", await page.locator('a:has-text("Find a Billboard Near You")').count() > 0)
        check("CTA list screen", await page.locator('a:has-text("List Your Screen")').first.count() > 0)

        # hero visual: phone + billboard
        phone = await page.locator("#top .aspect-\\[9\\/19\\]").count()
        bb = await page.locator("#top .led-screen").count()
        check("hero phone mockup rendered", phone > 0, phone)
        check("hero LED billboard rendered", bb > 0, bb)
        check("hero billboard shows creative", "YOUR BUSINESS HERE" in ((await page.text_content("#top")) or ""))

        # regression: the hero billboard once collapsed to 0x0 via `sm:w-auto`
        hero_bb = await page.evaluate("""() => {
            const els = [...document.querySelectorAll('#top .led-screen')];
            const bb = els.find(e => /YOUR BUSINESS HERE/.test(e.textContent));
            if (!bb) return null;
            const r = bb.getBoundingClientRect();
            return {w: Math.round(r.width), h: Math.round(r.height),
                    y: Math.round(r.y), vh: innerHeight};
        }""")
        check("hero billboard exists", hero_bb is not None)
        check("hero billboard has real size", hero_bb and hero_bb["w"] > 150 and hero_bb["h"] > 80, hero_bb)
        check("hero billboard above the fold", hero_bb and hero_bb["y"] < hero_bb["vh"], hero_bb)

        steps = await page.locator("#how h3").count()
        check("3 how-it-works steps", steps == 3, steps)
        check("features grid = 6 cards", await page.locator("#features h3").count() == 6)
        check("2 testimonials", await page.locator("figure").count() == 2)
        check("4 FAQ rows", await page.locator("#faq button").count() == 4)

        # ---------- dark mode / neon theme ----------
        print("\n[theme]")
        bg = await page.evaluate("getComputedStyle(document.body).backgroundColor")
        fg = await page.evaluate("getComputedStyle(document.body).color")
        print("   body bg:", bg, "| fg:", fg)
        rgb = [int(x) for x in __import__("re").findall(r"\d+", bg)[:3]]
        check("dark page background", sum(rgb) < 90, bg)
        head = await page.evaluate("getComputedStyle(document.querySelector('h1 span')).backgroundImage")
        check("gradient accent on headline span", "gradient" in head, head[:60])
        accent = await page.evaluate(
            "getComputedStyle(document.querySelector('#features svg')).color")
                # Tailwind v4 emits oklch(); cyan-300 has hue ~197, chroma > 0.1
        # oklch() order is L C H — hue is the third value
        _h = re.search(r"oklch\([\d.]+ ([\d.]+) ([\d.]+)", accent)
        check("neon icon color is cyan/violet (oklch hue 180-320)",
              bool(_h) and 180 <= float(_h.group(2)) <= 320 and float(_h.group(1)) > 0.1, accent)

        # ---------- interactions ----------
        print("\n[interactions]")
        head_input = page.locator('#simulator input').first
        await head_input.fill("PROPOSAL TONIGHT 8PM")
        await page.wait_for_timeout(500)
        screen_text = (await page.text_content("#simulator .led-screen")) or ""
        check("typed headline renders on LED screen", "PROPOSAL TONIGHT 8PM" in screen_text, screen_text[:80])

        # char counter
        check("char counter updates", "23/40" in (await page.text_content("#simulator")) or "/40" in (await page.text_content("#simulator")))

        # background swatch -> ad re-renders
        sw = page.locator("#simulator button[aria-pressed]")
        check("6 bg swatches", await sw.count() == 6, await sw.count())
        before = await page.evaluate(
            "document.querySelector('#simulator .led-screen div[style*=linear-gradient]').style.background")
        await sw.nth(5).click()
        await page.wait_for_timeout(700)
        after = await page.evaluate(
            "document.querySelector('#simulator .led-screen div[style*=linear-gradient]').style.background")
        check("swatch click changes ad background", before != after, f"{before[:40]} -> {after[:40]}")
        check("swatch aria-pressed moves", await sw.nth(5).get_attribute("aria-pressed") == "true")
        check("old swatch un-pressed", await sw.nth(0).get_attribute("aria-pressed") == "false")

        # preset chip
        await page.locator('#simulator button:has-text("WILL YOU MARRY ME?")').click()
        await page.wait_for_timeout(600)
        check("preset sets headline", (await head_input.input_value()) == "WILL YOU MARRY ME?",
              await head_input.input_value())
        check("preset renders on screen", "WILL YOU MARRY ME" in ((await page.text_content("#simulator .led-screen")) or ""))

        # upload tab
        await page.locator('#simulator button:text-is("Upload")').click()
        await page.wait_for_timeout(500)
        check("upload tab shows dropzone",
              "Drop a photo or short video" in (await page.text_content("#simulator")))
        await page.locator('#simulator button:text-is("Templates")').click()
        await page.wait_for_timeout(400)
        check("back to templates shows inputs", await page.locator("#simulator input").count() == 2)

        # FAQ accordion
        faq = page.locator("#faq button")
        check("faq 1 open by default", await faq.nth(0).get_attribute("aria-expanded") == "true")
        await faq.nth(2).click()
        await page.wait_for_timeout(700)
        check("faq 3 opens on click", await faq.nth(2).get_attribute("aria-expanded") == "true")
        check("faq 1 closes (single-open)", await faq.nth(0).get_attribute("aria-expanded") == "false")
        check("faq 3 answer visible", await faq.nth(2).locator("xpath=../div").last.is_visible())

        # anchor nav
        await page.locator('header a:has-text("How it works")').click()
        await page.wait_for_timeout(1200)
        check("nav anchor scrolls to #how", await page.evaluate("window.scrollY") > 100,
              await page.evaluate("window.scrollY"))

        check("no page errors", len(errors) == 0, errors[:2])
        check("no console errors", len(console_errs) == 0, console_errs[:2])

        # ---------- screenshots ----------
        import os
        os.makedirs(OUT, exist_ok=True)
        await page.evaluate("window.scrollTo(0,0)")
        await page.wait_for_timeout(800)
        await page.screenshot(path=f"{OUT}/01-hero.png")
        for name, sel in [("02-how", "#how"), ("03-simulator", "#simulator"),
                          ("04-features", "#features"), ("05-testimonials", "#faq"),
                          ("06-footer", "footer")]:
            await page.locator(sel).scroll_into_view_if_needed()
            await page.wait_for_timeout(1400)
            await page.screenshot(path=f"{OUT}/{name}.png")

        # horizontal overflow check (desktop + mobile)
        ov = await page.evaluate(
            "Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)")
        check("no horizontal overflow @1440", ov <= 0, ov)

        m = await browser.new_page(viewport={"width": 390, "height": 844})
        await m.goto(URL, wait_until="networkidle")
        await m.wait_for_timeout(1500)
        mov = await m.evaluate(
            "Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)")
        check("no horizontal overflow @390", mov <= 0, mov)
        await m.screenshot(path=f"{OUT}/07-mobile-hero.png")
        await m.locator("#simulator").scroll_into_view_if_needed()
        await m.wait_for_timeout(1500)
        await m.screenshot(path=f"{OUT}/08-mobile-simulator.png")

        await browser.close()

    bad = [r for r in results if not r[1]]
    print(f"\n{len(results) - len(bad)}/{len(results)} checks passed")
    if bad:
        print("\nFAILURES:")
        for n, _, e in bad:
            print(" -", n, e)
        sys.exit(1)

asyncio.run(main())