import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Waves, Mountain, Sun, Users, MapPin, Calendar, 
  ArrowRight, Mail, User, MessageSquare,
  ChevronRight, Play, Pause,
  Check, Plus, Plane, Zap, Sparkles,
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
import { Toaster, toast } from "sonner";
import { useLanguage } from "../LanguageContext";
import { catalogueTranslations } from "../translations";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Hero Section
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
    },
    it: {
      headline: "Viaggia • Pratica • Vivi",
      subtitle: "Scegli la tua esperienza. Impara qualcosa di nuovo. Scopri il Marocco.",
      tagline: "Più di un viaggio. Un'esperienza.",
      cta: "Scopri le Esperienze",
      secondary: "Come Funziona"
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

// How It Works Section
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
    },
    it: {
      title: "Come Funziona",
      subtitle: "Il tuo viaggio in 4 semplici passi",
      steps: [
        { number: "01", title: "Scegli la tua esperienza", description: "Difesa Personale, Lingue o Visual Storytelling — scegli ciò che ti appassiona.", icon: <Target size={28} /> },
        { number: "02", title: "Seleziona le tue date", description: "Trova un viaggio adatto ai tuoi impegni. Offriamo esperienze tutto l'anno.", icon: <Calendar size={28} /> },
        { number: "03", title: "Aggiungi attività", description: "Personalizza il tuo viaggio con escursioni nel deserto, corsi di cucina, spa e altro.", icon: <Plus size={28} /> },
        { number: "04", title: "Unisciti all'avventura", description: "Incontra il tuo gruppo, pratica la tua passione e crea ricordi indimenticabili.", icon: <Compass size={28} /> }
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

// Experiences Section
const ExperiencesSection = ({ experiences }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Our Experiences",
      subtitle: "Practice in the morning • Explore Morocco in the afternoon",
      concept: "Travel • Practice • Experience",
      bookNow: "Book This Experience",
      smallGroups: "Small international groups (18+)",
      destinations: "Destinations:"
    },
    fr: {
      title: "Nos Expériences",
      subtitle: "Pratique le matin • Exploration du Maroc l'après-midi",
      concept: "Voyage • Pratique • Expérience",
      bookNow: "Réserver cette expérience",
      smallGroups: "Petits groupes internationaux (18+)",
      destinations: "Destinations :"
    },
    es: {
      title: "Nuestras Experiencias",
      subtitle: "Práctica por la mañana • Explora Marruecos por la tarde",
      concept: "Viaja • Practica • Experimenta",
      bookNow: "Reservar esta experiencia",
      smallGroups: "Pequeños grupos internacionales (18+)",
      destinations: "Destinos:"
    },
    de: {
      title: "Unsere Erlebnisse",
      subtitle: "Übung am Morgen • Marokko entdecken am Nachmittag",
      concept: "Reisen • Üben • Erleben",
      bookNow: "Dieses Erlebnis buchen",
      smallGroups: "Kleine internationale Gruppen (18+)",
      destinations: "Reiseziele:"
    },
    pt: {
      title: "Nossas Experiências",
      subtitle: "Prática pela manhã • Explore Marrocos à tarde",
      concept: "Viaje • Pratique • Experimente",
      bookNow: "Reservar esta experiência",
      smallGroups: "Pequenos grupos internacionais (18+)",
      destinations: "Destinos:"
    },
    it: {
      title: "Le Nostre Esperienze",
      subtitle: "Pratica al mattino • Esplora il Marocco nel pomeriggio",
      concept: "Viaggia • Pratica • Vivi",
      bookNow: "Prenota questa esperienza",
      smallGroups: "Piccoli gruppi internazionali (18+)",
      destinations: "Destinazioni:"
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
    },
    it: {
      'self-defense-holiday': 'Vacanza Autodifesa',
      'language-holiday': 'Vacanza Pratica Linguistica',
      'visual-storytelling': 'Vacanza Visual Storytelling'
    }
  };

  const localizedTaglines = {
    en: {
      'self-defense-holiday': 'Self Defense',
      'language-holiday': 'TOEFL, IELTS, Business',
      'visual-storytelling': 'Photography & Video'
    },
    fr: {
      'self-defense-holiday': 'Self Défense',
      'language-holiday': 'TOEFL, IELTS, Business',
      'visual-storytelling': 'Photo & Vidéo'
    },
    es: {
      'self-defense-holiday': 'Defensa Personal',
      'language-holiday': 'TOEFL, IELTS, Negocios',
      'visual-storytelling': 'Fotografía y Video'
    },
    de: {
      'self-defense-holiday': 'Selbstverteidigung',
      'language-holiday': 'TOEFL, IELTS, Business',
      'visual-storytelling': 'Fotografie & Video'
    },
    pt: {
      'self-defense-holiday': 'Defesa Pessoal',
      'language-holiday': 'TOEFL, IELTS, Negócios',
      'visual-storytelling': 'Fotografia e Vídeo'
    },
    it: {
      'self-defense-holiday': 'Autodifesa',
      'language-holiday': 'TOEFL, IELTS, Business',
      'visual-storytelling': 'Fotografia e Video'
    }
  };

  const localizedDescriptions = {
    en: {
      'self-defense-holiday': 'Learn practical self-defense skills with certified instructors. Training in boxing, Krav Maga, and MMA, adapted to all levels.',
      'language-holiday': 'Improve your English with certified teachers in a total immersion setting. TOEFL, IELTS preparation and Business English.',
      'visual-storytelling': 'Learn to tell stories through images. Photography, videography, and content creation with professional equipment.'
    },
    fr: {
      'self-defense-holiday': 'Apprenez des techniques de self-défense pratiques avec des instructeurs certifiés. Entraînement en boxe, Krav Maga et MMA, adapté à tous les niveaux.',
      'language-holiday': 'Améliorez votre anglais avec des professeurs certifiés en immersion totale. Préparation TOEFL, IELTS et Business English.',
      'visual-storytelling': 'Apprenez à raconter des histoires à travers les images. Photographie, vidéographie et création de contenu avec équipement professionnel.'
    },
    es: {
      'self-defense-holiday': 'Aprende técnicas prácticas de defensa personal con instructores certificados. Entrenamiento en boxeo, Krav Maga y MMA, adaptado a todos los niveles.',
      'language-holiday': 'Mejora tu inglés con profesores certificados en inmersión total. Preparación TOEFL, IELTS y Business English.',
      'visual-storytelling': 'Aprende a contar historias a través de imágenes. Fotografía, videografía y creación de contenido con equipo profesional.'
    },
    de: {
      'self-defense-holiday': 'Lernen Sie praktische Selbstverteidigungstechniken mit zertifizierten Trainern. Training in Boxen, Krav Maga und MMA, angepasst an alle Niveaus.',
      'language-holiday': 'Verbessern Sie Ihr Englisch mit zertifizierten Lehrern in völliger Immersion. TOEFL, IELTS Vorbereitung und Business English.',
      'visual-storytelling': 'Lernen Sie, Geschichten durch Bilder zu erzählen. Fotografie, Videografie und Content-Erstellung mit professioneller Ausrüstung.'
    },
    pt: {
      'self-defense-holiday': 'Aprenda técnicas práticas de defesa pessoal com instrutores certificados. Treinamento em boxe, Krav Maga e MMA, adaptado a todos os níveis.',
      'language-holiday': 'Melhore seu inglês com professores certificados em imersão total. Preparação TOEFL, IELTS e Business English.',
      'visual-storytelling': 'Aprenda a contar histórias através de imagens. Fotografia, videografia e criação de conteúdo com equipamento profissional.'
    },
    it: {
      'self-defense-holiday': 'Impara tecniche pratiche di autodifesa con istruttori certificati. Allenamento di boxe, Krav Maga e MMA, adattato a tutti i livelli.',
      'language-holiday': 'Migliora il tuo inglese con insegnanti certificati in immersione totale. Preparazione TOEFL, IELTS e Business English.',
      'visual-storytelling': 'Impara a raccontare storie attraverso le immagini. Fotografia, videografia e creazione di contenuti con attrezzatura professionale.'
    }
  };

  const getBookingLink = (expId) => {
    switch(expId) {
      case 'language-holiday': return '/book?experience=language';
      case 'self-defense-holiday': return '/book?experience=self-defense';
      case 'visual-storytelling': return '/book?experience=storytelling';
      default: return '/book';
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
                  <p className="font-caveat text-sunset text-lg mb-3">{localizedTaglines[language]?.[exp.id] || exp.tagline}</p>
                  
                  <p className="font-dm text-ocean/70 text-sm mb-4 flex-1">{localizedDescriptions[language]?.[exp.id] || exp.description}</p>

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
                  
                  <Button 
                    asChild
                    className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full font-dm mt-auto"
                    data-testid={`book-experience-${exp.id}`}
                  >
                    <Link to={getBookingLink(exp.id)}>{t.bookNow}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Destination Section
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
      description: "Desde las playas de surf de Taghazout hasta las dunas doradas del Sahara, desde las vibrantes medinas de Marrakech hasta las calles azules de Chefchaouen — Marruecos ofrece un increíble escenario para tu viaje.",
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
      description: "Von den Surfstränden von Taghazout bis zu den goldenen Dünen der Sahara, von den lebhaften Medinas von Marrakesch bis zu den blauen Straßen von Chefchaouen — Marokko bietet eine unglaubliche Kulisse für deine Reise.",
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
      description: "Das praias de surf de Taghazout às dunas douradas do Saara, das vibrantes medinas de Marraquexe às ruas azuis de Chefchaouen — Marrocos oferece um cenário incrível para sua jornada.",
      highlights: [
        "Sol o ano todo & clima perfeito",
        "Cultura rica & locais amigáveis",
        "Paisagens diversas em um só país",
        "Acessível & barato da Europa"
      ]
    },
    it: {
      title: "Destinazione: Marocco",
      subtitle: "Dove antiche tradizioni incontrano avventure moderne",
      description: "Dalle spiagge da surf di Taghazout alle dune dorate del Sahara, dalle vibranti medine di Marrakech alle strade blu di Chefchaouen — il Marocco offre uno sfondo incredibile per il tuo viaggio.",
      highlights: [
        "Sole tutto l'anno & clima perfetto",
        "Cultura ricca & gente accogliente",
        "Paesaggi diversi in un solo paese",
        "Accessibile & conveniente dall'Europa"
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
    },
    it: {
      title: "Piccoli Gruppi, Grandi Connessioni",
      description: "Unisciti a un gruppo accuratamente selezionato di 8-12 viaggiatori internazionali. Le nostre esperienze sono progettate per connessioni significative — vi allenerete insieme, esplorerete insieme e creerete ricordi che dureranno tutta la vita.",
      features: [
        "Max 12 persone per esperienza",
        "Gruppi internazionali e diversi",
        "Pasti condivisi ed eventi sociali",
        "Amicizie per la vita"
      ],
      cta: "Unisciti a 500+ viaggiatori"
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
      successDesc: "Nous vous répondrons sous 24 heures.",
      errorTitle: "Erreur d'envoi",
      errorDesc: "Veuillez réessayer ou nous contacter directement."
    },
    es: {
      title: "Solicitud de Información",
      subtitle: "¿Tienes preguntas sobre nuestras experiencias? Envíanos un mensaje.",
      name: "Tu Nombre",
      namePlaceholder: "Ingresa tu nombre",
      email: "Correo Electrónico",
      emailPlaceholder: "tu@email.com",
      interested: "¿Qué experiencia te interesa?",
      selectExperience: "Selecciona una experiencia",
      generalInquiry: "Consulta General",
      message: "Tu Mensaje",
      messagePlaceholder: "Cuéntanos sobre ti, tus metas o cualquier pregunta...",
      sendMessage: "Enviar Mensaje",
      sending: "Enviando...",
      successTitle: "¡Mensaje enviado!",
      successDesc: "Te responderemos en 24 horas.",
      errorTitle: "Error al enviar",
      errorDesc: "Por favor intenta de nuevo o contáctanos directamente."
    },
    de: {
      title: "Informationsanfrage",
      subtitle: "Fragen zu unseren Erlebnissen? Sende uns eine Nachricht.",
      name: "Ihr Name",
      namePlaceholder: "Geben Sie Ihren Namen ein",
      email: "E-Mail-Adresse",
      emailPlaceholder: "ihre@email.com",
      interested: "Welches Erlebnis interessiert Sie?",
      selectExperience: "Wählen Sie ein Erlebnis",
      generalInquiry: "Allgemeine Anfrage",
      message: "Ihre Nachricht",
      messagePlaceholder: "Erzählen Sie uns von sich, Ihren Zielen oder Fragen...",
      sendMessage: "Nachricht Senden",
      sending: "Wird gesendet...",
      successTitle: "Nachricht gesendet!",
      successDesc: "Wir antworten innerhalb von 24 Stunden.",
      errorTitle: "Fehler beim Senden",
      errorDesc: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt."
    },
    pt: {
      title: "Pedido de Informação",
      subtitle: "Tem perguntas sobre nossas experiências? Envie-nos uma mensagem.",
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
      errorDesc: "Por favor tente novamente ou entre em contato diretamente."
    },
    it: {
      title: "Richiesta Informazioni",
      subtitle: "Hai domande sulle nostre esperienze? Inviaci un messaggio.",
      name: "Il Tuo Nome",
      namePlaceholder: "Inserisci il tuo nome",
      email: "Indirizzo Email",
      emailPlaceholder: "tua@email.com",
      interested: "Quale esperienza ti interessa?",
      selectExperience: "Seleziona un'esperienza",
      generalInquiry: "Richiesta Generale",
      message: "Il Tuo Messaggio",
      messagePlaceholder: "Raccontaci di te, i tuoi obiettivi o domande...",
      sendMessage: "Invia Messaggio",
      sending: "Invio in corso...",
      successTitle: "Messaggio inviato!",
      successDesc: "Ti risponderemo entro 24 ore.",
      errorTitle: "Errore di invio",
      errorDesc: "Riprova o contattaci direttamente."
    }
  };

  const t = content[language] || content.en;

  const experienceLabels = {
    en: { 'self-defense-holiday': 'Self-Defense', 'language-holiday': 'Language Practice', 'visual-storytelling': 'Visual Storytelling' },
    fr: { 'self-defense-holiday': 'Self-Défense', 'language-holiday': 'Pratique Linguistique', 'visual-storytelling': 'Storytelling Visuel' },
    es: { 'self-defense-holiday': 'Defensa Personal', 'language-holiday': 'Práctica de Idiomas', 'visual-storytelling': 'Storytelling Visual' },
    de: { 'self-defense-holiday': 'Selbstverteidigung', 'language-holiday': 'Sprachpraxis', 'visual-storytelling': 'Visual Storytelling' },
    pt: { 'self-defense-holiday': 'Defesa Pessoal', 'language-holiday': 'Prática de Idiomas', 'visual-storytelling': 'Storytelling Visual' },
    it: { 'self-defense-holiday': 'Autodifesa', 'language-holiday': 'Pratica Linguistica', 'visual-storytelling': 'Visual Storytelling' }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData, t);
    setFormData({ name: "", email: "", message: "", trip_interest: "" });
  };

  return (
    <section 
      id="contact" 
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-white"
      data-testid="contact-section"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-syne font-bold text-ocean mb-3 text-2xl sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="font-dm text-ocean/70 text-base sm:text-lg">
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

// Main HomePage Component
const HomePage = ({ scrolled }) => {
  const [experiences, setExperiences] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expRes = await axios.get(`${API}/experiences`);
        setExperiences(expRes.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
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
      <HeroSection />
      <HowItWorksSection />
      <ExperiencesSection experiences={experiences} />
      <DestinationSection />
      <CommunitySection />
      <ContactSection experiences={experiences} onSubmit={handleContactSubmit} isSubmitting={isSubmitting} />
    </>
  );
};

export default HomePage;
