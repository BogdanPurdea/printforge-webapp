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
- Dynamic routes: `/3d-models/[id]` for individual model pages, `/users/[id]` for user profiles, `/3d-models/categories/[categoryName]` for category pages
- Shared layout with NavHeader component across all pages
- Error boundaries and loading states for robust UX

### Data Layer
- **Models**: Centralized in `src/app/data/models.json` with 50+ 3D model records
- **Users**: User data in `src/app/data/users.json` for uploader information
- **Categories**: Category definitions in `src/app/data/categories.json`
- **Comments**: Comment system data in `src/app/data/comments.json` with nested replies support
- **Data Access**: `src/app/lib/models.ts` provides async functions `getModels()` and `getModelById()` with filtering, pagination, and search
- **Additional Libraries**: `src/app/lib/categories.ts`, `src/app/lib/users.ts`, `src/app/lib/likes.ts`, `src/app/lib/comments.ts` for respective data operations
- **Type Safety**: Strong TypeScript typing with dedicated type files in `src/app/types/` organized by domain
- **Future-Ready**: Data access functions are already async to prepare for database integration

### Component Architecture
- **Server Components**: Pages fetch data server-side using async functions
- **Client Components**: Interactive elements like LikeButton, ThemeSwitcher, SearchForm, Comment components
- **Domain Organization**: Components organized by domain in `src/app/components/` (layout/, models/, comments/, shared/, user/)
- **Shared Components**: Extensive component library including ModelsGrid, ModelCard, PaginationControls, NavCategories
- **UI Components**: Shadcn/ui components in `src/app/components/ui/` (Button, Input, Select, etc.)
- **Type Definitions**: Each component has corresponding TypeScript interfaces in `src/app/types/`
- **Error Handling**: ModelsGridErrorBoundary for graceful error handling
- **Loading States**: Skeleton components for better UX during data fetching

### Styling System
- **Tailwind CSS v4** for utility-first styling
- **Dark Mode**: next-themes integration with ThemeProvider and ThemeSwitcher
- **Google Fonts**: Albert Sans (primary) and Montserrat Alternates (accent)
- **Path Aliases**: `@/*` maps to `src/*` for clean imports
- **Icons**: Lucide React icons and React Icons (FontAwesome) for UI elements

### Key Features
- **Search & Filtering**: Search by name/description, filter by category, uploader
- **Pagination**: Paginated model listings with configurable page sizes
- **Like System**: Client-side like functionality with local storage persistence
- **User Profiles**: Individual user pages showing uploaded models
- **Category Browsing**: Dedicated category pages with filtering
- **Comment System**: Nested comment functionality with replies and threaded discussions
- **Model Upload**: Full model upload functionality with image handling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Key Data Flow
1. Server components call data functions from `lib/models.ts`, `lib/categories.ts`, etc.
2. Data functions read from JSON files (future: database)
3. Components receive typed objects as props
4. Client-side navigation via Next.js Link components
5. Interactive features use React hooks (useLikes for like functionality)

### TypeScript Configuration
- Strict mode enabled
- Path mapping configured for `@/*` imports
- Next.js plugin for type checking
- Comprehensive type definitions for all data structures

### API Routes
- **RESTful Structure**: `/api/models` for model management, `/api/comments` for comment operations
- **File Upload**: FormData handling for model uploads with image storage in `public/models/`
- **Data Persistence**: API routes write to JSON files (database-ready architecture)

When working with this codebase:
- Always use the data access functions in `lib/` rather than importing JSON directly
- Follow the established TypeScript patterns for props and component interfaces
- Use server components for data fetching unless client interactivity is required
- Maintain the responsive design patterns established in existing components
- Follow the shadcn/ui component patterns for new UI elements
- Components are organized by domain - place new components in the appropriate domain folder