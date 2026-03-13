import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { 
  Waves, Mountain, Sun, Users, MapPin, Calendar, 
  ArrowRight, Menu, X, Mail, User, MessageSquare,
  ChevronRight, Instagram, Linkedin, Play, Pause,
  Globe, ChevronDown, Check, Plus, Plane, Zap, Sparkles,
  Car, UtensilsCrossed, MapPinned, Heart, Shield, HandHeart,
  Dumbbell, Languages, Camera, Target, Compass, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster, toast } from "sonner";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { catalogueTranslations } from "./translations";

// Page imports
import LanguagePracticePage from "./pages/LanguagePracticePage";
import ExperiencesPage from "./pages/ExperiencesPage";
import SelfDefensePage from "./pages/SelfDefensePage";
import VisualStorytellingPage from "./pages/VisualStorytellingPage";
import DestinationsPage from "./pages/DestinationsPage";
import CasablancaPage from "./pages/CasablancaPage";
import AgadirPage from "./pages/AgadirPage";
import MarrakechPage from "./pages/MarrakechPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutPage from "./pages/AboutPage";
import BookPage from "./pages/BookPage";
import CGVPage from "./pages/CGVPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import ConfidentialitePage from "./pages/ConfidentialitePage";
import CookieBanner from "./components/CookieBanner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Language Selector Component
const LanguageSelector = ({ scrolled, isMobile = false }) => {
  const { language, changeLanguage, translations } = useLanguage();
  const languages = Object.values(translations);
  const currentLang = translations[language];

  if (isMobile) {
    return (
      <div className="border-t border-border pt-4 mt-4">
        <p className="font-dm text-ocean/60 text-sm mb-2">Language</p>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-3 py-2 rounded-lg text-sm font-dm transition-colors ${
                language === lang.code
                  ? "bg-sunset text-white"
                  : "bg-warmwhite text-ocean hover:bg-sand/30"
              }`}
              data-testid={`mobile-lang-${lang.code}`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
            scrolled 
              ? "text-ocean hover:bg-sand/30" 
              : "text-white hover:bg-white/10"
          }`}
          data-testid="language-selector"
        >
          <Globe size={18} />
          <span className="font-dm text-sm">{currentLang.flag}</span>
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border border-border shadow-lg">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? "bg-sand/30" : ""}`}
            data-testid={`lang-${lang.code}`}
          >
            <span className="mr-2">{lang.flag}</span>
            <span className="font-dm">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Navigation Component
const Navigation = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguage();

  const navLinks = [
    { href: "/experiences", label: language === 'fr' ? 'Expériences' : language === 'es' ? 'Experiencias' : language === 'de' ? 'Erlebnisse' : language === 'pt' ? 'Experiências' : 'Experiences', isRoute: true },
    { href: "/how-it-works", label: language === 'fr' ? 'Comment ça marche' : language === 'es' ? 'Cómo funciona' : language === 'de' ? 'So funktioniert\'s' : language === 'pt' ? 'Como funciona' : 'How It Works', isRoute: true },
    { href: "/activities", label: language === 'fr' ? 'Activités' : language === 'es' ? 'Actividades' : language === 'de' ? 'Aktivitäten' : language === 'pt' ? 'Atividades' : 'Activities', isRoute: true },
    { href: "/destinations", label: language === 'fr' ? 'Destinations' : language === 'es' ? 'Destinos' : language === 'de' ? 'Reiseziele' : language === 'pt' ? 'Destinos' : 'Destinations', isRoute: true },
    { href: "/about", label: language === 'fr' ? 'À propos' : language === 'es' ? 'Acerca de' : language === 'de' ? 'Über uns' : language === 'pt' ? 'Sobre' : 'About', isRoute: true },
  ];

  const bookNowLabel = language === 'fr' ? 'Réserver' : language === 'es' ? 'Reservar' : language === 'de' ? 'Buchen' : language === 'pt' ? 'Reservar' : 'Book Now';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-warmwhite/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className={`font-syne font-bold text-xl sm:text-2xl tracking-tight whitespace-nowrap ${
            scrolled ? "text-ocean" : "text-white"
          }`}
          data-testid="logo-link"
        >
          THE BRIDGE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link font-dm font-medium text-sm whitespace-nowrap ${
                scrolled ? "text-ocean" : "text-white"
              } hover:text-sunset transition-colors`}
              data-testid={`nav-${link.href.slice(1)}`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSelector scrolled={scrolled} />
          <Button
            asChild
            className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-4 xl:px-6 font-dm font-semibold text-sm"
            data-testid="nav-book-btn"
          >
            <Link to="/book">{bookNowLabel}</Link>
          </Button>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-btn"
        >
          {mobileMenuOpen ? (
            <X className={scrolled ? "text-ocean" : "text-white"} size={28} />
          ) : (
            <Menu className={scrolled ? "text-ocean" : "text-white"} size={28} />
          )}
        </button>
      </div>

      {/* Mobile/Tablet Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-warmwhite border-t border-border"
        >
          <div className="px-4 sm:px-6 py-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-dm font-medium text-ocean py-3 text-lg border-b border-border/50 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm font-semibold mt-4 py-6 text-lg"
            >
              <Link to="/book" onClick={() => setMobileMenuOpen(false)}>
                {bookNowLabel}
              </Link>
            </Button>
            <LanguageSelector isMobile={true} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// Hero Section - NEW "Travel • Practice • Experience"
const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const { language } = useLanguage();

  const toggleVideo = () => {
    const video = document.getElementById('hero-video');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const content = {
    en: {
      headline: "Travel • Practice • Experience",
      subtitle: "Choose your experience. Learn something new. Discover Morocco.",
      tagline: "More than a trip. An experience.",
      cta: "Discover Experiences",
      secondary: "How It Works"
    },
    fr: {
      headline: "Voyage • Pratique • Expérience",
      subtitle: "Choisissez votre expérience. Apprenez quelque chose de nouveau. Découvrez le Maroc.",
      tagline: "Plus qu'un voyage. Une expérience.",
      cta: "Découvrir les Expériences",
      secondary: "Comment ça marche"
    },
    es: {
      headline: "Viaja • Practica • Experimenta",
      subtitle: "Elige tu experiencia. Aprende algo nuevo. Descubre Marruecos.",
      tagline: "Más que un viaje. Una transformación.",
      cta: "Descubrir Experiencias",
      secondary: "Cómo Funciona"
    },
    de: {
      headline: "Reisen • Üben • Erleben",
      subtitle: "Wähle dein Erlebnis. Lerne etwas Neues. Entdecke Marokko.",
      tagline: "Mehr als eine Reise. Eine Transformation.",
      cta: "Erlebnisse Entdecken",
      secondary: "So funktioniert's"
    },
    pt: {
      headline: "Viaje • Pratique • Experimente",
      subtitle: "Escolha sua experiência. Aprenda algo novo. Descubra Marrocos.",
      tagline: "Mais que uma viagem. Uma transformação.",
      cta: "Descobrir Experiências",
      secondary: "Como Funciona"
    }
  };

  const t = content[language] || content.en;

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0"
      data-testid="hero-section"
    >
      <video
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
        poster="https://images.unsplash.com/photo-1662009833223-75d3301290bd?crop=entropy&cs=srgb&fm=jpg&w=1920"
      >
        <source 
          src="https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4" 
          type="video/mp4" 
        />
      </video>

      <div className="absolute inset-0 video-overlay" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-syne font-extrabold text-white mb-4 sm:mb-6 leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          data-testid="hero-title"
        >
          {t.headline}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-dm text-white/90 text-base sm:text-lg md:text-xl mb-2 max-w-2xl mx-auto px-2"
          data-testid="hero-subtitle"
        >
          {t.subtitle}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-caveat text-sand text-xl sm:text-2xl mb-6 sm:mb-10"
        >
          {t.tagline}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <Button
            asChild
            size="lg"
            className="btn-primary bg-sunset hover:bg-sunset/90 text-white rounded-full px-6 sm:px-8 py-6 text-base sm:text-lg font-syne font-bold w-full sm:w-auto min-h-[44px]"
            data-testid="hero-cta"
          >
            <a href="#experiences">
              {t.cta}
              <ArrowRight className="ml-2" size={20} />
            </a>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-ocean rounded-full px-6 sm:px-8 py-6 text-base sm:text-lg font-syne font-bold bg-transparent w-full sm:w-auto min-h-[44px]"
            data-testid="hero-secondary-cta"
          >
            <a href="#how-it-works">{t.secondary}</a>
          </Button>
        </motion.div>
      </div>

      <button
        onClick={toggleVideo}
        className="absolute bottom-20 sm:bottom-8 right-4 sm:right-8 glass-dark p-2 sm:p-3 rounded-full hover:bg-white/20 transition-colors"
        data-testid="video-toggle"
      >
        {isPlaying ? (
          <Pause className="text-white" size={20} />
        ) : (
          <Play className="text-white" size={20} />
        )}
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// How It Works Section - 4 Steps
const HowItWorksSection = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "How It Works",
      subtitle: "Your journey in 4 simple steps",
      steps: [
        { number: "01", title: "Choose Your Experience", description: "Self-Defense, Language, or Visual Storytelling — pick what excites you most.", icon: <Target size={28} /> },
        { number: "02", title: "Select Your Dates", description: "Find a trip that fits your schedule. We run experiences year-round.", icon: <Calendar size={28} /> },
        { number: "03", title: "Add Optional Activities", description: "Customize your trip with desert excursions, cooking classes, spa days and more.", icon: <Plus size={28} /> },
        { number: "04", title: "Join the Adventure", description: "Meet your group, practice your passion, and create unforgettable memories.", icon: <Compass size={28} /> }
      ]
    },
    fr: {
      title: "Comment ça marche",
      subtitle: "Votre voyage en 4 étapes simples",
      steps: [
        { number: "01", title: "Choisissez votre expérience", description: "Self-Défense, Langues ou Storytelling Visuel — choisissez ce qui vous passionne.", icon: <Target size={28} /> },
        { number: "02", title: "Sélectionnez vos dates", description: "Trouvez un voyage qui correspond à votre planning. Nous proposons des expériences toute l'année.", icon: <Calendar size={28} /> },
        { number: "03", title: "Ajoutez des activités", description: "Personnalisez votre voyage avec excursions désert, cours de cuisine, spa et plus.", icon: <Plus size={28} /> },
        { number: "04", title: "Rejoignez l'aventure", description: "Rencontrez votre groupe, pratiquez votre passion et créez des souvenirs inoubliables.", icon: <Compass size={28} /> }
      ]
    },
    es: {
      title: "Cómo Funciona",
      subtitle: "Tu viaje en 4 simples pasos",
      steps: [
        { number: "01", title: "Elige tu experiencia", description: "Defensa Personal, Idiomas o Storytelling Visual — elige lo que más te emocione.", icon: <Target size={28} /> },
        { number: "02", title: "Selecciona tus fechas", description: "Encuentra un viaje que se ajuste a tu horario. Ofrecemos experiencias todo el año.", icon: <Calendar size={28} /> },
        { number: "03", title: "Añade actividades", description: "Personaliza tu viaje con excursiones al desierto, clases de cocina, spa y más.", icon: <Plus size={28} /> },
        { number: "04", title: "Únete a la aventura", description: "Conoce a tu grupo, practica tu pasión y crea recuerdos inolvidables.", icon: <Compass size={28} /> }
      ]
    },
    de: {
      title: "So funktioniert's",
      subtitle: "Deine Reise in 4 einfachen Schritten",
      steps: [
        { number: "01", title: "Wähle dein Erlebnis", description: "Kampf, Sprachen oder Visual Storytelling — wähle was dich begeistert.", icon: <Target size={28} /> },
        { number: "02", title: "Wähle deine Daten", description: "Finde eine Reise die zu deinem Zeitplan passt. Wir bieten Erlebnisse das ganze Jahr.", icon: <Calendar size={28} /> },
        { number: "03", title: "Füge Aktivitäten hinzu", description: "Personalisiere deine Reise mit Wüstenexkursionen, Kochkursen, Spa und mehr.", icon: <Plus size={28} /> },
        { number: "04", title: "Starte das Abenteuer", description: "Triff deine Gruppe, übe deine Leidenschaft und schaffe unvergessliche Erinnerungen.", icon: <Compass size={28} /> }
      ]
    },
    pt: {
      title: "Como Funciona",
      subtitle: "Sua jornada em 4 passos simples",
      steps: [
        { number: "01", title: "Escolha sua experiência", description: "Defesa Pessoal, Idiomas ou Storytelling Visual — escolha o que mais te empolga.", icon: <Target size={28} /> },
        { number: "02", title: "Selecione suas datas", description: "Encontre uma viagem que se encaixe na sua agenda. Oferecemos experiências o ano todo.", icon: <Calendar size={28} /> },
        { number: "03", title: "Adicione atividades", description: "Personalize sua viagem com excursões ao deserto, aulas de culinária, spa e mais.", icon: <Plus size={28} /> },
        { number: "04", title: "Junte-se à aventura", description: "Conheça seu grupo, pratique sua paixão e crie memórias inesquecíveis.", icon: <Compass size={28} /> }
      ]
    }
  };

  const t = content[language] || content.en;

  return (
    <section 
      id="how-it-works" 
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-warmwhite"
      data-testid="how-it-works-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-syne font-bold text-ocean mb-4 text-2xl sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="font-dm text-ocean/70 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all h-full group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-sunset/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sunset group-hover:text-white transition-colors text-sunset">
                    {step.icon}
                  </div>
                  <span className="font-syne font-bold text-sand text-3xl">{step.number}</span>
                  <h3 className="font-syne font-bold text-ocean text-lg mt-2 mb-3">{step.title}</h3>
                  <p className="font-dm text-ocean/70 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Our Experiences Section - 3 Categories with Full & Weekend formats
const ExperiencesSection = ({ experiences }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Our Experiences",
      subtitle: "Practice in the morning • Explore Morocco in the afternoon",
      concept: "Travel • Practice • Experience",
      formats: "Two formats available:",
      fullExp: "Full Experience",
      weekend: "Weekend",
      days5: "5 days",
      days7: "7 days / 6 nights",
      weekend3: "2 nights / 3 days",
      morningPractice: "Morning Practice:",
      afternoonExperience: "Afternoon Experience:",
      destinations: "Destinations:",
      accommodationIncluded: "Accommodation included",
      bookNow: "Book This Experience",
      smallGroups: "Small international groups (18+)"
    },
    fr: {
      title: "Nos Expériences",
      subtitle: "Pratique le matin • Exploration du Maroc l'après-midi",
      concept: "Voyage • Pratique • Expérience",
      formats: "Deux formats disponibles :",
      fullExp: "Expérience Complète",
      weekend: "Weekend",
      days5: "5 jours",
      days7: "7 jours / 6 nuits",
      weekend3: "2 nuits / 3 jours",
      morningPractice: "Pratique du matin :",
      afternoonExperience: "Expérience de l'après-midi :",
      destinations: "Destinations :",
      accommodationIncluded: "Hébergement inclus",
      bookNow: "Réserver cette expérience",
      smallGroups: "Petits groupes internationaux (18+)"
    },
    es: {
      title: "Nuestras Experiencias",
      subtitle: "Práctica por la mañana • Explora Marruecos por la tarde",
      concept: "Viaja • Practica • Experimenta",
      formats: "Dos formatos disponibles:",
      fullExp: "Experiencia Completa",
      weekend: "Fin de semana",
      days5: "5 días",
      days7: "7 días / 6 noches",
      weekend3: "2 noches / 3 días",
      morningPractice: "Práctica matutina:",
      afternoonExperience: "Experiencia vespertina:",
      destinations: "Destinos:",
      accommodationIncluded: "Alojamiento incluido",
      bookNow: "Reservar esta experiencia",
      smallGroups: "Pequeños grupos internacionales (18+)"
    },
    de: {
      title: "Unsere Erlebnisse",
      subtitle: "Übung am Morgen • Marokko entdecken am Nachmittag",
      concept: "Reisen • Üben • Erleben",
      formats: "Zwei Formate verfügbar:",
      fullExp: "Vollständiges Erlebnis",
      weekend: "Wochenende",
      days5: "5 Tage",
      days7: "7 Tage / 6 Nächte",
      weekend3: "2 Nächte / 3 Tage",
      morningPractice: "Morgens Übung:",
      afternoonExperience: "Nachmittags Erlebnis:",
      destinations: "Reiseziele:",
      accommodationIncluded: "Unterkunft inklusive",
      bookNow: "Dieses Erlebnis buchen",
      smallGroups: "Kleine internationale Gruppen (18+)"
    },
    pt: {
      title: "Nossas Experiências",
      subtitle: "Prática pela manhã • Explore Marrocos à tarde",
      concept: "Viaje • Pratique • Experimente",
      formats: "Dois formatos disponíveis:",
      fullExp: "Experiência Completa",
      weekend: "Fim de semana",
      days5: "5 dias",
      days7: "7 dias / 6 noites",
      weekend3: "2 noites / 3 dias",
      morningPractice: "Prática matinal:",
      afternoonExperience: "Experiência vespertina:",
      destinations: "Destinos:",
      accommodationIncluded: "Hospedagem incluída",
      bookNow: "Reservar esta experiência",
      smallGroups: "Pequenos grupos internacionais (18+)"
    }
  };

  const t = content[language] || content.en;

  const getExperienceIcon = (icon) => {
    switch(icon) {
      case 'boxing': return <Dumbbell size={28} />;
      case 'languages': return <Languages size={28} />;
      case 'camera': return <Camera size={28} />;
      default: return <Star size={28} />;
    }
  };

  const localizedTitles = {
    en: {
      'self-defense-holiday': 'Self-Defense Holiday',
      'language-holiday': 'Language Practice Holiday',
      'visual-storytelling': 'Visual Storytelling Holiday'
    },
    fr: {
      'self-defense-holiday': 'Séjour Self-Défense',
      'language-holiday': 'Séjour Pratique Linguistique',
      'visual-storytelling': 'Séjour Storytelling Visuel'
    },
    es: {
      'self-defense-holiday': 'Vacaciones de Defensa Personal',
      'language-holiday': 'Vacaciones de Práctica de Idiomas',
      'visual-storytelling': 'Vacaciones de Storytelling Visual'
    },
    de: {
      'self-defense-holiday': 'Selbstverteidigung Urlaub',
      'language-holiday': 'Sprachpraxis Urlaub',
      'visual-storytelling': 'Visual Storytelling Urlaub'
    },
    pt: {
      'self-defense-holiday': 'Férias de Defesa Pessoal',
      'language-holiday': 'Férias de Prática de Idiomas',
      'visual-storytelling': 'Férias de Storytelling Visual'
    }
  };

  return (
    <section 
      id="experiences" 
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-ocean"
      data-testid="experiences-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-caveat text-sand text-xl sm:text-2xl mb-2">{t.concept}</p>
          <h2 className="font-syne font-bold text-white mb-4 text-2xl sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="font-dm text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <p className="font-dm text-sand/80 text-sm">{t.smallGroups}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card 
                className="experience-card bg-white border-none overflow-hidden h-full flex flex-col"
                data-testid={`experience-card-${exp.id}`}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={exp.image} 
                    alt={localizedTitles[language]?.[exp.id] || exp.title}
                    className="card-image w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-sunset">
                    {getExperienceIcon(exp.icon)}
                  </div>
                </div>
                <CardContent className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="font-syne font-bold text-lg sm:text-xl text-ocean leading-tight mb-1">
                    {localizedTitles[language]?.[exp.id] || exp.title}
                  </h3>
                  <p className="font-caveat text-sunset text-lg mb-3">{exp.tagline}</p>
                  
                  <p className="font-dm text-ocean/70 text-sm mb-4 flex-1">{exp.description}</p>

                  {/* Destinations */}
                  {exp.destinations && (
                    <div className="mb-4">
                      <p className="font-dm font-semibold text-ocean text-xs mb-2">{t.destinations}</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.destinations.map((dest, i) => (
                          <span key={i} className="bg-sand/30 text-ocean px-2 py-1 rounded-full text-xs font-dm flex items-center gap-1">
                            <MapPin size={10} /> {dest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {exp.id === 'language-holiday' ? (
                    <Button 
                      asChild
                      className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm mt-auto"
                      data-testid={`book-experience-${exp.id}`}
                    >
                      <Link to="/book?experience=language">{t.bookNow}</Link>
                    </Button>
                  ) : exp.id === 'self-defense-holiday' ? (
                    <Button 
                      asChild
                      className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm mt-auto"
                      data-testid={`book-experience-${exp.id}`}
                    >
                      <Link to="/book?experience=self-defense">{t.bookNow}</Link>
                    </Button>
                  ) : exp.id === 'visual-storytelling' ? (
                    <Button 
                      asChild
                      className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm mt-auto"
                      data-testid={`book-experience-${exp.id}`}
                    >
                      <Link to="/book?experience=storytelling">{t.bookNow}</Link>
                    </Button>
                  ) : (
                    <Button 
                      asChild
                      className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm mt-auto"
                      data-testid={`book-experience-${exp.id}`}
                    >
                      <a href="#contact">{t.bookNow}</a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Optional Activities Section
const OptionalActivitiesSection = ({ activities }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Optional Experiences",
      subtitle: "Enhance your trip with add-on activities. All at fair local prices."
    },
    fr: {
      title: "Expériences Optionnelles",
      subtitle: "Enrichissez votre voyage avec des activités supplémentaires. Tout aux prix locaux justes."
    },
    es: {
      title: "Experiencias Opcionales",
      subtitle: "Mejora tu viaje con actividades adicionales. Todo a precios locales justos."
    },
    de: {
      title: "Optionale Erlebnisse",
      subtitle: "Bereichere deine Reise mit Zusatzaktivitäten. Alles zu fairen lokalen Preisen."
    },
    pt: {
      title: "Experiências Opcionais",
      subtitle: "Melhore sua viagem com atividades adicionais. Tudo a preços locais justos."
    }
  };

  const t = content[language] || content.en;

  const localizedActivities = {
    en: {
      "surf-lessons": { title: "Surf Lessons", desc: "Ride the waves with local instructors" },
      "desert-excursion": { title: "Desert Excursion", desc: "Camels, dunes & stargazing" },
      "quad-adventure": { title: "Quad Adventure", desc: "Off-road desert exploration" },
      "cooking-class": { title: "Cooking Class", desc: "Traditional Moroccan cuisine" },
      "city-tour": { title: "City Tour", desc: "Discover the medina & souks" },
      "hammam-spa": { title: "Hammam & Spa", desc: "Authentic relaxation experience" },
      "nightlife-events": { title: "Nightlife Events", desc: "Rooftops & live music" },
      "cultural-workshop": { title: "Cultural Workshop", desc: "Pottery, henna, crafts" }
    },
    fr: {
      "surf-lessons": { title: "Cours de Surf", desc: "Surfez avec des instructeurs locaux" },
      "desert-excursion": { title: "Excursion Désert", desc: "Chameaux, dunes & étoiles" },
      "quad-adventure": { title: "Aventure Quad", desc: "Exploration hors-piste" },
      "cooking-class": { title: "Cours de Cuisine", desc: "Cuisine marocaine traditionnelle" },
      "city-tour": { title: "Visite Guidée", desc: "Découvrez la médina & les souks" },
      "hammam-spa": { title: "Hammam & Spa", desc: "Relaxation authentique" },
      "nightlife-events": { title: "Soirées", desc: "Rooftops & musique live" },
      "cultural-workshop": { title: "Atelier Culturel", desc: "Poterie, henné, artisanat" }
    },
    es: {
      "surf-lessons": { title: "Clases de Surf", desc: "Surfea con instructores locales" },
      "desert-excursion": { title: "Excursión Desierto", desc: "Camellos, dunas & estrellas" },
      "quad-adventure": { title: "Aventura Quad", desc: "Exploración todoterreno" },
      "cooking-class": { title: "Clase de Cocina", desc: "Cocina marroquí tradicional" },
      "city-tour": { title: "Tour Guiado", desc: "Descubre la medina & zocos" },
      "hammam-spa": { title: "Hammam & Spa", desc: "Relajación auténtica" },
      "nightlife-events": { title: "Vida Nocturna", desc: "Terrazas & música en vivo" },
      "cultural-workshop": { title: "Taller Cultural", desc: "Cerámica, henna, artesanía" }
    },
    de: {
      "surf-lessons": { title: "Surfkurse", desc: "Surfe mit lokalen Instruktoren" },
      "desert-excursion": { title: "Wüstenexkursion", desc: "Kamele, Dünen & Sterne" },
      "quad-adventure": { title: "Quad Abenteuer", desc: "Offroad Wüstenerkundung" },
      "cooking-class": { title: "Kochkurs", desc: "Traditionelle marokkanische Küche" },
      "city-tour": { title: "Stadttour", desc: "Entdecke die Medina & Souks" },
      "hammam-spa": { title: "Hammam & Spa", desc: "Authentische Entspannung" },
      "nightlife-events": { title: "Nachtleben", desc: "Dachterrassen & Live-Musik" },
      "cultural-workshop": { title: "Kultureller Workshop", desc: "Töpferei, Henna, Handwerk" }
    },
    pt: {
      "surf-lessons": { title: "Aulas de Surf", desc: "Surfe com instrutores locais" },
      "desert-excursion": { title: "Excursão Deserto", desc: "Camelos, dunas & estrelas" },
      "quad-adventure": { title: "Aventura Quad", desc: "Exploração off-road" },
      "cooking-class": { title: "Aula de Culinária", desc: "Culinária marroquina tradicional" },
      "city-tour": { title: "Tour Guiado", desc: "Descubra a medina & souks" },
      "hammam-spa": { title: "Hammam & Spa", desc: "Relaxamento autêntico" },
      "nightlife-events": { title: "Vida Noturna", desc: "Terraços & música ao vivo" },
      "cultural-workshop": { title: "Workshop Cultural", desc: "Cerâmica, henna, artesanato" }
    }
  };

  return (
    <section 
      id="optional" 
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-warmwhite"
      data-testid="optional-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-syne font-bold text-ocean mb-4 text-2xl sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="font-dm text-ocean/70 text-base sm:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {activities.map((act, index) => {
            const localized = localizedActivities[language]?.[act.id] || { title: act.title, desc: act.description };
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card 
                  className="bg-white border-none shadow-md hover:shadow-xl transition-all h-full group cursor-pointer"
                  data-testid={`activity-card-${act.id}`}
                >
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={act.image} 
                      alt={localized.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-syne font-bold text-sm sm:text-base text-ocean mb-1 line-clamp-1">
                      {localized.title}
                    </h3>
                    <p className="font-dm text-ocean/60 text-xs mb-2 line-clamp-1">
                      {localized.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-bold text-sunset text-base">
                        {act.currency}{act.price}
                      </span>
                      <div className="w-7 h-7 bg-sunset/10 text-sunset rounded-full flex items-center justify-center group-hover:bg-sunset group-hover:text-white transition-colors">
                        <Plus size={16} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Destination Section - Morocco
const DestinationSection = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Destination: Morocco",
      subtitle: "Where ancient traditions meet modern adventure",
      description: "From the Atlantic surf beaches of Taghazout to the golden dunes of the Sahara, from the vibrant medinas of Marrakech to the blue streets of Chefchaouen — Morocco offers an incredible backdrop for your journey.",
      highlights: [
        "Year-round sunshine & perfect weather",
        "Rich culture & friendly locals",
        "Diverse landscapes in one country",
        "Affordable & accessible from Europe"
      ]
    },
    fr: {
      title: "Destination : Maroc",
      subtitle: "Où traditions anciennes rencontrent aventure moderne",
      description: "Des plages de surf de Taghazout aux dunes dorées du Sahara, des médinas vibrantes de Marrakech aux rues bleues de Chefchaouen — le Maroc offre un cadre incroyable pour votre voyage.",
      highlights: [
        "Soleil toute l'année & météo parfaite",
        "Culture riche & habitants accueillants",
        "Paysages diversifiés en un seul pays",
        "Accessible & abordable depuis l'Europe"
      ]
    },
    es: {
      title: "Destino: Marruecos",
      subtitle: "Donde las tradiciones antiguas se encuentran con la aventura moderna",
      description: "Desde las playas de surf de Taghazout hasta las dunas doradas del Sahara, desde las vibrantes medinas de Marrakech hasta las calles azules de Chefchaouen — Marruecos ofrece un increíble escenario para tu viaje de transformación.",
      highlights: [
        "Sol todo el año & clima perfecto",
        "Rica cultura & gente amable",
        "Paisajes diversos en un solo país",
        "Asequible & accesible desde Europa"
      ]
    },
    de: {
      title: "Reiseziel: Marokko",
      subtitle: "Wo alte Traditionen auf moderne Abenteuer treffen",
      description: "Von den Surfstränden von Taghazout bis zu den goldenen Dünen der Sahara, von den lebhaften Medinas von Marrakesch bis zu den blauen Straßen von Chefchaouen — Marokko bietet eine unglaubliche Kulisse für deine Transformationsreise.",
      highlights: [
        "Ganzjährig Sonne & perfektes Wetter",
        "Reiche Kultur & freundliche Einheimische",
        "Vielfältige Landschaften in einem Land",
        "Erschwinglich & erreichbar von Europa"
      ]
    },
    pt: {
      title: "Destino: Marrocos",
      subtitle: "Onde tradições antigas encontram aventura moderna",
      description: "Das praias de surf de Taghazout às dunas douradas do Saara, das vibrantes medinas de Marraquexe às ruas azuis de Chefchaouen — Marrocos oferece um cenário incrível para sua jornada de transformação.",
      highlights: [
        "Sol o ano todo & clima perfeito",
        "Cultura rica & locais amigáveis",
        "Paisagens diversas em um só país",
        "Acessível & barato da Europa"
      ]
    }
  };

  const t = content[language] || content.en;

  return (
    <section 
      id="destination" 
      className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden"
      data-testid="destination-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-syne font-bold text-ocean mb-4 text-2xl sm:text-3xl md:text-4xl">
              {t.title}
            </h2>
            <p className="font-caveat text-sunset text-xl mb-4">
              {t.subtitle}
            </p>
            <p className="font-dm text-ocean/80 text-base sm:text-lg mb-6 leading-relaxed">
              {t.description}
            </p>
            
            <div className="space-y-3">
              {t.highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-sunset rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-white" size={14} />
                  </div>
                  <span className="font-dm text-ocean text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1760727466827-f11ca401116e?crop=entropy&cs=srgb&fm=jpg&w=400" 
                alt="Morocco medina"
                className="rounded-2xl aspect-[3/4] object-cover w-full shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1662009833223-75d3301290bd?crop=entropy&cs=srgb&fm=jpg&w=400" 
                alt="Morocco desert"
                className="rounded-2xl aspect-[3/4] object-cover mt-8 w-full shadow-lg"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-ocean text-white p-4 sm:p-5 rounded-xl shadow-xl">
              <p className="font-syne font-bold text-sand text-lg">Morocco</p>
              <p className="font-dm text-white/80 text-sm">North Africa</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Community Section
const CommunitySection = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      title: "Small Groups, Big Connections",
      description: "Join a carefully curated group of 8-12 international travelers. Our experiences are designed for meaningful connections — you'll train together, explore together, and create memories that last a lifetime.",
      features: [
        "Max 12 people per experience",
        "International & diverse groups",
        "Shared meals & social events",
        "Lifelong friendships"
      ],
      cta: "Join 500+ travelers"
    },
    fr: {
      title: "Petits Groupes, Grandes Connexions",
      description: "Rejoignez un groupe soigneusement sélectionné de 8-12 voyageurs internationaux. Nos expériences sont conçues pour des connexions significatives — vous vous entraînerez ensemble, explorerez ensemble et créerez des souvenirs qui dureront toute une vie.",
      features: [
        "Max 12 personnes par expérience",
        "Groupes internationaux & diversifiés",
        "Repas partagés & événements sociaux",
        "Amitiés pour la vie"
      ],
      cta: "Rejoignez 500+ voyageurs"
    },
    es: {
      title: "Grupos Pequeños, Grandes Conexiones",
      description: "Únete a un grupo cuidadosamente seleccionado de 8-12 viajeros internacionales. Nuestras experiencias están diseñadas para conexiones significativas — entrenarás juntos, explorarás juntos y crearás recuerdos que durarán toda la vida.",
      features: [
        "Máx 12 personas por experiencia",
        "Grupos internacionales y diversos",
        "Comidas compartidas y eventos sociales",
        "Amistades para toda la vida"
      ],
      cta: "Únete a 500+ viajeros"
    },
    de: {
      title: "Kleine Gruppen, Große Verbindungen",
      description: "Tritt einer sorgfältig ausgewählten Gruppe von 8-12 internationalen Reisenden bei. Unsere Erlebnisse sind für bedeutungsvolle Verbindungen konzipiert — ihr trainiert zusammen, erkundet zusammen und schafft Erinnerungen fürs Leben.",
      features: [
        "Max 12 Personen pro Erlebnis",
        "Internationale & diverse Gruppen",
        "Gemeinsame Mahlzeiten & Events",
        "Freundschaften fürs Leben"
      ],
      cta: "Schließe dich 500+ Reisenden an"
    },
    pt: {
      title: "Grupos Pequenos, Grandes Conexões",
      description: "Junte-se a um grupo cuidadosamente selecionado de 8-12 viajantes internacionais. Nossas experiências são projetadas para conexões significativas — vocês treinarão juntos, explorarão juntos e criarão memórias para toda a vida.",
      features: [
        "Máx 12 pessoas por experiência",
        "Grupos internacionais e diversos",
        "Refeições compartilhadas e eventos sociais",
        "Amizades para a vida toda"
      ],
      cta: "Junte-se a 500+ viajantes"
    }
  };

  const t = content[language] || content.en;
  
  return (
    <section 
      id="community" 
      className="py-16 sm:py-20 md:py-28 bg-ocean"
      data-testid="community-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-syne font-bold text-white mb-4 text-2xl sm:text-3xl md:text-4xl">
              {t.title}
            </h2>
            <p className="font-dm text-white/80 text-base sm:text-lg mb-6 leading-relaxed">
              {t.description}
            </p>
            
            <div className="space-y-3 mb-6">
              {t.features.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-sunset rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-white" size={14} />
                  </div>
                  <span className="font-dm text-white text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-sand rounded-full border-2 border-ocean flex items-center justify-center">
                    <User className="text-ocean" size={14} />
                  </div>
                ))}
              </div>
              <span className="font-caveat text-sand text-lg">{t.cta}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1758599669009-5a9002c09487?crop=entropy&cs=srgb&fm=jpg&w=400" 
                alt="Travelers hiking"
                className="rounded-2xl aspect-[3/4] object-cover w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1758272959063-ef8a2114f807?crop=entropy&cs=srgb&fm=jpg&w=400" 
                alt="Friends together"
                className="rounded-2xl aspect-[3/4] object-cover mt-8 w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Fair Price Catalogue Section
const CatalogueSection = ({ catalogue }) => {
  const { language } = useLanguage();
  const ct = catalogueTranslations[language] || catalogueTranslations.en;

  const getIcon = (iconName) => {
    const icons = {
      plane: <Plane size={20} />,
      waves: <Waves size={20} />,
      zap: <Zap size={20} />,
      sparkles: <Sparkles size={20} />,
      car: <Car size={20} />,
      chef: <UtensilsCrossed size={20} />,
      sun: <Sun size={20} />,
      map: <MapPinned size={20} />,
      heart: <Heart size={20} />,
      sunset: <Sun size={20} />,
      utensils: <UtensilsCrossed size={20} />
    };
    return icons[iconName] || <MapPin size={20} />;
  };

  const getLocalizedItem = (item) => {
    const localized = ct.items[item.id];
    if (localized) {
      return { ...item, activity: localized.activity, reason: localized.reason };
    }
    return item;
  };

  return (
    <section 
      id="catalogue" 
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-warmwhite"
      data-testid="catalogue-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-syne font-bold text-ocean mb-3 text-2xl sm:text-3xl md:text-4xl">
            {ct.title}
          </h2>
          <p className="font-dm text-sunset text-lg font-medium mb-3">
            {ct.subtitle}
          </p>
          <p className="font-dm text-ocean/60 text-xs sm:text-sm italic max-w-2xl mx-auto">
            {ct.disclaimer}
          </p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:block overflow-hidden rounded-2xl border border-border shadow-lg"
        >
          <table className="w-full" data-testid="catalogue-table">
            <thead className="bg-ocean text-white">
              <tr>
                <th className="py-4 px-6 text-left font-syne font-bold">{ct.columns.activity}</th>
                <th className="py-4 px-6 text-center font-syne font-bold">{ct.columns.priceEur}</th>
                <th className="py-4 px-6 text-center font-syne font-bold">{ct.columns.priceMad}</th>
                <th className="py-4 px-6 text-left font-syne font-bold">{ct.columns.reason}</th>
              </tr>
            </thead>
            <tbody>
              {catalogue.map((item, index) => {
                const localizedItem = getLocalizedItem(item);
                return (
                  <tr 
                    key={item.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-warmwhite'} hover:bg-sand/20 transition-colors`}
                    data-testid={`catalogue-row-${item.id}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sunset/10 rounded-full flex items-center justify-center text-sunset">
                          {getIcon(item.icon)}
                        </div>
                        <span className="font-dm font-medium text-ocean">{localizedItem.activity}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-syne font-bold text-lg text-ocean">{item.price_eur} €</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-dm text-ocean/70">{item.price_mad} MAD</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-dm text-ocean/70 text-sm">{localizedItem.reason}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {catalogue.map((item, index) => {
            const localizedItem = getLocalizedItem(item);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border-none shadow-md" data-testid={`catalogue-card-${item.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-sunset/10 rounded-full flex items-center justify-center text-sunset flex-shrink-0">
                        {getIcon(item.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-dm font-semibold text-ocean text-sm">{localizedItem.activity}</h3>
                        <p className="font-dm text-ocean/60 text-xs mt-1">{localizedItem.reason}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <div className="text-center">
                        <p className="font-dm text-xs text-ocean/60">EUR</p>
                        <p className="font-syne font-bold text-sunset">{item.price_eur} €</p>
                      </div>
                      <div className="text-center">
                        <p className="font-dm text-xs text-ocean/60">MAD</p>
                        <p className="font-dm font-medium text-ocean">{item.price_mad}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Ethical Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16"
        >
          <Card className="bg-gradient-to-br from-ocean to-ocean/90 border-none overflow-hidden" data-testid="ethical-commitment">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-sand" size={32} />
                </div>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-2">
                  {ct.commitment.title}
                </h3>
                <p className="font-dm text-white/80 text-lg">
                  {ct.commitment.intro}
                </p>
              </div>

              <p className="font-dm text-white/90 text-center text-base sm:text-lg mb-8 max-w-3xl mx-auto">
                {ct.commitment.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="w-12 h-12 bg-sunset rounded-full flex items-center justify-center mb-4">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h4 className="font-syne font-bold text-white mb-2">{ct.commitment.noCommission}</h4>
                  <p className="font-dm text-white/70 text-sm">{ct.commitment.noCommissionText}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mb-4">
                    <Check className="text-ocean" size={24} />
                  </div>
                  <h4 className="font-syne font-bold text-white mb-2">{ct.commitment.transparency}</h4>
                  <p className="font-dm text-white/70 text-sm">{ct.commitment.transparencyText}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                    <HandHeart className="text-sunset" size={24} />
                  </div>
                  <h4 className="font-syne font-bold text-white mb-2">{ct.commitment.mission}</h4>
                  <p className="font-dm text-white/70 text-sm">{ct.commitment.missionText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ experiences, onSubmit, isSubmitting }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "", trip_interest: "" });

  const content = {
    en: {
      title: "Information Request",
      subtitle: "Have a question about our experiences? Send us a message.",
      name: "Your Name",
      namePlaceholder: "Enter your name",
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      interested: "Which experience interests you?",
      selectExperience: "Select an experience",
      generalInquiry: "General Inquiry",
      message: "Your Message",
      messagePlaceholder: "Tell us about yourself, your goals, or any questions...",
      sendMessage: "Send Message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successDesc: "We'll get back to you within 24 hours.",
      errorTitle: "Error sending message",
      errorDesc: "Please try again or email us directly."
    },
    fr: {
      title: "Demande d'Information",
      subtitle: "Une question sur nos expériences ? Envoyez-nous un message.",
      name: "Votre Nom",
      namePlaceholder: "Entrez votre nom",
      email: "Adresse Email",
      emailPlaceholder: "votre@email.com",
      interested: "Quelle expérience vous intéresse ?",
      selectExperience: "Sélectionnez une expérience",
      generalInquiry: "Demande Générale",
      message: "Votre Message",
      messagePlaceholder: "Parlez-nous de vous, vos objectifs ou vos questions...",
      sendMessage: "Envoyer le Message",
      sending: "Envoi en cours...",
      successTitle: "Message envoyé !",
      successDesc: "Nous vous répondrons dans les 24 heures.",
      errorTitle: "Erreur d'envoi",
      errorDesc: "Veuillez réessayer ou nous contacter directement."
    },
    es: {
      title: "Solicitud de Información",
      subtitle: "¿Tienes una pregunta sobre nuestras experiencias? Envíanos un mensaje.",
      name: "Tu Nombre",
      namePlaceholder: "Ingresa tu nombre",
      email: "Correo Electrónico",
      emailPlaceholder: "tu@email.com",
      interested: "¿Qué experiencia te interesa?",
      selectExperience: "Selecciona una experiencia",
      generalInquiry: "Consulta General",
      message: "Tu Mensaje",
      messagePlaceholder: "Cuéntanos sobre ti, tus metas o preguntas...",
      sendMessage: "Enviar Mensaje",
      sending: "Enviando...",
      successTitle: "¡Mensaje enviado!",
      successDesc: "Te responderemos en 24 horas.",
      errorTitle: "Error al enviar",
      errorDesc: "Por favor intenta de nuevo o escríbenos directamente."
    },
    de: {
      title: "Informationsanfrage",
      subtitle: "Haben Sie eine Frage zu unseren Erlebnissen? Senden Sie uns eine Nachricht.",
      name: "Dein Name",
      namePlaceholder: "Gib deinen Namen ein",
      email: "E-Mail Adresse",
      emailPlaceholder: "deine@email.com",
      interested: "Welches Erlebnis interessiert dich?",
      selectExperience: "Wähle ein Erlebnis",
      generalInquiry: "Allgemeine Anfrage",
      message: "Deine Nachricht",
      messagePlaceholder: "Erzähl uns von dir, deinen Zielen oder Fragen...",
      sendMessage: "Nachricht Senden",
      sending: "Wird gesendet...",
      successTitle: "Nachricht gesendet!",
      successDesc: "Wir melden uns innerhalb von 24 Stunden.",
      errorTitle: "Fehler beim Senden",
      errorDesc: "Bitte versuche es erneut oder schreib uns direkt."
    },
    pt: {
      title: "Comece Sua Jornada",
      subtitle: "Pronto para transformar sua próxima viagem em uma experiência? Entre em contato.",
      name: "Seu Nome",
      namePlaceholder: "Digite seu nome",
      email: "Endereço de Email",
      emailPlaceholder: "seu@email.com",
      interested: "Qual experiência te interessa?",
      selectExperience: "Selecione uma experiência",
      generalInquiry: "Consulta Geral",
      message: "Sua Mensagem",
      messagePlaceholder: "Conte-nos sobre você, seus objetivos ou perguntas...",
      sendMessage: "Enviar Mensagem",
      sending: "Enviando...",
      successTitle: "Mensagem enviada!",
      successDesc: "Responderemos em 24 horas.",
      errorTitle: "Erro ao enviar",
      errorDesc: "Por favor tente novamente ou envie-nos um email."
    }
  };

  const t = content[language] || content.en;

  const experienceLabels = {
    en: {
      'self-defense-holiday': 'Self-Defense Holiday',
      'language-holiday': 'Language Practice Holiday',
      'visual-storytelling': 'Visual Storytelling Holiday'
    },
    fr: {
      'self-defense-holiday': 'Séjour Self-Défense',
      'language-holiday': 'Séjour Pratique Linguistique',
      'visual-storytelling': 'Séjour Storytelling Visuel'
    },
    es: {
      'self-defense-holiday': 'Vacaciones de Defensa Personal',
      'language-holiday': 'Vacaciones de Idiomas',
      'visual-storytelling': 'Vacaciones de Storytelling'
    },
    de: {
      'self-defense-holiday': 'Selbstverteidigung Urlaub',
      'language-holiday': 'Sprachpraxis Urlaub',
      'visual-storytelling': 'Visual Storytelling Urlaub'
    },
    pt: {
      'self-defense-holiday': 'Férias de Defesa Pessoal',
      'language-holiday': 'Férias de Idiomas',
      'visual-storytelling': 'Férias de Storytelling'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, t);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-white" data-testid="contact-section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-syne font-bold text-ocean mb-4 text-2xl sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="font-dm text-ocean/70 text-base sm:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-warmwhite border-none shadow-xl">
            <CardContent className="p-5 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="font-dm font-medium text-ocean flex items-center gap-2 text-sm">
                      <User size={16} />
                      {t.name}
                    </label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      required
                      className="border-border focus:border-sunset rounded-xl py-5"
                      data-testid="contact-name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-dm font-medium text-ocean flex items-center gap-2 text-sm">
                      <Mail size={16} />
                      {t.email}
                    </label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      required
                      className="border-border focus:border-sunset rounded-xl py-5"
                      data-testid="contact-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-dm font-medium text-ocean flex items-center gap-2 text-sm">
                    <Target size={16} />
                    {t.interested}
                  </label>
                  <Select 
                    value={formData.trip_interest} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, trip_interest: value }))}
                  >
                    <SelectTrigger className="border-border focus:border-sunset rounded-xl py-5" data-testid="contact-experience-select">
                      <SelectValue placeholder={t.selectExperience} />
                    </SelectTrigger>
                    <SelectContent>
                      {experiences.map(exp => (
                        <SelectItem key={exp.id} value={exp.title}>
                          {experienceLabels[language]?.[exp.id] || exp.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="general">{t.generalInquiry}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="font-dm font-medium text-ocean flex items-center gap-2 text-sm">
                    <MessageSquare size={16} />
                    {t.message}
                  </label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    rows={4}
                    required
                    className="border-border focus:border-sunset rounded-xl resize-none"
                    data-testid="contact-message"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full py-6 font-syne font-bold"
                  data-testid="contact-submit"
                >
                  {isSubmitting ? t.sending : t.sendMessage}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      description: "Travel • Practice • Experience. Transform your next trip into a journey of growth, connection, and unforgettable memories in Morocco.",
      experiencesTitle: "Experiences",
      contactTitle: "Contact",
      companyInfo: "Company Info",
      getInTouch: "Get in Touch",
      rights: "All rights reserved.",
      foundedBy: "Founded by"
    },
    fr: {
      description: "Voyage • Pratique • Expérience. Transformez votre prochain voyage en un parcours de croissance, de connexion et de souvenirs inoubliables au Maroc.",
      experiencesTitle: "Expériences",
      contactTitle: "Contact",
      companyInfo: "Info Entreprise",
      getInTouch: "Nous Contacter",
      rights: "Tous droits réservés.",
      foundedBy: "Fondé par"
    },
    es: {
      description: "Viaja • Practica • Experimenta. Transforma tu próximo viaje en un recorrido de crecimiento, conexión y recuerdos inolvidables en Marruecos.",
      experiencesTitle: "Experiencias",
      contactTitle: "Contacto",
      companyInfo: "Info Empresa",
      getInTouch: "Contáctanos",
      rights: "Todos los derechos reservados.",
      foundedBy: "Fundado por"
    },
    de: {
      description: "Reisen • Üben • Erleben. Verwandle deine nächste Reise in eine Reise des Wachstums, der Verbindung und unvergesslicher Erinnerungen in Marokko.",
      experiencesTitle: "Erlebnisse",
      contactTitle: "Kontakt",
      companyInfo: "Firmeninfo",
      getInTouch: "Kontaktiere Uns",
      rights: "Alle Rechte vorbehalten.",
      foundedBy: "Gegründet von"
    },
    pt: {
      description: "Viaje • Pratique • Experimente. Transforme sua próxima viagem em uma jornada de crescimento, conexão e memórias inesquecíveis em Marrocos.",
      experiencesTitle: "Experiências",
      contactTitle: "Contato",
      companyInfo: "Info da Empresa",
      getInTouch: "Entre em Contato",
      rights: "Todos os direitos reservados.",
      foundedBy: "Fundado por"
    }
  };

  const t = content[language] || content.en;

  const experienceLabels = {
    en: ['Self-Defense Holiday', 'Language Holiday', 'Storytelling Holiday'],
    fr: ['Séjour Self-Défense', 'Séjour Langues', 'Séjour Storytelling'],
    es: ['Vacaciones Defensa Personal', 'Vacaciones Idiomas', 'Vacaciones Storytelling'],
    de: ['Kampf Urlaub', 'Sprach Urlaub', 'Storytelling Urlaub'],
    pt: ['Férias Defesa Pessoal', 'Férias Idiomas', 'Férias Storytelling']
  };

  return (
    <footer className="bg-ocean py-10 sm:py-12 px-4 sm:px-6 md:px-12" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2">
            <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-3">THE BRIDGE</h3>
            <p className="font-dm text-white/70 mb-5 max-w-md text-sm">
              {t.description}
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/in/karim-naimi-b1aa1139/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-sunset transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin className="text-white" size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-sunset transition-colors"
                data-testid="footer-instagram"
              >
                <Instagram className="text-white" size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white mb-4 text-sm">{t.experiencesTitle}</h4>
            <ul className="space-y-2 font-dm text-white/70 text-sm">
              {(experienceLabels[language] || experienceLabels.en).map((label, i) => (
                <li key={i}><a href="#experiences" className="hover:text-sunset transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white mb-4 text-sm">{t.contactTitle}</h4>
            <ul className="space-y-2 font-dm text-white/70 text-sm">
              <li>
                <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/unyceo-fr-953646577" target="_blank" rel="noopener noreferrer" className="hover:text-sunset transition-colors">
                  {t.companyInfo}
                </a>
              </li>
              <li><a href="#contact" className="hover:text-sunset transition-colors">{t.getInTouch}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-dm text-white/60 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} THE BRIDGE. {t.rights}
          </p>
          <p className="font-dm text-white/60 text-xs text-center sm:text-right">
            {t.foundedBy} <span className="text-sand">Naimi Mohamed Karim</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Content
const AppContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [activities, setActivities] = useState([]);
  const [catalogue, setCatalogue] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, actRes, catRes] = await Promise.all([
          axios.get(`${API}/experiences`),
          axios.get(`${API}/activities`),
          axios.get(`${API}/catalogue`)
        ]);
        setExperiences(expRes.data);
        setActivities(actRes.data);
        setCatalogue(catRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleContactSubmit = async (formData, t) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success(t.successTitle, { description: t.successDesc });
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast.error(t.errorTitle, { description: t.errorDesc });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <Navigation scrolled={scrolled} />
      <HeroSection />
      <HowItWorksSection />
      <ExperiencesSection experiences={experiences} />
      <DestinationSection />
      <CommunitySection />
      <ContactSection experiences={experiences} onSubmit={handleContactSubmit} isSubmitting={isSubmitting} />
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LanguageProvider>
          <Routes>
            {/* Home */}
            <Route path="/" element={<AppContent />} />
            
            {/* Experiences */}
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/experiences/self-defense" element={<SelfDefensePage />} />
            <Route path="/experiences/language-practice" element={<LanguagePracticePage />} />
            <Route path="/experiences/visual-storytelling" element={<VisualStorytellingPage />} />
            
            {/* Legacy route for language practice */}
            <Route path="/language-practice" element={<LanguagePracticePage />} />
            
            {/* Destinations */}
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/casablanca" element={<CasablancaPage />} />
            <Route path="/destinations/agadir" element={<AgadirPage />} />
            <Route path="/destinations/marrakech" element={<MarrakechPage />} />
            
            {/* Other pages */}
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/cgv" element={<CGVPage />} />
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/confidentialite" element={<ConfidentialitePage />} />
          </Routes>
          <CookieBanner />
        </LanguageProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
