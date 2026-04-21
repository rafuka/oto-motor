# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint via next lint
```

## Architecture

**Oto Motor** is a Spanish-language premium automotive dealership showcase built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS.

### Data Layer

All vehicle inventory lives in `src/lib/vehicles.ts` as static TypeScript data. The `Vehicle` type includes basic listing info (name, price, year, km, fuel) and a `detail` object with hero badge, specs, amenities, and narrative images. There is no database — adding or updating inventory means editing this file directly.

### Routing

- `/` — Home page (`src/app/page.tsx` → `src/components/landing/HomeView.tsx`)
- `/vehiculo/[id]` — Vehicle detail (`src/app/vehiculo/[id]/page.tsx` → `src/components/vehicle/VehicleDetailView.tsx`)

Detail routes are statically generated via `generateStaticParams()` using vehicle IDs from `vehicles.ts`.

### Component Conventions

- **Server Components** by default (`HomeView`, `VehicleDetailView`)
- **Client Components** (`"use client"`) only for animation-heavy gallery components (`HeroBannerGallery`, `VehicleHeroGallery`) that use Framer Motion
- Framer Motion animations must respect `useReducedMotion()`

### Styling

- Tailwind utility-first with a custom Material Design 3 color palette (primary brand red: `#b90027` / `#e31837`)
- Custom CSS utilities in `src/app/globals.css`: `.kinetic-gradient`, `.signature-gradient`, `.glass-nav`, `.glass-effect`
- Fonts loaded via `next/font/google` with CSS variables: `--font-headline` (Plus Jakarta Sans), `--font-body` (Plus Jakarta Sans), `--font-label` (Inter)
- Material Symbols Icons from Google Fonts (loaded in root layout)

### Images

Remote images served from `lh3.googleusercontent.com` are allowed via `next.config.ts`. Use `next/image` for all images.
