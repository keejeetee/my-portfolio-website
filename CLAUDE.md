# MyPortfolio

A personal portfolio website. The project directory is currently empty — stack has not been chosen yet. When adding the first code, default to **Next.js + React Server Components + Tailwind CSS** unless the owner specifies otherwise.

Two skills shape how this project should be built:
- `.claude/skills/taste-skill/SKILL.md` — `design-taste-frontend` (engineering rules, anti-slop constraints)
- `frontend-design` (plugin skill) — aesthetic direction, bold point-of-view

**Invoke both before generating any page or component.** The taste-skill defines the hard rails; frontend-design defines the flavor. They compose: taste-skill tells you what *not* to do; frontend-design tells you what to *commit to*.

---

## Active Baseline (from taste-skill)

- `DESIGN_VARIANCE: 8` — asymmetric layouts, fractional grids, offset compositions
- `MOTION_INTENSITY: 6` — fluid CSS + Framer Motion spring physics, no linear easing
- `VISUAL_DENSITY: 4` — daily-app spacing, breathing room, not cockpit-packed

These are globals. Adapt them when the owner asks ("make it calmer", "more packed", etc.), but don't edit the skill file.

## Aesthetic Direction for This Portfolio

A portfolio is editorial, personal, and memorable. Pick a **single bold direction** per design pass and execute it with precision. Valid directions for this project:
- Brutally minimal / editorial magazine
- Luxury / refined with deep neutrals
- Retro-futuristic / industrial-utilitarian
- Organic / natural with grain + warmth

Avoid generic SaaS dashboard aesthetics. This is not a product site — it's a statement.

## Non-Negotiables

These apply to **every** file generated in this repo.

### Typography
- **Banned:** Inter, Roboto, Arial, system defaults
- **Use:** Geist, Outfit, Cabinet Grotesk, Satoshi (pair a distinctive display font with a refined body font)
- Display: `text-4xl md:text-6xl tracking-tighter leading-none`
- Body: `text-base text-gray-600 leading-relaxed max-w-[65ch]`
- Serifs allowed only for editorial/creative vibes — never on software-UI sections
- No oversized H1s screaming for attention; control hierarchy with weight and color

### Color
- Max 1 accent color, saturation < 80%
- **Banned:** "AI purple/blue" glows, neon gradients, `#000000` pure black (use Zinc-950 or charcoal)
- Neutral base (Zinc or Slate) + one singular accent (Emerald, Electric Blue, Deep Rose, etc.)
- Stay on one palette — do not mix warm and cool grays

### Layout
- Centered hero is banned at `DESIGN_VARIANCE: 8`. Use split-screen, left-aligned content/right-aligned asset, or asymmetric whitespace instead
- Full-height sections: `min-h-[100dvh]`, **never** `h-screen` (iOS Safari layout jump)
- Multi-column structures: CSS Grid only. **No** flex `w-[calc(33%-1rem)]` math
- Page container: `max-w-[1400px] mx-auto` or `max-w-7xl`
- The generic "3 equal cards horizontally" feature row is banned — use zig-zag, bento, or asymmetric grid
- Mobile override: at `< 768px` any asymmetric layout collapses to `w-full px-4 py-8` single column

### Motion (at intensity 6)
- Spring physics only: `type: "spring", stiffness: 100, damping: 20` — no linear easing
- Animate **only** `transform` and `opacity`. Never `top`, `left`, `width`, `height`
- Magnetic hover / continuous animations use Framer Motion's `useMotionValue` + `useTransform` — **never** `useState` (performance collapse on mobile)
- Perpetual micro-interactions (pulse, float, shimmer, typewriter) in isolated memoized client components
- Staggered reveals on load (`staggerChildren` or CSS `animation-delay` cascade)
- No `window.addEventListener('scroll')` — use Framer Motion scroll hooks or IntersectionObserver

### Architecture
- **Dependency verification:** before importing any third-party library, check `package.json`. If missing, output the install command first. Never assume a lib exists
- Interactive components get `'use client'` at the top and are extracted as leaf components. Server components render static layout only
- Tailwind version lock: check `package.json` before using v3 vs v4 syntax
- Icons: `@phosphor-icons/react` or `@radix-ui/react-icons` only, with a single standardized `strokeWidth` (1.5 or 2.0)
- **Emojis banned** in code, markup, text, alt text. Use SVG or icon components

### Content
- No placeholder names like "John Doe", "Sarah Chan", "Jane Doe"
- No filler copy: "Elevate", "Seamless", "Unleash", "Next-Gen" are banned
- No fake-round numbers (`99.99%`, `50%`) — use organic values (`47.2%`)
- No generic avatars / Lucide user icons as placeholders
- Placeholder images: `https://picsum.photos/seed/{random_string}/800/600`, not Unsplash

### Interaction States
Every interactive surface must implement the full cycle:
- Skeletal loaders matching final layout (no generic spinners)
- Composed empty states with guidance
- Inline error reporting
- Tactile `:active` feedback (`-translate-y-[1px]` or `scale-[0.98]`)

### Performance
- Grain/noise filters: only on `fixed inset-0 pointer-events-none` pseudo-elements. Never on scrolling containers
- Perpetual animations: memoize (`React.memo`) and isolate in microscopic client components so the parent never re-renders
- z-index used systemically (sticky nav, modal, overlay) — never spam `z-50` or `z-10`
- `useEffect` with animations must include cleanup functions

## Pre-Flight Checklist

Before finalizing any component or page, confirm:
- [ ] Aesthetic direction is singular and executed with precision (not a mashup)
- [ ] Typography uses Geist / Outfit / Cabinet Grotesk / Satoshi — never Inter
- [ ] Mobile layout collapses cleanly (`w-full`, `px-4`, `max-w-7xl mx-auto`)
- [ ] Full-height sections use `min-h-[100dvh]`, not `h-screen`
- [ ] Perpetual motion is isolated and memoized
- [ ] Empty, loading, and error states exist
- [ ] Cards are used only when elevation communicates hierarchy — otherwise rely on spacing, `border-t`, `divide-y`
- [ ] No banned AI tells: neon glows, pure `#000`, purple/blue gradients, generic 3-card rows, Inter font, placeholder "John Doe"s
- [ ] `package.json` checked before any third-party import

## Working With This Repo

- Before generating UI, re-read the taste-skill SKILL.md (it has the full rule set; this CLAUDE.md is a summary)
- For any new page/section, invoke `/frontend-design` to commit to an aesthetic direction before coding
- Keep everything in one cohesive palette and motion system across the whole portfolio — don't treat each page as a fresh start
