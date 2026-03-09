import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Waves, Mountain, Sun, Users, MapPin, Calendar, 
  ArrowRight, Menu, X, Mail, User, MessageSquare,
  ChevronRight, Instagram, Linkedin, Play, Pause,
  Globe, ChevronDown, Check, Plus
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
import { packageTranslations, activityTranslations, tripTranslations } from "./translations";

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
  const { t } = useLanguage();

  const navLinks = [
    { href: "#packages", label: t.nav.experiences },
    { href: "#trips", label: t.nav.upcomingTrips },
    { href: "#community", label: t.nav.community },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

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
        <a 
          href="#hero" 
          className={`font-syne font-bold text-xl sm:text-2xl tracking-tight whitespace-nowrap ${
            scrolled ? "text-ocean" : "text-white"
          }`}
          data-testid="logo-link"
        >
          THE BRIDGE
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link font-dm font-medium text-sm whitespace-nowrap ${
                scrolled ? "text-ocean" : "text-white"
              } hover:text-sunset transition-colors`}
              data-testid={`nav-${link.href.slice(1)}`}
            >
              {link.label}
            </a>
          ))}
          <LanguageSelector scrolled={scrolled} />
          <Button
            asChild
            className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-4 xl:px-6 font-dm font-semibold text-sm"
            data-testid="nav-book-btn"
          >
            <a href="#contact">{t.nav.bookNow}</a>
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
              <a
                key={link.href}
                href={link.href}
                className="font-dm font-medium text-ocean py-3 text-lg border-b border-border/50 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm font-semibold mt-4 py-6 text-lg"
            >
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.bookNow}
              </a>
            </Button>
            <LanguageSelector isMobile={true} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const { t } = useLanguage();

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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-caveat text-sand text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-4"
        >
          {t.hero.welcome}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-syne font-extrabold text-white mb-4 sm:mb-6 leading-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          data-testid="hero-title"
        >
          {t.hero.title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-dm text-white/90 text-base sm:text-lg md:text-xl mb-2 max-w-2xl mx-auto px-2"
          data-testid="hero-subtitle"
        >
          {t.hero.subtitle}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-caveat text-sand text-xl sm:text-2xl mb-6 sm:mb-10"
        >
          {t.hero.tagline}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <Button
            asChild
            size="lg"
            className="btn-primary bg-sunset hover:bg-sunset/90 text-white rounded-full px-6 sm:px-8 py-6 text-base sm:text-lg font-syne font-bold w-full sm:w-auto min-h-[44px]"
            data-testid="hero-cta"
          >
            <a href="#packages">
              {t.hero.exploreBtn}
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
            <a href="#trips">{t.hero.viewTrips}</a>
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
        transition={{ delay: 1.2 }}
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

// Concept Section
const ConceptSection = () => {
  const { t } = useLanguage();
  
  return (
    <section 
      id="concept" 
      className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 bg-warmwhite"
      data-testid="concept-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-syne font-bold text-ocean mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl">
            {t.concept.title}
          </h2>
          <p className="font-dm text-ocean/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            {t.concept.description} <span className="text-sunset font-semibold">{t.concept.people}</span>, 
            <span className="text-sunset font-semibold"> {t.concept.connections}</span> {' '}
            <span className="text-sunset font-semibold">{t.concept.sharedExperiences}</span>. 
            {' '}{t.concept.descriptionEnd}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            { icon: <Users className="text-sunset" size={32} />, title: t.concept.meetPeople, description: t.concept.meetPeopleDesc },
            { icon: <Mountain className="text-sunset" size={32} />, title: t.concept.liveAdventures, description: t.concept.liveAdventuresDesc },
            { icon: <Sun className="text-sunset" size={32} />, title: t.concept.discoverCulture, description: t.concept.discoverCultureDesc }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-5 sm:p-6 md:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-sand/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-syne font-bold text-lg sm:text-xl text-ocean mb-2 sm:mb-3">{item.title}</h3>
                  <p className="font-dm text-ocean/70 text-sm sm:text-base">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Packages Section
const PackagesSection = ({ packages }) => {
  const { t, language } = useLanguage();
  
  const getLocalizedPackage = (pkg) => {
    const localizedData = packageTranslations[language]?.[pkg.id];
    if (localizedData) {
      return { ...pkg, title: localizedData.title, description: localizedData.description, inclusions: localizedData.inclusions };
    }
    return pkg;
  };

  return (
    <section 
      id="packages" 
      className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 bg-ocean"
      data-testid="packages-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-syne font-bold text-white mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
            {t.packages.title}
          </h2>
          <p className="font-dm text-white/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
            {t.packages.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {packages.map((pkg, index) => {
            const localizedPkg = getLocalizedPackage(pkg);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className={`experience-card bg-white border-none overflow-hidden h-full flex flex-col ${
                    index === 1 ? "ring-4 ring-sand md:scale-105" : ""
                  }`}
                  data-testid={`package-card-${pkg.id}`}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={localizedPkg.title}
                      className="card-image w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-syne font-bold text-lg sm:text-xl text-ocean">
                        {localizedPkg.title}
                      </h3>
                      <span className="font-dm text-xs sm:text-sm text-ocean/60 bg-sand/20 px-2 py-1 rounded-full">
                        {pkg.duration}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <span className="font-dm text-sm text-ocean/60">{t.packages.from}</span>
                      <span className="font-syne font-bold text-2xl sm:text-3xl text-sunset ml-2">
                        {pkg.currency}{pkg.price}
                      </span>
                    </div>
                    
                    <p className="font-dm text-ocean/70 text-sm mb-4">
                      {localizedPkg.description}
                    </p>
                    
                    <div className="mb-4 flex-1">
                      <p className="font-dm font-semibold text-ocean text-sm mb-2">{t.packages.inclusions}</p>
                      <ul className="space-y-1.5">
                        {localizedPkg.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-ocean/70">
                            <Check className="text-sunset flex-shrink-0 mt-0.5" size={14} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      asChild
                      className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm mt-auto"
                      data-testid={`reserve-package-${pkg.id}`}
                    >
                      <a href="#contact">{t.packages.reserveSpot}</a>
                    </Button>
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

// Activities Section
const ActivitiesSection = ({ activities }) => {
  const { t, language } = useLanguage();
  
  const getLocalizedActivity = (act) => {
    const localizedData = activityTranslations[language]?.[act.id];
    if (localizedData) {
      return { ...act, title: localizedData.title, description: localizedData.description };
    }
    return act;
  };

  return (
    <section 
      id="activities" 
      className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 bg-warmwhite"
      data-testid="activities-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-syne font-bold text-ocean mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
            {t.activities.title}
          </h2>
          <p className="font-dm text-ocean/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
            {t.activities.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {activities.map((act, index) => {
            const localizedAct = getLocalizedActivity(act);
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
                      alt={localizedAct.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-syne font-bold text-sm sm:text-base text-ocean mb-1 line-clamp-1">
                      {localizedAct.title}
                    </h3>
                    <p className="font-dm text-ocean/60 text-xs sm:text-sm mb-2 line-clamp-2 hidden sm:block">
                      {localizedAct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-bold text-sunset text-sm sm:text-base">
                        {act.currency}{act.price}
                      </span>
                      <button 
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-sunset/10 hover:bg-sunset text-sunset hover:text-white rounded-full flex items-center justify-center transition-colors"
                        data-testid={`add-activity-${act.id}`}
                      >
                        <Plus size={16} />
                      </button>
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

// Community Section
const CommunitySection = () => {
  const { t } = useLanguage();
  const values = ["Connect", "Explore", "Adventure", "Share", "Discover", "Live"];
  
  return (
    <section 
      id="community" 
      className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white overflow-hidden"
      data-testid="community-section"
    >
      <div className="marquee-container mb-8 sm:mb-12 md:mb-16">
        <div className="marquee-content">
          {[...values, ...values, ...values, ...values].map((value, index) => (
            <span key={index} className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-ocean/10 mx-4 sm:mx-6 md:mx-8">
              {value} •
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="font-syne font-bold text-ocean mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl">
              {t.community.title}
            </h2>
            <p className="font-dm text-ocean/80 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              {t.community.description}
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              {t.community.features.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-sunset rounded-full flex items-center justify-center flex-shrink-0">
                    <ChevronRight className="text-white" size={14} />
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
            className="relative order-1 md:order-2"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img 
                src="https://images.unsplash.com/photo-1758599669009-5a9002c09487?crop=entropy&cs=srgb&fm=jpg&w=400" 
                alt="Travelers hiking together"
                className="rounded-2xl sm:rounded-3xl aspect-[3/4] object-cover w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1758272959063-ef8a2114f807?crop=entropy&cs=srgb&fm=jpg&w=400" 
                alt="Friends taking selfie"
                className="rounded-2xl sm:rounded-3xl aspect-[3/4] object-cover mt-6 sm:mt-8 w-full"
              />
            </div>
            <div className="absolute -bottom-2 sm:-bottom-4 left-0 sm:-left-4 bg-sunset text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl">
              <p className="font-caveat text-lg sm:text-xl md:text-2xl">{t.community.joinTravelers}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Trips Section
const TripsSection = ({ trips }) => {
  const { t, language } = useLanguage();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const localeMap = { en: 'en-GB', fr: 'fr-FR', es: 'es-ES', de: 'de-DE', pt: 'pt-PT' };
    return date.toLocaleDateString(localeMap[language] || 'en-GB', { month: 'short', day: 'numeric' });
  };

  const getLocalizedTrip = (trip) => {
    const localizedData = tripTranslations[language]?.[trip.id];
    if (localizedData) {
      return { ...trip, title: localizedData.title, location: localizedData.location };
    }
    return trip;
  };

  return (
    <section 
      id="trips" 
      className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 bg-warmwhite"
      data-testid="trips-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-syne font-bold text-ocean mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
            {t.trips.title}
          </h2>
          <p className="font-dm text-ocean/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
            {t.trips.subtitle}
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {trips.map((trip, index) => {
            const localizedTrip = getLocalizedTrip(trip);
            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="trip-card bg-white border-none overflow-hidden" data-testid={`trip-card-${trip.id}`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-stretch">
                      <div className="w-full sm:w-32 md:w-48 h-40 sm:h-auto flex-shrink-0">
                        <img src={trip.image} alt={localizedTrip.title} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full">
                        <div className="flex-1">
                          <h3 className="font-syne font-bold text-lg sm:text-xl text-ocean mb-1">{localizedTrip.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-ocean/70 font-dm text-xs sm:text-sm">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} className="flex-shrink-0" />
                              {localizedTrip.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="flex-shrink-0" />
                              {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                          <div className="text-left sm:text-center">
                            <p className="font-syne font-bold text-lg sm:text-xl text-ocean">{trip.currency}{trip.price}</p>
                            <p className="font-dm text-xs sm:text-sm text-sunset font-medium">
                              {trip.spots_left} {t.trips.spotsLeft}
                            </p>
                          </div>
                          
                          <Button 
                            asChild
                            className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-4 sm:px-6 font-dm text-sm flex-shrink-0"
                            data-testid={`book-trip-${trip.id}`}
                          >
                            <a href="#contact">{t.trips.bookSpot}</a>
                          </Button>
                        </div>
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

// About Section
const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 bg-ocean" data-testid="about-section">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <img 
              src="https://images.unsplash.com/photo-1760727466827-f11ca401116e?crop=entropy&cs=srgb&fm=jpg&w=600" 
              alt="Morocco street scene"
              className="rounded-2xl sm:rounded-3xl shadow-2xl w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <h2 className="font-syne font-bold text-white mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl">
              {t.about.title}
            </h2>
            <p className="font-dm text-white/80 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              {t.about.description1}
            </p>
            <p className="font-dm text-white/80 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              {t.about.description2}
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <p className="font-caveat text-lg sm:text-xl text-sand mb-2">
                "{t.about.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sunset rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-syne font-bold text-white text-sm sm:text-base">NK</span>
                </div>
                <div>
                  <p className="font-syne font-bold text-white text-sm sm:text-base">Naimi Mohamed Karim</p>
                  <p className="font-dm text-xs sm:text-sm text-white/60">{t.about.founder}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ packages, onSubmit, isSubmitting }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "", trip_interest: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getLocalizedPackage = (pkg) => {
    const localizedData = packageTranslations[language]?.[pkg.id];
    return localizedData ? localizedData.title : pkg.title;
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 bg-warmwhite" data-testid="contact-section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-syne font-bold text-ocean mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
            {t.contact.title}
          </h2>
          <p className="font-dm text-ocean/80 text-base sm:text-lg max-w-2xl mx-auto px-2">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white border-none shadow-2xl">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="font-dm font-medium text-ocean flex items-center gap-2 text-sm sm:text-base">
                      <User size={16} />
                      {t.contact.name}
                    </label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.namePlaceholder}
                      required
                      className="form-input border-border focus:border-sunset rounded-xl py-5 sm:py-6 text-base"
                      data-testid="contact-name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-dm font-medium text-ocean flex items-center gap-2 text-sm sm:text-base">
                      <Mail size={16} />
                      {t.contact.email}
                    </label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      required
                      className="form-input border-border focus:border-sunset rounded-xl py-5 sm:py-6 text-base"
                      data-testid="contact-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-dm font-medium text-ocean flex items-center gap-2 text-sm sm:text-base">
                    <Waves size={16} />
                    {t.contact.interested}
                  </label>
                  <Select 
                    value={formData.trip_interest} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, trip_interest: value }))}
                  >
                    <SelectTrigger className="border-border focus:border-sunset rounded-xl py-5 sm:py-6 text-base" data-testid="contact-trip-select">
                      <SelectValue placeholder={t.contact.selectExperience} />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map(pkg => (
                        <SelectItem key={pkg.id} value={pkg.title}>{getLocalizedPackage(pkg)}</SelectItem>
                      ))}
                      <SelectItem value="general">{t.contact.generalInquiry}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="font-dm font-medium text-ocean flex items-center gap-2 text-sm sm:text-base">
                    <MessageSquare size={16} />
                    {t.contact.message}
                  </label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    rows={4}
                    required
                    className="form-input border-border focus:border-sunset rounded-xl resize-none text-base"
                    data-testid="contact-message"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full py-6 text-base sm:text-lg font-syne font-bold min-h-[44px]"
                  data-testid="contact-submit"
                >
                  {isSubmitting ? t.contact.sending : t.contact.sendMessage}
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
  const { t, language } = useLanguage();
  
  const getLocalizedPackageTitle = (id) => {
    const data = packageTranslations[language]?.[id];
    return data ? data.title : id;
  };

  return (
    <footer className="bg-ocean py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          <div className="sm:col-span-2">
            <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-3 sm:mb-4">THE BRIDGE</h3>
            <p className="font-dm text-white/70 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              {t.footer.description}
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="https://www.linkedin.com/in/karim-naimi-b1aa1139/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-sunset transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin className="text-white" size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-sunset transition-colors"
                data-testid="footer-instagram"
              >
                <Instagram className="text-white" size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.packagesTitle}</h4>
            <ul className="space-y-2 font-dm text-white/70 text-sm">
              <li><a href="#packages" className="hover:text-sunset transition-colors">{getLocalizedPackageTitle("weekend-experience")}</a></li>
              <li><a href="#packages" className="hover:text-sunset transition-colors">{getLocalizedPackageTitle("premium-weekend")}</a></li>
              <li><a href="#packages" className="hover:text-sunset transition-colors">{getLocalizedPackageTitle("explorer-experience")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.contactTitle}</h4>
            <ul className="space-y-2 font-dm text-white/70 text-sm">
              <li>
                <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/unyceo-fr-953646577" target="_blank" rel="noopener noreferrer" className="hover:text-sunset transition-colors">
                  {t.footer.companyInfo}
                </a>
              </li>
              <li><a href="#contact" className="hover:text-sunset transition-colors">{t.footer.getInTouch}</a></li>
              <li><a href="#trips" className="hover:text-sunset transition-colors">{t.nav.upcomingTrips}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="font-dm text-white/60 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} THE BRIDGE. {t.footer.rights}
          </p>
          <p className="font-dm text-white/60 text-xs sm:text-sm text-center sm:text-right">
            {t.footer.foundedBy} <span className="text-sand">Naimi Mohamed Karim</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Content
const AppContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [packages, setPackages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [trips, setTrips] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, actRes, tripsRes] = await Promise.all([
          axios.get(`${API}/packages`),
          axios.get(`${API}/activities`),
          axios.get(`${API}/trips`)
        ]);
        setPackages(pkgRes.data);
        setActivities(actRes.data);
        setTrips(tripsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleContactSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success(t.contact.successTitle, { description: t.contact.successDesc });
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast.error(t.contact.errorTitle, { description: t.contact.errorDesc });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <Navigation scrolled={scrolled} />
      <HeroSection />
      <ConceptSection />
      <PackagesSection packages={packages} />
      <ActivitiesSection activities={activities} />
      <CommunitySection />
      <TripsSection trips={trips} />
      <AboutSection />
      <ContactSection packages={packages} onSubmit={handleContactSubmit} isSubmitting={isSubmitting} />
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </div>
  );
}

export default App;
