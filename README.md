# Elyse Residence

An Awwwards-tier, editorial luxury real-estate marketing site for a fictional
high-end residential development — *Elyse Residence*. Moody, minimal, immersive,
with slow, confident scroll-driven motion.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — custom luxe design tokens
- **Framer Motion** — all scroll / reveal / parallax motion
- **next/image** + **next/font** (Fraunces serif, Inter sans)

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `charcoal` | `#16181a` | Base background |
| `cream` | `#f5f1ea` | Primary text / light sections |
| `gold` | `#c9a876` | Single accent, used sparingly |
| Serif | **Fraunces** | Headlines (`6xl`–`8xl`) |
| Sans | **Inter** | Body / UI |

Easing is a uniform `cubic-bezier(0.16, 1, 0.3, 1)` ("luxe") — nothing bouncy.
Section padding scales with `clamp(5rem, 12vw, 11rem)`. `prefers-reduced-motion`
is fully respected (preloader, parallax, count-ups all degrade gracefully).

## Sections

1. **Preloader** — numeric count-up + curtain reveal on first load
2. **Custom cursor** — trailing gold ring that grows on interactive elements
3. **Navbar** — transparent over hero, blurs on scroll, fullscreen mobile menu
4. **Hero** — full-bleed parallax image, masked split-reveal headline, scroll cue
5. **Intro statement** — scroll-linked word-by-word philosophy reveal
6. **Residences** — three alternating image/text showcases with parallax frames
7. **Amenities** — animated count-up stat grid + amenities list
8. **Gallery** — desktop horizontal scroll-driven track / mobile grid, keyboard
   lightbox
9. **Book a Visit** — contrasting cream CTA with an elegant form + confirmation
10. **Footer** — oversized wordmark, nav, contact, social

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Notes

- Imagery is hotlinked from Unsplash via `next/image` (`remotePatterns` is
  configured in `next.config.js`). Swap the IDs in `lib/images.ts` for your own
  assets.
- The booking form is front-end only (no backend) and shows a confirmation
  state on submit.
