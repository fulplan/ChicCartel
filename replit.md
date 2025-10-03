# Fashion E-Commerce Platform

## Overview

This is a modern fashion e-commerce platform built with a full-stack TypeScript architecture. The application features a sophisticated, magazine-inspired design inspired by premium fashion retailers like Zara and ASOS. It emphasizes visual storytelling, immersive product presentation, and seamless user experience with support for both light and dark themes.

The platform is designed to showcase fashion products through large imagery, editorial-quality layouts, and intuitive browsing capabilities. It includes features like product carousels, filtering systems, shopping cart functionality, and responsive design across all devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot-module replacement
- Wouter for lightweight client-side routing (HomePage, ShopPage, NotFound)
- Single Page Application (SPA) architecture with client-side navigation

**UI Component System**
- Radix UI primitives for accessible, unstyled component foundations (dialogs, dropdowns, tooltips, etc.)
- shadcn/ui component library with the "new-york" style variant
- Custom fashion-focused components (ProductCard, Hero, CartDrawer, FilterSidebar, etc.)
- Tailwind CSS for utility-first styling with custom design tokens

**Design System**
- Typography: Cormorant Garamond (serif headings), Inter (body text), Bebas Neue (accents)
- Color palette: Neutral-based with terracotta accents, optimized for both light and dark modes
- Sophisticated minimalist aesthetic with flat design and premium feel
- Custom CSS variables for theme consistency and dynamic theming

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and caching
- Local component state with React hooks for UI interactions
- No global state management library - component-level state kept simple

**Key Features & Interactions**
- Scroll-based animations using Intersection Observer API (useScrollAnimation hook)
- Embla Carousel for product and hero image carousels with autoplay
- Shopping cart with drawer interface, quantity management, and checkout flow
- Product filtering system with category, price range, size, and color filters
- Theme toggle between light and dark modes with localStorage persistence
- Responsive design with mobile-first approach and hamburger navigation

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and REST API routing
- TypeScript throughout for type safety across the stack
- Session-based architecture preparation (connect-pg-simple for session storage)

**API Design**
- RESTful API structure with `/api` prefix for all endpoints
- Middleware for JSON parsing, URL encoding, and request logging
- Centralized error handling middleware
- Request/response logging with duration tracking for API calls

**Development Environment**
- Vite middleware mode integration for seamless development experience
- Hot Module Replacement (HMR) during development
- Separate production and development build processes
- Custom error overlay and dev banner for Replit environment

### Data Storage Solutions

**Database Layer**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (via Neon serverless)
- Schema-first approach with drizzle-zod for validation
- Migration system using drizzle-kit

**Current Schema**
- Users table with id (UUID), username (unique), and password fields
- Prepared for session storage integration with connect-pg-simple

**Storage Interface Pattern**
- Abstract IStorage interface defining CRUD operations
- MemStorage implementation for in-memory development/testing
- Design allows easy swap to database-backed storage implementation
- User management methods: getUser, getUserByUsername, createUser

### Authentication and Authorization

**Planned Architecture** (prepared but not fully implemented)
- Session-based authentication using express-session
- PostgreSQL session store via connect-pg-simple
- Cookie-based session management with credentials included in fetch requests
- User schema prepared with username/password fields

**Security Considerations**
- Password hashing preparation (schema ready)
- Session persistence across server restarts
- Unauthorized behavior handling in query client (returnNull or throw)

## External Dependencies

### UI & Styling Libraries
- **Radix UI**: Complete suite of accessible, unstyled UI primitives (~25 components)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional className utilities

### Data & State Management
- **TanStack Query v5**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation library integrated with Drizzle

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for PostgreSQL with type-safe queries
- **@neondatabase/serverless**: Neon's serverless PostgreSQL driver
- **drizzle-zod**: Drizzle schema to Zod validator conversion

### Routing & Navigation
- **Wouter**: Lightweight client-side routing (~1.2KB)

### Carousels & Animations
- **Embla Carousel**: Carousel library with React bindings and autoplay plugin
- **date-fns**: Date utility library for formatting

### Development Tools
- **Vite**: Build tool and development server with React plugin
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: JavaScript bundler for production builds
- **tsx**: TypeScript execution for Node.js development

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Fonts
- **Google Fonts**: Cormorant Garamond, Inter, and Bebas Neue loaded via CDN

### Session Management (Prepared)
- **express-session**: Session middleware for Express
- **connect-pg-simple**: PostgreSQL session store