# THE BRIDGE - Product Requirements Document

## Original Problem Statement
Build a website for a travel brand "THE BRIDGE" based on the concept "Travel • Practice • Experience". The site allows users to discover and book travel experiences in Morocco combining morning practice sessions with afternoon exploration.

## User Personas
- **Primary**: European travelers (18+) looking for active holidays combining learning/training with travel
- **Secondary**: Content creators seeking visual storytelling experiences

## Core Requirements

### Experiences (3 types)

1. **Self-Defense Weekend** - Marrakech & Agadir
   - Format: Weekend (Vendredi → Dimanche, 3 jours / 2 nuits)
   - Monthly recurring calendar alternating cities (Weekend 1 & 3: Marrakech, Weekend 2 & 4: Agadir)
   - Max 10 participants
   - Pricing: €250 per weekend

2. **Language Practice Holiday** - Casablanca & Marrakech only
   - Format: Weekly (minimum 7 days)
   - 20 hours per week
   - Course types: General English, TOEFL iBT, TOEFL ITP, IELTS Academic, IELTS General, Business English
   - Pricing: €400/week + €45 registration fee
   - Linear pricing (not degressive)

3. **Visual Storytelling Weekend** - Marrakech & Agadir
   - Format: Weekend (Vendredi → Dimanche, 3 jours / 2 nuits)
   - Monthly recurring calendar alternating cities
   - Tracks: Filmmaking, Photography, Drone
   - Max 10 participants
   - Pricing: €350 per weekend

### Destinations (3 cities)
1. **Casablanca** - Language Practice
2. **Agadir** - Self-Defense, Visual Storytelling
3. **Marrakech** - Self-Defense, Language Practice, Visual Storytelling

## Tech Stack
- **Frontend**: React, TailwindCSS, react-router-dom, Shadcn/UI
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (currently hardcoded data)
- **Email**: Resend API (configured)

## Site Architecture
```
/                    - Homepage
/experiences         - All experiences listing
/experiences/self-defense      - Weekend calendar with alternating cities
/experiences/language-practice - Weekly course format
/experiences/visual-storytelling - Weekend calendar with track selection
/destinations        - All destinations
/destinations/casablanca
/destinations/agadir
/destinations/marrakech
/activities          - Optional activities
/how-it-works        - Process explanation
/about               - About THE BRIDGE
/book                - Multi-step booking flow
```

## What's Been Implemented
- [x] Multi-page architecture with react-router-dom
- [x] Homepage with hero, experiences section, destination section (simplified, no prices)
- [x] Self-Defense page - Weekend format with recurring calendar (Marrakech/Agadir)
- [x] Language Practice page - Weekly format with linear pricing €400/week
- [x] Visual Storytelling page - Weekend format with track selection & calendar
- [x] Destination pages (Casablanca, Agadir, Marrakech)
- [x] Shared navigation/footer layout (PageLayout.js)
- [x] Multi-step booking form with dynamic fields per experience
- [x] Contact form with Resend email integration
- [x] Multi-language support (EN, FR, ES, DE, PT)
- [x] Responsive design across all devices

## Pending Tasks

### P1 - High Priority
- [ ] Populate content for About page
- [ ] Add specific start dates for language course beginners

### P2 - Medium Priority
- [ ] Stripe payment integration
- [ ] Complete translations for all new pages (FR/EN)

### P3 - Future
- [ ] FAQ sections
- [ ] Testimonials
- [ ] Move hardcoded data to MongoDB
- [ ] Refactor App.js (extract homepage to HomePage.js)

## Key Files
- `/app/frontend/src/App.js` - Main router & homepage
- `/app/frontend/src/pages/SelfDefensePage.js` - Weekend calendar template
- `/app/frontend/src/pages/VisualStorytellingPage.js` - Weekend format with tracks
- `/app/frontend/src/pages/LanguagePracticePage.js` - Weekly course format
- `/app/frontend/src/pages/BookPage.js` - Multi-step booking flow
- `/app/frontend/src/pages/ExperiencesPage.js` - Experience listing
- `/app/frontend/src/pages/components/PageLayout.js` - Shared layout
- `/app/backend/server.py` - API & data

## API Endpoints
- `GET /api/experiences` - List all experiences
- `GET /api/experiences/{id}` - Get single experience details
- `GET /api/destinations` - List all destinations  
- `GET /api/activities` - List optional activities
- `POST /api/contact` - Submit contact/booking form

## Last Updated
December 2025

## Recent Changes
- **Visual Storytelling**: Updated to Weekend format at €350 (was multi-day format at €260)
- **Self-Defense**: Weekend format at €250, alternating Marrakech/Agadir
- **Language Practice**: Weekly format €400/week, Casablanca & Marrakech only
- **Homepage**: Simplified cards (no prices, no detailed activities)
- **Booking Flow**: Dynamic per experience type
