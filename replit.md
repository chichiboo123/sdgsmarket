# SDGs Market Educational Platform

## Overview

This is an educational web application simulating an e-commerce platform for purchasing SDGs (Sustainable Development Goals). The application is designed as a learning tool to teach students about the UN's 17 Sustainable Development Goals through an interactive shopping experience. Users can "purchase" SDGs, create action plans, and generate receipt PDFs - all for educational purposes without actual transactions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for cart state persistence
- **UI Components**: Radix UI primitives with custom styling
- **Fonts**: Korean fonts (Noto Sans KR, Do Hyeon) for localized content

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution
- **Production Build**: esbuild for server bundling

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Two main tables:
  - `students`: Student information (name, school, grade, class)
  - `action_plans`: Student action plans with SDG goals, plan methods, and content
- **Storage**: Currently using in-memory storage (MemStorage) with PostgreSQL configuration ready

## Key Components

### Client-Side Features
1. **SDG Goal Selection**: Interactive cards displaying all 17 UN SDGs
2. **Shopping Cart**: Persistent cart using Zustand with local storage
3. **Action Plan Creation**: Multiple input methods (text, drawing, image upload)
4. **Receipt Generation**: PDF generation with html2canvas
5. **Educational Content**: Carousel banners and SDG information pages

### Server-Side Features
1. **REST API**: Student and action plan CRUD operations
2. **PDF Generation**: Server-side PDF receipt creation using PDFKit
3. **Static File Serving**: Vite integration for development, static serving for production
4. **Request Logging**: Comprehensive API request logging middleware

### UI/UX Components
- Responsive design with mobile-first approach
- Korean language support throughout the interface
- Interactive drawing canvas for action plans
- Modal-based workflows for checkout and receipts
- Toast notifications for user feedback

## Data Flow

1. **Goal Selection**: Users browse and select SDGs from the homepage grid
2. **Cart Management**: Selected goals are stored in Zustand state with localStorage persistence
3. **Checkout Process**: Multi-step form collecting student information and action plans
4. **Data Submission**: Form data is validated and sent to the Express API
5. **Storage**: Student and action plan data is stored (currently in-memory)
6. **Receipt Generation**: PDF receipt is generated and downloadable

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- UI libraries (Radix UI, Tailwind CSS, shadcn/ui)
- State management (Zustand, TanStack Query)
- Utilities (date-fns, clsx, html2canvas)

### Backend Dependencies
- Express.js server framework
- Database ORM (Drizzle with Neon serverless)
- PDF generation (PDFKit)
- Development tools (tsx, esbuild)

### Build Tools
- Vite for frontend bundling
- TypeScript for type safety
- ESLint and Prettier for code quality
- PostCSS for CSS processing

## Deployment Strategy

### Development Environment
- **Port**: 5000 (configured in .replit)
- **Database**: PostgreSQL 16 module in Replit
- **Hot Reload**: Vite HMR for frontend, tsx watch for backend

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Deployment**: Configured for Replit autoscale deployment
- **Static Assets**: Served from built frontend assets

### Environment Configuration
- Database URL required for PostgreSQL connection
- Development and production mode switching
- Replit-specific configurations for cartographer and error handling

## Changelog

```
Changelog:
- June 23, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```