import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Waves, Utensils, Map, Car, ArrowRight, Info, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    heroSubtitle: "Enhance Your Trip",
    heroTitle: "Optional Activities",
    heroDesc: "Add extra experiences to your trip. All activities are optional and can be booked through your referent.",
    activitiesTitle: "Available Activities",
    activitiesDesc: "These activities can be added to any experience package.",
    locations: "Locations",
    includes: "Includes",
    howToBook: "How to Book",
    howToBookText: "All activities are booked through your THE BRIDGE referent. Prices are local rates — we don't add any commission.",
    ctaTitle: "Ready to explore?",
    ctaButton: "Book Your Experience",
    activities: [
      { id: "surf", title: "Surf Lessons", description: "Ride the Atlantic waves with experienced local instructors. Perfect for beginners and intermediate surfers.", locations: ["Agadir", "Taghazout"], includes: ["Equipment rental", "Instructor", "2-hour session"] },
      { id: "cooking", title: "Cooking Class", description: "Learn to prepare authentic Moroccan dishes — tagines, couscous, pastilla and more.", locations: ["Marrakech", "Casablanca"], includes: ["Ingredients", "Chef guidance", "Full meal"] },
      { id: "city-tours", title: "City Tours", description: "Guided walking tours through medinas, historical sites, and hidden gems with local experts.", locations: ["All cities"], includes: ["Local guide", "3-4 hours", "Small group"] },
      { id: "quad-desert", title: "Quad / Desert Trip", description: "Adventure into the desert on quad bikes. Experience dunes, palm groves, and Berber villages.", locations: ["Marrakech", "Agadir"], includes: ["Quad rental", "Guide", "Safety gear", "Tea break"] },
      { id: "hammam", title: "Hammam & Massage", description: "Traditional Moroccan spa experience. Relax and recover after your training sessions.", locations: ["All cities"], includes: ["Traditional hammam", "Gommage", "Relaxation area"] },
      { id: "paradise-valley", title: "Paradise Valley", description: "Day trip to the stunning natural pools and waterfalls of Paradise Valley near Agadir.", locations: ["Agadir"], includes: ["Transport", "Guide", "Swimming stops"] }
    ]
  },
  fr: {
    heroSubtitle: "Enrichissez votre voyage",
    heroTitle: "Activités Optionnelles",
    heroDesc: "Ajoutez des expériences supplémentaires à votre voyage. Toutes les activités sont optionnelles et peuvent être réservées via votre référent.",
    activitiesTitle: "Activités Disponibles",
    activitiesDesc: "Ces activités peuvent être ajoutées à n'importe quel forfait d'expérience.",
    locations: "Lieux",
    includes: "Inclus",
    howToBook: "Comment réserver",
    howToBookText: "Toutes les activités sont réservées via votre référent THE BRIDGE. Les prix sont les tarifs locaux — nous n'ajoutons aucune commission.",
    ctaTitle: "Prêt à explorer ?",
    ctaButton: "Réserver votre expérience",
    activities: [
      { id: "surf", title: "Cours de Surf", description: "Surfez sur les vagues de l'Atlantique avec des instructeurs locaux expérimentés. Parfait pour les débutants et intermédiaires.", locations: ["Agadir", "Taghazout"], includes: ["Location d'équipement", "Instructeur", "Session de 2h"] },
      { id: "cooking", title: "Cours de Cuisine", description: "Apprenez à préparer des plats marocains authentiques — tajines, couscous, pastilla et plus.", locations: ["Marrakech", "Casablanca"], includes: ["Ingrédients", "Chef", "Repas complet"] },
      { id: "city-tours", title: "Visites de la Ville", description: "Visites guidées à pied des médinas, sites historiques et trésors cachés avec des experts locaux.", locations: ["Toutes les villes"], includes: ["Guide local", "3-4 heures", "Petit groupe"] },
      { id: "quad-desert", title: "Quad / Excursion Désert", description: "Aventurez-vous dans le désert en quad. Découvrez les dunes, palmeraies et villages berbères.", locations: ["Marrakech", "Agadir"], includes: ["Location quad", "Guide", "Équipement de sécurité", "Pause thé"] },
      { id: "hammam", title: "Hammam & Massage", description: "Expérience spa marocaine traditionnelle. Détendez-vous et récupérez après vos séances d'entraînement.", locations: ["Toutes les villes"], includes: ["Hammam traditionnel", "Gommage", "Espace détente"] },
      { id: "paradise-valley", title: "Vallée du Paradis", description: "Excursion d'une journée aux magnifiques piscines naturelles et cascades de la Vallée du Paradis près d'Agadir.", locations: ["Agadir"], includes: ["Transport", "Guide", "Arrêts baignade"] }
    ]
  },
  es: {
    heroSubtitle: "Mejora tu viaje",
    heroTitle: "Actividades Opcionales",
    heroDesc: "Añade experiencias extra a tu viaje. Todas las actividades son opcionales y se pueden reservar a través de tu referente.",
    activitiesTitle: "Actividades Disponibles",
    activitiesDesc: "Estas actividades se pueden añadir a cualquier paquete de experiencia.",
    locations: "Ubicaciones",
    includes: "Incluye",
    howToBook: "Cómo reservar",
    howToBookText: "Todas las actividades se reservan a través de tu referente THE BRIDGE. Los precios son tarifas locales — no añadimos ninguna comisión.",
    ctaTitle: "¿Listo para explorar?",
    ctaButton: "Reserva tu experiencia",
    activities: [
      { id: "surf", title: "Clases de Surf", description: "Surfea las olas del Atlántico con instructores locales experimentados. Perfecto para principiantes e intermedios.", locations: ["Agadir", "Taghazout"], includes: ["Alquiler de equipo", "Instructor", "Sesión de 2h"] },
      { id: "cooking", title: "Clase de Cocina", description: "Aprende a preparar platos marroquíes auténticos — tajines, cuscús, pastilla y más.", locations: ["Marrakech", "Casablanca"], includes: ["Ingredientes", "Chef", "Comida completa"] },
      { id: "city-tours", title: "Tours de la Ciudad", description: "Tours guiados a pie por medinas, sitios históricos y joyas escondidas con expertos locales.", locations: ["Todas las ciudades"], includes: ["Guía local", "3-4 horas", "Grupo pequeño"] },
      { id: "quad-desert", title: "Quad / Excursión al Desierto", description: "Aventúrate en el desierto en quad. Experimenta dunas, palmerales y aldeas bereberes.", locations: ["Marrakech", "Agadir"], includes: ["Alquiler de quad", "Guía", "Equipo de seguridad", "Pausa para té"] },
      { id: "hammam", title: "Hammam & Masaje", description: "Experiencia de spa marroquí tradicional. Relájate y recupérate después de tus sesiones de entrenamiento.", locations: ["Todas las ciudades"], includes: ["Hammam tradicional", "Exfoliación", "Área de relajación"] },
      { id: "paradise-valley", title: "Valle del Paraíso", description: "Excursión de un día a las impresionantes piscinas naturales y cascadas del Valle del Paraíso cerca de Agadir.", locations: ["Agadir"], includes: ["Transporte", "Guía", "Paradas para nadar"] }
    ]
  },
  pt: {
    heroSubtitle: "Aprimore sua viagem",
    heroTitle: "Atividades Opcionais",
    heroDesc: "Adicione experiências extras à sua viagem. Todas as atividades são opcionais e podem ser reservadas através do seu referente.",
    activitiesTitle: "Atividades Disponíveis",
    activitiesDesc: "Estas atividades podem ser adicionadas a qualquer pacote de experiência.",
    locations: "Locais",
    includes: "Inclui",
    howToBook: "Como reservar",
    howToBookText: "Todas as atividades são reservadas através do seu referente THE BRIDGE. Os preços são tarifas locais — não adicionamos nenhuma comissão.",
    ctaTitle: "Pronto para explorar?",
    ctaButton: "Reserve sua experiência",
    activities: [
      { id: "surf", title: "Aulas de Surf", description: "Surfe as ondas do Atlântico com instrutores locais experientes. Perfeito para iniciantes e intermediários.", locations: ["Agadir", "Taghazout"], includes: ["Aluguel de equipamento", "Instrutor", "Sessão de 2h"] },
      { id: "cooking", title: "Aula de Culinária", description: "Aprenda a preparar pratos marroquinos autênticos — tajines, couscous, pastilla e mais.", locations: ["Marrakech", "Casablanca"], includes: ["Ingredientes", "Chef", "Refeição completa"] },
      { id: "city-tours", title: "Tours pela Cidade", description: "Tours guiados a pé pelas medinas, locais históricos e joias escondidas com especialistas locais.", locations: ["Todas as cidades"], includes: ["Guia local", "3-4 horas", "Grupo pequeno"] },
      { id: "quad-desert", title: "Quad / Excursão ao Deserto", description: "Aventure-se no deserto de quadriciclo. Experimente dunas, palmeirais e aldeias berberes.", locations: ["Marrakech", "Agadir"], includes: ["Aluguel de quad", "Guia", "Equipamento de segurança", "Pausa para chá"] },
      { id: "hammam", title: "Hammam & Massagem", description: "Experiência de spa marroquino tradicional. Relaxe e recupere-se após suas sessões de treino.", locations: ["Todas as cidades"], includes: ["Hammam tradicional", "Esfoliação", "Área de relaxamento"] },
      { id: "paradise-valley", title: "Vale do Paraíso", description: "Passeio de um dia às deslumbrantes piscinas naturais e cachoeiras do Vale do Paraíso perto de Agadir.", locations: ["Agadir"], includes: ["Transporte", "Guia", "Paradas para nadar"] }
    ]
  },
  de: {
    heroSubtitle: "Bereichern Sie Ihre Reise",
    heroTitle: "Optionale Aktivitäten",
    heroDesc: "Fügen Sie Ihrer Reise zusätzliche Erlebnisse hinzu. Alle Aktivitäten sind optional und können über Ihren Ansprechpartner gebucht werden.",
    activitiesTitle: "Verfügbare Aktivitäten",
    activitiesDesc: "Diese Aktivitäten können zu jedem Erlebnispaket hinzugefügt werden.",
    locations: "Orte",
    includes: "Inklusive",
    howToBook: "Wie buchen",
    howToBookText: "Alle Aktivitäten werden über Ihren THE BRIDGE Ansprechpartner gebucht. Die Preise sind lokale Tarife — wir fügen keine Provision hinzu.",
    ctaTitle: "Bereit zu erkunden?",
    ctaButton: "Buchen Sie Ihr Erlebnis",
    activities: [
      { id: "surf", title: "Surfstunden", description: "Reiten Sie die Atlantikwellen mit erfahrenen lokalen Instruktoren. Perfekt für Anfänger und Fortgeschrittene.", locations: ["Agadir", "Taghazout"], includes: ["Ausrüstungsverleih", "Instruktor", "2-Stunden-Session"] },
      { id: "cooking", title: "Kochkurs", description: "Lernen Sie, authentische marokkanische Gerichte zuzubereiten — Tajines, Couscous, Pastilla und mehr.", locations: ["Marrakesch", "Casablanca"], includes: ["Zutaten", "Koch", "Vollständige Mahlzeit"] },
      { id: "city-tours", title: "Stadtführungen", description: "Geführte Wanderungen durch Medinas, historische Stätten und versteckte Schätze mit lokalen Experten.", locations: ["Alle Städte"], includes: ["Lokaler Führer", "3-4 Stunden", "Kleine Gruppe"] },
      { id: "quad-desert", title: "Quad / Wüstentour", description: "Abenteuer in der Wüste mit Quads. Erleben Sie Dünen, Palmenhaine und Berberdörfer.", locations: ["Marrakesch", "Agadir"], includes: ["Quad-Verleih", "Führer", "Sicherheitsausrüstung", "Teepause"] },
      { id: "hammam", title: "Hammam & Massage", description: "Traditionelles marokkanisches Spa-Erlebnis. Entspannen und erholen Sie sich nach Ihren Trainingseinheiten.", locations: ["Alle Städte"], includes: ["Traditionelles Hammam", "Peeling", "Entspannungsbereich"] },
      { id: "paradise-valley", title: "Paradies-Tal", description: "Tagesausflug zu den atemberaubenden Naturpools und Wasserfällen des Paradiestals bei Agadir.", locations: ["Agadir"], includes: ["Transport", "Führer", "Badestopps"] }
    ]
  },
  it: {
    heroSubtitle: "Arricchisci il tuo viaggio",
    heroTitle: "Attività Opzionali",
    heroDesc: "Aggiungi esperienze extra al tuo viaggio. Tutte le attività sono opzionali e possono essere prenotate tramite il tuo referente.",
    activitiesTitle: "Attività Disponibili",
    activitiesDesc: "Queste attività possono essere aggiunte a qualsiasi pacchetto esperienza.",
    locations: "Località",
    includes: "Include",
    howToBook: "Come prenotare",
    howToBookText: "Tutte le attività vengono prenotate tramite il tuo referente THE BRIDGE. I prezzi sono tariffe locali — non aggiungiamo alcuna commissione.",
    ctaTitle: "Pronto a esplorare?",
    ctaButton: "Prenota la tua esperienza",
    activities: [
      { id: "surf", title: "Lezioni di Surf", description: "Cavalca le onde dell'Atlantico con istruttori locali esperti. Perfetto per principianti e intermedi.", locations: ["Agadir", "Taghazout"], includes: ["Noleggio attrezzatura", "Istruttore", "Sessione di 2h"] },
      { id: "cooking", title: "Corso di Cucina", description: "Impara a preparare piatti marocchini autentici — tajine, couscous, pastilla e altro.", locations: ["Marrakech", "Casablanca"], includes: ["Ingredienti", "Chef", "Pasto completo"] },
      { id: "city-tours", title: "Tour della Città", description: "Tour guidati a piedi attraverso medine, siti storici e gemme nascoste con esperti locali.", locations: ["Tutte le città"], includes: ["Guida locale", "3-4 ore", "Piccolo gruppo"] },
      { id: "quad-desert", title: "Quad / Escursione nel Deserto", description: "Avventurati nel deserto in quad. Scopri dune, palmeti e villaggi berberi.", locations: ["Marrakech", "Agadir"], includes: ["Noleggio quad", "Guida", "Attrezzatura di sicurezza", "Pausa tè"] },
      { id: "hammam", title: "Hammam & Massaggio", description: "Esperienza spa marocchina tradizionale. Rilassati e recupera dopo le tue sessioni di allenamento.", locations: ["Tutte le città"], includes: ["Hammam tradizionale", "Gommage", "Area relax"] },
      { id: "paradise-valley", title: "Valle del Paradiso", description: "Gita di un giorno alle splendide piscine naturali e cascate della Valle del Paradiso vicino ad Agadir.", locations: ["Agadir"], includes: ["Trasporto", "Guida", "Soste per nuotare"] }
    ]
  }
};

