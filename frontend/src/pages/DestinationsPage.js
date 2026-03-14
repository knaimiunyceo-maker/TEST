import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Sun, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    heroSubtitle: "Discover Morocco",
    heroTitle: "Our Destinations",
    heroDesc: "From vibrant cities to coastal towns, experience Morocco's diverse beauty.",
    availableExperiences: "Available experiences",
    highlights: "Highlights",
    explore: "Explore",
    destinations: [
      { id: "casablanca", name: "Casablanca", tagline: "Morocco's modern metropolis", description: "The economic capital of Morocco. A blend of tradition and modernity with stunning Art Deco architecture.", experiences: ["Language Practice"], highlights: ["Hassan II Mosque", "Art Deco downtown", "Corniche beaches", "Vibrant nightlife"] },
      { id: "marrakech", name: "Marrakech", tagline: "The Red City", description: "Ancient medinas, stunning palaces, and vibrant souks. The heart of Moroccan culture and adventure.", experiences: ["Self-Defense Weekend", "Language Practice", "Visual Storytelling"], highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Medina souks", "Atlas Mountains nearby"] },
      { id: "agadir", name: "Agadir", tagline: "Morocco's sunny beach paradise", description: "The premier beach destination with 300+ sunny days per year. Perfect for training and beach life.", experiences: ["Self-Defense Weekend", "Visual Storytelling"], highlights: ["10km beach", "Taghazout surf", "Paradise Valley", "Marina nightlife"] }
    ]
  },
  fr: {
    heroSubtitle: "Découvrez le Maroc",
    heroTitle: "Nos Destinations",
    heroDesc: "Des villes vibrantes aux cités côtières, découvrez la beauté diverse du Maroc.",
    availableExperiences: "Expériences disponibles",
    highlights: "Points forts",
    explore: "Explorer",
    destinations: [
      { id: "casablanca", name: "Casablanca", tagline: "La métropole moderne du Maroc", description: "La capitale économique du Maroc. Un mélange de tradition et de modernité avec une superbe architecture Art Déco.", experiences: ["Language Practice"], highlights: ["Mosquée Hassan II", "Centre-ville Art Déco", "Plages de la Corniche", "Vie nocturne animée"] },
      { id: "marrakech", name: "Marrakech", tagline: "La Ville Rouge", description: "Anciennes médinas, palais magnifiques et souks animés. Le cœur de la culture et de l'aventure marocaine.", experiences: ["Self-Defense Weekend", "Language Practice", "Visual Storytelling"], highlights: ["Jemaa el-Fnaa", "Jardin Majorelle", "Souks de la Médina", "Montagnes de l'Atlas"] },
      { id: "agadir", name: "Agadir", tagline: "Le paradis balnéaire du Maroc", description: "La première destination balnéaire avec 300+ jours de soleil par an. Parfait pour l'entraînement et la vie de plage.", experiences: ["Self-Defense Weekend", "Visual Storytelling"], highlights: ["Plage de 10km", "Surf à Taghazout", "Vallée du Paradis", "Marina nocturne"] }
    ]
  },
  es: {
    heroSubtitle: "Descubre Marruecos",
    heroTitle: "Nuestros Destinos",
    heroDesc: "Desde ciudades vibrantes hasta pueblos costeros, experimenta la belleza diversa de Marruecos.",
    availableExperiences: "Experiencias disponibles",
    highlights: "Destacados",
    explore: "Explorar",
    destinations: [
      { id: "casablanca", name: "Casablanca", tagline: "La metrópolis moderna de Marruecos", description: "La capital económica de Marruecos. Una mezcla de tradición y modernidad con impresionante arquitectura Art Deco.", experiences: ["Language Practice"], highlights: ["Mezquita Hassan II", "Centro Art Deco", "Playas de Corniche", "Vida nocturna vibrante"] },
      { id: "marrakech", name: "Marrakech", tagline: "La Ciudad Roja", description: "Antiguas medinas, palacios impresionantes y zocos vibrantes. El corazón de la cultura y aventura marroquí.", experiences: ["Self-Defense Weekend", "Language Practice", "Visual Storytelling"], highlights: ["Jemaa el-Fnaa", "Jardín Majorelle", "Zocos de la Medina", "Montañas del Atlas"] },
      { id: "agadir", name: "Agadir", tagline: "El paraíso playero de Marruecos", description: "El principal destino de playa con 300+ días de sol al año. Perfecto para entrenar y vida playera.", experiences: ["Self-Defense Weekend", "Visual Storytelling"], highlights: ["Playa de 10km", "Surf en Taghazout", "Valle del Paraíso", "Marina nocturna"] }
    ]
  },
  pt: {
    heroSubtitle: "Descubra o Marrocos",
    heroTitle: "Nossos Destinos",
    heroDesc: "De cidades vibrantes a cidades costeiras, experimente a beleza diversa do Marrocos.",
    availableExperiences: "Experiências disponíveis",
    highlights: "Destaques",
    explore: "Explorar",
    destinations: [
      { id: "casablanca", name: "Casablanca", tagline: "A metrópole moderna do Marrocos", description: "A capital econômica do Marrocos. Uma mistura de tradição e modernidade com impressionante arquitetura Art Deco.", experiences: ["Language Practice"], highlights: ["Mesquita Hassan II", "Centro Art Deco", "Praias de Corniche", "Vida noturna vibrante"] },
      { id: "marrakech", name: "Marrakech", tagline: "A Cidade Vermelha", description: "Antigas medinas, palácios deslumbrantes e souks vibrantes. O coração da cultura e aventura marroquina.", experiences: ["Self-Defense Weekend", "Language Practice", "Visual Storytelling"], highlights: ["Jemaa el-Fnaa", "Jardim Majorelle", "Souks da Medina", "Montanhas do Atlas"] },
      { id: "agadir", name: "Agadir", tagline: "O paraíso praiano do Marrocos", description: "O principal destino de praia com 300+ dias de sol por ano. Perfeito para treino e vida de praia.", experiences: ["Self-Defense Weekend", "Visual Storytelling"], highlights: ["Praia de 10km", "Surf em Taghazout", "Vale do Paraíso", "Marina noturna"] }
    ]
  },
  de: {
    heroSubtitle: "Entdecken Sie Marokko",
    heroTitle: "Unsere Reiseziele",
    heroDesc: "Von pulsierenden Städten bis zu Küstenstädten, erleben Sie Marokkos vielfältige Schönheit.",
    availableExperiences: "Verfügbare Erlebnisse",
    highlights: "Highlights",
    explore: "Erkunden",
    destinations: [
      { id: "casablanca", name: "Casablanca", tagline: "Marokkos moderne Metropole", description: "Die Wirtschaftshauptstadt Marokkos. Eine Mischung aus Tradition und Moderne mit atemberaubender Art-Deco-Architektur.", experiences: ["Language Practice"], highlights: ["Hassan-II-Moschee", "Art-Deco-Innenstadt", "Corniche-Strände", "Lebhaftes Nachtleben"] },
      { id: "marrakech", name: "Marrakesch", tagline: "Die Rote Stadt", description: "Alte Medinas, prächtige Paläste und lebhafte Souks. Das Herz der marokkanischen Kultur und Abenteuer.", experiences: ["Self-Defense Weekend", "Language Practice", "Visual Storytelling"], highlights: ["Djemaa el-Fna", "Majorelle-Garten", "Medina-Souks", "Atlasgebirge in der Nähe"] },
      { id: "agadir", name: "Agadir", tagline: "Marokkos sonniges Strandparadies", description: "Das führende Strandziel mit 300+ Sonnentagen im Jahr. Perfekt für Training und Strandleben.", experiences: ["Self-Defense Weekend", "Visual Storytelling"], highlights: ["10km Strand", "Surfen in Taghazout", "Paradies-Tal", "Marina-Nachtleben"] }
    ]
  },
  it: {
    heroSubtitle: "Scopri il Marocco",
    heroTitle: "Le Nostre Destinazioni",
    heroDesc: "Dalle città vibranti alle città costiere, scopri la bellezza diversa del Marocco.",
    availableExperiences: "Esperienze disponibili",
    highlights: "Punti salienti",
    explore: "Esplora",
    destinations: [
      { id: "casablanca", name: "Casablanca", tagline: "La metropoli moderna del Marocco", description: "La capitale economica del Marocco. Un mix di tradizione e modernità con splendida architettura Art Deco.", experiences: ["Language Practice"], highlights: ["Moschea Hassan II", "Centro Art Deco", "Spiagge Corniche", "Vivace vita notturna"] },
      { id: "marrakech", name: "Marrakech", tagline: "La Città Rossa", description: "Antiche medine, palazzi mozzafiato e souk vibranti. Il cuore della cultura e dell'avventura marocchina.", experiences: ["Self-Defense Weekend", "Language Practice", "Visual Storytelling"], highlights: ["Jemaa el-Fnaa", "Giardino Majorelle", "Souk della Medina", "Montagne dell'Atlante vicine"] },
      { id: "agadir", name: "Agadir", tagline: "Il paradiso balneare del Marocco", description: "La prima destinazione balneare con 300+ giorni di sole all'anno. Perfetto per l'allenamento e la vita da spiaggia.", experiences: ["Self-Defense Weekend", "Visual Storytelling"], highlights: ["Spiaggia di 10km", "Surf a Taghazout", "Valle del Paradiso", "Marina notturna"] }
    ]
  }
};

