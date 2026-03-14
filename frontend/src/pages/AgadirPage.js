import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, ArrowRight, Sun, Users, Home, Shield, Camera,
  Check, Waves, UtensilsCrossed, Palmtree, Star, Plane, Clock, Thermometer, Languages
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    destination: "Destination",
    tagline: "Morocco's sunny beach paradise",
    heroDesc: "The premier beach destination of Morocco. Where the Atlantic Ocean meets golden sands and a vibrant modern city awaits.",
    aboutTitle: "About the City",
    aboutP1: "Agadir is Morocco's premier beach resort city, rebuilt after the devastating 1960 earthquake into a modern, sun-drenched paradise. With over 300 days of sunshine per year, it's the perfect destination for beach lovers and fitness enthusiasts.",
    aboutP2: "The city boasts a stunning 10km beach promenade, a lively marina, and excellent sports facilities. It's also the gateway to the famous surf spots of Taghazout and the stunning Paradise Valley.",
    tags: ["Beach paradise", "300+ sunny days", "Surf nearby", "Modern city"],
    experiencesTitle: "Experiences Available",
    selfDefenseDesc: "Train self-defense techniques by the beach. Morning sessions followed by beach time and exploration.",
    storytellingDesc: "Capture stunning beach sunsets, surf scenes and coastal landscapes. Perfect for content creators.",
    learnMore: "Learn More",
    accommodationTitle: "Accommodation Style",
    accommodationType: "Beachfront Hostels & Guesthouses",
    accommodationDesc: "Stay in our carefully selected beachfront accommodations. Modern hostels with private rooms or shared dorms, just steps from the beach and close to training venues.",
    accommodationFeatures: ["Private or shared rooms", "Breakfast included", "Beachfront location", "Pool access"],
    activitiesTitle: "Activities Nearby",
    activities: [
      { title: "Beach & Swimming", desc: "10km of golden sandy beach" },
      { title: "Surf Taghazout", desc: "World-famous surf spot nearby" },
      { title: "Paradise Valley", desc: "Natural pools and waterfalls" },
      { title: "Marina Promenade", desc: "Restaurants and nightlife" },
      { title: "Jet Ski & Water Sports", desc: "Adrenaline on the water" },
      { title: "Souk El Had", desc: "Largest market in Morocco" }
    ],
    photosTitle: "Photos",
    ctaTitle: "Experience Agadir",
    ctaDesc: "Book your adventure in Morocco's sunny beach paradise.",
    ctaButton: "Book Now",
    highlights: "Highlights",
    highlightsList: [
      { title: "10km Beach", desc: "Morocco's longest golden sand beach with year-round swimming weather." },
      { title: "Taghazout Surf", desc: "World-class waves just 20 minutes away, perfect for beginners and pros." },
      { title: "Paradise Valley", desc: "Hidden oasis with natural swimming pools and stunning palm groves." },
      { title: "Modern Marina", desc: "Vibrant waterfront with restaurants, cafes and sunset views." }
    ],
    practicalInfo: "Practical Information",
    practicalItems: [
      { label: "Getting There", value: "Agadir Al Massira Airport (AGA), 25km from city center" },
      { label: "Best Time", value: "Year-round destination, best March to November" },
      { label: "Climate", value: "Mild oceanic, 20-28°C year-round" },
      { label: "Languages", value: "Arabic, French, English in tourist areas" }
    ]
  },
  fr: {
    destination: "Destination",
    tagline: "Le paradis balnéaire ensoleillé du Maroc",
    heroDesc: "La première destination balnéaire du Maroc. Là où l'océan Atlantique rencontre les sables dorés et où une ville moderne et vibrante vous attend.",
    aboutTitle: "À Propos de la Ville",
    aboutP1: "Agadir est la première station balnéaire du Maroc, reconstruite après le tremblement de terre dévastateur de 1960 en un paradis moderne et ensoleillé. Avec plus de 300 jours de soleil par an, c'est la destination parfaite pour les amoureux de la plage et les passionnés de fitness.",
    aboutP2: "La ville possède une superbe promenade de plage de 10 km, une marina animée et d'excellentes installations sportives. C'est aussi la porte d'entrée vers les célèbres spots de surf de Taghazout et la magnifique Vallée du Paradis.",
    tags: ["Paradis balnéaire", "300+ jours de soleil", "Surf à proximité", "Ville moderne"],
    experiencesTitle: "Expériences Disponibles",
    selfDefenseDesc: "Entraînez-vous aux techniques de self-défense sur la plage. Sessions matinales suivies de temps libre à la plage et exploration.",
    storytellingDesc: "Capturez de superbes couchers de soleil sur la plage, des scènes de surf et des paysages côtiers. Parfait pour les créateurs de contenu.",
    learnMore: "En savoir plus",
    accommodationTitle: "Type d'Hébergement",
    accommodationType: "Auberges & Maisons d'hôtes en bord de mer",
    accommodationDesc: "Séjournez dans nos hébergements en bord de mer soigneusement sélectionnés. Auberges modernes avec chambres privées ou dortoirs partagés, à deux pas de la plage et proches des lieux d'entraînement.",
    accommodationFeatures: ["Chambres privées ou partagées", "Petit-déjeuner inclus", "Emplacement en bord de mer", "Accès piscine"],
    activitiesTitle: "Activités à Proximité",
    activities: [
      { title: "Plage & Baignade", desc: "10 km de plage de sable doré" },
      { title: "Surf Taghazout", desc: "Spot de surf mondialement connu" },
      { title: "Vallée du Paradis", desc: "Piscines naturelles et cascades" },
      { title: "Promenade Marina", desc: "Restaurants et vie nocturne" },
      { title: "Jet Ski & Sports Nautiques", desc: "Adrénaline sur l'eau" },
      { title: "Souk El Had", desc: "Plus grand marché du Maroc" }
    ],
    photosTitle: "Photos",
    ctaTitle: "Découvrez Agadir",
    ctaDesc: "Réservez votre aventure dans le paradis balnéaire ensoleillé du Maroc.",
    ctaButton: "Réserver",
    highlights: "Points Forts",
    highlightsList: [
      { title: "Plage de 10 km", desc: "La plus longue plage de sable doré du Maroc avec une météo propice à la baignade toute l'année." },
      { title: "Surf Taghazout", desc: "Vagues de classe mondiale à seulement 20 minutes, parfait pour débutants et pros." },
      { title: "Vallée du Paradis", desc: "Oasis cachée avec piscines naturelles et superbes palmeraies." },
      { title: "Marina Moderne", desc: "Front de mer animé avec restaurants, cafés et vues sur le coucher de soleil." }
    ],
    practicalInfo: "Informations Pratiques",
    practicalItems: [
      { label: "Comment y aller", value: "Aéroport Agadir Al Massira (AGA), 25km du centre-ville" },
      { label: "Meilleure période", value: "Destination toute l'année, idéale de mars à novembre" },
      { label: "Climat", value: "Océanique doux, 20-28°C toute l'année" },
      { label: "Langues", value: "Arabe, français, anglais dans les zones touristiques" }
    ]
  },
  es: {
    destination: "Destino",
    tagline: "El paraíso playero soleado de Marruecos",
    heroDesc: "El principal destino de playa de Marruecos. Donde el Océano Atlántico se encuentra con las arenas doradas y una vibrante ciudad moderna te espera.",
    aboutTitle: "Sobre la Ciudad",
    aboutP1: "Agadir es la principal ciudad balnearia de Marruecos, reconstruida después del devastador terremoto de 1960 en un paraíso moderno y soleado. Con más de 300 días de sol al año, es el destino perfecto para los amantes de la playa y los entusiastas del fitness.",
    aboutP2: "La ciudad cuenta con un impresionante paseo marítimo de 10 km, un puerto deportivo animado y excelentes instalaciones deportivas. También es la puerta de entrada a los famosos spots de surf de Taghazout y el impresionante Valle del Paraíso.",
    tags: ["Paraíso playero", "300+ días soleados", "Surf cercano", "Ciudad moderna"],
    experiencesTitle: "Experiencias Disponibles",
    selfDefenseDesc: "Entrena técnicas de defensa personal junto a la playa. Sesiones matutinas seguidas de tiempo en la playa y exploración.",
    storytellingDesc: "Captura impresionantes atardeceres, escenas de surf y paisajes costeros. Perfecto para creadores de contenido.",
    learnMore: "Más información",
    accommodationTitle: "Tipo de Alojamiento",
    accommodationType: "Hostales y Casas de Huéspedes Frente al Mar",
    accommodationDesc: "Alójate en nuestros alojamientos cuidadosamente seleccionados frente al mar. Hostales modernos con habitaciones privadas o dormitorios compartidos, a pasos de la playa y cerca de los lugares de entrenamiento.",
    accommodationFeatures: ["Habitaciones privadas o compartidas", "Desayuno incluido", "Ubicación frente al mar", "Acceso a piscina"],
    activitiesTitle: "Actividades Cercanas",
    activities: [
      { title: "Playa y Natación", desc: "10 km de playa de arena dorada" },
      { title: "Surf Taghazout", desc: "Spot de surf de fama mundial" },
      { title: "Valle del Paraíso", desc: "Piscinas naturales y cascadas" },
      { title: "Paseo Marina", desc: "Restaurantes y vida nocturna" },
      { title: "Jet Ski y Deportes Acuáticos", desc: "Adrenalina en el agua" },
      { title: "Souk El Had", desc: "El mercado más grande de Marruecos" }
    ],
    photosTitle: "Fotos",
    ctaTitle: "Descubre Agadir",
    ctaDesc: "Reserva tu aventura en el paraíso playero soleado de Marruecos.",
    ctaButton: "Reservar",
    highlights: "Destacados",
    highlightsList: [
      { title: "Playa de 10 km", desc: "La playa de arena dorada más larga de Marruecos con clima para nadar todo el año." },
      { title: "Surf Taghazout", desc: "Olas de clase mundial a solo 20 minutos, perfecto para principiantes y profesionales." },
      { title: "Valle del Paraíso", desc: "Oasis escondido con piscinas naturales e impresionantes palmeras." },
      { title: "Marina Moderna", desc: "Paseo marítimo vibrante con restaurantes, cafés y vistas al atardecer." }
    ],
    practicalInfo: "Información Práctica",
    practicalItems: [
      { label: "Cómo llegar", value: "Aeropuerto Agadir Al Massira (AGA), 25km del centro" },
      { label: "Mejor época", value: "Destino todo el año, mejor de marzo a noviembre" },
      { label: "Clima", value: "Oceánico suave, 20-28°C todo el año" },
      { label: "Idiomas", value: "Árabe, francés, inglés en zonas turísticas" }
    ]
  },
  pt: {
    destination: "Destino",
    tagline: "O paraíso praiano ensolarado do Marrocos",
    heroDesc: "O principal destino de praia do Marrocos. Onde o Oceano Atlântico encontra areias douradas e uma vibrante cidade moderna espera.",
    aboutTitle: "Sobre a Cidade",
    aboutP1: "Agadir é a principal cidade balneária do Marrocos, reconstruída após o devastador terremoto de 1960 em um paraíso moderno e ensolarado. Com mais de 300 dias de sol por ano, é o destino perfeito para amantes de praia e entusiastas de fitness.",
    aboutP2: "A cidade possui um impressionante calçadão de 10 km, uma marina animada e excelentes instalações esportivas. É também a porta de entrada para os famosos pontos de surf de Taghazout e o deslumbrante Vale do Paraíso.",
    tags: ["Paraíso praiano", "300+ dias ensolarados", "Surf próximo", "Cidade moderna"],
    experiencesTitle: "Experiências Disponíveis",
    selfDefenseDesc: "Treine técnicas de defesa pessoal na praia. Sessões matinais seguidas de tempo na praia e exploração.",
    storytellingDesc: "Capture impressionantes pores do sol, cenas de surf e paisagens costeiras. Perfeito para criadores de conteúdo.",
    learnMore: "Saiba mais",
    accommodationTitle: "Tipo de Hospedagem",
    accommodationType: "Hostels e Pousadas à Beira-Mar",
    accommodationDesc: "Hospede-se em nossas acomodações cuidadosamente selecionadas à beira-mar. Hostels modernos com quartos privativos ou dormitórios, a poucos passos da praia e perto dos locais de treinamento.",
    accommodationFeatures: ["Quartos privativos ou compartilhados", "Café da manhã incluído", "Localização à beira-mar", "Acesso à piscina"],
    activitiesTitle: "Atividades Próximas",
    activities: [
      { title: "Praia e Natação", desc: "10 km de praia de areia dourada" },
      { title: "Surf Taghazout", desc: "Spot de surf mundialmente famoso" },
      { title: "Vale do Paraíso", desc: "Piscinas naturais e cachoeiras" },
      { title: "Passeio Marina", desc: "Restaurantes e vida noturna" },
      { title: "Jet Ski e Esportes Aquáticos", desc: "Adrenalina na água" },
      { title: "Souk El Had", desc: "Maior mercado do Marrocos" }
    ],
    photosTitle: "Fotos",
    ctaTitle: "Descubra Agadir",
    ctaDesc: "Reserve sua aventura no paraíso praiano ensolarado do Marrocos.",
    ctaButton: "Reservar",
    highlights: "Destaques",
    highlightsList: [
      { title: "Praia de 10 km", desc: "A mais longa praia de areia dourada do Marrocos com clima para nadar o ano todo." },
      { title: "Surf Taghazout", desc: "Ondas de classe mundial a apenas 20 minutos, perfeito para iniciantes e profissionais." },
      { title: "Vale do Paraíso", desc: "Oásis escondido com piscinas naturais e impressionantes palmeiras." },
      { title: "Marina Moderna", desc: "Orla vibrante com restaurantes, cafés e vistas do pôr do sol." }
    ],
    practicalInfo: "Informações Práticas",
    practicalItems: [
      { label: "Como chegar", value: "Aeroporto Agadir Al Massira (AGA), 25km do centro" },
      { label: "Melhor época", value: "Destino o ano todo, melhor de março a novembro" },
      { label: "Clima", value: "Oceânico ameno, 20-28°C o ano todo" },
      { label: "Idiomas", value: "Árabe, francês, inglês em áreas turísticas" }
    ]
  },
  de: {
    destination: "Reiseziel",
    tagline: "Marokkos sonniges Strandparadies",
    heroDesc: "Das führende Strandziel Marokkos. Wo der Atlantische Ozean auf goldenen Sand trifft und eine lebendige moderne Stadt wartet.",
    aboutTitle: "Über die Stadt",
    aboutP1: "Agadir ist Marokkos führender Badeort, der nach dem verheerenden Erdbeben von 1960 zu einem modernen, sonnenverwöhnten Paradies wiederaufgebaut wurde. Mit über 300 Sonnentagen pro Jahr ist es das perfekte Ziel für Strandliebhaber und Fitness-Enthusiasten.",
    aboutP2: "Die Stadt verfügt über eine beeindruckende 10 km lange Strandpromenade, einen lebhaften Yachthafen und ausgezeichnete Sporteinrichtungen. Sie ist auch das Tor zu den berühmten Surfspots von Taghazout und dem atemberaubenden Paradise Valley.",
    tags: ["Strandparadies", "300+ Sonnentage", "Surfen in der Nähe", "Moderne Stadt"],
    experiencesTitle: "Verfügbare Erlebnisse",
    selfDefenseDesc: "Trainieren Sie Selbstverteidigungstechniken am Strand. Morgensessions gefolgt von Strandzeit und Erkundung.",
    storytellingDesc: "Fangen Sie atemberaubende Sonnenuntergänge, Surfszenen und Küstenlandschaften ein. Perfekt für Content Creator.",
    learnMore: "Mehr erfahren",
    accommodationTitle: "Unterkunftsart",
    accommodationType: "Hostels & Pensionen am Strand",
    accommodationDesc: "Übernachten Sie in unseren sorgfältig ausgewählten Unterkünften am Strand. Moderne Hostels mit Privatzimmern oder Schlafsälen, nur wenige Schritte vom Strand und nahe den Trainingsorten.",
    accommodationFeatures: ["Einzel- oder Mehrbettzimmer", "Frühstück inklusive", "Strandlage", "Pool-Zugang"],
    activitiesTitle: "Aktivitäten in der Nähe",
    activities: [
      { title: "Strand & Schwimmen", desc: "10 km goldener Sandstrand" },
      { title: "Surfen Taghazout", desc: "Weltberühmter Surfspot" },
      { title: "Paradise Valley", desc: "Natürliche Pools und Wasserfälle" },
      { title: "Marina-Promenade", desc: "Restaurants und Nachtleben" },
      { title: "Jet-Ski & Wassersport", desc: "Adrenalin auf dem Wasser" },
      { title: "Souk El Had", desc: "Größter Markt Marokkos" }
    ],
    photosTitle: "Fotos",
    ctaTitle: "Entdecken Sie Agadir",
    ctaDesc: "Buchen Sie Ihr Abenteuer in Marokkos sonnigem Strandparadies.",
    ctaButton: "Jetzt buchen",
    highlights: "Highlights",
    highlightsList: [
      { title: "10 km Strand", desc: "Marokkos längster goldener Sandstrand mit ganzjährigem Badewetter." },
      { title: "Surfen Taghazout", desc: "Weltklasse-Wellen nur 20 Minuten entfernt, perfekt für Anfänger und Profis." },
      { title: "Paradise Valley", desc: "Versteckte Oase mit natürlichen Pools und wunderschönen Palmenhainen." },
      { title: "Moderne Marina", desc: "Lebhafte Uferpromenade mit Restaurants, Cafés und Sonnenuntergangsblick." }
    ],
    practicalInfo: "Praktische Informationen",
    practicalItems: [
      { label: "Anreise", value: "Flughafen Agadir Al Massira (AGA), 25km vom Zentrum" },
      { label: "Beste Reisezeit", value: "Ganzjahresziel, am besten März bis November" },
      { label: "Klima", value: "Mild ozeanisch, 20-28°C das ganze Jahr" },
      { label: "Sprachen", value: "Arabisch, Französisch, Englisch in Touristengebieten" }
    ]
  },
  it: {
    destination: "Destinazione",
    tagline: "Il paradiso balneare soleggiato del Marocco",
    heroDesc: "La principale destinazione balneare del Marocco. Dove l'Oceano Atlantico incontra le sabbie dorate e una vibrante città moderna ti aspetta.",
    aboutTitle: "La Città",
    aboutP1: "Agadir è la principale città balneare del Marocco, ricostruita dopo il devastante terremoto del 1960 in un paradiso moderno e soleggiato. Con oltre 300 giorni di sole all'anno, è la destinazione perfetta per gli amanti della spiaggia e gli appassionati di fitness.",
    aboutP2: "La città vanta un impressionante lungomare di 10 km, un vivace porto turistico e ottime strutture sportive. È anche la porta d'accesso ai famosi spot di surf di Taghazout e alla splendida Valle del Paradiso.",
    tags: ["Paradiso balneare", "300+ giorni di sole", "Surf vicino", "Città moderna"],
    experiencesTitle: "Esperienze Disponibili",
    selfDefenseDesc: "Allenati nelle tecniche di autodifesa in spiaggia. Sessioni mattutine seguite da tempo in spiaggia ed esplorazione.",
    storytellingDesc: "Cattura splendidi tramonti, scene di surf e paesaggi costieri. Perfetto per content creator.",
    learnMore: "Scopri di più",
    accommodationTitle: "Tipo di Alloggio",
    accommodationType: "Ostelli e B&B sul Mare",
    accommodationDesc: "Soggiorna nelle nostre strutture selezionate sul mare. Ostelli moderni con camere private o dormitori, a pochi passi dalla spiaggia e vicino ai luoghi di allenamento.",
    accommodationFeatures: ["Camere private o condivise", "Colazione inclusa", "Posizione sul mare", "Accesso piscina"],
    activitiesTitle: "Attività Vicine",
    activities: [
      { title: "Spiaggia e Nuoto", desc: "10 km di spiaggia dorata" },
      { title: "Surf Taghazout", desc: "Spot di surf famoso nel mondo" },
      { title: "Valle del Paradiso", desc: "Piscine naturali e cascate" },
      { title: "Passeggiata Marina", desc: "Ristoranti e vita notturna" },
      { title: "Jet Ski e Sport Acquatici", desc: "Adrenalina sull'acqua" },
      { title: "Souk El Had", desc: "Il più grande mercato del Marocco" }
    ],
    photosTitle: "Foto",
    ctaTitle: "Scopri Agadir",
    ctaDesc: "Prenota la tua avventura nel paradiso balneare soleggiato del Marocco.",
    ctaButton: "Prenota ora",
    highlights: "Punti Salienti",
    highlightsList: [
      { title: "Spiaggia 10 km", desc: "La spiaggia di sabbia dorata più lunga del Marocco con clima balneabile tutto l'anno." },
      { title: "Surf Taghazout", desc: "Onde di classe mondiale a soli 20 minuti, perfetto per principianti e professionisti." },
      { title: "Valle del Paradiso", desc: "Oasi nascosta con piscine naturali e splendidi palmeti." },
      { title: "Marina Moderna", desc: "Lungomare vivace con ristoranti, caffè e viste sul tramonto." }
    ],
    practicalInfo: "Informazioni Pratiche",
    practicalItems: [
      { label: "Come arrivare", value: "Aeroporto Agadir Al Massira (AGA), 25km dal centro" },
      { label: "Periodo migliore", value: "Destinazione tutto l'anno, meglio marzo-novembre" },
      { label: "Clima", value: "Oceanico mite, 20-28°C tutto l'anno" },
      { label: "Lingue", value: "Arabo, francese, inglese nelle zone turistiche" }
    ]
  }
};

const AgadirPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553522987-b6cb62385487?w=1600" 
            alt="Agadir Beach Morocco"
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
              Agadir
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
              <img src="https://images.unsplash.com/photo-1553522987-b6cb62385487?w=400" alt="Agadir beach" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1669542832433-2839fa8e8ab7?w=400" alt="Surfing in Morocco" className="rounded-xl aspect-square object-cover mt-8" />
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
            {t.activities.map((activity, i) => (
              <Card key={activity.title} className="border-none bg-warmwhite">
                <CardContent className="p-4">
                  <div className="w-8 h-8 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-2">
                    {i < 2 ? <Waves size={18} /> : i === 2 ? <Palmtree size={18} /> : i === 3 ? <UtensilsCrossed size={18} /> : i === 4 ? <Waves size={18} /> : <MapPin size={18} />}
                  </div>
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
              "https://images.unsplash.com/photo-1553522987-b6cb62385487?w=400",
              "https://images.unsplash.com/photo-1669542832433-2839fa8e8ab7?w=400",
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
              "https://images.unsplash.com/photo-1669542832357-6d4ab608ae84?w=400"
            ].map((img, i) => (
              <img key={i} src={img} alt={`Agadir ${i+1}`} className="rounded-xl aspect-square object-cover w-full" />
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
            <Link to="/book?city=agadir">{t.ctaButton} <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default AgadirPage;
