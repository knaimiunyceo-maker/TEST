import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Waves, Utensils, Map, Car, ArrowRight, Info, Check, X,
  Mountain, Moon, Palmtree, Heart, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

// Top Experiences Data
const TOP_EXPERIENCES = [
  {
    id: "surf-taghazout",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600",
    icon: <Waves size={24} />
  },
  {
    id: "atlas-trek",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
    icon: <Mountain size={24} />
  },
  {
    id: "desert-dinner",
    image: "https://images.unsplash.com/photo-1662009833223-75d3301290bd?w=600",
    icon: <Moon size={24} />
  },
  {
    id: "cooking-class",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600",
    icon: <Utensils size={24} />
  },
  {
    id: "paradise-valley",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600",
    icon: <Palmtree size={24} />
  }
];

// Activities Availability Data
const ACTIVITIES_DATA = [
  { id: "surf", duration: "1h", agadir: true, marrakech: false, casablanca: true, category: "water" },
  { id: "kitesurf", duration: "2-3h", agadir: true, marrakech: false, casablanca: true, category: "water" },
  { id: "sup", duration: "1-2h", agadir: true, marrakech: false, casablanca: true, category: "water" },
  { id: "yoga", duration: "1h", agadir: true, marrakech: true, casablanca: true, category: "wellness" },
  { id: "pilates", duration: "1h", agadir: true, marrakech: true, casablanca: true, category: "wellness" },
  { id: "meditation", duration: "1h", agadir: true, marrakech: true, casablanca: true, category: "wellness" },
  { id: "quad", duration: "2h", agadir: true, marrakech: true, casablanca: false, category: "adventure" },
  { id: "buggy", duration: "2h", agadir: true, marrakech: true, casablanca: false, category: "adventure" },
  { id: "camel", duration: "1h", agadir: true, marrakech: true, casablanca: false, category: "adventure" },
  { id: "horse", duration: "1-2h", agadir: true, marrakech: true, casablanca: false, category: "adventure" },
  { id: "sandboarding", duration: "1-2h", agadir: true, marrakech: true, casablanca: false, category: "adventure" },
  { id: "paradise-valley", duration: "4-5h", agadir: true, marrakech: false, casablanca: false, category: "excursion" },
  { id: "ourika", duration: "Full day", agadir: false, marrakech: true, casablanca: false, category: "excursion" },
  { id: "atlas-hiking", duration: "Full day", agadir: false, marrakech: true, casablanca: false, category: "excursion" },
  { id: "toubkal", duration: "2-3 days", agadir: false, marrakech: true, casablanca: false, category: "excursion" },
  { id: "berber-villages", duration: "Full day", agadir: false, marrakech: true, casablanca: false, category: "excursion" },
  { id: "agafay", duration: "Half day", agadir: false, marrakech: true, casablanca: false, category: "excursion" },
  { id: "desert-dinner", duration: "Evening", agadir: false, marrakech: true, casablanca: false, category: "excursion" },
  { id: "desert-camp", duration: "1 night", agadir: false, marrakech: true, casablanca: false, category: "excursion" },
  { id: "hot-air-balloon", duration: "3h", agadir: false, marrakech: true, casablanca: false, category: "adventure" },
  { id: "cooking-class", duration: "3-4h", agadir: true, marrakech: true, casablanca: true, category: "culture" },
  { id: "pastry-workshop", duration: "2-3h", agadir: true, marrakech: true, casablanca: true, category: "culture" },
  { id: "street-food", duration: "2h", agadir: true, marrakech: true, casablanca: true, category: "culture" },
  { id: "medina-tour", duration: "3h", agadir: false, marrakech: true, casablanca: false, category: "culture" },
  { id: "souks-tour", duration: "2-3h", agadir: false, marrakech: true, casablanca: false, category: "culture" },
  { id: "hammam", duration: "2h", agadir: true, marrakech: true, casablanca: true, category: "wellness" },
  { id: "spa-massage", duration: "1-2h", agadir: true, marrakech: true, casablanca: true, category: "wellness" },
  { id: "salsa-bachata", duration: "1-2h", agadir: true, marrakech: true, casablanca: true, category: "culture" },
  { id: "moroccan-dance", duration: "1-2h", agadir: true, marrakech: true, casablanca: true, category: "culture" },
  { id: "city-tour", duration: "3-4h", agadir: true, marrakech: true, casablanca: true, category: "culture" },
  { id: "essaouira", duration: "Full day", agadir: false, marrakech: true, casablanca: false, category: "excursion" },
  { id: "sunset-beach", duration: "2h", agadir: true, marrakech: false, casablanca: true, category: "water" }
];

