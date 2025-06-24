# SDGs Educational E-commerce Platform

## Overview

This is a full-stack educational web application designed to teach students about the UN Sustainable Development Goals (SDGs) through an interactive e-commerce simulation. The platform allows students to "purchase" SDG goals, create action plans, and generate educational receipts - providing an engaging way to learn about global sustainability initiatives.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: Zustand for cart state with localStorage persistence
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and production builds
- **Font**: Google Fonts (Noto Sans KR, Do Hyeon) for Korean language support

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints
- **Development**: Full-stack development server with Vite integration
- **File Upload**: Canvas-based drawing data handling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL support
- **Schema**: Structured tables for students and action plans
- **Migration**: Drizzle Kit for database schema management
- **Connection**: Neon Database serverless PostgreSQL

## Key Components

### Data Models
1. **Students Table**
   - Student information (name, school, grade, class)
   - Primary key for relationship management

2. **Action Plans Table**
   - Links to student records
   - SDG goal selections (JSON array)
   - Plan creation method (text, drawing, or both)
   - Action plan content and drawing data
   - Delivery preferences and timestamps

### Core Features
1. **SDG Goal Selection**: Interactive card-based interface for selecting from 17 UN SDG goals
2. **Shopping Cart Simulation**: Persistent cart state with selected goals
3. **Action Plan Creation**: Multiple input methods including text and canvas drawing
4. **Receipt Generation**: PDF generation with student information and selected goals
5. **Educational Content**: Informational pages about SDGs with external resource links

### UI Components
- Responsive design with mobile-first approach
- Interactive drawing canvas for action plan creation
- Modal-based workflows for checkout and completion
- Toast notifications for user feedback
- Comprehensive form validation with react-hook-form and Zod

## Data Flow

1. **Goal Selection**: Users browse and add SDG goals to their cart
2. **Cart Management**: Selected goals are persisted in localStorage via Zustand
3. **Checkout Process**: Users fill out student information and create action plans
4. **Data Submission**: Form data is validated and sent to backend API
5. **Database Storage**: Student and action plan data is stored in PostgreSQL
6. **Receipt Generation**: PDF receipts are generated and offered for download

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and API caching
- **react-hook-form**: Form state management and validation
- **zod**: Schema validation for forms and API data
- **html2canvas**: Canvas-to-image conversion for receipt generation
- **pdfkit**: PDF generation for educational receipts

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Database Dependencies
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-zod**: Integration between Drizzle and Zod validation

## Deployment Strategy

### Development Environment
- Replit-based development with Node.js 20 and PostgreSQL 16
- Vite development server with hot module replacement
- Concurrent client and server development workflow

### Production Build
- Vite builds client-side assets to `dist/public`
- esbuild compiles server code to `dist/index.js`
- Static file serving for production deployment
- Autoscale deployment target on Replit

### Environment Configuration
- Database URL configuration via environment variables
- Development-specific Vite plugins for error handling
- Production-optimized builds with asset bundling

## Changelog
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.