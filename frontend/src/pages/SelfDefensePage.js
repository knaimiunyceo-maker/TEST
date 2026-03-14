import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, ArrowRight, MapPin, Calendar, Users, Check, 
  Clock, ChevronLeft, ChevronRight, Sun, Moon, Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const pageTranslations = {
  en: {
    heroTitle: "Self-Defense Weekend",
    heroSubtitle: "Learn. Travel. Transform.",
    heroDesc: "Combine self-defense training with cultural discovery in Morocco.",
    conceptTitle: "The Concept",
    concept1: "Spend a full weekend in Morocco learning practical self-defense skills while exploring a vibrant city.",
    concept2: "Our experienced instructors teach Krav Maga fundamentals in morning sessions, while afternoons are dedicated to city exploration and cultural experiences.",
    formatTitle: "Weekend Format",
    format2n3d: "2 nights / 3 days",
    formatDesc: "Friday arrival → Sunday departure",
    morningSession: "Morning Session",
    morningDesc: "2h30 self-defense training",
    afternoonSession: "Afternoon Discovery",
    afternoonDesc: "Cultural activities & city exploration",
    eveningSession: "Evening Experience",
    eveningDesc: "Dinner & social activities",
    whatYouLearn: "What You'll Learn",
    skills: ["Basic strikes and kicks", "Defense against common attacks", "Situational awareness", "Escape techniques", "Confidence building"],
    destinationsTitle: "Destinations",
    destinationsAlternating: "Weekends alternate between Marrakech and Agadir",
    includedTitle: "What's Included",
    included: ["2 nights accommodation", "All meals (Friday dinner to Sunday lunch)", "2 self-defense sessions", "City activities", "Airport transfers", "Local guide"],
    priceFrom: "From",
    bookNow: "Book now",
    bookYourWeekend: "Book your weekend"
  },
  fr: {
    heroTitle: "Weekend Self-Defense",
    heroSubtitle: "Apprendre. Voyager. Se Transformer.",
    heroDesc: "Combinez l'entraînement à la self-défense avec la découverte culturelle au Maroc.",
    conceptTitle: "Le Concept",
    concept1: "Passez un week-end complet au Maroc à apprendre des compétences pratiques d'auto-défense tout en explorant une ville vibrante.",
    concept2: "Nos instructeurs expérimentés enseignent les fondamentaux du Krav Maga lors des séances matinales, tandis que les après-midis sont consacrés à l'exploration de la ville et aux expériences culturelles.",
    formatTitle: "Format Weekend",
    format2n3d: "2 nuits / 3 jours",
    formatDesc: "Arrivée vendredi → Départ dimanche",
    morningSession: "Séance Matinale",
    morningDesc: "2h30 d'entraînement self-défense",
    afternoonSession: "Découverte Après-midi",
    afternoonDesc: "Activités culturelles & exploration de la ville",
    eveningSession: "Expérience du Soir",
    eveningDesc: "Dîner & activités sociales",
    whatYouLearn: "Ce Que Vous Apprendrez",
    skills: ["Frappes et coups de pied de base", "Défense contre les attaques courantes", "Conscience situationnelle", "Techniques d'évasion", "Renforcement de la confiance"],
    destinationsTitle: "Destinations",
    destinationsAlternating: "Les weekends alternent entre Marrakech et Agadir",
    includedTitle: "Ce Qui Est Inclus",
    included: ["2 nuits d'hébergement", "Tous les repas (vendredi soir au dimanche midi)", "2 séances de self-défense", "Activités en ville", "Transferts aéroport", "Guide local"],
    priceFrom: "À partir de",
    bookNow: "Réserver",
    bookYourWeekend: "Réserver votre weekend"
  },
  es: {
    heroTitle: "Fin de Semana de Defensa Personal",
    heroSubtitle: "Aprende. Viaja. Transfórmate.",
    heroDesc: "Combina el entrenamiento de defensa personal con el descubrimiento cultural en Marruecos.",
    conceptTitle: "El Concepto",
    concept1: "Pasa un fin de semana completo en Marruecos aprendiendo habilidades prácticas de defensa personal mientras exploras una ciudad vibrante.",
    concept2: "Nuestros instructores experimentados enseñan los fundamentos del Krav Maga en las sesiones de la mañana, mientras las tardes se dedican a la exploración de la ciudad y experiencias culturales.",
    formatTitle: "Formato de Fin de Semana",
    format2n3d: "2 noches / 3 días",
    formatDesc: "Llegada viernes → Salida domingo",
    morningSession: "Sesión Matutina",
    morningDesc: "2h30 de entrenamiento de defensa personal",
    afternoonSession: "Descubrimiento de la Tarde",
    afternoonDesc: "Actividades culturales y exploración de la ciudad",
    eveningSession: "Experiencia Nocturna",
    eveningDesc: "Cena y actividades sociales",
    whatYouLearn: "Lo Que Aprenderás",
    skills: ["Golpes y patadas básicas", "Defensa contra ataques comunes", "Conciencia situacional", "Técnicas de escape", "Construcción de confianza"],
    destinationsTitle: "Destinos",
    destinationsAlternating: "Los fines de semana alternan entre Marrakech y Agadir",
    includedTitle: "Qué Está Incluido",
    included: ["2 noches de alojamiento", "Todas las comidas (viernes cena a domingo almuerzo)", "2 sesiones de defensa personal", "Actividades en la ciudad", "Traslados al aeropuerto", "Guía local"],
    priceFrom: "Desde",
    bookNow: "Reservar",
    bookYourWeekend: "Reserva tu fin de semana"
  },
  pt: {
    heroTitle: "Fim de Semana de Defesa Pessoal",
    heroSubtitle: "Aprenda. Viaje. Transforme-se.",
    heroDesc: "Combine treinamento de defesa pessoal com descoberta cultural no Marrocos.",
    conceptTitle: "O Conceito",
    concept1: "Passe um fim de semana completo no Marrocos aprendendo habilidades práticas de defesa pessoal enquanto explora uma cidade vibrante.",
    concept2: "Nossos instrutores experientes ensinam os fundamentos do Krav Maga nas sessões da manhã, enquanto as tardes são dedicadas à exploração da cidade e experiências culturais.",
    formatTitle: "Formato de Fim de Semana",
    format2n3d: "2 noites / 3 dias",
    formatDesc: "Chegada sexta → Partida domingo",
    morningSession: "Sessão Matinal",
    morningDesc: "2h30 de treinamento de defesa pessoal",
    afternoonSession: "Descoberta à Tarde",
    afternoonDesc: "Atividades culturais e exploração da cidade",
    eveningSession: "Experiência Noturna",
    eveningDesc: "Jantar e atividades sociais",
    whatYouLearn: "O Que Você Aprenderá",
    skills: ["Golpes e chutes básicos", "Defesa contra ataques comuns", "Consciência situacional", "Técnicas de fuga", "Construção de confiança"],
    destinationsTitle: "Destinos",
    destinationsAlternating: "Os fins de semana alternam entre Marrakech e Agadir",
    includedTitle: "O Que Está Incluído",
    included: ["2 noites de hospedagem", "Todas as refeições (jantar de sexta ao almoço de domingo)", "2 sessões de defesa pessoal", "Atividades na cidade", "Traslados do aeroporto", "Guia local"],
    priceFrom: "A partir de",
    bookNow: "Reservar",
    bookYourWeekend: "Reserve seu fim de semana"
  },
  de: {
    heroTitle: "Selbstverteidigung Wochenende",
    heroSubtitle: "Lernen. Reisen. Verwandeln.",
    heroDesc: "Kombinieren Sie Selbstverteidigungstraining mit kultureller Entdeckung in Marokko.",
    conceptTitle: "Das Konzept",
    concept1: "Verbringen Sie ein ganzes Wochenende in Marokko, um praktische Selbstverteidigungsfähigkeiten zu erlernen, während Sie eine lebhafte Stadt erkunden.",
    concept2: "Unsere erfahrenen Ausbilder lehren Krav Maga-Grundlagen in den Morgensitzungen, während die Nachmittage der Stadtbesichtigung und kulturellen Erfahrungen gewidmet sind.",
    formatTitle: "Wochenendformat",
    format2n3d: "2 Nächte / 3 Tage",
    formatDesc: "Ankunft Freitag → Abreise Sonntag",
    morningSession: "Morgensitzung",
    morningDesc: "2h30 Selbstverteidigungstraining",
    afternoonSession: "Nachmittags-Entdeckung",
    afternoonDesc: "Kulturelle Aktivitäten & Stadterkundung",
    eveningSession: "Abenderlebnis",
    eveningDesc: "Abendessen & soziale Aktivitäten",
    whatYouLearn: "Was Sie Lernen",
    skills: ["Grundlegende Schläge und Tritte", "Verteidigung gegen häufige Angriffe", "Situationsbewusstsein", "Fluchttechniken", "Selbstvertrauen aufbauen"],
    destinationsTitle: "Reiseziele",
    destinationsAlternating: "Die Wochenenden wechseln zwischen Marrakesch und Agadir",
    includedTitle: "Was Enthalten Ist",
    included: ["2 Nächte Unterkunft", "Alle Mahlzeiten (Freitagabend bis Sonntagmittag)", "2 Selbstverteidigungssitzungen", "Stadtaktivitäten", "Flughafentransfers", "Lokaler Führer"],
    priceFrom: "Ab",
    bookNow: "Jetzt buchen",
    bookYourWeekend: "Buchen Sie Ihr Wochenende"
  },
  it: {
    heroTitle: "Weekend di Autodifesa",
    heroSubtitle: "Impara. Viaggia. Trasformati.",
    heroDesc: "Combina l'allenamento di autodifesa con la scoperta culturale in Marocco.",
    conceptTitle: "Il Concetto",
    concept1: "Trascorri un intero weekend in Marocco imparando abilità pratiche di autodifesa mentre esplori una città vibrante.",
    concept2: "I nostri istruttori esperti insegnano i fondamenti del Krav Maga nelle sessioni mattutine, mentre i pomeriggi sono dedicati all'esplorazione della città e alle esperienze culturali.",
    formatTitle: "Formato Weekend",
    format2n3d: "2 notti / 3 giorni",
    formatDesc: "Arrivo venerdì → Partenza domenica",
    morningSession: "Sessione Mattutina",
    morningDesc: "2h30 di allenamento autodifesa",
    afternoonSession: "Scoperta Pomeridiana",
    afternoonDesc: "Attività culturali ed esplorazione della città",
    eveningSession: "Esperienza Serale",
    eveningDesc: "Cena e attività sociali",
    whatYouLearn: "Cosa Imparerai",
    skills: ["Colpi e calci base", "Difesa contro attacchi comuni", "Consapevolezza situazionale", "Tecniche di fuga", "Costruzione della fiducia"],
    destinationsTitle: "Destinazioni",
    destinationsAlternating: "I weekend si alternano tra Marrakech e Agadir",
    includedTitle: "Cosa È Incluso",
    included: ["2 notti di alloggio", "Tutti i pasti (cena venerdì al pranzo domenica)", "2 sessioni di autodifesa", "Attività in città", "Trasferimenti aeroporto", "Guida locale"],
    priceFrom: "Da",
    bookNow: "Prenota ora",
    bookYourWeekend: "Prenota il tuo weekend"
  }
};

