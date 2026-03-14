import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Target, Users, MapPin, Calendar, Plane, ArrowRight, 
  Check, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    heroSubtitle: "Simple & Easy",
    heroTitle: "How It Works",
    heroDesc: "From choosing your experience to joining your group — here's how THE BRIDGE works.",
    conceptTitle: "The Concept",
    conceptTagline: "Travel • Practice • Experience",
    conceptDesc: "THE BRIDGE combines skill-building with travel. Practice and activities alternate throughout your stay for a balanced experience.",
    alternatingProgram: "Alternating Program",
    alternatingDesc: "Practice ↔ Activity (morning/afternoon alternating)",
    smallGroupsTitle: "Small Groups",
    smallGroupsDesc: "Each experience is limited to 8-12 participants maximum. Small groups mean more attention, better learning, and real connections.",
    smallGroupsFeatures: ["Personalized attention", "Quality learning", "Real connections"],
    stepsTitle: "4 Simple Steps",
    stepsDesc: "From booking to adventure — getting started is easy.",
    steps: [
      { number: "01", title: "Choose Your Experience", description: "Self-Defense, Language Practice, or Visual Storytelling — pick what excites you." },
      { number: "02", title: "Choose Your City", description: "Casablanca for modern vibes, Marrakech for culture. Each city offers unique experiences." },
      { number: "03", title: "Choose Your Dates", description: "Select from available dates. We run experiences year-round with regular departures." },
      { number: "04", title: "Travel & Join", description: "Fly to Morocco, meet your group, and start your adventure. We handle the rest." }
    ],
    ctaTitle: "Ready to start?",
    ctaDesc: "Choose your experience and dates. Adventure awaits.",
    ctaButton: "Book Now"
  },
  fr: {
    heroSubtitle: "Simple & Facile",
    heroTitle: "Comment ça marche",
    heroDesc: "Du choix de votre expérience à rejoindre votre groupe — voici comment fonctionne THE BRIDGE.",
    conceptTitle: "Le Concept",
    conceptTagline: "Voyage • Pratique • Expérience",
    conceptDesc: "THE BRIDGE combine le développement de compétences avec le voyage. Pratique et activités alternent tout au long de votre séjour pour une expérience équilibrée.",
    alternatingProgram: "Programme Alterné",
    alternatingDesc: "Pratique ↔ Activité (matin/après-midi alternés)",
    smallGroupsTitle: "Petits Groupes",
    smallGroupsDesc: "Chaque expérience est limitée à 8-12 participants maximum. Les petits groupes signifient plus d'attention, un meilleur apprentissage et de vraies connexions.",
    smallGroupsFeatures: ["Attention personnalisée", "Apprentissage de qualité", "Connexions authentiques"],
    stepsTitle: "4 Étapes Simples",
    stepsDesc: "De la réservation à l'aventure — commencer est facile.",
    steps: [
      { number: "01", title: "Choisissez votre expérience", description: "Self-Défense, Pratique des Langues ou Storytelling Visuel — choisissez ce qui vous passionne." },
      { number: "02", title: "Choisissez votre ville", description: "Casablanca pour la modernité, Marrakech pour la culture. Chaque ville offre des expériences uniques." },
      { number: "03", title: "Choisissez vos dates", description: "Sélectionnez parmi les dates disponibles. Nous organisons des expériences toute l'année." },
      { number: "04", title: "Voyagez & Rejoignez", description: "Envolez-vous vers le Maroc, rencontrez votre groupe et commencez l'aventure. On s'occupe du reste." }
    ],
    ctaTitle: "Prêt à commencer ?",
    ctaDesc: "Choisissez votre expérience et vos dates. L'aventure vous attend.",
    ctaButton: "Réserver"
  },
  es: {
    heroSubtitle: "Simple y Fácil",
    heroTitle: "Cómo Funciona",
    heroDesc: "Desde elegir tu experiencia hasta unirte a tu grupo — así es como funciona THE BRIDGE.",
    conceptTitle: "El Concepto",
    conceptTagline: "Viajar • Practicar • Experimentar",
    conceptDesc: "THE BRIDGE combina el desarrollo de habilidades con los viajes. Práctica y actividades se alternan durante tu estancia para una experiencia equilibrada.",
    alternatingProgram: "Programa Alternado",
    alternatingDesc: "Práctica ↔ Actividad (mañana/tarde alternando)",
    smallGroupsTitle: "Grupos Pequeños",
    smallGroupsDesc: "Cada experiencia está limitada a 8-12 participantes máximo. Grupos pequeños significan más atención, mejor aprendizaje y conexiones reales.",
    smallGroupsFeatures: ["Atención personalizada", "Aprendizaje de calidad", "Conexiones reales"],
    stepsTitle: "4 Pasos Simples",
    stepsDesc: "De la reserva a la aventura — empezar es fácil.",
    steps: [
      { number: "01", title: "Elige tu experiencia", description: "Defensa Personal, Práctica de Idiomas o Storytelling Visual — elige lo que te emociona." },
      { number: "02", title: "Elige tu ciudad", description: "Casablanca para vibraciones modernas, Marrakech para cultura. Cada ciudad ofrece experiencias únicas." },
      { number: "03", title: "Elige tus fechas", description: "Selecciona entre las fechas disponibles. Organizamos experiencias todo el año." },
      { number: "04", title: "Viaja y Únete", description: "Vuela a Marruecos, conoce a tu grupo y comienza tu aventura. Nosotros nos encargamos del resto." }
    ],
    ctaTitle: "¿Listo para empezar?",
    ctaDesc: "Elige tu experiencia y fechas. La aventura te espera.",
    ctaButton: "Reservar"
  },
  pt: {
    heroSubtitle: "Simples e Fácil",
    heroTitle: "Como Funciona",
    heroDesc: "Desde escolher sua experiência até se juntar ao seu grupo — veja como funciona THE BRIDGE.",
    conceptTitle: "O Conceito",
    conceptTagline: "Viajar • Praticar • Experimentar",
    conceptDesc: "THE BRIDGE combina desenvolvimento de habilidades com viagens. Prática e atividades se alternam durante sua estadia para uma experiência equilibrada.",
    alternatingProgram: "Programa Alternado",
    alternatingDesc: "Prática ↔ Atividade (manhã/tarde alternando)",
    smallGroupsTitle: "Grupos Pequenos",
    smallGroupsDesc: "Cada experiência é limitada a 8-12 participantes no máximo. Grupos pequenos significam mais atenção, melhor aprendizado e conexões reais.",
    smallGroupsFeatures: ["Atenção personalizada", "Aprendizado de qualidade", "Conexões reais"],
    stepsTitle: "4 Passos Simples",
    stepsDesc: "Da reserva à aventura — começar é fácil.",
    steps: [
      { number: "01", title: "Escolha sua experiência", description: "Defesa Pessoal, Prática de Idiomas ou Storytelling Visual — escolha o que te empolga." },
      { number: "02", title: "Escolha sua cidade", description: "Casablanca para vibes modernas, Marrakech para cultura. Cada cidade oferece experiências únicas." },
      { number: "03", title: "Escolha suas datas", description: "Selecione entre as datas disponíveis. Organizamos experiências o ano todo." },
      { number: "04", title: "Viaje e Junte-se", description: "Voe para o Marrocos, conheça seu grupo e comece sua aventura. Cuidamos do resto." }
    ],
    ctaTitle: "Pronto para começar?",
    ctaDesc: "Escolha sua experiência e datas. A aventura te espera.",
    ctaButton: "Reservar"
  },
  de: {
    heroSubtitle: "Einfach & Leicht",
    heroTitle: "So funktioniert's",
    heroDesc: "Von der Wahl Ihres Erlebnisses bis zum Beitritt zu Ihrer Gruppe — so funktioniert THE BRIDGE.",
    conceptTitle: "Das Konzept",
    conceptTagline: "Reisen • Üben • Erleben",
    conceptDesc: "THE BRIDGE kombiniert Kompetenzentwicklung mit Reisen. Übung und Aktivitäten wechseln sich während Ihres Aufenthalts ab für ein ausgewogenes Erlebnis.",
    alternatingProgram: "Alternierendes Programm",
    alternatingDesc: "Übung ↔ Aktivität (morgens/nachmittags abwechselnd)",
    smallGroupsTitle: "Kleine Gruppen",
    smallGroupsDesc: "Jedes Erlebnis ist auf maximal 8-12 Teilnehmer begrenzt. Kleine Gruppen bedeuten mehr Aufmerksamkeit, besseres Lernen und echte Verbindungen.",
    smallGroupsFeatures: ["Persönliche Aufmerksamkeit", "Qualitatives Lernen", "Echte Verbindungen"],
    stepsTitle: "4 Einfache Schritte",
    stepsDesc: "Von der Buchung zum Abenteuer — der Einstieg ist einfach.",
    steps: [
      { number: "01", title: "Wählen Sie Ihr Erlebnis", description: "Selbstverteidigung, Sprachpraxis oder Visual Storytelling — wählen Sie, was Sie begeistert." },
      { number: "02", title: "Wählen Sie Ihre Stadt", description: "Casablanca für moderne Vibes, Marrakesch für Kultur. Jede Stadt bietet einzigartige Erlebnisse." },
      { number: "03", title: "Wählen Sie Ihre Daten", description: "Wählen Sie aus verfügbaren Terminen. Wir bieten ganzjährig Erlebnisse an." },
      { number: "04", title: "Reisen & Beitreten", description: "Fliegen Sie nach Marokko, treffen Sie Ihre Gruppe und starten Sie Ihr Abenteuer. Wir kümmern uns um den Rest." }
    ],
    ctaTitle: "Bereit zu starten?",
    ctaDesc: "Wählen Sie Ihr Erlebnis und Ihre Daten. Das Abenteuer wartet.",
    ctaButton: "Jetzt buchen"
  },
  it: {
    heroSubtitle: "Semplice e Facile",
    heroTitle: "Come Funziona",
    heroDesc: "Dalla scelta della tua esperienza all'unirti al tuo gruppo — ecco come funziona THE BRIDGE.",
    conceptTitle: "Il Concetto",
    conceptTagline: "Viaggiare • Praticare • Sperimentare",
    conceptDesc: "THE BRIDGE combina lo sviluppo delle competenze con i viaggi. Pratica e attività si alternano durante il tuo soggiorno per un'esperienza equilibrata.",
    alternatingProgram: "Programma Alternato",
    alternatingDesc: "Pratica ↔ Attività (mattina/pomeriggio alternati)",
    smallGroupsTitle: "Piccoli Gruppi",
    smallGroupsDesc: "Ogni esperienza è limitata a massimo 8-12 partecipanti. Piccoli gruppi significano più attenzione, migliore apprendimento e connessioni reali.",
    smallGroupsFeatures: ["Attenzione personalizzata", "Apprendimento di qualità", "Connessioni reali"],
    stepsTitle: "4 Semplici Passaggi",
    stepsDesc: "Dalla prenotazione all'avventura — iniziare è facile.",
    steps: [
      { number: "01", title: "Scegli la tua esperienza", description: "Autodifesa, Pratica Linguistica o Visual Storytelling — scegli ciò che ti entusiasma." },
      { number: "02", title: "Scegli la tua città", description: "Casablanca per vibrazioni moderne, Marrakech per la cultura. Ogni città offre esperienze uniche." },
      { number: "03", title: "Scegli le tue date", description: "Seleziona tra le date disponibili. Organizziamo esperienze tutto l'anno." },
      { number: "04", title: "Viaggia e Unisciti", description: "Vola in Marocco, incontra il tuo gruppo e inizia la tua avventura. Al resto pensiamo noi." }
    ],
    ctaTitle: "Pronto a iniziare?",
    ctaDesc: "Scegli la tua esperienza e le date. L'avventura ti aspetta.",
    ctaButton: "Prenota ora"
  }
};

const HowItWorksPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const STEP_ICONS = [
    <Target size={28} />,
    <MapPin size={28} />,
    <Calendar size={28} />,
    <Plane size={28} />
  ];

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

      {/* Concept */}
      <section id="concept" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-6">{t.conceptTitle}</h2>
          <p className="font-caveat text-sunset text-2xl mb-4">{t.conceptTagline}</p>
          <p className="font-dm text-ocean/80 text-lg max-w-2xl mx-auto mb-8">
            {t.conceptDesc}
          </p>
          <Card className="border-none bg-white max-w-md mx-auto">
            <CardContent className="p-6">
              <p className="font-syne font-bold text-ocean mb-2">{t.alternatingProgram}</p>
              <p className="font-dm text-ocean/70 text-sm">
                {t.alternatingDesc}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Small Groups */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-sunset" size={28} />
                <h2 className="font-syne font-bold text-2xl text-ocean">{t.smallGroupsTitle}</h2>
              </div>
              <p className="font-dm text-ocean/80 mb-6">
                {t.smallGroupsDesc}
              </p>
              <ul className="space-y-2">
                {t.smallGroupsFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 font-dm text-ocean/70">
                    <Check className="text-sunset" size={16} /> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-sand/20 rounded-2xl p-8 text-center">
                <p className="font-syne font-black text-6xl text-ocean mb-2">8-12</p>
                <p className="font-dm text-ocean/70">{language === 'fr' ? 'participants max' : language === 'es' ? 'participantes máx' : language === 'it' ? 'partecipanti max' : language === 'de' ? 'Teilnehmer max' : language === 'pt' ? 'participantes máx' : 'participants max'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-4">{t.stepsTitle}</h2>
            <p className="font-dm text-ocean/70">{t.stepsDesc}</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none shadow-lg h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-sunset/10 rounded-xl flex items-center justify-center text-sunset">
                        {STEP_ICONS[i]}
                      </div>
                      <span className="font-syne font-bold text-3xl text-ocean/20">{step.number}</span>
                    </div>
                    <h3 className="font-syne font-bold text-lg text-ocean mb-2">{step.title}</h3>
                    <p className="font-dm text-ocean/70 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="mx-auto mb-4" size={40} />
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">{t.ctaTitle}</h2>
          <p className="font-dm text-white/80 mb-6">{t.ctaDesc}</p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book">{t.ctaButton} <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorksPage;
