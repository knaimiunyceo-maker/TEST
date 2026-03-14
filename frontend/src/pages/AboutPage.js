import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Compass, Users, Target, Sun, Sunrise, MapPin, 
  Heart, Shield, Camera, Languages, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const aboutTranslations = {
  en: {
    heroTitle: "About The Bridge",
    heroSubtitle: "A different way to travel",
    intro1: "The Bridge was created for people who love to travel but don't want to spend their days lying on a beach chair.",
    intro2: "Our experiences are designed for curious travelers who want to learn something new, stay active, and connect with people while discovering Morocco.",
    intro3: "Instead of traditional tourism, we offer small group experiences built around",
    learning: "learning",
    exploration: "exploration",
    connection: "human connection",
    purposeTitle: "Travel with Purpose",
    purposeSubtitle: "Our experiences combine three key elements",
    purpose1Title: "Practice",
    purpose1Desc: "Every trip includes morning sessions: self-defense, language practice, or visual storytelling.",
    purpose2Title: "Discover",
    purpose2Desc: "Afternoons are for exploring Morocco: medinas, beaches, mountains, and hidden gems.",
    purpose3Title: "Connect",
    purpose3Desc: "Small groups, shared meals, and evening activities create genuine connections.",
    whyTitle: "Why Morocco?",
    whyText: "Morocco is where Europe meets Africa, where ancient traditions coexist with modern energy. It's a country of incredible diversity – from the Atlantic coast to the Sahara, from the Atlas Mountains to vibrant cities like Marrakech and Casablanca. The people are warm, the culture is rich, and the experiences are unforgettable.",
    ctaTitle: "Ready to bridge your next journey?",
    ctaButton: "Explore Our Experiences"
  },
  fr: {
    heroTitle: "À Propos de The Bridge",
    heroSubtitle: "Une autre façon de voyager",
    intro1: "The Bridge a été créé pour les personnes qui aiment voyager mais ne veulent pas passer leurs journées allongées sur une chaise longue.",
    intro2: "Nos expériences sont conçues pour les voyageurs curieux qui veulent apprendre quelque chose de nouveau, rester actifs et se connecter avec les gens tout en découvrant le Maroc.",
    intro3: "Au lieu du tourisme traditionnel, nous proposons des expériences en petits groupes construites autour de",
    learning: "l'apprentissage",
    exploration: "l'exploration",
    connection: "la connexion humaine",
    purposeTitle: "Voyager avec un But",
    purposeSubtitle: "Nos expériences combinent trois éléments clés",
    purpose1Title: "Pratiquer",
    purpose1Desc: "Chaque voyage comprend des séances matinales : self-défense, pratique linguistique ou storytelling visuel.",
    purpose2Title: "Découvrir",
    purpose2Desc: "Les après-midis sont consacrés à l'exploration du Maroc : médinas, plages, montagnes et trésors cachés.",
    purpose3Title: "Se Connecter",
    purpose3Desc: "Petits groupes, repas partagés et activités du soir créent des connexions authentiques.",
    whyTitle: "Pourquoi le Maroc ?",
    whyText: "Le Maroc est là où l'Europe rencontre l'Afrique, où les traditions anciennes coexistent avec l'énergie moderne. C'est un pays d'une incroyable diversité – de la côte atlantique au Sahara, des montagnes de l'Atlas aux villes vibrantes comme Marrakech et Casablanca. Les gens sont chaleureux, la culture est riche et les expériences sont inoubliables.",
    ctaTitle: "Prêt à franchir le pont vers votre prochaine aventure ?",
    ctaButton: "Découvrir Nos Expériences"
  },
  es: {
    heroTitle: "Sobre The Bridge",
    heroSubtitle: "Una forma diferente de viajar",
    intro1: "The Bridge fue creado para personas que aman viajar pero no quieren pasar sus días tumbados en una tumbona.",
    intro2: "Nuestras experiencias están diseñadas para viajeros curiosos que quieren aprender algo nuevo, mantenerse activos y conectar con personas mientras descubren Marruecos.",
    intro3: "En lugar del turismo tradicional, ofrecemos experiencias en grupos pequeños construidas alrededor de",
    learning: "el aprendizaje",
    exploration: "la exploración",
    connection: "la conexión humana",
    purposeTitle: "Viajar con Propósito",
    purposeSubtitle: "Nuestras experiencias combinan tres elementos clave",
    purpose1Title: "Practicar",
    purpose1Desc: "Cada viaje incluye sesiones matutinas: defensa personal, práctica de idiomas o storytelling visual.",
    purpose2Title: "Descubrir",
    purpose2Desc: "Las tardes son para explorar Marruecos: medinas, playas, montañas y joyas escondidas.",
    purpose3Title: "Conectar",
    purpose3Desc: "Grupos pequeños, comidas compartidas y actividades nocturnas crean conexiones genuinas.",
    whyTitle: "¿Por qué Marruecos?",
    whyText: "Marruecos es donde Europa se encuentra con África, donde las tradiciones antiguas coexisten con la energía moderna. Es un país de increíble diversidad – desde la costa atlántica hasta el Sahara, desde las montañas del Atlas hasta ciudades vibrantes como Marrakech y Casablanca. La gente es cálida, la cultura es rica y las experiencias son inolvidables.",
    ctaTitle: "¿Listo para tender un puente hacia tu próxima aventura?",
    ctaButton: "Explorar Nuestras Experiencias"
  },
  pt: {
    heroTitle: "Sobre The Bridge",
    heroSubtitle: "Uma forma diferente de viajar",
    intro1: "The Bridge foi criado para pessoas que amam viajar mas não querem passar seus dias deitadas em uma espreguiçadeira.",
    intro2: "Nossas experiências são projetadas para viajantes curiosos que querem aprender algo novo, manter-se ativos e conectar-se com pessoas enquanto descobrem o Marrocos.",
    intro3: "Em vez do turismo tradicional, oferecemos experiências em pequenos grupos construídas em torno de",
    learning: "aprendizado",
    exploration: "exploração",
    connection: "conexão humana",
    purposeTitle: "Viajar com Propósito",
    purposeSubtitle: "Nossas experiências combinam três elementos-chave",
    purpose1Title: "Praticar",
    purpose1Desc: "Cada viagem inclui sessões matinais: autodefesa, prática de idiomas ou storytelling visual.",
    purpose2Title: "Descobrir",
    purpose2Desc: "As tardes são para explorar o Marrocos: medinas, praias, montanhas e joias escondidas.",
    purpose3Title: "Conectar",
    purpose3Desc: "Grupos pequenos, refeições compartilhadas e atividades noturnas criam conexões genuínas.",
    whyTitle: "Por que Marrocos?",
    whyText: "O Marrocos é onde a Europa encontra a África, onde tradições antigas coexistem com energia moderna. É um país de incrível diversidade – da costa atlântica ao Saara, das montanhas do Atlas a cidades vibrantes como Marrakech e Casablanca. As pessoas são calorosas, a cultura é rica e as experiências são inesquecíveis.",
    ctaTitle: "Pronto para construir a ponte para sua próxima aventura?",
    ctaButton: "Explorar Nossas Experiências"
  },
  de: {
    heroTitle: "Über The Bridge",
    heroSubtitle: "Eine andere Art zu reisen",
    intro1: "The Bridge wurde für Menschen geschaffen, die gerne reisen, aber ihre Tage nicht auf einem Liegestuhl verbringen möchten.",
    intro2: "Unsere Erlebnisse sind für neugierige Reisende konzipiert, die etwas Neues lernen, aktiv bleiben und sich mit Menschen verbinden möchten, während sie Marokko entdecken.",
    intro3: "Anstelle von traditionellem Tourismus bieten wir Kleingrupperlebnisse, die sich um diese Elemente drehen:",
    learning: "Lernen",
    exploration: "Entdecken",
    connection: "menschliche Verbindung",
    purposeTitle: "Reisen mit Sinn",
    purposeSubtitle: "Unsere Erlebnisse kombinieren drei Schlüsselelemente",
    purpose1Title: "Üben",
    purpose1Desc: "Jede Reise beinhaltet Morgensessions: Selbstverteidigung, Sprachpraxis oder visuelles Storytelling.",
    purpose2Title: "Entdecken",
    purpose2Desc: "Nachmittage sind zum Erkunden Marokkos: Medinas, Strände, Berge und versteckte Schätze.",
    purpose3Title: "Verbinden",
    purpose3Desc: "Kleine Gruppen, gemeinsame Mahlzeiten und Abendaktivitäten schaffen echte Verbindungen.",
    whyTitle: "Warum Marokko?",
    whyText: "Marokko ist dort, wo Europa auf Afrika trifft, wo alte Traditionen mit moderner Energie koexistieren. Es ist ein Land von unglaublicher Vielfalt – von der Atlantikküste bis zur Sahara, vom Atlasgebirge bis zu pulsierenden Städten wie Marrakesch und Casablanca. Die Menschen sind herzlich, die Kultur ist reich und die Erlebnisse sind unvergesslich.",
    ctaTitle: "Bereit, die Brücke zu Ihrer nächsten Reise zu schlagen?",
    ctaButton: "Unsere Erlebnisse Entdecken"
  },
  it: {
    heroTitle: "Chi Siamo",
    heroSubtitle: "Un modo diverso di viaggiare",
    intro1: "The Bridge è stato creato per le persone che amano viaggiare ma non vogliono passare le giornate sdraiate su una sdraio.",
    intro2: "Le nostre esperienze sono progettate per viaggiatori curiosi che vogliono imparare qualcosa di nuovo, rimanere attivi e connettersi con le persone mentre scoprono il Marocco.",
    intro3: "Invece del turismo tradizionale, offriamo esperienze in piccoli gruppi costruite attorno a",
    learning: "apprendimento",
    exploration: "esplorazione",
    connection: "connessione umana",
    purposeTitle: "Viaggiare con Uno Scopo",
    purposeSubtitle: "Le nostre esperienze combinano tre elementi chiave",
    purpose1Title: "Praticare",
    purpose1Desc: "Ogni viaggio include sessioni mattutine: autodifesa, pratica linguistica o visual storytelling.",
    purpose2Title: "Scoprire",
    purpose2Desc: "I pomeriggi sono per esplorare il Marocco: medine, spiagge, montagne e gemme nascoste.",
    purpose3Title: "Connettersi",
    purpose3Desc: "Piccoli gruppi, pasti condivisi e attività serali creano connessioni genuine.",
    whyTitle: "Perché il Marocco?",
    whyText: "Il Marocco è dove l'Europa incontra l'Africa, dove le tradizioni antiche coesistono con l'energia moderna. È un paese di incredibile diversità – dalla costa atlantica al Sahara, dalle montagne dell'Atlante a città vibranti come Marrakech e Casablanca. Le persone sono calde, la cultura è ricca e le esperienze sono indimenticabili.",
    ctaTitle: "Pronto a costruire il ponte verso la tua prossima avventura?",
    ctaButton: "Scopri Le Nostre Esperienze"
  }
};

