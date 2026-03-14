# THE BRIDGE - Product Requirements Document

## Project Overview
A multilingual website for "THE BRIDGE" travel brand with the concept "Travel • Practice • Experience". The site offers themed travel experiences in Morocco (Self-Defense, Visual Storytelling, Language Practice) across three destinations: Casablanca, Marrakech, and Agadir.

## Tech Stack
- **Frontend**: React, TailwindCSS, Framer Motion, react-router-dom
- **Backend**: FastAPI (Python)
- **UI Components**: Shadcn/UI
- **Internationalization**: Custom React Context-based i18n (6 languages)
- **Phone Input**: react-phone-number-input
- **Email**: Resend API (for booking notifications)

## Supported Languages
1. English (EN)
2. French (FR)
3. Spanish (ES)
4. Portuguese (PT)
5. German (DE)
6. Italian (IT)

---

## Completed Features ✅

### Stripe Payment Integration (December 2025) ✅ NEW
- [x] Backend checkout API (`POST /api/bookings/checkout`)
- [x] 30% deposit calculation for all experiences
- [x] Stripe Checkout session creation with redirect
- [x] Payment status verification (`GET /api/bookings/payment-status/{session_id}`)
- [x] Booking storage in MongoDB
- [x] Webhook handler for payment confirmation
- [x] BookSuccessPage with payment status polling
- [x] Email confirmations (customer + admin) on successful payment

### Experience Prices
| Experience | Price | Deposit (30%) |
|------------|-------|---------------|
| Self-Defense | €1,490 | €447 |
| Visual Storytelling | €1,690 | €507 |
| Language Practice | €890 | €267 |

### Form Validation ✅ TESTED
- [x] Real-time email validation on blur
- [x] Real-time phone validation on blur
- [x] Blocked email domains (test.com, example.com, etc.)
- [x] Multi-step form with progress indicator

### Core Pages (All Translated)
- [x] Homepage (`/`) - Hero, experiences, destinations, testimonials
- [x] How It Works (`/how-it-works`) - Process explanation + "The Bridge Experience" booking flow
- [x] About (`/about`) - Team and mission
- [x] Activities (`/activities`) - All available activities
- [x] Destinations (`/destinations`) - Overview of all destinations
- [x] Book Page (`/book`) - Multi-step booking form with "The Bridge Experience" info banner

### Destination Pages (All Translated with Rich Content)
- [x] Casablanca (`/destinations/casablanca`) - Modern metropolis, Art Deco architecture
- [x] Marrakech (`/destinations/marrakech`) - The Red City, medinas, Atlas Mountains
- [x] Agadir (`/destinations/agadir`) - Beach paradise, surfing, 300+ sunny days

### Experience Pages (All Translated)
- [x] Self-Defense (`/experiences/self-defense`)
- [x] Visual Storytelling (`/experiences/visual-storytelling`)
- [x] Language Practice (`/experiences/language-practice`)

### Legal Pages (Fully Translated - All 6 Languages)
- [x] Terms & Conditions (`/cgv`) - 17 sections, complete translations
- [x] Legal Notice (`/mentions-legales`) - Company info, hosting, IP, applicable law
- [x] Privacy Policy (`/confidentialite`) - GDPR compliant, 11 sections

### Components
- [x] PageLayout - Global header/footer with language selector
- [x] CookieBanner - Translated cookie consent banner
- [x] Language Selector - Flag-based dropdown in header

### "The Bridge Experience" Booking Process Content (December 2025)
Added to HowItWorksPage and BookPage:
1. **Step 1: Human Connection** - 15-minute call with local referent
2. **Step 2: Priority Booking** - 30% deposit via Stripe, 24h validity
3. **Step 3: Group Formation (Quorum)** - 10 participants required, "Circle of Explorers"
4. **Step 4: Confirmation or Full Refund** - 100% guarantee, IBAN bank transfer

---

## Technical Implementation

### i18n System
- Central context: `/src/LanguageContext.js`
- Language stored in localStorage: `thebridge-language`
- Translations co-located in component files
- Hook: `useLanguage()` returns `{ language, changeLanguage }`

### Key Files
```
/app/frontend/src/
├── App.js                 # Main app with routing
├── LanguageContext.js     # i18n context provider
├── components/
│   └── CookieBanner.js    # Cookie consent (translated)
└── pages/
    ├── components/
    │   └── PageLayout.js  # Global layout with header/footer
    ├── AboutPage.js
    ├── ActivitiesPage.js
    ├── AgadirPage.js       # ✅ Fully translated + enriched
    ├── BookPage.js         # ✅ + Bridge Experience banner
    ├── CasablancaPage.js   # ✅ Fully translated
    ├── CGVPage.js          # ✅ Fully translated (17 sections)
    ├── ConfidentialitePage.js # ✅ Fully translated (11 sections)
    ├── DestinationsPage.js
    ├── HowItWorksPage.js   # ✅ + Bridge Experience steps
    ├── LanguagePracticePage.js
    ├── MarrakechPage.js    # ✅ Fully translated + enriched
    ├── MentionsLegalesPage.js # ✅ Fully translated
    ├── SelfDefensePage.js
    └── VisualStorytellingPage.js
```

---

## API Endpoints
- `GET /api/experiences` - List all experiences (hardcoded)
- `POST /api/contact` - Submit contact request (sends email via Resend)
- `POST /api/bookings/checkout` - Create Stripe checkout session for 30% deposit
- `GET /api/bookings/payment-status/{session_id}` - Check payment status
- `GET /api/bookings/{booking_id}` - Get booking details
- `POST /api/webhook/stripe` - Stripe webhook for payment events
- `GET /api/experience-prices` - Get prices and deposit amounts

---

## Pending/Future Tasks

### P1 - High Priority
- [x] ~~Integrate Stripe for online payments~~ ✅ COMPLETED
- [x] ~~Test real-time form validation on BookPage~~ ✅ COMPLETED
- [x] ~~Fix homepage experience translations (tagline, description)~~ ✅ COMPLETED (December 2025)
- [x] ~~Remove emojis from booking page~~ ✅ COMPLETED
- [x] ~~Verify footer links~~ ✅ COMPLETED
- [x] ~~Email notifications for contact forms and bookings (Resend)~~ ✅ COMPLETED (December 2025)

### P2 - Medium Priority
- [x] ~~Extract HomePage component from App.js~~ ✅ COMPLETED (December 2025)
- [x] ~~Add SEO meta tags for each page~~ ✅ COMPLETED (December 2025)
- [ ] Migrate hardcoded data to SQL database

### P3 - Low Priority
- [ ] Add more testimonials/reviews
- [ ] Implement blog section
- [ ] Add social media integration

---

## Notes
- **Mocked Data**: Backend currently uses hardcoded JSON data
- **Legal Text**: French is the official legal language; translations include disclaimer notices
- **Mobile Responsive**: All pages are mobile-friendly with responsive design

---

*Last Updated: December 2025*
