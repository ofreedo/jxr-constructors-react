# JXR Constructors — React/Vite/Tailwind Port (for Lovable.dev)

This is a from-scratch **hand-port** of the static HTML/CSS/vanilla-JS
JXR Constructors site into Vite + React + TypeScript + Tailwind CSS +
shadcn/ui — built specifically so it can be handed to Lovable.dev, which
cannot import an existing repository (see "Why this project exists" below).

**Two project directories exist. Do not confuse them:**

- `/Users/alfredoramirez/Desktop/Claude/jxr-redesign/` — the **original**
  static site (`prototype/index.html` etc., plain HTML/CSS/vanilla JS, no
  build step). This is the **source of truth for all real content**:
  copy, photos, brand decisions, exact design values. It is deployed live
  at `https://ofreedo.github.io/jxr-redesign/` via GitHub Pages. Its own
  `README.md` documents that project's own history in detail — read it too
  if you need more context on brand decisions, the homepage hero animation
  design rationale, or the site's own bug-fix history.
- `/Users/alfredoramirez/Desktop/Claude/jxr-redesign-react/` (**this
  directory**) — the new React port, in progress, not yet pushed to any
  Git repo, not yet connected to Lovable.

## Why this project exists — read this first

The user asked to get the JXR site into Lovable.dev so they (or a
collaborator, Kathryn, in a shared Lovable workspace) could keep
building/editing it there going forward. The obvious first approach —
import the existing `ofreedo/jxr-redesign` GitHub repo into Lovable —
**does not work**, confirmed directly from Lovable's own documentation
(`https://docs.lovable.dev/integrations/git-sync-overview`, fetched and
read in full):

> "Export only. You can't import an existing repository into Lovable.
> Connecting a project always creates a new repository."

This was also independently confirmed by inspecting the Lovable MCP
server's own tool set: `create_project` always builds a **brand-new**
full-stack TypeScript project from a text prompt (no repo-URL parameter
exists anywhere in its schema), and `remix_project` only forks an
**existing Lovable project**, not an external GitHub repo. There is no
tool, UI flow, or API path that ingests external source code into a new
Lovable project. Git sync is strictly **Lovable → GitHub** (Lovable
generates code, then optionally mirrors it out to a repo you own), never
the reverse.

### Dead ends actually explored this session (don't repeat these)

- Tried the Lovable web UI's `Create → New project` flow looking for a
  GitHub-import option. There isn't one on the dashboard.
