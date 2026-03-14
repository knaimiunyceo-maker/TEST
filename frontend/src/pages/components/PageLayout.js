import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Menu, X, ChevronDown, ArrowLeft, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../LanguageContext";
import SEO from "../../components/SEO";

// Translations for PageLayout
const layoutTranslations = {
  en: {
    home: "Home",
    experiences: "Experiences",
    selfDefense: "Self-Defense",
    languagePractice: "Language Practice",
    visualStorytelling: "Visual Storytelling",
    destinations: "Destinations",
    activities: "Activities",
    howItWorks: "How it Works",
    about: "About",
    bookNow: "Book Now",
    company: "Company",
    cgv: "Terms & Conditions",
    legal: "Legal Notice",
    privacy: "Privacy Policy",
    rights: "All rights reserved."
  },
  fr: {
    home: "Accueil",
    experiences: "Expériences",
    selfDefense: "Self-Defense",
    languagePractice: "Language Practice",
    visualStorytelling: "Visual Storytelling",
    destinations: "Destinations",
    activities: "Activités",
    howItWorks: "Comment ça marche",
    about: "À propos",
    bookNow: "Réserver",
    company: "Entreprise",
    cgv: "CGV",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    rights: "Tous droits réservés."
  },
  es: {
    home: "Inicio",
    experiences: "Experiencias",
    selfDefense: "Defensa Personal",
    languagePractice: "Práctica de Idiomas",
    visualStorytelling: "Storytelling Visual",
    destinations: "Destinos",
    activities: "Actividades",
    howItWorks: "Cómo Funciona",
    about: "Acerca de",
    bookNow: "Reservar",
    company: "Empresa",
    cgv: "Términos y Condiciones",
    legal: "Aviso Legal",
    privacy: "Privacidad",
    rights: "Todos los derechos reservados."
  },
  pt: {
    home: "Início",
    experiences: "Experiências",
    selfDefense: "Defesa Pessoal",
    languagePractice: "Prática de Idiomas",
    visualStorytelling: "Storytelling Visual",
    destinations: "Destinos",
    activities: "Atividades",
    howItWorks: "Como Funciona",
    about: "Sobre",
    bookNow: "Reservar",
    company: "Empresa",
    cgv: "Termos e Condições",
    legal: "Aviso Legal",
    privacy: "Privacidade",
    rights: "Todos os direitos reservados."
  },
  de: {
    home: "Startseite",
    experiences: "Erlebnisse",
    selfDefense: "Selbstverteidigung",
    languagePractice: "Sprachpraxis",
    visualStorytelling: "Visual Storytelling",
    destinations: "Reiseziele",
    activities: "Aktivitäten",
    howItWorks: "So funktioniert's",
    about: "Über uns",
    bookNow: "Buchen",
    company: "Unternehmen",
    cgv: "AGB",
    legal: "Impressum",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten."
  },
  it: {
    home: "Home",
    experiences: "Esperienze",
    selfDefense: "Autodifesa",
    languagePractice: "Pratica Linguistica",
    visualStorytelling: "Visual Storytelling",
    destinations: "Destinazioni",
    activities: "Attività",
    howItWorks: "Come Funziona",
    about: "Chi siamo",
    bookNow: "Prenota",
    company: "Azienda",
    cgv: "Termini e Condizioni",
    legal: "Note Legali",
    privacy: "Privacy",
    rights: "Tutti i diritti riservati."
  }
};

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" }
];

