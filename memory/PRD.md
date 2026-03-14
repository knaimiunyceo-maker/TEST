# THE BRIDGE - Product Requirements Document

## Original Problem Statement
Site web pour une marque de voyage "THE BRIDGE" basée sur le concept "Travel • Practice • Experience". Le projet implique la création d'un site web multi-pages avec différentes expériences de voyage comme "Self-Defense", "Visual Storytelling" et "Language Practice".

## User Personas
- Voyageurs internationaux (18-35 ans) cherchant des expériences authentiques au Maroc
- Personnes souhaitant combiner voyage et apprentissage (langues, self-defense, storytelling)
- Utilisateurs de 6 langues différentes (FR, EN, ES, PT, DE, IT)

## Core Requirements

### Multi-Language Support ✅
- 6 langues supportées: Français, English, Español, Português, Deutsch, Italiano
- **Sélecteur de langue visible sur TOUTES les pages** (via PageLayout.js)
- Traductions complètes sur:
  - Page d'accueil (App.js)
  - Navigation et footer (PageLayout.js + App.js)
  - Page de réservation (BookPage.js)
  - Page À Propos (AboutPage.js)
  - Pages légales (CGV, Mentions Légales, Confidentialité)

### Footer Standardisé ✅
Structure uniforme sur toutes les pages:
```
THE BRIDGE
Travel • Practice • Experience

Experiences          Destinations         Company
- Self-Defense       - Casablanca         - About
- Language Practice  - Marrakech          - How it Works
- Visual Storytelling - Agadir            - Activities
                                          - CGV
                                          - Mentions légales
                                          - Confidentialité
```

### Booking System ✅
- Formulaire de réservation hybride (lead-capture) entièrement traduit
- Validation email et téléphone international
- Protection anti-bot (honeypot)
- Calendrier personnalisé pour les weekends
- Réduction Early Bird (-8%)

### GDPR Compliance ✅
- Bannière cookies traduite
- Cases de consentement CGV et données personnelles
- Pages légales complètes

## What's Been Implemented

### Date: March 2026

1. **Sélecteur de langue sur toutes les pages**
   - PageLayout.js mis à jour avec sélecteur de langue dans le header
   - Navigation traduite (Accueil, Expériences, Destinations, etc.)
   - Footer traduit (Entreprise, Confidentialité, etc.)

2. **Traductions complètes**
   - AboutPage.js avec traductions 6 langues
   - BookPage.js avec traductions 6 langues
   - PageLayout.js avec traductions navigation + footer
   - translations.js avec italien ajouté

3. **Nettoyage du code**
   - Fichiers SecureBookingForm.js et SecureBookingPage.js supprimés

## Technical Architecture

### Key Files
- `/app/frontend/src/pages/components/PageLayout.js` - Layout avec nav + footer + sélecteur de langue
- `/app/frontend/src/pages/BookPage.js` - Formulaire de réservation traduit
- `/app/frontend/src/pages/AboutPage.js` - Page À propos traduite
- `/app/frontend/src/LanguageContext.js` - Contexte de langue (changeLanguage)
- `/app/frontend/src/translations.js` - Traductions globales

## Prioritized Backlog

### P1 - Important
- Traduire les pages restantes: HowItWorksPage, ActivitiesPage, CGVPage, etc.
- Créer les pages destinations (Casablanca, Marrakech, Agadir)

### P2 - Enhancement
- Intégration Stripe pour paiements
- Base de données pour les expériences