const ACTIVITY_ICONS = {
  "surf": <Waves size={28} />,
  "cooking": <Utensils size={28} />,
  "city-tours": <Map size={28} />,
  "quad-desert": <Car size={28} />,
  "hammam": <Waves size={28} />,
  "paradise-valley": <Map size={28} />
};

const ACTIVITY_IMAGES = {
  "surf": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400",
  "cooking": "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
  "city-tours": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400",
  "quad-desert": "https://images.unsplash.com/photo-1662009833223-75d3301290bd?w=400",
  "hammam": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
  "paradise-valley": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400"
};

const ActivitiesPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-sand rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-sunset rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-caveat text-sand text-xl mb-2">{t.heroSubtitle}</p>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              {t.heroTitle}
            </h1>
            <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto">
              {t.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-4">{t.activitiesTitle}</h2>
            <p className="font-dm text-ocean/70">{t.activitiesDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={ACTIVITY_IMAGES[activity.id]} 
                      alt={activity.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-sunset/10 rounded-lg flex items-center justify-center text-sunset">
                        {ACTIVITY_ICONS[activity.id]}
                      </div>
                      <h3 className="font-syne font-bold text-lg text-ocean">{activity.title}</h3>
                    </div>
                    <p className="font-dm text-ocean/70 text-sm mb-4">{activity.description}</p>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-dm font-medium text-ocean mb-1">{t.locations}:</p>
                        <p className="font-dm text-ocean/60">{activity.locations.join(", ")}</p>
                      </div>
                      <div>
                        <p className="font-dm font-medium text-ocean mb-1">{t.includes}:</p>
                        <ul className="space-y-1">
                          {activity.includes.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 font-dm text-ocean/60">
                              <Check className="text-sunset" size={14} /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <Info className="mx-auto text-sunset mb-4" size={40} />
          <h2 className="font-syne font-bold text-2xl text-ocean mb-4">{t.howToBook}</h2>
          <p className="font-dm text-ocean/70">
            {t.howToBookText}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-6">{t.ctaTitle}</h2>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book">{t.ctaButton} <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default ActivitiesPage;
