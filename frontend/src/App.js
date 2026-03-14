import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { 
  Menu, X, Globe, ChevronDown, Instagram, Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "./LanguageContext";

// Page imports
import HomePage from "./pages/HomePage";
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
import BookSuccessPage from "./pages/BookSuccessPage";
import CookieBanner from "./components/CookieBanner";

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

  const navLabels = {
    experiences: { en: 'Experiences', fr: 'Expériences', es: 'Experiencias', de: 'Erlebnisse', pt: 'Experiências', it: 'Esperienze' },
    howItWorks: { en: 'How It Works', fr: 'Comment ça marche', es: 'Cómo funciona', de: "So funktioniert's", pt: 'Como funciona', it: 'Come funziona' },
    activities: { en: 'Activities', fr: 'Activités', es: 'Actividades', de: 'Aktivitäten', pt: 'Atividades', it: 'Attività' },
    destinations: { en: 'Destinations', fr: 'Destinations', es: 'Destinos', de: 'Reiseziele', pt: 'Destinos', it: 'Destinazioni' },
    about: { en: 'About', fr: 'À propos', es: 'Acerca de', de: 'Über uns', pt: 'Sobre', it: 'Chi siamo' },
    bookNow: { en: 'Book Now', fr: 'Réserver', es: 'Reservar', de: 'Buchen', pt: 'Reservar', it: 'Prenota' }
  };

  const navLinks = [
    { href: "/experiences", label: navLabels.experiences[language] || navLabels.experiences.en, isRoute: true },
    { href: "/how-it-works", label: navLabels.howItWorks[language] || navLabels.howItWorks.en, isRoute: true },
    { href: "/activities", label: navLabels.activities[language] || navLabels.activities.en, isRoute: true },
    { href: "/destinations", label: navLabels.destinations[language] || navLabels.destinations.en, isRoute: true },
    { href: "/about", label: navLabels.about[language] || navLabels.about.en, isRoute: true },
  ];

  const bookNowLabel = navLabels.bookNow[language] || navLabels.bookNow.en;

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

// Footer
const Footer = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      experiencesTitle: "Experiences",
      destinationsTitle: "Destinations",
      companyTitle: "Company",
      rights: "All rights reserved.",
      foundedBy: "Founded by"
    },
    fr: {
      experiencesTitle: "Expériences",
      destinationsTitle: "Destinations",
      companyTitle: "Entreprise",
      rights: "Tous droits réservés.",
      foundedBy: "Fondé par"
    },
    es: {
      experiencesTitle: "Experiencias",
      destinationsTitle: "Destinos",
      companyTitle: "Empresa",
      rights: "Todos los derechos reservados.",
      foundedBy: "Fundado por"
    },
    de: {
      experiencesTitle: "Erlebnisse",
      destinationsTitle: "Reiseziele",
      companyTitle: "Unternehmen",
      rights: "Alle Rechte vorbehalten.",
      foundedBy: "Gegründet von"
    },
    pt: {
      experiencesTitle: "Experiências",
      destinationsTitle: "Destinos",
      companyTitle: "Empresa",
      rights: "Todos os direitos reservados.",
      foundedBy: "Fundado por"
    },
    it: {
      experiencesTitle: "Esperienze",
      destinationsTitle: "Destinazioni",
      companyTitle: "Azienda",
      rights: "Tutti i diritti riservati.",
      foundedBy: "Fondato da"
    }
  };

  const t = content[language] || content.en;

  return (
    <footer className="bg-ocean py-10 sm:py-12 px-4 sm:px-6 md:px-12" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-syne font-bold text-xl text-white mb-2">THE BRIDGE</h3>
            <p className="font-caveat text-sand text-lg">Travel • Practice • Experience</p>
            <div className="flex gap-3 mt-4">
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

          {/* Experiences */}
          <div>
            <h4 className="font-dm font-semibold text-white mb-4 text-sm">{t.experiencesTitle}</h4>
            <ul className="space-y-2 font-dm text-white/70 text-sm">
              <li><Link to="/experiences/self-defense" className="hover:text-sand transition-colors">Self-Defense</Link></li>
              <li><Link to="/experiences/language-practice" className="hover:text-sand transition-colors">Language Practice</Link></li>
              <li><Link to="/experiences/visual-storytelling" className="hover:text-sand transition-colors">Visual Storytelling</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-dm font-semibold text-white mb-4 text-sm">{t.destinationsTitle}</h4>
            <ul className="space-y-2 font-dm text-white/70 text-sm">
              <li><Link to="/destinations/casablanca" className="hover:text-sand transition-colors">Casablanca</Link></li>
              <li><Link to="/destinations/marrakech" className="hover:text-sand transition-colors">Marrakech</Link></li>
              <li><Link to="/destinations/agadir" className="hover:text-sand transition-colors">Agadir</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-dm font-semibold text-white mb-4 text-sm">{t.companyTitle}</h4>
            <ul className="space-y-2 font-dm text-white/70 text-sm">
              <li><Link to="/about" className="hover:text-sand transition-colors">About</Link></li>
              <li><Link to="/how-it-works" className="hover:text-sand transition-colors">How it Works</Link></li>
              <li><Link to="/activities" className="hover:text-sand transition-colors">Activities</Link></li>
              <li><Link to="/cgv" className="hover:text-sand transition-colors">CGV</Link></li>
              <li><Link to="/mentions-legales" className="hover:text-sand transition-colors">Mentions légales</Link></li>
              <li><Link to="/confidentialite" className="hover:text-sand transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-dm text-white/60 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} THE BRIDGE — UNYCEO France. {t.rights}
          </p>
          <p className="font-dm text-white/60 text-xs text-center sm:text-right">
            {t.foundedBy} <span className="text-sand">Naimi Mohamed Karim</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Layout (with Navigation and Footer)
const HomePageLayout = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navigation scrolled={scrolled} />
      <HomePage scrolled={scrolled} />
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
            <Route path="/" element={<HomePageLayout />} />
            
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
            <Route path="/book/success" element={<BookSuccessPage />} />
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
