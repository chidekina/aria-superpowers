---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

---

## Industry-Aware Palette Reasoning

When the project type is known, anchor the aesthetic direction to industry trust signals before adding creative flair:

| Industry | Trust Anchors | Palette Direction | Avoid |
|----------|--------------|-------------------|-------|
| **Fintech / Banking** | Authority, safety, precision | Deep navy + gold or teal accents, conservative spacing, data density | Playful fonts, neon, low contrast |
| **Healthcare / Medical** | Calm, clarity, sterility | Cool whites, soft blues/greens, high contrast text, generous whitespace | Dark modes, aggressive CTAs, animation-heavy |
| **SaaS / Productivity** | Efficiency, power, trust | Bold primary CTAs, metric density, neutral base + accent pops | Decorative clutter, slow animations |
| **E-commerce / Retail** | Desire, speed, conversion | High-saturation product photography support, clear CTAs, urgency cues | Muted palettes that bury products |
| **Creative / Portfolio** | Voice, originality, craft | Full creative latitude — push hard on unexpected aesthetics | Safe choices, generic layouts |
| **Enterprise / B2B** | Credibility, stability | Conservative type scale, structured grids, muted brand palette | Trendy effects, playful copy |
| **Gaming / Entertainment** | Energy, immersion | Dark base + vivid neons, dynamic motion, layered depth | Flat/minimal, low contrast |
| **Healthcare Tech** | Clinical precision + modern UX | Clean whites + one strong accent, data visualization focus | Overwhelming gradients |

**Rule:** Industry trust signals come first. Creative differentiation lives within those constraints — not against them.

---

## Pre-Delivery Checklist

Run mentally before finalizing any UI. These are the most common issues that undermine professional quality:

### Accessibility (CRITICAL — block if failing)
- [ ] Text contrast ≥ 4.5:1 on all body text (WCAG AA)
- [ ] Large text / headings ≥ 3:1 contrast ratio
- [ ] Touch targets ≥ 44×44px on all interactive elements
- [ ] Focus states visible on all keyboard-navigable elements
- [ ] No color as the only differentiator (use shape/label too)

### Interaction Quality
- [ ] Every clickable element has `cursor-pointer`
- [ ] Hover states present on all interactive elements
- [ ] Disabled states visually distinct (not just `opacity: 0.5`)
- [ ] Loading states handled (no empty/broken states)

### Typography & Color
- [ ] `gray-400` (`#9ca3af`) is **too light** for body text in light mode — use `gray-700` minimum
- [ ] No emoji used as icons — use SVG icons (Lucide, Heroicons, etc.)
- [ ] Font sizes: body ≥ 14px, labels ≥ 12px, never smaller
- [ ] Line height: body text 1.5–1.75, headings 1.1–1.3

### Layout & Responsiveness
- [ ] Mobile breakpoint tested (375px minimum)
- [ ] No horizontal scroll on mobile
- [ ] Images have `alt` text
- [ ] Long text has `max-width` constraint (60–75ch for readability)

### Dark Mode (if applicable)
- [ ] Recheck all contrast ratios in dark mode — light mode passing ≠ dark mode passing
- [ ] Borders visible without relying on shadows
- [ ] Input fields distinguishable from page background

### The 3 Most Common Pro Oversights
1. **Emoji as icons** — `🔔` looks amateur; use `<Bell />` from Lucide
2. **Missing `cursor-pointer`** — interactive elements without it feel broken
3. **`gray-400` in light mode** — `#9ca3af` fails WCAG on white; minimum is `gray-600` (`#4b5563`)
