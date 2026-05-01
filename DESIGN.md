---
name: Ngô Gia Hạo Portfolio
description: Personal portfolio for a fresher web developer, built on dark theme with cyan signal accent
colors:
  signal-cyan: "#00e5ff"
  signal-cyan-dim: "#00e5ff1a"
  signal-cyan-glow: "#00e5ff40"
  violet-accent: "#a855f7"
  violet-accent-dim: "#a855f71a"
  deep-void: "#09090b"
  surface-panel: "#131316"
  surface-hover: "#1c1c21"
  wire-border: "#27272a"
  near-white: "#fafafa"
  cool-silver: "#b8bcc7"
  muted-slate: "#7d8088"
  status-green: "#22c55e"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "0.375rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
  xl: "4rem"
  section: "clamp(4rem, 8vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.deep-void}"
    rounded: "{rounded.full}"
    padding: "0.625rem 1.375rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-cyan}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.near-white}"
    rounded: "{rounded.full}"
    padding: "0.625rem 1.375rem"
  button-outline-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.near-white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cool-silver}"
    rounded: "{rounded.full}"
    padding: "0.625rem 0.5rem"
  button-ghost-hover:
    textColor: "{colors.near-white}"
  badge:
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.cool-silver}"
    rounded: "{rounded.sm}"
    padding: "0.3rem 0.65rem"
  project-card:
    backgroundColor: "{colors.surface-panel}"
    rounded: "{rounded.lg}"
    padding: "0"
  project-card-hover:
    backgroundColor: "{colors.surface-hover}"
  contact-link:
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.cool-silver}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.25rem"
  contact-link-hover:
    textColor: "{colors.near-white}"
    backgroundColor: "{colors.signal-cyan-dim}"
---

# Design System: Ngô Gia Hạo Portfolio

## 1. Overview

**Creative North Star: "The Signal Room"**

A dim control room where one cyan signal cuts through the dark. Every element earns its brightness; nothing glows without purpose. The portfolio is a quiet, structured space where project work speaks through clean composition and precise spacing, not through decoration or spectacle.

The system rejects both template blandness and over-designed portfolios. No parallax hero sections, no gradient text, no glassmorphism cards, no bouncing animations. Equally, no flat white pages with Times New Roman that look abandoned. The Signal Room sits between those extremes: dark, focused, technically confident, with just enough visual craft to signal that the person behind it cares about details.

Every surface is tonal (dark layers on darker backgrounds). The single cyan accent operates like a status LED: it marks what matters (section labels, primary actions, interactive states) and stays off everything else. Violet appears sparingly as a secondary atmospheric wash, never as text or borders.

**Key Characteristics:**

- Dark tonal layering with no pure black or pure white
- Cyan accent used on less than 15% of any screen
- Monospaced labels and section markers for a technical register
- Geometric sans-serif headings (Space Grotesk) for structured clarity
- Humanist body text (Inter) for comfortable reading at paragraph length
- Flat surfaces with border containment; shadows appear only on hover as ambient glow

## 2. Colors: The Signal Palette

A restrained dark palette with one saturated signal accent. Cyan is the only color that demands attention; everything else recedes.

### Primary

- **Signal Cyan** (`#00e5ff`): The single accent. Used on section labels, primary buttons, nav logo, interactive hover states, and small indicator elements (dots, lines). Never used as a background fill on large surfaces. Its rarity is the point.
- **Signal Cyan Dim** (`#00e5ff1a`): 10% opacity wash of cyan. Used for chip backgrounds, hover tints, and subtle highlight areas. The faintest trace of the signal.
- **Signal Cyan Glow** (`#00e5ff40`): 25% opacity. Border glow on card hover states. Used only on interaction, never at rest.

### Secondary

- **Violet Accent** (`#a855f7`): Atmospheric only. Appears in the hero section as a faint radial gradient wash. Never used on text, buttons, or borders. If you can read text in this color, it's wrong.
- **Violet Accent Dim** (`#a855f71a`): 10% opacity. Part of the hero atmospheric gradient, not used elsewhere.

### Neutral

- **Deep Void** (`#09090b`): Page background. Not pure black; slightly warm-tinted toward zinc.
- **Surface Panel** (`#131316`): Card backgrounds, nav background (with transparency), terminal blocks. One step above the void.
- **Surface Hover** (`#1c1c21`): Interactive surface state. Cards on hover, terminal header background.
- **Wire Border** (`#27272a`): All borders, dividers, section separators. Subtle, consistent, structural.
- **Near White** (`#fafafa`): Primary text, headings. Not pure white; slightly warm.
- **Cool Silver** (`#b8bcc7`): Secondary text, descriptions, body paragraphs. Readable but recessive.
- **Muted Slate** (`#7d8088`): Tertiary text, group labels, timestamps. Background-level information.
- **Status Green** (`#22c55e`): Success/outcome indicators only.