const DESTINATION_IMAGES = {
  "casablanca": "https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=800",
  "marrakech": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800",
  "agadir": "https://images.unsplash.com/photo-1553522987-b6cb62385487?w=800"
};

const DestinationsPage = () => {
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

      {/* Destinations Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {t.destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="border-none shadow-lg overflow-hidden h-full">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={DESTINATION_IMAGES[dest.id]} 
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-syne font-bold text-2xl text-white">{dest.name}</h3>
                      <p className="font-caveat text-sand text-lg">{dest.tagline}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="font-dm text-ocean/80 text-sm mb-4">{dest.description}</p>
                    
                    <div className="mb-4">
                      <p className="font-dm font-semibold text-ocean text-xs mb-2">{t.availableExperiences}:</p>
                      <div className="flex flex-wrap gap-2">
                        {dest.experiences.map((exp) => (
                          <span key={exp} className="bg-sunset/10 text-sunset px-2 py-1 rounded-full text-xs font-dm">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-dm font-semibold text-ocean text-xs mb-2">{t.highlights}:</p>
                      <div className="flex flex-wrap gap-2">
                        {dest.highlights.map((h) => (
                          <span key={h} className="bg-ocean/10 text-ocean px-2 py-1 rounded-full text-xs font-dm">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="w-full bg-ocean hover:bg-ocean/90 text-white rounded-full">
                      <Link to={`/destinations/${dest.id}`}>
                        {t.explore} {dest.name} <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Morocco */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8">Why Morocco?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Sun size={24} />, title: "Year-round Sun", desc: "Perfect weather for training and exploring" },
              { icon: <Users size={24} />, title: "Rich Culture", desc: "Friendly locals and ancient traditions" },
              { icon: <Home size={24} />, title: "Affordable", desc: "Great value for European travelers" }
            ].map((item, i) => (
              <div key={i}>
                <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center mx-auto mb-3 text-sunset">
                  {item.icon}
                </div>
                <h3 className="font-syne font-bold text-ocean mb-1">{item.title}</h3>
                <p className="font-dm text-ocean/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">
            Choose Your Destination
          </h2>
          <p className="font-dm text-white/80 mb-6">
            Book your experience and discover Morocco with us.
          </p>
          <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
            <Link to="/book">Book Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default DestinationsPage;
