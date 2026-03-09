# THE BRIDGE - Travel Website PRD

## Project Overview
Modern, immersive travel website for THE BRIDGE company connecting young international travelers (18-30, mainly UK/Europe) with authentic Morocco experiences.

## Brand Identity
- **Company Name:** THE BRIDGE
- **Tagline:** Connecting People Through Travel
- **Tone:** Adventurous, Social, Youthful, Inspiring, International
- **Founder:** Naimi Mohamed Karim

## Target Audience
Young travelers 18-30 years old seeking:
- Social travel experiences
- Adventure trips
- Cultural immersion
- Meeting new people

---

## What's Been Implemented ✅

### Core Website (March 9, 2026)
- **Hero Section:** Video background with Morocco footage, animated CTAs
- **Concept Section:** Brand story with 3 value cards (Meet People, Live Adventures, Discover Culture)
- **Experiences Section:** 4 experience cards (Surf Taghazout, Sahara Desert, Marrakech Weekend, Coastal Explorer)
- **Community Section:** Social travel messaging with traveler photos
- **Upcoming Trips:** 4 trip listings with dates, prices, availability
- **Testimonials:** 4 traveler testimonials with ratings
- **About Section:** Mission statement and founder info
- **Contact Form:** Name, email, trip interest dropdown, message

### Multi-Language Support (March 9, 2026)
- **5 Languages:** English 🇬🇧, Français 🇫🇷, Español 🇪🇸, Deutsch 🇩🇪, Português 🇵🇹
- Language selector in navigation (globe icon)
- Language preference persisted to localStorage
- Full translation of all sections

### Technical Stack
- **Frontend:** React, Tailwind CSS, Framer Motion, Shadcn/UI
- **Backend:** FastAPI, MongoDB
- **Fonts:** Syne (headings), DM Sans (body), Caveat (accents)
- **Colors:** Sunset Orange (#E76F51), Ocean Teal (#264653), Sand Gold (#E9C46A), Warm Off-White (#F4F1DE)

---

## Backlog / Not Yet Implemented

### P0 - Critical
- [ ] Email notifications setup (Resend API key required)
- [ ] Social login (Google, Facebook, Apple) - user mentioned interest

### P1 - High Priority
- [ ] Payment integration (Stripe) for booking
- [ ] User accounts and booking history
- [ ] Admin dashboard to manage trips/bookings
- [ ] CMS for content management

### P2 - Nice to Have
- [ ] Blog/Journal section
- [ ] Instagram feed integration
- [ ] WhatsApp booking widget
- [ ] Trip photo galleries
- [ ] FAQ section
- [ ] Newsletter signup

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/` | GET | Health check |
| `/api/experiences` | GET | List all experiences |
| `/api/experiences/{id}` | GET | Get single experience |
| `/api/trips` | GET | List upcoming trips |
| `/api/trips/{id}` | GET | Get single trip |
| `/api/testimonials` | GET | List testimonials |
| `/api/contact` | POST | Submit contact form |
| `/api/contact` | GET | List submissions (admin) |

---

## Files Structure
```
/app/frontend/src/
├── App.js           # Main app with all sections
├── App.css          # Custom styles
├── index.css        # Tailwind + CSS variables
├── translations.js  # All language translations
├── LanguageContext.js # Language provider
└── components/ui/   # Shadcn components

/app/backend/
├── server.py        # FastAPI server
├── .env             # Environment variables
└── requirements.txt # Python dependencies
```

---

## Contact
- **Founder LinkedIn:** https://www.linkedin.com/in/karim-naimi-b1aa1139/
- **Company Info:** https://annuaire-entreprises.data.gouv.fr/entreprise/unyceo-fr-953646577
