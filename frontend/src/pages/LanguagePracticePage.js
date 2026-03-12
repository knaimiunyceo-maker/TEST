import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Languages, ArrowRight, MapPin, Calendar, Users, Check, 
  Clock, ChevronDown, ChevronUp, BookOpen, Award, GraduationCap,
  Star, FileText, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const PRICING = [
  { weeks: 1, price: 400, label: "1 semaine" },
  { weeks: 2, price: 800, label: "2 semaines" },
  { weeks: 3, price: 1200, label: "3 semaines" },
  { weeks: 4, price: 1600, label: "4 semaines" }
];

const COURSES = [
  { name: "TOEFL iBT", desc: "Test of English as a Foreign Language - Internet Based" },
  { name: "TOEFL ITP", desc: "Institutional Testing Program" },
  { name: "IELTS Academic", desc: "International English Language Testing System - Academic" },
  { name: "IELTS General", desc: "International English Language Testing System - General Training" },
  { name: "Business English", desc: "Formation professionnelle en anglais des affaires" }
];

const LEVELS = [
  { level: "A1", name: "Débutant", desc: "Expressions basiques et phrases simples" },
  { level: "A2", name: "Élémentaire", desc: "Communication dans des situations courantes" },
  { level: "B1", name: "Intermédiaire", desc: "Se débrouiller dans la plupart des situations" },
  { level: "B2", name: "Intermédiaire+", desc: "Communication fluide et spontanée" },
  { level: "C1", name: "Avancé", desc: "Expression fluide et structurée" }
];

const FAQ = [
  { q: "Quel est le niveau minimum requis ?", a: "Aucun ! Nous accueillons tous les niveaux, du débutant complet (A1) à l'avancé (C1). Un test de niveau gratuit est effectué à l'arrivée." },
  { q: "Combien d'étudiants par classe ?", a: "Maximum 10 étudiants par groupe pour garantir une attention personnalisée et plus de temps de parole." },
  { q: "Quel est le contenu des cours ?", a: "Expression orale, compréhension, grammaire appliquée, vocabulaire pratique. Focus sur la communication réelle." },
  { q: "L'hébergement est-il inclus ?", a: "Oui, l'hébergement en auberge partenaire ou riad est inclus dans le prix." },
  { q: "Puis-je prolonger mon séjour ?", a: "Absolument ! Contactez-nous pour ajouter des semaines supplémentaires." }
];

