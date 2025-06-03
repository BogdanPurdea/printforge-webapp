# PrintForge

A modern Next.js 15 application showcasing 3D printable models.

## Features

- **3D Model Gallery**: Browse through 3D printable models
- **Model Details**: Detailed pages for each model with specifications and download links
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Server-Side Rendering**: Fast loading with Next.js App Router
- **Type Safety**: Full TypeScript implementation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Albert Sans (primary), Montserrat Alternates (accent)
- **Icons**: React Icons (FontAwesome)
- **Build Tool**: Turbopack for development

## Data Source

Currently uses sample data loaded from a JSON file (`src/app/data/models.json`) containing placeholder 3D model information. The data access layer is designed to be database-ready for future integration.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build production application  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Project Structure

```
src/
├── app/
│   ├── 3d-models/          # Model listing and detail pages
│   ├── components/         # Shared components (Header, ModelCard, Pill)
│   ├── data/              # Sample data (models.json)
│   ├── lib/               # Data access functions
│   └── types/             # TypeScript type definitions
```

## Architecture

- **Data Layer**: Centralized sample data with async access functions ready for database integration
- **Component Architecture**: Server components for data fetching, shared UI components
- **Type Safety**: Strong TypeScript typing throughout
- **App Router**: Uses Next.js 15 App Router with dynamic routes