const AboutPage = () => {
  const { language } = useLanguage();
  const t = aboutTranslations[language] || aboutTranslations.en;
  
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-sand rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-sunset rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-syne font-black text-4xl sm:text-5xl lg:text-6xl mb-6">
              About The Bridge
            </h1>
            <p className="font-dm text-xl sm:text-2xl text-sand">
              A different way to travel
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 sm:py-20 bg-warmwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-dm text-lg text-ocean/80 leading-relaxed mb-6">
              The Bridge was created for people who love to travel but don't want to spend their days lying on a beach chair.
            </p>
            <p className="font-dm text-lg text-ocean/80 leading-relaxed mb-6">
              Our experiences are designed for curious travelers who want to learn something new, stay active, and connect with people while discovering Morocco.
            </p>
            <p className="font-dm text-lg text-ocean/80 leading-relaxed">
              Instead of traditional tourism, we offer small group experiences built around <strong className="text-ocean">learning</strong>, <strong className="text-ocean">exploration</strong>, and <strong className="text-ocean">human connection</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Travel with Purpose */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-ocean mb-4">
              Travel with purpose
            </h2>
            <p className="font-dm text-ocean/70 max-w-2xl mx-auto">
              Each experience combines two elements:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-lg h-full bg-gradient-to-br from-sunset/5 to-sunset/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-sunset rounded-2xl flex items-center justify-center mb-6">
                    <Sunrise className="text-white" size={28} />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean mb-3">A skill in the morning</h3>
                  <p className="font-dm text-ocean/70">
                    Training, learning, or creative practice.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-lg h-full bg-gradient-to-br from-sand/10 to-sand/20">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-sand rounded-2xl flex items-center justify-center mb-6">
                    <Sun className="text-ocean" size={28} />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean mb-3">Exploration in the afternoon</h3>
                  <p className="font-dm text-ocean/70">
                    Discovering the city, meeting people, and experiencing the local culture.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-dm text-ocean/70 mt-10 max-w-2xl mx-auto"
          >
            This simple structure allows participants to travel while developing a new ability and sharing a meaningful experience with others.
          </motion.p>
        </div>
      </section>

      {/* Small Groups */}
      <section className="py-16 sm:py-20 bg-ocean text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-syne font-bold text-3xl sm:text-4xl mb-6">
                Small groups, real connections
              </h2>
              <p className="font-dm text-white/80 text-lg mb-6">
                All experiences are limited to a maximum of <strong className="text-sand">10 participants</strong>.
              </p>
              <p className="font-dm text-white/80 mb-6">
                This allows us to create a friendly and relaxed atmosphere where people can:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-sand rounded-full"></div>
                  <span className="font-dm text-white/90">Learn comfortably</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-sand rounded-full"></div>
                  <span className="font-dm text-white/90">Meet like-minded travelers</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-sand rounded-full"></div>
                  <span className="font-dm text-white/90">Share authentic moments</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-48 h-48 bg-sand/20 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-sand/30 rounded-full flex items-center justify-center">
                    <Users className="text-sand" size={48} />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-sunset text-white font-syne font-bold text-xl px-4 py-2 rounded-full">
                  Max 10
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-dm text-white/70 mt-12 text-lg"
          >
            Our goal is not mass tourism, but <strong className="text-sand">quality experiences</strong> and <strong className="text-sand">real human connections</strong>.
          </motion.p>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-16 sm:py-20 bg-warmwhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-ocean mb-4">
              Experiences designed around skills
            </h2>
            <p className="font-dm text-ocean/70 max-w-2xl mx-auto">
              The Bridge focuses on experiences where travel meets learning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/experiences/self-defense">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-sunset/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-sunset" size={32} />
                    </div>
                    <h3 className="font-syne font-bold text-ocean mb-2">Self-Defense</h3>
                    <p className="font-dm text-ocean/60 text-sm">Weekend experiences</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/experiences/visual-storytelling">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-sunset/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Camera className="text-sunset" size={32} />
                    </div>
                    <h3 className="font-syne font-bold text-ocean mb-2">Visual Storytelling</h3>
                    <p className="font-dm text-ocean/60 text-sm">Weekend experiences</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/experiences/language-practice">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-sunset/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Languages className="text-sunset" size={32} />
                    </div>
                    <h3 className="font-syne font-bold text-ocean mb-2">Language Practice</h3>
                    <p className="font-dm text-ocean/60 text-sm">Weekly experiences</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-dm text-ocean/70 mt-10 max-w-2xl mx-auto"
          >
            Each program is designed to be accessible, engaging, and practical, whether you want to improve a skill or simply try something new.
          </motion.p>
        </div>
      </section>

      {/* Morocco */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-syne font-bold text-3xl sm:text-4xl text-ocean mb-6">
                Morocco as a playground
              </h2>
              <p className="font-dm text-ocean/80 text-lg mb-6">
                Morocco offers a unique combination of culture, landscapes, and energy.
              </p>
              <p className="font-dm text-ocean/70 mb-6">
                Our experiences take place in cities such as <strong className="text-ocean">Marrakech</strong> and <strong className="text-ocean">Agadir</strong>, where participants can enjoy both dynamic urban environments and inspiring surroundings.
              </p>
              <p className="font-dm text-ocean/70">
                From vibrant markets to ocean views, Morocco becomes the perfect setting for active travel experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <Link to="/destinations/marrakech" className="group">
                <div className="bg-gradient-to-br from-sunset/10 to-sunset/20 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <MapPin className="text-sunset mx-auto mb-3" size={32} />
                  <h4 className="font-syne font-bold text-ocean group-hover:text-sunset transition-colors">Marrakech</h4>
                </div>
              </Link>
              <Link to="/destinations/agadir" className="group">
                <div className="bg-gradient-to-br from-sand/20 to-sand/30 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <MapPin className="text-ocean mx-auto mb-3" size={32} />
                  <h4 className="font-syne font-bold text-ocean group-hover:text-sunset transition-colors">Agadir</h4>
                </div>
              </Link>
              <Link to="/destinations/casablanca" className="group col-span-2">
                <div className="bg-gradient-to-br from-ocean/5 to-ocean/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <MapPin className="text-ocean mx-auto mb-3" size={32} />
                  <h4 className="font-syne font-bold text-ocean group-hover:text-sunset transition-colors">Casablanca</h4>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-bold text-3xl sm:text-4xl mb-8">
              The Bridge philosophy
            </h2>
            <p className="font-dm text-xl text-white/80 mb-6">
              We believe travel should be more than just visiting places.
            </p>
            <p className="font-dm text-xl text-white/80 mb-10">
              It should be about <span className="text-sand">learning</span>, <span className="text-sand">moving</span>, <span className="text-sand">creating</span>, and <span className="text-sand">connecting</span>.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
              <p className="font-syne font-bold text-2xl text-sand">
                The Bridge is exactly that:
              </p>
              <p className="font-dm text-xl text-white mt-2">
                a bridge between travel, skills, and people.
              </p>
            </div>
            <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
              <Link to="/book">
                Start Your Journey <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