const LanguagePracticePage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedWeeks, setSelectedWeeks] = useState(1);

  const selectedPrice = PRICING.find(p => p.weeks === selectedWeeks);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600" 
            alt="English Practice"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-sunset/20 text-sand px-3 py-1 rounded-full text-sm font-dm">Anglais Général • Adultes</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-dm">Since 2020</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Cours d'Anglais Intensif
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">Practice English through travel</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              Fidèles à l'enseignement d'anglais de qualité. Immersion totale au Maroc avec 
              20 heures de cours par semaine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <FileText size={18} />, text: "Test de niveau Gratuit" },
              { icon: <BookOpen size={18} />, text: "Écrit et Oral" },
              { icon: <Award size={18} />, text: "Certificat inclus" },
              { icon: <Users size={18} />, text: "Max 10 étudiants" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-sunset">{badge.icon}</span>
                <span className="font-dm text-ocean text-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section id="tarifs" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2 text-center">Tarifs et Planning des Cours</h2>
          <p className="font-dm text-ocean/60 text-center mb-2">Minimum 1 semaine (7 jours)</p>
          <p className="font-syne font-bold text-sunset text-center text-2xl mb-8">€400 / semaine</p>
          
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="bg-ocean p-6 text-white">
              <h3 className="font-syne font-bold text-xl mb-2">Cours d'Anglais Intensif</h3>
              <p className="font-dm text-white/70 text-sm">20 heures de cours par semaine</p>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <label className="font-dm font-medium text-ocean text-sm mb-2 block">Durée</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRICING.map((p) => (
                    <button
                      key={p.weeks}
                      onClick={() => setSelectedWeeks(p.weeks)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        selectedWeeks === p.weeks
                          ? "border-sunset bg-sunset/5"
                          : "border-border hover:border-sunset/50"
                      }`}
                    >
                      <span className="font-syne font-bold text-ocean block">{p.label}</span>
                      <span className="font-dm text-sunset font-bold">€{p.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-warmwhite rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-dm text-ocean/70">{selectedWeeks} semaine{selectedWeeks > 1 ? 's' : ''} × €400</span>
                  <span className="font-syne font-bold text-ocean">€{selectedPrice?.price}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="font-dm text-ocean/70">Frais d'inscription</span>
                  <span className="font-syne font-bold text-ocean">€45</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="font-syne font-bold text-ocean">Total</span>
                  <span className="font-syne font-bold text-sunset text-2xl">€{(selectedPrice?.price || 0) + 45}</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full">
                <Link to="/book">Réserver maintenant <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Nos Cours Vedette */}
      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Nos Cours Vedette</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSES.map((course, i) => (
              <Card key={i} className="border-none">
                <CardContent className="p-4">
                  <div className="w-10 h-10 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-3">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="font-syne font-bold text-ocean mb-1">{course.name}</h3>
                  <p className="font-dm text-ocean/60 text-xs">{course.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Niveaux */}
      <section id="levels" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Niveaux de Cours</h2>
          <div className="space-y-3">
            {LEVELS.map((level, i) => (
              <div key={i} className="flex items-center gap-4 bg-warmwhite rounded-xl p-4">
                <div className="w-14 h-14 bg-ocean rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-syne font-bold text-white">{level.level}</span>
                </div>
                <div>
                  <h3 className="font-syne font-bold text-ocean">{level.name}</h3>
                  <p className="font-dm text-ocean/60 text-sm">{level.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section id="included" className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-8 text-center">Inclus dans votre cours</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Test de niveau avant l'arrivée",
              "Hébergement inclus",
              "Certificat de participation",
              "Matériel pédagogique",
              "Activités culturelles",
              "Support WhatsApp 24/7",
              "Accueil à l'aéroport (sur demande)",
              "Groupe international"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                <Check className="text-sand flex-shrink-0" size={18} />
                <span className="font-dm text-white/90 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Destinations</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=600" alt="Casablanca" className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-syne font-bold text-lg text-ocean mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-sunset" /> Casablanca
                </h3>
                <p className="font-dm text-ocean/70 text-sm">
                  La métropole moderne du Maroc. Pratiquez l'anglais dans un environnement cosmopolite.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600" alt="Marrakech" className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-syne font-bold text-lg text-ocean mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-sunset" /> Marrakech
                </h3>
                <p className="font-dm text-ocean/70 text-sm">
                  La ville rouge. Immersion culturelle et pratique linguistique dans les souks et médinas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Horaires */}
      <section id="schedule" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Horaires</h2>
          <Card className="border-none">
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  { time: "09:00 - 10:40", activity: "Cours intensif", type: "course" },
                  { time: "10:40 - 11:00", activity: "Pause", type: "break" },
                  { time: "11:00 - 12:40", activity: "Cours intensif", type: "course" },
                  { time: "12:45 - 13:35", activity: "Conversation libre", type: "optional" },
                  { time: "14:00 - 18:00", activity: "Exploration & Activités", type: "activity" }
                ].map((slot, i) => (
                  <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${
                    slot.type === 'course' ? 'bg-sunset/10' : 
                    slot.type === 'break' ? 'bg-gray-100' : 
                    slot.type === 'optional' ? 'bg-ocean/5' : 'bg-sand/20'
                  }`}>
                    <span className="font-dm font-medium text-ocean w-28 text-sm">{slot.time}</span>
                    <span className="font-dm text-ocean/80">{slot.activity}</span>
                  </div>
                ))}
              </div>
              <p className="font-dm text-ocean/60 text-sm mt-4 text-center">
                Programme alterné : Pratique ↔ Activité (matin/après-midi)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Questions Fréquentes</h2>
          <div className="space-y-3">
            {FAQ.map((item, index) => (
              <Card key={index} className="border-none bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="font-dm font-medium text-ocean">{item.q}</span>
                  {openFaq === index ? <ChevronUp size={20} className="text-sunset" /> : <ChevronDown size={20} className="text-ocean/50" />}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="font-dm text-ocean/70 text-sm">{item.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">Prêt à améliorer votre anglais ?</h2>
          <p className="font-dm text-white/80 mb-6">
            Réservez votre séjour linguistique dès maintenant.
          </p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book">Réserver <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default LanguagePracticePage;
