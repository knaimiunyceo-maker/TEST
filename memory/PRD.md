# THE BRIDGE - Product Requirements Document

## Original Problem Statement
Build a website for a travel brand "THE BRIDGE" based on the concept "Travel • Practice • Experience". The site allows users to discover and book travel experiences in Morocco combining morning practice sessions with afternoon exploration.

## User Personas
- **Primary**: European travelers (18+) looking for active holidays combining learning/training with travel
- **Secondary**: Content creators seeking visual storytelling experiences

## Core Requirements

### Experiences (3 types)
1. **Self-Defense Holiday** - Agadir only
   - Morning: Self-defense training sessions
   - Afternoon: Beach time, exploration
   - Pricing: Weekend €250 / 5 days €450 / 7 days €550

2. **Language Practice Holiday** - Casablanca only
   - Morning: English conversation practice
   - Afternoon: City exploration, cultural activities
   - Pricing: Weekend €220 / 5 days €400 / 7 days €500

3. **Visual Storytelling Holiday** - Marrakech, Essaouira, Agadir
   - Morning: Filmmaking/Photography/Drone sessions
   - Afternoon: Content capture, exploration
   - Pricing: Weekend €260 / 5 days €480 / 7 days €580

### Destinations (3 cities)
1. **Casablanca** - Language Practice
2. **Agadir** - Self-Defense, Visual Storytelling
3. **Marrakech** - Visual Storytelling

## Tech Stack
- **Frontend**: React, TailwindCSS, react-router-dom, Shadcn/UI
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (currently hardcoded data)
- **Email**: Resend API (configured)

## Site Architecture
```
/                    - Homepage
/experiences         - All experiences listing
/experiences/self-defense
/experiences/language-practice
/experiences/visual-storytelling
/destinations        - All destinations
/destinations/casablanca
/destinations/agadir
/destinations/marrakech
/activities          - Optional activities
/how-it-works        - Process explanation
/about               - About THE BRIDGE
/book                - Booking flow
```

## What's Been Implemented
- [x] Multi-page architecture with react-router-dom
- [x] Homepage with hero, experiences section, destination section
- [x] Experience pages (Self-Defense, Language Practice, Visual Storytelling)
- [x] Destination pages (Casablanca, Agadir, Marrakech)
- [x] Shared navigation/footer layout (PageLayout.js)
- [x] Contact form with Resend email integration
- [x] Multi-language support (EN, FR, ES, DE, PT)
- [x] Fair Price Catalogue
- [x] Responsive design

## Pending Tasks

### P0 - Critical
- [ ] Complete booking flow on /book page (multi-step form)

### P1 - High Priority
- [ ] Populate content for About page
- [ ] Populate content for Activities page
- [ ] Populate content for How It Works page

### P2 - Medium Priority
- [ ] Calendar system for available dates
- [ ] More destination photos

### P3 - Future
- [ ] Stripe payment integration
- [ ] FAQ sections
- [ ] Testimonials
- [ ] Move hardcoded data to MongoDB

## Key Files
- `/app/frontend/src/App.js` - Main router & homepage
- `/app/frontend/src/pages/` - All page components
- `/app/frontend/src/pages/components/PageLayout.js` - Shared layout
- `/app/backend/server.py` - API & data

## API Endpoints
- `GET /api/experiences` - List all experiences
- `GET /api/destinations` - List all destinations  
- `GET /api/activities` - List optional activities
- `POST /api/contact` - Submit contact/booking form

## Last Updated
December 11, 2025
