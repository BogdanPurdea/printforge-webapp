# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (Next.js 15)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Project Architecture

**PrintForge** is a Next.js 15 application showcasing 3D printable models with the following key architectural patterns:

### App Router Structure
- Uses Next.js App Router with TypeScript
- Server components by default for data fetching
- Dynamic routes: `/3d-models/[id]` for individual model pages
- Shared layout with Header component across all pages

### Data Layer
- **Models**: Centralized in `src/app/data/models.json` with 50+ 3D model records
- **Data Access**: `src/app/lib/models.ts` provides async functions `getAllModels()` and `getModelById()`
- **Type Safety**: Strong TypeScript typing with `Model` type definition
- **Future-Ready**: Data access functions are already async to prepare for database integration

### Component Architecture
- **Server Components**: Pages fetch data server-side using async functions
- **Shared Components**: `Header`, `ModelCard`, `Pill` in `src/app/components/`
- **Type Definitions**: Each component has corresponding TypeScript interfaces
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Styling System
- **Tailwind CSS v4** for utility-first styling
- **Google Fonts**: Albert Sans (primary) and Montserrat Alternates (accent)
- **Path Aliases**: `@/*` maps to `src/*` for clean imports
- **React Icons**: FontAwesome icons via react-icons/fa6

### Key Data Flow
1. Server components call data functions from `lib/models.ts`
2. Data functions read from `models.json` (future: database)
3. Components receive typed Model objects as props
4. Client-side navigation via Next.js Link components

### TypeScript Configuration
- Strict mode enabled
- Path mapping configured for `@/*` imports
- Next.js plugin for type checking

When working with this codebase:
- Always use the data access functions in `lib/models.ts` rather than importing JSON directly
- Follow the established TypeScript patterns for props and component interfaces
- Use server components for data fetching unless client interactivity is required
- Maintain the responsive design patterns established in existing components