### Named Rules

**The Signal Ratio Rule.** Signal Cyan occupies no more than 15% of any screen's visual area. It marks section labels, primary CTAs, and interactive states. If a screen looks "cyan", something is wrong.

**The Atmospheric-Only Rule.** Violet Accent exists only in radial gradient washes in the hero. It never appears as solid color on any element. If violet is readable, it's a violation.

## 3. Typography

**Display Font:** Space Grotesk (with system-ui fallback)
**Body Font:** Inter (with system-ui fallback)
**Label/Mono Font:** Space Grotesk as monospace

**Character:** Space Grotesk brings geometric precision with just enough quirk (the asymmetric 'a', the squared 'g') to feel human rather than robotic. Inter is the invisible workhorse; it reads well at 0.9375rem on dark backgrounds with 1.7 line-height, which is unusually generous for a portfolio but necessary for paragraph-dense Vietnamese text.

### Hierarchy

- **Display** (700, `clamp(2.25rem, 5vw, 3.5rem)`, 1.2): Hero name only. Tight letter-spacing (`-0.02em`) for density at scale.
- **Headline** (600, `clamp(1.5rem, 3vw, 2rem)`, 1.2): Section headings (Dự Án, Về Tôi, Liên Hệ). Letter-spacing `-0.01em`.
- **Title** (600, `1.25rem`, 1.3): Project card titles, detail page h3s. No letter-spacing adjustment.
- **Body** (400, `0.9375rem`, 1.7): Descriptions, paragraphs, card text. Max line length `72ch` on detail pages, `52ch` in the hero subtitle.
- **Label** (500, `0.7rem`, `0.12em` tracking, uppercase): Section markers, summary labels, terminal prompts. Always monospaced (Space Grotesk). Always uppercase. Always preceded by a 24px cyan line.

### Named Rules

**The Label Anatomy Rule.** Every label is: mono font, 0.7rem, weight 500, uppercase, 0.12em tracking, Signal Cyan color, with a 24px horizontal line before it. No exceptions. This consistent anatomy is the system's signature.

## 4. Elevation

Flat by default. The system uses tonal layering (Deep Void to Surface Panel to Surface Hover) to create depth instead of shadows. Shadows appear only on interaction as ambient glow, never at rest.

### Shadow Vocabulary

- **Card Hover Glow** (`0 0 32px #00e5ff1a`): Faint cyan ambient glow behind project cards on hover. Not a traditional box shadow; a color wash that reinforces the Signal Cyan accent.
- **Button Hover Glow** (`0 0 20px #00e5ff60`): Slightly stronger glow behind the primary CTA button on hover.
- **Lightbox Drop** (`0 30px 60px rgba(0, 0, 0, 0.8)`): Deep shadow behind lightbox images. The one place a traditional shadow is appropriate: floating content over an overlay.

### Named Rules

**The Flat-At-Rest Rule.** No surface casts a shadow at rest. Glow appears only as a hover response. If a card has a shadow without being hovered, it's wrong.

## 5. Components

### Buttons

Three variants, all pill-shaped (full radius). The pill shape is distinctive and consistent.

- **Primary:** Signal Cyan background, Deep Void text. Padding `0.625rem 1.375rem`. Font: Space Grotesk 0.875rem weight 600. Hover adds a cyan glow behind the button.
- **Outline:** Transparent background, Near White text, Wire Border stroke. Hover fills with Surface Hover and brightens the border to Muted Slate.
- **Ghost:** Transparent, no border, Cool Silver text with minimal inline padding. Hover brightens to Near White. Used for tertiary actions (GitHub link in hero).
- **Shape:** All buttons use `border-radius: 9999px` (full pill). No square or rounded-rectangle buttons exist in this system.
- **Hover / Focus:** Transitions use `150ms ease` (fast). Focus rings are not currently implemented; they should use a 2px Signal Cyan outline with 2px offset.

### Badges / Tech Tags

- **Style:** Surface Panel background, Wire Border stroke, `border-radius: 6px`. Mono font at 0.75rem, Cool Silver text.
- **Content:** 16px tech icon + name string. Always a single row of inline badges, wrapping naturally.

### Cards (Project Cards)

