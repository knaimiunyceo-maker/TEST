import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';

const seoData = {
  home: {
    en: {
      title: "THE BRIDGE - Travel • Practice • Experience | Morocco Adventures",
      description: "Join unique travel experiences in Morocco. Self-defense, language practice, and visual storytelling holidays with small international groups.",
      keywords: "Morocco travel, self-defense holiday, language immersion, visual storytelling, adventure travel"
    },
    fr: {
      title: "THE BRIDGE - Voyage • Pratique • Expérience | Aventures au Maroc",
      description: "Rejoignez des expériences de voyage uniques au Maroc. Séjours self-défense, pratique linguistique et storytelling visuel avec de petits groupes internationaux.",
      keywords: "voyage Maroc, séjour self-défense, immersion linguistique, storytelling visuel, voyage aventure"
    },
    es: {
      title: "THE BRIDGE - Viaja • Practica • Experimenta | Aventuras en Marruecos",
      description: "Únete a experiencias de viaje únicas en Marruecos. Vacaciones de defensa personal, práctica de idiomas y storytelling visual con pequeños grupos internacionales.",
      keywords: "viaje Marruecos, vacaciones defensa personal, inmersión lingüística, storytelling visual, viaje aventura"
    },
    de: {
      title: "THE BRIDGE - Reisen • Üben • Erleben | Marokko Abenteuer",
      description: "Erleben Sie einzigartige Reiseerlebnisse in Marokko. Selbstverteidigung, Sprachpraxis und Visual Storytelling mit kleinen internationalen Gruppen.",
      keywords: "Marokko Reise, Selbstverteidigung Urlaub, Sprachimmersion, Visual Storytelling, Abenteuerreise"
    },
    pt: {
      title: "THE BRIDGE - Viaje • Pratique • Experimente | Aventuras em Marrocos",
      description: "Junte-se a experiências de viagem únicas em Marrocos. Férias de defesa pessoal, prática de idiomas e storytelling visual com pequenos grupos internacionais.",
      keywords: "viagem Marrocos, férias defesa pessoal, imersão linguística, storytelling visual, viagem aventura"
    },
    it: {
      title: "THE BRIDGE - Viaggia • Pratica • Vivi | Avventure in Marocco",
      description: "Unisciti a esperienze di viaggio uniche in Marocco. Vacanze di autodifesa, pratica linguistica e visual storytelling con piccoli gruppi internazionali.",
      keywords: "viaggio Marocco, vacanze autodifesa, immersione linguistica, visual storytelling, viaggio avventura"
    }
  },
  experiences: {
    en: {
      title: "Experiences | THE BRIDGE - Self-Defense, Language & Storytelling",
      description: "Discover our unique experiences: Self-Defense holidays, Language Practice immersion, and Visual Storytelling adventures in Morocco.",
      keywords: "Morocco experiences, self-defense training, English immersion, photography workshops"
    },
    fr: {
      title: "Expériences | THE BRIDGE - Self-Défense, Langues & Storytelling",
      description: "Découvrez nos expériences uniques : Séjours Self-Défense, Immersion Linguistique et Storytelling Visuel au Maroc.",
      keywords: "expériences Maroc, entraînement self-défense, immersion anglais, ateliers photo"
    },
    es: {
      title: "Experiencias | THE BRIDGE - Defensa Personal, Idiomas & Storytelling",
      description: "Descubre nuestras experiencias únicas: Vacaciones de Defensa Personal, Inmersión Lingüística y Storytelling Visual en Marruecos.",
      keywords: "experiencias Marruecos, entrenamiento defensa personal, inmersión inglés, talleres fotografía"
    },
    de: {
      title: "Erlebnisse | THE BRIDGE - Selbstverteidigung, Sprachen & Storytelling",
      description: "Entdecken Sie unsere einzigartigen Erlebnisse: Selbstverteidigung, Sprachimmersion und Visual Storytelling in Marokko.",
      keywords: "Marokko Erlebnisse, Selbstverteidigung Training, Englisch Immersion, Fotografie Workshops"
    },
    pt: {
      title: "Experiências | THE BRIDGE - Defesa Pessoal, Idiomas & Storytelling",
      description: "Descubra nossas experiências únicas: Férias de Defesa Pessoal, Imersão Linguística e Storytelling Visual em Marrocos.",
      keywords: "experiências Marrocos, treinamento defesa pessoal, imersão inglês, workshops fotografia"
    },
    it: {
      title: "Esperienze | THE BRIDGE - Autodifesa, Lingue & Storytelling",
      description: "Scopri le nostre esperienze uniche: Vacanze di Autodifesa, Immersione Linguistica e Visual Storytelling in Marocco.",
      keywords: "esperienze Marocco, allenamento autodifesa, immersione inglese, workshop fotografia"
    }
  },
  destinations: {
    en: {
      title: "Destinations | THE BRIDGE - Casablanca, Marrakech, Agadir",
      description: "Explore Morocco's best destinations: Casablanca, Marrakech, and Agadir. Each city offers unique experiences for your adventure.",
      keywords: "Casablanca, Marrakech, Agadir, Morocco destinations, travel Morocco"
    },
    fr: {
      title: "Destinations | THE BRIDGE - Casablanca, Marrakech, Agadir",
      description: "Explorez les meilleures destinations du Maroc : Casablanca, Marrakech et Agadir. Chaque ville offre des expériences uniques.",
      keywords: "Casablanca, Marrakech, Agadir, destinations Maroc, voyage Maroc"
    },
    es: {
      title: "Destinos | THE BRIDGE - Casablanca, Marrakech, Agadir",
      description: "Explora los mejores destinos de Marruecos: Casablanca, Marrakech y Agadir. Cada ciudad ofrece experiencias únicas.",
      keywords: "Casablanca, Marrakech, Agadir, destinos Marruecos, viaje Marruecos"
    },
    de: {
      title: "Reiseziele | THE BRIDGE - Casablanca, Marrakesch, Agadir",
      description: "Entdecken Sie Marokkos beste Reiseziele: Casablanca, Marrakesch und Agadir. Jede Stadt bietet einzigartige Erlebnisse.",
      keywords: "Casablanca, Marrakesch, Agadir, Marokko Reiseziele, Marokko Reise"
    },
    pt: {
      title: "Destinos | THE BRIDGE - Casablanca, Marraquexe, Agadir",
      description: "Explore os melhores destinos de Marrocos: Casablanca, Marraquexe e Agadir. Cada cidade oferece experiências únicas.",
      keywords: "Casablanca, Marraquexe, Agadir, destinos Marrocos, viagem Marrocos"
    },
    it: {
      title: "Destinazioni | THE BRIDGE - Casablanca, Marrakech, Agadir",
      description: "Esplora le migliori destinazioni del Marocco: Casablanca, Marrakech e Agadir. Ogni città offre esperienze uniche.",
      keywords: "Casablanca, Marrakech, Agadir, destinazioni Marocco, viaggio Marocco"
    }
  },
  book: {
    en: {
      title: "Book Your Experience | THE BRIDGE",
      description: "Book your adventure in Morocco. Choose from Self-Defense, Language Practice, or Visual Storytelling experiences.",
      keywords: "book Morocco trip, reserve experience, travel booking"
    },
    fr: {
      title: "Réservez Votre Expérience | THE BRIDGE",
      description: "Réservez votre aventure au Maroc. Choisissez parmi Self-Défense, Pratique Linguistique ou Storytelling Visuel.",
      keywords: "réserver voyage Maroc, réserver expérience, réservation voyage"
    },
    es: {
      title: "Reserva Tu Experiencia | THE BRIDGE",
      description: "Reserva tu aventura en Marruecos. Elige entre Defensa Personal, Práctica de Idiomas o Storytelling Visual.",
      keywords: "reservar viaje Marruecos, reservar experiencia, reserva viaje"
    },
    de: {
      title: "Buchen Sie Ihr Erlebnis | THE BRIDGE",
      description: "Buchen Sie Ihr Abenteuer in Marokko. Wählen Sie zwischen Selbstverteidigung, Sprachpraxis oder Visual Storytelling.",
      keywords: "Marokko Reise buchen, Erlebnis reservieren, Reisebuchung"
    },
    pt: {
      title: "Reserve Sua Experiência | THE BRIDGE",
      description: "Reserve sua aventura em Marrocos. Escolha entre Defesa Pessoal, Prática de Idiomas ou Storytelling Visual.",
      keywords: "reservar viagem Marrocos, reservar experiência, reserva viagem"
    },
    it: {
      title: "Prenota la Tua Esperienza | THE BRIDGE",
      description: "Prenota la tua avventura in Marocco. Scegli tra Autodifesa, Pratica Linguistica o Visual Storytelling.",
      keywords: "prenotare viaggio Marocco, prenotare esperienza, prenotazione viaggio"
    }
  },
  about: {
    en: {
      title: "About Us | THE BRIDGE - Our Story & Mission",
      description: "Learn about THE BRIDGE and our mission to create meaningful travel experiences that combine learning, adventure, and cultural immersion.",
      keywords: "about THE BRIDGE, travel company, Morocco tours, adventure travel company"
    },
    fr: {
      title: "À Propos | THE BRIDGE - Notre Histoire & Mission",
      description: "Découvrez THE BRIDGE et notre mission de créer des expériences de voyage significatives alliant apprentissage, aventure et immersion culturelle.",
      keywords: "à propos THE BRIDGE, agence voyage, circuits Maroc, voyage aventure"
    },
    es: {
      title: "Sobre Nosotros | THE BRIDGE - Nuestra Historia & Misión",
      description: "Conoce THE BRIDGE y nuestra misión de crear experiencias de viaje significativas que combinan aprendizaje, aventura e inmersión cultural.",
      keywords: "sobre THE BRIDGE, empresa viajes, tours Marruecos, viaje aventura"
    },
    de: {
      title: "Über Uns | THE BRIDGE - Unsere Geschichte & Mission",
      description: "Erfahren Sie mehr über THE BRIDGE und unsere Mission, bedeutungsvolle Reiseerlebnisse zu schaffen.",
      keywords: "über THE BRIDGE, Reiseunternehmen, Marokko Touren, Abenteuerreisen"
    },
    pt: {
      title: "Sobre Nós | THE BRIDGE - Nossa História & Missão",
      description: "Conheça THE BRIDGE e nossa missão de criar experiências de viagem significativas que combinam aprendizado, aventura e imersão cultural.",
      keywords: "sobre THE BRIDGE, empresa viagens, tours Marrocos, viagem aventura"
    },
    it: {
      title: "Chi Siamo | THE BRIDGE - La Nostra Storia & Missione",
      description: "Scopri THE BRIDGE e la nostra missione di creare esperienze di viaggio significative che combinano apprendimento, avventura e immersione culturale.",
      keywords: "chi siamo THE BRIDGE, azienda viaggi, tour Marocco, viaggio avventura"
    }
  },
  howItWorks: {
    en: {
      title: "How It Works | THE BRIDGE - Booking Process",
      description: "Learn how THE BRIDGE experience works: from choosing your adventure to joining your group in Morocco.",
      keywords: "how it works, booking process, travel planning, Morocco trip planning"
    },
    fr: {
      title: "Comment Ça Marche | THE BRIDGE - Processus de Réservation",
      description: "Découvrez comment fonctionne l'expérience THE BRIDGE : du choix de votre aventure à la rencontre de votre groupe au Maroc.",
      keywords: "comment ça marche, processus réservation, planification voyage, voyage Maroc"
    },
    es: {
      title: "Cómo Funciona | THE BRIDGE - Proceso de Reserva",
      description: "Aprende cómo funciona la experiencia THE BRIDGE: desde elegir tu aventura hasta unirte a tu grupo en Marruecos.",
      keywords: "cómo funciona, proceso reserva, planificación viaje, viaje Marruecos"
    },
    de: {
      title: "So Funktioniert's | THE BRIDGE - Buchungsprozess",
      description: "Erfahren Sie, wie das THE BRIDGE Erlebnis funktioniert: von der Auswahl Ihres Abenteuers bis zum Treffen Ihrer Gruppe.",
      keywords: "so funktioniert es, Buchungsprozess, Reiseplanung, Marokko Reise"
    },
    pt: {
      title: "Como Funciona | THE BRIDGE - Processo de Reserva",
      description: "Aprenda como funciona a experiência THE BRIDGE: desde escolher sua aventura até se juntar ao seu grupo em Marrocos.",
      keywords: "como funciona, processo reserva, planejamento viagem, viagem Marrocos"
    },
    it: {
      title: "Come Funziona | THE BRIDGE - Processo di Prenotazione",
      description: "Scopri come funziona l'esperienza THE BRIDGE: dalla scelta della tua avventura all'incontro con il tuo gruppo in Marocco.",
      keywords: "come funziona, processo prenotazione, pianificazione viaggio, viaggio Marocco"
    }
  }
};

const SEO = ({ page = 'home', customTitle, customDescription }) => {
  const { language } = useLanguage();
  const pageData = seoData[page]?.[language] || seoData[page]?.en || seoData.home.en;
  
  const title = customTitle || pageData.title;
  const description = customDescription || pageData.description;
  const keywords = pageData.keywords;
  
  const baseUrl = "https://bridge-morocco.preview.emergentagent.com";
  const ogImage = "https://images.unsplash.com/photo-1662009833223-75d3301290bd?crop=entropy&cs=srgb&fm=jpg&w=1200";

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'fr' ? 'fr_FR' : language === 'es' ? 'es_ES' : language === 'de' ? 'de_DE' : language === 'pt' ? 'pt_PT' : 'it_IT'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="THE BRIDGE - UNYCEO France" />
      <link rel="canonical" href={baseUrl} />
    </Helmet>
  );
};

export default SEO;
