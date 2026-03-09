import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Waves, Mountain, Sun, Users, MapPin, Calendar, 
  ArrowRight, Menu, X, Mail, User, MessageSquare,
  Star, ChevronRight, Instagram, Linkedin, Play, Pause,
  Globe, ChevronDown
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
import { experienceTranslations, tripTranslations } from "./translations";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Language Selector Component
const LanguageSelector = ({ scrolled, isMobile = false }) => {
  const { language, t, changeLanguage, translations } = useLanguage();
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
    { href: "#experiences", label: t.nav.experiences },
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a 
          href="#hero" 
          className={`font-syne font-bold text-2xl tracking-tight ${
            scrolled ? "text-ocean" : "text-white"
          }`}
          data-testid="logo-link"
        >
          THE BRIDGE
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link font-dm font-medium text-sm ${
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
            className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-6 font-dm font-semibold"
            data-testid="nav-book-btn"
          >
            <a href="#contact">{t.nav.bookNow}</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-warmwhite border-t border-border"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-dm font-medium text-ocean py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm font-semibold mt-2"
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

// Hero Section with Video Background
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Video Background */}
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

      {/* Overlay */}
      <div className="absolute inset-0 video-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-caveat text-sand text-2xl md:text-3xl mb-4"
        >
          {t.hero.welcome}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hero-title font-syne font-extrabold text-white mb-6 leading-none"
          data-testid="hero-title"
        >
          {t.hero.title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-dm text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          data-testid="hero-subtitle"
        >
          {t.hero.subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="btn-primary bg-sunset hover:bg-sunset/90 text-white rounded-full px-8 py-6 text-lg font-syne font-bold"
            data-testid="hero-cta"
          >
            <a href="#experiences">
              {t.hero.exploreBtn}
              <ArrowRight className="ml-2" size={20} />
            </a>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-ocean rounded-full px-8 py-6 text-lg font-syne font-bold bg-transparent"
            data-testid="hero-secondary-cta"
          >
            <a href="#trips">{t.hero.viewTrips}</a>
          </Button>
        </motion.div>
      </div>

      {/* Video Control */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 glass-dark p-3 rounded-full hover:bg-white/20 transition-colors"
        data-testid="video-toggle"
      >
        {isPlaying ? (
          <Pause className="text-white" size={24} />
        ) : (
          <Play className="text-white" size={24} />
        )}
      </button>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
      className="py-20 md:py-32 px-6 md:px-12 bg-warmwhite"
      data-testid="concept-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title font-syne font-bold text-ocean mb-6">
            {t.concept.title}
          </h2>
          <p className="font-dm text-ocean/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t.concept.description} <span className="text-sunset font-semibold">{t.concept.people}</span>, 
            <span className="text-sunset font-semibold"> {t.concept.connections}</span> {' '}
            <span className="text-sunset font-semibold">{t.concept.sharedExperiences}</span>. 
            {' '}{t.concept.descriptionEnd}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="text-sunset" size={40} />,
              title: t.concept.meetPeople,
              description: t.concept.meetPeopleDesc
            },
            {
              icon: <Mountain className="text-sunset" size={40} />,
              title: t.concept.liveAdventures,
              description: t.concept.liveAdventuresDesc
            },
            {
              icon: <Sun className="text-sunset" size={40} />,
              title: t.concept.discoverCulture,
              description: t.concept.discoverCultureDesc
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-sand/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean mb-3">
                    {item.title}
                  </h3>
                  <p className="font-dm text-ocean/70">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experiences Section
const ExperiencesSection = ({ experiences }) => {
  const { t, language } = useLanguage();
  
  const getLocalizedExperience = (exp) => {
    const localizedData = experienceTranslations[language]?.[exp.id];
    if (localizedData) {
      return {
        ...exp,
        title: localizedData.title,
        location: localizedData.location,
        description: localizedData.description
      };
    }
    return exp;
  };

  return (
    <section 
      id="experiences" 
      className="py-20 md:py-32 px-6 md:px-12 bg-ocean"
      data-testid="experiences-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title font-syne font-bold text-white mb-4">
            {t.experiences.title}
          </h2>
          <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto">
            {t.experiences.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => {
            const localizedExp = getLocalizedExperience(exp);
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="experience-card bg-white border-none overflow-hidden cursor-pointer group h-full"
                  data-testid={`experience-card-${exp.id}`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={exp.image} 
                      alt={localizedExp.title}
                      className="card-image w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sunset mb-2">
                      <MapPin size={16} />
                      <span className="font-dm text-sm">{localizedExp.location}</span>
                    </div>
                    <h3 className="font-syne font-bold text-lg text-ocean mb-2 group-hover:text-sunset transition-colors">
                      {localizedExp.title}
                    </h3>
                    <p className="font-dm text-ocean/70 text-sm mb-4 line-clamp-2">
                      {localizedExp.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-bold text-ocean">{exp.price}</span>
                      <span className="font-dm text-sm text-ocean/60">{exp.duration}</span>
                    </div>
                    <Button 
                      asChild
                      className="w-full mt-4 bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm"
                      data-testid={`view-experience-${exp.id}`}
                    >
                      <a href="#contact">{t.experiences.viewExperience}</a>
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

// Community Section
const CommunitySection = () => {
  const { t } = useLanguage();
  const values = ["Connect", "Explore", "Adventure", "Share", "Discover", "Live"];
  
  return (
    <section 
      id="community" 
      className="py-20 md:py-32 bg-warmwhite overflow-hidden"
      data-testid="community-section"
    >
      {/* Marquee */}
      <div className="marquee-container mb-16">
        <div className="marquee-content">
          {[...values, ...values, ...values, ...values].map((value, index) => (
            <span 
              key={index} 
              className="font-syne font-bold text-6xl md:text-8xl text-ocean/10 mx-8"
            >
              {value} •
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title font-syne font-bold text-ocean mb-6">
              {t.community.title}
            </h2>
            <p className="font-dm text-ocean/80 text-lg mb-8 leading-relaxed">
              {t.community.description}
            </p>
            
            <div className="space-y-4">
              {t.community.features.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-sunset rounded-full flex items-center justify-center">
                    <ChevronRight className="text-white" size={16} />
                  </div>
                  <span className="font-dm text-ocean">{item}</span>
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
                src="https://images.unsplash.com/photo-1758599669009-5a9002c09487?crop=entropy&cs=srgb&fm=jpg&w=400" 
                alt="Travelers hiking together"
                className="rounded-3xl aspect-[3/4] object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1758272959063-ef8a2114f807?crop=entropy&cs=srgb&fm=jpg&w=400" 
                alt="Friends taking selfie"
                className="rounded-3xl aspect-[3/4] object-cover mt-8"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-sunset text-white p-6 rounded-2xl shadow-xl">
              <p className="font-caveat text-2xl">{t.community.joinTravelers}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Upcoming Trips Section
const TripsSection = ({ trips }) => {
  const { t, language } = useLanguage();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const localeMap = {
      en: 'en-GB',
      fr: 'fr-FR',
      es: 'es-ES',
      de: 'de-DE',
      pt: 'pt-PT'
    };
    return date.toLocaleDateString(localeMap[language] || 'en-GB', { month: 'short', day: 'numeric' });
  };

  const getLocalizedTrip = (trip) => {
    const localizedData = tripTranslations[language]?.[trip.id];
    if (localizedData) {
      return {
        ...trip,
        title: localizedData.title,
        location: localizedData.location
      };
    }
    return trip;
  };

  return (
    <section 
      id="trips" 
      className="py-20 md:py-32 px-6 md:px-12 bg-white"
      data-testid="trips-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title font-syne font-bold text-ocean mb-4">
            {t.trips.title}
          </h2>
          <p className="font-dm text-ocean/80 text-lg max-w-2xl mx-auto">
            {t.trips.subtitle}
          </p>
        </motion.div>

        <div className="space-y-4">
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
                <Card 
                  className="trip-card bg-warmwhite border-none overflow-hidden"
                  data-testid={`trip-card-${trip.id}`}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-48 h-32 md:h-full flex-shrink-0">
                        <img 
                          src={trip.image} 
                          alt={localizedTrip.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
                        <div>
                          <h3 className="font-syne font-bold text-xl text-ocean mb-1">
                            {localizedTrip.title}
                          </h3>
                          <div className="flex items-center gap-4 text-ocean/70 font-dm text-sm">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {localizedTrip.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="font-syne font-bold text-xl text-ocean">{trip.price}</p>
                            <p className="font-dm text-sm text-sunset font-medium">
                              {trip.spots_left} {t.trips.spotsLeft}
                            </p>
                          </div>
                          
                          <Button 
                            asChild
                            className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-6 font-dm"
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

// Testimonials Section
const TestimonialsSection = ({ testimonials }) => {
  const { t } = useLanguage();
  
  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-32 px-6 md:px-12 bg-ocean"
      data-testid="testimonials-section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title font-syne font-bold text-white mb-4">
            {t.testimonials.title}
          </h2>
          <p className="font-dm text-white/80 text-lg">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="testimonial-card bg-white border-none h-full"
                data-testid={`testimonial-${testimonial.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-sand fill-sand" size={18} />
                    ))}
                  </div>
                  <p className="font-dm text-ocean/80 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-syne font-bold text-ocean">
                        {testimonial.name}
                      </p>
                      <p className="font-dm text-sm text-ocean/60">
                        {testimonial.country}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section 
      id="about" 
      className="py-20 md:py-32 px-6 md:px-12 bg-warmwhite"
      data-testid="about-section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1760727466827-f11ca401116e?crop=entropy&cs=srgb&fm=jpg&w=600" 
              alt="Morocco street scene"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title font-syne font-bold text-ocean mb-6">
              {t.about.title}
            </h2>
            <p className="font-dm text-ocean/80 text-lg mb-6 leading-relaxed">
              {t.about.description1}
            </p>
            <p className="font-dm text-ocean/80 text-lg mb-8 leading-relaxed">
              {t.about.description2}
            </p>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="font-caveat text-xl text-sunset mb-2">
                "{t.about.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-ocean rounded-full flex items-center justify-center">
                  <span className="font-syne font-bold text-white">NK</span>
                </div>
                <div>
                  <p className="font-syne font-bold text-ocean">Naimi Mohamed Karim</p>
                  <p className="font-dm text-sm text-ocean/60">{t.about.founder}</p>
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
const ContactSection = ({ experiences, onSubmit, isSubmitting }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    trip_interest: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getLocalizedExperience = (exp) => {
    const localizedData = experienceTranslations[language]?.[exp.id];
    if (localizedData) {
      return localizedData.title;
    }
    return exp.title;
  };

  return (
    <section 
      id="contact" 
      className="py-20 md:py-32 px-6 md:px-12 bg-ocean"
      data-testid="contact-section"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title font-syne font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto">
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
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-dm font-medium text-ocean flex items-center gap-2">
                      <User size={18} />
                      {t.contact.name}
                    </label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.namePlaceholder}
                      required
                      className="form-input border-border focus:border-sunset rounded-xl py-6"
                      data-testid="contact-name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-dm font-medium text-ocean flex items-center gap-2">
                      <Mail size={18} />
                      {t.contact.email}
                    </label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      required
                      className="form-input border-border focus:border-sunset rounded-xl py-6"
                      data-testid="contact-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-dm font-medium text-ocean flex items-center gap-2">
                    <Waves size={18} />
                    {t.contact.interested}
                  </label>
                  <Select 
                    value={formData.trip_interest} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, trip_interest: value }))}
                  >
                    <SelectTrigger 
                      className="border-border focus:border-sunset rounded-xl py-6"
                      data-testid="contact-trip-select"
                    >
                      <SelectValue placeholder={t.contact.selectExperience} />
                    </SelectTrigger>
                    <SelectContent>
                      {experiences.map(exp => (
                        <SelectItem key={exp.id} value={exp.title}>
                          {getLocalizedExperience(exp)}
                        </SelectItem>
                      ))}
                      <SelectItem value="general">{t.contact.generalInquiry}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="font-dm font-medium text-ocean flex items-center gap-2">
                    <MessageSquare size={18} />
                    {t.contact.message}
                  </label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    rows={5}
                    required
                    className="form-input border-border focus:border-sunset rounded-xl resize-none"
                    data-testid="contact-message"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full py-6 text-lg font-syne font-bold"
                  data-testid="contact-submit"
                >
                  {isSubmitting ? t.contact.sending : t.contact.sendMessage}
                  <ArrowRight className="ml-2" size={20} />
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
  
  const getLocalizedExperienceTitle = (id) => {
    const titles = {
      "surf-taghazout": experienceTranslations[language]?.["surf-taghazout"]?.title || "Surf & Beach",
      "sahara-adventure": experienceTranslations[language]?.["sahara-adventure"]?.title || "Sahara Desert",
      "marrakech-weekend": experienceTranslations[language]?.["marrakech-weekend"]?.title || "Marrakech",
      "coastal-explorer": experienceTranslations[language]?.["coastal-explorer"]?.title || "Coastal Explorer"
    };
    return titles[id];
  };

  return (
    <footer className="bg-warmwhite py-12 px-6 md:px-12" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-syne font-bold text-2xl text-ocean mb-4">THE BRIDGE</h3>
            <p className="font-dm text-ocean/70 mb-6 max-w-md">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/karim-naimi-b1aa1139/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-ocean rounded-full flex items-center justify-center hover:bg-sunset transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin className="text-white" size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-ocean rounded-full flex items-center justify-center hover:bg-sunset transition-colors"
                data-testid="footer-instagram"
              >
                <Instagram className="text-white" size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-syne font-bold text-ocean mb-4">{t.footer.experiencesTitle}</h4>
            <ul className="space-y-2 font-dm text-ocean/70">
              <li><a href="#experiences" className="hover:text-sunset transition-colors">{getLocalizedExperienceTitle("surf-taghazout")}</a></li>
              <li><a href="#experiences" className="hover:text-sunset transition-colors">{getLocalizedExperienceTitle("sahara-adventure")}</a></li>
              <li><a href="#experiences" className="hover:text-sunset transition-colors">{getLocalizedExperienceTitle("marrakech-weekend")}</a></li>
              <li><a href="#experiences" className="hover:text-sunset transition-colors">{getLocalizedExperienceTitle("coastal-explorer")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-ocean mb-4">{t.footer.contactTitle}</h4>
            <ul className="space-y-2 font-dm text-ocean/70">
              <li>
                <a 
                  href="https://annuaire-entreprises.data.gouv.fr/entreprise/unyceo-fr-953646577" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-sunset transition-colors"
                >
                  {t.footer.companyInfo}
                </a>
              </li>
              <li><a href="#contact" className="hover:text-sunset transition-colors">{t.footer.getInTouch}</a></li>
              <li><a href="#trips" className="hover:text-sunset transition-colors">{t.nav.upcomingTrips}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-dm text-ocean/60 text-sm">
            © {new Date().getFullYear()} THE BRIDGE. {t.footer.rights}
          </p>
          <p className="font-dm text-ocean/60 text-sm">
            {t.footer.foundedBy} <span className="text-sunset">Naimi Mohamed Karim</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Content (with language context)
const AppContent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [trips, setTrips] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const [expRes, tripsRes, testRes] = await Promise.all([
          axios.get(`${API}/experiences`),
          axios.get(`${API}/trips`),
          axios.get(`${API}/testimonials`)
        ]);
        
        setExperiences(expRes.data);
        setTrips(tripsRes.data);
        setTestimonials(testRes.data);
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
      toast.success(t.contact.successTitle, {
        description: t.contact.successDesc
      });
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast.error(t.contact.errorTitle, {
        description: t.contact.errorDesc
      });
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
      <ExperiencesSection experiences={experiences} />
      <CommunitySection />
      <TripsSection trips={trips} />
      <TestimonialsSection testimonials={testimonials} />
      <AboutSection />
      <ContactSection 
        experiences={experiences} 
        onSubmit={handleContactSubmit}
        isSubmitting={isSubmitting}
      />
      <Footer />
    </>
  );
};

// Main App Component with Provider
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