Two-column grid on desktop (55% media / 45% body). Single column on mobile.

- **Corner Style:** Large radius (16px).
- **Background:** Surface Panel at rest, Surface Hover on hover.
- **Border:** Wire Border at rest, Signal Cyan Glow on hover.
- **Shadow Strategy:** No shadow at rest. Faint cyan glow (`0 0 32px`) on hover only.
- **Internal Padding:** 2rem on the body side. Media side has no padding (image bleeds to edge).
- **Hover:** Background shifts, border glows cyan, media image scales to 1.02. All transitions use 250ms ease.

### Cards (Detail Page: Case Study, Challenge, Environment)

Smaller utility cards used on project detail pages.

- **Corner Style:** Medium radius (10px).
- **Background:** Surface Panel. No hover state on these cards.
- **Border:** Wire Border.
- **Internal Padding:** 1.5rem.

### Contact Links

- **Style:** Surface Panel background, Wire Border, medium radius (10px). Icon + text, 0.875rem.
- **Hover:** Text brightens to Near White, border shifts to Signal Cyan, background fills with Signal Cyan Dim.

### Navigation

- **Style:** Sticky top, blurred background (`backdrop-filter: blur(16px)` over 80% opacity Deep Void). Wire Border bottom.
- **Logo:** Space Grotesk, uppercase, 0.05em tracking, Signal Cyan.
- **Links:** 0.875rem, weight 500, Cool Silver. Hover brightens to Near White. No underlines.
- **Mobile (<=560px):** Nav links hidden except CTA. Only logo and GitHub button visible.

### Terminal Block (Signature Component)

A decorative terminal window showing Kubernetes commands.

- **Structure:** Header bar with three colored dots (red/yellow/green), body with monospaced text.
- **Header:** Surface Hover background, Wire Border bottom.
- **Body:** 0.8125rem mono, 1.8 line-height, Cool Silver text. Prompts (`$`) in Signal Cyan.
- **Corner Style:** Medium radius (10px) on the outer container. No radius on the inner body.

### Section Labels (Signature Component)

The most distinctive component in the system.

- **Anatomy:** 24px horizontal line (Signal Cyan) followed by gap (0.5rem) followed by uppercase text (mono, 0.7rem, 500 weight, 0.15em tracking, Signal Cyan).
- **Usage:** Before every section heading and content block.

## 6. Do's and Don'ts

### Do:

- **Do** use Signal Cyan exclusively for interactive elements, labels, and small indicators. Its rarity is what makes it effective.
- **Do** maintain the Label Anatomy exactly: mono, uppercase, 0.7rem, 0.12em tracking, preceded by a 24px cyan line.
- **Do** keep body text at Cool Silver (`#b8bcc7`) on dark backgrounds, never at Near White. Near White is for headings only.
- **Do** use pill-shaped buttons (`border-radius: 9999px`) for all button variants. No exceptions.
- **Do** use tonal layering (Void to Panel to Hover) instead of shadows for depth at rest.
- **Do** keep line height at 1.7 for body text. Vietnamese diacritics need the vertical breathing room.
- **Do** use `clamp()` for responsive typography. The system already does this well.
- **Do** respect the 72ch max line length on detail pages.

### Don't:

- **Don't** use template portfolio patterns: identical card grids with icon + heading + text repeated endlessly. Each project card has unique media content. (PRODUCT.md: "Khong muon trong nhu mot trong hang tram portfolio fresher giong het nhau.")
- **Don't** add gratuitous animations, parallax scrolling, gradient text, 3D transforms, or glassmorphism. The system uses only fade-up on scroll (0.55s ease) and subtle hover transitions. (PRODUCT.md: "Khong can 'wow' bang effect, can 'wow' bang su ro rang.")
- **Don't** use Violet Accent as a solid color on any element. It exists only as an atmospheric radial gradient in the hero.
- **Don't** use pure black (`#000`) or pure white (`#fff`). The system's darkest value is `#09090b` and lightest is `#fafafa`.
- **Don't** use border-left or border-right greater than 1px as a colored accent stripe. (Note: the `.yt-info` component currently violates this with `border-left: 3px solid var(--clr-primary)`. Flag for removal.)
- **Don't** use bounce or elastic easing. All transitions use `ease` (the CSS default) at 150ms or 250ms.
- **Don't** put shadows on surfaces at rest. Glow appears only on hover.
- **Don't** use "thanh thao", "hoan thien", "thanh cong" in copy. Use "da lam", "tung trien khai", "thuc hanh voi". (PRODUCT.md: "Tone an toan o level fresher.")