- Tried the `+` attachment icon in the prompt box, which surfaced a
  "GitHub API" connector option. **This is not a repo importer** — it's a
  *runtime API connector* that lets a Lovable-built app call GitHub's REST
  API at runtime (e.g., an app that displays your repos/issues). Selecting
  it also silently switched the prompt box into "make a document" mode
  (Lovable's separate documents feature), which is unrelated to code
  projects entirely. Don't go down this path again.
- Checked the user's own Lovable workspace ("aram831's Lovable") — no JXR
  projects existed there.
- Checked a **second** workspace the user has admin (not owner) access to
  — "Kathryn's Lovable" — via the Lovable MCP server (`list_projects`).
  Found **four separate pre-existing JXR-related Lovable projects**, none
  connected to the real repo, all independently AI-generated from text
  prompts at different points in time, most containing **fabricated mock
  data** (fake project directories, fake map coordinates, fake
  testimonials) rather than the real site's content. One
  ("buildabrand-co" / "JXR Constructor Kit") is **published live** at
  `buildabrand-co.lovable.app`. **These are not being touched or reused.**
  User explicitly confirmed Kathryn is aware and it's fine to add a new,
  separate project to her workspace once this port is ready — but that
  hasn't happened yet, and none of the 4 existing projects should be
  overwritten or treated as a starting point.

### The actual plan

Hand-write a real Vite+React+TS+Tailwind+shadcn project (matching
Lovable's own default project stack, confirmed via the `create_project`
MCP tool's description: *"full-stack TypeScript apps with Tailwind +
shadcn/ui"*) that faithfully reproduces the static site — same content,
same design, same custom animation behavior — then have the user push it
to a **brand-new, empty** GitHub repo and connect *that* repo to a new
Lovable project via Lovable's Git-sync "connect repository" flow in
Project Settings → Git. Lovable will pull in whatever's pushed at connect
time as that project's starting code.

**User confirmed: full pixel-for-pixel fidelity is required** — this is
not a simplified reference build. Every page, every animation system, and
all real content/photos are being ported faithfully, not summarized or
rebuilt from a prompt.

## A critical environment constraint that shapes everything

**Bash is completely non-functional in this Claude Code environment.**
Every single shell command — even `echo test` — fails with a
`Proxy communication failed` error. This has been true for this entire
project (confirmed repeatedly, re-tested at multiple points, never
recovered) and is almost certainly **environment-level, not
session-level** — i.e., it will very likely still be broken in a fresh
context-window session too. Don't assume it's fixed; test with something
trivial (`echo test`) before relying on it, but budget for it still being
broken.

Practical consequences, all real and already happened in this project:

- **Claude cannot run `npm install`, `npm run dev`, `npm run build`, or
  any git command.** All of these must be handed to the user as exact
  copy-pasteable commands, and the user reports back results (terminal
  output, screenshots, or plain descriptions).
- **Claude cannot copy binary files** (photos, images). `Read` can *view*
  an image but cannot round-trip it back out as bytes via `Write` (which
  only writes text). The entire `public/assets/` photo library (~300
  files) had to be copied by the **user** running a `cp -r` command Claude
  provided — Claude cannot do this step itself, ever, in any future
  session either.
- **Verification is a collaborative loop, not something Claude does
  alone.** The pattern that worked well this session: Claude writes code,
  tells the user exactly what commands to run and what to look for, user
  runs `npm run dev` and reports back (screenshots, console output,
  Network-tab details), Claude diagnoses from that evidence and fixes.
  Keep using this pattern — don't try to find a workaround that lets
  Claude self-verify; none was found despite trying (see "Tool workaround
  attempts" below).
- **Claude *can* use the Browser pane tools** (`mcp__Claude_Browser__*`)
  to drive a **live, already-running** `http://localhost:xxxx` dev server
  once the user has started one — this worked well and is reliable for
  `http://localhost` URLs specifically (unlike `file://` URLs elsewhere in
  this overall project, which have a separate, unrelated snapshot-mode
  limitation documented in the *original* static site's own README).
  Once the user confirms `npm run dev` is running, Claude can navigate to
  `http://localhost:5173/whatever`, read the DOM, execute JS, check
  Network requests, and take screenshots directly — this was used
  successfully to diagnose the broken-image bug documented below.

### Tool workaround attempts (for the record, so they're not retried)

- Considered whether the Browser pane's `preview_start` tool (which can
  launch a dev server itself from `.claude/launch.json`, per its own
  description) might route through a different execution path than the
  broken Bash proxy. This was **never actually tested** because the user
  opted for the simpler "I run install/dev, you verify once it's up"
  workflow instead — asked via `AskUserQuestion`, user explicitly chose
  the manual-handoff option over trying the tool-workaround-first option.
  **This remains a genuinely untested possibility** if a future session
  wants to try reducing the back-and-forth — but don't assume it works;
  verify before relying on it.

## Target stack, and why each piece was chosen

- **Vite + React 18 + TypeScript** — Lovable's actual runtime, confirmed
  via the MCP tool description, not assumed.
- **Tailwind CSS**, with the site's real design tokens ported into
  `tailwind.config.ts` `theme.extend` rather than kept as raw CSS custom
  properties, *except* for values that are only knowable at runtime (see
  "Runtime CSS custom properties" below).
- **shadcn/ui** — currently only planned for the Phase 5 photo-gallery
  modal (`Dialog`, built on Radix UI). Deliberately **not** used for
  buttons — the site has exactly 4 button visual variants
  (`primary`/`hero-primary`/`outline`/`outline-light`) with very specific
  existing styling, and a hand-rolled `src/components/ui/Button.tsx` with
  a small variant map was simpler and more faithful than adapting shadcn's
  own Button primitive and its default styling assumptions. shadcn is a
  *toolkit to draw from when it genuinely saves real code* (see the
  Dialog reasoning in Phase 5 below), not a mandate to use every
  primitive it offers.
- **React Router v6** for routing (7 pages → 7 routes, clean paths with no
  `.html`: `/`, `/about`, `/services`, `/projects`, `/testimonials`,
  `/shop`, `/contact`).
- **No shadcn semantic color tokens** (the usual `hsl(var(--background))`
  etc. system shadcn scaffolds by default) — `components.json` was
  configured with `cssVariables: false` deliberately. This site has one
  fixed brand palette, not a themeable/dark-mode design system, so the
  abstraction layer shadcn normally provides wasn't worth the indirection;
  concrete Tailwind color tokens (`bg-jxr-black`, `text-jxr-blue`, etc.)
  are used directly everywhere, including inside the Phase-5 Dialog.

## Design tokens (ported from the original `styles.css` `:root`)

In `tailwind.config.ts` `theme.extend.colors`:

| Token | Value | Original CSS var |
|---|---|---|
| `jxr-black` | `#14161a` | `--jxr-black` |
| `jxr-blue` | `#1c3fbf` | `--jxr-blue` |
| `jxr-blue-bright` | `#2547d6` | `--jxr-blue-bright` |
| `jxr-white` | `#ffffff` | `--jxr-white` |
| `bg-warm` | `#f7f4ee` | `--bg-warm` |
| `bg-panel` | `#ffffff` | `--bg-panel` |
| `charcoal` | `#2b2e33` | `--charcoal` |
| `charcoal-soft` | `#565a61` | `--charcoal-soft` |
| `hairline` | `#dcd6c9` | `--hairline` |

Fonts: `font-head` = `"Source Serif 4", Georgia, "Times New Roman", serif`
(weights 500/600/700 loaded via Google Fonts `<link>` in `index.html`),
`font-body` = `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI",
sans-serif` (weights 400/500/600/700). `borderRadius.DEFAULT` = `2px`
(matches `--radius`). `maxWidth.container` = `1180px` (matches
`--max-width`, used as `max-w-container` everywhere the original used
`.container`).

**Custom `transitionDuration` scale added**: `250: '250ms'` and
`400: '400ms'`. This exists because Tailwind's arbitrary-value duration
syntax (`duration-[0.25s]`, `duration-[0.4s]`) triggers a real build-time
warning — *"The class `duration-[0.25s]` is ambiguous and matches
multiple utilities"* — confirmed by actually running `npm run dev` and
reading the warning output. Named scale values (`duration-250`,
`duration-400`) avoid the ambiguity entirely and were used everywhere
those two original transition timings appear (header shrink, nav
underline sweep). If you need a *new* timing value not already in this
scale, add it to `tailwind.config.ts` the same way rather than reaching
for an arbitrary-value class — it's both cleaner and avoids the warning
class.

### Runtime CSS custom properties (cannot live in Tailwind config)

Declared with safe fallback defaults in `src/index.css` `:root`:

- `--logo-tx`, `--logo-ty`, `--logo-scale` — set imperatively via
  `ref.style.setProperty(...)` by the **not-yet-built** `HeroAnimated`
  component (Phase 6). These position/scale the homepage's logo-trace SVG
  against the hero photo's actual on-screen crop, computed at runtime via
  `getBoundingClientRect()` — genuinely can't be known at build time since
  they depend on the live viewport.
- `--len` — same story, set via each SVG path/circle's
  `getTotalLength()`, used for the `stroke-dasharray`/`stroke-dashoffset`
  hand-draw effect.

### Named keyframe animations (in `tailwind.config.ts` `theme.extend`)

`hero-photo-resolve`, `hero-fade-in`, `hero-logo-shrink`, `hero-draw-ring`,
`hero-draw-ring-blue`, `hero-draw-xmark`, `hero-draw-flag`,
`hero-trace-fade-out`, `proof-bar-settle`, `proof-bar-content-fade` — all
ported with their exact original delays/durations/easing curves baked
into the `animation` shorthand (e.g.
`"hero-fade-in 1s ease-out 1.75s forwards"`). These are **not yet wired
up to any component** — they exist in the Tailwind config ready for
`HeroAnimated` (Phase 6) to apply as classes, but nothing currently uses
them. Don't be confused if grepping the config shows animations that
don't appear to be used anywhere yet — that's expected, not a bug.

## Folder structure and what's actually built (precise, as of last session)

```
src/
  components/
    layout/
      Layout.tsx           ✅ built — Outlet wrapper, hash-scroll restoration, passes isHeroIntro to SiteHeader
      SiteHeader.tsx        ✅ built — both normal-sticky and hero-intro-fixed modes
      MainNav.tsx           ✅ built — NavLink active state, mobile hamburger, utility links
      SiteFooter.tsx        ✅ built — full real footer content
    ui/
      Button.tsx             ✅ built — 4 variants, to/href/onClick polymorphic
    hero/
      HeroAnimated.tsx       ✅ built — full blueprint-reveal intro, see Phase 6
    reveal/
      Reveal.tsx             ⚠️ STUB — renders children with className, zero animation logic yet
      RevealGroup.tsx        ⚠️ STUB — same, no stagger logic yet
      CountUp.tsx            ⚠️ STUB — renders final value directly, no counting animation yet
    sections/
      SectionLabel.tsx       ⚠️ PARTIAL — tick mark always rendered "fully drawn", no scroll-triggered draw-in yet
      PageHero.tsx            ✅ built — the non-animated interior-page hero (About/Services/Projects/Testimonials/Contact)
      ProofBar.tsx            ✅ built — `variant="hero-sync"` now real, synced to HeroAnimated's 2.75s settle timer (Phase 6)
      ClientRow.tsx           ✅ built
      ProjectCard.tsx         ✅ built (homepage's 3 featured-project cards)
      PortfolioCard.tsx       ✅ built (projects.html's 10 cards) — gallery badge renders, click/keyboard handlers exist and are wired to an `onOpenGallery` prop, but nothing currently passes that prop (Phase 5 will)
      QuoteCard.tsx            ✅ built
      ServiceCard.tsx          ✅ built
      Timeline.tsx             ⚠️ PARTIAL — TimelineMarker dot renders at rest state (scale-100), no bounce-in animation yet
      CtaBand.tsx               ✅ built
      ShopifyBuyButton.tsx      ✅ built — REAL production Shopify integration, not a mockup (see below)
    gallery/                   ❌ NOT YET CREATED (Phase 5) — PhotoGalleryDialog.tsx, GalleryTrigger.tsx go here
    ui/ (shadcn primitives)    ❌ NOT YET CREATED — dialog.tsx (Phase 5) will be the first one hand-added
  data/
    siteConfig.ts             ✅ built — phone/address/email/social/reviews/BBB, single source of truth
    nav.ts                     ✅ built — main nav links, footer links, utility links (Shop/Employee Portal)
    projects.ts                 ✅ built — all 10 portfolio projects, including the 7 verified photo-gallery arrays (see "Gallery data" section below — important caveats)
  hooks/
    usePrefersReducedMotion.ts  ✅ built and functional
    useStickyHeaderShrink.ts    ✅ built and functional (80px threshold)
    useHeroIntroReveal.ts       ✅ built and functional (4px threshold, checks real scrollY not just "an event fired" — this exact defensive pattern was a real bug fix in the *original* static site, ported forward deliberately)
    useScrollReveal.ts          ❌ NOT YET CREATED (Phase 4)
    useCountUp.ts                ❌ NOT YET CREATED (Phase 4) — logic already proven correct in the original site's vanilla JS (ease-out cubic, 1200ms) and in the ProofBar/AboutPage stub usage; just needs the hook extracted
    useGalleryNavigation.ts      ❌ NOT YET CREATED (Phase 5)
  pages/
    HomePage.tsx                ✅ built — static settled-state hero (real content, real styling, NO blueprint-trace animation yet — that's Phase 6 layered on top of this same markup)
    AboutPage.tsx                ✅ built — founder narrative, timeline, credentials, team stat card, values, federal expertise
    ServicesPage.tsx             ✅ built — both service tracks, capabilities strip, closing CTA copy
    ProjectsPage.tsx             ✅ built — all 10 portfolio cards via PortfolioCard + projects.ts data
    TestimonialsPage.tsx         ✅ built — all 6 quotes, Google/Yelp/Birdeye review links, verified-excellence section
    ShopPage.tsx                  ✅ built — real Shopify Buy Button embed
    ContactPage.tsx               ✅ built — full contact details + form (no submit handler, matches original exactly — see below)
  lib/
    utils.ts                    ✅ built — `cn()` (shadcn's clsx+tailwind-merge helper) and `assetPath()` (see below)
  App.tsx                        ✅ built — all 7 routes wired to Layout
  main.tsx, index.css, vite-env.d.ts  ✅ built
public/
  assets/projects_flat/          ✅ copied by user (all ~300 real photos, flat, original filenames — except the 2 renamed this session, see "Bugs found and fixed")
  assets/logo/                    ✅ copied by user (nav-logo.png, the real JXR logo)
```

### Root config files (all hand-written, since `npm create vite`/`npx shadcn init` can't be run without Bash)

`package.json`, `vite.config.ts` (with the `@` → `./src` alias, matching
shadcn convention), `tsconfig.json` + `tsconfig.app.json` +
`tsconfig.node.json`, `tailwind.config.ts`, `postcss.config.js`,
`components.json` (shadcn CLI config — written by hand since the CLI
itself can't run; `cssVariables: false` as explained above), `index.html`
(the Vite entry point — has the Google Fonts `<link>`, a single generic
`<title>`; **per-page unique `<title>`/OG-meta tags from the original
site are not yet ported** — the original had unique meta per page, this
SPA currently does not; worth a `usePageMeta` hook or similar if SEO
parity matters, flagged here so it's not silently forgotten), `.gitignore`
(standard Vite ignores — `node_modules`, `dist`, etc.).

**Dependency versions**: all specified with caret ranges (`^x.y.z`) in
`package.json`, deliberately not pinned to exact versions, since Claude
cannot verify exact version compatibility without being able to run
`npm install` itself — letting npm's own resolver pick the latest
compatible version at install time was the safer choice than guessing a
specific patch version that might not exist or might have a bug.
**`npm install` completed successfully** in the last session with **166
packages installed** and **4 vulnerabilities reported (3 moderate, 1
high)** — these were **deliberately deferred**, not investigated. Almost
certainly in transitive dev-tooling dependencies (Vite/Tailwind's own
build chain), not runtime code shipped to users, but this was a judgment
call, not a verified fact — run `npm audit` before final handoff to
Lovable if it matters for that context.

## Real production data — do not treat any of this as placeholder/mock

Everything below is the **actual real business's real data**, copied
directly from the working original site, not invented:

- **Shopify Buy Button** (`ShopifyBuyButton.tsx`): domain
  `teke8v-wp.myshopify.com`, storefront access token
  `8e89c2f23e3445aaf5b314b051d38d53`, product ID `9339964981463`. Full
  styling options object ported verbatim (button colors, fonts, cart
  text, modal behavior) — this is a live, working integration against the
  real JXR Shopify store, confirmed rendering the real product (a branded
  cap) with working "Add to Cart" in this session's browser testing.
- **BBB seal**: real profile URL and real hosted seal image URL (both
  `bbb.org`/`.bbb.org` domains), used in the header (homepage only, ported
  in Phase 6 alongside the hero), footer, About page, and Contact page.
- **Google/Yelp/Birdeye review links**: real URLs pointing to the actual
  business's real review pages on each platform, in `siteConfig.ts`.
- **Contact info**: real address (9750 Birch Canyon Place, San Diego, CA
  92126), real phone (858-874-1925), real fax, real email
  (info@jxrconstructors.com), real license number (974679), real
  certifications (SDVOSB · DVBE · SB · SAM-Registered).
- **Contact form has no submit handler** — this matches the **original
  static site exactly**, which also has a plain `<form>` with a submit
  button and no `action`/JS wiring at all. This was a deliberate
  "pixel-for-pixel, don't invent new behavior" choice, not an oversight —
  if the user wants real form submission (e.g., wired to an email
  service), that's new scope beyond the port, not a bug to silently fix.

## Gallery data — important caveats, read before touching `data/projects.ts`

7 of the 10 portfolio projects (`orpa`, `t2wrr`, `r1fc`, `massu`,
`parking-lot`, `gate-canopy`, `4swbr`) have a `gallery: string[]` array of
real, filesystem-verified photo filenames. The other 3 (`rffvb`,
`rrmcas`, `locker-room`) deliberately have **no** `gallery` field — their
photo-catalog matches in the *original* project's
`content/photo-catalog.md` were flagged as **unconfirmed guesses**, not
verified against the real filesystem, so no gallery was built for them to
avoid misattributing a client's photos to the wrong project. **Do not add
galleries for these 3 without first verifying real filenames against an
actual `ls` of `assets/projects_flat/`** — the catalog document is known
to contain filenames that don't exist on disk (e.g. `_X5A2800.jpg` was
cited in the catalog but doesn't exist; the *real* nearby file is
`_X5A2799.jpg`, which is what's actually used).

**The 7 verified gallery arrays are correct as of last session**, having
been cross-referenced against a real `ls` of `assets/projects_flat/`
earlier in this overall project's history (in the *original* static-site
project, before this React port began) — that verification work does not
need to be redone, just trusted and carried forward, which is what
`projects.ts` already does.

### Risk flagged in an earlier session — resolved once Phase 5 was built

Several gallery-only filenames (never rendered as a visible card
thumbnail, so never tested in a browser until Phase 5 existed) contained
`#` characters: `"Mens #3 Photo 2 (1).jpg"`, `"Womens #3 Photo 2 (1).jpg"`,
`"Womens #3 Photo 5.JPG"`, `"Womens #3 Photo 10.jpg"` (all in the `t2wrr`
gallery array). **All 4 turned out to have the same hidden-Unicode-
character bug as Bugs 2–3** — see "Bug 4" above for the full diagnosis
and fix. Resolved; the current `t2wrr` gallery array in
`src/data/projects.ts` reflects the renamed, working filenames.

## Bugs found and fixed this session (full detail, including diagnostic process)

### Bug 1: Missing fluid heading type-scale

**Symptom**: user provided a side-by-side screenshot comparing this React
build's homepage against the live original site — headings and overall
hero text rendered dramatically smaller in the React version, closer to
body-text size, while the original had a large, three-line-wrapped hero
headline.

**Root cause**: the original stylesheet has:
```css
h1 { font-size: clamp(2.1rem, 4vw, 3.2rem); }
h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); }
h3 { font-size: 1.3rem; }
```
`src/index.css` in this port only set `font-family`/`font-weight`/`color`
on `h1`–`h4` — the actual font-size clamp values were never ported.
Tailwind's Preflight base reset normalizes heading font-sizes down
(effectively removing the browser's own default heading-size cascade),
so without explicit sizing, headings rendered at close to inherited body
size instead of their intended large scale.

**Fix applied**: added the exact same `clamp()` values to `h1`/`h2`/`h3`
in `src/index.css`, plus the also-missing global `p { color:
charcoal-soft }` and `a { color: jxr-blue }` base rules (also present in
the original stylesheet's global base styles, also missed in the initial
port). **Verified fixed** via a live screenshot of `http://localhost:5173`
after the fix — hero heading now renders at the correct large,
multi-line scale matching the original.

**Lesson for future porting work**: Tailwind's Preflight is more
aggressive about normalizing base HTML element styling than a plain
custom stylesheet is — when porting a hand-written CSS file's *global
base element* rules (not just component-specific classes), check for
every bare-element selector (`h1`, `h2`, `p`, `a`, etc.) in the original
`styles.css` and confirm each one has an equivalent in the new
`index.css`, rather than assuming Tailwind's defaults are "close enough."

### Bug 2: Two broken project images (hidden Unicode characters in filenames)

**Symptom**: on the Projects page, the first two portfolio cards (ORPA
and T2WRR) showed broken-image icons; all other cards' images loaded
correctly, including other filenames containing spaces and punctuation
(e.g. `VA.01-Bldg 2 Parking Lot-1262.jpg` loaded fine).

**Diagnostic process** (worth preserving — this is a reusable pattern):
1. Confirmed via the browser's Network tab (screenshot from user) that
   the two failing requests had **`Type: html`** and were only **~1.1 KB**
   — this is the specific, recognizable signature of Vite's dev server
   **SPA-fallback behavior**: when a requested static-asset path doesn't
   match a real file, Vite's dev middleware serves `index.html` itself
   (as a `200 text/html` response, not a `404`) so client-side routing can
   take over. **This is different from a normal 404** and easy to
   misdiagnose as "the image is just missing" — the actual response body
   is the SPA's own HTML document, not an error page.
2. Used Claude's own `Read` tool (which can view images) to directly open
   the suspect file at its exact expected path
   (`public/assets/projects_flat/Mens #3 Photo 1.jpg`, typed with a
   normal `#` and normal spaces) — **this succeeded**, proving the file
   genuinely exists at a path that *looks* identical to what the code
   expects.
3. This contradiction (file "exists" per `Read`, but Vite's dev server
   can't find it) is the exact signature of a **hidden/different Unicode
   character** in the real filename — e.g. a narrow no-break space
   (U+202F) instead of a regular space, or a similar look-alike character.
   macOS's filesystem (and macOS-native tools like `Read` or Finder) is
   Unicode-normalizing and will often match these visually-identical-but-
   byte-different strings successfully, while a strict Node.js/Vite HTTP
   server doing exact string matching against a percent-decoded URL will
   not.
4. **This is not a new discovery** — it's the same underlying bug class
   as a previously-fixed issue in the *original* static site: a Birdeye
   review-platform logo filename (`Screenshot 2026-08-03 at 2.21.25
   PM.png`) had a hidden `U+202F` character where a normal space appeared
   to be, confirmed via a `git status` error message that revealed the
   raw byte sequence (`\342\200\257`) when a `git add` with a manually
   typed path failed. See the original project's own `README.md` for that
   full incident. This session's bug was the same pattern recurring in
   different files.
5. Directly verified via Claude driving the live `http://localhost:5173`
   dev server through the Browser pane tools (`javascript_tool` running
   `fetch()` against the exact encoded URL): confirmed `status: 200`,
   `content-type: text/html`, body starting with `<!DOCTYPE html>` — i.e.
   definitively confirmed the SPA-fallback theory with a direct HTTP
   response inspection, not just inference from the Network tab
   screenshot. Also confirmed via `img.getAttribute('src')` that the
   rendered `<img>` tag's `src` attribute WAS correctly percent-encoded
   (`Mens%20%233%20Photo%201.jpg` — `#` correctly became `%23`, comma
   correctly became `%2C` elsewhere) — ruling out "the encoding function
   is broken" as the cause, since the encoding was objectively correct
   and other special-character filenames encoded the same way loaded
   fine.

**Fix applied** (pragmatic, not byte-archaeology): rather than try to
identify the exact mystery Unicode byte (not possible without a working
shell to run `ls -b`/`hexdump`, which Claude doesn't have), the two files
were **renamed to simple, safe names** — the same class of fix used for
the original Birdeye bug:
- `"Photo Jun 10, 11 54 34.jpg"` → `"orpa-operating-room.jpg"`
- `"Mens #3 Photo 1.jpg"` → `"t2wrr-mens-restroom.jpg"`

Renamed in **both** project folders (the original `prototype/assets/`
folder too, for consistency, so the source-of-truth folder and this
port's `public/assets/` stay in sync) via `mv` commands handed to the
user (Claude cannot run `mv`). Updated all 4 references in this React
project's code: `src/data/projects.ts` (both the `orpa` entry's `image`
field and its position inside the `gallery` array; both the `t2wrr`
entry's `image` field and its position as the first item in its `gallery`
array) and `src/pages/HomePage.tsx` (the `t2wrr` featured-project card's
`image` field — note `HomePage.tsx`'s ORPA card uses a **different,
already-fine** filename, `_X5A2799.jpg`, which was correctly left
untouched since there was no evidence it was broken and it contains no
unusual punctuation).

**Verified fixed**: after the rename + code update, re-checked via the
live dev server — both images now report real, non-zero
`img.naturalWidth` values (3264px and 8640px respectively) at the new
filenames, confirming the fix works end-to-end, not just in theory.

**What was NOT re-verified after this fix**: a full visual re-comparison
pass of the whole homepage/projects page against the original site was
**in progress but not completed** when the context window ran out — pick
this up first in a new session before moving on to Phase 4, just to
confirm nothing else regressed.

**Update from the following session**: this regression pass was
completed. All 7 pages were checked live via the Browser pane tools
(console errors + `naturalWidth` checks on every `<img>`) — Bugs 1 and 2
above both confirmed still fixed. One **new** bug was found in the same
process, documented as Bug 3 below.

### Bug 3: Broken Birdeye review-badge logo (same hidden-Unicode-character bug class as Bug 2)

**Symptom**: on the Testimonials page, the Birdeye logo next to "Read
Reviews on Birdeye" showed a broken-image icon. All other images on all
7 pages loaded correctly.

**Diagnostic process**: identical signature and method to Bug 2 —
confirmed via `fetch()` against the exact URL that the response was
`status: 200`, `content-type: text/html`, body starting with
`<!DOCTYPE html>` (Vite's SPA-fallback, not a real 404). Claude's `Read`
tool opened the file fine at the expected path
(`public/assets/projects_flat/Screenshot_2026-08-03-at-2.21.25 PM.png`),
same contradiction pattern as Bug 2 (file "exists" per Unicode-normalizing
tools, but a strict exact-byte-match HTTP server can't find it).

**Confirmation this was genuinely a hidden-character issue, not just a
guess**: when the user ran `mv` with the filename typed normally
(including a normal space before `PM.png`), the shell itself returned
`No such file or directory` — direct proof the "space" in the real
filename is not a normal space character. The fix that actually worked
was a glob pattern instead of an exact typed name:
```bash
cd ".../public/assets/projects_flat/" && for f in Screenshot_2026-08-03-at-2.21.25*PM.png; do mv "$f" birdeye-logo.png; done
```
The `*` glob matched the file regardless of what the hidden character
actually was, avoiding the need to identify the exact byte.

**Cross-project note**: the *original* static site's copy of this same
filename was checked (via a dedicated Explore agent) and does **not**
have this problem — it opens correctly there. So this was a corruption
introduced only in this React port's copy (likely during the original
`cp -r` of the ~300-file asset library), not a pre-existing issue in the
source-of-truth project. The original project's file was deliberately
**left untouched** — no cross-project rename needed this time, unlike
Bug 2.

**Fix applied**: renamed to `birdeye-logo.png` in this port's
`public/assets/projects_flat/` only. Updated the one reference in
`src/pages/TestimonialsPage.tsx` (`assetPath("birdeye-logo.png")`).

**Verified fixed**: live `naturalWidth: 224` confirmed via the running
dev server after the fix, zero broken images remaining across all 7
pages.

**Lesson reinforced**: when a `mv`/`cp`/`git add` with a manually-typed
path fails with "No such file or directory" despite the file visibly
existing (Finder, `Read`, `ls` with tab-completion), suspect a hidden
Unicode character before anything else, and reach for a glob pattern
(`prefix*suffix`) as the fix — it sidesteps ever needing to identify the
exact byte, which isn't possible in this environment without a working
shell for `hexdump`/`ls -b` anyway.

### Bug 4: 4 broken T2WRR gallery photos — the exact risk flagged in Phase 5 planning, confirmed real

**Symptom**: while building and verifying the Phase 5 photo gallery
modal, stepping through the T2WRR project's gallery hit 4 broken images
in a row (images 2–5 of 6) — `naturalWidth: 0` despite `img.complete`
being `true`.

**This is exactly the risk the README flagged before Phase 5 was built**
("Open risk flagged, not yet resolved," now resolved): the 4
`#`-containing gallery-only filenames (`"Mens #3 Photo 2 (1).jpg"`,
`"Womens #3 Photo 2 (1).jpg"`, `"Womens #3 Photo 5.JPG"`,
`"Womens #3 Photo 10.jpg"`) had never been rendered in a browser before
(gallery-only, no card thumbnail uses them), so they'd never been
tested. All 4 turned out to have the same hidden-Unicode-character bug
as Bugs 2 and 3 — confirmed via the same signature (`fetch()` returning
`200`/`text/html`/`<!DOCTYPE html>` instead of the real image) and the
same file-exists-per-`Read`-but-not-per-Vite contradiction.

**Fix applied**: same glob-based rename pattern as Bug 3, needed again
here since typing the literal filename (even without a `#`, e.g. for the
"Womens #3 Photo 5.JPG" case) still couldn't be trusted to match the
hidden character reliably:
```bash
cd ".../public/assets/projects_flat/" && for f in Mens*3*Photo*2*\(1\).jpg; do mv "$f" t2wrr-mens-2.jpg; done
cd ".../public/assets/projects_flat/" && for f in Womens*3*Photo*2*\(1\).jpg; do mv "$f" t2wrr-womens-2.jpg; done
cd ".../public/assets/projects_flat/" && for f in Womens*3*Photo*5.JPG; do mv "$f" t2wrr-womens-5.jpg; done
cd ".../public/assets/projects_flat/" && for f in Womens*3*Photo*10.jpg; do mv "$f" t2wrr-womens-10.jpg; done
```
Updated the `t2wrr` gallery array in `src/data/projects.ts` to the 4 new
filenames. Did **not** touch the original static site's copies of these
files — out of scope here, and not confirmed to have the same problem
there.

**Verified fixed**: all 6 T2WRR gallery images (including the other 2
that were never broken) stepped through live via the dialog's Next
button, each confirmed via real non-zero `naturalWidth`. The remaining
44 gallery filenames across the other 6 photo-enabled projects were also
swept via direct `fetch()` content-type checks — all load correctly, no
further hidden-character issues found anywhere in the gallery data.

## Deliberate deviation from the original: full-viewport-height hero

The user compared this port's homepage hero against the live original
side-by-side and noticed the original showed more of the truck photo on
a tall browser window. Investigation (a dedicated Explore-agent read of
the original's actual `styles.css`) found the original's hero has **no
`min-height`/`height`/viewport-unit sizing anywhere** — its height is
purely `.hero-content`'s padding (120px top / 100px bottom desktop,
90px/70px mobile) plus its text content, identical to how this port
already worked. The visual difference in that side-by-side was just the
two browser windows being different heights, not a CSS bug — the
padding values already matched exactly.

**User explicitly chose to deviate from the original here**: rather than
leave the hero content-height-driven (matching original behavior
exactly), the hero in `src/pages/HomePage.tsx` now uses
`min-h-[100svh]` (`svh` not `vh`, to avoid the mobile browser-chrome
overlap `100vh` is known for) with `flex flex-col justify-center` to
vertically center the content block, so the hero always fills the
visible viewport on tall screens and shows the complete truck photo
before scrolling. This is **new behavior with no equivalent in the
original** — flagged here so it isn't mistaken for a fidelity bug in a
future session. Verified working (no gap/seam issue scrolling from hero
into `ProofBar` below it) directly by the user in a real browser at a
tall window size.

## Open architectural decisions not yet made (flagged, not defaulted)

- ~~`RevealGroup`'s stagger-delay mechanism~~ and ~~`SectionLabel`'s
  tick-mark visibility signal~~ — **both resolved in Phase 4** by reading
  the original's actual source instead of guessing: it uses plain CSS
  `:nth-child()` stagger and plain CSS descendant selectors for the
  tick-mark/marker-bounce, no JS-computed delays and no Context. See the
  Phase 4 entry in "Build phases" above for the full detail.
- **Per-page `<title>`/OG-meta tags**: not yet handled at all (see
  "Root config files" above) — the SPA currently has one static `<title>`
  in `index.html`. A `usePageMeta` hook (or a small dependency like
  `react-helmet-async`, though a hand-rolled `useEffect` setting
  `document.title` + updating meta tags directly was leaning toward
  preferred, to avoid adding a dependency for something this small) would
  restore per-route parity with the original site's unique meta per page.
  Not blocking for Lovable handoff, but worth doing before this is
  considered a true 1:1 port.
- **Homepage hero h1 line breaks**: the original's h1 is plain text with
  no `<br>` tags (`<h1>Veteran-Owned. Precision-Built. Excellence
  Delivered.</h1>`), relying on natural wrapping. The user wanted a
  specific 3-line presentation (one sentence per line: "Veteran-Owned." /
  "Precision-Built." / "Excellence Delivered.") shown in a reference
  screenshot from their own browser, which doesn't reliably happen from
  natural wrapping alone since it depends on exact viewport width. Added
  explicit `<br />` tags between each sentence in `HomePage.tsx` so the
  break is deterministic regardless of window width — verified at a wide
  desktop width (where it previously wrapped as 2 uneven lines), the
  default preview width, and mobile (375px, where "Excellence" wraps
  naturally onto its own line before "Delivered." — reads fine, not
  awkward).

## Build phases — precise status

1. ✅ **Scaffold** — Vite/React/TS/Tailwind/shadcn config, shared data
   files, assets copied by user.
2. ✅ **Shared layout** — header (both modes), nav, footer, routing
   skeleton.
3. ✅ **All 7 pages, real content, zero animation** — built, then **three
   real bugs found via user testing and fixed** (see above). Final
   re-verification pass across all 7 pages **completed** in the following
   session — console errors and image-load status confirmed clean
   everywhere.
4. ✅ **Animation systems** — `useScrollReveal` (IntersectionObserver,
   `threshold: 0`, `rootMargin: '0px 0px -60px 0px'`, fires once) and
   `useCountUp` (ease-out cubic `1 - (1-t)^3`, 1200ms, reduced-motion
   hard-skip) built as hooks, both extracted verbatim from the original's
   inline `<script>` (confirmed identical across `index.html`/`about.html`
   via a dedicated Explore-agent read of the real source, not
   reconstructed from memory). `Reveal`/`RevealGroup`/`CountUp` wired to
   the hooks. **Both open architectural decisions from below were
   resolved by discovering the original doesn't use either floated
   option**: stagger delays are plain CSS `:nth-child()` rules (not
   JS-computed `transitionDelay`), and `SectionLabel`'s tick-mark /
   `Timeline`'s marker-bounce use plain CSS descendant selectors keyed off
   an ancestor class (no React Context needed at all). Ported the
   original's exact CSS stagger table (0.05s/0.15s/.../0.55s, capped at
   0.55s past the 6th child via `:nth-child(n+7)`) and reduced-motion
   escape hatch into `src/index.css`, using a `data-visible` attribute
   (set by the hooks) in place of the original's `.is-visible` class
   toggle. **Verified**: count-up, staggered card reveal, and tick-mark
   draw-in all confirmed working by the user in a real foregrounded
   browser (the Browser pane tools couldn't self-verify this — backgrounded
   tabs get `requestAnimationFrame` throttled by Chrome, so `document.hidden`
   was `true` and count-up appeared stuck at `$0M+` when driven headlessly;
   the easing math was confirmed correct in isolation via direct
   computation, and the real bug-free behavior was confirmed by the user
   watching the actual page). Also verified programmatically: the 10-card
   Projects grid correctly caps stagger delay at 0.55s for cards 7–10,
   and `Timeline`'s 4 markers on the About page carry the exact
   `cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot curve.
   `useStickyHeaderShrink`/`useHeroIntroReveal` were already fully built
   and functional from Phase 2, nothing needed there.
5. ✅ **Photo gallery modal** — `src/components/ui/dialog.tsx` hand-written
   from Radix's `Dialog` primitive (matching shadcn's usual output,
   `cssVariables: false` so concrete Tailwind tokens are used directly
   rather than shadcn's semantic color variables). `useGalleryNavigation`
   hook and `PhotoGalleryDialog.tsx` built after extracting the
   original's **exact** modal logic verbatim from `projects.html` (a
   dedicated Explore-agent read of the real source, not reconstructed
   from the earlier README summary) — the original uses a native
   `<dialog>` + `showModal()`, not a hand-rolled focus trap; ported onto
   Radix's `Dialog` instead, which provides equivalent native-quality
   focus-trap/Escape/backdrop-click semantics for free, while the
   keyboard-arrow nav, 40px swipe threshold, and adjacent-only
   `new Image()` preloading were hand-ported to match exactly (circular
   index wrapping via the same modulo arithmetic). `PortfolioCard`'s
   existing `onOpenGallery` prop wired to real `useState` in
   `ProjectsPage.tsx`.

   **Verified end-to-end** via the Browser pane tools: dialog opens with
   correct title/image/count, Next/Prev buttons work, `ArrowLeft`/
   `ArrowRight` keydown navigates, circular wrap-around confirmed (index
   0 → ArrowLeft → wraps to last image), synthetic `TouchEvent`s
   confirmed the 40px swipe threshold fires navigation above it and
   correctly no-ops below it, `Escape` closes the dialog and unmounts it,
   switching between two different projects' galleries resets state
   cleanly (no stale index carried over).

   **The 4 flagged `#`-containing gallery-only filenames were tested as
   planned, and all 4 were broken** — see Bug 4 below. Every other
   gallery filename across all 7 photo-enabled projects (44 files) was
   also swept via direct `fetch()` content-type checks and all load
   correctly.
6. ✅ **Blueprint-reveal hero animation** — `src/components/hero/HeroAnimated.tsx`
   built from the original's exact SVG trace path data (flag path, two
   ring circles, X-mark path — all copied verbatim, not reconstructed)
   and the `positionLogoTarget()`/`positionFlagTrace()` crop-math ported
   1:1 from the original's inline `<script>` (extracted via a dedicated
   Explore-agent read of the real source, including every hardcoded
   native photo/logo pixel constant). Uses `useLayoutEffect` (not
   `useEffect`) for the positioning math, matching the original's
   run-before-paint timing. `ProofBar`'s `hero-sync` variant (previously
   a documented no-op) is now real — background/content sync to
   `HeroAnimated`'s own 2.75s settle timer via the `proof-bar-settle`/
   `proof-bar-content-fade` Tailwind animations already in
   `tailwind.config.ts`. **Confirmed product decision carried
   forward from planning**: the animation replays every time the
   homepage route becomes active via client-side navigation, not just on
   a hard refresh — verified directly (navigated About → Home via the
   nav link, watched the full black-screen intro replay from scratch).

   **One real bug found and fixed during build**: the logo SVG
   (`viewBox="0 0 476 346"`, sized via `w-[min(85vw,85vh)] h-auto`)
   rendered at `0×0` in some measurement timings — SVG elements don't
   reliably auto-derive height from a viewBox aspect ratio the way
   `<img>` does with `height: auto`. Fixed by using Tailwind's
   `aspect-[476/346]` instead of `h-auto`, which sets an explicit
   aspect-ratio the browser can size from unconditionally. Also added a
   defensive zero-size guard (skip setting `--logo-tx/ty/scale` if either
   the hero or the logo SVG measures 0×0 at the time `positionLogoTarget`
   runs) plus a same-frame `requestAnimationFrame` re-measure as a
   self-correcting retry — belt-and-suspenders against any real-world
   case where layout genuinely isn't ready yet on the very first
   measurement, even though in practice this Vite SPA's client-only
   render means that's rare.

   **Verified fixed and working end-to-end**: computed `--logo-tx`,
   `--logo-ty`, `--logo-scale` confirmed as real finite numbers (not
   `NaN`/`Infinity`) via a fresh browser tab, and the full sequence
   (black screen → rings + X-mark draw-in → logo shrink-to-signage →
   flag trace → fade to settled state) confirmed correct end-to-end
   directly by the user in a real browser, including the logo landing
   in the correct spot on the building signage.
7. ⚠️ **Final regression pass** ✅ done, **GitHub push + Lovable connect**
   ❌ not yet done.

   **Regression pass results**: all 7 pages checked at all 4 of the
   original's real CSS breakpoints (600/900/980/1050px, 28 combinations
   total) — zero console errors, zero real horizontal overflow anywhere
   (the homepage hero's flag-trace SVG legitimately extends past viewport
   bounds by design at narrow/tall aspect ratios, since it's sized to the
   photo's full rendered width — confirmed this causes no actual
   scrollbar/`docScrollWidth` overflow, so it's not a bug). Delegated most
   of this sweep to a background agent to parallelize it; homepage and
   `/about` were checked directly first.

   `prefers-reduced-motion` **confirmed working on real hardware** — the
   user has Reduce Motion enabled in macOS Accessibility settings and
   confirmed the hero correctly skips straight to the settled state with
   no intro animation.

   Cross-page hash anchors (`/services#general-contracting`, etc.)
   **confirmed working** via real click-through in the user's own
   browser — after initially appearing broken in the Browser pane tools
   (added temporary `console.log` diagnostics to `Layout.tsx`'s
   `useScrollRestoration`, confirmed the effect fired with the correct
   `pathname`/`hash` but the `requestAnimationFrame` callback inside it
   silently never ran), traced this to the **same
   `requestAnimationFrame`-throttled-while-hidden tooling artifact**
   already documented in Phase 4's `useCountUp` diagnosis — the Browser
   pane backgrounds itself between tool calls, and Chrome suspends rAF
   entirely for backgrounded tabs. Not a real bug; confirmed working
   correctly by the user clicking the actual link in a real, foregrounded
   browser. Diagnostic logs removed afterward, `Layout.tsx` is back to
   its clean original form.

   **Not yet done**: user creates a new **empty** GitHub repo (no
   auto-generated README, so the first push doesn't need a merge), Claude
   provides exact `git init` / `git remote add` / `git push` commands
   (cannot run them), user connects the new repo in a new Lovable project
   via Project Settings → Git.

## Verification workflow (keep using this pattern)

1. Claude writes/edits code.
2. Claude hands the user exact commands
   (`cd .../jxr-redesign-react && npm run dev`, or just "hit refresh, it
   should hot-reload").
3. User runs them, reports back — screenshots, pasted terminal/console
   output, or plain descriptions of what they see.
4. **If the dev server is confirmed already running**, Claude can also
   drive it directly via the Browser pane tools
   (`mcp__Claude_Browser__preview_start` with `{url:
   "http://localhost:5173/whatever"}`, then `javascript_tool`/
   `read_page`/`computer` screenshot) — this worked reliably against a
   live `http://localhost` server in this session (unlike `file://` URLs,
   which have an unrelated snapshot-mode limitation documented in the
   *original* project's README) and was how Bug 2 above was definitively
   diagnosed (fetching the exact failing URL directly and inspecting the
   real HTTP response).
5. Claude diagnoses from real evidence — screenshots, Network tab
   contents, actual fetched response bodies — not assumption. Both bugs
   fixed this session were root-caused this way, not guessed.
