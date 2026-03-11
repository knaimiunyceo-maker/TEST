import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Target, Users, MapPin, Calendar, Plane, ArrowRight, 
  Check, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const STEPS = [
  {
    number: "01",
    title: "Choose Your Experience",
    description: "Self-Defense, Language Practice, or Visual Storytelling — pick what excites you.",
    icon: <Target size={28} />
  },
  {
    number: "02",
    title: "Choose Your City",
    description: "Casablanca for modern vibes, Marrakech for culture. Each city offers unique experiences.",
    icon: <MapPin size={28} />
  },
  {
    number: "03",
    title: "Choose Your Dates",
    description: "Select from available dates. We run experiences year-round with regular departures.",
    icon: <Calendar size={28} />
  },
  {
    number: "04",
    title: "Travel & Join",
    description: "Fly to Morocco, meet your group, and start your adventure. We handle the rest.",
    icon: <Plane size={28} />
  }
];

const HowItWorksPage = () => {
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
            <p className="font-caveat text-sand text-xl mb-2">Simple & Easy</p>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              How It Works
            </h1>
            <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto">
              From choosing your experience to joining your group — here's how THE BRIDGE works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Concept */}
      <section id="concept" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-6">The Concept</h2>
          <p className="font-caveat text-sunset text-2xl mb-4">Travel • Practice • Experience</p>
          <p className="font-dm text-ocean/80 text-lg max-w-2xl mx-auto mb-8">
            THE BRIDGE combines skill-building with travel. Our unique alternating schedule 
            keeps things fresh and engaging throughout your stay.
          </p>
        </div>
      </section>

      {/* Alternating Days Schedule */}
      <section id="schedule" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Programme Alternés</h2>
          <div className="space-y-4">
            {/* Day 1 */}
            <Card className="border-none bg-ocean/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-sunset rounded-full flex items-center justify-center text-white font-syne font-bold">
                    J1
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean">Jour 1</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <p className="font-syne font-bold text-sunset text-sm mb-1">🌅 Matin</p>
                    <p className="font-dm text-ocean">Pratique (Self-défense, Langue ou Storytelling)</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="font-syne font-bold text-ocean text-sm mb-1">🌴 Après-midi</p>
                    <p className="font-dm text-ocean/80">Exploration du Maroc (plage, ville, culture)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Day 2 */}
            <Card className="border-none bg-sunset/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-ocean rounded-full flex items-center justify-center text-white font-syne font-bold">
                    J2
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean">Jour 2</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <p className="font-syne font-bold text-ocean text-sm mb-1">🌅 Matin</p>
                    <p className="font-dm text-ocean/80">Activité (surf, excursion, visite guidée...)</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="font-syne font-bold text-sunset text-sm mb-1">🌴 Après-midi</p>
                    <p className="font-dm text-ocean">Pratique (Self-défense, Langue ou Storytelling)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Day 3+ */}
            <Card className="border-none bg-ocean/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-sand rounded-full flex items-center justify-center text-ocean font-syne font-bold">
                    J3+
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean">Jours suivants</h3>
                </div>
                <p className="font-dm text-ocean/80 mb-3">
                  Le rythme alterne entre Jour 1 et Jour 2 jusqu'au dernier jour.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-sunset/10 text-sunset px-3 py-1 rounded-full font-dm">J1 → J2 → J1 → J2...</span>
                </div>
              </CardContent>
            </Card>

            {/* Last Day */}
            <Card className="border-none bg-sunset/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-sunset rounded-full flex items-center justify-center text-white font-syne font-bold">
                    FIN
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean">Dernier Jour</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <p className="font-syne font-bold text-sunset text-sm mb-1">🌅 Matin</p>
                    <p className="font-dm text-ocean">Pratique finale & au revoir au groupe</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="font-syne font-bold text-ocean/50 text-sm mb-1">✈️ Après-midi</p>
                    <p className="font-dm text-ocean/60">Départ libre</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Small Groups */}
      <section id="small-groups" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-sunset rounded-full flex items-center justify-center text-white">
                  <Users size={24} />
                </div>
                <h2 className="font-syne font-bold text-2xl text-ocean">Small Groups</h2>
              </div>
              <p className="font-dm text-ocean/80 mb-4">
                Every experience is limited to <strong>maximum 10 participants</strong>. This ensures 
                personalized attention from coaches, meaningful connections with fellow travelers, 
                and an intimate, non-touristy experience.
              </p>
              <ul className="space-y-2">
                {[
                  "Maximum 10 people per group",
                  "International mix of travelers",
                  "Adults 18+ only",
                  "Similar skill levels grouped together"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-dm text-sm text-ocean/80">
                    <Check size={14} className="text-sunset" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500" 
                alt="Group of travelers"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-center mb-12">Your Journey in 4 Steps</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="bg-white/10 border-none h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-sunset rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {step.icon}
                    </div>
                    <span className="font-syne font-bold text-sand text-2xl">{step.number}</span>
                    <h3 className="font-syne font-bold text-white text-lg mt-2 mb-2">{step.title}</h3>
                    <p className="font-dm text-white/70 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">What's Included</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-none bg-white">
              <CardContent className="p-6">
                <h3 className="font-syne font-bold text-ocean mb-4 flex items-center gap-2">
                  <Check className="text-sunset" size={20} /> Included
                </h3>
                <ul className="space-y-2">
                  {[
                    "Accommodation in partner hostels/riads",
                    "Daily morning training sessions",
                    "Group activities and exploration",
                    "Airport pickup (on request)",
                    "Local guide support",
                    "WhatsApp group for coordination"
                  ].map((item) => (
                    <li key={item} className="font-dm text-ocean/80 text-sm flex items-start gap-2">
                      <Check size={14} className="text-green-500 mt-1 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none bg-white">
              <CardContent className="p-6">
                <h3 className="font-syne font-bold text-ocean mb-4 flex items-center gap-2">
                  <Sparkles className="text-ocean/50" size={20} /> Not Included
                </h3>
                <ul className="space-y-2">
                  {[
                    "Flights to/from Morocco",
                    "Lunch and dinner (explore local food!)",
                    "Optional activities (surf, desert trips, etc.)",
                    "Personal expenses",
                    "Travel insurance (recommended)"
                  ].map((item) => (
                    <li key={item} className="font-dm text-ocean/60 text-sm flex items-start gap-2">
                      <span className="text-ocean/40">•</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">
            Ready to Start?
          </h2>
          <p className="font-dm text-white/80 mb-6">
            Choose your experience and book your spot today.
          </p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book">Book Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorksPage;
