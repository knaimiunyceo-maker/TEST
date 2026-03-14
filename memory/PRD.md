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
- Traductions complètes sur toutes les pages incluant:
  - Page d'accueil
  - Navigation et footer
  - Pages d'expériences (Self-Defense, Language Practice, Visual Storytelling)
  - Page de réservation (BookPage) avec tous les formulaires
  - Pages légales (CGV, Mentions Légales, Confidentialité, À Propos)

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
- Formulaire de réservation hybride (lead-capture)
- Validation email et téléphone international
- Protection anti-bot (honeypot)
- Calendrier personnalisé pour les weekends (alternance Marrakech/Agadir)
- Calendrier "Lundis uniquement" pour les cours de langue
- Règle de 14 jours minimum avant réservation
- Réduction Early Bird (-8%) pour réservations 30+ jours à l'avance

### GDPR Compliance ✅
- Bannière cookies
- Cases de consentement CGV et données personnelles
- Pages légales complètes

## What's Been Implemented

### Date: March 2026

1. **Traductions complètes 6 langues**
   - Ajout de l'italien comme 6ème langue
   - Traduction de BookPage.js avec tous les textes d'interface
   - Traduction de App.js (navigation, hero, footer)
   - Traduction de PageLayout.js (footer des pages internes)
   - Mise à jour de translations.js avec toutes les sections

2. **Footer standardisé**
   - Structure 4 colonnes identique sur homepage et pages internes
   - Liens fonctionnels vers toutes les pages légales

3. **Nettoyage du code**
   - Suppression des fichiers redondants: SecureBookingForm.js, SecureBookingPage.js
   - Suppression de la route /reservation dans App.js
   - Mise à jour des pages d'expériences pour utiliser le bouton de réservation

4. **Système de réservation sécurisé**
   - Validation email avec domaines bloqués
   - Validation téléphone international (react-phone-number-input)
   - Protection anti-bot honeypot
   - Messages d'erreur en temps réel traduits

## Prioritized Backlog

### P0 - Critique
- ✅ Traductions complètes 6 langues
- ✅ Footer standardisé

### P1 - Important
- Contenu pour HowItWorksPage.js et ActivitiesPage.js
- Pages destinations (Casablanca, Marrakech, Agadir)

### P2 - Enhancement
- Intégration Stripe pour paiements en ligne
- Base de données pour les expériences (actuellement hardcodé)
- Refactorisation de App.js (extraction HomePage)

### P3 - Nice to Have
- SEO optimizations
- Analytics integration
- Newsletter signup

## Technical Architecture

### Frontend
- React avec TailwindCSS
- react-router-dom pour le routing
- react-phone-number-input pour validation téléphone
- Shadcn/UI components
- LanguageContext pour la gestion multilingue

### Backend
- FastAPI (Python)
- Données hardcodées dans server.py
- Intégration Resend pour emails

### Key Files
- `/app/frontend/src/pages/BookPage.js` - Formulaire de réservation
- `/app/frontend/src/App.js` - Homepage et routing
- `/app/frontend/src/translations.js` - Toutes les traductions
- `/app/frontend/src/LanguageContext.js` - Contexte de langue
- `/app/frontend/src/pages/components/PageLayout.js` - Layout avec footer

## API Endpoints
- `GET /api/experiences` - Liste des expériences
- `POST /api/contact` - Soumission formulaire de contact/réservation

## Known Limitations
- Données expériences hardcodées (pas de base de données)
- Pages destinations non créées (liens présents mais pages vides)