// Generate weekend dates for a given month
const generateWeekends = (year, month) => {
  const weekends = [];
  const date = new Date(year, month, 1);
  
  // Find all Fridays in the month
  while (date.getMonth() === month) {
    if (date.getDay() === 5) { // Friday
      weekends.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  
  return weekends;
};

// Assign cities to weekends (alternating Marrakech/Agadir)
const getWeekendCity = (weekendIndex) => {
  return weekendIndex % 2 === 0 ? "Marrakech" : "Agadir";
};

const PROGRAM = [
  { 
    day: "Vendredi", 
    icon: <Moon size={20} />,
    activities: [
      { time: "18:00", activity: "Arrivée & Installation" },
      { time: "20:00", activity: "Dîner de groupe" }
    ]
  },
  { 
    day: "Samedi", 
    icon: <Sun size={20} />,
    activities: [
      { time: "09:00 - 12:00", activity: "Session Self-Défense", highlight: true },
      { time: "12:30", activity: "Déjeuner" },
      { time: "14:00 - 18:00", activity: "Temps libre / Exploration" },
      { time: "20:00", activity: "Dîner" }
    ]
  },
  { 
    day: "Dimanche", 
    icon: <Sun size={20} />,
    activities: [
      { time: "09:00 - 12:00", activity: "Session Self-Défense", highlight: true },
      { time: "12:30", activity: "Déjeuner de clôture" },
      { time: "14:00", activity: "Départ" }
    ]
  }
];

const SelfDefensePage = () => {
  const { language } = useLanguage();
  const t = pageTranslations[language] || pageTranslations.en;
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekend, setSelectedWeekend] = useState(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const weekends = generateWeekends(currentYear, currentMonth);

  const monthNames = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    pt: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    it: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
  };
  
  const months = monthNames[language] || monthNames.en;

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedWeekend(null);
  };

  const formatWeekendDate = (friday) => {
    const sunday = new Date(friday);
    sunday.setDate(sunday.getDate() + 2);
    return `${friday.getDate()} - ${sunday.getDate()} ${months[friday.getMonth()]}`;
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600" 
            alt="Self-defense training"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-sunset rounded-full flex items-center justify-center">
                <Shield size={28} className="text-white" />
              </div>
              <span className="bg-sunset/20 text-sand px-4 py-1 rounded-full text-sm font-dm">Weekend Experience</span>
              <span className="bg-white/10 text-white/80 px-4 py-1 rounded-full text-sm font-dm">3 jours / 2 nuits</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Self-Defense Weekend
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">{t.heroSubtitle}</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              {t.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Info */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Calendar size={20} />, label: language === 'fr' ? 'Durée' : language === 'es' ? 'Duración' : language === 'it' ? 'Durata' : language === 'de' ? 'Dauer' : language === 'pt' ? 'Duração' : 'Duration', value: t.format2n3d },
              { icon: <Clock size={20} />, label: language === 'fr' ? 'Horaires' : language === 'es' ? 'Horario' : language === 'it' ? 'Orario' : language === 'de' ? 'Zeiten' : language === 'pt' ? 'Horário' : 'Schedule', value: t.formatDesc },
              { icon: <Users size={20} />, label: language === 'fr' ? 'Groupe' : language === 'es' ? 'Grupo' : language === 'it' ? 'Gruppo' : language === 'de' ? 'Gruppe' : language === 'pt' ? 'Grupo' : 'Group', value: "Max 10" },
              { icon: <MapPin size={20} />, label: language === 'fr' ? 'Villes' : language === 'es' ? 'Ciudades' : language === 'it' ? 'Città' : language === 'de' ? 'Städte' : language === 'pt' ? 'Cidades' : 'Cities', value: "Marrakech / Agadir" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-sunset/10 rounded-full flex items-center justify-center mx-auto mb-2 text-sunset">
                  {item.icon}
                </div>
                <p className="font-dm text-ocean/60 text-xs mb-1">{item.label}</p>
                <p className="font-syne font-bold text-ocean text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2 text-center">{language === 'fr' ? 'Calendrier des Weekends' : language === 'es' ? 'Calendario de Fines de Semana' : language === 'it' ? 'Calendario dei Weekend' : language === 'de' ? 'Wochenend-Kalender' : language === 'pt' ? 'Calendário de Fins de Semana' : 'Weekend Calendar'}</h2>
          <p className="font-dm text-ocean/60 text-center mb-8">{language === 'fr' ? 'Choisissez votre weekend' : language === 'es' ? 'Elige tu fin de semana' : language === 'it' ? 'Scegli il tuo weekend' : language === 'de' ? 'Wählen Sie Ihr Wochenende' : language === 'pt' ? 'Escolha seu fim de semana' : 'Choose your weekend'}</p>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth(-1)}
              className="rounded-full"
            >
              <ChevronLeft size={18} />
            </Button>
            <h3 className="font-syne font-bold text-xl text-ocean">
              {months[currentMonth]} {currentYear}
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth(1)}
              className="rounded-full"
            >
              <ChevronRight size={18} />
            </Button>
          </div>

          {/* Weekends Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {weekends.map((friday, index) => {
              const city = getWeekendCity(index);
              const isPast = friday < new Date();
              const isSelected = selectedWeekend?.getTime() === friday.getTime();
              
              return (
                <button
                  key={friday.toISOString()}
                  onClick={() => !isPast && setSelectedWeekend(friday)}
                  disabled={isPast}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isPast 
                      ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      : isSelected
                        ? "border-sunset bg-sunset/5 shadow-lg"
                        : "border-border hover:border-sunset/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-syne font-bold ${isPast ? "text-gray-400" : "text-ocean"}`}>
                      Weekend {index + 1}
                    </span>
                    <span className={`text-xs font-dm px-2 py-1 rounded-full ${
                      city === "Marrakech" 
                        ? "bg-red-100 text-red-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className={isPast ? "text-gray-400" : "text-sunset"} />
                    <span className={`font-dm ${isPast ? "text-gray-400" : "text-ocean/70"}`}>
                      {formatWeekendDate(friday)}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-sunset/20">
                      <span className="text-sunset font-dm text-sm flex items-center gap-1">
                        <Check size={14} /> Sélectionné
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Book Button */}
          {selectedWeekend && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Card className="border-none bg-ocean text-white inline-block">
                <CardContent className="p-6">
                  <p className="font-dm text-white/70 text-sm mb-2">Votre sélection</p>
                  <p className="font-syne font-bold text-xl mb-1">
                    Self-Defense Weekend – {getWeekendCity(weekends.findIndex(w => w.getTime() === selectedWeekend.getTime()))}
                  </p>
                  <p className="font-dm text-sand mb-4">{formatWeekendDate(selectedWeekend)}</p>
                  <Button asChild className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
                    <Link to={`/book?experience=self-defense&city=${getWeekendCity(weekends.findIndex(w => w.getTime() === selectedWeekend.getTime())).toLowerCase()}&date=${selectedWeekend.toISOString()}`}>
                      Réserver ce weekend <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Programme du Weekend</h2>
          
          <div className="space-y-4">
            {PROGRAM.map((day, dayIndex) => (
              <Card key={dayIndex} className="border-none overflow-hidden">
                <div className={`p-4 ${dayIndex === 0 ? 'bg-ocean' : 'bg-sunset'} text-white flex items-center gap-3`}>
                  {day.icon}
                  <h3 className="font-syne font-bold text-lg">{day.day}</h3>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {day.activities.map((activity, actIndex) => (
                      <div 
                        key={actIndex} 
                        className={`flex items-center gap-4 p-3 rounded-lg ${
                          activity.highlight ? 'bg-sunset/10' : 'bg-warmwhite'
                        }`}
                      >
                        <span className="font-dm text-ocean/60 text-sm w-24 flex-shrink-0">{activity.time}</span>
                        <span className={`font-dm ${activity.highlight ? 'font-semibold text-ocean' : 'text-ocean/80'}`}>
                          {activity.activity}
                        </span>
                        {activity.highlight && <Shield size={16} className="text-sunset ml-auto" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">Tarif Weekend</h2>
          <div className="bg-white/10 rounded-2xl p-8 mb-6">
            <p className="font-syne font-extrabold text-5xl text-sand mb-2">€250</p>
            <p className="font-dm text-white/70">par personne</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-left max-w-md mx-auto">
            {[
              "2 sessions de self-défense",
              "2 nuits d'hébergement",
              "Tous les repas inclus",
              "Groupe max 10 personnes",
              "Coach certifié",
              "Certificat de participation"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={16} className="text-sand flex-shrink-0" />
                <span className="font-dm text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Nos Destinations</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600" alt="Marrakech" className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-syne font-bold text-lg text-ocean flex items-center gap-2">
                    <MapPin size={16} className="text-sunset" /> Marrakech
                  </h3>
                  <span className="text-xs font-dm bg-red-100 text-red-700 px-2 py-1 rounded-full">Weekends 1 & 3</span>
                </div>
                <p className="font-dm text-ocean/70 text-sm">
                  La ville rouge. Entraînez-vous avec vue sur l'Atlas, explorez la médina le soir.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1553522987-b6cb62385487?w=600" alt="Agadir" className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-syne font-bold text-lg text-ocean flex items-center gap-2">
                    <MapPin size={16} className="text-sunset" /> Agadir
                  </h3>
                  <span className="text-xs font-dm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Weekends 2 & 4</span>
                </div>
                <p className="font-dm text-ocean/70 text-sm">
                  Ambiance plage. Session training le matin, détente sur la plage l'après-midi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2">Réserver votre weekend</h2>
            <p className="font-dm text-ocean/70 mb-6">Self-Defense Weekend • €250</p>
            <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
              <Link to="/book?experience=self-defense">
                Réserver maintenant <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">Prêt pour votre weekend ?</h2>
          <p className="font-dm text-white/80 mb-6">
            Rejoignez-nous pour un weekend de self-défense au Maroc.
          </p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <a href="#booking">Réserver maintenant <ArrowRight size={18} className="ml-2" /></a>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default SelfDefensePage;
