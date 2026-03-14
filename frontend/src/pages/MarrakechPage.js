import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, ArrowRight, Sun, Users, Home, Shield,
  Camera, Check, Star, Mountain, Languages, Plane, Clock, Thermometer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    destination: "Destination",
    tagline: "The Red City",
    heroDesc: "Ancient medinas, stunning palaces, and vibrant souks. The heart of Moroccan culture and the perfect base for adventure.",
    aboutTitle: "About the City",
    aboutP1: "Marrakech is Morocco's most iconic city. The ancient medina, a UNESCO World Heritage site, offers a maze of souks, stunning riads, and the famous Jemaa el-Fnaa square with its snake charmers, storytellers, and food stalls.",
    aboutP2: "Beyond the medina, modern Marrakech offers world-class restaurants, rooftop pools, and easy access to the Atlas Mountains. It's the perfect blend of ancient culture and modern comfort for your training holiday.",
    tags: ["UNESCO Medina", "Atlas Mountains", "Rooftop pools", "Rich culture"],
    experiencesTitle: "Experiences Available",
    selfDefenseDesc: "Self-defense training in the Red City. Explore medinas and souks in the afternoon.",
    storytellingDesc: "Capture the medina, palaces and Atlas views. Perfect for content creators.",
    languageDesc: "20h/week. TOEFL, IELTS, Business English. Free level test.",
    learnMore: "Learn More",
    accommodationTitle: "Accommodation Style",
    accommodationType: "Riads & Partner Hostels",
    accommodationDesc: "Stay in traditional Moroccan riads (courtyard houses) or modern hostels with rooftop terraces. All accommodations are centrally located for easy access to training venues and attractions.",
    accommodationFeatures: ["Private or shared rooms", "Rooftop terraces", "Pool access", "Traditional breakfast", "Walking distance to medina"],
    activitiesTitle: "Activities Nearby",
    activities: [
      { title: "Jemaa el-Fnaa", desc: "Famous main square" },
      { title: "Majorelle Garden", desc: "Stunning blue garden" },
      { title: "Medina Souks", desc: "Traditional markets" },
      { title: "Atlas Mountains", desc: "Day trips available" },
      { title: "Hammam & Spa", desc: "Traditional bathhouses" },
      { title: "Desert Trips", desc: "Camel rides and dunes" }
    ],
    photosTitle: "Photos",
    ctaTitle: "Experience Marrakech",
    ctaDesc: "Book your adventure in the magical Red City.",
    ctaButton: "Book Now",
    highlights: "Highlights",
    highlightsList: [
      { title: "Jemaa el-Fnaa", desc: "UNESCO square buzzing with storytellers, musicians and food stalls at sunset." },
      { title: "Ancient Medina", desc: "Get lost in centuries-old souks filled with spices, crafts and hidden gems." },
      { title: "Majorelle Garden", desc: "Yves Saint Laurent's botanical paradise with iconic cobalt blue accents." },
      { title: "Atlas Mountains", desc: "Day trips to Berber villages and stunning mountain landscapes." }
    ],
    practicalInfo: "Practical Information",
    practicalItems: [
      { label: "Getting There", value: "Marrakech Menara Airport (RAK), 6km from city center" },
      { label: "Best Time", value: "March to May, September to November" },
      { label: "Climate", value: "Semi-arid, hot summers, mild winters (10-38°C)" },
      { label: "Languages", value: "Arabic, French, English widely spoken in tourist areas" }
    ]
  },
  fr: {
    destination: "Destination",
    tagline: "La Ville Rouge",
    heroDesc: "Médinas anciennes, palais somptueux et souks animés. Le cœur de la culture marocaine et la base parfaite pour l'aventure.",
    aboutTitle: "À Propos de la Ville",
    aboutP1: "Marrakech est la ville la plus emblématique du Maroc. L'ancienne médina, classée au patrimoine mondial de l'UNESCO, offre un labyrinthe de souks, de riads magnifiques et la célèbre place Jemaa el-Fnaa avec ses charmeurs de serpents, conteurs et étals de nourriture.",
    aboutP2: "Au-delà de la médina, le Marrakech moderne propose des restaurants de classe mondiale, des piscines sur les toits et un accès facile aux montagnes de l'Atlas. C'est le mélange parfait de culture ancienne et de confort moderne pour vos vacances de formation.",
    tags: ["Médina UNESCO", "Montagnes de l'Atlas", "Piscines sur les toits", "Culture riche"],
    experiencesTitle: "Expériences Disponibles",
    selfDefenseDesc: "Entraînement self-défense dans la ville rouge. Exploration des médinas et souks l'après-midi.",
    storytellingDesc: "Capturez la médina, les palais et les vues sur l'Atlas. Parfait pour les créateurs de contenu.",
    languageDesc: "20h/semaine. TOEFL, IELTS, Business English. Test de niveau gratuit.",
    learnMore: "En savoir plus",
    accommodationTitle: "Type d'Hébergement",
    accommodationType: "Riads & Auberges Partenaires",
    accommodationDesc: "Séjournez dans des riads marocains traditionnels (maisons à cour intérieure) ou des auberges modernes avec terrasses sur le toit. Tous les hébergements sont idéalement situés pour un accès facile aux lieux d'entraînement et attractions.",
    accommodationFeatures: ["Chambres privées ou partagées", "Terrasses sur le toit", "Accès piscine", "Petit-déjeuner traditionnel", "À distance de marche de la médina"],
    activitiesTitle: "Activités à Proximité",
    activities: [
      { title: "Jemaa el-Fnaa", desc: "Célèbre place principale" },
      { title: "Jardin Majorelle", desc: "Magnifique jardin bleu" },
      { title: "Souks de la Médina", desc: "Marchés traditionnels" },
      { title: "Montagnes de l'Atlas", desc: "Excursions d'une journée" },
      { title: "Hammam & Spa", desc: "Bains traditionnels" },
      { title: "Excursions Désert", desc: "Balades à dos de chameau" }
    ],
    photosTitle: "Photos",
    ctaTitle: "Découvrez Marrakech",
    ctaDesc: "Réservez votre aventure dans la magique Ville Rouge.",
    ctaButton: "Réserver",
    highlights: "Points Forts",
    highlightsList: [
      { title: "Jemaa el-Fnaa", desc: "Place UNESCO animée par des conteurs, musiciens et stands de nourriture au coucher du soleil." },
      { title: "Médina Ancienne", desc: "Perdez-vous dans des souks centenaires remplis d'épices, d'artisanat et de trésors cachés." },
      { title: "Jardin Majorelle", desc: "Le paradis botanique d'Yves Saint Laurent avec ses accents bleu cobalt iconiques." },
      { title: "Montagnes de l'Atlas", desc: "Excursions vers les villages berbères et paysages montagneux époustouflants." }
    ],
    practicalInfo: "Informations Pratiques",
    practicalItems: [
      { label: "Comment y aller", value: "Aéroport Marrakech Menara (RAK), 6km du centre-ville" },
      { label: "Meilleure période", value: "Mars à mai, septembre à novembre" },
      { label: "Climat", value: "Semi-aride, étés chauds, hivers doux (10-38°C)" },
      { label: "Langues", value: "Arabe, français, anglais largement parlé dans les zones touristiques" }
    ]
  },
  es: {
    destination: "Destino",
    tagline: "La Ciudad Roja",
    heroDesc: "Medinas antiguas, palacios impresionantes y zocos vibrantes. El corazón de la cultura marroquí y la base perfecta para la aventura.",
    aboutTitle: "Sobre la Ciudad",
    aboutP1: "Marrakech es la ciudad más emblemática de Marruecos. La antigua medina, Patrimonio de la Humanidad de la UNESCO, ofrece un laberinto de zocos, riads impresionantes y la famosa plaza Jemaa el-Fnaa con sus encantadores de serpientes, cuentacuentos y puestos de comida.",
    aboutP2: "Más allá de la medina, el Marrakech moderno ofrece restaurantes de clase mundial, piscinas en las azoteas y fácil acceso a las montañas del Atlas. Es la mezcla perfecta de cultura antigua y confort moderno para tus vacaciones de entrenamiento.",
    tags: ["Medina UNESCO", "Montañas del Atlas", "Piscinas en azoteas", "Cultura rica"],
    experiencesTitle: "Experiencias Disponibles",
    selfDefenseDesc: "Entrenamiento de defensa personal en la Ciudad Roja. Exploración de medinas y zocos por la tarde.",
    storytellingDesc: "Captura la medina, palacios y vistas del Atlas. Perfecto para creadores de contenido.",
    languageDesc: "20h/semana. TOEFL, IELTS, Business English. Prueba de nivel gratuita.",
    learnMore: "Más información",
    accommodationTitle: "Tipo de Alojamiento",
    accommodationType: "Riads y Hostales Asociados",
    accommodationDesc: "Alójate en riads marroquíes tradicionales o hostales modernos con terrazas en la azotea. Todos los alojamientos están ubicados en el centro para fácil acceso a los lugares de entrenamiento y atracciones.",
    accommodationFeatures: ["Habitaciones privadas o compartidas", "Terrazas en azotea", "Acceso a piscina", "Desayuno tradicional", "A pie de la medina"],
    activitiesTitle: "Actividades Cercanas",
    activities: [
      { title: "Jemaa el-Fnaa", desc: "Famosa plaza principal" },
      { title: "Jardín Majorelle", desc: "Impresionante jardín azul" },
      { title: "Zocos de la Medina", desc: "Mercados tradicionales" },
      { title: "Montañas del Atlas", desc: "Excursiones de un día" },
      { title: "Hammam y Spa", desc: "Baños tradicionales" },
      { title: "Excursiones al Desierto", desc: "Paseos en camello" }
    ],
    photosTitle: "Fotos",
    ctaTitle: "Descubre Marrakech",
    ctaDesc: "Reserva tu aventura en la mágica Ciudad Roja.",
    ctaButton: "Reservar",
    highlights: "Destacados",
    highlightsList: [
      { title: "Jemaa el-Fnaa", desc: "Plaza UNESCO llena de cuentacuentos, músicos y puestos de comida al atardecer." },
      { title: "Medina Antigua", desc: "Piérdete en zocos centenarios llenos de especias, artesanía y tesoros ocultos." },
      { title: "Jardín Majorelle", desc: "El paraíso botánico de Yves Saint Laurent con sus icónicos acentos azul cobalto." },
      { title: "Montañas del Atlas", desc: "Excursiones a pueblos bereberes y paisajes montañosos impresionantes." }
    ],
    practicalInfo: "Información Práctica",
    practicalItems: [
      { label: "Cómo llegar", value: "Aeropuerto Marrakech Menara (RAK), 6km del centro" },
      { label: "Mejor época", value: "Marzo a mayo, septiembre a noviembre" },
      { label: "Clima", value: "Semiárido, veranos calurosos, inviernos suaves (10-38°C)" },
      { label: "Idiomas", value: "Árabe, francés, inglés ampliamente hablado en zonas turísticas" }
    ]
  },
  pt: {
    destination: "Destino",
    tagline: "A Cidade Vermelha",
    heroDesc: "Medinas antigas, palácios deslumbrantes e souks vibrantes. O coração da cultura marroquina e a base perfeita para aventura.",
    aboutTitle: "Sobre a Cidade",
    aboutP1: "Marrakech é a cidade mais emblemática do Marrocos. A antiga medina, Patrimônio Mundial da UNESCO, oferece um labirinto de souks, riads deslumbrantes e a famosa praça Jemaa el-Fnaa com seus encantadores de serpentes, contadores de histórias e barracas de comida.",
    aboutP2: "Além da medina, a Marrakech moderna oferece restaurantes de classe mundial, piscinas nas coberturas e fácil acesso às montanhas do Atlas. É a mistura perfeita de cultura antiga e conforto moderno para suas férias de treinamento.",
    tags: ["Medina UNESCO", "Montanhas do Atlas", "Piscinas nas coberturas", "Cultura rica"],
    experiencesTitle: "Experiências Disponíveis",
    selfDefenseDesc: "Treinamento de defesa pessoal na Cidade Vermelha. Exploração de medinas e souks à tarde.",
    storytellingDesc: "Capture a medina, palácios e vistas do Atlas. Perfeito para criadores de conteúdo.",
    languageDesc: "20h/semana. TOEFL, IELTS, Business English. Teste de nível gratuito.",
    learnMore: "Saiba mais",
    accommodationTitle: "Tipo de Hospedagem",
    accommodationType: "Riads e Hostels Parceiros",
    accommodationDesc: "Hospede-se em riads marroquinos tradicionais ou hostels modernos com terraços. Todas as acomodações estão centralmente localizadas para fácil acesso aos locais de treinamento e atrações.",
    accommodationFeatures: ["Quartos privativos ou compartilhados", "Terraços na cobertura", "Acesso à piscina", "Café da manhã tradicional", "A poucos passos da medina"],
    activitiesTitle: "Atividades Próximas",
    activities: [
      { title: "Jemaa el-Fnaa", desc: "Famosa praça principal" },
      { title: "Jardim Majorelle", desc: "Impressionante jardim azul" },
      { title: "Souks da Medina", desc: "Mercados tradicionais" },
      { title: "Montanhas do Atlas", desc: "Passeios de um dia" },
      { title: "Hammam & Spa", desc: "Banhos tradicionais" },
      { title: "Excursões ao Deserto", desc: "Passeios de camelo" }
    ],
    photosTitle: "Fotos",
    ctaTitle: "Descubra Marrakech",
    ctaDesc: "Reserve sua aventura na mágica Cidade Vermelha.",
    ctaButton: "Reservar",
    highlights: "Destaques",
    highlightsList: [
      { title: "Jemaa el-Fnaa", desc: "Praça UNESCO animada com contadores de histórias, músicos e barracas de comida ao pôr do sol." },
      { title: "Medina Antiga", desc: "Perca-se em souks centenários cheios de especiarias, artesanato e tesouros escondidos." },
      { title: "Jardim Majorelle", desc: "O paraíso botânico de Yves Saint Laurent com seus icônicos detalhes azul cobalto." },
      { title: "Montanhas do Atlas", desc: "Excursões para vilas berberes e paisagens montanhosas deslumbrantes." }
    ],
    practicalInfo: "Informações Práticas",
    practicalItems: [
      { label: "Como chegar", value: "Aeroporto Marrakech Menara (RAK), 6km do centro" },
      { label: "Melhor época", value: "Março a maio, setembro a novembro" },
      { label: "Clima", value: "Semiárido, verões quentes, invernos amenos (10-38°C)" },
      { label: "Idiomas", value: "Árabe, francês, inglês amplamente falado em áreas turísticas" }
    ]
  },
  de: {
    destination: "Reiseziel",
    tagline: "Die Rote Stadt",
    heroDesc: "Alte Medinas, atemberaubende Paläste und lebhafte Souks. Das Herz der marokkanischen Kultur und die perfekte Basis für Abenteuer.",
    aboutTitle: "Über die Stadt",
    aboutP1: "Marrakesch ist Marokkos ikonischste Stadt. Die alte Medina, UNESCO-Weltkulturerbe, bietet ein Labyrinth aus Souks, atemberaubenden Riads und dem berühmten Platz Jemaa el-Fnaa mit Schlangenbeschwörern, Geschichtenerzählern und Essensständen.",
    aboutP2: "Jenseits der Medina bietet das moderne Marrakesch Weltklasse-Restaurants, Dachpools und einfachen Zugang zum Atlasgebirge. Es ist die perfekte Mischung aus alter Kultur und modernem Komfort für Ihren Trainingsurlaub.",
    tags: ["UNESCO-Medina", "Atlasgebirge", "Dachpools", "Reiche Kultur"],
    experiencesTitle: "Verfügbare Erlebnisse",
    selfDefenseDesc: "Selbstverteidigungstraining in der Roten Stadt. Erkundung von Medinas und Souks am Nachmittag.",
    storytellingDesc: "Fotografieren Sie die Medina, Paläste und Atlasblicke. Perfekt für Content Creator.",
    languageDesc: "20h/Woche. TOEFL, IELTS, Business English. Kostenloser Einstufungstest.",
    learnMore: "Mehr erfahren",
    accommodationTitle: "Unterkunftsart",
    accommodationType: "Riads & Partner-Hostels",
    accommodationDesc: "Übernachten Sie in traditionellen marokkanischen Riads oder modernen Hostels mit Dachterrassen. Alle Unterkünfte sind zentral gelegen für einfachen Zugang zu Trainingsorten und Sehenswürdigkeiten.",
    accommodationFeatures: ["Einzel- oder Mehrbettzimmer", "Dachterrassen", "Pool-Zugang", "Traditionelles Frühstück", "Fußläufig zur Medina"],
    activitiesTitle: "Aktivitäten in der Nähe",
    activities: [
      { title: "Jemaa el-Fnaa", desc: "Berühmter Hauptplatz" },
      { title: "Majorelle-Garten", desc: "Atemberaubender blauer Garten" },
      { title: "Medina-Souks", desc: "Traditionelle Märkte" },
      { title: "Atlasgebirge", desc: "Tagesausflüge" },
      { title: "Hammam & Spa", desc: "Traditionelle Badehäuser" },
      { title: "Wüstentouren", desc: "Kamelritte und Dünen" }
    ],
    photosTitle: "Fotos",
    ctaTitle: "Entdecken Sie Marrakesch",
    ctaDesc: "Buchen Sie Ihr Abenteuer in der magischen Roten Stadt.",
    ctaButton: "Jetzt buchen",
    highlights: "Highlights",
    highlightsList: [
      { title: "Jemaa el-Fnaa", desc: "UNESCO-Platz voller Geschichtenerzähler, Musiker und Essensstände bei Sonnenuntergang." },
      { title: "Alte Medina", desc: "Verlieren Sie sich in jahrhundertealten Souks voller Gewürze, Handwerk und versteckter Schätze." },
      { title: "Majorelle-Garten", desc: "Yves Saint Laurents botanisches Paradies mit ikonischen Kobaltblau-Akzenten." },
      { title: "Atlasgebirge", desc: "Tagesausflüge zu Berberdörfern und atemberaubenden Berglandschaften." }
    ],
    practicalInfo: "Praktische Informationen",
    practicalItems: [
      { label: "Anreise", value: "Flughafen Marrakesch Menara (RAK), 6km vom Zentrum" },
      { label: "Beste Reisezeit", value: "März bis Mai, September bis November" },
      { label: "Klima", value: "Halbtrocken, heiße Sommer, milde Winter (10-38°C)" },
      { label: "Sprachen", value: "Arabisch, Französisch, Englisch in Touristengebieten verbreitet" }
    ]
  },
  it: {
    destination: "Destinazione",
    tagline: "La Città Rossa",
    heroDesc: "Antiche medine, palazzi mozzafiato e vivaci souk. Il cuore della cultura marocchina e la base perfetta per l'avventura.",
    aboutTitle: "La Città",
    aboutP1: "Marrakech è la città più iconica del Marocco. L'antica medina, patrimonio UNESCO, offre un labirinto di souk, riad mozzafiato e la famosa piazza Jemaa el-Fnaa con incantatori di serpenti, cantastorie e bancarelle di cibo.",
    aboutP2: "Oltre la medina, la Marrakech moderna offre ristoranti di classe mondiale, piscine sui tetti e facile accesso alle montagne dell'Atlante. È il mix perfetto di cultura antica e comfort moderno per la tua vacanza di formazione.",
    tags: ["Medina UNESCO", "Montagne dell'Atlante", "Piscine sui tetti", "Cultura ricca"],
    experiencesTitle: "Esperienze Disponibili",
    selfDefenseDesc: "Allenamento di autodifesa nella Città Rossa. Esplorazione di medine e souk nel pomeriggio.",
    storytellingDesc: "Cattura la medina, i palazzi e le viste sull'Atlante. Perfetto per content creator.",
    languageDesc: "20h/settimana. TOEFL, IELTS, Business English. Test di livello gratuito.",
    learnMore: "Scopri di più",
    accommodationTitle: "Tipo di Alloggio",
    accommodationType: "Riad e Ostelli Partner",
    accommodationDesc: "Soggiorna in riad marocchini tradizionali o ostelli moderni con terrazze sui tetti. Tutti gli alloggi sono in posizione centrale per facile accesso ai luoghi di formazione e attrazioni.",
    accommodationFeatures: ["Camere private o condivise", "Terrazze sui tetti", "Accesso piscina", "Colazione tradizionale", "A piedi dalla medina"],
    activitiesTitle: "Attività Vicine",
    activities: [
      { title: "Jemaa el-Fnaa", desc: "Famosa piazza principale" },
      { title: "Giardino Majorelle", desc: "Stupendo giardino blu" },
      { title: "Souk della Medina", desc: "Mercati tradizionali" },
      { title: "Montagne dell'Atlante", desc: "Escursioni giornaliere" },
      { title: "Hammam & Spa", desc: "Bagni tradizionali" },
      { title: "Escursioni nel Deserto", desc: "Gite in cammello" }
    ],
    photosTitle: "Foto",
    ctaTitle: "Scopri Marrakech",
    ctaDesc: "Prenota la tua avventura nella magica Città Rossa.",
    ctaButton: "Prenota ora",
    highlights: "Punti Salienti",
    highlightsList: [
      { title: "Jemaa el-Fnaa", desc: "Piazza UNESCO animata da cantastorie, musicisti e bancarelle al tramonto." },
      { title: "Antica Medina", desc: "Perditi in souk secolari pieni di spezie, artigianato e tesori nascosti." },
      { title: "Giardino Majorelle", desc: "Il paradiso botanico di Yves Saint Laurent con i suoi iconici accenti blu cobalto." },
      { title: "Montagne dell'Atlante", desc: "Escursioni ai villaggi berberi e paesaggi montani mozzafiato." }
    ],
    practicalInfo: "Informazioni Pratiche",
    practicalItems: [
      { label: "Come arrivare", value: "Aeroporto Marrakech Menara (RAK), 6km dal centro" },
      { label: "Periodo migliore", value: "Marzo-maggio, settembre-novembre" },
      { label: "Clima", value: "Semi-arido, estati calde, inverni miti (10-38°C)" },
      { label: "Lingue", value: "Arabo, francese, inglese nelle zone turistiche" }
    ]
  }
};

const MarrakechPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1600" 
            alt="Marrakech"
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
              Marrakech
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">{t.tagline}</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              {t.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About the City */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
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
              <img src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400" alt="Marrakech" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1760727466827-f11ca401116e?w=400" alt="Medina" className="rounded-xl aspect-square object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Available */}
      <section id="experiences" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">{t.experiencesTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="border-none bg-warmwhite">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="font-syne font-bold text-ocean mb-2">Self-Defense</h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">{t.selfDefenseDesc}</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/experiences/self-defense">{t.learnMore} <ArrowRight size={14} className="ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-none bg-warmwhite">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-4">
                  <Camera size={24} />
                </div>
                <h3 className="font-syne font-bold text-ocean mb-2">Visual Storytelling</h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">{t.storytellingDesc}</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/experiences/visual-storytelling">{t.learnMore} <ArrowRight size={14} className="ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-none bg-warmwhite sm:col-span-2 max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-4">
                  <Languages size={24} />
                </div>
                <h3 className="font-syne font-bold text-ocean mb-2">{language === 'fr' ? "Cours d'Anglais Intensif" : language === 'es' ? "Curso de Inglés Intensivo" : language === 'it' ? "Corso di Inglese Intensivo" : language === 'de' ? "Intensiv Englischkurs" : language === 'pt' ? "Curso Intensivo de Inglês" : "Intensive English Course"}</h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">{t.languageDesc}</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/experiences/language-practice">{t.learnMore} <ArrowRight size={14} className="ml-2" /></Link>
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

      {/* Accommodation Style */}
      <section id="accommodation" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">{t.accommodationTitle}</h2>
          <Card className="border-none">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-ocean rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Home size={24} />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-ocean text-lg mb-2">{t.accommodationType}</h3>
                  <p className="font-dm text-ocean/70 mb-4">
                    {t.accommodationDesc}
                  </p>
                  <ul className="space-y-2">
                    {t.accommodationFeatures.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-dm text-sm text-ocean/80">
                        <Check size={14} className="text-sunset" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Activities Nearby */}
      <section id="activities" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">{t.activitiesTitle}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {t.activities.map((activity) => (
              <Card key={activity.title} className="border-none bg-warmwhite">
                <CardContent className="p-4">
                  <h4 className="font-syne font-bold text-ocean text-sm mb-1">{activity.title}</h4>
                  <p className="font-dm text-ocean/60 text-xs">{activity.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photos */}
      <section id="photos" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">{t.photosTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400",
              "https://images.unsplash.com/photo-1760727466827-f11ca401116e?w=400",
              "https://images.unsplash.com/photo-1662009833223-75d3301290bd?w=400",
              "https://images.unsplash.com/photo-1758599669009-5a9002c09487?w=400"
            ].map((img, i) => (
              <img key={i} src={img} alt={`Marrakech ${i+1}`} className="rounded-xl aspect-square object-cover w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">{t.ctaTitle}</h2>
          <p className="font-dm text-white/80 mb-6">
            {t.ctaDesc}
          </p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book?city=marrakech">{t.ctaButton} <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default MarrakechPage;
