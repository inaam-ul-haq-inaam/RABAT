# Rabat Banquet Hall — React + Vite frontend

A 1:1 migration of the static `index.html` / `css/style.css` / `js/main.js` site to React 18 + Vite.
The design, markup structure, stylesheet, assets and behaviour are unchanged — only the
implementation moved to components, routes and hooks.

The **original static site is untouched** in the repository root (`index.html`, `css/`, `js/`, `images/`)
and keeps working exactly as before.

## Run it

```bash
cd react-app
npm install        # only needed once
npm run dev        # dev server → http://127.0.0.1:5173/
npm run build      # production build → react-app/dist
npm run preview    # serve the production build → http://127.0.0.1:4173/
```

## What is where

| Path | Purpose |
| --- | --- |
| `public/css/style.css` | **Unmodified** copy of the approved stylesheet (byte-for-byte) |
| `public/images/**` | **Unmodified** copy of every image/favicon asset |
| `src/main.jsx` | Entry point: legacy-hash rewrite → `HashRouter` → providers → `App` |
| `src/App.jsx` | Routes, scroll manager, scroll-reveal hooks |
| `src/lib/navigation.js` | Old `pageMap`/`sectionPage` hash contract → routes, scroll helpers |
| `src/hooks/` | `useReveal` (`.reveal`), `useScrollFx` (`.scrollfade` / `.photo-band`) |
| `src/components/` | One component per original section + `Navbar`, `Footer`, `Lightbox`, `Section` |
| `src/pages/` | One page per original tab |
| `src/data/` | The repeated cards/slides extracted verbatim (gallery, decors, catering, hall plan, testimonials) |
| `src/context/` | `LightboxProvider`, `ThemeProvider` (ports of the lightbox and the theme → reserve hand-off) |

## Routing

The original "PAGE SWITCHER" tabs are now routes (hash-based, so any static host works):

| Old hash tab | Route |
| --- | --- |
| `#hero` | `/` |
| `#hallplan` | `/hallplan` |
| `#decors` | `/decors` |
| `#catering` | `/catering` |
| `#gallery` | `/gallery` |
| `#reserve` | `/reserve` |

Legacy links keep working: `#hallmarks`, `#features`, `#testimonials`, `#hallplan-capacity`,
`#hallplan-stage` are rewritten on boot and scrolled to, and any unknown hash falls back to `/`.

## Deliberate, documented differences

1. **Lightbox scope.** The original collected *all* `.decor-card, .gcard` in the document, so the
   gallery lightbox also cycled through the (hidden) Hall Plan blueprint image. Each route now
   lights up its own cards: gallery = 15 cards, hall plan = the blueprint.
2. **First testimonial slide.** In the original no slide carried `.active` on load, so the carousel
   was blank until the first 3s autoplay tick. Here the first slide is active immediately, matching
   the initial active dot; autoplay, arrows, dots, keyboard and hover-pause are otherwise identical.
3. **Reserve validation feedback.** The original wrote the "please add your …" message into `#formMsg`,
   which never existed in the markup, so an invalid submit only focused the empty field. Same here.
4. **Dead code not ported:** `[data-count]` counters, `.acc-item` accordion and the `#navToggle`
   mobile menu button are not present in the markup, so those handlers had nothing to act on.
5. **Encoding artefact preserved:** the `#decors` intro paragraph contains two double-encoded
   mojibake runs (`ï¿½`) in the source file; they are reproduced byte-for-byte, not "fixed".
