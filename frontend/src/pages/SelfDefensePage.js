import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, ArrowRight, MapPin, Calendar, Users, Check, 
  Clock, ChevronDown, ChevronUp, Star, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const PROGRAM = [
  { day: "Day 1", morning: "Arrival & Welcome", afternoon: "Group introduction, city orientation" },
  { day: "Day 2", morning: "Self-defense fundamentals", afternoon: "Beach time & local exploration" },
  { day: "Day 3", morning: "Practical techniques", afternoon: "Beach excursion or Souk visit" },
  { day: "Day 4", morning: "Defense scenarios training", afternoon: "Free time & optional massage" },
  { day: "Day 5", morning: "Mixed training session", afternoon: "Group dinner & departure (5-day)" },
  { day: "Day 6", morning: "Advanced techniques", afternoon: "Taghazout surf trip (optional)" },
  { day: "Day 7", morning: "Final training & certificates", afternoon: "Farewell & departure" }
];

const FAQ = [
  { q: "Do I need prior experience?", a: "No! Our sessions are designed for all levels, from complete beginners to experienced practitioners. Our coaches adapt to your level." },
  { q: "What should I bring?", a: "Comfortable training clothes, swimwear, sunscreen. Training equipment is provided." },
  { q: "Is accommodation included?", a: "Yes, accommodation in beachfront hostels or guesthouses is included in the price." },
  { q: "Can I extend my stay?", a: "Absolutely! Contact us to arrange additional nights or activities." },
  { q: "What about meals?", a: "Breakfast is usually included. Lunch and dinner are at your own expense, allowing you to explore local cuisine." }
];

const SelfDefensePage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600" 
            alt="Self-defense training"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-sunset rounded-full flex items-center justify-center">
                <Shield size={28} className="text-white" />
              </div>
              <span className="font-dm text-sand text-sm">Experience</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Self-Defense Holiday
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">Train your body, explore Morocco</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              Morning self-defense training sessions focusing on practical techniques and conditioning. 
              Afternoons for beach, exploration, and group experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Overview</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-6">
                Join our Self-Defense Holiday for an unforgettable experience combining 
                practical self-defense training with Moroccan beach adventure. Each morning, train with 
                experienced coaches learning real-world defense techniques.
              </p>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-6">
                Afternoons are yours to enjoy — relax on Agadir's famous 10km beach, 
                explore the marina, take a surf lesson in Taghazout, or simply unwind. End your days 
                with group dinners and new friendships from around the world.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Self-defense techniques", "Conditioning", "Practical skills"].map((item) => (
                  <span key={item} className="bg-sunset/10 text-sunset px-4 py-2 rounded-full font-dm text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400" alt="Training" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1553522987-b6cb62385487?w=400" alt="Agadir beach" className="rounded-xl aspect-square object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Program</h2>
          <div className="space-y-4">
            {PROGRAM.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-none ${index >= 5 ? "bg-sand/20" : "bg-warmwhite"}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 bg-ocean rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="font-syne font-bold text-white text-sm">{day.day}</span>
                    </div>
                    <div className="flex-1 grid sm:grid-cols-2 gap-2">
                      <div>
                        <p className="font-dm text-xs text-ocean/60 mb-1">Morning</p>
                        <p className="font-dm text-ocean font-medium text-sm">{day.morning}</p>
                      </div>
                      <div>
                        <p className="font-dm text-xs text-ocean/60 mb-1">Afternoon</p>
                        <p className="font-dm text-ocean/80 text-sm">{day.afternoon}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center font-dm text-ocean/60 text-sm mt-4">
            * Days 6-7 for 7-day experience only
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-8 text-center">Pricing</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: "Weekend", duration: "2 nights / 3 days", price: 250, popular: false },
              { label: "5 Days", duration: "5 days experience", price: 450, popular: false },
              { label: "Full Week", duration: "7 days / 6 nights", price: 550, popular: true }
            ].map((plan) => (
              <Card key={plan.label} className={`border-none ${plan.popular ? "bg-sunset" : "bg-white/10"}`}>
                <CardContent className="p-6 text-center">
                  {plan.popular && <span className="bg-sand text-ocean text-xs font-dm px-3 py-1 rounded-full">Most Popular</span>}
                  <h3 className="font-syne font-bold text-xl mt-3 mb-1">{plan.label}</h3>
                  <p className="font-dm text-white/70 text-sm mb-4">{plan.duration}</p>
                  <p className="font-syne font-bold text-4xl mb-4">€{plan.price}</p>
                  <ul className="text-left space-y-2 mb-6">
                    {["Accommodation included", "Daily training sessions", "Group activities"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 font-dm text-sm text-white/80">
                        <Check size={14} className="text-sand" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full rounded-full ${plan.popular ? "bg-white text-sunset hover:bg-white/90" : "bg-sunset hover:bg-sunset/90"}`}>
                    <Link to="/book">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Locations</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="border-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=600" alt="Casablanca" className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-syne font-bold text-lg text-ocean mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-sunset" /> Casablanca
                </h3>
                <p className="font-dm text-ocean/70 text-sm">
                  Urban training in Morocco's modern metropolis. Explore the corniche and Art Deco downtown.
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
                  Train in the Red City. Explore medinas, souks and the Atlas Mountains nearby.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1553522987-b6cb62385487?w=600" alt="Agadir" className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-syne font-bold text-lg text-ocean mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-sunset" /> Agadir
                </h3>
                <p className="font-dm text-ocean/70 text-sm">
                  Beach vibes and surf culture. Morning training, afternoon beach sessions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((item, index) => (
              <Card key={index} className="border-none bg-warmwhite">
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

      {/* Book CTA */}
      <section id="book" className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">Ready to Train?</h2>
          <p className="font-dm text-white/80 mb-6">
            Book your Self-Defense Holiday today and start your journey.
          </p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book">Book This Experience <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default SelfDefensePage;
