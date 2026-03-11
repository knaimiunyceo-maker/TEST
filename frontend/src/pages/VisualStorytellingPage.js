import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Camera, ArrowRight, MapPin, Calendar, Users, Check, 
  Clock, ChevronDown, ChevronUp, Film, Image, Plane
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const TRACKS = [
  { id: "filmmaking", title: "Filmmaking", icon: <Film size={24} />, desc: "Learn storytelling, filming techniques, and basic editing while shooting real content." },
  { id: "photography", title: "Photography", icon: <Image size={24} />, desc: "Master composition, lighting, and framing while exploring stunning locations." },
  { id: "drone", title: "Drone Content", icon: <Plane size={24} />, desc: "Learn aerial filming and storytelling using drones in beautiful Moroccan landscapes." }
];

const PROGRAM = [
  { day: "Day 1", morning: "Welcome & equipment check", afternoon: "City orientation shoot" },
  { day: "Day 2", morning: "Technique fundamentals", afternoon: "Medina exploration & shooting" },
  { day: "Day 3", morning: "Advanced techniques", afternoon: "Landscape/architecture session" },
  { day: "Day 4", morning: "Editing workshop", afternoon: "Golden hour shoot" },
  { day: "Day 5", morning: "Project review", afternoon: "Final shots & departure (5-day)" },
  { day: "Day 6", morning: "Desert/beach expedition", afternoon: "Sunset content creation" },
  { day: "Day 7", morning: "Portfolio review & certificates", afternoon: "Farewell" }
];

const WEEKEND_PROGRAM = [
  { day: "Day 1", morning: "Arrival & orientation", afternoon: "First shooting session" },
  { day: "Day 2", morning: "Intensive workshop", afternoon: "Location shoot" },
  { day: "Day 3", morning: "Review & editing tips", afternoon: "Departure" }
];

const FAQ = [
  { q: "Do I need my own equipment?", a: "Basic equipment is helpful but not required. We can provide cameras for beginners. Bring your own if you prefer specific gear." },
  { q: "What skill level is required?", a: "All levels welcome! From complete beginners to those looking to improve specific skills." },
  { q: "Can I do multiple tracks?", a: "You can choose one main track, but workshops often overlap so you'll learn bits of everything." },
  { q: "What will I leave with?", a: "A portfolio of content you created during the trip, plus new skills and connections." },
  { q: "Is drone flying legal in Morocco?", a: "Yes, with proper permits. We handle all authorizations for our drone sessions." }
];

const VisualStorytellingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600" 
            alt="Visual storytelling"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-sunset rounded-full flex items-center justify-center">
                <Camera size={28} className="text-white" />
              </div>
              <span className="font-dm text-sand text-sm">Experience</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Visual Storytelling Holiday
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">Create content while exploring</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              Learn filmmaking, photography, or drone content creation while capturing 
              Morocco's beauty. Leave with a portfolio and new skills.
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
                Transform your creative vision into reality with our Visual Storytelling Holiday. 
                Whether you're into filmmaking, photography, or drone content, our experienced 
                mentors will guide you through techniques while you capture Morocco's stunning landscapes.
              </p>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-6">
                Mornings are dedicated to learning and practice. Afternoons become your canvas — 
                explore medinas, deserts, beaches, and mountains while creating content you'll be proud of.
              </p>
              
              {/* Tracks */}
              <h3 className="font-syne font-bold text-lg text-ocean mb-4">Choose Your Track</h3>
              <div className="space-y-3">
                {TRACKS.map((track) => (
                  <div key={track.id} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                    <div className="w-10 h-10 bg-sunset/10 rounded-full flex items-center justify-center text-sunset flex-shrink-0">
                      {track.icon}
                    </div>
                    <div>
                      <h4 className="font-dm font-semibold text-ocean text-sm">{track.title}</h4>
                      <p className="font-dm text-ocean/60 text-xs">{track.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400" alt="Photography" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" alt="Camera" className="rounded-xl aspect-square object-cover mt-8" />
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
          <p className="text-center font-dm text-ocean/60 text-sm mt-4">* Days 6-7 for 7-day experience only</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-8 text-center">Pricing</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: "Weekend", duration: "2 nights / 3 days", price: 260, popular: false },
              { label: "5 Days", duration: "5 days experience", price: 480, popular: false },
              { label: "Full Week", duration: "7 days / 6 nights", price: 580, popular: true }
            ].map((plan) => (
              <Card key={plan.label} className={`border-none ${plan.popular ? "bg-sunset" : "bg-white/10"}`}>
                <CardContent className="p-6 text-center">
                  {plan.popular && <span className="bg-sand text-ocean text-xs font-dm px-3 py-1 rounded-full">Most Popular</span>}
                  <h3 className="font-syne font-bold text-xl mt-3 mb-1">{plan.label}</h3>
                  <p className="font-dm text-white/70 text-sm mb-4">{plan.duration}</p>
                  <p className="font-syne font-bold text-4xl mb-4">€{plan.price}</p>
                  <ul className="text-left space-y-2 mb-6">
                    {["Accommodation included", "Daily workshops", "Equipment guidance"].map((item, i) => (
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
            {[
              { city: "Marrakech", desc: "Vibrant medinas, stunning architecture, perfect for street photography.", image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400" },
              { city: "Essaouira", desc: "Coastal beauty, blue fishing boats, incredible golden hour light.", image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400" },
              { city: "Agadir", desc: "Beach vibes, modern city, great for drone and landscape content.", image: "https://images.unsplash.com/photo-1596627116790-af6f46dddbf4?w=400" }
            ].map((loc) => (
              <Card key={loc.city} className="border-none overflow-hidden">
                <img src={loc.image} alt={loc.city} className="w-full h-32 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-syne font-bold text-ocean mb-1 flex items-center gap-2">
                    <MapPin size={14} className="text-sunset" /> {loc.city}
                  </h3>
                  <p className="font-dm text-ocean/70 text-xs">{loc.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weekend Format */}
      <section id="weekend" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-4 text-center">Weekend Format</h2>
          <p className="font-dm text-ocean/70 text-center mb-8 max-w-2xl mx-auto">
            Perfect for a quick creative getaway. Intensive learning in just 3 days.
          </p>
          <div className="space-y-3">
            {WEEKEND_PROGRAM.map((day, index) => (
              <Card key={index} className="border-none bg-sunset/10">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-14 h-14 bg-sunset rounded-xl flex items-center justify-center flex-shrink-0">
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">FAQ</h2>
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

      {/* Book CTA */}
      <section id="book" className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">Ready to Create?</h2>
          <p className="font-dm text-white/80 mb-6">
            Book your Visual Storytelling Holiday and start capturing Morocco.
          </p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book">Book This Experience <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default VisualStorytellingPage;
