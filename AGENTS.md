# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Features project showcases with detailed pages, animations via Framer Motion, and Vietnamese content. Uses pnpm for package management.

## Development Commands

```bash
# Development
pnpm dev              # Start dev server at http://localhost:3000

# Build & Production
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier

# Git Hooks
pnpm prepare          # Install Husky hooks (runs automatically after install)
```

Pre-commit hook runs `lint-staged` automatically, which lints and formats staged files before commit.

## Architecture

### App Structure (Next.js App Router)

- `app/page.tsx` — Home page with hero, projects list, about, and contact sections
- `app/projects/[slug]/page.tsx` — Dynamic project detail pages
- `app/layout.tsx` — Root layout with fonts (Space Grotesk, Inter) and metadata
- `app/globals.css` — Global styles with CSS custom properties and Tailwind

### Data Layer

- `lib/projects/data.ts` — Project data source (PROJECTS array)
- `lib/projects/types.ts` — TypeScript types for Project, Feature, TechStack, etc.
- `lib/projects/icons.tsx` — Feature icon components (FEATURE_ICONS map)
- `lib/projects/stack-icons.ts` — Tech stack icon mappings (STACK_ICONS map)
- `lib/projects/youtube.ts` — YouTube URL parser utility

Project data structure:

- Core fields: slug, title, desc, image, github, demo
- Display fields: displayNumber, displaySubtitle
- Detail fields: subtitle, vision, terminalLines, features, techStack, screenshots, videos, environment

### Components

- `components/ui/icons.tsx` — Reusable icon components (IconGithub, IconExternal, IconEmail, Badge)

### Key Patterns

**Project Detail Page Features:**

- Lazy-loaded YouTube embeds via IntersectionObserver
- Image lightbox with keyboard navigation (Arrow keys, Escape) and zoom
- Framer Motion animations for fade-in effects
- Environment info section for infrastructure details (PaaS projects)

**Styling Approach:**

- Tailwind CSS 4 with PostCSS
- CSS custom properties in globals.css for theming (--clr-_, --font-_, --r-\*)
- Utility-first with semantic class names for complex components

**Path Aliases:**

- `@/*` maps to project root (configured in tsconfig.json)

## Tech Stack

- **Framework:** Next.js 16.2.4 (App Router, React 19)
- **Styling:** Tailwind CSS 4, PostCSS
- **Animation:** Framer Motion 12
- **Fonts:** Space Grotesk, Inter (Google Fonts)
- **Linting:** ESLint 9 with Next.js config + Prettier integration
- **Git Hooks:** Husky + lint-staged
- **Package Manager:** pnpm (uses pnpm-workspace.yaml)

## Adding New Projects

1. Add project data to `PROJECTS` array in `lib/projects/data.ts`
2. Add project images to `public/image/{project-slug}/`
3. If using new tech stack icons, add to `STACK_ICONS` in `lib/projects/stack-icons.ts`
4. If using new feature icons, add to `FEATURE_ICONS` in `lib/projects/icons.tsx` and update `IconKey` type

## Notes

- Content is in Vietnamese
- Uses strict TypeScript mode
- ESLint configured with Next.js core-web-vitals and Prettier
- Image optimization via Next.js Image component with responsive sizes
- Dynamic routes use `use(params)` pattern (React 19 async params)
