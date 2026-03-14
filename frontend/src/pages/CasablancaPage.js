import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, ArrowRight, Sun, Users, Home, Shield, 
  Languages, Camera, Check, Star, Utensils, Building,
  Plane, Clock, Thermometer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    destination: "Destination",
    tagline: "Morocco's modern metropolis",
    heroDesc: "The economic heart of Morocco. Where tradition meets modernity in a stunning blend of Art Deco architecture and vibrant street life.",
    aboutTitle: "About the City",
    aboutP1: "Casablanca is Morocco's largest city and economic powerhouse. Unlike the ancient medinas of Marrakech or Fes, Casa offers a more modern, cosmopolitan experience while still maintaining deep Moroccan roots.",
    aboutP2: "The city is famous for its stunning Art Deco architecture, the magnificent Hassan II Mosque (one of the largest in the world), and a vibrant nightlife scene. The Corniche beachfront offers seaside relaxation just minutes from the city center.",
    tags: ["Modern city", "Art Deco architecture", "Beach access", "International airport"],
    experiencesTitle: "Experiences Available",
    highlights: "Highlights",
    highlightsList: [
      { title: "Hassan II Mosque", desc: "One of the largest mosques in the world, with a stunning oceanfront location." },
      { title: "Art Deco Downtown", desc: "Walk through the historic center with its beautiful 1930s architecture." },
      { title: "Corniche Beachfront", desc: "Relax at cafes and restaurants along the Atlantic coast." },
      { title: "Central Market", desc: "Experience the vibrant local life and fresh Moroccan produce." }
    ],
    practicalInfo: "Practical Information",
    practicalItems: [
      { label: "Getting There", value: "Mohammed V International Airport (CMN), 30km from city center" },
      { label: "Best Time", value: "March to June, September to November" },
      { label: "Climate", value: "Mediterranean, mild year-round (15-28°C)" },
      { label: "Languages", value: "Arabic, French, English widely spoken" }
    ],
    ctaTitle: "Ready to explore Casablanca?",
    ctaButton: "Book Your Experience"
  },
  fr: {
    destination: "Destination",
    tagline: "La métropole moderne du Maroc",
    heroDesc: "Le cœur économique du Maroc. Où la tradition rencontre la modernité dans un mélange époustouflant d'architecture Art Déco et de vie de rue vibrante.",
    aboutTitle: "À Propos de la Ville",
    aboutP1: "Casablanca est la plus grande ville du Maroc et sa puissance économique. Contrairement aux anciennes médinas de Marrakech ou Fès, Casa offre une expérience plus moderne et cosmopolite tout en conservant des racines marocaines profondes.",
    aboutP2: "La ville est célèbre pour sa superbe architecture Art Déco, la magnifique mosquée Hassan II (l'une des plus grandes au monde) et une vie nocturne animée. La Corniche offre des moments de détente en bord de mer à quelques minutes du centre-ville.",
    tags: ["Ville moderne", "Architecture Art Déco", "Accès plage", "Aéroport international"],
    experiencesTitle: "Expériences Disponibles",
    highlights: "Points Forts",
    highlightsList: [
      { title: "Mosquée Hassan II", desc: "L'une des plus grandes mosquées du monde, avec un emplacement magnifique en bord de mer." },
      { title: "Centre-ville Art Déco", desc: "Promenez-vous dans le centre historique avec sa belle architecture des années 1930." },
      { title: "Corniche", desc: "Détendez-vous dans les cafés et restaurants le long de la côte atlantique." },
      { title: "Marché Central", desc: "Découvrez la vie locale vibrante et les produits frais marocains." }
    ],
    practicalInfo: "Informations Pratiques",
    practicalItems: [
      { label: "Comment y aller", value: "Aéroport International Mohammed V (CMN), 30km du centre-ville" },
      { label: "Meilleure période", value: "Mars à juin, septembre à novembre" },
      { label: "Climat", value: "Méditerranéen, doux toute l'année (15-28°C)" },
      { label: "Langues", value: "Arabe, français, anglais largement parlé" }
    ],
    ctaTitle: "Prêt à explorer Casablanca ?",
    ctaButton: "Réserver votre expérience"
  },
  es: {
    destination: "Destino",
    tagline: "La metrópolis moderna de Marruecos",
    heroDesc: "El corazón económico de Marruecos. Donde la tradición se encuentra con la modernidad en una impresionante mezcla de arquitectura Art Deco y vida callejera vibrante.",
    aboutTitle: "Sobre la Ciudad",
    aboutP1: "Casablanca es la ciudad más grande de Marruecos y su potencia económica. A diferencia de las antiguas medinas de Marrakech o Fez, Casa ofrece una experiencia más moderna y cosmopolita mientras mantiene profundas raíces marroquíes.",
    aboutP2: "La ciudad es famosa por su impresionante arquitectura Art Deco, la magnífica Mezquita Hassan II (una de las más grandes del mundo) y una vibrante vida nocturna. El paseo marítimo Corniche ofrece relajación junto al mar a pocos minutos del centro de la ciudad.",
    tags: ["Ciudad moderna", "Arquitectura Art Deco", "Acceso a playa", "Aeropuerto internacional"],
    experiencesTitle: "Experiencias Disponibles",
    highlights: "Destacados",
    highlightsList: [
      { title: "Mezquita Hassan II", desc: "Una de las mezquitas más grandes del mundo, con una ubicación impresionante frente al océano." },
      { title: "Centro Art Deco", desc: "Pasea por el centro histórico con su hermosa arquitectura de los años 30." },
      { title: "Paseo Marítimo Corniche", desc: "Relájate en cafés y restaurantes a lo largo de la costa atlántica." },
      { title: "Mercado Central", desc: "Experimenta la vibrante vida local y productos frescos marroquíes." }
    ],
    practicalInfo: "Información Práctica",
    practicalItems: [
      { label: "Cómo llegar", value: "Aeropuerto Internacional Mohammed V (CMN), 30km del centro" },
      { label: "Mejor época", value: "Marzo a junio, septiembre a noviembre" },
      { label: "Clima", value: "Mediterráneo, templado todo el año (15-28°C)" },
      { label: "Idiomas", value: "Árabe, francés, inglés ampliamente hablado" }
    ],
    ctaTitle: "¿Listo para explorar Casablanca?",
    ctaButton: "Reserva tu experiencia"
  },
  pt: {
    destination: "Destino",
    tagline: "A metrópole moderna do Marrocos",
    heroDesc: "O coração econômico do Marrocos. Onde a tradição encontra a modernidade em uma mistura deslumbrante de arquitetura Art Deco e vida de rua vibrante.",
    aboutTitle: "Sobre a Cidade",
    aboutP1: "Casablanca é a maior cidade do Marrocos e sua potência econômica. Diferente das antigas medinas de Marrakech ou Fez, Casa oferece uma experiência mais moderna e cosmopolita, mantendo profundas raízes marroquinas.",
    aboutP2: "A cidade é famosa por sua deslumbrante arquitetura Art Deco, a magnífica Mesquita Hassan II (uma das maiores do mundo) e uma vibrante vida noturna. A orla Corniche oferece relaxamento à beira-mar a poucos minutos do centro da cidade.",
    tags: ["Cidade moderna", "Arquitetura Art Deco", "Acesso à praia", "Aeroporto internacional"],
    experiencesTitle: "Experiências Disponíveis",
    highlights: "Destaques",
    highlightsList: [
      { title: "Mesquita Hassan II", desc: "Uma das maiores mesquitas do mundo, com localização impressionante à beira-mar." },
      { title: "Centro Art Deco", desc: "Caminhe pelo centro histórico com sua bela arquitetura dos anos 1930." },
      { title: "Orla Corniche", desc: "Relaxe em cafés e restaurantes ao longo da costa atlântica." },
      { title: "Mercado Central", desc: "Experimente a vibrante vida local e produtos frescos marroquinos." }
    ],
    practicalInfo: "Informações Práticas",
    practicalItems: [
      { label: "Como chegar", value: "Aeroporto Internacional Mohammed V (CMN), 30km do centro" },
      { label: "Melhor época", value: "Março a junho, setembro a novembro" },
      { label: "Clima", value: "Mediterrâneo, ameno o ano todo (15-28°C)" },
      { label: "Idiomas", value: "Árabe, francês, inglês amplamente falado" }
    ],
    ctaTitle: "Pronto para explorar Casablanca?",
    ctaButton: "Reserve sua experiência"
  },
  de: {
    destination: "Reiseziel",
    tagline: "Marokkos moderne Metropole",
    heroDesc: "Das wirtschaftliche Herz Marokkos. Wo Tradition auf Moderne trifft in einer atemberaubenden Mischung aus Art-Deco-Architektur und pulsierendem Straßenleben.",
    aboutTitle: "Über die Stadt",
    aboutP1: "Casablanca ist Marokkos größte Stadt und wirtschaftliches Kraftzentrum. Im Gegensatz zu den alten Medinas von Marrakesch oder Fes bietet Casa ein moderneres, kosmopolitischeres Erlebnis, während es tiefe marokkanische Wurzeln bewahrt.",
    aboutP2: "Die Stadt ist berühmt für ihre atemberaubende Art-Deco-Architektur, die prächtige Hassan-II-Moschee (eine der größten der Welt) und ein pulsierendes Nachtleben. Die Strandpromenade Corniche bietet Entspannung am Meer nur wenige Minuten vom Stadtzentrum entfernt.",
    tags: ["Moderne Stadt", "Art-Deco-Architektur", "Strandzugang", "Internationaler Flughafen"],
    experiencesTitle: "Verfügbare Erlebnisse",
    highlights: "Highlights",
    highlightsList: [
      { title: "Hassan-II-Moschee", desc: "Eine der größten Moscheen der Welt mit atemberaubender Lage am Ozean." },
      { title: "Art-Deco-Innenstadt", desc: "Spazieren Sie durch das historische Zentrum mit seiner schönen Architektur der 1930er Jahre." },
      { title: "Strandpromenade Corniche", desc: "Entspannen Sie in Cafés und Restaurants entlang der Atlantikküste." },
      { title: "Zentralmarkt", desc: "Erleben Sie das pulsierende lokale Leben und frische marokkanische Produkte." }
    ],
    practicalInfo: "Praktische Informationen",
    practicalItems: [
      { label: "Anreise", value: "Internationaler Flughafen Mohammed V (CMN), 30km vom Zentrum" },
      { label: "Beste Reisezeit", value: "März bis Juni, September bis November" },
      { label: "Klima", value: "Mediterran, mild das ganze Jahr (15-28°C)" },
      { label: "Sprachen", value: "Arabisch, Französisch, Englisch weit verbreitet" }
    ],
    ctaTitle: "Bereit, Casablanca zu erkunden?",
    ctaButton: "Buchen Sie Ihr Erlebnis"
  },
  it: {
    destination: "Destinazione",
    tagline: "La metropoli moderna del Marocco",
    heroDesc: "Il cuore economico del Marocco. Dove la tradizione incontra la modernità in un mix mozzafiato di architettura Art Deco e vivace vita di strada.",
    aboutTitle: "La Città",
    aboutP1: "Casablanca è la città più grande del Marocco e la sua potenza economica. A differenza delle antiche medine di Marrakech o Fes, Casa offre un'esperienza più moderna e cosmopolita pur mantenendo profonde radici marocchine.",
    aboutP2: "La città è famosa per la sua splendida architettura Art Deco, la magnifica Moschea Hassan II (una delle più grandi al mondo) e una vivace vita notturna. Il lungomare Corniche offre relax sul mare a pochi minuti dal centro città.",
    tags: ["Città moderna", "Architettura Art Deco", "Accesso spiaggia", "Aeroporto internazionale"],
    experiencesTitle: "Esperienze Disponibili",
    highlights: "Punti Salienti",
    highlightsList: [
      { title: "Moschea Hassan II", desc: "Una delle moschee più grandi del mondo, con una posizione mozzafiato sull'oceano." },
      { title: "Centro Art Deco", desc: "Passeggia nel centro storico con la sua bella architettura degli anni '30." },
      { title: "Lungomare Corniche", desc: "Rilassati nei caffè e ristoranti lungo la costa atlantica." },
      { title: "Mercato Centrale", desc: "Vivi la vibrante vita locale e i prodotti freschi marocchini." }
    ],
    practicalInfo: "Informazioni Pratiche",
    practicalItems: [
      { label: "Come arrivare", value: "Aeroporto Internazionale Mohammed V (CMN), 30km dal centro" },
      { label: "Periodo migliore", value: "Marzo-giugno, settembre-novembre" },
      { label: "Clima", value: "Mediterraneo, mite tutto l'anno (15-28°C)" },
      { label: "Lingue", value: "Arabo, francese, inglese ampiamente parlato" }
    ],
    ctaTitle: "Pronto a esplorare Casablanca?",
    ctaButton: "Prenota la tua esperienza"
  }
};

const CasablancaPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=1600" 
            alt="Hassan II Mosque Casablanca"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-sand" size={20} />
              <span className="font-dm text-sand text-sm">{t.destination}</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2">
              Casablanca
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">{t.tagline}</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              {t.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About the City */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">{t.aboutTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-4">
                {t.aboutP1}
              </p>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-4">
                {t.aboutP2}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span key={tag} className="bg-ocean/10 text-ocean px-3 py-1 rounded-full text-sm font-dm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=400" alt="Hassan II Mosque" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1669831399403-dd59f1436fa7?w=400" alt="Casablanca cityscape" className="rounded-xl aspect-square object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Available */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">{t.experiencesTitle}</h2>
          <div className="max-w-md mx-auto">
            <Card className="border-none bg-warmwhite">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-4">
                  <Languages size={24} />
                </div>
                <h3 className="font-syne font-bold text-lg text-ocean mb-2">Language Practice</h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">
                  {language === 'fr' ? "Cours d'anglais intensifs dans un cadre moderne et cosmopolite." : 
                   language === 'es' ? "Cursos intensivos de inglés en un entorno moderno y cosmopolita." :
                   language === 'it' ? "Corsi intensivi di inglese in un ambiente moderno e cosmopolita." :
                   language === 'de' ? "Intensive Englischkurse in einer modernen, kosmopolitischen Umgebung." :
                   language === 'pt' ? "Cursos intensivos de inglês em um ambiente moderno e cosmopolita." :
                   "Intensive English courses in a modern, cosmopolitan setting."}
                </p>
                <Button asChild className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full">
                  <Link to="/book?experience=language&city=casablanca">
                    {t.ctaButton} <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">{t.highlights}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.highlightsList.map((item, i) => (
              <Card key={i} className="border-none shadow-md">
                <CardContent className="p-5">
                  <Star className="text-sunset mb-3" size={24} />
                  <h3 className="font-syne font-bold text-ocean mb-2">{item.title}</h3>
                  <p className="font-dm text-ocean/70 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">{t.practicalInfo}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.practicalItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-warmwhite rounded-xl">
                <div className="w-10 h-10 bg-ocean/10 rounded-lg flex items-center justify-center text-ocean flex-shrink-0">
                  {i === 0 ? <Plane size={20} /> : i === 1 ? <Clock size={20} /> : i === 2 ? <Thermometer size={20} /> : <Languages size={20} />}
                </div>
                <div>
                  <p className="font-dm font-medium text-ocean">{item.label}</p>
                  <p className="font-dm text-ocean/70 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-6">{t.ctaTitle}</h2>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book?city=casablanca">{t.ctaButton} <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default CasablancaPage;