const translations = {
  en: {
    heroSubtitle: "Enhance Your Trip",
    heroTitle: "Optional Activities",
    heroDesc: "Add extra experiences to your trip. All activities are optional and can be booked through your referent.",
    topExperiencesTitle: "Top Experiences",
    topExperiencesSubtitle: "Our most popular activities",
    availabilityTitle: "Activities Availability",
    availabilitySubtitle: "Check what's available in each city",
    legendAvailable: "Available",
    legendNotAvailable: "Not available",
    activity: "Activity",
    duration: "Duration",
    noCommissionTitle: "Zero Commission Policy",
    noCommissionText: "We don't take any commission on activities. We carefully select the best local providers for you, ensuring quality experiences at local prices. Your satisfaction is our only reward.",
    noCommissionBadge: "100% Local Prices",
    howToBook: "How to Book",
    howToBookText: "All activities are booked through your THE BRIDGE referent. Prices are local rates — we don't add any commission.",
    ctaTitle: "Ready to explore?",
    ctaButton: "Book Your Experience",
    topExperiences: {
      "surf-taghazout": { title: "Surf in Taghazout", description: "Ride the waves on Morocco's legendary Atlantic coast with experienced local instructors. Perfect for beginners and intermediate surfers." },
      "atlas-trek": { title: "Atlas Mountains Trek", description: "Discover the breathtaking landscapes of the Atlas Mountains and authentic Berber villages during a guided mountain adventure." },
      "desert-dinner": { title: "Desert Dinner in Agafay", description: "Enjoy a magical evening under the stars in the Agafay desert with traditional Moroccan cuisine and live music." },
      "cooking-class": { title: "Moroccan Cooking Class", description: "Learn how to prepare traditional Moroccan dishes such as tagine and couscous with local chefs." },
      "paradise-valley": { title: "Paradise Valley Adventure", description: "Explore natural pools, palm trees and spectacular landscapes during a unique excursion in one of Morocco's hidden gems." }
    },
    activityNames: {
      "surf": "Surf", "kitesurf": "Kitesurf", "sup": "Stand Up Paddle", "yoga": "Yoga", "pilates": "Pilates",
      "meditation": "Meditation Session", "quad": "Quad in the desert", "buggy": "Desert Buggy", "camel": "Camel Ride",
      "horse": "Horse Riding", "sandboarding": "Sandboarding", "paradise-valley": "Paradise Valley Excursion",
      "ourika": "Ourika Valley Excursion", "atlas-hiking": "Atlas Mountains Hiking", "toubkal": "Mount Toubkal Trek",
      "berber-villages": "Berber Villages Trek", "agafay": "Agafay Desert Excursion", "desert-dinner": "Desert Dinner Experience",
      "desert-camp": "Desert Camp Night", "hot-air-balloon": "Hot Air Balloon", "cooking-class": "Moroccan Cooking Class",
      "pastry-workshop": "Moroccan Pastry Workshop", "street-food": "Street Food Tour", "medina-tour": "Medina Guided Tour",
      "souks-tour": "Souks Discovery Tour", "hammam": "Traditional Hammam", "spa-massage": "Spa & Massage",
      "salsa-bachata": "Salsa / Bachata Class", "moroccan-dance": "Moroccan Dance Class", "city-tour": "City Tour",
      "essaouira": "Essaouira Excursion", "sunset-beach": "Sunset Beach Experience"
    }
  },
  fr: {
    heroSubtitle: "Enrichissez votre voyage",
    heroTitle: "Activités Optionnelles",
    heroDesc: "Ajoutez des expériences supplémentaires à votre voyage. Toutes les activités sont optionnelles et peuvent être réservées via votre référent.",
    topExperiencesTitle: "Expériences Phares",
    topExperiencesSubtitle: "Nos activités les plus populaires",
    availabilityTitle: "Disponibilité des Activités",
    availabilitySubtitle: "Vérifiez ce qui est disponible dans chaque ville",
    legendAvailable: "Disponible",
    legendNotAvailable: "Non disponible",
    activity: "Activité",
    duration: "Durée",
    noCommissionTitle: "Politique Zéro Commission",
    noCommissionText: "Nous ne prenons aucune commission sur les activités. Nous sélectionnons soigneusement les meilleurs prestataires locaux pour vous, garantissant des expériences de qualité aux prix locaux. Votre satisfaction est notre seule récompense.",
    noCommissionBadge: "100% Prix Locaux",
    howToBook: "Comment réserver",
    howToBookText: "Toutes les activités sont réservées via votre référent THE BRIDGE. Les prix sont les tarifs locaux — nous n'ajoutons aucune commission.",
    ctaTitle: "Prêt à explorer ?",
    ctaButton: "Réserver votre expérience",
    topExperiences: {
      "surf-taghazout": { title: "Surf à Taghazout", description: "Chevauchez les vagues sur la légendaire côte atlantique du Maroc avec des instructeurs locaux expérimentés. Parfait pour les débutants et les surfeurs intermédiaires." },
      "atlas-trek": { title: "Trek dans l'Atlas", description: "Découvrez les paysages époustouflants des montagnes de l'Atlas et les villages berbères authentiques lors d'une aventure en montagne guidée." },
      "desert-dinner": { title: "Dîner dans le Désert d'Agafay", description: "Profitez d'une soirée magique sous les étoiles dans le désert d'Agafay avec une cuisine marocaine traditionnelle et de la musique live." },
      "cooking-class": { title: "Cours de Cuisine Marocaine", description: "Apprenez à préparer des plats marocains traditionnels comme le tajine et le couscous avec des chefs locaux." },
      "paradise-valley": { title: "Aventure Vallée du Paradis", description: "Explorez des piscines naturelles, des palmiers et des paysages spectaculaires lors d'une excursion unique dans l'un des joyaux cachés du Maroc." }
    },
    activityNames: {
      "surf": "Surf", "kitesurf": "Kitesurf", "sup": "Stand Up Paddle", "yoga": "Yoga", "pilates": "Pilates",
      "meditation": "Séance de Méditation", "quad": "Quad dans le désert", "buggy": "Buggy Désert", "camel": "Balade à Dos de Chameau",
      "horse": "Équitation", "sandboarding": "Sandboarding", "paradise-valley": "Excursion Vallée du Paradis",
      "ourika": "Excursion Vallée de l'Ourika", "atlas-hiking": "Randonnée dans l'Atlas", "toubkal": "Trek Mont Toubkal",
      "berber-villages": "Trek Villages Berbères", "agafay": "Excursion Désert d'Agafay", "desert-dinner": "Dîner dans le Désert",
      "desert-camp": "Nuit Camp Désert", "hot-air-balloon": "Montgolfière", "cooking-class": "Cours de Cuisine Marocaine",
      "pastry-workshop": "Atelier Pâtisserie Marocaine", "street-food": "Tour Street Food", "medina-tour": "Visite Guidée Médina",
      "souks-tour": "Découverte des Souks", "hammam": "Hammam Traditionnel", "spa-massage": "Spa & Massage",
      "salsa-bachata": "Cours Salsa / Bachata", "moroccan-dance": "Cours de Danse Marocaine", "city-tour": "Tour de Ville",
      "essaouira": "Excursion Essaouira", "sunset-beach": "Expérience Coucher de Soleil Plage"
    }
  },
  es: {
    heroSubtitle: "Mejora tu viaje",
    heroTitle: "Actividades Opcionales",
    heroDesc: "Añade experiencias extra a tu viaje. Todas las actividades son opcionales y se pueden reservar a través de tu referente.",
    topExperiencesTitle: "Experiencias Destacadas",
    topExperiencesSubtitle: "Nuestras actividades más populares",
    availabilityTitle: "Disponibilidad de Actividades",
    availabilitySubtitle: "Consulta qué está disponible en cada ciudad",
    legendAvailable: "Disponible",
    legendNotAvailable: "No disponible",
    activity: "Actividad",
    duration: "Duración",
    noCommissionTitle: "Política Cero Comisión",
    noCommissionText: "No cobramos ninguna comisión por las actividades. Seleccionamos cuidadosamente los mejores proveedores locales para ti, garantizando experiencias de calidad a precios locales. Tu satisfacción es nuestra única recompensa.",
    noCommissionBadge: "100% Precios Locales",
    howToBook: "Cómo reservar",
    howToBookText: "Todas las actividades se reservan a través de tu referente THE BRIDGE. Los precios son tarifas locales — no añadimos ninguna comisión.",
    ctaTitle: "¿Listo para explorar?",
    ctaButton: "Reserva tu experiencia",
    topExperiences: {
      "surf-taghazout": { title: "Surf en Taghazout", description: "Cabalga las olas en la legendaria costa atlántica de Marruecos con instructores locales experimentados. Perfecto para principiantes y surfistas intermedios." },
      "atlas-trek": { title: "Trek en el Atlas", description: "Descubre los impresionantes paisajes de las montañas del Atlas y auténticos pueblos bereberes durante una aventura de montaña guiada." },
      "desert-dinner": { title: "Cena en el Desierto de Agafay", description: "Disfruta de una velada mágica bajo las estrellas en el desierto de Agafay con cocina marroquí tradicional y música en vivo." },
      "cooking-class": { title: "Clase de Cocina Marroquí", description: "Aprende a preparar platos tradicionales marroquíes como el tajín y el cuscús con chefs locales." },
      "paradise-valley": { title: "Aventura Valle del Paraíso", description: "Explora piscinas naturales, palmeras y paisajes espectaculares durante una excursión única en una de las joyas ocultas de Marruecos." }
    },
    activityNames: {
      "surf": "Surf", "kitesurf": "Kitesurf", "sup": "Stand Up Paddle", "yoga": "Yoga", "pilates": "Pilates",
      "meditation": "Sesión de Meditación", "quad": "Quad en el desierto", "buggy": "Buggy Desierto", "camel": "Paseo en Camello",
      "horse": "Equitación", "sandboarding": "Sandboarding", "paradise-valley": "Excursión Valle del Paraíso",
      "ourika": "Excursión Valle de Ourika", "atlas-hiking": "Senderismo en el Atlas", "toubkal": "Trek Monte Toubkal",
      "berber-villages": "Trek Pueblos Bereberes", "agafay": "Excursión Desierto de Agafay", "desert-dinner": "Cena en el Desierto",
      "desert-camp": "Noche Campo Desierto", "hot-air-balloon": "Globo Aerostático", "cooking-class": "Clase de Cocina Marroquí",
      "pastry-workshop": "Taller Repostería Marroquí", "street-food": "Tour Street Food", "medina-tour": "Tour Guiado Medina",
      "souks-tour": "Descubrimiento de Zocos", "hammam": "Hammam Tradicional", "spa-massage": "Spa & Masaje",
      "salsa-bachata": "Clase Salsa / Bachata", "moroccan-dance": "Clase Danza Marroquí", "city-tour": "Tour de Ciudad",
      "essaouira": "Excursión Essaouira", "sunset-beach": "Experiencia Atardecer Playa"
    }
  },
  de: {
    heroSubtitle: "Bereichern Sie Ihre Reise",
    heroTitle: "Optionale Aktivitäten",
    heroDesc: "Fügen Sie Ihrer Reise zusätzliche Erlebnisse hinzu. Alle Aktivitäten sind optional und können über Ihren Ansprechpartner gebucht werden.",
    topExperiencesTitle: "Top-Erlebnisse",
    topExperiencesSubtitle: "Unsere beliebtesten Aktivitäten",
    availabilityTitle: "Aktivitätenverfügbarkeit",
    availabilitySubtitle: "Prüfen Sie, was in jeder Stadt verfügbar ist",
    legendAvailable: "Verfügbar",
    legendNotAvailable: "Nicht verfügbar",
    activity: "Aktivität",
    duration: "Dauer",
    noCommissionTitle: "Null-Provisions-Politik",
    noCommissionText: "Wir nehmen keine Provision für Aktivitäten. Wir wählen sorgfältig die besten lokalen Anbieter für Sie aus und garantieren Qualitätserlebnisse zu lokalen Preisen. Ihre Zufriedenheit ist unsere einzige Belohnung.",
    noCommissionBadge: "100% Lokale Preise",
    howToBook: "Wie buchen",
    howToBookText: "Alle Aktivitäten werden über Ihren THE BRIDGE Ansprechpartner gebucht. Die Preise sind lokale Tarife — wir fügen keine Provision hinzu.",
    ctaTitle: "Bereit zu erkunden?",
    ctaButton: "Buchen Sie Ihr Erlebnis",
    topExperiences: {
      "surf-taghazout": { title: "Surfen in Taghazout", description: "Reiten Sie die Wellen an Marokkos legendärer Atlantikküste mit erfahrenen lokalen Instruktoren. Perfekt für Anfänger und Fortgeschrittene." },
      "atlas-trek": { title: "Atlas-Gebirge Trek", description: "Entdecken Sie die atemberaubenden Landschaften des Atlas-Gebirges und authentische Berberdörfer bei einem geführten Bergabenteuer." },
      "desert-dinner": { title: "Wüstenabendessen in Agafay", description: "Genießen Sie einen magischen Abend unter den Sternen in der Agafay-Wüste mit traditioneller marokkanischer Küche und Live-Musik." },
      "cooking-class": { title: "Marokkanischer Kochkurs", description: "Lernen Sie, traditionelle marokkanische Gerichte wie Tajine und Couscous mit lokalen Köchen zuzubereiten." },
      "paradise-valley": { title: "Paradies-Tal Abenteuer", description: "Erkunden Sie natürliche Pools, Palmen und spektakuläre Landschaften bei einem einzigartigen Ausflug zu einem der versteckten Juwelen Marokkos." }
    },
    activityNames: {
      "surf": "Surfen", "kitesurf": "Kitesurfen", "sup": "Stand Up Paddle", "yoga": "Yoga", "pilates": "Pilates",
      "meditation": "Meditationssitzung", "quad": "Quad in der Wüste", "buggy": "Wüsten-Buggy", "camel": "Kamelritt",
      "horse": "Reiten", "sandboarding": "Sandboarding", "paradise-valley": "Paradies-Tal Ausflug",
      "ourika": "Ourika-Tal Ausflug", "atlas-hiking": "Atlas-Wanderung", "toubkal": "Toubkal Trek",
      "berber-villages": "Berberdörfer Trek", "agafay": "Agafay-Wüste Ausflug", "desert-dinner": "Wüsten-Dinner",
      "desert-camp": "Wüstencamp Nacht", "hot-air-balloon": "Heißluftballon", "cooking-class": "Marokkanischer Kochkurs",
      "pastry-workshop": "Marokkanisches Gebäck Workshop", "street-food": "Street Food Tour", "medina-tour": "Medina Führung",
      "souks-tour": "Souks Entdeckung", "hammam": "Traditionelles Hammam", "spa-massage": "Spa & Massage",
      "salsa-bachata": "Salsa / Bachata Kurs", "moroccan-dance": "Marokkanischer Tanzkurs", "city-tour": "Stadtrundfahrt",
      "essaouira": "Essaouira Ausflug", "sunset-beach": "Sonnenuntergang Strand"
    }
  },
  pt: {
    heroSubtitle: "Aprimore sua viagem",
    heroTitle: "Atividades Opcionais",
    heroDesc: "Adicione experiências extras à sua viagem. Todas as atividades são opcionais e podem ser reservadas através do seu referente.",
    topExperiencesTitle: "Experiências Principais",
    topExperiencesSubtitle: "Nossas atividades mais populares",
    availabilityTitle: "Disponibilidade de Atividades",
    availabilitySubtitle: "Verifique o que está disponível em cada cidade",
    legendAvailable: "Disponível",
    legendNotAvailable: "Não disponível",
    activity: "Atividade",
    duration: "Duração",
    noCommissionTitle: "Política Zero Comissão",
    noCommissionText: "Não cobramos nenhuma comissão nas atividades. Selecionamos cuidadosamente os melhores prestadores locais para você, garantindo experiências de qualidade a preços locais. Sua satisfação é nossa única recompensa.",
    noCommissionBadge: "100% Preços Locais",
    howToBook: "Como reservar",
    howToBookText: "Todas as atividades são reservadas através do seu referente THE BRIDGE. Os preços são tarifas locais — não adicionamos nenhuma comissão.",
    ctaTitle: "Pronto para explorar?",
    ctaButton: "Reserve sua experiência",
    topExperiences: {
      "surf-taghazout": { title: "Surf em Taghazout", description: "Pegue ondas na lendária costa atlântica de Marrocos com instrutores locais experientes. Perfeito para iniciantes e surfistas intermediários." },
      "atlas-trek": { title: "Trek nas Montanhas Atlas", description: "Descubra as paisagens deslumbrantes das montanhas Atlas e autênticas aldeias berberes durante uma aventura guiada na montanha." },
      "desert-dinner": { title: "Jantar no Deserto de Agafay", description: "Desfrute de uma noite mágica sob as estrelas no deserto de Agafay com cozinha marroquina tradicional e música ao vivo." },
      "cooking-class": { title: "Aula de Culinária Marroquina", description: "Aprenda a preparar pratos tradicionais marroquinos como tajine e couscous com chefs locais." },
      "paradise-valley": { title: "Aventura Vale do Paraíso", description: "Explore piscinas naturais, palmeiras e paisagens espetaculares durante uma excursão única em uma das joias escondidas de Marrocos." }
    },
    activityNames: {
      "surf": "Surf", "kitesurf": "Kitesurf", "sup": "Stand Up Paddle", "yoga": "Yoga", "pilates": "Pilates",
      "meditation": "Sessão de Meditação", "quad": "Quad no deserto", "buggy": "Buggy Deserto", "camel": "Passeio de Camelo",
      "horse": "Equitação", "sandboarding": "Sandboarding", "paradise-valley": "Excursão Vale do Paraíso",
      "ourika": "Excursão Vale de Ourika", "atlas-hiking": "Caminhada no Atlas", "toubkal": "Trek Monte Toubkal",
      "berber-villages": "Trek Aldeias Berberes", "agafay": "Excursão Deserto de Agafay", "desert-dinner": "Jantar no Deserto",
      "desert-camp": "Noite Acampamento Deserto", "hot-air-balloon": "Balão de Ar Quente", "cooking-class": "Aula de Culinária Marroquina",
      "pastry-workshop": "Workshop Pastelaria Marroquina", "street-food": "Tour Street Food", "medina-tour": "Tour Guiado Medina",
      "souks-tour": "Descoberta dos Souks", "hammam": "Hammam Tradicional", "spa-massage": "Spa & Massagem",
      "salsa-bachata": "Aula Salsa / Bachata", "moroccan-dance": "Aula Dança Marroquina", "city-tour": "Tour da Cidade",
      "essaouira": "Excursão Essaouira", "sunset-beach": "Experiência Pôr do Sol Praia"
    }
  },
  it: {
    heroSubtitle: "Arricchisci il tuo viaggio",
    heroTitle: "Attività Opzionali",
    heroDesc: "Aggiungi esperienze extra al tuo viaggio. Tutte le attività sono opzionali e possono essere prenotate tramite il tuo referente.",
    topExperiencesTitle: "Esperienze Top",
    topExperiencesSubtitle: "Le nostre attività più popolari",
    availabilityTitle: "Disponibilità Attività",
    availabilitySubtitle: "Controlla cosa è disponibile in ogni città",
    legendAvailable: "Disponibile",
    legendNotAvailable: "Non disponibile",
    activity: "Attività",
    duration: "Durata",
    noCommissionTitle: "Politica Zero Commissioni",
    noCommissionText: "Non prendiamo alcuna commissione sulle attività. Selezioniamo attentamente i migliori fornitori locali per te, garantendo esperienze di qualità a prezzi locali. La tua soddisfazione è la nostra unica ricompensa.",
    noCommissionBadge: "100% Prezzi Locali",
    howToBook: "Come prenotare",
    howToBookText: "Tutte le attività vengono prenotate tramite il tuo referente THE BRIDGE. I prezzi sono tariffe locali — non aggiungiamo alcuna commissione.",
    ctaTitle: "Pronto a esplorare?",
    ctaButton: "Prenota la tua esperienza",
    topExperiences: {
      "surf-taghazout": { title: "Surf a Taghazout", description: "Cavalca le onde sulla leggendaria costa atlantica del Marocco con istruttori locali esperti. Perfetto per principianti e surfisti intermedi." },
      "atlas-trek": { title: "Trek sulle Montagne dell'Atlante", description: "Scopri i paesaggi mozzafiato delle montagne dell'Atlante e autentici villaggi berberi durante un'avventura guidata in montagna." },
      "desert-dinner": { title: "Cena nel Deserto di Agafay", description: "Goditi una serata magica sotto le stelle nel deserto di Agafay con cucina marocchina tradizionale e musica dal vivo." },
      "cooking-class": { title: "Corso di Cucina Marocchina", description: "Impara a preparare piatti tradizionali marocchini come tajine e couscous con chef locali." },
      "paradise-valley": { title: "Avventura Valle del Paradiso", description: "Esplora piscine naturali, palme e paesaggi spettacolari durante un'escursione unica in uno dei gioielli nascosti del Marocco." }
    },
    activityNames: {
      "surf": "Surf", "kitesurf": "Kitesurf", "sup": "Stand Up Paddle", "yoga": "Yoga", "pilates": "Pilates",
      "meditation": "Sessione di Meditazione", "quad": "Quad nel deserto", "buggy": "Buggy Deserto", "camel": "Giro in Cammello",
      "horse": "Equitazione", "sandboarding": "Sandboarding", "paradise-valley": "Escursione Valle del Paradiso",
      "ourika": "Escursione Valle di Ourika", "atlas-hiking": "Trekking sull'Atlante", "toubkal": "Trek Monte Toubkal",
      "berber-villages": "Trek Villaggi Berberi", "agafay": "Escursione Deserto di Agafay", "desert-dinner": "Cena nel Deserto",
      "desert-camp": "Notte Campo Deserto", "hot-air-balloon": "Mongolfiera", "cooking-class": "Corso di Cucina Marocchina",
      "pastry-workshop": "Workshop Pasticceria Marocchina", "street-food": "Tour Street Food", "medina-tour": "Tour Guidato Medina",
      "souks-tour": "Scoperta dei Souk", "hammam": "Hammam Tradizionale", "spa-massage": "Spa & Massaggio",
      "salsa-bachata": "Corso Salsa / Bachata", "moroccan-dance": "Corso Danza Marocchina", "city-tour": "Tour della Città",
      "essaouira": "Escursione Essaouira", "sunset-beach": "Esperienza Tramonto Spiaggia"
    }
  }
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

      {/* Top Experiences */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2">{t.topExperiencesTitle}</h2>
              <p className="font-dm text-ocean/70">{t.topExperiencesSubtitle}</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Card className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-all group">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={exp.image} 
                      alt={t.topExperiences[exp.id]?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                          {exp.icon}
                        </div>
                        <h3 className="font-syne font-bold text-lg text-white">{t.topExperiences[exp.id]?.title}</h3>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="font-dm text-ocean/70 text-sm leading-relaxed">
                      {t.topExperiences[exp.id]?.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* No Commission Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-sunset to-sunset/90">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white text-sunset px-4 py-2 rounded-full font-dm font-bold text-sm mb-4">
              <Heart size={16} fill="currentColor" />
              {t.noCommissionBadge}
            </div>
            <h3 className="font-syne font-bold text-2xl text-white mb-4">{t.noCommissionTitle}</h3>
            <p className="font-dm text-white/90 max-w-2xl mx-auto leading-relaxed">
              {t.noCommissionText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Availability Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2">{t.availabilityTitle}</h2>
              <p className="font-dm text-ocean/70 mb-6">{t.availabilitySubtitle}</p>
              
              {/* Legend */}
              <div className="flex justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="font-dm text-sm text-ocean">{t.legendAvailable}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                    <X size={14} className="text-white" />
                  </div>
                  <span className="font-dm text-sm text-ocean">{t.legendNotAvailable}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="overflow-x-auto rounded-xl shadow-lg"
          >
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-ocean text-white">
                  <th className="text-left py-4 px-4 font-syne font-bold text-sm">{t.activity}</th>
                  <th className="text-center py-4 px-3 font-syne font-bold text-sm">{t.duration}</th>
                  <th className="text-center py-4 px-3 font-syne font-bold text-sm">Agadir</th>
                  <th className="text-center py-4 px-3 font-syne font-bold text-sm">Marrakech</th>
                  <th className="text-center py-4 px-3 font-syne font-bold text-sm">Casablanca</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVITIES_DATA.map((activity, i) => (
                  <tr 
                    key={activity.id} 
                    className={`border-b border-gray-100 hover:bg-sand/20 transition-colors ${i % 2 === 0 ? 'bg-warmwhite/50' : 'bg-white'}`}
                  >
                    <td className="py-3 px-4">
                      <span className="font-dm text-ocean text-sm">{t.activityNames[activity.id] || activity.id}</span>
                    </td>
                    <td className="text-center py-3 px-3">
                      <span className="font-dm text-ocean/70 text-sm">{activity.duration}</span>
                    </td>
                    <td className="text-center py-3 px-3">
                      {activity.agadir ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                          <Check size={14} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center mx-auto">
                          <X size={14} className="text-white" />
                        </div>
                      )}
                    </td>
                    <td className="text-center py-3 px-3">
                      {activity.marrakech ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                          <Check size={14} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center mx-auto">
                          <X size={14} className="text-white" />
                        </div>
                      )}
                    </td>
                    <td className="text-center py-3 px-3">
                      {activity.casablanca ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                          <Check size={14} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center mx-auto">
                          <X size={14} className="text-white" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Info className="mx-auto text-sunset mb-4" size={40} />
            <h2 className="font-syne font-bold text-2xl text-ocean mb-4">{t.howToBook}</h2>
            <p className="font-dm text-ocean/70">
              {t.howToBookText}
            </p>
          </motion.div>
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
