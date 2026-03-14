# THE BRIDGE - Product Requirements Document

## Original Problem Statement
Site web pour une marque de voyage "THE BRIDGE" basée sur le concept "Travel • Practice • Experience". Le projet implique la création d'un site web multi-pages avec différentes expériences de voyage comme "Self-Defense", "Visual Storytelling" et "Language Practice".

## User Personas
- Voyageurs internationaux (18-35 ans) cherchant des expériences authentiques au Maroc
- Personnes souhaitant combiner voyage et apprentissage
- Utilisateurs de 6 langues différentes (FR, EN, ES, PT, DE, IT)

## Core Requirements Implemented ✅

### Multi-Language Support ✅ COMPLETE
- 6 langues supportées: Français, English, Español, Português, Deutsch, Italiano
- **Sélecteur de langue visible sur TOUTES les pages**
- Pages traduites:
  - ✅ Homepage (App.js)
  - ✅ Navigation + Footer (PageLayout.js)
  - ✅ BookPage (formulaire de réservation)
  - ✅ AboutPage
  - ✅ HowItWorksPage
  - ✅ ActivitiesPage
  - ✅ DestinationsPage
  - ✅ CGVPage (titre traduit)
  - ✅ MentionsLegalesPage (titre traduit)
  - ✅ ConfidentialitePage (titre traduit)
  - ✅ SelfDefensePage
  - ✅ LanguagePracticePage
  - ✅ VisualStorytellingPage

### Footer Standardisé ✅
Structure uniforme sur toutes les pages:
- THE BRIDGE + "Travel • Practice • Experience"
- Experiences (Self-Defense, Language Practice, Visual Storytelling)
- Destinations (Casablanca, Marrakech, Agadir)
- Company (About, How it Works, Activities, CGV, Mentions légales, Confidentialité)

### Booking System ✅
- Formulaire entièrement traduit dans 6 langues
- Validation email et téléphone international
- Protection anti-bot (honeypot)
- Calendrier weekends (alternance Marrakech/Agadir)

## Technical Architecture

### Frontend
- React + TailwindCSS
- react-router-dom pour routing
- react-phone-number-input pour téléphone
- Shadcn/UI components
- LanguageContext pour gestion multilingue

### Key Files Modifiés (Session Mars 2026)
- `/app/frontend/src/pages/components/PageLayout.js` - Layout + sélecteur langue
- `/app/frontend/src/pages/HowItWorksPage.js` - Traduit 6 langues
- `/app/frontend/src/pages/ActivitiesPage.js` - Traduit 6 langues
- `/app/frontend/src/pages/DestinationsPage.js` - Traduit 6 langues
- `/app/frontend/src/pages/SelfDefensePage.js` - Traduit 6 langues
- `/app/frontend/src/pages/LanguagePracticePage.js` - Traduit 6 langues
- `/app/frontend/src/pages/VisualStorytellingPage.js` - Traduit 6 langues
- `/app/frontend/src/pages/CGVPage.js` - Titre traduit
- `/app/frontend/src/pages/MentionsLegalesPage.js` - Titre traduit
- `/app/frontend/src/pages/ConfidentialitePage.js` - Titre traduit

## Prioritized Backlog

### P1 - Enhancement
- Traduire le contenu complet des pages légales (CGV, Mentions, Confidentialité)
- Ajouter plus de contenu aux pages destinations individuelles (Casablanca, Marrakech, Agadir)
- Traduire le CookieBanner dans toutes les langues

### P2 - Future
- Intégration Stripe pour paiements
- Base de données pour les expériences (actuellement hardcodé)
- SEO multilangue (balises hreflang)
- Analytics integration

## API Endpoints
- `GET /api/experiences` - Liste des expériences
- `POST /api/contact` - Soumission formulaire

## Known Limitations
- Données expériences hardcodées
- Cookie banner reste en français (à traduire)
- Contenu des pages légales pas entièrement traduit (structure uniquement)