const PageLayout = ({ children, showBackButton = true, seoPage = null, seoTitle = null, seoDescription = null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();
  const t = layoutTranslations[language] || layoutTranslations.en;

  // Auto-detect SEO page from location
  const detectSeoPage = () => {
    if (seoPage) return seoPage;
    const path = location.pathname;
    if (path.startsWith('/experiences')) return 'experiences';
    if (path.startsWith('/destinations')) return 'destinations';
    if (path === '/book') return 'book';
    if (path === '/about') return 'about';
    if (path === '/how-it-works') return 'howItWorks';
    return null;
  };

  const NAV_ITEMS = [
    { label: t.home, href: "/" },
    { 
      label: t.experiences, 
      href: "/experiences",
      submenu: [
        { label: t.selfDefense, href: "/experiences/self-defense" },
        { label: t.languagePractice, href: "/experiences/language-practice" },
        { label: t.visualStorytelling, href: "/experiences/visual-storytelling" }
      ]
    },
    { 
      label: t.destinations, 
      href: "/destinations",
      submenu: [
        { label: "Casablanca", href: "/destinations/casablanca" },
        { label: "Marrakech", href: "/destinations/marrakech" },
        { label: "Agadir", href: "/destinations/agadir" }
      ]
    },
    { label: t.activities, href: "/activities" },
    { label: t.howItWorks, href: "/how-it-works" },
    { label: t.about, href: "/about" }
  ];

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-warmwhite">
      {/* SEO */}
      {detectSeoPage() && <SEO page={detectSeoPage()} customTitle={seoTitle} customDescription={seoDescription} />}
      
      {/* Navigation */}
      <header className="bg-ocean text-white py-4 px-4 sm:px-6 lg:px-12 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-syne font-bold text-xl text-white hover:text-sand transition-colors">
            THE BRIDGE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                {item.submenu ? (
                  <>
                    <Link 
                      to={item.href}
                      className={`font-dm text-sm flex items-center gap-1 py-2 transition-colors ${
                        location.pathname.startsWith(item.href) ? "text-sand" : "text-white hover:text-sand"
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </Link>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="bg-white rounded-lg shadow-xl py-2 min-w-[200px]">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className="block px-4 py-2 font-dm text-sm text-ocean hover:bg-sand/20 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    to={item.href}
                    className={`font-dm text-sm py-2 transition-colors ${
                      location.pathname === item.href ? "text-sand" : "text-white hover:text-sand"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-dm text-sm"
                data-testid="language-selector-page"
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.name}</span>
                <ChevronDown size={14} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[160px] z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left font-dm text-sm flex items-center gap-3 hover:bg-sand/20 transition-colors ${
                        language === lang.code ? 'bg-sand/10 text-sunset' : 'text-ocean'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button asChild className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-6 font-dm text-sm">
              <Link to="/book">{t.bookNow}</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Language Selector */}
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <span>{currentLang.flag}</span>
              <ChevronDown size={12} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Language Dropdown */}
        {langMenuOpen && (
          <div className="lg:hidden absolute right-4 top-16 bg-white rounded-lg shadow-xl py-2 min-w-[160px] z-50">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setLangMenuOpen(false);
                }}
                className={`w-full px-4 py-2 text-left font-dm text-sm flex items-center gap-3 hover:bg-sand/20 transition-colors ${
                  language === lang.code ? 'bg-sand/10 text-sunset' : 'text-ocean'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="mt-4 pb-4 border-t border-white/20 pt-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex items-center justify-between py-3 font-dm text-white"
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${openSubmenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${openSubmenu === item.label ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="pl-4 pb-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className="block py-2 font-dm text-sm text-white/80 hover:text-sand transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block py-3 font-dm text-white hover:text-sand transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Button asChild className="w-full mt-4 bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm">
              <Link to="/book" onClick={() => setMobileMenuOpen(false)}>{t.bookNow}</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-ocean py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-syne font-bold text-white text-lg mb-2">THE BRIDGE</h3>
              <p className="font-caveat text-sand text-lg">Travel • Practice • Experience</p>
            </div>
            
            {/* Experiences */}
            <div>
              <h4 className="font-dm font-semibold text-white mb-3 text-sm">{t.experiences}</h4>
              <ul className="space-y-2">
                <li><Link to="/experiences/self-defense" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.selfDefense}</Link></li>
                <li><Link to="/experiences/language-practice" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.languagePractice}</Link></li>
                <li><Link to="/experiences/visual-storytelling" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.visualStorytelling}</Link></li>
              </ul>
            </div>
            
            {/* Destinations */}
            <div>
              <h4 className="font-dm font-semibold text-white mb-3 text-sm">{t.destinations}</h4>
              <ul className="space-y-2">
                <li><Link to="/destinations/casablanca" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">Casablanca</Link></li>
                <li><Link to="/destinations/marrakech" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">Marrakech</Link></li>
                <li><Link to="/destinations/agadir" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">Agadir</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-dm font-semibold text-white mb-3 text-sm">{t.company}</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.about}</Link></li>
                <li><Link to="/how-it-works" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.howItWorks}</Link></li>
                <li><Link to="/activities" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.activities}</Link></li>
                <li><Link to="/cgv" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.cgv}</Link></li>
                <li><Link to="/mentions-legales" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.legal}</Link></li>
                <li><Link to="/confidentialite" className="font-dm text-white/60 text-sm hover:text-sand transition-colors">{t.privacy}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="font-dm text-white/60 text-xs">
              © {new Date().getFullYear()} THE BRIDGE — UNYCEO France. {t.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
